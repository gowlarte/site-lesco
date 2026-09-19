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
  // Os efeitos dos filhos rodam ANTES do efeito do App que chama esta função,
  // então quem assinou scroll já está pendurado no listener de reserva. Troca
  // a fonte para o rAF do Lenis agora que ele existe.
  religarFonteDeScroll();

  return () => {
    lenis.destroy();
    instancia = null;
    religarFonteDeScroll();
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
 * Ponto único de assinatura de scroll do site.
 *
 * Antes cada módulo pendurava o seu `window.addEventListener("scroll")`: o
 * cabeçalho, o hook do hero, a galeria em marquee e o canvas da madeira
 * ecológica. Quatro listeners disputando os mesmos quadros, cada um lendo
 * `window.scrollY` por conta própria.
 *
 * Agora é um só, e quando o Lenis está ligado nem existe listener de DOM: o
 * aviso vem do rAF dele, que é exatamente o quadro em que a página foi
 * redesenhada. É a posição certa para ler, e não uma leitura a mais.
 *
 * Sem Lenis (quem pediu menos movimento, ou antes de `iniciarScrollSuave`),
 * cai num listener passivo único, limitado a um aviso por quadro.
 *
 * `src/components/home/palco.ts` continua com o listener próprio dele de
 * propósito: é o motor do hero e dos projetos da home, calibrado, e não entra
 * em refatoração de encanamento.
 */
const assinantes = new Set<() => void>();
let desligarFonte: (() => void) | null = null;

function ligarFonte() {
  if (desligarFonte) return;
  const avisar = () => assinantes.forEach((fn) => fn());

  if (instancia) {
    desligarFonte = instancia.on("scroll", avisar);
    return;
  }

  let agendado = false;
  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      avisar();
    });
  };
  window.addEventListener("scroll", aoRolar, { passive: true });
  desligarFonte = () => window.removeEventListener("scroll", aoRolar);
}

/** Troca a fonte de aviso (Lenis <-> listener de reserva) sem perder assinante. */
function religarFonteDeScroll() {
  if (!desligarFonte) return; // ninguém assinando: nada a religar
  desligarFonte();
  desligarFonte = null;
  if (assinantes.size > 0) ligarFonte();
}

export function assinarScroll(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  assinantes.add(callback);
  ligarFonte();
  return () => {
    assinantes.delete(callback);
    if (assinantes.size === 0) {
      desligarFonte?.();
      desligarFonte = null;
    }
  };
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
