import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export const metadata = {
  title: "Forgot Password - Reset Your Password | PartsPOA",
  description: "Reset your PartsPOA account password. We'll send you instructions to recover your account.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">
                Enter your email and we'll send you instructions to reset your password
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input type="email" placeholder="your@email.com" />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Reset Instructions</Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                ← Back to Login
              </Link>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Password reset functionality is under development. 
                If you need help accessing your account, please contact us on WhatsApp at +254 700 000 000.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
