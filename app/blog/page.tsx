import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Auto Parts Blog - Tips & Guides | PartsPOA",
  description: "Expert advice on car maintenance, auto parts selection, and vehicle care in Kenya. Learn how to maintain your car and choose quality parts.",
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "top-10-essential-car-parts-kenyan-drivers",
    title: "Top 10 Essential Car Parts Every Kenyan Driver Should Know",
    excerpt: "Discover the most critical car parts that every Kenyan driver should be familiar with for better maintenance and emergency preparedness.",
    category: "Maintenance",
    date: "October 20, 2025",
    readTime: "8 min read",
    image: "/stock/car-parts.jpg"
  },
  {
    slug: "how-to-choose-quality-auto-parts-kenya",
    title: "How to Choose Quality Auto Parts in Kenya: Complete Guide",
    excerpt: "Learn how to identify genuine parts, avoid counterfeits, and make smart purchasing decisions for your vehicle in the Kenyan market.",
    category: "Buying Guide",
    date: "October 18, 2025",
    readTime: "10 min read",
    image: "/stock/quality-parts.jpg"
  },
  {
    slug: "nairobi-traffic-car-maintenance-tips",
    title: "Surviving Nairobi Traffic: Maintenance Tips for Your Car",
    excerpt: "Essential maintenance tips to keep your car running smoothly despite the challenges of Nairobi's heavy traffic conditions.",
    category: "Maintenance",
    date: "October 15, 2025",
    readTime: "7 min read",
    image: "/stock/nairobi-traffic.jpg"
  },
  {
    slug: "new-vs-used-auto-parts-budget-guide",
    title: "New vs Used Auto Parts: What's Best for Your Budget?",
    excerpt: "A comprehensive comparison to help you decide between new and used auto parts based on your budget and vehicle needs.",
    category: "Buying Guide",
    date: "October 12, 2025",
    readTime: "9 min read",
    image: "/stock/budget-parts.jpg"
  },
  {
    slug: "common-car-problems-kenya-solutions",
    title: "Common Car Problems in Kenya and How to Fix Them",
    excerpt: "Identify and solve the most frequent car issues faced by Kenyan drivers, from overheating to electrical problems.",
    category: "Repairs",
    date: "October 10, 2025",
    readTime: "12 min read",
    image: "/stock/car-repair.jpg"
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Auto Parts Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert advice, maintenance tips, and buying guides for Kenyan car owners. 
          Learn how to keep your vehicle running smoothly.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-200">
                {/* Placeholder for now - will add stock images later */}
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white">
                  <span className="text-sm opacity-75">Image placeholder</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <span className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Newsletter CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Weekly Car Care Tips</h2>
          <p className="mb-6 max-w-xl mx-auto opacity-90">
            Subscribe to our newsletter for expert advice, exclusive deals, and the latest auto parts news.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <button className="px-6 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs opacity-75 mt-3">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
