import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <div className="prose max-w-none space-y-6 text-gray-600">
            <p className="text-lg">Last updated: October 2025</p>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, including shopping cart and checkout functionality.</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and choices to provide enhanced features.</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p>We may use third-party services such as analytics tools that use cookies. These third parties have their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us at privacy@partspoa.com.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
