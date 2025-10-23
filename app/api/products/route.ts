import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { products } from '@/server/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get('category_id');
    const hot_deals = searchParams.get('hot_deals') === 'true';
    const best_sellers = searchParams.get('best_sellers') === 'true';
    const condition = searchParams.get('condition');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    let query = db.select().from(products);
    const conditions = [];

    if (category_id) {
      conditions.push(eq(products.category_id, category_id));
    }

    if (hot_deals) {
      conditions.push(eq(products.is_hot_deal, true));
    }

    if (best_sellers) {
      conditions.push(eq(products.is_best_seller, true));
    }

    if (condition) {
      conditions.push(eq(products.condition, condition));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    query = query.orderBy(desc(products.created_at)).limit(limit) as any;

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
