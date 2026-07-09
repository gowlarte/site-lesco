import { LOCALE, type Locale } from "./locale";

/**
 * Mapa de rotas por locale. A CHAVE de cada rota é o slug PT (fonte canônica
 * usada no código: todo <Link to="/slug-pt"> e <Route path="/slug-pt">).
 * No build EN o slug PT é traduzido para o slug EN correspondente.
 *
 * Regra: o código continua escrevendo os caminhos em PT; `localizePath()`
 * (usado pelo wrapper Link e pelo App/prerender) devolve o slug do locale ativo.
 * No build PT devolve o próprio slug PT -> site PT byte-idêntico.
 *
 * Import relativo de ./locale para funcionar também sob tsx/Node (prerender).
 */
type RouteMap = Record<string, Record<Locale, string>>;

// Rotas de conteúdo (slug PT -> slug por locale). Home e marcas ficam iguais.
export const ROUTES: RouteMap = {
  "/": { pt: "/", en: "/" },
  "/quem-somos": { pt: "/quem-somos", en: "/about-us" },
  "/madeira-wpc": { pt: "/madeira-wpc", en: "/wpc-wood" },
  "/revestimento-sustentavel": { pt: "/revestimento-sustentavel", en: "/sustainable-cladding" },
  "/madeira-ecologica-lesco": { pt: "/madeira-ecologica-lesco", en: "/ecological-wood" },
  "/brise-madeira-ecologica": { pt: "/brise-madeira-ecologica", en: "/wood-brise" },
  "/madeira-ecologica-para-fachada": { pt: "/madeira-ecologica-para-fachada", en: "/facade-cladding" },
  "/madeira-ecologica-para-deck": { pt: "/madeira-ecologica-para-deck", en: "/wood-decking" },
  "/forro-wpc": { pt: "/forro-wpc", en: "/wpc-ceiling" },
  "/placa-wpc-interior": { pt: "/placa-wpc-interior", en: "/wpc-wall-panel" },
  "/catalogo-lesco": { pt: "/catalogo-lesco", en: "/catalog" },
  "/biblioteca": { pt: "/biblioteca", en: "/library" },
  "/orcamento": { pt: "/orcamento", en: "/quote" },
  "/portfolio": { pt: "/portfolio", en: "/portfolio" },
  "/linhas": { pt: "/linhas", en: "/collections" },
  "/live-lesco": { pt: "/live-lesco", en: "/live-lesco" },
  "/live-lesco-amostra": { pt: "/live-lesco-amostra", en: "/live-lesco-sample" },
  "/blog": { pt: "/blog", en: "/blog" },
  "/politica-de-privacidade": { pt: "/politica-de-privacidade", en: "/privacy-policy" },
  "/termos-de-servico": { pt: "/termos-de-servico", en: "/terms-of-service" },
  "/obrigado": { pt: "/obrigado", en: "/thank-you" },
  "/obrigado-orcamento": { pt: "/obrigado-orcamento", en: "/thank-you-quote" },
  "/obrigado-catalogo": { pt: "/obrigado-catalogo", en: "/thank-you-catalog" },
  "/obrigado-catalogo-geo": { pt: "/obrigado-catalogo-geo", en: "/thank-you-catalog-geo" },
  "/obrigado-whats": { pt: "/obrigado-whats", en: "/thank-you-whatsapp" },
  // Marcas/lançamentos — mantidos iguais nos dois idiomas.
  "/zhu": { pt: "/zhu", en: "/zhu" },
  "/echo": { pt: "/echo", en: "/echo" },
  "/geo": { pt: "/geo", en: "/geo" },
};

// Bases de rotas dinâmicas (prefixo PT -> prefixo por locale).
export const DYNAMIC_BASES: Array<{ pt: string; en: string }> = [
  { pt: "/projetos/", en: "/projects/" },
  { pt: "/blog/", en: "/blog/" },
  { pt: "/em-breve/", en: "/coming-soon/" },
];

/** Todas as chaves (slugs PT) das rotas estáticas de conteúdo. */
export const ROUTE_KEYS = Object.keys(ROUTES);

/** Slug de um caminho PT em um locale específico (mantém query/hash). */
export function slugFor(ptPath: string, locale: Locale): string {
  if (typeof ptPath !== "string" || !ptPath.startsWith("/")) return ptPath;

  // Separa query/hash para não atrapalhar o match.
  const m = ptPath.match(/^([^?#]*)([?#].*)?$/);
  const pathOnly = m ? m[1] : ptPath;
  const suffix = m && m[2] ? m[2] : "";

  // Match exato.
  const exact = ROUTES[pathOnly];
  if (exact) return exact[locale] + suffix;

  // Bases dinâmicas (ex.: /projetos/casa-mansa -> /projects/casa-mansa).
  for (const base of DYNAMIC_BASES) {
    if (pathOnly.startsWith(base.pt)) {
      return base.en === base.pt && locale === "pt"
        ? ptPath
        : base[locale] + pathOnly.slice(base.pt.length) + suffix;
    }
  }

  // Sem mapeamento conhecido — passa direto (rede de proteção).
  return ptPath;
}

/** Slug de um caminho PT no locale ATIVO do build. */
export function localizePath(ptPath: string): string {
  return slugFor(ptPath, LOCALE);
}

export { LOCALE };
