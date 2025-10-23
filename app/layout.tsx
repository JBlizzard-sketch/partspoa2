import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://partspoa.com'),
  title: {
    default: 'PartsPOA - Quality Auto Parts at Unbeatable Prices',
    template: '%s | PartsPOA'
  },
  description: 'Kenya\'s leading online marketplace for automotive parts and accessories. Shop genuine and aftermarket parts for all makes and models with fast delivery across Kenya.',
  keywords: ['auto parts Kenya', 'car parts Nairobi', 'automotive parts', 'genuine parts', 'aftermarket parts', 'online auto parts', 'Kenya car accessories'],
  authors: [{ name: 'PartsPOA' }],
  creator: 'PartsPOA',
  publisher: 'PartsPOA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: '/',
    title: 'PartsPOA - Quality Auto Parts at Unbeatable Prices',
    description: 'Kenya\'s leading online marketplace for automotive parts and accessories. Shop genuine and aftermarket parts for all makes and models.',
    siteName: 'PartsPOA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PartsPOA - Quality Auto Parts at Unbeatable Prices',
    description: 'Kenya\'s leading online marketplace for automotive parts and accessories.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
