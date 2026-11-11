import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { irAoTopoJa, rolarAteElemento } from "@/lib/scroll-suave";

/**
 * Toda troca de página começa no topo (ou na âncora do link).
 *
 * Passa pelo scroll-suave e não direto por `window.scrollTo`: com o Lenis no
 * meio de uma rolagem, a ida nativa ao topo era desfeita no quadro seguinte e
 * a página nova abria no rodapé. Ver `irAoTopoJa`.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Sem âncora: comportamento padrão de ir ao topo a cada navegação.
    if (!hash) {
      irAoTopoJa();
      return;
    }

    // Com âncora, o React Router não rola sozinho. O elemento pode ainda não
    // existir no primeiro paint (imagens/seções montando), então tentamos no
    // frame seguinte e desistimos indo ao topo se o alvo não aparecer. A
    // rolagem até ele passa pelo Lenis, que substitui a que estiver em curso.
    const id = decodeURIComponent(hash.slice(1));
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frames = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        rolarAteElemento(el, !semMovimento);
        return;
      }
      if (frames++ < 30) raf = requestAnimationFrame(tryScroll);
      else irAoTopoJa();
    };

    let raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};
