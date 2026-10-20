declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", eventName, params);
  }
}

export function trackWhatsAppClick(context: string) {
  trackEvent("WhatsAppClick", { context });
}

export function trackCalculatorUsed(principal: number, tenure: number) {
  trackEvent("CalculatorUsed", { principal, tenure });
}

export function trackListingViewed(propertyId: string, propertyTitle: string) {
  trackEvent("ListingViewed", { propertyId, propertyTitle });
}

export function trackBrochureDownloaded(propertyTitle: string) {
  trackEvent("BrochureDownloaded", { propertyTitle });
}

export function trackConsultationBooked() {
  trackEvent("ConsultationBooked");
}
