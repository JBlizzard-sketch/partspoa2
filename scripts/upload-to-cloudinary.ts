import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResult {
  filename: string;
  cloudinaryUrl: string;
  publicId: string;
  success: boolean;
  error?: string;
}

async function uploadImagesToCloudinary(): Promise<UploadResult[]> {
  const imagesDir = path.join(process.cwd(), 'Images');
  const results: UploadResult[] = [];
  
  console.log('🚀 Starting Cloudinary upload...');
  console.log(`📁 Reading images from: ${imagesDir}`);
  
  // Get all image files
  const files = fs.readdirSync(imagesDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });
  
  console.log(`📊 Found ${files.length} images to upload`);
  console.log('⏳ Uploading... (this may take a few minutes)\n');
  
  let uploaded = 0;
  let failed = 0;
  
  // Upload images in batches to avoid rate limiting
  const batchSize = 10;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (file) => {
        const filePath = path.join(imagesDir, file);
        const fileNameWithoutExt = path.parse(file).name;
        
        // Create a clean public_id (remove special characters, make URL-friendly)
        const publicId = `partspoa/products/${fileNameWithoutExt
          .replace(/[^a-zA-Z0-9_-]/g, '_')
          .toLowerCase()}`;
        
        try {
          const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            folder: 'partspoa/products',
            resource_type: 'auto',
            overwrite: false,
            tags: ['automotive', 'parts', 'inventory'],
            use_filename: true,
            unique_filename: false,
          });
          
          results.push({
            filename: file,
            cloudinaryUrl: result.secure_url,
            publicId: result.public_id,
            success: true,
          });
          
          uploaded++;
          
          // Progress indicator
          if (uploaded % 50 === 0 || uploaded === files.length) {
            console.log(`✅ Uploaded ${uploaded}/${files.length} images`);
          }
        } catch (error: any) {
          results.push({
            filename: file,
            cloudinaryUrl: '',
            publicId: '',
            success: false,
            error: error.message,
          });
          
          failed++;
          console.error(`❌ Failed to upload ${file}: ${error.message}`);
        }
      })
    );
  }
  
  console.log('\n📈 Upload Summary:');
  console.log(`✅ Successfully uploaded: ${uploaded}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${files.length}`);
  
  // Save results to JSON file for reference
  const outputPath = path.join(process.cwd(), 'scripts/cloudinary-upload-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputPath}`);
  
  return results;
}

// Run the upload
uploadImagesToCloudinary()
  .then(() => {
    console.log('\n🎉 Upload process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Upload process failed:', error);
    process.exit(1);
  });
