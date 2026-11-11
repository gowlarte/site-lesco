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

/** Rola até a tela `i` do trilho. `duracao` em segundos, só com o Lenis. */
export function irParaTela(
  medir: Medidor,
  i: number,
  total: number,
  suavizar: boolean,
  duracao?: number,
) {
  const m = medir();
  if (!m) return;
  const alvo = limita(i, 0, total - 1) / (total - 1);
  rolarPara(m.inicio + alvo * m.curso, suavizar, duracao);
}

/**
 * UM GESTO, UMA TELA — só no toque.
 *
 * No celular a rolagem é nativa (o Lenis não interpola o dedo), e uma deslizada
 * com força carrega inércia de duas ou três alturas de tela. Num trilho em que
 * cada altura de tela é uma tela do palco, isso pulava slides inteiros.
 *
 * Então, com o palco preso, o dedo deixa de rolar a página: o primeiro
 * `touchmove` do gesto é cancelado, e passado `LIMIAR_GESTO` o palco anda
 * EXATAMENTE uma tela no sentido do gesto, não importa a força. Gesto novo
 * durante a animação conta a partir do destino, então duas deslizadas seguidas
 * dão duas telas, e não uma e meia.
 *
 * Nas pontas o gesto é devolvido ao navegador: para cima na primeira tela (a
 * página está no topo) e para baixo na última — é assim que se sai do módulo.
 *
 * O caminho inverso também precisa de freio: quem vem de baixo com inércia
 * entraria no trilho e o atravessaria de volta. Se uma deslizada nativa
 * terminou FORA do trilho e a inércia dela entra nele, a página para na tela
 * em que entrou. Só depois de uma deslizada, e nunca depois de um toque: o
 * toque na logo rola até o topo de propósito, e não pode ser barrado aqui.
 *
 * A roda do mouse não passa por aqui: lá o Lenis já entrega deslocamento
 * suave e proporcional, e o desktop fica como estava.
 */
const LIMIAR_GESTO = 24;
/** Quanto dura a troca de tela pelo gesto, em segundos. */
const DURACAO_GESTO = 0.75;
/** Por quanto tempo depois de soltar o dedo uma rolagem ainda é inércia. */
const JANELA_INERCIA = 2500;

/**
 * Tira um evento de toque das mãos do Lenis.
 *
 * Com o dedo o Lenis não anima nada (`syncTouch` desligado), mas a cada
 * `touchmove` e `touchend` ele PARA a animação dele que estiver em curso
 * (`animate.stop()`, em `onVirtualScroll`). A troca de tela do gesto é uma
 * animação dele — então o movimento seguinte do mesmo dedo a matava depois de
 * um quadro, e o hero não saía do lugar. `lenisStopPropagation` é a marca que
 * o próprio Lenis confere logo na entrada para ignorar o evento.
 */
