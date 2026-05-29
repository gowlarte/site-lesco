import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Dispara um `virtual_page_view` no dataLayer a cada mudança de rota,
 * permitindo que o GTM/GA4 registre pageviews corretos em uma SPA.
 * Roda apenas no cliente.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtual_page_view",
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}
