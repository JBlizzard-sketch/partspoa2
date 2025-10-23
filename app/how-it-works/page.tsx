import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Search, ShoppingCart, CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How PartsPOA Works</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Shopping for auto parts made simple and secure
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Search for Parts</h3>
                  <p className="text-gray-600 mb-4">
                    Use our powerful search to find the exact part you need. Filter by category, vehicle make/model, condition, and price.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Search className="w-12 h-12 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-700">Browse 160+ parts across 8 categories</p>
                  </div>
                </div>
                <div className="md:w-2/3 bg-gray-100 p-8 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Tips:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Use specific keywords like part numbers or model names
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Check product descriptions for compatibility
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Read seller ratings and reviews
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Add to Cart</h3>
                  <p className="text-gray-600 mb-4">
                    Found what you need? Add items to your cart and continue shopping or proceed to checkout.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <ShoppingCart className="w-12 h-12 text-green-600 mb-2" />
                    <p className="text-sm text-gray-700">Save items for later in your wishlist</p>
                  </div>
                </div>
                <div className="md:w-2/3 bg-gray-100 p-8 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Shopping Features:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Save items to wishlist for future purchase
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      See real-time stock availability
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Compare prices from multiple sellers
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Payment</h3>
                  <p className="text-gray-600 mb-4">
                    Choose your preferred payment method and complete your purchase securely.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <CreditCard className="w-12 h-12 text-yellow-600 mb-2" />
                    <p className="text-sm text-gray-700">M-PESA, Visa, Mastercard accepted</p>
                  </div>
                </div>
                <div className="md:w-2/3 bg-gray-100 p-8 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Options:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      M-PESA for instant payments
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Credit/Debit cards (Visa, Mastercard)
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Secure payment gateway with SSL encryption
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Your parts are carefully packaged and delivered to your doorstep.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Truck className="w-12 h-12 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-700">Track your order in real-time</p>
                  </div>
                </div>
                <div className="md:w-2/3 bg-gray-100 p-8 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Delivery Benefits:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Nationwide delivery across Kenya
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      1-7 business days depending on location
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Free shipping on orders over KSh 10,000
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of satisfied customers who trust PartsPOA for their auto parts needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
