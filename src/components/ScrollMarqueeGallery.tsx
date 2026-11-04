import { useEffect, useRef } from "react";
import { assinarScroll } from "@/lib/scroll-suave";
import { responsiva, SIZES_GALERIA } from "@/lib/imagem";

import img01 from "@/assets/gallery/img-01.webp";
import img02 from "@/assets/gallery/img-02.webp";
import img03 from "@/assets/gallery/img-03.webp";
import img04 from "@/assets/gallery/img-04.webp";
import img05 from "@/assets/gallery/img-05.webp";
import img06 from "@/assets/gallery/img-06.webp";
import img07 from "@/assets/gallery/img-07.webp";
import img08 from "@/assets/gallery/img-08.webp";
import img09 from "@/assets/gallery/img-09.webp";

const fotos = [img01, img02, img03, img04, img05, img06, img07, img08, img09];

/**
 * Quantas voltas da sequência ficam no DOM.
 *
 * A fita nunca sai do intervalo [-umaVolta, 0], então o que precisa estar
 * desenhado é uma volta mais a largura da tela. Com COPIAS cópias há
 * `COPIAS * umaVolta` de conteúdo, e a condição de não abrir buraco é
 *
 *     (COPIAS - 1) * umaVolta >= largura da tela
 *
 * Uma volta mede 2106px no celular e 3258px no desktop (9 fotos de 224 ou
 * 352px, mais o vão de 10px), então duas cópias já cobrem qualquer tela até
 * 3258px. A terceira é para o ultrawide, e custa só nós de DOM: as fotos são
 * `lazy` e as três cópias repetem os MESMOS 9 arquivos, então ela não faz
 * baixar um byte a mais.
 */
const COPIAS = 3;

const linha1 = Array.from({ length: COPIAS }, () => fotos).flat();
const linha2 = Array.from({ length: COPIAS }, () => fotos.slice().reverse()).flat();

/** Pixels que a fita anda por pixel de rolagem. */
const VELOCIDADE = 1.5;
const VAO = 10;

export const ScrollMarqueeGallery = () => {
  const fita1 = useRef<HTMLDivElement>(null);
  const fita2 = useRef<HTMLDivElement>(null);

  /*
   * A VOLTA É MEDIDA, NÃO CHUTADA.
   *
   * Antes a volta era a constante `IMG_W = 340`, descrita no código como
   * "largura aproximada por imagem". Ela não corresponde a largura nenhuma: a
   * foto tem altura fixa e proporção 16/10, então mede 224px no celular, 288
   * no sm e 352 no lg. O módulo fechava em 9 x 350 = 3150px enquanto o desenho
   * se repetia a cada 2106, 2682 ou 3258 — e a cada volta a fita saltava
   * 1044px no celular (4,5 fotos), 468 no sm e 108 no desktop.
   *
   * Por isso só o desktop parecia quase certo: lá o erro é de um terço de foto.
   * No celular era quase meia dúzia delas trocando de lugar de uma vez.
   *
   * Medir resolve de vez, em qualquer breakpoint e qualquer vão: a distância
   * entre a foto 0 e a foto 9 É uma volta, por definição. `offsetLeft` serve
   * porque é valor de LAYOUT — não enxerga o `translateX` que escrevemos na
   * própria fita, e não depende de a foto ter carregado: a caixa vem de
   * `h-[...]` com `aspect-[16/10]`, não dos pixels do arquivo.
   */
  useEffect(() => {
    const a = fita1.current;
    const b = fita2.current;
    if (!a || !b) return;

    // Quem pediu menos movimento fica com a faixa parada. Ela é decoração: o
    // que ela diz, ela já diz sem andar.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let umaVolta = 0;

    const medir = () => {
      const itens = a.children;
      umaVolta =
        itens.length > fotos.length
          ? (itens[fotos.length] as HTMLElement).offsetLeft -
            (itens[0] as HTMLElement).offsetLeft
          : 0;
    };

    /*
     * A posição vem do scrollY ABSOLUTO, não de um acumulador de deltas.
     *
     * O código anterior guardava o último scrollY e somava a diferença quadro a
     * quadro. Isso acumula: um quadro perdido, um salto de âncora ou a
     * restauração de posição ao voltar para a página entravam no acumulador e
     * nunca mais saíam. Com a conta refeita do zero a cada quadro não há o que
     * desandar — a mesma posição de rolagem devolve sempre a mesma fita.
     */
    const resto = (v: number, m: number) => ((v % m) + m) % m;

    const posicionar = () => {
      if (umaVolta <= 0) return;
      const d = resto(window.scrollY * VELOCIDADE, umaVolta);
      // As duas correm em sentidos opostos, ambas dentro de [-umaVolta, 0].
      a.style.transform = `translate3d(${-d}px, 0, 0)`;
      b.style.transform = `translate3d(${d - umaVolta}px, 0, 0)`;
    };

    const aoRedimensionar = () => {
      medir();
      posicionar();
    };

    medir();
    posicionar();

    const desassinar = assinarScroll(posicionar);
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      desassinar();
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  const renderLinha = (imagens: string[], ref: React.RefObject<HTMLDivElement>) => (
    <div className="overflow-hidden">
      <div
        ref={ref}
        className="marquee-fita flex will-change-transform"
        style={{ gap: `${VAO}px` }}
      >
        {imagens.map((src, i) => (
          <img
            key={i}
            src={src}
            {...responsiva(src, SIZES_GALERIA)}
            alt=""
            loading="lazy"
            decoding="async"
            className="marquee-foto h-[140px] sm:h-[180px] lg:h-[220px] aspect-[16/10] object-cover rounded-[10px] shrink-0"
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full overflow-hidden py-8 flex flex-col gap-[10px]">
      {renderLinha(linha1, fita1)}
      {renderLinha(linha2, fita2)}
    </section>
  );
};
