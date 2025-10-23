import { Metadata } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://partspoa.com';

export function generateMetadata({
  title,
  description,
  image,
  keywords,
  path = '',
  noIndex = false,
}: {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${APP_URL}${path}`;
  const defaultImage = `${APP_URL}/og-image.png`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'PartsPOA',
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || defaultImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    alternates: {
      canonical: url,
    },
  };
}

// Structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PartsPOA',
    description: 'Kenya\'s leading online marketplace for automotive parts and accessories',
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254 700 000 000',
      contactType: 'Customer Service',
      email: 'info@partspoa.com',
      areaServed: 'KE',
      availableLanguage: ['English', 'Swahili'],
    },
    sameAs: [
      'https://www.facebook.com/partspoa',
      'https://twitter.com/partspoa',
      'https://www.instagram.com/partspoa',
    ],
  };
}

// Structured data for products
export function generateProductSchema({
  id,
  name,
  description,
  price,
  image,
  sku,
  condition,
  rating,
  reviewCount,
}: {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image: string;
  sku: string | null;
  condition: string;
  rating?: string | null;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${APP_URL}/products/${id}`,
    name,
    description: description || name,
    image,
    sku: sku || id,
    offers: {
      '@type': 'Offer',
      url: `${APP_URL}/products/${id}`,
      priceCurrency: 'KES',
      price,
      itemCondition: condition === 'new' 
        ? 'https://schema.org/NewCondition' 
        : 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'PartsPOA',
      },
    },
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount,
      },
    }),
  };
}

// Structured data for breadcrumbs
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${APP_URL}${item.url}`,
    })),
  };
}
