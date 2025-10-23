import { db } from '@/server/db';
import { categories, products } from '@/server/schema';
import { eq, desc } from 'drizzle-orm';

export async function getCategories() {
  try {
    const result = await db
      .select()
      .from(categories)
      .orderBy(categories.display_order);
    return result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getFeaturedProducts(limit: number = 8) {
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.is_featured, true))
      .limit(limit);
    return result;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: string, limit?: number) {
  try {
    const query = db
      .select()
      .from(products)
      .where(eq(products.category_id, categoryId));
    
    const result = limit ? await query.limit(limit) : await query;
    return result;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}
