'use client';

import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  condition: 'new' | 'used';
  isHotDeal?: boolean;
  isBestSeller?: boolean;
  stock_quantity?: number;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  rating,
  reviewCount = 0,
  condition,
  isHotDeal,
  isBestSeller,
  stock_quantity = 1,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      slug,
      price,
      image,
      stock_quantity,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist({
      id,
      name,
      slug,
      price,
      compare_at_price: compareAtPrice,
      image,
    });
  };

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Link href={`/products/${slug}`} className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              loading="lazy"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isHotDeal && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg text-white font-bold animate-pulse">
              🔥 HOT DEAL
            </Badge>
          )}
          {isBestSeller && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 shadow-lg text-gray-900 font-bold">
              ⭐ BEST SELLER
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg text-white font-bold">
              -{discount}% OFF
            </Badge>
          )}
          {condition === 'new' && !isHotDeal && !isBestSeller && (
            <Badge className="bg-blue-500 hover:bg-blue-600 shadow text-white font-semibold">
              NEW
            </Badge>
          )}
          {condition === 'used' && (
            <Badge variant="secondary" className="shadow font-semibold">USED</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full ${
            isInWishlist(id) ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist(id) ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="p-5">
        <Link href={`/products/${slug}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-lg leading-tight">
            {name}
          </h3>
        </Link>

        {rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">({reviewCount})</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            KSh {price.toLocaleString()}
          </span>
          {compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              KSh {compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200" 
          size="sm"
          onClick={handleAddToCart}
          disabled={stock_quantity <= 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {stock_quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
