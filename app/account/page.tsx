import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Package, Heart, Settings } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/account" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-sm text-gray-600">Manage your personal information</p>
            </a>

            <a href="/orders" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orders</h3>
              <p className="text-sm text-gray-600">View your order history</p>
            </a>

            <a href="/wishlist" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Wishlist</h3>
              <p className="text-sm text-gray-600">Saved items for later</p>
            </a>

            <a href="/account" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-sm text-gray-600">Account preferences</p>
            </a>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Account Dashboard Coming Soon</h3>
              <p className="text-gray-600">
                We're building a comprehensive account management system. Soon you'll be able to manage your 
                profile, track orders, save addresses, and more. Please{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">login</a>
                {' '}to access available features.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
