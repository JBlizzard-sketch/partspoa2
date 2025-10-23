import fs from 'fs';
import path from 'path';

// Parse Cloudinary URLs from file
const cloudinaryUrlsPath = path.join(process.cwd(), 'cloudinary_urls.txt');
const cloudinaryUrls = fs.readFileSync(cloudinaryUrlsPath, 'utf-8').split('\n').filter(Boolean);

// Create a map of filename to Cloudinary URL
const imageMap = new Map<string, string>();
cloudinaryUrls.forEach(url => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1].trim();
  if (filename) {
    imageMap.set(filename, url.trim());
  }
});

// Helper function to get Cloudinary URLs for filenames
function getCloudinaryUrls(filenames: string[]): string[] {
  return filenames
    .map(filename => imageMap.get(filename))
    .filter(Boolean) as string[];
}

// Category data
export const categoryData = [
  {
    name: 'Engine Parts',
    slug: 'engine-parts',
    description: 'Engine components, timing belts, fuel pumps, and more',
    display_order: 1,
  },
  {
    name: 'Body Parts',
    slug: 'body-parts',
    description: 'Bumpers, doors, fenders, and exterior components',
    display_order: 2,
  },
  {
    name: 'Electrical',
    slug: 'electrical',
    description: 'Ignition coils, sensors, switches, and electrical components',
    display_order: 3,
  },
  {
    name: 'Suspension & Steering',
    slug: 'suspension-steering',
    description: 'Link rods, bushings, control arms, and steering parts',
    display_order: 4,
  },
  {
    name: 'Brakes',
    slug: 'brakes',
    description: 'Brake pads, rotors, calipers, and brake system components',
    display_order: 5,
  },
  {
    name: 'Interior',
    slug: 'interior',
    description: 'Seats, dashboard components, and interior accessories',
    display_order: 6,
  },
  {
    name: 'Exterior',
    slug: 'exterior',
    description: 'Lights, mirrors, grilles, and exterior accessories',
    display_order: 7,
  },
  {
    name: 'Maintenance',
    slug: 'maintenance',
    description: 'Belts, filters, fluids, and routine maintenance items',
    display_order: 8,
  },
];

