/**
 * Resolve a CDN asset URL (from a .asset.json `url` field) to an absolute URL
 * in the browser, and keep the original relative URL during SSG/SSR.
 *
 * Some preview/production contexts fail to resolve the relative `/__l5e/...`
 * path, leaving images broken. Prefixing with the current origin fixes it.
 */
export function assetUrl(url: string): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(url, window.location.origin).href;
  }
  return url;
}
