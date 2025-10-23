import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose max-w-none space-y-6 text-gray-600">
            <p className="text-lg">Last updated: October 2025</p>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p>At PartsPOA, we collect information that you provide directly to us, including your name, email address, phone number, shipping address, and payment information when you create an account or make a purchase.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to process your orders, communicate with you about your purchases, improve our services, and send you marketing communications (with your consent).</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with service providers who help us operate our platform, process payments, and deliver products to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@partspoa.com or call +254 700 000 000.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