// Product data with Cloudinary images
export const productData = [
  // Engine Parts
  {
    categorySlug: 'engine-parts',
    name: 'Subaru Impreza STI Fuel Pump (2002-2007)',
    slug: 'subaru-impreza-sti-fuel-pump-2002-2007',
    description: 'High-performance fuel pump for Subaru Impreza STI models 2002-2007. Genuine OEM quality for reliable fuel delivery.',
    price: '8500',
    compare_at_price: '10500',
    stock_quantity: 12,
    condition: 'new',
    sku: 'FP-SUBARU-STI-0207',
    images: getCloudinaryUrls(['2002-2007_Impreza_STI_fuel_pump.jpg']),
    is_featured: true,
    is_hot_deal: true,
    rating: '4.8',
    review_count: 23,
  },
  {
    categorySlug: 'engine-parts',
    name: 'Honda Fuel Pump Assembly',
    slug: 'honda-fuel-pump-assembly',
    description: 'Complete fuel pump assembly for various Honda models. Part number: 101961-7332. OEM replacement part.',
    price: '7200',
    stock_quantity: 8,
    condition: 'new',
    sku: 'FP-HONDA-101961',
    images: getCloudinaryUrls(['101961-7332_Fuel_pump_honda.png']),
    is_featured: true,
    rating: '4.6',
    review_count: 15,
  },
  {
    categorySlug: 'engine-parts',
    name: 'Subaru Timing Belt Kit',
    slug: 'subaru-timing-belt-kit',
    description: 'Premium timing belt for Subaru vehicles. Part number: 13028AA21B. Includes belt and installation guide.',
    price: '4500',
    compare_at_price: '5500',
    stock_quantity: 20,
    condition: 'new',
    sku: 'TB-SUBARU-13028',
    images: getCloudinaryUrls(['13028AA21B_timing_belt.jpg']),
    is_featured: true,
    is_best_seller: true,
    rating: '4.9',
    review_count: 42,
  },
  {
    categorySlug: 'engine-parts',
    name: 'Subaru Impreza STI Fuel Pump (2007+)',
    slug: 'subaru-impreza-sti-fuel-pump-2007',
    description: 'Updated fuel pump design for Subaru Impreza STI 2007 and newer models. Enhanced flow rate and reliability.',
    price: '9200',
    stock_quantity: 6,
    condition: 'new',
    sku: 'FP-SUBARU-STI-07',
    images: getCloudinaryUrls(['2007_Impreza_STI_fuel_pump.jpg']),
    rating: '4.7',
    review_count: 18,
  },
  // Electrical
  {
    categorySlug: 'electrical',
    name: 'Suzuki Grand Vitara Ignition Coil',
    slug: 'suzuki-grand-vitara-ignition-coil',
    description: 'High-quality ignition coil for Suzuki Grand Vitara. Part number: 33400-51K20. Ensures proper spark and engine performance.',
    price: '3200',
    stock_quantity: 15,
    condition: 'new',
    sku: 'IC-SUZUKI-33400',
    images: getCloudinaryUrls(['33400-51K20_Grand_vitara_ignition_coil.jpg']),
    is_featured: true,
    rating: '4.5',
    review_count: 12,
  },
  // Suspension & Steering
  {
    categorySlug: 'suspension-steering',
    name: 'Toyota Auris Front Stabilizer Link',
    slug: 'toyota-auris-stabilizer-link',
    description: 'Front stabilizer link for Toyota Auris. Part number: 48820-47020. Improves handling and reduces body roll.',
    price: '2800',
    stock_quantity: 25,
    condition: 'new',
    sku: 'SL-TOYOTA-48820',
    images: getCloudinaryUrls(['48820-47020_Auris_linkg1.jpg']),
    is_best_seller: true,
    rating: '4.7',
    review_count: 28,
  },
  // Brakes
  {
    categorySlug: 'brakes',
    name: 'Toyota/Lexus Brake Pad Set',
    slug: 'toyota-lexus-brake-pad-set',
    description: 'Premium brake pads for Toyota and Lexus vehicles. Part number: 04465-42200. Excellent stopping power and low dust.',
    price: '5500',
    compare_at_price: '6800',
    stock_quantity: 18,
    condition: 'new',
    sku: 'BP-TOYOTA-04465',
    images: getCloudinaryUrls(['04465-42200.jpg', '04465-42200br.jpg', '04465-42200rae.jpg']),
    is_featured: true,
    is_hot_deal: true,
    rating: '4.9',
    review_count: 56,
  },
  {
    categorySlug: 'brakes',
    name: 'Nissan Clutch Kit',
    slug: 'nissan-clutch-kit',
    description: 'Complete clutch kit for various Nissan models. Includes pressure plate and disc.',
    price: '12500',
    stock_quantity: 5,
    condition: 'new',
    sku: 'CK-NISSAN-TEXTAR',
    images: getCloudinaryUrls(['Brakepad_textar.jpg']),
    rating: '4.6',
    review_count: 9,
  },
  {
    categorySlug: 'brakes',
    name: 'Nissan March Clutch Assembly',
    slug: 'nissan-march-clutch-assembly',
    description: 'Clutch assembly specifically for Nissan March. Part number: 22401-JD01B. Perfect fit and smooth operation.',
    price: '11800',
    stock_quantity: 7,
    condition: 'new',
    sku: 'CK-NISSAN-MARCH',
    images: getCloudinaryUrls(['bushes.jpg']),
    rating: '4.5',
    review_count: 11,
  },
  // Body Parts
  {
    categorySlug: 'body-parts',
    name: 'Mazda CX-5 Front Bumper (2018)',
    slug: 'mazda-cx5-front-bumper-2018',
    description: 'OEM replacement front bumper for 2018 Mazda CX-5. Perfect fit and factory finish. Primed and ready to paint.',
    price: '18500',
    compare_at_price: '22000',
    stock_quantity: 3,
    condition: 'new',
    sku: 'BMP-MAZDA-CX5-18',
    images: getCloudinaryUrls(['2018_cx5_bumper.jpg']),
    is_featured: true,
    rating: '4.8',
    review_count: 6,
  },
  // Exterior
  {
    categorySlug: 'exterior',
    name: 'Mazda Axela Fog Light Cover (2014)',
    slug: 'mazda-axela-foglight-cover-2014',
    description: 'Fog light cover for 2014 Mazda Axela. OEM quality plastic with perfect fit. Protects and enhances appearance.',
    price: '1800',
    stock_quantity: 14,
    condition: 'new',
    sku: 'FL-MAZDA-AXELA-14',
    images: getCloudinaryUrls(['2014_axela_foglight_cover.jpg']),
    rating: '4.4',
    review_count: 8,
  },
  {
    categorySlug: 'exterior',
    name: 'Nissan Headlight Assembly',
    slug: 'nissan-headlight-assembly',
    description: 'Complete headlight assembly for Nissan Allion 260. Crystal clear lens with plug-and-play installation.',
    price: '6200',
    stock_quantity: 9,
    condition: 'new',
    sku: 'HL-NISSAN-ALLION',
    images: getCloudinaryUrls(['Allion_260_headlight_Non_Xenon.jpg']),
    rating: '4.6',
    review_count: 14,
  },
  // Maintenance
  {
    categorySlug: 'maintenance',
    name: 'Multi-Rib V-Belt 4PK 780',
    slug: 'multi-rib-v-belt-4pk-780',
    description: 'High-quality serpentine belt 4PK 780mm. Universal fit for various Japanese vehicles. Heat and wear resistant.',
    price: '1200',
    stock_quantity: 45,
    condition: 'new',
    sku: 'BELT-4PK-780',
    images: getCloudinaryUrls(['4PK_780_Belt.jpg']),
    is_best_seller: true,
    rating: '4.7',
    review_count: 67,
  },
  // Used parts
  {
    categorySlug: 'electrical',
    name: 'Used Honda Civic Engine Control Unit',
    slug: 'used-honda-civic-ecu',
    description: 'Tested and working ECU from Honda Civic. Guaranteed functional. Great budget option for repairs.',
    price: '4500',
    stock_quantity: 2,
    condition: 'used',
    sku: 'ECU-HONDA-USED',
    images: getCloudinaryUrls(['B62S66DT0_Axela_Computer.jpg']),
    rating: '4.2',
    review_count: 5,
  },
  {
    categorySlug: 'exterior',
    name: 'Toyota Corolla Door Mirror (Used)',
    slug: 'toyota-corolla-door-mirror-used',
    description: 'Used door mirror in good condition. Fits various Toyota Corolla Axio models. Minor cosmetic wear but fully functional.',
    price: '2200',
    compare_at_price: '5500',
    stock_quantity: 4,
    condition: 'used',
    sku: 'MIRROR-TOYOTA-USED',
    images: getCloudinaryUrls(['Axio_161_Side_mirror.jpg']),
    is_hot_deal: true,
    rating: '4.0',
    review_count: 3,
  },
];

console.log(`📦 Seed data loaded: ${imageMap.size} Cloudinary images mapped`);
