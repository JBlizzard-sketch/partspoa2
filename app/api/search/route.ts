import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { products } from '@/server/schema';
import { ilike, or } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json([]);
    }
    
    const searchTerm = `%${query}%`;
    const results = await db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, searchTerm),
          ilike(products.description, searchTerm),
          ilike(products.sku, searchTerm)
        )
      )
      .limit(50);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}
