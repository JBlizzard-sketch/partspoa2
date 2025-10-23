import { db } from '../server/db';
import { products } from '../server/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface ProductImageMatch {
  productId: string;
  productName: string;
  productSku: string | null;
  currentImages: string[];
  matchedCloudinaryUrls: string[];
  matchScore: number;
  matchReason: string;
}

async function updateProductImages(): Promise<void> {
  console.log('🔄 Starting product image database update...\n');
  
  // Load matching results
  const matchesPath = path.join(process.cwd(), 'scripts/image-product-matches.json');
  
  if (!fs.existsSync(matchesPath)) {
    console.error('❌ Matching results file not found. Please run match-images-to-products.ts first.');
    process.exit(1);
  }
  
  const matches: ProductImageMatch[] = JSON.parse(fs.readFileSync(matchesPath, 'utf-8'));
  console.log(`📊 Loaded ${matches.length} product-image matches\n`);
  
  let updated = 0;
  let skipped = 0;
  
  for (const match of matches) {
    try {
      if (match.matchedCloudinaryUrls.length === 0) {
        console.log(`⏭️  Skipping ${match.productName} - No images to update`);
        skipped++;
        continue;
      }
      
      // Update the product with Cloudinary URLs
      await db
        .update(products)
        .set({ 
          images: match.matchedCloudinaryUrls 
        })
        .where(eq(products.id, match.productId));
      
      updated++;
      console.log(`✅ Updated ${match.productName}`);
      console.log(`   Images: ${match.matchedCloudinaryUrls.length} (Score: ${match.matchScore})`);
    } catch (error: any) {
      console.error(`❌ Failed to update ${match.productName}: ${error.message}`);
    }
  }
  
  console.log('\n📈 Update Summary:');
  console.log(`✅ Products updated: ${updated}`);
  console.log(`⏭️  Products skipped: ${skipped}`);
  console.log(`📊 Total: ${matches.length}`);
}

updateProductImages()
  .then(() => {
    console.log('\n🎉 Database update completed!');
    console.log('🌐 All product images now use Cloudinary CDN URLs');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Database update failed:', error);
    process.exit(1);
  });
