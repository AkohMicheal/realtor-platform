import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marirealty.ng'),
  title: {
    default: 'MariRealty — Secure Real Estate & RECB Cashback With Institutional Backing',
    template: '%s | MariRealty',
  },
  description:
    'Mari Realty is an accredited Nigerian real estate advisory and RECB cooperative investment platform affiliated with Zylus Group (Reg. LSCS 18176). Verified land for sale in Epe and Lekki, C of O titles, and 30%-37% fixed-dividend cashback investments.',
  keywords: [
    'Mari Realty',
    'Mari Realty Nigeria',
    'Real Estate Cashback Lagos',
    'Zylus Cooperative Realtor',
    'Land for sale in Epe and Lekki',
    'Mary Akoh',
    'Mary Akoh Realtor',
    'RECB cashback',
    'Zylus Group International',
    'diaspora real estate investment Nigeria',
    'property investment Nigeria',
    'Epe land banking',
    'Lekki real estate',
    'Governor’s Consent land Lagos',
    'secure real estate Nigeria',
    'cooperative investment Nigeria',
  ],
  authors: [{ name: 'Mary Akoh', url: 'https://marirealty.ng/about' }],
  creator: 'Mary Akoh',
  publisher: 'MariRealty Advisory & Investments',
  alternates: {
    canonical: 'https://marirealty.ng',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', type: 'image/png', sizes: '192x192' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://marirealty.ng',
    siteName: 'MariRealty',
    title: 'MariRealty — Secure Real Estate With Institutional Backing',
    description:
      'Accredited Nigerian real estate advisory and RECB cooperative investment platform. Access verified land in Epe and Lekki, C of O titles, and 30%-37% real estate cashback.',
    images: [
      {
        url: '/assets/branding/realtor-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Mary Akoh - Principal Real Estate Consultant at MariRealty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MaryAkohRealty',
    creator: '@MaryAkohRealty',
    title: 'MariRealty — Secure Real Estate With Institutional Backing',
    description:
      'Verified Nigerian land banking and 30%-37% cooperative cashback investments with Zylus Group and RECB.',
    images: ['/assets/branding/realtor-hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        {/* Resource Hints for Web Vitals & External CDNs */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {gaId && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
        {pixelId && (
          <>
            <link rel="preconnect" href="https://connect.facebook.net" />
            <link rel="dns-prefetch" href="https://connect.facebook.net" />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {/* JSON-LD Structured Data Schema */}
        <JsonLd />

        {children}

        {/* Vercel Web Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 & dataLayer Initialization */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel Script */}
        {pixelId && (
          <>
            <Script
              id="meta-pixel-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${pixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
