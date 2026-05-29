import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { parseGIF, decompressFrames, type ParsedFrame } from "gifuct-js";
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

/**
 * Canvas que renderiza frames extraídos de um GIF via gifuct-js.
 * O frame é controlado externamente via ref.setFrame() — sem React state
 * no caminho do scroll para garantir 60fps.
 */
export const ProdutoCanvas = forwardRef<ProdutoCanvasHandle, Props>(
  ({ onReady, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<ImageData[]>([]);
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

      const load = async () => {
        try {
          const res = await fetch(produtoGif);
          const buf = await res.arrayBuffer();
          const gif = parseGIF(buf);
          const rawFrames = decompressFrames(gif, true) as ParsedFrame[];
          if (cancelled || !rawFrames.length) return;

          const { width, height } = gif.lsd;
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.width = width;
          canvas.height = height;

          // Compose frames considering disposal — render onto an offscreen
          // canvas progressively, then snapshot ImageData per frame.
          const off = document.createElement("canvas");
          off.width = width;
          off.height = height;
          const offCtx = off.getContext("2d");
          if (!offCtx) return;

          const tmp = document.createElement("canvas");
          const tmpCtx = tmp.getContext("2d");
          if (!tmpCtx) return;

          const composed: ImageData[] = [];
          let prevSnapshot: ImageData | null = null;

          for (const frame of rawFrames) {
            const { dims, patch, disposalType } = frame;
            tmp.width = dims.width;
            tmp.height = dims.height;
            const patchData = new ImageData(
              new Uint8ClampedArray(patch),
              dims.width,
              dims.height,
            );
            tmpCtx.putImageData(patchData, 0, 0);

            if (disposalType === 3) {
              prevSnapshot = offCtx.getImageData(0, 0, width, height);
            }

            offCtx.drawImage(tmp, dims.left, dims.top);
            composed.push(offCtx.getImageData(0, 0, width, height));

            if (disposalType === 2) {
              offCtx.clearRect(dims.left, dims.top, dims.width, dims.height);
            } else if (disposalType === 3 && prevSnapshot) {
              offCtx.putImageData(prevSnapshot, 0, 0);
            }
          }

          if (cancelled) return;
          framesRef.current = composed;

          // Render frame 0 immediately
          const ctx = canvas.getContext("2d");
          if (ctx && composed[0]) {
            ctx.putImageData(composed[0], 0, 0);
            lastFrameRef.current = 0;
          }
          setIsReady(true);
          onReadyRef.current?.(composed.length);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("[ProdutoCanvas] failed to load GIF", err);
        }
      };

      // Defer the (heavy) GIF download + frame decode until the canvas is
      // near the viewport, so it never blocks initial page load / TBT.
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
          { rootMargin: "300px" },
        );
        observer.observe(canvas);
      } else {
        load();
      }

      return () => {
        cancelled = true;
        observer?.disconnect();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const draw = () => {
      rafRef.current = null;
      const frames = framesRef.current;
      if (!frames.length) return;
      const idx = Math.max(0, Math.min(frames.length - 1, pendingFrameRef.current));
      if (idx === lastFrameRef.current) return;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.putImageData(frames[idx], 0, 0);
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
