export type Locale = "pt" | "en";

/**
 * The active locale is chosen at BUILD time via the `VITE_LOCALE` env var.
 * Each domain builds a single-language static site:
 *   - VITE_LOCALE=pt  ->  lesco.com.br   (default)
 *   - VITE_LOCALE=en  ->  lescousa.com
 *
 * The value is read from two places because the same modules run in two
 * contexts during a build:
 *   1. Vite-built code (client bundle + SSR entry) — Vite statically inlines
 *      `import.meta.env.VITE_LOCALE`.
 *   2. The prerender script (scripts/prerender.ts, run via tsx/Node) — reads
 *      `process.env.VITE_LOCALE`.
 */
function resolveLocale(): Locale {
  let raw: string | undefined;

  // Vite context (import.meta.env is undefined under plain Node/tsx).
  try {
    raw = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_LOCALE;
  } catch {
    raw = undefined;
  }

  // Node/tsx context (prerender).
  if (!raw && typeof process !== "undefined") {
    raw = process.env?.VITE_LOCALE;
  }

  return raw === "en" ? "en" : "pt";
}

export const LOCALE: Locale = resolveLocale();
export const isEN = LOCALE === "en";
