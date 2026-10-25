'use client';

import { PromotionalFlyer } from '@/types';
import { MOCK_PROMOTIONAL_FLYERS } from '@/lib/mockData';
import { formatNaira, generateWhatsAppLink } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/tracking';
import {
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Calendar,
  MessageCircle,
} from 'lucide-react';

interface PromotionalFlyersGalleryProps {
  flyers?: PromotionalFlyer[];
}

const categoryIcons = {
  'cashback-promo': Sparkles,
  'buy-to-resell': TrendingUp,
  'partner-challenge': Award,
  'monthly-dividend': Calendar,
};

export function PromotionalFlyersGallery({
  flyers = MOCK_PROMOTIONAL_FLYERS,
}: PromotionalFlyersGalleryProps) {
  const activeFlyers = flyers.filter((f) => f.isActive);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div>
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Active Co-op Circulars
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-[#0B192C]">
            Current Monthly Circulars &amp; Promotional Flyers
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#475569] max-w-2xl">
            RECB and Zylus cooperative yields and land banking initiatives update monthly based on active
            promotional windows. Explore current verified circulars below.
          </p>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1 text-xs font-semibold text-[#10B981]">
            ● Updated for Active Promo Window
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeFlyers.map((flyer) => {
          const Icon = categoryIcons[flyer.category] || FileText;
          const whatsappMsg = `Hello Mary Akoh (MariRealty), I would like to receive the official full-resolution circular and subscription form for "${flyer.title}" (${flyer.cycleMonth}). Please share details.`;
          const whatsappUrl = generateWhatsAppLink(SITE_CONFIG.phone, whatsappMsg);

          return (
            <div
              key={flyer._id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#0B192C] px-2.5 py-1 text-[11px] font-semibold text-[#D4AF37]">
                    <Icon className="h-3 w-3" /> {flyer.cycleMonth}
                  </span>
                  {flyer.highlightYield && (
                    <span className="rounded-full bg-[#10B981]/10 px-2.5 py-0.5 text-xs font-bold text-[#10B981]">
                      {flyer.highlightYield}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-heading text-base font-bold text-[#0B192C] group-hover:text-[#D4AF37] transition-colors">
                  {flyer.title}
                </h3>

                <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                  {flyer.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`Flyer_${flyer.category}`)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-4 py-3 text-xs font-semibold text-white shadow transition-all duration-200 hover:bg-[#25D366] hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" /> Request Official Circular on WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
