import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find answers to common questions about PartsPOA
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What types of auto parts do you sell?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We offer a wide range of automotive parts including engine components, body parts, 
                  electrical systems, suspension, brakes, interior and exterior accessories, and 
                  maintenance items. We stock both new and used parts from verified sellers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How do I know if a part fits my vehicle?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Each product listing includes compatibility information. You can also use our search 
                  feature to find parts specific to your vehicle's make, model, and year. If you're 
                  unsure, our customer support team can help you verify compatibility.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We accept M-PESA, Visa, Mastercard, and bank transfers. All payments are processed 
                  securely through our payment gateway. You'll receive instant confirmation once your 
                  payment is successful.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How long does delivery take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Delivery times vary by location. Within Nairobi, we deliver within 1-2 business days. 
                  For other major cities, expect 2-4 business days. Remote areas may take 5-7 business 
                  days. You'll receive tracking information once your order ships.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What is your return policy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We offer a 14-day return policy for unused parts in original packaging. If a part is 
                  defective or doesn't match the description, we'll provide a full refund or replacement. 
                  Please refer to our Returns & Refunds page for complete details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Are the parts genuine or aftermarket?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We sell both genuine OEM parts and quality aftermarket alternatives. Each listing 
                  clearly indicates whether the part is genuine or aftermarket. All parts are verified 
                  for quality before being listed on our platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Can I become a seller on PartsPOA?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! We welcome sellers who want to reach more customers. Visit our "Start Selling" 
                  page to learn about the registration process, seller requirements, and commission 
                  structure. Our team will guide you through the onboarding process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Do you offer installation services?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  While we don't provide installation services directly, we can recommend trusted 
                  mechanics and auto shops in your area. Some of our seller partners also offer 
                  installation services at an additional cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How can I track my order?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Once your order ships, you'll receive a tracking number via SMS and email. You can 
                  also track your order by logging into your account and visiting the "Track Order" 
                  page. Our customer support team is available to assist with tracking inquiries.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What if I receive a wrong or damaged part?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  If you receive a wrong or damaged part, contact us immediately with photos and your 
                  order number. We'll arrange for a replacement or full refund at no additional cost. 
                  Customer satisfaction is our top priority.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 bg-blue-50 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                Our customer support team is here to help!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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
