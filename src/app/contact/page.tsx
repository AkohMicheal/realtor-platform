'use client';

import { useState } from 'react';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { generateWhatsAppLink } from '@/lib/utils';
import { trackWhatsAppClick } from '@/lib/tracking';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    interest: 'RECB Yield Cashback',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: 'contact',
          tag: 'HOT_INVESTOR',
          metadata: {
            budget: formData.budget,
            interest: formData.interest,
            message: formData.message,
          },
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348100915397';
  const whatsappUrl = generateWhatsAppLink(
    phone,
    'Hi, I would like to schedule a private real estate advisory call regarding Lagos property listings and RECB cashback.'
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#060E1A] to-[#0B192C] pt-32 pb-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Omnichannel Access
            </span>
            <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
              Direct Advisory & Inquiries
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              No long ticketing queues. Speak directly with an accredited consultant on WhatsApp,
              request certified legal deed samples, or book a 15-minute video consultation.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-heading text-2xl font-bold text-[#0B192C]">
              Direct Contact Pathways
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              Choose your preferred channel for instant communication, document requests, or site inspection coordination.
            </p>

            {/* WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('ContactPage_WhatsApp')}
              className="flex items-center gap-4 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/5 p-5 transition hover:bg-[#25D366]/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366]">
                  Fastest Channel
                </span>
                <p className="font-heading font-bold text-base text-[#0B192C]">
                  Chat on WhatsApp Directly
                </p>
                <p className="text-xs text-[#475569]">Typically replies within 15 mins</p>
              </div>
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:+${phone}`}
              className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#D4AF37]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B192C] text-[#D4AF37] shadow-md">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Voice Calls & Direct Inquiries
                </span>
                <p className="font-heading font-bold text-base text-[#0B192C]">
                  +234 810 091 5397
                </p>
                <p className="text-xs text-[#475569]">Mon &ndash; Sat, 8:00am &ndash; 6:00pm WAT</p>
              </div>
            </a>

            {/* Office & Affiliation */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                <MapPin className="h-4 w-4" /> Advisory Office
              </div>
              <p className="text-sm text-[#0F172A] font-semibold">
                Lekki Phase 1 / Ikeja Corporate Axis, Lagos, Nigeria
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#10B981] font-medium pt-1">
                <ShieldCheck className="h-4 w-4" /> Lagos State Cooperative Reg. LSCS 18176
              </div>
            </div>
          </div>

          {/* Right Column: Portfolio Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-xl">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Zero Obligation
              </span>
              <h3 className="mt-1 font-heading text-2xl font-bold text-[#0B192C]">
                Request Confidential Prospectus & Call
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569]">
                Fill out the brief details below and the principal consultant will respond with verified land surveys and investment terms.
              </p>

              {status === 'success' ? (
                <div className="mt-8 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#10B981]" />
                  <h4 className="mt-3 font-heading text-lg font-bold text-[#0B192C]">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#475569] max-w-md mx-auto">
                    We will review your requested allocation and reach out via WhatsApp/Phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Adaeze Okafor"
                        className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 ... or +44 ..."
                        className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Primary Investment Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="RECB Yield Cashback">RECB Yield Cashback (20%-35%)</option>
                        <option value="Outright Land Epe">Outright Land Banking (Epe/Ibeju)</option>
                        <option value="Completed Housing">Completed Residential Terraces</option>
                        <option value="Commercial Land">Commercial / Industrial Plot</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Intended Capital / Budget
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g. ₦5,000,000 or ₦25,000,000"
                      className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Specific Requirements / Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us your timeline, preferred location, or diaspora questions..."
                      className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-rose-600 font-medium">
                      Failed to submit inquiry. Please click above to message us directly on WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-6 py-4 font-heading text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#D4AF37] hover:text-[#0B192C] active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {status === 'loading' ? 'Sending Details...' : 'Submit Portfolio Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
