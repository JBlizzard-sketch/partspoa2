import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Store, TrendingUp, DollarSign, Users, CheckCircle } from 'lucide-react';

export default function StartSellingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Selling on PartsPOA</h1>
            <p className="text-xl text-yellow-100 max-w-2xl mx-auto mb-8">
              Join Kenya's fastest-growing automotive parts marketplace and reach thousands of potential customers
            </p>
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Apply Now
            </a>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Sell on PartsPOA?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Large Customer Base</h3>
                <p className="text-gray-600">Access thousands of active buyers across Kenya</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Increase Sales</h3>
                <p className="text-gray-600">Boost your revenue with our marketing support</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Competitive Fees</h3>
                <p className="text-gray-600">Low commission rates and no hidden charges</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                <p className="text-gray-600">Simple dashboard to manage your inventory</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Register Your Business</h3>
                  <p className="text-gray-600">
                    Fill out our simple application form with your business details and required documents.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Verified</h3>
                  <p className="text-gray-600">
                    Our team reviews your application and verifies your business credentials (usually within 48 hours).
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">List Your Products</h3>
                  <p className="text-gray-600">
                    Upload your inventory with photos, descriptions, and pricing. Our tools make it easy.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
                  <p className="text-gray-600">
                    Receive orders, manage inventory, and track sales through your seller dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Seller Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Registered Business</h3>
                  <p className="text-sm text-gray-600">Valid business registration certificate</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Tax Compliance</h3>
                  <p className="text-sm text-gray-600">KRA PIN and tax compliance certificate</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Quality Products</h3>
                  <p className="text-sm text-gray-600">Genuine and quality automotive parts</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Good Customer Service</h3>
                  <p className="text-sm text-gray-600">Commitment to customer satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of successful sellers on PartsPOA today
            </p>
            <div className="bg-white rounded-lg p-8 text-gray-900">
              <p className="mb-6">
                Seller onboarding system is under development. To start selling on PartsPOA, please contact us directly:
              </p>
              <div className="space-y-3 text-left">
                <p><strong>Email:</strong> sellers@partspoa.com</p>
                <p><strong>Phone:</strong> +254 700 000 000</p>
                <p><strong>WhatsApp:</strong> +254 720 000 000</p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Learn More
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
