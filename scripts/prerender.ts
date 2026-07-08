import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { generateSeoHeadHtml } from "../src/seo/generateSeoHeadHtml";
import type { SsgRoute } from "../src/seo/types";
import { site } from "../src/config/site";
import { localizePath } from "../src/i18n/routes";

const DIST = path.resolve("dist");
const routes = JSON.parse(
  fs.readFileSync(path.resolve("ssg-routes.json"), "utf-8")
) as SsgRoute[];

const ROOT_DIV = '<div id="root"></div>';
const SEO_MARKER = "<!--seo-head-->";

async function prerender() {
  const templatePath = path.join(DIST, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing ${templatePath}. Run "vite build" first.`);
  }
  // Locale-specific rewrites of the static shell (index.html template):
  //  - <html lang> for the active language
  //  - Google Tag Manager container id (separate container per domain)
  //  - Organization JSON-LD: url/email do domínio ativo
  const template = fs
    .readFileSync(templatePath, "utf-8")
    .replace('lang="pt-BR"', `lang="${site.htmlLang}"`)
    .replace(/GTM-NLMKCHH/g, site.gtmId)
    .replace('"url": "https://lesco.com.br"', `"url": "${site.siteUrl}"`)
    .replace('"email": "contato@lesco.com.br"', `"email": "${site.email}"`);

  const serverEntryPath = path.join(DIST, "server", "entry-server.js");
  const { render } = (await import(pathToFileURL(serverEntryPath).href)) as {
    render: (url: string) => { html: string; head: string };
  };

  for (const route of routes) {
    // route.slug é o slug PT (ssg-routes.json). No build EN, renderiza e grava
    // no slug traduzido (que casa com as rotas localizadas do App).
    const localeSlug = localizePath(route.slug);
    let appHtml = "";
    let helmetHead = "";

    try {
      const result = render(localeSlug);
      appHtml = result.html;
      helmetHead = result.head;
    } catch (err) {
      console.warn(`[SSG] Falha ao renderizar ${localeSlug}:`, (err as Error).message);
    }

    // Prefer real per-page head emitted by the page's <SEO /> (Helmet).
    // Fall back to the metadata declared in ssg-routes.json.
    const seoHead = helmetHead && helmetHead.includes("<title")
      ? helmetHead
      : generateSeoHeadHtml(route);

    let html = template.includes(SEO_MARKER)
      ? template.replace(SEO_MARKER, seoHead)
      : template;

    html = html.replace(ROOT_DIV, `<div id="root">${appHtml}</div>`);

    const outputDir =
      localeSlug === "/" ? DIST : path.join(DIST, localeSlug);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf-8");

    console.log(`[SSG] Página gerada: ${localeSlug}`);
  }

  console.log(`[SSG] Concluído: ${routes.length} páginas pré-renderizadas.`);

  // sitemap.xml + robots.txt gerados por locale (o domínio muda por build).
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const loc = `${site.siteUrl}${localizePath(route.slug)}`;
      const isHome = route.slug === "/";
      const changefreq = isHome ? "weekly" : "monthly";
      const priority = isHome ? "1.0" : "0.7";
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf-8");

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST, "robots.txt"), robots, "utf-8");

  console.log(`[SSG] sitemap.xml e robots.txt gerados para ${site.siteUrl}`);
}

prerender().catch((err) => {
  console.error("[SSG] Erro no prerender:", err);
  process.exit(1);
});
