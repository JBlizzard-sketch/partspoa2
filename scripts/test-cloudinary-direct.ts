import { v2 as cloudinary } from 'cloudinary';
import * as path from 'path';

// Configure with the exact credentials
cloudinary.config({
  cloud_name: 'dbwfl1ii3',
  api_key: '911652142561656',
  api_secret: '0Yxe4Sz55uwxN_S-CSLOs90f_gE',
  secure: true
});

console.log('Testing direct Cloudinary upload...\n');

async function testUpload() {
  try {
    // Try to upload a single test image
    const testImage = path.join(process.cwd(), 'Images', '13028AA21B_timing_belt.jpg');
    console.log('Uploading test image:', testImage);
    
    const result = await cloudinary.uploader.upload(testImage, {
      public_id: 'partspoa/test/timing_belt',
      folder: 'partspoa/test',
      resource_type: 'auto',
      overwrite: true,
      use_filename: true,
      unique_filename: false
    });
    
    console.log('\n✅ SUCCESS! Upload worked!');
    console.log('Image URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    
  } catch (error: any) {
    console.error('\n❌ Upload failed:');
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('\nError details:');
    console.error('- Message:', error.message);
    console.error('- HTTP Code:', error.http_code);
    console.error('- Error:', error.error);
  }
}

testUpload();