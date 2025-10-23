import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, Users, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About PartsPOA</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Kenya's leading online marketplace for quality automotive parts and accessories
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg mb-4">
                  Founded in 2024, PartsPOA was born from a simple mission: to make quality automotive parts 
                  accessible and affordable to every car owner in Kenya. We understand the frustration of 
                  searching for the right parts, dealing with unreliable suppliers, and paying inflated prices.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Our platform connects buyers directly with verified sellers across Kenya, eliminating 
                  middlemen and reducing costs. Whether you're looking for genuine OEM parts, quality 
                  aftermarket alternatives, or affordable used parts, PartsPOA has you covered.
                </p>
                <p className="text-gray-700 text-lg">
                  Today, we're proud to serve thousands of customers nationwide, offering the largest 
                  selection of auto parts in East Africa with fast, reliable delivery to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose PartsPOA?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p className="text-gray-600">
                  All parts verified for authenticity and quality before listing
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trusted Sellers</h3>
                <p className="text-gray-600">
                  Network of verified and rated sellers across Kenya
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">
                  Competitive pricing with regular deals and discounts
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nationwide Delivery</h3>
                <p className="text-gray-600">
                  Fast delivery to all major cities and towns in Kenya
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
              <p className="text-gray-700 text-lg mb-8">
                We're committed to providing exceptional service, authentic parts, and a seamless shopping 
                experience. Our customer support team is always ready to help you find the right parts for 
                your vehicle and ensure your satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/start-selling"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Become a Seller
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
