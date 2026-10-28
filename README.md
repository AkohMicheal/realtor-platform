# MariRealty — Institutional Real Estate Advisory & Cooperative Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity Studio](https://img.shields.io/badge/Sanity-v6_Embedded-F03E2F?logo=sanity)](https://www.sanity.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_Engine-black?logo=resend)](https://resend.com/)

> **MariRealty** is a high-performance, institutional-grade real estate advisory and land-banking web platform designed for **Mary Akoh**, Principal Consultant accredited with **Zylus Group International** and the **Real Estate Cashback Cooperative (RECB, Lagos State Reg. LSCS 18176)**.

---

## 🌟 Key Features

### 1. RECB Yield Cashback Simulator (`YieldCalculator.tsx`)
- **Mathematical Simulation**: Calculates exact net cashback returns and total payouts based on investment capital (₦1M to ₦100M+).
- **Dynamic Yield Rates**: Presets for **30% Standard**, **33% Growth**, **35% Elite**, and **37% Active Promo**, with a manual fine-tune slider (25%–45%).
- **Standardized Tenures**: Designed around cooperative operational guidelines with **12-Month Standard Maturity** and **24-Month Roll-Over** options.
- **Instant WhatsApp Pre-Fill**: One-click action generating an encoded prospectus request detailing the client's chosen capital, yield rate, and maturity date.

