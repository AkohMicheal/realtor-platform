import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { PropertyCard } from '@/components/listings/PropertyCard';
import { client } from '@/lib/sanity/client';
import { PROPERTIES_QUERY } from '@/lib/sanity/queries';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import { Property } from '@/types';
import { ShieldCheck, Filter, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verified Property Inventory & Land Banking | MariRealty',
  description:
    'Browse accredited Lagos real estate listings: Governor’s Consent terraces, Gazette and C of O land in Epe, Lekki, and Ibeju-Lekki, plus RECB cooperative cashback allocations.',
};

async function getProperties(): Promise<Property[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return MOCK_PROPERTIES;
    }
    const data = await client.fetch<Property[]>(PROPERTIES_QUERY);
    return data && data.length > 0 ? data : MOCK_PROPERTIES;
  } catch {
    return MOCK_PROPERTIES;
  }
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      <Navigation />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#060E1A] to-[#0B192C] pt-32 pb-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold text-[#D4AF37] mb-4">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span>Title-Verified & Registered Survey Backed</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Verified Properties & Land Banking
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Every property listed here has undergone legal title registry verification, dry topography
              inspections, and developmental zoning confirmation across prime Lagos corridors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Verification Strip */}
        <div className="mb-8 rounded-xl bg-white border border-[#E2E8F0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569]">
            <span className="font-semibold text-[#0B192C]">Showing:</span>
            <span>{properties.length} Active Verified Listings</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#10B981] font-medium">
            <ShieldCheck className="h-4 w-4" /> All legal documents available for lawyer review prior to payment
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
