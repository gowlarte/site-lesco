import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Scroll interpolado (Lenis) para o site inteiro.
 *
 * Por que uma lib e não só CSS: a home tem dois palcos fixos cujo conteúdo é
 * desenhado a partir da posição de scroll (parallax, corte entre telas, faixa
 * horizontal). Com o scroll nativo a roda do mouse entrega saltos de ~100px, e
 * cada salto vira um pulo visível nesses palcos. O Lenis troca o salto por uma
 * interpolação quadro a quadro — é daí que vem a fluidez.
 *
 * Ele continua rolando o documento de verdade: `window.scrollY` e o evento
 * `scroll` seguem funcionando, então o resto do código não muda.
 *
 * Toque fica no scroll nativo de propósito (`syncTouch` desligado, que é o
 * padrão): interpolar o dedo no celular atrapalha mais do que ajuda.
 */

let instancia: Lenis | null = null;

/** Liga o scroll suave. Devolve a função de desligar. */
export function iniciarScrollSuave(): () => void {
  if (typeof window === "undefined") return () => {};
  // Quem pediu menos movimento fica com o scroll nativo, sem inércia.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const lenis = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    // `lerp` menor = mais peso/inércia. 0.09 dá o deslize sem parecer lento.
    lerp: 0.09,
    wheelMultiplier: 1,
  });
  instancia = lenis;

  return () => {
    lenis.destroy();
    instancia = null;
  };
}

/**
 * Congela o scroll interpolado enquanto um overlay de tela cheia está aberto.
 *
 * O Lenis escuta a roda do mouse na janela inteira. Sem isso, rolar por cima
 * do lightbox faria a página correr atrás dele — e ao fechar o overlay o leitor
 * cairia num ponto diferente de onde estava. O bloqueio de scroll do Radix
 * sozinho não resolve, porque ele age no `body` e o Lenis conduz a rolagem por
 * conta própria.
 */
export function travarScrollSuave(travado: boolean) {
  if (!instancia) return;
  if (travado) instancia.stop();
  else instancia.start();
}

/**
 * Rola até uma posição do documento.
 *
 * Quando o Lenis está ligado é ele quem precisa conduzir: um
 * `window.scrollTo({behavior:"smooth"})` nativo brigaria com a interpolação e
 * as duas animações se anulariam no meio do caminho.
 */
export function rolarPara(top: number, suave: boolean) {
  if (instancia) {
    instancia.scrollTo(top, suave ? { duration: 1.1 } : { immediate: true });
    return;
  }
  window.scrollTo({ top, behavior: suave ? "smooth" : "auto" });
}
