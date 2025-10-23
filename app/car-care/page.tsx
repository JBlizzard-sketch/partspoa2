import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Wrench, Droplet, Shield, Sparkles } from 'lucide-react';

export default function CarCarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Care & Maintenance</h1>
            <p className="text-xl text-purple-100">Keep your vehicle in top condition</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Maintenance Parts</h3>
                <p className="text-gray-600">Filters, belts, hoses, and essential maintenance components</p>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplet className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fluids & Oils</h3>
                <p className="text-gray-600">Engine oils, brake fluids, coolants, and lubricants</p>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Protection</h3>
                <p className="text-gray-600">Covers, guards, and protective accessories</p>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cleaning Products</h3>
                <p className="text-gray-600">Car wash supplies, waxes, and detailing products</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                We're building a comprehensive car care section with maintenance parts, fluids, cleaning products, and more. Check back soon!
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse All Parts
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
