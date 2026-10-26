'use client';

import { useState } from 'react';
import { Property } from '@/types';
import { PropertyCard } from '@/components/listings/PropertyCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PaginatedPropertiesGridProps {
  properties: Property[];
  initialLimit?: number;
}

export function PaginatedPropertiesGrid({
  properties,
  initialLimit = 6,
}: PaginatedPropertiesGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  const displayedProperties = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;
  const remainingCount = properties.length - visibleCount;

  return (
    <div className="space-y-10">
      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {/* Show More / Show Less Controls (Triggers when > initialLimit) */}
      {properties.length > initialLimit && (
        <div className="flex flex-col items-center justify-center pt-4 pb-2">
          {hasMore ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, properties.length))}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-[#0B192C] bg-white px-8 py-3.5 font-heading text-sm font-bold text-[#0B192C] shadow-sm transition-all duration-300 hover:bg-[#0B192C] hover:text-white hover:shadow-xl active:scale-95"
                aria-label={`Show ${Math.min(6, remainingCount)} more properties`}
              >
                <span>Show More Properties</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#0B192C] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#0B192C]">
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </button>
              <p className="text-xs font-medium text-[#94A3B8]">
                Showing {visibleCount} of {properties.length} verified listings &bull; {remainingCount} remaining
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setVisibleCount(initialLimit);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-semibold text-[#475569] shadow-sm transition hover:bg-slate-50 hover:text-[#0B192C]"
              >
                <ChevronUp className="h-3.5 w-3.5" /> Show Fewer Listings
              </button>
              <p className="text-[11px] text-[#94A3B8]">
                All {properties.length} verified listings displayed
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
