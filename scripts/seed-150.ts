import { db } from '../server/db';
import { categories, products } from '../server/schema';
import { categoryData, productData } from './seed-data-150';

async function seed150() {
  console.log('🌱 Seeding 150 products...\n');

  try {
    // Get existing categories
    const existingCategories = await db.select().from(categories);
    
    const categoryMap = new Map(
      existingCategories.map(cat => [cat.slug, cat.id])
    );

    console.log(`📦 Found ${existingCategories.length} categories\n`);

    // Insert products with Cloudinary images
    console.log('🛍️  Inserting 150 products...');
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
    console.log(`   Total images: ${productsWithCloudinary.reduce((sum, p) => sum + (p.images as string[]).length, 0)}\n`);

    // Distribution stats
    const newCount = insertedProducts.filter(p => p.condition === 'new').length;
    const usedCount = insertedProducts.filter(p => p.condition === 'used').length;
    const hotDeals = insertedProducts.filter(p => p.is_hot_deal).length;
    const bestSellers = insertedProducts.filter(p => p.is_best_seller).length;
    const featured = insertedProducts.filter(p => p.is_featured).length;

    console.log('📈 Distribution:');
    console.log(`   New parts: ${newCount} (${Math.round(newCount/insertedProducts.length*100)}%)`);
    console.log(`   Used parts: ${usedCount} (${Math.round(usedCount/insertedProducts.length*100)}%)`);
    console.log(`   Hot Deals: ${hotDeals}`);
    console.log(`   Best Sellers: ${bestSellers}`);
    console.log(`   Featured: ${featured}\n`);

    console.log('🎉 Database seeding complete!');
    console.log(`   Total Products: ${insertedProducts.length}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed150()
  .then(() => {
    console.log('\n✨ Seeding finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });
