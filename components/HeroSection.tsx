import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Quality Auto Parts at Unbeatable Prices
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Find genuine and aftermarket parts for all makes and models.
            Fast delivery across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold"
              asChild
            >
              <Link href="/new-parts">
                Shop New Parts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
              asChild
            >
              <Link href="/used-parts">Browse Used Parts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
