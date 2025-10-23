import { db } from '../server/db';
import { categories, products } from '../server/schema';
import { categoryData, productData } from './generated-seed-data';
import { sql } from 'drizzle-orm';

async function setup() {
  console.log('🚀 Starting automated setup...\n');

  try {
    // Step 1: Create tables if they don't exist
    console.log('📋 Step 1: Ensuring database tables exist...');
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        image_url TEXT,
        parent_id UUID,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        compare_at_price DECIMAL(10, 2),
        stock_quantity INTEGER DEFAULT 0,
        condition TEXT DEFAULT 'new',
        sku TEXT UNIQUE,
        images JSONB DEFAULT '[]'::jsonb,
        is_featured BOOLEAN DEFAULT false,
        is_hot_deal BOOLEAN DEFAULT false,
        is_best_seller BOOLEAN DEFAULT false,
        rating DECIMAL(3, 2),
        review_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        full_name TEXT,
        phone TEXT,
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
        quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS wishlist (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        status TEXT DEFAULT 'pending',
        total_amount DECIMAL(10, 2) NOT NULL,
        shipping_address JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    console.log('✅ All tables exist\n');

    // Step 2: Check if database needs seeding
    console.log('📋 Step 2: Checking database content...');
    const existingCategories = await db.select().from(categories);
    const existingProducts = await db.select().from(products);

    if (existingCategories.length > 0 || existingProducts.length > 0) {
      console.log('✅ Database already seeded:');
      console.log(`   Categories: ${existingCategories.length}`);
      console.log(`   Products: ${existingProducts.length}\n`);
      
      // Verify Cloudinary images
      const productsWithCloudinary = existingProducts.filter(p => 
        Array.isArray(p.images) && p.images.length > 0 && 
        p.images[0].includes('cloudinary.com')
      );
      console.log('📊 Image verification:');
      console.log(`   Products with Cloudinary images: ${productsWithCloudinary.length}/${existingProducts.length}\n`);
      
      if (productsWithCloudinary.length < existingProducts.length) {
        console.log('⚠️  Some products missing Cloudinary images!');
        console.log('   Run: npm run db:seed to update\n');
      }
    } else {
      console.log('⚠️  Database is empty. Seeding now...\n');

      // Insert categories
      console.log('📦 Inserting categories...');
      const insertedCategories = await db.insert(categories).values(categoryData).returning();
      console.log(`✅ Inserted ${insertedCategories.length} categories\n`);

      // Create category map
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

      // Verify images
      const productsWithCloudinary = insertedProducts.filter(p => 
        Array.isArray(p.images) && p.images.length > 0 && 
        p.images[0].includes('cloudinary.com')
      );
      
      console.log('📊 Verification:');
      console.log(`   Products with Cloudinary images: ${productsWithCloudinary.length}/${insertedProducts.length}`);
      const totalImages = productsWithCloudinary.reduce((sum, p) => sum + (p.images as string[]).length, 0);
      console.log(`   Total Cloudinary images: ${totalImages}\n`);
    }

    // Step 3: Final verification
    console.log('📋 Step 3: Final verification...');
    const finalCategories = await db.select().from(categories);
    const finalProducts = await db.select().from(products);
    
    console.log('✅ Setup complete!');
    console.log(`   Categories: ${finalCategories.length}`);
    console.log(`   Products: ${finalProducts.length}`);
    console.log('\n🎉 Your database is ready to use!\n');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    throw error;
  }
}

setup()
  .then(() => {
    console.log('✨ Setup finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });
