// Lightweight Google Analytics 4 helper.
// Replace with your real GA4 Measurement ID (looks like "G-XXXXXXXXXX").
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export const gaEnabled =
  typeof GA_MEASUREMENT_ID === "string" &&
  GA_MEASUREMENT_ID.startsWith("G-") &&
  GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Track a custom analytics event. Safe to call even if GA is not configured. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    } else {
      // No-op fallback so the UI never breaks when GA is not set up yet.
      // eslint-disable-next-line no-console
      console.debug("[analytics]", event, params);
    }
  } catch {
    /* never throw from analytics */
  }
}
