import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { YieldCalculator } from '@/components/calculator/YieldCalculator';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck2,
  Building2,
  ArrowRight,
  HelpCircle,
  FileText,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RECB Cooperative Real Estate Cashback Investment (20%-35% Yield) | MariRealty',
  description:
    'Learn how the Lagos State Registered RECB Real Estate Cashback scheme (LSCS 18176) delivers asset-backed passive dividends with post-dated cheques and legal deeds.',
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
    a: 'Tenures range from 6, 12, 18, to 24 months. Annualized dividend yields range between 20% and 35% depending on principal capital and selected tenure. Use our live interactive calculator above to project your exact return.',
  },
  {
    q: 'What happens when my investment reaches maturity?',
    a: 'On maturity, you can either present your post-dated cheque directly to your bank or receive an immediate electronic transfer to your verified account. Alternatively, you may roll over your capital into another tenure or convert your capital into physical land ownership.',
  },
];

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
              Eliminate real estate speculation. Lock in 20% to 35% annualized cashback dividends
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
                Choose your principal (from ₦1,000,000 to ₦100M+) and select a comfortable tenure (6 to 24 months).
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
                Physical land equity valued at over 200% of your investment capital is designated from RECB asset holdings.
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
              Every cooperative investor receives enforceable, physical documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <MediaPlaceholder
                type="document"
                aspectRatio="video"
                label="Sample Deed of Agreement"
                subtext="Enforceable legal instrument detailing capital, maturity date, and cooperative obligations"
              />
              <p className="mt-3 text-center text-xs font-semibold text-[#0B192C]">
                Enforceable Legal Deed &bull; Prepared by Accredited Solicitors
              </p>
            </div>

            <div>
              <MediaPlaceholder
                type="document"
                aspectRatio="video"
                label="Sample Post-Dated Cheque"
                subtext="Tier-1 commercial bank cheque for exact payout value dated for maturity date"
              />
              <p className="mt-3 text-center text-xs font-semibold text-[#0B192C]">
                Tier-1 Bank Guaranteed Post-Dated Security Cheque
              </p>
            </div>
          </div>
        </section>

        {/* Zero-JS FAQ Accordion */}
        <section>
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
