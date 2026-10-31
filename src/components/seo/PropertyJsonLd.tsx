import { Property } from '@/types';

interface PropertyJsonLdProps {
  property: Property;
  imageUrl?: string;
}

export function PropertyJsonLd({ property, imageUrl }: PropertyJsonLdProps) {
  // Determine specific real estate subtype based on category
  const specificRealEstateType =
    property.category === 'completed-housing'
      ? 'SingleFamilyResidence'
      : property.category === 'off-plan'
      ? 'Accommodation'
      : 'LandParcel';

  // Calculate dynamic price validity 1 year in advance in YYYY-MM-DD format
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  const priceValidUntil = oneYearFromNow.toISOString().split('T')[0];

  const propertyUrl = `https://marirealty.ng/properties/${property.slug.current}`;
  const propertySku = property.slug?.current || property._id;

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'RealEstateListing', specificRealEstateType],
    name: property.title,
    description: property.description,
    image: imageUrl ? [imageUrl] : undefined,
    url: propertyUrl,
    sku: propertySku,
    brand: {
      '@type': 'Brand',
      name: 'Zylus Group / Mari Realty',
    },
    category: property.category,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'NGN',
      priceValidUntil: priceValidUntil,
      url: propertyUrl,
      availability:
        property.status === 'sold-out'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      validFrom: property._createdAt || '2026-01-01',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'NG',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'NGN',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'NG',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
        },
      },
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
