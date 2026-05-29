import type { SsgRoute } from "./types";
import { generateSchemaGraph } from "./generateSchemaGraph";

const SITE_URL = "https://lesco.lovable.app";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Fallback head generator. Only used by the prerender script when a page
 * did NOT emit its own <head> through react-helmet-async (the <SEO />
 * component). Pages that use <SEO /> already provide richer, real metadata.
 */
export function generateSeoHeadHtml(route: SsgRoute): string {
  const title = escapeHtml(route.title || "Lesco");
  const description = escapeHtml(route.description || "");
  const canonical = escapeHtml(route.canonical || `${SITE_URL}${route.slug}`);
  const ogImage = route.ogImage ? escapeHtml(route.ogImage) : "";
  const schema = JSON.stringify(generateSchemaGraph(route));

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    ogImage ? `<meta property="og:image" content="${ogImage}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : "",
    `<script type="application/ld+json">${schema}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}
