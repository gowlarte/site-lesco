import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Teto de quanto a página pode ficar escondida atrás do overlay de navegação.
 *
 * Eram 2000ms, e o que mais importa é que eles disparavam SEMPRE (ver o
 * comentário sobre as imagens pendentes abaixo). Agora é o que o nome diz: o
 * limite de paciência com uma foto lenta. Passou disso, o conteúdo entra e a
 * imagem aparece quando chegar — que é melhor do que tela preta.
 */
const TETO_MS = 600;

export function usePageAssets(containerRef: React.RefObject<HTMLDivElement | null>) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isHome = location.pathname === "/";
  /** O overlay é de TRANSIÇÃO: na primeira pintura não há de onde transitar. */
  const jaNavegou = useRef(false);

  useEffect(() => {
    if (isHome) {
      setIsLoading(false);
      jaNavegou.current = true;
      return;
    }

    // Entrada direta numa rota (link de anúncio, F5, aba nova): o HTML
    // pré-renderizado já está na tela com o texto todo. Cobri-lo para esperar
    // uma foto seria trocar conteúdo visível por preto.
    if (!jaNavegou.current) {
      jaNavegou.current = true;
      setIsLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    /*
     * Só as imagens da PRIMEIRA TELA, e só as que já estão baixando.
     *
     * A versão anterior esperava `img.complete` de TODAS as imagens do
     * container. As que têm `loading="lazy"` e nascem abaixo da dobra não
     * começam a baixar enquanto ninguém rolar até elas, então `complete`
     * nunca virava `true`, o `Promise.all` nunca resolvia, e o timeout de
     * segurança deixava de ser exceção para virar o caminho normal: 2s de
     * tela preta em toda navegação interna, inclusive com tudo em cache.
     *
     * A posição é medida contra o DOCUMENTO, não contra a janela. O
     * ScrollToTop é um filho, e efeito de filho roda antes do do pai, então
     * quando chegamos aqui a página já está no topo — mas a conta contra o
     * documento continua certa no caso com âncora, em que ela não está.
     */
    const pendentes = Array.from(container.querySelectorAll("img")).filter(
      (img) =>
        !img.complete &&
        img.loading !== "lazy" &&
        img.getBoundingClientRect().top + window.scrollY < window.innerHeight,
    );

    // Nada a esperar — e é o caso comum. A página entra direto, sem piscar.
    if (pendentes.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let cancelado = false;
    const liberar = () => {
      if (!cancelado) setIsLoading(false);
    };

    void Promise.all(
      pendentes.map(
        (img) =>
          new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
    ).then(liberar);

    const teto = setTimeout(liberar, TETO_MS);

    return () => {
      cancelado = true;
      clearTimeout(teto);
    };
  }, [location.pathname, isHome, containerRef]);

  return { isLoading: isHome ? false : isLoading };
}
