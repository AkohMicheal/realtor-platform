declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Universal event dispatcher for Google Analytics 4, Meta Pixel, and Google Tag Manager / Ads dataLayer
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  // 1. Google Tag Manager / Ads dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  // 2. Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // 3. Meta Pixel (Standard & Custom tracking)
  if (window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
}

/**
 * Google Search Ads & Meta Pixel Conversion: Contact Initiation (WhatsApp, Phone Call, Email)
 */
export function trackContact(channel: string, details?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // dataLayer push
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'contact',
    contact_channel: channel,
    ...details,
  });

  // GA4
  if (window.gtag) {
    window.gtag('event', 'contact', {
      method: channel,
      ...details,
    });
  }

  // Meta Pixel Standard Event 'Contact'
  if (window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: channel,
      ...details,
    });
  }
}

export function trackWhatsAppClick(context: string, extraData?: Record<string, unknown>) {
  trackContact('WhatsApp', { context, ...extraData });
}

/**
 * Google Search Ads & Meta Pixel Conversion: Lead Form Submissions
 */
export function trackLead(
  source: string,
  budget?: string | number,
  interest?: string,
  extraParams?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  const numericBudget =
    typeof budget === 'number'
      ? budget
      : typeof budget === 'string'
      ? parseInt(budget.replace(/[^0-9]/g, ''), 10) || undefined
      : undefined;

  // dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    lead_source: source,
    value: numericBudget,
    currency: 'NGN',
    interest,
    ...extraParams,
  });

  // GA4 Standard Event 'generate_lead'
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'NGN',
      value: numericBudget,
      lead_source: source,
      interest,
      ...extraParams,
    });
  }

  // Meta Pixel Standard Event 'Lead'
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: interest || 'Real Estate Advisory',
      content_category: source,
      value: numericBudget,
      currency: 'NGN',
      ...extraParams,
    });
  }
}

/**
 * Google Search Ads & Meta Pixel Conversion: Calculator / High-Intent Checkout Initiation
 */
export function trackInitiateCheckout(
  principal: number,
  tenure: number,
  annualRate: number
) {
  if (typeof window === 'undefined') return;

  // dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'begin_checkout',
    value: principal,
    currency: 'NGN',
    tenure_months: tenure,
    annual_rate: annualRate,
  });

  // GA4
  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: principal,
      currency: 'NGN',
      items: [
        {
          item_name: `RECB Cashback (${tenure} Mo @ ${annualRate}%)`,
          item_category: 'Cooperative Cashback',
          price: principal,
          quantity: 1,
        },
      ],
    });
  }

  // Meta Pixel Standard Event 'InitiateCheckout'
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: principal,
      currency: 'NGN',
      content_name: `RECB Cashback ${tenure} Months`,
      content_category: 'Investment Scheme',
      num_items: 1,
    });
  }
}

export function trackCalculatorUsed(principal: number, tenure: number) {
  trackEvent('CalculatorUsed', { principal, tenure });
}

export function trackListingViewed(
  propertyId: string,
  propertyTitle: string,
  price?: number,
  category?: string
) {
  if (typeof window === 'undefined') return;

  // dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'view_item',
    item_id: propertyId,
    item_name: propertyTitle,
    value: price,
    currency: 'NGN',
    item_category: category,
  });

  // GA4
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'NGN',
      value: price,
      items: [
        {
          item_id: propertyId,
          item_name: propertyTitle,
          item_category: category,
          price,
        },
      ],
    });
  }

  // Meta Pixel Standard Event 'ViewContent'
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [propertyId],
      content_name: propertyTitle,
      content_type: 'product',
      value: price,
      currency: 'NGN',
    });
  }
}

export function trackBrochureDownloaded(propertyTitle: string) {
  trackEvent('BrochureDownloaded', { propertyTitle });
  trackLead('brochure_download', undefined, propertyTitle);
}

export function trackConsultationBooked(details?: Record<string, unknown>) {
  trackLead('consultation_booking', undefined, undefined, details);
}
