export interface SsgRoute {
  /** Route path, e.g. "/" or "/quem-somos" */
  slug: string;
  /** Optional fallback SEO metadata used only if the page does not
   *  emit its own Helmet head at build time. */
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}
