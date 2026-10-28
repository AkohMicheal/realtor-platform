export interface PaymentTier {
  planName: string; // e.g. "Outright Payment", "3 Months", "6 Months", "12 Months"
  tenureMonths: number; // 0 for outright, 3, 6, 12
  totalPrice: number;
  initialDeposit: number;
  monthlyInstallment?: number;
  description?: string;
  name?: string;
  durationMonths?: number;
  price?: number;
  monthlyRepayment?: number;
}

export interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  category: "outright-land" | "completed-housing" | "off-plan" | "cooperative-land-banking";
  location: string;
  titleType: string; // e.g. "Governor's Consent", "C of O", "Government Gazette", "C of O in view"
  titleStatus?: string; // e.g. "Approved & Charted", "C of O in view", "Government Allocation"
  price: number;
  priceUnit: string;
  initialDeposit?: number; // e.g. 1000000
  monthlyInstallment?: number; // e.g. 450000
  paymentPlans: string[];
  paymentTiers?: PaymentTier[];
  amenities: string[];
  coordinates?: { lat: number; lng: number };
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  videoWalkthroughUrl?: string;
  brochurePdf?: SanityFile;
  status: "available" | "selling-fast" | "sold-out";
  featured: boolean;
  description?: string;
  _createdAt?: string;
}

export interface PromotionalFlyer {
  _id: string;
  title: string;
  category: string;
  month?: string;
  cycleMonth?: string;
  highlightYield?: string;
  image?: any;
  pdfUrl?: string;
  description?: string;
  active?: boolean;
  isActive?: boolean;
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
