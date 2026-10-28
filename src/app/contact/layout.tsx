import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Mary Akoh | Direct Real Estate & RECB Advisory | MariRealty',
  description:
    'Connect directly with Mary Akoh, accredited real estate strategist. Book private WhatsApp consultation, request certified land charts, or schedule a 15-minute video advisory session.',
  keywords: [
    'Contact Mary Akoh',
    'Mari Realty contact',
    'real estate consultant WhatsApp',
    'Lagos property consultation',
    'Zylus realtor contact',
  ],
  alternates: {
    canonical: 'https://marirealty.ng/contact',
  },
  openGraph: {
    type: 'website',
    url: 'https://marirealty.ng/contact',
    title: 'Contact Mary Akoh | Direct Real Estate Advisory | MariRealty',
    description:
      'Speak directly with an accredited consultant on WhatsApp, request certified legal deed samples, or book a 15-minute video consultation.',
    images: [
      {
        url: '/assets/branding/realtor-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Mary Akoh - MariRealty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MaryAkohRealty',
    title: 'Contact Mary Akoh | MariRealty',
    description:
      'Direct WhatsApp and voice advisory with accredited real estate consultant Mary Akoh.',
    images: ['/assets/branding/realtor-hero.webp'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
