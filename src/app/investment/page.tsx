import { Suspense } from 'react';
import Image from 'next/image';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { YieldCalculator } from '@/components/calculator/YieldCalculator';
import { PromotionalFlyersGallery } from '@/components/investment/PromotionalFlyersGallery';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { client } from '@/lib/sanity/client';
import { PROMOTIONAL_FLYERS_QUERY } from '@/lib/sanity/queries';
import { MOCK_PROMOTIONAL_FLYERS } from '@/lib/mockData';
import { PromotionalFlyer } from '@/types';
import { SITE_CONFIG } from '@/lib/constants';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck2,
  Building2,
  ArrowRight,
  HelpCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate Cashback Lagos & Nigeria (30%-37% Yield) | RECB Cooperative',
  description:
    'Learn how the Lagos State Registered RECB Real Estate Cashback scheme (LSCS 18176) delivers asset-backed 30%-37% passive dividends with post-dated cheques and legal deeds in partnership with Zylus Group.',
  keywords: [
    'Real Estate Cashback Lagos',
    'Zylus Cooperative Realtor',
    'RECB cashback',
    'cooperative real estate Nigeria',
    'high-yield real estate dividends Nigeria',
    'post-dated cheque investment Nigeria',
    'land banking cashback',
  ],
  alternates: {
    canonical: 'https://marirealty.ng/investment',
  },
  openGraph: {
    type: 'website',
    url: 'https://marirealty.ng/investment',
    title: 'Real Estate Cashback (30%-37% Yield) | MariRealty',
    description:
      'Eliminate property speculation. Lock in 30% to 37% annualized cashback dividends backed by tangible land reserves, enforceable contracts, and post-dated cheques.',
    images: [
      {
        url: '/assets/branding/realtor-hero.webp',
        width: 1200,
        height: 630,
        alt: 'RECB Cooperative Real Estate Cashback Investment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MaryAkohRealty',
    title: 'Real Estate Cashback Lagos & Nigeria | MariRealty',
    description:
      'Cooperative cashback land banking delivering 30%-37% returns with Tier-1 post-dated cheques.',
    images: ['/assets/branding/realtor-hero.webp'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'What is Real Estate Cashback (RECB) and how is it legally structured?',
    a: 'RECB is an asset-backed cooperative land banking model registered under the Lagos State Cooperative Societies Law (Registration LSCS 18176) in partnership with Zylus Group. Funds are deployed strictly into developing acquired lands along high-growth corridors. Your capital is guaranteed by physical land equity and backed by legal deeds.',
  },
  {
    q: 'How are my returns and principal legally secured against market risks?',
    a: 'Every investor receives three mandatory instruments: (1) An enforceable Deed of Agreement prepared by accredited solicitors, (2) An official Lagos State Cooperative Society receipt, and (3) A bank-guaranteed post-dated cheque for your full payout (principal + dividend) redeemable on the exact maturity date.',
  },
  {
    q: 'Can Nigerians living abroad (Diaspora) subscribe without traveling home?',
    a: 'Yes. Over 65% of our portfolio clients reside in the UK, US, Canada, and the EU. All onboarding, KYC verification, deed execution, and digital cheque previews can be handled securely via encrypted channels and accredited courier for physical documents.',
  },
  {
    q: 'What are the available investment tenures and dividend rates?',
    a: 'The standard recommended investment tenure is 12 months, with the flexible option to roll over for another 12-month cycle (up to 24 months). Early exit before 12 months is not recommended to protect your capital gains. Active annualized dividend yields range between 30% and 37% based on active promotional cohorts. Use our live interactive calculator above to project your exact return.',
  },
  {
    q: 'What happens when my investment reaches maturity?',
    a: 'On maturity, you can either present your post-dated cheque directly to your bank or receive an immediate electronic transfer to your verified account. Alternatively, you may roll over your capital into another tenure or convert your capital into physical land ownership.',
  },
];

async function getPromotionalFlyers(): Promise<PromotionalFlyer[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return MOCK_PROMOTIONAL_FLYERS;
    }
    const data = await client.fetch<PromotionalFlyer[]>(PROMOTIONAL_FLYERS_QUERY);
    if (data && data.length > 0) {
      return data;
    }
    return MOCK_PROMOTIONAL_FLYERS;
  } catch (err) {
    console.error('Error fetching flyers from Sanity:', err);
    return MOCK_PROMOTIONAL_FLYERS;
  }
}

function PromotionalFlyersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-48 rounded bg-slate-200 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
          >
            <div className="aspect-[3/4] w-full bg-slate-200 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
              <div className="h-6 w-3/4 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-10 w-full rounded-xl bg-slate-200 animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function InvestmentFlyersSection() {
  const flyers = await getPromotionalFlyers();
  return <PromotionalFlyersGallery flyers={flyers} initialLimit={6} />;
}

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#060E1A] via-[#0B192C] to-[#0B192C] pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold text-[#D4AF37] mb-4">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span>Regulated Under Lagos State Cooperative Societies Law LSCS 18176</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              RECB Real Estate Cashback &bull; Fixed Capital Growth
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Eliminate real estate speculation. Lock in 30% to 37% annualized cashback dividends
              backed by tangible land reserves, enforceable contracts, and bank-guaranteed post-dated cheques.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
        {/* Step-by-Step Workflow */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              The Process
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[#0B192C]">
              4 Steps to Scam-Proof Real Estate Income
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B192C] font-heading font-extrabold text-[#D4AF37] mb-4">
                01
              </div>
              <h3 className="font-heading text-base font-bold text-[#0B192C]">
                Select Capital & Tenure
              </h3>
              <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                Choose your principal (from ₦1,000,000 to ₦100M+) for a structured 12-month tenure with the option to roll over annually.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B192C] font-heading font-extrabold text-[#D4AF37] mb-4">
                02
              </div>
              <h3 className="font-heading text-base font-bold text-[#0B192C]">
                Asset Backing Allocation
              </h3>
              <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                Physical land equity valued at 100% of your investment capital is designated from RECB asset holdings.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B192C] font-heading font-extrabold text-[#D4AF37] mb-4">
                03
              </div>
              <h3 className="font-heading text-base font-bold text-[#0B192C]">
                Receive Legal Security Packet
              </h3>
              <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                Your Deed of Agreement, Official Cooperative Receipt, and Tier-1 Post-Dated Cheque are dispatched.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B192C] font-heading font-extrabold text-[#D4AF37] mb-4">
                04
              </div>
              <h3 className="font-heading text-base font-bold text-[#0B192C]">
                Redemption at Maturity
              </h3>
              <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                Deposit your cheque or receive instant bank transfer of your principal plus full agreed cashback dividend.
              </p>
            </div>
          </div>
        </section>

        {/* Live Calculator Section */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B192C] to-[#060E1A] p-6 sm:p-12 text-white shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Live Mathematical Simulator
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold">
                Calculate Exact Returns For Your Capital
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Use our dynamic tool to test different capital tiers. Once calculated, send your exact projection
                directly to WhatsApp to receive your formal prospectus.
              </p>
            </div>

            <div className="lg:col-span-7">
              <YieldCalculator />
            </div>
          </div>
        </section>

        {/* Dynamic Promotional Circulars & Monthly Flyers Gallery */}
        <section>
          <Suspense fallback={<PromotionalFlyersSkeleton />}>
            <InvestmentFlyersSection />
          </Suspense>
        </section>

        {/* Trust & Sample Documents */}
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Verification Samples
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#0B192C]">
              Sample Document Security Packet
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#475569]">
              Every cooperative investor receives enforceable, physical and digital documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Deed of Agreement */}
            <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] overflow-hidden shadow-sm">
              <div className="relative h-48 w-full bg-slate-900 border-b border-[#E2E8F0] overflow-hidden group">
                <Image
                  src="/assets/trust/sample-recb-deed-of-agreement-preview.webp"
                  alt="Sample RECB Deed of Agreement"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                  className="object-cover object-top transition duration-300 group-hover:scale-105"
                />
                <a
                  href="/docs/sample-recb-deed-of-agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white shadow hover:bg-[#D4AF37] hover:text-[#0B192C] transition"
                >
                  View Sample PDF <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#0B192C]">
                    Deed of Agreement
                  </h4>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                    Prepared by accredited solicitors; legally binds the cooperative to principal, tenure, and dividend.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E2E8F0]">
                  <a
                    href="/docs/sample-recb-deed-of-agreement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#10B981] hover:underline inline-flex items-center gap-1"
                  >
                    &bull; Download Sample Deed (PDF)
                  </a>
                </div>
              </div>
            </div>

            {/* Post-Dated Cheque */}
            <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] overflow-hidden shadow-sm">
              <div className="relative h-48 w-full bg-slate-900 border-b border-[#E2E8F0] overflow-hidden group">
                <Image
                  src="/assets/trust/sample-cheque-preview.webp"
                  alt="Sample Tier-1 Bank Guaranteed Post-Dated Cheque"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                  className="object-cover object-center transition duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#D4AF37] shadow">
                  Tier-1 Bank Guaranteed
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#0B192C]">
                    Post-Dated Cheque
                  </h4>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                    Issued for the exact payout amount payable on your agreed maturity date.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E2E8F0]">
                  <span className="text-xs font-semibold text-[#10B981]">
                    &bull; Liquidity Instrument
                  </span>
                </div>
              </div>
            </div>

            {/* Official Receipt */}
            <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] overflow-hidden shadow-sm">
              <div className="relative h-48 w-full bg-slate-900 border-b border-[#E2E8F0] overflow-hidden group">
                <Image
                  src="/assets/trust/sample-receipt-invoice.webp"
                  alt="Official Cooperative Receipt and Invoice"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                  className="object-cover object-top transition duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#10B981] shadow">
                  LSCS 18176 Official Seal
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#0B192C]">
                    Cooperative Receipt & Invoice
                  </h4>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                    Official financial confirmation bearing Lagos State seal and corporate registration numbers.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E2E8F0]">
                  <span className="text-xs font-semibold text-[#10B981]">
                    &bull; Audit & Tax Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zero-JS FAQ Accordion with id="faq" */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Common Inquiries
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#0B192C]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between font-heading text-sm sm:text-base font-bold text-[#0B192C]">
                  <span>{item.q}</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F8F9FA] text-[#D4AF37] transition duration-300 group-open:rotate-180">
                    &darr;
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
