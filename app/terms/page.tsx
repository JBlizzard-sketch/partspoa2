import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="prose max-w-none space-y-6 text-gray-600">
            <p className="text-lg">Last updated: October 2025</p>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p>By accessing and using PartsPOA, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Service</h2>
              <p>You must be at least 18 years old to use our services. You agree to provide accurate information and maintain the security of your account credentials.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
              <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Payments</h2>
              <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment must be received before order processing.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p>PartsPOA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p>For questions about these Terms of Service, contact us at legal@partspoa.com or call +254 700 000 000.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
