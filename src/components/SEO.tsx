import { Helmet } from "react-helmet-async";
import ogDefault from "@/assets/og-default.jpg";
import { site, LOCALE_URLS } from "@/config/site";
import { slugFor, LOCALE } from "@/i18n/routes";
import { prioridade } from "@/lib/utils";

const SITE_URL = site.siteUrl;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
  /** Imagem do LCP da página: entra como <link rel="preload"> no <head>. */
  preloadImage?: string;
}

/** Turn a possibly-relative image path into an absolute URL (required by
 *  social crawlers). External URLs (http...) are returned untouched. */
function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

export function SEO({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
  noindex = false,
  preloadImage,
}: SEOProps) {
  // `path` é sempre o slug PT; canonical/hreflang usam o slug de cada locale.
  const url = `${SITE_URL}${slugFor(path, LOCALE)}`;
  const ptUrl = `${LOCALE_URLS.pt}${slugFor(path, "pt")}`;
  const enUrl = `${LOCALE_URLS.en}${slugFor(path, "en")}`;
  const imageUrl = toAbsoluteUrl(image || ogDefault);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url} />

      {/* LCP: o preload sai no HTML estático, antes de o bundle avaliar o <img>. */}
      {preloadImage && (
        <link rel="preload" as="image" href={preloadImage} {...prioridade("high")} />
      )}

      {/* hreflang — mesma página nos dois domínios, cada um com seu slug */}
      <link rel="alternate" hrefLang="pt-BR" href={ptUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Lesco" />
      <meta property="og:locale" content={site.ogLocale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
