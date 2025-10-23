import { db } from '../server/db';
import { products } from '../server/schema';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface UploadResult {
  filename: string;
  cloudinaryUrl: string;
  publicId: string;
  success: boolean;
}

interface ProductImageMatch {
  productId: string;
  productName: string;
  productSku: string | null;
  currentImages: string[];
  matchedCloudinaryUrls: string[];
  matchScore: number;
  matchReason: string;
}

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function calculateMatchScore(
  filename: string,
  productName: string,
  productSku: string | null
): { score: number; reason: string } {
  const normalizedFilename = normalizeString(filename);
  const normalizedProductName = normalizeString(productName);
  const normalizedSku = productSku ? normalizeString(productSku) : '';
  
  // Exact SKU match (highest priority)
  if (normalizedSku && normalizedFilename.includes(normalizedSku)) {
    return { score: 100, reason: `SKU match: ${productSku}` };
  }
  
  // Exact product name match
  if (normalizedFilename.includes(normalizedProductName)) {
    return { score: 90, reason: `Full product name match` };
  }
  
  // Extract key components from product name and filename
  const productWords = normalizedProductName.split(/\s+/).filter(w => w.length > 2);
  const filenameWords = normalizedFilename.split('_').filter(w => w.length > 2);
  
  // Count matching words
  let matchingWords = 0;
  const matchedTerms: string[] = [];
  
  for (const productWord of productWords) {
    if (filenameWords.some(fw => fw.includes(productWord) || productWord.includes(fw))) {
      matchingWords++;
      matchedTerms.push(productWord);
    }
  }
  
  if (matchingWords >= 3) {
    return { score: 80, reason: `Multiple keywords match: ${matchedTerms.join(', ')}` };
  }
  
  if (matchingWords >= 2) {
    return { score: 60, reason: `Partial keywords match: ${matchedTerms.join(', ')}` };
  }
  
  if (matchingWords === 1) {
    return { score: 30, reason: `Single keyword match: ${matchedTerms[0]}` };
  }
  
  return { score: 0, reason: 'No match found' };
}

async function matchImagesToProducts(): Promise<void> {
  console.log('🔍 Starting intelligent image-to-product matching...\n');
  
  // Load upload results
  const uploadResultsPath = path.join(process.cwd(), 'scripts/cloudinary-upload-results.json');
  
  if (!fs.existsSync(uploadResultsPath)) {
    console.error('❌ Upload results file not found. Please run upload-to-cloudinary.ts first.');
    process.exit(1);
  }
  
  const uploadResults: UploadResult[] = JSON.parse(fs.readFileSync(uploadResultsPath, 'utf-8'));
  const successfulUploads = uploadResults.filter(r => r.success);
  
  console.log(`📊 Loaded ${successfulUploads.length} successfully uploaded images`);
  
  // Get all products from database
  const allProducts = await db.select().from(products);
  console.log(`📦 Found ${allProducts.length} products in database\n`);
  
  const matches: ProductImageMatch[] = [];
  let productsWithMatches = 0;
  let productsWithoutMatches = 0;
  
  for (const product of allProducts) {
    const productMatches: { url: string; score: number; reason: string }[] = [];
    
    // Try to match each uploaded image to this product
    for (const upload of successfulUploads) {
      const match = calculateMatchScore(upload.filename, product.name, product.sku);
      
      if (match.score >= 30) {
        productMatches.push({
          url: upload.cloudinaryUrl,
          score: match.score,
          reason: match.reason,
        });
      }
    }
    
    // Sort by score and take best matches
    productMatches.sort((a, b) => b.score - a.score);
    const topMatches = productMatches.slice(0, 5); // Max 5 images per product
    
    if (topMatches.length > 0) {
      productsWithMatches++;
      const bestMatch = topMatches[0];
      
      matches.push({
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        currentImages: product.images as string[],
        matchedCloudinaryUrls: topMatches.map(m => m.url),
        matchScore: bestMatch.score,
        matchReason: bestMatch.reason,
      });
      
      console.log(`✅ ${product.name}`);
      console.log(`   Matched ${topMatches.length} image(s) - Score: ${bestMatch.score} (${bestMatch.reason})`);
    } else {
      productsWithoutMatches++;
      console.log(`⚠️  ${product.name} - No images matched`);
    }
  }
  
  console.log('\n📈 Matching Summary:');
  console.log(`✅ Products with matched images: ${productsWithMatches}`);
  console.log(`⚠️  Products without images: ${productsWithoutMatches}`);
  console.log(`📊 Total products: ${allProducts.length}`);
  
  // Save matching results
  const outputPath = path.join(process.cwd(), 'scripts/image-product-matches.json');
  fs.writeFileSync(outputPath, JSON.stringify(matches, null, 2));
  console.log(`\n💾 Matching results saved to: ${outputPath}`);
  console.log('\n📝 Review this file before running the database update script.');
}

matchImagesToProducts()
  .then(() => {
    console.log('\n🎉 Matching process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Matching process failed:', error);
    process.exit(1);
  });
