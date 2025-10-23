import { NextResponse } from 'next/server';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/db-queries';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await getCategoryBySlug(params.slug);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    const products = await getProductsByCategory(category.id);
    
    return NextResponse.json({
      category,
      products,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}
