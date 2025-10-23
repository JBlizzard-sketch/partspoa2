import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Truck, MapPin, Clock, Shield } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Information</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Fast and reliable delivery across Kenya
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">1-7 business days</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Nationwide</h3>
                <p className="text-sm text-gray-600">All major towns</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Order Tracking</h3>
                <p className="text-sm text-gray-600">Real-time updates</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Secure Packaging</h3>
                <p className="text-sm text-gray-600">Safe & protected</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Times</h2>
                <div className="bg-gray-50 border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold">Location</th>
                        <th className="px-6 py-3 text-left font-semibold">Delivery Time</th>
                        <th className="px-6 py-3 text-left font-semibold">Shipping Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">Nairobi & Suburbs</td>
                        <td className="px-6 py-4">1-2 business days</td>
                        <td className="px-6 py-4">KSh 300</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Mombasa, Kisumu, Nakuru</td>
                        <td className="px-6 py-4">2-4 business days</td>
                        <td className="px-6 py-4">KSh 500</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Other Major Towns</td>
                        <td className="px-6 py-4">3-5 business days</td>
                        <td className="px-6 py-4">KSh 700</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Remote Areas</td>
                        <td className="px-6 py-4">5-7 business days</td>
                        <td className="px-6 py-4">KSh 1,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * Free shipping on orders over KSh 10,000 within Nairobi
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Order Confirmation</h3>
                      <p className="text-gray-600">
                        After placing your order, you'll receive an email confirmation with your order details.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Processing</h3>
                      <p className="text-gray-600">
                        Your order is processed and carefully packaged within 24 hours.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Shipping</h3>
                      <p className="text-gray-600">
                        Your package is handed to our courier partner and you receive a tracking number.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Delivery</h3>
                      <p className="text-gray-600">
                        Your parts are delivered to your doorstep. Sign for the package and inspect the items.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Partners</h2>
                <p className="text-gray-600 mb-4">
                  We work with trusted courier services including G4S, DHL, and local delivery partners 
                  to ensure your parts arrive safely and on time.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Important Notes:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Delivery times are estimates and may vary during peak seasons or due to unforeseen circumstances</li>
                  <li>You must provide a valid phone number for delivery coordination</li>
                  <li>Ensure someone is available to receive the package during delivery hours (8am-6pm)</li>
                  <li>Inspect packages upon delivery and report any damage immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
