import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { MOCK_PROPERTIES } from '@/lib/mockData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://marirealty.ng';
  const now = new Date();

  // Static landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/investment`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic property listings from Sanity
  let propertyRoutes: MetadataRoute.Sitemap = [];

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const sanityProperties = await client.fetch<
        Array<{ slug?: { current?: string }; _updatedAt?: string }>
      >(`*[_type == "property" && defined(slug.current)] { slug, _updatedAt }`);

      if (sanityProperties && sanityProperties.length > 0) {
        propertyRoutes = sanityProperties
          .filter((p) => Boolean(p.slug?.current))
          .map((p) => ({
            url: `${baseUrl}/properties/${p.slug!.current}`,
            lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }));
      }
    }
  } catch (err) {
    console.error('[Sitemap] Failed to fetch properties from Sanity:', err);
  }

  // Fallback to mock properties if Sanity returned no properties
  if (propertyRoutes.length === 0) {
    propertyRoutes = MOCK_PROPERTIES.map((p) => ({
      url: `${baseUrl}/properties/${p.slug.current}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  return [...staticRoutes, ...propertyRoutes];
}
