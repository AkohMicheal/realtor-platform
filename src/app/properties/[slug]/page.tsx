import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { PropertyGallery } from '@/components/listings/PropertyGallery';
import { client } from '@/lib/sanity/client';
import { PROPERTY_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import { Property } from '@/types';
import { formatNaira, generateWhatsAppLink } from '@/lib/utils';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  FileText,
  Calendar,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const found = MOCK_PROPERTIES.find((p) => p.slug.current === slug);
      return found || null;
    }
    const data = await client.fetch<Property>(PROPERTY_BY_SLUG_QUERY, { slug });
    if (data) return data;
    return MOCK_PROPERTIES.find((p) => p.slug.current === slug) || null;
  } catch {
    return MOCK_PROPERTIES.find((p) => p.slug.current === slug) || null;
  }
}

export async function generateStaticParams() {
  return MOCK_PROPERTIES.map((p) => ({
    slug: p.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return { title: 'Property Not Found | MariRealty' };
  }

  return {
    title: `${property.title} | MariRealty`,
    description: property.description || `Verified Lagos property: ${property.location}. Title: ${property.titleType}`,
  };
}

function PropertyDetailSkeleton() {
  return (
    <div>
      <div className="bg-[#0B192C] pt-28 pb-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 mb-4">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Properties
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-36 rounded-full bg-slate-700/60 animate-pulse" />
                <div className="h-5 w-24 rounded-full bg-slate-700/60 animate-pulse" />
              </div>
              <div className="h-9 w-72 sm:w-96 rounded-lg bg-slate-700/60 animate-pulse" />
              <div className="mt-2 h-4 w-48 rounded bg-slate-700/60 animate-pulse" />
            </div>

            <div className="text-left md:text-right">
              <div className="h-3 w-24 rounded bg-slate-700/60 animate-pulse mb-1" />
              <div className="h-8 w-44 rounded bg-slate-700/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="aspect-[16/10] w-full rounded-2xl bg-slate-200 animate-pulse" />
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="h-6 w-44 rounded bg-slate-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-slate-100 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl space-y-4">
              <div className="h-5 w-48 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-32 rounded bg-slate-100 animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-slate-200 animate-pulse mt-6" />
              <div className="h-12 w-full rounded-xl bg-slate-100 animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function PropertyDetails({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348100915397';
  const whatsappMsg = `Hello, I am interested in inspecting "${property.title}" (${formatNaira(property.price)} in ${property.location}) from your website. Please share survey charts and available inspection schedules.`;
  const whatsappUrl = generateWhatsAppLink(phone, whatsappMsg);

  // Gallery array
  const galleryImages = [
    ...(property.mainImage ? [property.mainImage] : []),
    ...(property.gallery || []),
  ];

  return (
    <>
      {/* Header / Breadcrumb */}
      <div className="bg-[#0B192C] pt-28 pb-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#D4AF37] transition mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Properties
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-[#10B981]/20 border border-[#10B981]/40 px-3 py-0.5 text-xs font-semibold text-[#10B981]">
                  Verified Title: {property.titleType}
                </span>
                <span className="text-xs uppercase font-semibold text-[#D4AF37]">
                  {property.category.replace(/-/g, ' ')}
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {property.title}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-[#D4AF37]" /> {property.location}
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Investment Price</span>
              <p className="font-heading text-3xl font-extrabold text-[#D4AF37]">
                {formatNaira(property.price)}
              </p>
              {property.priceUnit && (
                <span className="text-xs text-slate-400">/{property.priceUnit}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={galleryImages} title={property.title} />

            {/* Overview / Description */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-[#0B192C]">
                Property Overview
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#475569]">
                {property.description}
              </p>
            </div>

            {/* Amenities & Infrastructure */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-[#0B192C]">
                  Infrastructure & Estate Amenities
                </h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-[#0F172A]">
                      <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Schedules */}
            {property.paymentPlans && property.paymentPlans.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-[#0B192C]">
                  Flexible Payment Schedules
                </h2>
                <div className="mt-4 space-y-3">
                  {property.paymentPlans.map((plan, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] p-4 text-sm"
                    >
                      <span className="font-semibold text-[#0B192C]">{plan}</span>
                      <span className="text-xs text-[#10B981] font-bold">Approved Plan</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry & Booking Sticky Drawer */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl">
              <div className="border-b border-[#E2E8F0] pb-4">
                <span className="text-xs uppercase tracking-wider text-[#94A3B8]">
                  Verified Consultant Direct Line
                </span>
                <p className="font-heading text-lg font-bold text-[#0B192C] mt-1">
                  Book Inspection or Request Deed
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {/* Primary WhatsApp Action */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-heading text-sm font-bold text-white shadow-md transition hover:bg-[#20ba5a] active:scale-98"
                >
                  <MessageCircle className="h-5 w-5" /> Chat on WhatsApp Directly
                </a>

                {/* Secondary Call */}
                <a
                  href={`tel:+${phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B192C] bg-white px-5 py-3.5 font-heading text-sm font-semibold text-[#0B192C] transition hover:bg-[#F8F9FA]"
                >
                  <PhoneCall className="h-4 w-4" /> Call Principal Realtor
                </a>

                <Link
                  href="/contact#schedule"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3.5 font-heading text-sm font-semibold text-white transition hover:bg-[#132D4A]"
                >
                  <Calendar className="h-4 w-4 text-[#D4AF37]" /> Schedule Zoom Portfolio Review
                </Link>
              </div>

              {/* Title Protection Notice */}
              <div className="mt-6 rounded-xl bg-[#10B981]/5 border border-[#10B981]/20 p-4">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0F172A] leading-relaxed">
                    <strong className="text-[#10B981]">Due Diligence Guaranteed:</strong> Registered survey coordinates and deed samples will be supplied directly to your legal counsel prior to closing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function PropertyDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#D4AF37]/20 selection:text-[#0B192C]">
      <Navigation />

      <Suspense fallback={<PropertyDetailSkeleton />}>
        <PropertyDetails params={params} />
      </Suspense>

      <Footer />
      <FloatingContact />
    </div>
  );
}
