import type { SsgRoute } from "./types";
import { site } from "../config/site";

const SITE_URL = site.siteUrl;

export function generateSchemaGraph(route: SsgRoute): Record<string, unknown> {
  const url = `${SITE_URL}${route.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title || "Lesco",
    description: route.description || "",
    url,
    inLanguage: site.htmlLang,
    isPartOf: {
      "@type": "WebSite",
      name: "Lesco",
      url: SITE_URL,
    },
  };
}
