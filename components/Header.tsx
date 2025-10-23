'use client';

import { Search, ShoppingCart, Heart, Menu, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+254 700 000 000</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>info@partspoa.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login / Register</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-xl">
              PARTS<span className="text-yellow-400">POA</span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="search"
                placeholder="Search for parts, accessories..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-full rounded-l-none"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="search"
              placeholder="Search for parts..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-0 top-0 h-full rounded-l-none"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <nav className="bg-gray-50 border-t hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto">
            <li>
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/new-parts"
                className="block px-4 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                New Parts
              </Link>
            </li>
            <li>
              <Link
                href="/used-parts"
                className="block px-4 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Used Parts
              </Link>
            </li>
            <li>
              <Link
                href="/hot-deals"
                className="block px-4 py-3 text-sm font-medium text-red-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Hot Deals
              </Link>
            </li>
            <li>
              <Link
                href="/best-selling"
                className="block px-4 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Best Selling
              </Link>
            </li>
            <li>
              <Link
                href="/car-care"
                className="block px-4 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Car Care
              </Link>
            </li>
            <li>
              <Link
                href="/start-selling"
                className="block px-4 py-3 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 transition-colors"
              >
                Start Selling
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <ul className="py-2">
            <li>
              <Link href="/" className="block px-4 py-3 hover:bg-gray-50">
                Home
              </Link>
            </li>
            <li>
              <Link href="/new-parts" className="block px-4 py-3 hover:bg-gray-50">
                New Parts
              </Link>
            </li>
            <li>
              <Link href="/used-parts" className="block px-4 py-3 hover:bg-gray-50">
                Used Parts
              </Link>
            </li>
            <li>
              <Link href="/hot-deals" className="block px-4 py-3 hover:bg-gray-50 text-red-600">
                Hot Deals
              </Link>
            </li>
            <li>
              <Link href="/best-selling" className="block px-4 py-3 hover:bg-gray-50">
                Best Selling
              </Link>
            </li>
            <li>
              <Link href="/car-care" className="block px-4 py-3 hover:bg-gray-50">
                Car Care
              </Link>
            </li>
            <li>
              <Link href="/start-selling" className="block px-4 py-3 hover:bg-gray-50 bg-yellow-50">
                Start Selling
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
