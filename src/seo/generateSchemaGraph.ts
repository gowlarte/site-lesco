import type { SsgRoute } from "./types";

const SITE_URL = "https://lesco.lovable.app";

export function generateSchemaGraph(route: SsgRoute): Record<string, unknown> {
  const url = route.canonical || `${SITE_URL}${route.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title || "Lesco",
    description: route.description || "",
    url,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "Lesco",
      url: SITE_URL,
    },
  };
}
