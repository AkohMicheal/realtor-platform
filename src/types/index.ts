export interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  category: "outright-land" | "completed-housing" | "off-plan" | "cooperative-land-banking";
  location: string;
  titleType: string;
  price: number;
  priceUnit: string;
  paymentPlans: string[];
  amenities: string[];
  coordinates?: { lat: number; lng: number };
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  videoWalkthroughUrl?: string;
  brochurePdf?: SanityFile;
  status: "available" | "selling-fast" | "sold-out";
  featured: boolean;
  description?: string;
}

export interface SanityImage {
  asset: { _ref: string; url?: string };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface SanityFile {
  asset: { _ref: string; url: string };
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  budget?: number;
  source: "calculator" | "listing" | "contact" | "download";
  tag: "HOT_INVESTOR" | "WARM_LISTING" | "COLD_NURTURE";
  metadata?: Record<string, string>;
  created_at?: string;
}

export interface CalculatorResult {
  principal: number;
  tenureMonths: number;
  annualRate: number;
  totalPayout: number;
  netProfit: number;
  maturityDate: string;
}

export type PropertyCategory = Property["category"];
export type PropertyStatus = Property["status"];
export type LeadSource = Lead["source"];
export type LeadTag = Lead["tag"];
