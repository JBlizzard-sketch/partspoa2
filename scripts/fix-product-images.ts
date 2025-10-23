import { db } from '../server/db';
import { products } from '../server/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

// Read Cloudinary URLs
const cloudinaryUrlsPath = path.join(process.cwd(), 'cloudinary_urls.txt');
const cloudinaryUrls = fs.readFileSync(cloudinaryUrlsPath, 'utf-8').split('\n').filter(Boolean);

// Create a map of filename to Cloudinary URL
const imageMap = new Map<string, string>();
cloudinaryUrls.forEach(url => {
  // Extract filename from URL: https://res.cloudinary.com/dbwfl1ii3/image/upload/v1761086764/filename.jpg
  const parts = url.split('/');
  const filename = parts[parts.length - 1].trim(); // Add trim() to remove whitespace
  if (filename) {
    imageMap.set(filename, url.trim());
  }
});
console.log(`📦 Loaded ${imageMap.size} Cloudinary URLs from file\n`);

// Product image mapping based on current seed data
const productImageMappings = [
  { name: 'Subaru Impreza STI Fuel Pump (2002-2007)', filenames: ['2002-2007_Impreza_STI_fuel_pump.jpg'] },
  { name: 'Honda Fuel Pump Assembly', filenames: ['101961-7332_Fuel_pump_honda.png'] },
  { name: 'Subaru Timing Belt Kit', filenames: ['13028AA21B_timing_belt.jpg'] },
  { name: 'Suzuki Grand Vitara Ignition Coil', filenames: ['33400-51K20_Grand_vitara_ignition_coil.jpg'] },
  { name: 'Toyota/Lexus Brake Pad Set', filenames: ['04465-42200.jpg', '04465-42200br.jpg', '04465-42200rae.jpg'] },
  { name: 'Mazda CX-5 Front Bumper (2018)', filenames: ['2018_cx5_bumper.jpg'] },
  { name: 'Subaru Impreza STI Fuel Pump (2007+)', filenames: ['2007_Impreza_STI_fuel_pump.jpg'] },
  { name: 'Toyota Auris Front Stabilizer Link', filenames: ['48820-47020_Auris_linkg1.jpg'] },
  { name: 'Nissan Clutch Kit', filenames: ['Brakepad_textar.jpg'] },
  { name: 'Nissan March Clutch Assembly', filenames: ['bushes.jpg'] },
  { name: 'Mazda Axela Fog Light Cover (2014)', filenames: ['2014_axela_foglight_cover.jpg'] },
  { name: 'Nissan Headlight Assembly', filenames: ['Allion_260_headlight_Non_Xenon.jpg'] },
  { name: 'Multi-Rib V-Belt 4PK 780', filenames: ['4PK_780_Belt.jpg'] },
  { name: 'Used Honda Civic Engine Control Unit', filenames: ['B62S66DT0_Axela_Computer.jpg'] },
  { name: 'Toyota Corolla Door Mirror (Used)', filenames: ['Axio_161_Side_mirror.jpg'] },
];

async function updateProductImages() {
  console.log('🔧 Fixing product images with Cloudinary URLs...\n');

  // Get all products
  const allProducts = await db.select().from(products);
  console.log(`Found ${allProducts.length} products in database\n`);

  let updated = 0;
  let notFound = 0;

  for (const product of allProducts) {
    const mapping = productImageMappings.find(m => m.name === product.name);
    
    if (mapping) {
      // Map filenames to Cloudinary URLs
      const cloudinaryImages = mapping.filenames
        .map(filename => imageMap.get(filename))
        .filter(Boolean) as string[];

      if (cloudinaryImages.length > 0) {
        await db
          .update(products)
          .set({ images: cloudinaryImages })
          .where(eq(products.id, product.id));
        
        console.log(`✅ Updated: ${product.name}`);
        console.log(`   Images: ${cloudinaryImages.length} Cloudinary URLs`);
        updated++;
      } else {
        console.log(`⚠️  No Cloudinary URLs found for: ${product.name}`);
        console.log(`   Looking for: ${mapping.filenames.join(', ')}`);
        notFound++;
      }
    } else {
      console.log(`⚠️  No mapping for: ${product.name}`);
      notFound++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated} products`);
  console.log(`   Not Found: ${notFound} products`);
  console.log(`\n✨ Image update complete!`);
}

updateProductImages().catch(console.error);
