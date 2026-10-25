import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { SITE_CONFIG } from '@/lib/constants';
import {
  ShieldCheck,
  Award,
  Building2,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Sparkles,
  FileCheck2,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Mary Akoh | Award-Winning Real Estate Strategist | MariRealty',
  description:
    'Meet Mary Akoh, accredited real estate consultant affiliated with Zylus Group and RECB (LSCS 18176). Awarded Best Behaved Female BA across active subsidiaries (15th March, 2026).',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      <Navigation />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#060E1A] to-[#0B192C] pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold text-[#D4AF37] mb-4">
              <Award className="h-4 w-4 text-[#D4AF37]" />
              <span>Accredited Consultant &bull; Zylus Group & RECB</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
              Meet Mary Akoh
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Principal Investment Advisor & Founder of MariRealty. Championing fiduciary transparency,
              institutional security, and zero-compromise asset verification for local and diaspora investors.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
        {/* Executive Profile Grid */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-slate-900 shadow-2xl group">
              <Image
                src="/assets/branding/realtor-hero2.jpg"
                alt="Mary Akoh - Award Winning Real Estate Consultant, MariRealty"
                width={550}
                height={680}
                className="w-full h-[520px] object-cover object-top transition duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-lg bg-[#D4AF37] px-3 py-1 text-xs font-bold text-[#0B192C] uppercase tracking-wider">
                  Principal Consultant
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mt-2">
                  Mary Akoh
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Lead Consultant & Real Estate Wealth Strategist
                </p>
              </div>
            </div>

            {/* Award Spotlight Card */}
            <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#0B192C] to-[#132D4A] p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Award className="h-32 w-32 text-[#D4AF37]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>Industry Recognition</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white mt-2 leading-snug">
                  Best Behaved Female Business Associate (BA)
                </h4>
                <p className="text-xs text-[#D4AF37] font-semibold mt-1">
                  From the Active & Available Subsidiaries &bull; 15th March, 2026
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mt-3">
                  Awarded in recognition of exceptional professional conduct, fiduciary transparency,
                  uncompromising client protection, and ethical leadership in the management of
                  high-ticket property transactions and cooperative land banking.
                </p>
              </div>
            </div>
          </div>

          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 px-3.5 py-1 text-xs font-semibold text-[#10B981]">
              <ShieldCheck className="h-4 w-4" />
              <span>Reg. LSCS 18176 &bull; Verified Due Diligence</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#0B192C] leading-tight">
              Transforming Real Estate Advisory Into an Asset of True Security
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              In an industry frequently crowded with ambiguous land titles, unauthorized family sales,
              and speculative promises, <strong>Mary Akoh</strong> has built an impeccable reputation
              as one of the most trusted real estate investment strategists in Lagos.
            </p>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Operating under corporate accreditation with <strong>Zylus Group</strong> and licensed
              with the <strong>Lagos State Cooperative Societies (Reg. LSCS 18176)</strong>, Mary
              specializes in guiding diaspora investors and high-net-worth individuals into verified,
              legally protected land holdings and capital-guaranteed cooperative cashback portfolios.
            </p>

            {/* Core Values / Advisory Pillars */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B192C]">
                  Zero Omo-Onile Compromise
                </h4>
                <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                  Every listed asset undergoes strict land registry charting at Alausa, ensuring
                  authentic Governor&apos;s Consent, Gazette, or C of O titles with zero communal disputes.
                </p>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] mb-3">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B192C]">
                  Legally Binding Instruments
                </h4>
                <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                  All cooperative cashback subscriptions are executed with corporate deeds of agreement
                  and post-dated cheques from premier Tier-1 Nigerian commercial banks.
                </p>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B192C]">
                  Institutional Portfolio
                </h4>
                <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                  Direct access to mega-estate developments along the Lekki-Epe expressway,
                  Ibeju-Lekki corridor, Epe agricultural belt, and master-planned residential enclaves.
                </p>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B192C] text-[#D4AF37] mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B192C]">
                  Diaspora Concierge
                </h4>
                <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                  Tailored video walkthroughs, independent surveyor validation, and private Zoom
                  reviews so international buyers can invest with complete peace of mind.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B192C] px-7 py-3.5 font-heading text-sm font-semibold text-white hover:bg-[#D4AF37] hover:text-[#0B192C] transition-all duration-200 shadow-md"
              >
                <PhoneCall className="h-4 w-4" /> Book a Consultation with Mary Akoh
              </Link>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366]/10 px-6 py-3.5 font-heading text-sm font-semibold text-[#15803d] hover:bg-[#25D366] hover:text-white transition-all duration-200"
              >
                Chat Direct on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
