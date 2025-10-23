'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  addItem: (product: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: WishlistItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast.info('Already in wishlist', {
          description: `${product.name} is already in your wishlist`,
        });
        return currentItems;
      }
      
      toast.success('Added to wishlist', {
        description: `${product.name} has been added to your wishlist`,
      });
      
      return [...currentItems, product];
    });
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((item) => item.id === id);
      if (item) {
        toast.success('Removed from wishlist', {
          description: `${item.name} has been removed from your wishlist`,
        });
      }
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success('Wishlist cleared', {
      description: 'All items have been removed from your wishlist',
    });
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
