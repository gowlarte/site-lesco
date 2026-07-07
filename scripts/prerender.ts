import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { generateSeoHeadHtml } from "../src/seo/generateSeoHeadHtml";
import type { SsgRoute } from "../src/seo/types";
import { site } from "../src/config/site";

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
  const template = fs
    .readFileSync(templatePath, "utf-8")
    .replace('lang="pt-BR"', `lang="${site.htmlLang}"`)
    .replace(/GTM-NLMKCHH/g, site.gtmId);

  const serverEntryPath = path.join(DIST, "server", "entry-server.js");
  const { render } = (await import(pathToFileURL(serverEntryPath).href)) as {
    render: (url: string) => { html: string; head: string };
  };

  for (const route of routes) {
    let appHtml = "";
    let helmetHead = "";

    try {
      const result = render(route.slug);
      appHtml = result.html;
      helmetHead = result.head;
    } catch (err) {
      console.warn(`[SSG] Falha ao renderizar ${route.slug}:`, (err as Error).message);
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
      route.slug === "/" ? DIST : path.join(DIST, route.slug);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf-8");

    console.log(`[SSG] Página gerada: ${route.slug}`);
  }

  console.log(`[SSG] Concluído: ${routes.length} páginas pré-renderizadas.`);
}

prerender().catch((err) => {
  console.error("[SSG] Erro no prerender:", err);
  process.exit(1);
});
