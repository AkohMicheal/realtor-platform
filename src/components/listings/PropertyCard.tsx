import Link from 'next/link';
import { MapPin, ShieldCheck, Tag } from 'lucide-react';
import { Property } from '@/types';
import { formatNaira } from '@/lib/utils';
import { SafeSanityImage } from '@/components/listings/SafeSanityImage';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const statusStyles = {
    available: 'bg-[#10B981] text-white',
    'selling-fast': 'bg-[#D4AF37] text-[#0B192C]',
    'sold-out': 'bg-rose-500 text-white',
  };

  const statusLabels = {
    available: 'Verified Available',
    'selling-fast': 'Selling Fast',
    'sold-out': 'Sold Out',
  };

  const categoryLabels = {
    'outright-land': 'Outright Land',
    'completed-housing': 'Completed Housing',
    'off-plan': 'Off-Plan Development',
    'cooperative-land-banking': 'Cooperative Land Banking',
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top Image Container */}
      <div className="relative w-full overflow-hidden bg-slate-900">
        <SafeSanityImage
          imageSource={property.mainImage}
          altText={property.title}
          aspectRatio="video"
        />

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-md ${
              statusStyles[property.status] || 'bg-slate-800 text-white'
            }`}
          >
            {statusLabels[property.status] || property.status}
          </span>
        </div>

        {/* Title Type Tag */}
        {property.titleType && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#0B192C]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white shadow">
              <ShieldCheck className="h-3 w-3 text-[#D4AF37]" /> {property.titleType}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category */}
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="font-semibold uppercase tracking-wider text-[#C5A059]">
            {categoryLabels[property.category] || property.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 font-heading text-lg font-bold text-[#0B192C] transition-colors group-hover:text-[#D4AF37] line-clamp-1">
          <Link href={`/properties/${property.slug.current}`}>
            {property.title}
          </Link>
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#475569]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Amenities Preview */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E2E8F0] pt-3">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="rounded-md bg-[#F8F9FA] border border-[#E2E8F0] px-2 py-0.5 text-[11px] text-[#475569]"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[11px] text-[#94A3B8] self-center">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className="mt-auto border-t border-[#E2E8F0] pt-4 mt-4 flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#94A3B8]">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xl font-extrabold text-[#0B192C]">
                {formatNaira(property.price)}
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                {property.priceUnit ? `/${property.priceUnit}` : ''}
              </span>
            </div>
          </div>

          <Link
            href={`/properties/${property.slug.current}`}
            className="inline-flex items-center gap-1 rounded-lg bg-[#0B192C] px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#D4AF37] hover:text-[#0B192C]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
