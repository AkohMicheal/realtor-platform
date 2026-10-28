import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://marirealty.ng';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/backoffice/', '/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Meta-ExternalAgent',
        ],
        allow: '/',
        disallow: ['/backoffice/', '/api/'],
      },
      {
        userAgent: ['facebookexternalhit', 'Twitterbot'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
