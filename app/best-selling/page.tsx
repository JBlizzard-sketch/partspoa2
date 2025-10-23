'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

export default function BestSellingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?best_sellers=true&limit=24');
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Best Selling Parts</h1>
            </div>
            <p className="text-xl text-yellow-100">Most popular parts trusted by thousands</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading best sellers...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                  const images = Array.isArray(product.images) ? product.images : [];
                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      price={Number(product.price)}
                      compareAtPrice={product.compare_at_price ? Number(product.compare_at_price) : undefined}
                      image={images[0] || ''}
                      rating={product.rating ? Number(product.rating) : undefined}
                      reviewCount={product.review_count ?? 0}
                      condition={product.condition as 'new' | 'used'}
                      isHotDeal={product.is_hot_deal ?? false}
                      isBestSeller={product.is_best_seller ?? false}
                      stock_quantity={product.stock_quantity ?? 0}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
