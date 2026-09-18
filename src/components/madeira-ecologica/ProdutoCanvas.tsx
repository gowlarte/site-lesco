import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { parseGIF, decompressFrame } from "gifuct-js";
import produtoGif from "@/assets/madeira-ecologica/produto.gif";

export interface ProdutoCanvasHandle {
  setFrame: (index: number) => void;
  totalFrames: number;
  isReady: boolean;
}

interface Props {
  onReady?: (totalFrames: number) => void;
  className?: string;
}

/** Quadro já composto, pronto para `drawImage`. */
type Quadro = ImageBitmap | HTMLCanvasElement;

/**
 * `gif.frames` mistura blocos de aplicação com quadros de imagem, e o gifuct
 * não exporta o tipo do quadro cru — pegamos ele pela assinatura da função.
 */
type QuadroCru = Parameters<typeof decompressFrame>[0];

/**
 * Devolve o main thread ao navegador entre um quadro e o próximo.
 *
 * É o que impede a decodificação de virar UMA tarefa longa. O GIF tem 68
 * quadros de 800×800: decodificar tudo de uma vez trava o navegador por ~1s, e
 * como o scroll do site é interpolado quadro a quadro (Lenis, ver
 * src/lib/scroll-suave.ts) essa pausa aparece como um tranco violento.
 */
function cederAoNavegador(): Promise<void> {
  const agendador = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
  if (agendador?.yield) return agendador.yield();
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Cópia do estado atual do canvas de composição.
 *
 * `createImageBitmap` é assíncrono e devolve um quadro que vive fora do heap do
 * JS, que `drawImage` pinta em ~0,01ms. O caminho anterior guardava um
 * `ImageData` por quadro (166MB parados na memória) e pintava com
 * `putImageData`, que copia 2,5MB pela CPU a cada passo do scroll.
 */
function copiar(origem: HTMLCanvasElement, width: number, height: number): Promise<Quadro> {
  if (typeof createImageBitmap === "function") return createImageBitmap(origem);
  const copia = document.createElement("canvas");
  copia.width = width;
  copia.height = height;
  copia.getContext("2d")?.drawImage(origem, 0, 0);
  return Promise.resolve(copia);
}

/**
 * Canvas que renderiza frames extraídos de um GIF via gifuct-js.
 * O frame é controlado externamente via ref.setFrame() — sem React state
 * no caminho do scroll para garantir 60fps.
 */
export const ProdutoCanvas = forwardRef<ProdutoCanvasHandle, Props>(
  ({ onReady, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<Quadro[]>([]);
    const lastFrameRef = useRef<number>(-1);
    const pendingFrameRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);
    const [isReady, setIsReady] = useState(false);
    const onReadyRef = useRef(onReady);
    useEffect(() => {
      onReadyRef.current = onReady;
    }, [onReady]);

    useEffect(() => {
      let cancelled = false;

      // Os quadros entram aqui um a um. `draw` já desenha o que existe, então a
      // decodificação pode ser fatiada sem deixar a seção em branco.
      const quadros: Quadro[] = [];
      framesRef.current = quadros;

      const load = async () => {
        try {
          const res = await fetch(produtoGif);
          const buf = await res.arrayBuffer();
          if (cancelled) return;

          const gif = parseGIF(buf);
          const crus = gif.frames.filter((f): f is QuadroCru => "image" in f);
          if (!crus.length) return;

          const { width, height } = gif.lsd;
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.width = width;
          canvas.height = height;

          // Composição progressiva. Todos os quadros deste GIF são disposal=1
          // (nada é apagado entre um e outro), então basta empilhar cada
          // retalho sobre o anterior e tirar uma cópia do resultado.
          const off = document.createElement("canvas");
          off.width = width;
          off.height = height;
          const offCtx = off.getContext("2d");
          if (!offCtx) return;

          const tmp = document.createElement("canvas");
          const tmpCtx = tmp.getContext("2d");
          if (!tmpCtx) return;

          for (const cru of crus) {
            const { dims, patch } = decompressFrame(cru, gif.gct, true);

            // 27 dos 68 quadros trazem um retalho 1×1 transparente — é o
            // codificador dizendo "nada mudou aqui". Repetir a referência do
            // quadro anterior poupa 27 cópias de 800×800 na memória.
            const semMudanca = dims.width <= 1 && dims.height <= 1 && patch[3] === 0;
            if (semMudanca && quadros.length) {
              quadros.push(quadros[quadros.length - 1]);
              continue;
            }

            tmp.width = dims.width;
            tmp.height = dims.height;
            tmpCtx.putImageData(
              new ImageData(new Uint8ClampedArray(patch), dims.width, dims.height),
              0,
              0,
            );
            offCtx.drawImage(tmp, dims.left, dims.top);

            const quadro = await copiar(off, width, height);
            if (cancelled) {
              if (quadro instanceof ImageBitmap) quadro.close();
              return;
            }
            quadros.push(quadro);

            // Primeiro quadro na tela assim que ele existe: a seção nunca
            // aparece vazia enquanto o resto decodifica.
            if (quadros.length === 1) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(quadro, 0, 0);
                lastFrameRef.current = 0;
              }
            }

            await cederAoNavegador();
            if (cancelled) return;
          }

          setIsReady(true);
          onReadyRef.current?.(quadros.length);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("[ProdutoCanvas] failed to load GIF", err);
        }
      };

      // Defer the (heavy) GIF download + frame decode until the canvas is
      // near the viewport, so it never blocks initial page load / TBT.
      //
      // A margem é larga de propósito: a decodificação leva ~0,6s repartida em
      // fatias, e começar só a 300px daria o azar de ela cair bem no momento em
      // que a seção de projetos solta o scroll e esta prende.
      const canvas = canvasRef.current;
      let observer: IntersectionObserver | null = null;
      if (canvas && typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              observer?.disconnect();
              observer = null;
              load();
            }
          },
          { rootMargin: "1200px 0px" },
        );
        observer.observe(canvas);
      } else {
        load();
      }

      return () => {
        cancelled = true;
        observer?.disconnect();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        for (const quadro of quadros) {
          if (quadro instanceof ImageBitmap) quadro.close();
        }
        framesRef.current = [];
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const draw = () => {
      rafRef.current = null;
      const frames = framesRef.current;
      if (!frames.length) return;
      const idx = Math.max(0, Math.min(frames.length - 1, pendingFrameRef.current));
      if (idx === lastFrameRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      // `drawImage` desenha POR CIMA e o quadro tem áreas transparentes, então
      // a tela precisa ser limpa antes — `putImageData` substituía os pixels.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frames[idx], 0, 0);
      lastFrameRef.current = idx;
    };

    useImperativeHandle(
      ref,
      () => ({
        setFrame: (i: number) => {
          pendingFrameRef.current = i;
          if (rafRef.current == null) {
            rafRef.current = requestAnimationFrame(draw);
          }
        },
        get totalFrames() {
          return framesRef.current.length;
        },
        get isReady() {
          return isReady;
        },
      }),
      [isReady],
    );

    return (
      <canvas
        ref={canvasRef}
        className={className}
        aria-label="Animação do produto madeira ecológica"
      />
    );
  },
);

ProdutoCanvas.displayName = "ProdutoCanvas";
