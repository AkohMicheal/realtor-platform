import { Property } from '@/types';

interface PropertyJsonLdProps {
  property: Property;
  imageUrl?: string;
}

export function PropertyJsonLd({ property, imageUrl }: PropertyJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'RealEstateListing'],
    name: property.title,
    description: property.description,
    image: imageUrl ? [imageUrl] : undefined,
    url: `https://marirealty.ng/properties/${property.slug.current}`,
    category: property.category,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'NGN',
      availability:
        property.status === 'sold-out'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      validFrom: property._createdAt || '2026-01-01',
      seller: {
        '@type': 'RealEstateAgent',
        name: 'Mari Realty',
        url: 'https://marirealty.ng',
      },
    },
    location: {
      '@type': 'Place',
      name: property.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.location,
        addressCountry: 'NG',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
