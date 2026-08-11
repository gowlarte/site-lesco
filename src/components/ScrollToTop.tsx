import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Sem âncora: comportamento padrão de ir ao topo a cada navegação.
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Com âncora, o React Router não rola sozinho. O elemento pode ainda não
    // existir no primeiro paint (imagens/seções montando), então tentamos no
    // frame seguinte e desistimos indo ao topo se o alvo não aparecer.
    const id = decodeURIComponent(hash.slice(1));
    let frames = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (frames++ < 30) {
        raf = requestAnimationFrame(tryScroll);
      } else {
        window.scrollTo(0, 0);
      }
    };

    let raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};
