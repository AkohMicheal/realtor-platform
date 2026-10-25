import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { TrustBar } from '@/components/shared/TrustBar';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { YieldCalculator } from '@/components/calculator/YieldCalculator';
import { PropertyCard } from '@/components/listings/PropertyCard';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { HeroCanvasWrapper } from '@/components/3d/HeroCanvasWrapper';
import { client } from '@/lib/sanity/client';
import { FEATURED_PROPERTIES_QUERY } from '@/lib/sanity/queries';
import { MOCK_PROPERTIES, MOCK_TESTIMONIALS } from '@/lib/mockData';
import { Property } from '@/types';
import { SITE_CONFIG } from '@/lib/constants';
import { generateWhatsAppLink } from '@/lib/utils';
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  FileCheck2,
  PhoneCall,
  CheckCircle2,
  Star,
  Lock,
  ExternalLink,
} from 'lucide-react';

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return MOCK_PROPERTIES;
    }
    const data = await client.fetch<Property[]>(FEATURED_PROPERTIES_QUERY);
    return data && data.length > 0 ? data : MOCK_PROPERTIES;
  } catch {
    return MOCK_PROPERTIES;
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      {/* Navigation */}
      <Navigation />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#060E1A] via-[#0B192C] to-[#0B192C] pt-24 pb-16 text-white">
          {/* Ambient 3D Particle Canvas */}
          <HeroCanvasWrapper />

          {/* Grid background texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Regulatory Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold text-[#D4AF37]">
                  <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                  <span>Affiliated with Zylus Group &bull; RECB Reg. LSCS 18176</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                  Secure Lagos Real Estate With{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059]">
                    Institutional Backing
                  </span>
                </h1>

                {/* Subtext */}
                <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mx-auto lg:mx-0">
                  Protecting diaspora and high-ticket capital through verified land banking, legal
                  title due diligence, and cooperative cashback schemes delivering 20%–35% annualized yields.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="#calculator"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-7 py-4 font-heading text-sm font-bold text-[#0B192C] shadow-lg shadow-[#D4AF37]/20 transition-all duration-200 hover:bg-[#C5A059] hover:shadow-xl active:scale-95"
                  >
                    Calculate 12-Mo Yield <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    href="/properties"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-7 py-4 font-heading text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/40"
                  >
                    View Verified Properties
                  </Link>
                </div>

                {/* Proof Pills */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> C of O & Gazette Titles
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> Post-Dated Cheque Guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> Zero Omo-Onile Interference
                  </span>
                </div>
              </div>

              {/* Right Column: Realtor Executive Trust Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-b from-slate-900/90 to-[#0B192C]/90 p-6 shadow-2xl backdrop-blur-xl">
                  {/* Decorative corner tag */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                      Executive Advisory
                    </span>
                    <span className="rounded-full bg-[#10B981]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#10B981]">
                      ● Available for Consultation
                    </span>
                  </div>

                  {/* Portrait with branded framing */}
                  <div className="mt-4 relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800 shadow-inner group">
                    <Image
                      src="/assets/branding/realtor-hero.webp"
                      alt={`${SITE_CONFIG.consultantName} - Principal Real Estate Consultant, ${SITE_CONFIG.name}`}
                      width={450}
                      height={520}
                      className="w-full h-[360px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-lg bg-[#0B192C]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-[#D4AF37]">
                        {SITE_CONFIG.consultantName}
                      </span>
                      <span className="rounded-lg bg-[#10B981]/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
                        RECB Accredited
                      </span>
                    </div>
                  </div>

                  {/* Highlights under portrait */}
                  <div className="mt-4 space-y-2">
                    <h3 className="font-heading text-lg font-bold text-white">
                      {SITE_CONFIG.consultantName} &bull; {SITE_CONFIG.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lead Real Estate Strategist affiliated with Zylus Group and RECB. Specialized
                      in guiding diaspora & high-ticket investors into verified titles and high-yield
                      cashback schemes.
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-800 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                        Direct Line
                      </span>
                      <p className="font-mono text-xs font-semibold text-[#D4AF37]">
                        {SITE_CONFIG.phoneDisplay}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/30 transition"
                    >
                      Schedule Call <PhoneCall className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <TrustBar />

        {/* METRICS SECTION */}
        <section className="bg-[#0B192C] text-white py-16 border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              <div className="pt-4 sm:pt-0">
                <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#D4AF37]">
                  <CounterAnimation target={1.8} prefix="₦" suffix="B+" decimals={1} />
                </p>
                <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-slate-400">
                  Portfolio Value Advised
                </p>
              </div>

              <div className="pt-6 sm:pt-0">
                <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10B981]">
                  <CounterAnimation target={420} suffix="+" />
                </p>
                <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-slate-400">
                  Diaspora & Institutional Clients
                </p>
              </div>

              <div className="pt-6 sm:pt-0">
                <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                  100%
                </p>
                <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-slate-400">
                  On-Time Capital & Yield Redemption
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Curated Inventory
                </span>
                <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-[#0B192C]">
                  Verified Property Portfolio
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl">
                  Every listed asset undergoes strict land registry searches, survey charting, and
                  excision/C of O verification before presentation.
                </p>
              </div>

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl border border-[#0B192C] px-5 py-3 text-sm font-semibold text-[#0B192C] hover:bg-[#0B192C] hover:text-white transition-colors duration-200"
              >
                Browse All Properties ({featuredProperties.length}) <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* RECB YIELD CALCULATOR SECTION */}
        <section id="calculator" className="py-20 bg-[#F8F9FA] border-t border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: The Cooperative Mechanism */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Institutional Security
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B192C] leading-tight">
                  How The RECB Real Estate Cashback Model Works
                </h2>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Real Estate Cashback (RECB) is an asset-backed cooperative land banking scheme
                  licensed under Lagos State Cooperative Societies Law (Reg. LSCS 18176) in
                  partnership with Zylus Group.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] font-bold text-xs">
                      01
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-[#0B192C]">
                        Capital Secured by Real Estate Equity
                      </h4>
                      <p className="text-xs text-[#475569] mt-0.5">
                        Your investment is allocated against tangible landed property reserves valued at over 200% of capital.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] font-bold text-xs">
                      02
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-[#0B192C]">
                        Post-Dated Cheque & Deed of Agreement
                      </h4>
                      <p className="text-xs text-[#475569] mt-0.5">
                        Upon subscription, you receive a legally enforceable Deed and bank-guaranteed post-dated cheque for your maturity date.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] font-bold text-xs">
                      03
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-[#0B192C]">
                        Guaranteed Exit at 6 to 24 Months
                      </h4>
                      <p className="text-xs text-[#475569] mt-0.5">
                        Withdraw your principal plus scheduled 20% to 35% dividend returns without liquidity delays.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 flex items-center gap-3">
                  <Lock className="h-5 w-5 text-[#10B981] shrink-0" />
                  <p className="text-xs text-[#475569]">
                    <strong className="text-[#0B192C]">Zero Speculation:</strong> All investments
                    are registered with the Lagos State Ministry of Commerce & Cooperatives.
                  </p>
                </div>
              </div>

              {/* Right Column: Live Interactive Calculator */}
              <div className="lg:col-span-7">
                <YieldCalculator />
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL BACKING & SAMPLE DOCUMENTATION */}
        <section className="py-20 bg-white border-t border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Absolute Transparency
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-[#0B192C]">
                Documentation Issued for Every Investment
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569]">
                Nigerian real estate requires legal safeguards, not verbal assurances. Here is what
                you physically and digitally receive upon partnership.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Deed of Agreement */}
              <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] overflow-hidden shadow-sm transition hover:shadow-md">
                <div className="relative h-48 w-full bg-slate-900 border-b border-[#E2E8F0] overflow-hidden group">
                  <Image
                    src="/assets/trust/sample-recb-deed-of-agreement-preview.webp"
                    alt="Sample RECB Deed of Agreement Document"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover object-top transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B192C]/20 group-hover:bg-transparent transition" />
                  <a
                    href="/docs/sample-recb-deed-of-agreement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white shadow hover:bg-[#D4AF37] hover:text-[#0B192C] transition"
                  >
                    View Sample PDF <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-9 w-9 rounded-xl bg-[#0B192C] text-[#D4AF37] flex items-center justify-center mb-3">
                      <FileCheck2 className="h-4 w-4" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#0B192C]">
                      Deed of Agreement
                    </h3>
                    <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                      A comprehensive legal contract prepared by accredited corporate solicitors,
                      binding the cooperative to your principal sum, rate, and exit tenure.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
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
              <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] overflow-hidden shadow-sm transition hover:shadow-md">
                <div className="relative h-48 w-full bg-slate-900 border-b border-[#E2E8F0] overflow-hidden group">
                  <Image
                    src="/assets/trust/sample-cheque-preview.webp"
                    alt="Sample Bank-Guaranteed Post-Dated Cheque"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover object-center transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B192C]/20 group-hover:bg-transparent transition" />
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#D4AF37] shadow">
                    Tier-1 Bank Issued
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-9 w-9 rounded-xl bg-[#0B192C] text-[#D4AF37] flex items-center justify-center mb-3">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#0B192C]">
                      Post-Dated Cheque
                    </h3>
                    <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                      Issued by a premier Tier-1 Nigerian Commercial Bank for the exact redemption amount
                      payable on the exact maturity date agreed.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                    <span className="text-xs font-semibold text-[#10B981]">
                      &bull; Bank-Guaranteed Liquidity Instrument
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Cooperative Receipt */}
              <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] overflow-hidden shadow-sm transition hover:shadow-md">
                <div className="relative h-48 w-full bg-slate-900 border-b border-[#E2E8F0] overflow-hidden group">
                  <Image
                    src="/assets/trust/sample-receipt-invoice.webp"
                    alt="Sample Official Cooperative Receipt and Invoice"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover object-top transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B192C]/20 group-hover:bg-transparent transition" />
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#10B981] shadow">
                    LSCS 18176 Sealed
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-9 w-9 rounded-xl bg-[#0B192C] text-[#D4AF37] flex items-center justify-center mb-3">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#0B192C]">
                      Official Cooperative Receipt
                    </h3>
                    <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                      Numbered financial confirmation bearing the official seal of Lagos State
                      Cooperative Society LSCS 18176 and Zylus Group corporate seal.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                    <span className="text-xs font-semibold text-[#10B981]">
                      &bull; Tax & Audit Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-[#F8F9FA] border-t border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Verified Client Stories
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-[#0B192C]">
                Why High-Net-Worth Investors Trust Us
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {MOCK_TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-[#D4AF37] mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xs sm:text-sm text-[#475569] leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                    <p className="font-heading text-sm font-bold text-[#0B192C]">{t.name}</p>
                    <p className="text-[11px] text-[#94A3B8]">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OMNICHANNEL CLOSING BANNER */}
        <section className="bg-gradient-to-r from-[#0B192C] via-[#071F2C] to-[#0B192C] text-white py-16">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <span className="font-heading text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              Protect Your Capital &bull; Grow Your Portfolio
            </span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Ready to Secure Your Next Lagos Property or Cashback Investment?
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Skip the runaround. Speak directly with an accredited consultant on WhatsApp or schedule
              a 15-minute video review of our active land titles and cooperative allocations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-heading text-sm sm:text-base font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Chat on WhatsApp Now (Instant)
              </a>

              <Link
                href="/contact"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-heading text-sm sm:text-base font-semibold text-white hover:bg-white/20 transition"
              >
                Book 15-Min Zoom Call
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Omnichannel FAB */}
      <FloatingContact />
    </div>
  );
}
