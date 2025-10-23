import { db } from '../server/db';
import { categories, products } from '../server/schema';
import { categoryData, productData } from './generated-seed-data';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Check if database is already seeded
    const existingCategories = await db.select().from(categories);
    const existingProducts = await db.select().from(products);

    if (existingProducts.length > 0) {
      console.log('⚠️  Database already contains products:');
      console.log(`   Categories: ${existingCategories.length}`);
      console.log(`   Products: ${existingProducts.length}`);
      console.log('\n✅ Skipping seeding to avoid duplicates');
      console.log('   To re-seed, clear products first\n');
      return;
    }

    // Insert categories (skip if already exist)
    let insertedCategories;
    if (existingCategories.length === 0) {
      console.log('📦 Inserting categories...');
      insertedCategories = await db.insert(categories).values(categoryData).returning();
      console.log(`✅ Inserted ${insertedCategories.length} categories\n`);
    } else {
      console.log(`📦 Using existing ${existingCategories.length} categories\n`);
      insertedCategories = existingCategories;
    }

    // Create a map of category slugs to IDs
    const categoryMap = new Map(
      insertedCategories.map(cat => [cat.slug, cat.id])
    );

    // Insert products with Cloudinary images
    console.log('🛍️  Inserting products with Cloudinary images...');
    const productsToInsert = productData.map(product => ({
      category_id: categoryMap.get(product.categorySlug),
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compare_at_price: product.compare_at_price,
      stock_quantity: product.stock_quantity,
      condition: product.condition,
      sku: product.sku,
      images: product.images,
      is_featured: product.is_featured,
      is_hot_deal: product.is_hot_deal,
      is_best_seller: product.is_best_seller,
      rating: product.rating,
      review_count: product.review_count,
    }));

    const insertedProducts = await db.insert(products).values(productsToInsert).returning();
    console.log(`✅ Inserted ${insertedProducts.length} products\n`);

    // Verify images are Cloudinary URLs
    const productsWithCloudinary = insertedProducts.filter(p => 
      Array.isArray(p.images) && p.images.length > 0 && 
      p.images[0].includes('cloudinary.com')
    );
    
    console.log('📊 Verification:');
    console.log(`   Products with Cloudinary images: ${productsWithCloudinary.length}/${insertedProducts.length}`);
    
    if (productsWithCloudinary.length !== insertedProducts.length) {
      console.warn(`\n⚠️  Warning: ${insertedProducts.length - productsWithCloudinary.length} products missing Cloudinary images`);
    } else {
      console.log('   ✅ All products have Cloudinary images!\n');
    }

    console.log('🎉 Database seeding complete!');
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   Total Cloudinary images: ${productsWithCloudinary.reduce((sum, p) => sum + (p.images as string[]).length, 0)}\n`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('✨ Seeding finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
