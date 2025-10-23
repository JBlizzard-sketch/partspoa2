'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import type { Category, Product } from '@/lib/types';
import {
  Car,
  Zap,
  Wrench,
  CircleDot,
  Package,
  Cog,
  Timer,
  Gauge,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'body-parts': Car,
  'exterior': Package,
  'tires': CircleDot,
  'interior': Gauge,
  'suspension': Zap,
  'engine': Cog,
  'replacement': Wrench,
  'car-care': Timer,
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products/featured')
        ]);

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeatureSection />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our extensive collection of automotive parts organized by category
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  href={`/categories/${category.slug}`}
                  icon={iconMap[category.slug] || Package}
                  productCount={0}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Trending Deals
                </h2>
                <p className="text-gray-600">
                  Best prices on popular auto parts
                </p>
              </div>
            </div>
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
                    image={images[0] || 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'}
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
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Sell Your Parts?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of sellers on Kenya's fastest-growing automotive marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/start-selling"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Start Selling Now
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'John Kamau',
                  location: 'Nairobi',
                  rating: 5,
                  comment: 'Fast delivery and genuine parts. Highly recommend PartsPOA for all your car needs!',
                },
                {
                  name: 'Mary Wanjiku',
                  location: 'Mombasa',
                  rating: 5,
                  comment: 'Great prices and excellent customer service. Found exactly what I needed.',
                },
                {
                  name: 'David Ochieng',
                  location: 'Kisumu',
                  rating: 4,
                  comment: 'Wide selection of parts. Saved me a lot compared to local shops.',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
