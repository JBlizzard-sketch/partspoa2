import { NextResponse } from 'next/server';
import { getFeaturedProducts } from '@/lib/db-queries';

export async function GET() {
  try {
    const products = await getFeaturedProducts(8);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in featured products API:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
