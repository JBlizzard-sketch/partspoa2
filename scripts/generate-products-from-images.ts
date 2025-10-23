import fs from 'fs';
import path from 'path';

interface ProductData {
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  compare_at_price: string | null;
  stock_quantity: number;
  condition: 'new' | 'used';
  sku: string;
  images: string[];
  is_featured: boolean;
  is_hot_deal: boolean;
  is_best_seller: boolean;
  rating: string;
  review_count: number;
}

const categoryKeywords = {
  'interior': ['dashboard', 'seat', 'console', 'trim', 'carpet', 'headliner', 'panel', 'audio', 'amplifier', 'speaker', 'radio', 'climate', 'hvac', 'ac', 'vent'],
  'body-parts': ['bumper', 'fender', 'door', 'hood', 'bonnet', 'trunk', 'boot', 'panel', 'quarter', 'rocker', 'grille', 'nose', 'cut', 'body', 'kit', 'upgrade', 'stone', 'guard'],
  'exterior': ['headlight', 'tail', 'light', 'mirror', 'lens', 'foglight', 'lamp', 'wiper', 'antenna', 'emblem', 'badge', 'bulb', 'led'],
  'engine-parts': ['engine', 'fuel', 'pump', 'timing', 'belt', 'piston', 'cylinder', 'gasket', 'valve', 'turbo', 'alternator', 'starter', 'radiator', 'coolant', 'thermostat'],
  'electrical': ['ignition', 'coil', 'sensor', 'switch', 'ecu', 'computer', 'bcm', 'camera', 'control', 'unit', 'combination', 'electrical', 'spiral', 'angle', 'acceleration', 'oxygen', 'flow'],
  'suspension-steering': ['suspension', 'shock', 'strut', 'spring', 'arm', 'bushing', 'bush', 'link', 'rod', 'tie', 'knuckle', 'steering', 'rack', 'arb', 'stabilizer', 'compressor'],
  'brakes': ['brake', 'pad', 'rotor', 'disc', 'caliper', 'master', 'cylinder', 'booster'],
  'maintenance': ['atf', 'oil', 'filter', 'fluid', 'cleaner', 'textar', 'service', 'maintenance']
};

const brands = ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Suzuki', 'Mitsubishi', 'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Lexus'];

function extractFilename(url: string): string {
  const parts = url.trim().split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/\.(jpg|png|jpeg|webp)$/i, '').trim();
}

function categorizeProduct(filename: string): string {
  const lower = filename.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'maintenance';
}

function generateProductName(filename: string): string {
  let name = filename
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  if (name.length > 80) {
    name = name.substring(0, 77) + '...';
  }
  
  return name;
}

function generateDescription(name: string, category: string): string {
  const templates = [
    `High-quality ${name} for reliable performance. OEM equivalent quality ensuring perfect fit and durability.`,
    `Premium ${name} designed for long-lasting performance. Meets or exceeds OEM specifications.`,
    `Genuine quality ${name} suitable for various vehicle models. Ensures optimal performance and reliability.`,
    `Professional grade ${name} with excellent build quality. Direct replacement for easy installation.`,
    `Top-rated ${name} offering superior performance and value. Trusted by mechanics across Kenya.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generatePrice(category: string): { price: string; comparePrice: string | null } {
  const priceRanges: Record<string, [number, number]> = {
    'engine-parts': [3000, 15000],
    'body-parts': [8000, 35000],
    'electrical': [2500, 12000],
    'suspension-steering': [2000, 10000],
    'brakes': [3000, 12000],
    'interior': [5000, 20000],
    'exterior': [2000, 15000],
    'maintenance': [800, 5000]
  };
  
  const [min, max] = priceRanges[category] || [2000, 10000];
  const price = Math.floor(Math.random() * (max - min) + min);
  const roundedPrice = Math.round(price / 100) * 100;
  
  const hasDiscount = Math.random() > 0.6;
  const comparePrice = hasDiscount ? Math.round(roundedPrice * 1.25 / 100) * 100 : null;
  
  return {
    price: roundedPrice.toString(),
    comparePrice: comparePrice?.toString() || null
  };
}

function generateSKU(filename: string, index: number): string {
  const prefix = filename.substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  const suffix = String(index).padStart(4, '0');
  return `${prefix}-${suffix}`;
}

function generateSlug(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
  
  return `${slug}-${index}`;
}

async function generateProducts(): Promise<void> {
  console.log('🚀 Starting automated product generation...\n');
  
  const urlsFile = path.join(process.cwd(), 'cloudinary_urls.txt');
  const urls = fs.readFileSync(urlsFile, 'utf-8')
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);
  
  console.log(`📦 Found ${urls.length} Cloudinary images\n`);
  
  const products: ProductData[] = [];
  const categoryCount: Record<string, number> = {};
  
  urls.forEach((url, index) => {
    const filename = extractFilename(url);
    const categorySlug = categorizeProduct(filename);
    const name = generateProductName(filename);
    const { price, comparePrice } = generatePrice(categorySlug);
    
    categoryCount[categorySlug] = (categoryCount[categorySlug] || 0) + 1;
    
    const product: ProductData = {
      categorySlug,
      name,
      slug: generateSlug(name, index),
      description: generateDescription(name, categorySlug),
      price,
      compare_at_price: comparePrice,
      stock_quantity: Math.floor(Math.random() * 30) + 5,
      condition: Math.random() > 0.85 ? 'used' : 'new',
      sku: generateSKU(filename, index),
      images: [url],
      is_featured: index < 12,
      is_hot_deal: Math.random() > 0.85,
      is_best_seller: Math.random() > 0.9,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      review_count: Math.floor(Math.random() * 50) + 3
    };
    
    products.push(product);
  });
  
  console.log('📊 Product Distribution by Category:');
  Object.entries(categoryCount).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} products`);
  });
  console.log(`\n✅ Generated ${products.length} products total\n`);
  
  const outputFile = path.join(process.cwd(), 'scripts/generated-seed-data.ts');
  const output = `// Auto-generated product data from Cloudinary images
// Generated on: ${new Date().toISOString()}
// Total products: ${products.length}

export const categoryData = [
  { name: 'Engine Parts', slug: 'engine-parts', description: 'Engine components, timing belts, fuel pumps, and more', display_order: 1 },
  { name: 'Body Parts', slug: 'body-parts', description: 'Bumpers, doors, fenders, and exterior components', display_order: 2 },
  { name: 'Electrical', slug: 'electrical', description: 'Ignition coils, sensors, switches, and electrical components', display_order: 3 },
  { name: 'Suspension & Steering', slug: 'suspension-steering', description: 'Link rods, bushings, control arms, and steering parts', display_order: 4 },
  { name: 'Brakes', slug: 'brakes', description: 'Brake pads, rotors, calipers, and brake system components', display_order: 5 },
  { name: 'Interior', slug: 'interior', description: 'Seats, dashboard components, and interior accessories', display_order: 6 },
  { name: 'Exterior', slug: 'exterior', description: 'Lights, mirrors, grilles, and exterior accessories', display_order: 7 },
  { name: 'Maintenance', slug: 'maintenance', description: 'Belts, filters, fluids, and routine maintenance items', display_order: 8 }
];

export const productData = ${JSON.stringify(products, null, 2)};
`;
  
  fs.writeFileSync(outputFile, output, 'utf-8');
  console.log(`💾 Saved generated products to: ${outputFile}`);
  console.log('✨ Product generation complete!\n');
}

generateProducts().catch(console.error);
