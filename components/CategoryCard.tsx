import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  href: string;
  icon: LucideIcon;
  productCount?: number;
}

export function CategoryCard({ name, href, icon: Icon, productCount }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg border hover:border-blue-600 hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center justify-center text-center group">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
          <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        {productCount !== undefined && (
          <p className="text-sm text-gray-500">{productCount} Products</p>
        )}
      </div>
    </Link>
  );
}
