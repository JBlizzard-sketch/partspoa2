import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RotateCcw, Shield, Clock, CheckCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Refunds</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">14-Day Returns</h3>
                <p className="text-sm text-gray-600">Easy returns within 14 days</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">Full refund for defective items</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Free Returns</h3>
                <p className="text-sm text-gray-600">No extra cost for returns</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Quick Process</h3>
                <p className="text-sm text-gray-600">Fast refund processing</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Policy</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">
                    At PartsPOA, we stand behind the quality of our products. If you're not completely satisfied 
                    with your purchase, we'll make it right. Our return policy is designed to be simple and fair.
                  </p>
                  <p>
                    You may return most new, unused items within 14 days of delivery for a full refund. 
                    We'll also pay the return shipping costs if the return is a result of our error 
                    (you received an incorrect or defective item, etc.).
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligible Returns</h2>
                <div className="bg-green-50 border-l-4 border-green-400 p-6 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Items in original, unused condition with all packaging and labels intact</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Defective or damaged items</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Wrong items received</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Items not matching product description</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Parts that have been installed or used</li>
                  <li>Electrical components that have been connected</li>
                  <li>Special order or custom-made items</li>
                  <li>Items without original packaging or missing components</li>
                  <li>Products damaged due to misuse or improper installation</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Contact Us</h3>
                      <p className="text-gray-600">
                        Email us at returns@partspoa.com or call +254 700 000 000 with your order number 
                        and reason for return. Include photos if the item is defective or damaged.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Receive Return Authorization</h3>
                      <p className="text-gray-600">
                        Our team will review your request and provide you with a Return Authorization 
                        Number (RAN) and return shipping instructions within 24 hours.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Package the Item</h3>
                      <p className="text-gray-600">
                        Carefully pack the item in its original packaging. Include all accessories, 
                        manuals, and documentation. Write the RAN clearly on the outside of the package.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Ship the Return</h3>
                      <p className="text-gray-600">
                        Ship the package using the provided return label or courier service. We recommend 
                        using a trackable shipping method.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      5
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">Receive Your Refund</h3>
                      <p className="text-gray-600">
                        Once we receive and inspect your return, we'll process your refund within 3-5 
                        business days. You'll receive confirmation via email.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Method</h2>
                <p className="text-gray-600 mb-4">
                  Refunds will be issued to your original payment method:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>M-PESA: Refunded to your M-PESA number within 1-2 business days</li>
                  <li>Credit/Debit Card: Refunded to your card within 5-10 business days</li>
                  <li>Bank Transfer: Refunded to your bank account within 3-5 business days</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
                <p className="text-gray-600">
                  If you need to exchange an item for a different size, color, or model, please follow 
                  the return process and place a new order for the item you want. This ensures you get 
                  your replacement faster.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our customer service team is here to assist you with returns, refunds, or any 
                  questions you may have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/faq"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View FAQs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
