export interface SsgRoute {
  /** Route path, e.g. "/" or "/quem-somos" */
  slug: string;
  /** Optional fallback SEO metadata used only if the page does not
   *  emit its own Helmet head at build time. */
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  /** Rota que é pré-renderizada mas NÃO entra no sitemap.xml.
   *  Para provas internas: o arquivo estático existe (abrir o endereço
   *  direto funciona), mas nada convida o buscador a ir lá. O `noindex` da
   *  própria página é a segunda tranca. */
  semIndice?: boolean;
}
