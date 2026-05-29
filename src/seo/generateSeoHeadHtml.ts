import type { SsgRoute } from "./types";
import { generateSchemaGraph } from "./generateSchemaGraph";

const SITE_URL = "https://lesco.com.br";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

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
  const ogImage = escapeHtml(route.ogImage || DEFAULT_OG_IMAGE);
  const schema = JSON.stringify(generateSchemaGraph(route));

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="Lesco" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${title}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${title}" />`,
    `<script type="application/ld+json">${schema}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}
