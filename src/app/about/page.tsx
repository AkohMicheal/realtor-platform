import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { ShieldCheck, Award, Building2, CheckCircle2, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Principal Consultant & Zylus Partnership | MariRealty',
  description:
    'Meet the principal real estate consultant affiliated with Zylus Group and Lagos State Cooperative Society LSCS 18176. Protecting Nigerian diaspora investments.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      <Navigation />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#060E1A] to-[#0B192C] pt-32 pb-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Authority & Integrity
            </span>
            <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
              About MariRealty Advisory
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Bridging high-ticket property buyers and diaspora investors with legitimate asset-backed
              security, institutional partnerships, and verifiable title due diligence.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        {/* Executive Profile Grid */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <MediaPlaceholder
              type="image"
              aspectRatio="portrait"
              label="Principal Consultant Portrait"
              subtext="Lead Real Estate Strategist & Accredited RECB Partner"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold text-[#C5A059]">
              <Award className="h-4 w-4" /> Personal Authority &bull; Institutional Credibility
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B192C]">
              Rebuilding Trust in Lagos Real Estate
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              For too long, real estate in Nigeria—particularly for clients in the UK, US, Canada,
              and other diaspora hubs—has been plagued by family deceit, non-existent allocations,
              and fraudulent title deeds.
            </p>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Operating as an accredited consultant affiliated with <strong>Zylus Group</strong> and
              licensed under the <strong>Lagos State Cooperative Societies Law (Reg. LSCS 18176)</strong>,
              my advisory practice replaces informal verbal promises with institutional-grade
              legal deeds, government-charted surveys, and bank-backed capital guarantees.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                <ShieldCheck className="h-5 w-5 text-[#10B981] mb-2" />
                <h4 className="font-heading font-bold text-sm text-[#0B192C]">
                  Zero Omo-Onile Tolerance
                </h4>
                <p className="mt-1 text-xs text-[#475569]">
                  We never broker communal dispute lands. Every listing has verified excision, Gazette, or C of O.
                </p>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                <Building2 className="h-5 w-5 text-[#D4AF37] mb-2" />
                <h4 className="font-heading font-bold text-sm text-[#0B192C]">
                  Zylus Group Backing
                </h4>
                <p className="mt-1 text-xs text-[#475569]">
                  Direct access to institutional infrastructure, estates, and cooperative land banking portfolios.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B192C] px-6 py-3.5 font-heading text-sm font-semibold text-white hover:bg-[#D4AF37] hover:text-[#0B192C] transition-colors duration-200"
              >
                <PhoneCall className="h-4 w-4" /> Book a Private Portfolio Session
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
