import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick shipping across Kenya',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Authentic parts from trusted sellers',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert assistance anytime',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'M-PESA & card payments',
  },
];

export function FeatureSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 bg-white p-6 rounded-lg border"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
