'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ShoppingCart, Heart, Star, Truck, Shield, RefreshCcw, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          
          if (data.category_id) {
            const relatedResponse = await fetch(`/api/products?category_id=${data.category_id}&limit=4`);
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              setRelatedProducts(relatedData.filter((p: Product) => p.id !== data.id).slice(0, 4));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'];

  const discount = product.compare_at_price
    ? Math.round(((Number(product.compare_at_price) - Number(product.price)) / Number(product.compare_at_price)) * 100)
    : 0;

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: images[0],
      stock_quantity: product.stock_quantity ?? 0,
    };
    
    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : undefined,
      image: images[0],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.is_hot_deal && (
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">Hot Deal</Badge>
                )}
                {product.is_best_seller && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                    Best Seller
                  </Badge>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(Number(product.rating))
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.review_count} reviews)</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  KSh {Number(product.price).toLocaleString()}
                </span>
                {product.compare_at_price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      KSh {Number(product.compare_at_price).toLocaleString()}
                    </span>
                    <Badge className="bg-green-500">Save {discount}%</Badge>
                  </>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Badge variant={product.stock_quantity && product.stock_quantity > 0 ? 'default' : 'destructive'}>
                    {product.stock_quantity && product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                  <Badge variant="outline">{product.condition === 'new' ? 'New' : 'Used'}</Badge>
                  {product.sku && (
                    <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                  )}
                </div>

                {product.description && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock_quantity ?? 1)))}
                      className="w-16 text-center border-0 focus:outline-none"
                      min={1}
                      max={product.stock_quantity ?? 1}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min((product.stock_quantity ?? 1), quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock_quantity} available
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.stock_quantity || product.stock_quantity <= 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Free delivery on orders over KSh 10,000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Genuine parts with warranty</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <RefreshCcw className="w-5 h-5 text-blue-600" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Quality checked and verified</span>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="py-12 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => {
                  const relatedImages = Array.isArray(relatedProduct.images) ? relatedProduct.images : [];
                  return (
                    <ProductCard
                      key={relatedProduct.id}
                      id={relatedProduct.id}
                      name={relatedProduct.name}
                      slug={relatedProduct.slug}
                      price={Number(relatedProduct.price)}
                      compareAtPrice={relatedProduct.compare_at_price ? Number(relatedProduct.compare_at_price) : undefined}
                      image={relatedImages[0] || 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'}
                      rating={relatedProduct.rating ? Number(relatedProduct.rating) : undefined}
                      reviewCount={relatedProduct.review_count ?? 0}
                      condition={relatedProduct.condition as 'new' | 'used'}
                      isHotDeal={relatedProduct.is_hot_deal ?? false}
                      isBestSeller={relatedProduct.is_best_seller ?? false}
                      stock_quantity={relatedProduct.stock_quantity ?? 0}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
