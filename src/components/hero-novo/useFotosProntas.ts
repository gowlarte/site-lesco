import { useEffect, useState } from "react";
import { srcSetDe } from "@/lib/imagem";

/**
 * `true` quando TODAS as fotos do hero já estão na memória do navegador — e
 * as fontes também.
 *
 * POR QUE ESPERAR TUDO
 *
 * O hero novo troca de tela acompanhando o dedo. Uma foto que ainda está
 * chegando aparece como um retângulo vazio no meio do gesto, e o gesto é a
 * coisa toda. O pedido foi explícito: nada entra antes de tudo estar pronto.
 *
 * O preço é honesto e fica registrado: são dez fotos de tela cheia, e numa
 * rede ruim isso é um símbolo parado por vários segundos. Por isso existe o
 * TETO — passado ele a página entra de qualquer jeito, porque uma rede que
 * não responde não pode deixar a pessoa olhando para um logo para sempre.
 *
 * COMO NÃO BAIXAR A FOTO DUAS VEZES
 *
 * O `<img>` do hero escolhe a variante pelo `srcset`/`sizes`. Um preload que
 * só conhecesse o `src` puxaria o original de 2200px enquanto o `<img>` puxa
 * a de 640 — duas fotos no lugar de uma. Por isso a `Image()` daqui recebe o
 * MESMO `srcset` e o MESMO `sizes`: o navegador faz a mesma conta nos dois
 * lados e converge no mesmo arquivo, que então já está em cache quando o
 * `<img>` pede.
 */

/** Teto de paciência com a rede, em ms. Depois dele a página entra assim mesmo. */
const TETO_MS = 12000;

export function useFotosProntas(fotos: readonly string[], sizes: string): boolean {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let vivo = true;

    const esperarFoto = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        const srcSet = srcSetDe(src);
        // Ordem importa: `sizes` e `srcset` antes do `src`, senão o navegador
        // pode começar a buscar o original antes de ver a escada.
        if (srcSet) {
          img.sizes = sizes;
          img.srcset = srcSet;
        }
        img.src = src;
        // Já em cache: `complete` vem `true` sem disparar `load`.
        if (img.complete) {
          resolve();
          return;
        }
        // Um erro também libera. Foto que não existe não é motivo para a
        // página inteira ficar presa.
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });

    // A capa é uma composição tipográfica; se a PP Neue Machina chegar depois
    // do loader sair, a frase inteira se redesenha na cara de quem entrou.
    const fontes: Promise<unknown> = document.fonts
      ? document.fonts.ready
      : Promise.resolve();

    const teto = window.setTimeout(() => {
      if (vivo) setPronto(true);
    }, TETO_MS);

    void Promise.all([...fotos.map(esperarFoto), fontes]).then(() => {
      if (vivo) setPronto(true);
    });

    return () => {
      vivo = false;
      window.clearTimeout(teto);
    };
  }, [fotos, sizes]);

  return pronto;
}
