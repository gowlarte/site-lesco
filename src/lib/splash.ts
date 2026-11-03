/**
 * Se a abertura da marca entra ou não.
 *
 * Mora fora do componente porque o App precisa decidir ANTES de montar a
 * splash — e porque um arquivo de componente que também exporta funções perde
 * o fast refresh no dev.
 */

const CHAVE_SESSAO = "lesco_splash_visto";

/**
 * A abertura é uma apresentação, e apresentação se faz uma vez.
 *
 * Antes ela rodava em TODO carregamento: quem voltava pelo histórico, abria um
 * produto numa aba nova ou dava F5 pagava os segundos de novo. Uma vez por
 * sessão de navegação é o escopo certo — some dentro da visita e volta na
 * próxima.
 *
 * Quem pediu menos movimento não vê abertura nenhuma, como já acontece no
 * scroll suave (src/lib/scroll-suave.ts) e nos blocos que entram com fade.
 */
export function deveMostrarSplash(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(CHAVE_SESSAO);
  } catch {
    // Navegação privada com storage bloqueado: a marca aparece, como antes.
    return true;
  }
}

export function marcarSplashVisto() {
  try {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
  } catch {
    /* sem storage, a abertura repete — é o pior caso, não um erro */
  }
}
