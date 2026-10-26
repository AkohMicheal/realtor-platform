'use client';

import { useState } from 'react';
import { PromotionalFlyer } from '@/types';
import { MOCK_PROMOTIONAL_FLYERS } from '@/lib/mockData';
import { generateWhatsAppLink } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/tracking';
import { SafeSanityImage } from '@/components/listings/SafeSanityImage';
import {
  FileText,
  Sparkles,
  TrendingUp,
  Calendar,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PromotionalFlyersGalleryProps {
  flyers?: PromotionalFlyer[];
  maxItems?: number;
  initialLimit?: number;
  showHeader?: boolean;
}

const categoryIcons: Record<string, any> = {
  'Dividend Sheet': Calendar,
  'monthly-dividend': Calendar,
  'Buy To Resell': TrendingUp,
  'buy-to-resell': TrendingUp,
  'Special Promo': Sparkles,
  'cashback-promo': Sparkles,
};

const categoryLabels: Record<string, string> = {
  'Dividend Sheet': 'Dividend Sheet',
  'monthly-dividend': 'Dividend Sheet',
  'Buy To Resell': 'Buy To Resell',
  'buy-to-resell': 'Buy To Resell',
  'Special Promo': 'Special Promo',
  'cashback-promo': 'Special Promo',
};

export function PromotionalFlyersGallery({
  flyers = MOCK_PROMOTIONAL_FLYERS,
  maxItems,
  initialLimit = 6,
  showHeader = true,
}: PromotionalFlyersGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  const activeFlyers = (flyers && flyers.length > 0 ? flyers : MOCK_PROMOTIONAL_FLYERS)
    .filter((f) => f.active !== false && f.isActive !== false);

  const isFixedMax = typeof maxItems === 'number';
  const displayedFlyers = isFixedMax
    ? activeFlyers.slice(0, maxItems)
    : activeFlyers.slice(0, visibleCount);

  return (
    <section className="space-y-6">
      {showHeader && (
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
              ● Active Promotional Window
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedFlyers.map((flyer) => {
          const Icon = categoryIcons[flyer.category] || FileText;
          const label = categoryLabels[flyer.category] || flyer.category || 'Circular';
          const cycleLabel = flyer.month || flyer.cycleMonth || 'Active Circular';
          const whatsappMsg = `Hello Mary Akoh (MariRealty), I would like to receive the official full-resolution circular and terms for "${flyer.title}" (${cycleLabel}). Please share details.`;
          const whatsappUrl = generateWhatsAppLink(SITE_CONFIG.phone, whatsappMsg);

          return (
            <div
              key={flyer._id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Graphic Banner / Flyer Image */}
              <div className="relative w-full overflow-hidden bg-slate-900 border-b border-[#E2E8F0]">
                <SafeSanityImage
                  imageSource={flyer.image}
                  altText={flyer.title}
                  aspectRatio="portrait"
                />

                {/* Category Pill on top of image */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#D4AF37] shadow">
                    <Icon className="h-3 w-3" /> {label}
                  </span>
                </div>

                {/* Highlight badge if provided */}
                {flyer.highlightYield && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="rounded-full bg-[#10B981] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
                      {flyer.highlightYield}
                    </span>
                  </div>
                )}
              </div>

              {/* Flyer Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#C5A059] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{cycleLabel}</span>
                  </div>

                  <h3 className="mt-2 font-heading text-lg font-bold text-[#0B192C] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {flyer.title}
                  </h3>

                  {flyer.description && (
                    <p className="mt-2 text-xs text-[#475569] leading-relaxed line-clamp-2">
                      {flyer.description}
                    </p>
                  )}
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
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Controls (Triggers when > initialLimit and not fixed maxItems) */}
      {!isFixedMax && activeFlyers.length > initialLimit && (
        <div className="flex flex-col items-center justify-center pt-4 pb-2">
          {visibleCount < activeFlyers.length ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, activeFlyers.length))}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-[#0B192C] bg-white px-8 py-3.5 font-heading text-sm font-bold text-[#0B192C] shadow-sm transition-all duration-300 hover:bg-[#0B192C] hover:text-white hover:shadow-xl active:scale-95"
                aria-label="Show more promotional circulars"
              >
                <span>Show More Circulars &amp; Offers</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#0B192C] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#0B192C]">
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </button>
              <p className="text-xs font-medium text-[#94A3B8]">
                Showing {visibleCount} of {activeFlyers.length} active circulars &bull; {activeFlyers.length - visibleCount} remaining
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setVisibleCount(initialLimit)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-semibold text-[#475569] shadow-sm transition hover:bg-slate-50 hover:text-[#0B192C]"
              >
                <ChevronUp className="h-3.5 w-3.5" /> Show Fewer Circulars
              </button>
              <p className="text-[11px] text-[#94A3B8]">
                All {activeFlyers.length} active circulars displayed
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
