import { Property } from '@/types';

export const MOCK_PROPERTIES: Property[] = [
  {
    _id: 'prop-1',
    title: 'The Haven Crest Phase II',
    slug: { current: 'the-haven-crest-phase-ii' },
    category: 'cooperative-land-banking',
    location: 'Alaro City Corridor, Epe, Lagos',
    titleType: 'Certificate of Occupancy',
    price: 6500000,
    priceUnit: 'per 500sqm plot',
    paymentPlans: [
      'Outright: ₦6,500,000 (5% discount)',
      '6 Months: ₦1,200,000 / mo',
      '12 Months: ₦650,000 / mo',
    ],
    amenities: [
      'Paved Access Roads',
      'Solar Street Lighting',
      'Perimeter Fencing & Gatehouse',
      'Commercial Hub Proximity',
      'Clean Dry Topography',
    ],
    status: 'selling-fast',
    featured: true,
    description:
      'Strategically positioned along the emerging industrial and residential spine of Epe, The Haven Crest offers guaranteed capital appreciation backed by Lagos State Cooperative registration and verified C of O documentation.',
  },
  {
    _id: 'prop-2',
    title: 'Crown Sovereign Terraces',
    slug: { current: 'crown-sovereign-terraces' },
    category: 'completed-housing',
    location: 'Chevron Tollgate Axis, Lekki, Lagos',
    titleType: "Governor's Consent",
    price: 85000000,
    priceUnit: 'total unit',
    paymentPlans: [
      'Outright Payment',
      '30% Initial Deposit + 6 Months Balance',
      'NHF / Primary Mortgage Supported',
    ],
    amenities: [
      '4 Ensuite Bedrooms + BQ',
      'Fully Fitted Italian Kitchen',
      '24/7 Monitored CCTV Security',
      'Dedicated Transformer & Power',
      'Swimming Pool & Club',
    ],
    status: 'available',
    featured: true,
    description:
      'Contemporary 4-bedroom executive terraces crafted with European fittings, automated access control, and guaranteed rental yield of 9-11% p.a. for diaspora portfolio managers.',
  },
  {
    _id: 'prop-3',
    title: 'Atlantic View Maritime Estate',
    slug: { current: 'atlantic-view-maritime-estate' },
    category: 'outright-land',
    location: 'Coastal Road Spine, Ibeju-Lekki, Lagos',
    titleType: 'Government Gazette',
    price: 12000000,
    priceUnit: 'per 600sqm plot',
    paymentPlans: [
      'Outright: ₦12,000,000',
      '3 Months Split: ₦4,200,000 / mo',
      'Instant Physical Allocation',
    ],
    amenities: [
      'Direct Coastal Road Access',
      '10 Mins from Dangote Refinery',
      'Dry Table Land',
      'Registered Perimeter Survey',
      'Immediate Building Approval',
    ],
    status: 'available',
    featured: true,
    description:
      'Prime waterfront land acquisition along the Lagos-Calabar coastal corridor. Positioned for exponential commercial or residential value surge over the next 24 to 36 months.',
  },
  {
    _id: 'prop-4',
    title: 'Zylus Pine Crest Cooperative Scheme',
    slug: { current: 'zylus-pine-crest-cooperative-scheme' },
    category: 'cooperative-land-banking',
    location: 'Oregun Commercial District, Ikeja, Lagos',
    titleType: 'Deed of Assignment & Registered Survey',
    price: 25000000,
    priceUnit: 'per fractional unit',
    paymentPlans: [
      '12 Months Tenure: 25% Cashback Dividend',
      '24 Months Tenure: 35% Cashback Dividend',
      'Capital + Interest Guaranteed by RECB',
    ],
    amenities: [
      'Post-Dated Cheque Guarantee',
      'Insurance Backing',
      'LSCS 18176 Certification',
      'Zero Management Fees',
      'Quarterly Dividend Distribution',
    ],
    status: 'available',
    featured: true,
    description:
      'Cooperative wealth-creation program powered by RECB and Zylus Group. Fixed-income asset backing designed specifically for diaspora investors seeking scam-free yields.',
  },
];

export const MOCK_TESTIMONIALS = [
  {
    name: 'Dr. Chukwuemeka Okoye',
    role: 'Diaspora Investor (London, UK)',
    quote:
      'As someone who lost funds to relatives in 2021 pretending to buy land in Lekki, dealing with an accredited RECB consultant who issued a real post-dated cheque and Lagos State deed was the breath of fresh air I needed.',
    rating: 5,
  },
  {
    name: 'Mrs. Folashade Adeyemi',
    role: 'Portfolio Client (Victoria Island, Lagos)',
    quote:
      'Her advisory is grounded in law and title verification. She walked us away from two risky gazette lands and into an asset that has appreciated over 45% in 14 months.',
    rating: 5,
  },
  {
    name: 'Babajide Adeleke, Esq.',
    role: 'Corporate Counsel & Land Banker',
    quote:
      'The cashback yield projections were paid on the exact date agreed. The institutional partnership with Zylus Group and LSCS 18176 gives total legal clarity.',
    rating: 5,
  },
];
