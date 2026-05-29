import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import "./index.css";

export interface RenderResult {
  /** Rendered application HTML to inject inside <div id="root"> */
  html: string;
  /** Serialized <head> tags produced by react-helmet-async */
  head: string;
}

/**
 * Render a route to an HTML string at build time (SSG) or per request (SSR).
 * The returned `head` already contains <title>, meta, canonical, OG/Twitter
 * and JSON-LD that the page declared via the <SEO /> (react-helmet) component.
 */
export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head };
}