### 2. Verified Property Inventory & Multi-Tier Payment Plans
- **Title Transparency**: Displays legal title metadata badges (*Governor's Consent*, *C of O*, *Gazette*, *Government Allocation*).
- **Structured Payment Tiers**: Displays outright vs. installment spread plans (3-Month, 6-Month, 12-Month) with initial deposit and monthly repayment breakdowns.
- **Adaptive Fullscreen Lightbox**: Supports high-resolution portrait and landscape photos/flyers in `PropertyGallery.tsx` using uncropped `object-contain` rendering.
- **Progressive Disclosure**: Built-in pagination (`PaginatedPropertiesGrid.tsx`) showing 6 properties initially with smooth "Show More" expansion controls.

### 3. Dynamic Promotional Circulars Showcase (`PromotionalFlyersGallery.tsx`)
- Direct integration with Sanity CMS for fast-moving monthly circulars (*Dividend Sheets*, *Buy-to-Resell Deals*, and *Special Promos*).
- Capped at 3 spotlight circulars on the homepage and up to 6 on the investment page with progressive disclosure.
- Instant pre-filled WhatsApp consultation deep links per circular.

### 4. Direct Omnichannel Lead Pipeline (Supabase + Resend)
- **Zero Third-Party Middleware**: Directly integrated inside Next.js API route (`src/app/api/leads/route.ts`).
- **Database Storage**: Submissions are validated with Zod and archived in Supabase `leads` table.
- **Instant Email Alerts**: Dispatches an executive HTML notification to `xxxx@gmail.com` the exact second a client submits an inquiry, complete with a 1-tap WhatsApp chat button and phone call trigger.

### 5. Embedded Sanity Backoffice Studio (`/backoffice`)
- Fully embedded Sanity Studio accessible at `/backoffice` without running a separate CMS server.
- Allows real-time content management of properties, monthly circular flyers, and client testimonials.

### 6. Advanced SEO & JSON-LD Structured Data
- **High-Intent Metadata**: Built-in keywords targeting local and diaspora buyers (*"Mari Realty"*, *"Mari Realty Nigeria"*, *"Real Estate Cashback Lagos"*, *"Zylus Cooperative Realtor"*, *"Land for sale in Epe and Lekki"*).
- **Social Sharing Previews**: Configured OpenGraph and Twitter cards (1200x630) for WhatsApp, Facebook, and X.
- **Rich Snippets & Knowledge Graph**: Injected `RealEstateAgent` and `LocalBusiness` JSON-LD schemas in root layout and `Product` / `RealEstateListing` schemas in detail views.
- **Dynamic Sitemap & Robots**: Fully automated `sitemap.xml` that auto-indexes static landing pages and Sanity listing records, with `robots.txt` granting crawling access to Googlebot, Bingbot, and Meta crawlers.

### 7. Google Search Ads & Meta Pixel Conversion Engine
- Omnichannel event dispatcher (`src/lib/tracking.ts`) firing simultaneously to `window.dataLayer`, Google Analytics 4 (`gtag`), and Meta Pixel (`fbq`).
- Standard conversion events wired for ad attribution: `Lead` / `generate_lead` on form submit, `InitiateCheckout` / `begin_checkout` on Yield Calculator projections, and `Contact` on WhatsApp CTAs.

### 8. Core Web Vitals (90+ Scores) Optimizations
- **LCP**: Priority hero image with responsive `sizes` attribute, font optimization via `next/font` with `display: swap`, and preconnect resource hints for Sanity CDN and Google Tag Manager.
- **INP**: Lifecycle visibility listener in Three.js hero canvas to halt animation loops when tabs are inactive, protecting the main thread.
- **CLS**: Zero Cumulative Layout Shift via strict aspect-ratio containers (`aspect-[16/9]`, `aspect-[3/4]`, `aspect-square`) across listing cards and flyer grids.
- **Analytics & Observability**: Vercel Web Analytics (`@vercel/analytics`) and Vercel Speed Insights (`@vercel/speed-insights`).

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 16.4.2 (App Router) | Turbopack, Partial Prerendering (PPR), Server Components |
| **Language** | TypeScript 5 | Strict typing across all components, schemas, and API routes |
| **Styling** | Tailwind CSS v4 & Lucide Icons | Deep Navy (`#0B192C`), Champagne Gold (`#D4AF37`), Emerald (`#10B981`) |
| **3D & Animation** | Three.js & GSAP | Lightweight ambient geometric hero particle plane, counter animations |
| **CMS** | Sanity v6 (Embedded) | Next-Sanity, GROQ queries, `@sanity/image-url` pipeline |
| **Database** | Supabase | PostgreSQL storage for incoming investor leads |
| **Email Delivery** | Resend SDK | Instant notification engine for client lead routing |
| **Analytics** | Vercel Analytics & Speed Insights | Real-time Core Web Vitals and visitor engagement monitoring |

---

## 📁 Project Structure

```text
realtor-platform/
├── public/
│   ├── assets/
│   │   ├── branding/       # Realtor portraits, logos, badge textures
│   │   └── trust/          # Certified sample deeds, cheques, receipts
│   └── docs/               # Sample RECB Deed of Agreement (PDF)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── leads/      # Supabase + Resend direct lead submission route
│   │   │   └── revalidate/ # Sanity on-demand ISR revalidation webhook
│   │   ├── backoffice/     # Embedded Sanity Studio route (/backoffice)
│   │   ├── about/          # Consultant bio & award accreditation page
│   │   ├── contact/        # Direct consultation booking & lead capture
│   │   ├── investment/     # RECB cooperative scheme, circulars & FAQ
│   │   ├── properties/     # Verified inventory listing & detail views
│   │   ├── layout.tsx      # Root layout with Vercel Analytics & Speed Insights
│   │   └── page.tsx        # Homepage (Hero 3D, Trust, Inventory, Calculator)
│   ├── components/
│   │   ├── 3d/             # Lightweight Three.js ambient hero canvas
│   │   ├── animations/     # GSAP counter and scroll interactions
│   │   ├── calculator/     # Interactive RECB Yield Estimator
│   │   ├── investment/     # Dynamic promotional circulars gallery
│   │   ├── listings/       # PropertyCard, PropertyGallery, SafeSanityImage
│   │   ├── shared/         # Navigation, Footer, TrustBar, FloatingContact
│   │   └── ui/             # MediaPlaceholder, InstagramIcon, custom UI
│   ├── lib/
│   │   ├── constants.ts    # Brand config, contact phone, emails, socials
│   │   ├── mockData.ts     # Offline defensive fallback data
│   │   ├── tracking.ts     # Meta Pixel & GA4 event dispatchers
│   │   ├── utils.ts        # Naira currency formatter, WhatsApp link builders
│   │   └── sanity/         # Client config, image builders, GROQ queries
│   ├── sanity/             # Sanity Studio schemas (property, flyer, testimonial)
│   └── types/              # Comprehensive TypeScript interfaces
├── sanity.config.ts        # Sanity Studio configuration
└── next.config.ts          # Turbopack & remote image patterns (cdn.sanity.io)
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Access the Embedded Sanity Studio
Navigate to [http://localhost:3000/backoffice](http://localhost:3000/backoffice) to log in and manage properties, promotional flyers, and testimonials.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🚢 Production Deployment (Vercel)

1. **Push to GitHub**: Push the repository to your GitHub account.
2. **Import to Vercel**: Import the project from the Vercel dashboard.
3. **Configure Environment Variables**: Copy the variables from `.env.local` into the **Environment Variables** section in your Vercel project settings.
4. **Deploy**: Trigger deployment. The build will automatically compile all static routes and initialize Partial Prerendering (PPR) with Vercel Analytics and Speed Insights.

---

## 📜 License & Ownership
Copyright © 2026 **MariRealty Advisory & Investments**. All rights reserved.
Developed for accredited representation affiliated with Zylus Group International and Real Estate Cashback Cooperative (LSCS 18176).
