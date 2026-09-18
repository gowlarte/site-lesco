import { useCallback, useEffect, useState } from "react";
import { rolarPara } from "@/lib/scroll-suave";

/**
 * Mecânica compartilhada pelas duas seções de "palco fixo" da home
 * (HeroSolucoes e ProjetosHorizontal).
 *
 * O padrão é sempre o mesmo: um TRILHO alto o bastante para N telas e, dentro
 * dele, um PALCO `sticky` de uma tela. Enquanto o trilho passa, o palco fica
 * parado e o scroll vira uma posição contínua entre 0 e N-1. O que cada seção
 * faz com essa posição é que muda — uma funde camadas no lugar, a outra corre
 * uma faixa horizontal.
 */

export const limita = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Curva suave (smoothstep): 0 antes de `a`, 1 depois de `b`, S no meio. */
export function suave(x: number, a: number, b: number) {
  const p = limita((x - a) / (b - a), 0, 1);
  return p * p * (3 - 2 * p);
}

export const numero = (i: number) => String(i).padStart(2, "0");

export interface MedidaTrilho {
  /** Scroll em que o palco começa a grudar. */
  inicio: number;
  /** Quanto scroll o palco tem antes de soltar. */
  curso: number;
  /** Posição contínua entre telas: 0 = primeira, total-1 = última. */
  pos: number;
}

function medirTrilho(
  trilho: HTMLElement | null,
  palco: HTMLElement | null,
  topo: number,
  total: number,
): MedidaTrilho | null {
  if (!trilho || !palco) return null;
  const curso = trilho.offsetHeight - palco.offsetHeight;
  if (curso <= 0) return null;
  const inicio = trilho.getBoundingClientRect().top + window.scrollY - topo;
  const pos = limita((window.scrollY - inicio) / curso, 0, 1) * (total - 1);
  return { inicio, curso, pos };
}

export type Medidor = () => MedidaTrilho | null;

/** Rola até a tela `i` do trilho. */
export function irParaTela(medir: Medidor, i: number, total: number, suavizar: boolean) {
  const m = medir();
  if (!m) return;
  const alvo = limita(i, 0, total - 1) / (total - 1);
  rolarPara(m.inicio + alvo * m.curso, suavizar);
}

export function useSemMovimento() {
  const [semMovimento, setSemMovimento] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSemMovimento(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return semMovimento;
}

/**
 * Loop de scroll. `desenhar` escreve estilo direto no DOM em vez de passar por
 * estado: são várias camadas por quadro, e um setState a 60fps re-renderizaria
 * a seção inteira. Precisa ser estável (useCallback).
 */
export function useLoopDeScroll(desenhar: () => void) {
  useEffect(() => {
    let raf = 0;
    let pendente = false;
    const quadro = () => {
      pendente = false;
      desenhar();
    };
    const aoRolar = () => {
      if (pendente) return;
      pendente = true;
      raf = requestAnimationFrame(quadro);
    };
    desenhar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [desenhar]);
}

/*
 * NÃO existe encaixe aqui, e é de propósito.
 *
 * A primeira versão acomodava na tela mais próxima quando o scroll parava
 * (Math.round da posição). Dava exatamente os dois defeitos relatados: uma
 * rolada curta era puxada de volta (parecia reset) e uma rolada longa era
 * puxada adiante, pulando uma tela. Qualquer variante de arredondamento
 * reproduz um dos dois, porque o que ela faz é discordar de onde a pessoa
 * parou.
 *
 * O floema, que é a referência, não encaixa em posição nenhuma — conferido:
 * o scroll fica exatamente onde foi solto, inclusive no meio da transição.
 * Ele pode se dar a esse luxo porque a troca é por corte reto: em qualquer
 * posição de repouso a composição lê como intencional. O crossfade de
 * opacidade que existia aqui antes é que ficava quebrado no meio do caminho.
 *
 * Então: sem encaixe, transição por clip-path, e a fluidez vem do Lenis.
 */

/**
 * Tira do caminho do teclado, do mouse e dos leitores de tela tudo o que não é
 * a tela ativa. As telas ficam todas no DOM o tempo todo (SEO); sem isto o Tab
 * percorreria todos os CTAs invisíveis e um clique poderia cair num link que
 * não está à vista.
 */
export function useSomenteAtivoInterativo(
  blocos: React.MutableRefObject<Array<HTMLElement | null>>,
  ativo: number,
) {
  useEffect(() => {
    blocos.current.forEach((el, i) => {
      if (!el) return;
      (el as HTMLElement & { inert: boolean }).inert = i !== ativo;
      el.style.pointerEvents = i === ativo ? "" : "none";
    });
  }, [blocos, ativo]);
}

/** Dispara um evento do módulo no dataLayer (GTM/GA4). */
export function pushEventoHome(
  event: string,
  slideId: string,
  slideTitle: string,
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, slide_id: slideId, slide_title: slideTitle });
}

/** Memoiza um medidor amarrado aos refs de uma seção. */
export function useMedidor(
  trilhoRef: React.RefObject<HTMLElement>,
  palcoRef: React.RefObject<HTMLElement>,
  topo: number,
  total: number,
): Medidor {
  return useCallback(
    () => medirTrilho(trilhoRef.current, palcoRef.current, topo, total),
    [trilhoRef, palcoRef, topo, total],
  );
}