function doPalcoSo(e: TouchEvent) {
  (e as TouchEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
}

export function useUmGestoPorTela(
  trilhoRef: React.RefObject<HTMLElement>,
  medir: Medidor,
  total: number,
  suavizar: boolean,
) {
  useEffect(() => {
    let x0 = 0;
    let y0 = 0;
    let dyFinal = 0;
    /** null = ainda não decidido; "nosso" = o palco conduz; "solto" = nativo. */
    let dono: "nosso" | "solto" | null = null;
    let disparou = false;
    let dedo = false;
    /** Tela para onde a última troca está indo, e até quando ela é válida. */
    let alvo = -1;
    let alvoAte = 0;
    let inerciaAte = 0;
    let sentidoInercia = 0;

    const fim = (m: MedidaTrilho) => m.inicio + m.curso;
    const preso = (m: MedidaTrilho) => {
      const y = window.scrollY;
      return y >= m.inicio - 1 && y <= fim(m) + 1;
    };
    const base = (m: MedidaTrilho) =>
      performance.now() < alvoAte && alvo >= 0 ? alvo : Math.round(m.pos);

    const ir = (i: number) => {
      alvo = limita(i, 0, total - 1);
      alvoAte = performance.now() + DURACAO_GESTO * 1000 + 150;
      irParaTela(medir, alvo, total, suavizar, DURACAO_GESTO);
    };

    /** O gesto começou no palco (ou no header, que fica por cima dele)? */
    const doPalco = (alvoToque: EventTarget | null) => {
      if (document.documentElement.dataset.menuAberto === "sim") return false;
      const el = alvoToque as Element | null;
      if (!el || typeof el.closest !== "function") return false;
      return !!trilhoRef.current?.contains(el) || !!el.closest("header");
    };

    const aoTocar = (e: TouchEvent) => {
      dedo = true;
      inerciaAte = 0;
      disparou = false;
      dyFinal = 0;
      const toque = e.touches[0];
      // Gravado mesmo no gesto solto: é dele que sai `dyFinal`, que diz se a
      // soltura foi uma deslizada (e se pode haver inércia a frear).
      if (toque) {
        x0 = toque.clientX;
        y0 = toque.clientY;
      }
      const m = medir();
      if (e.touches.length !== 1 || !toque || !m || !preso(m) || !doPalco(e.target)) {
        dono = "solto";
        return;
      }
      dono = null;
    };

    const aoMover = (e: TouchEvent) => {
      const toque = e.touches[0];
      if (!toque) return;
      dyFinal = y0 - toque.clientY;
      if (dono === "solto") return;
      if (e.touches.length !== 1) {
        dono = "solto";
        return;
      }
      const m = medir();
      if (!m) return;
      // Positivo = o dedo subiu = avançar.
      const dy = y0 - toque.clientY;
      const dx = x0 - toque.clientX;

      if (dono === null) {
        // Decide no PRIMEIRO movimento: depois que o navegador começa a rolar,
        // o touchmove deixa de ser cancelável e já não há como segurar.
        const frente = Math.abs(dy) >= Math.abs(dx) ? dy >= 0 : true;
        const daVez = base(m);
        const naUltima = daVez >= total - 1 && m.pos >= total - 1 - 0.02;
        const naPrimeira = daVez <= 0 && m.pos <= 0.02;
        if ((frente && naUltima) || (!frente && naPrimeira)) {
          dono = "solto";
          return;
        }
        dono = "nosso";
      }

      if (e.cancelable) e.preventDefault();
      doPalcoSo(e);
      if (disparou || Math.abs(dy) < LIMIAR_GESTO || Math.abs(dy) < Math.abs(dx)) return;
      disparou = true;
      ir(base(m) + (dy > 0 ? 1 : -1));
    };

    const aoSoltar = (e: TouchEvent) => {
      if (e.touches.length > 0) return;
      dedo = false;
      const m = medir();
      // A soltura de um gesto do palco também é do palco: é nela que o Lenis
      // mataria a troca que o gesto acabou de começar.
      if (dono === "nosso") doPalcoSo(e);
      if (dono === "nosso" && !disparou && m) {
        // Gesto curto demais para trocar, mas que pode ter deixado o palco
        // fora do lugar se começou no meio de uma animação: assenta.
        if (performance.now() >= alvoAte) ir(Math.round(m.pos));
      } else if (dono === "solto" && m && Math.abs(dyFinal) > LIMIAR_GESTO) {
        const y = window.scrollY;
        if (y > m.inicio + 1 && y < fim(m) - 1) {
          // Uma rolagem nativa (vinda de fora do trilho) deixou o palco no meio
          // de uma troca: leva à tela mais próxima.
          doPalcoSo(e);
          ir(Math.round(m.pos));
        } else if (y > fim(m)) {
          inerciaAte = performance.now() + JANELA_INERCIA;
          sentidoInercia = dyFinal;
        }
      }
      dono = null;
    };

    const aoRolar = () => {
      if (dedo || !inerciaAte) return;
      if (performance.now() > inerciaAte) {
        inerciaAte = 0;
        return;
      }
      const m = medir();
      if (!m || sentidoInercia >= 0) return;
      // Subindo por inércia e já dentro do trilho: para na última tela.
      if (window.scrollY < fim(m) - 1) {
        inerciaAte = 0;
        rolarPara(fim(m), false);
      }
    };

    // Captura, e não bolha: o Lenis escuta os mesmos eventos na janela, na
    // bolha. Na captura este hook roda SEMPRE antes dele — inclusive quando o
    // hero remonta ao voltar para a home, já com o Lenis pendurado antes —, e
    // a marca de `doPalcoSo` chega a tempo.
    window.addEventListener("touchstart", aoTocar, { passive: true, capture: true });
    window.addEventListener("touchmove", aoMover, { passive: false, capture: true });
    window.addEventListener("touchend", aoSoltar, { passive: true, capture: true });
    window.addEventListener("touchcancel", aoSoltar, { passive: true, capture: true });
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("touchstart", aoTocar, { capture: true });
      window.removeEventListener("touchmove", aoMover, { capture: true });
      window.removeEventListener("touchend", aoSoltar, { capture: true });
      window.removeEventListener("touchcancel", aoSoltar, { capture: true });
      window.removeEventListener("scroll", aoRolar);
    };
  }, [trilhoRef, medir, total, suavizar]);
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
