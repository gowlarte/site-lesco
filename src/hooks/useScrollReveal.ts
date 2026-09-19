import { useEffect, useRef, useState } from "react";

/**
 * Marca `true` quando o bloco alcança a janela, para o fade de entrada.
 *
 * A área de observação é deliberadamente torta, e as duas margens resolvem um
 * problema cada:
 *
 *   `-15%` embaixo   sobe a borda inferior da área, de modo que o bloco só
 *                    conta quando o topo dele passa de 85% da altura da tela.
 *                    É o mesmo instante que o `threshold: 0.15` da versão
 *                    anterior dava para um bloco de altura normal, mas sem
 *                    depender da altura: bloco mais alto que ~6 telas nunca
 *                    conseguia mostrar 15% de si e ficava presol.
 *
 *   `100000px` em    estende a área muito acima da tela, então qualquer bloco
 *   cima             que já ficou para trás continua dentro dela. Sem isso,
 *                    quem chega no meio da página sem passar pelo caminho (F5
 *                    com posição restaurada, link com âncora, voltar do
 *                    histórico) pulava o bloco de um quadro para o outro: ele
 *                    ia de abaixo da tela para acima dela sem nunca
 *                    intersectar, o observador não disparava, e o conteúdo
 *                    ficava em opacidade 0 para sempre. Aparecia vazio quando
 *                    a pessoa rolava de volta.
 */
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(el);
      },
      { threshold: 0, rootMargin: "100000px 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
