import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your order number to track your delivery</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <Input 
                  type="text" 
                  placeholder="e.g., ORD-12345-6789" 
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  You can find your order number in your confirmation email
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                Track Order
              </Button>
            </form>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you're having trouble tracking your order, our customer service team is here to help.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <strong>Call:</strong> +254 700 000 000
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> support@partspoa.com
                </p>
                <p className="text-gray-600">
                  <strong>Hours:</strong> Monday - Friday, 8am - 6pm
                </p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Order tracking system is under development. For now, please contact customer service for order updates.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
