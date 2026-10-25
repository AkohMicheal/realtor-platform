import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MariRealty — Secure Real Estate Investments in Lagos',
    short_name: 'MariRealty',
    description:
      'Lagos-based real estate advisory and RECB cooperative investment platform. Licensed under Lagos State Cooperative LSCS 18176.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B192C',
    theme_color: '#0B192C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
