import { useCallback, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { travarScrollSuave } from "@/lib/scroll-suave";
import { t } from "@/i18n/t";

/**
 * Visor de tela cheia para as fotos de um projeto.
 *
 * "Em alta" aqui é a foto como ela veio: na grade ela aparece recortada em 4:3
 * por `object-cover` e desenhada com ~400px de largura, enquanto o arquivo tem
 * 1500–1920px. O lightbox mostra o mesmo arquivo inteiro, sem corte
 * (`object-contain`) — não há segunda versão para baixar, então abrir é
 * instantâneo: o navegador já tem a imagem em cache da grade.
 *
 * Construído direto sobre o primitivo do Radix, e não sobre components/ui/dialog,
 * porque aquele wrapper é um modal de conteúdo (largura de leitura, fundo claro,
 * moldura) e aqui o que se quer é o contrário: tela cheia e fundo fora do caminho.
 */

interface Props {
  imagens: string[];
  /** Índice aberto. `null` mantém o visor fechado. */
  indice: number | null;
  /** Recebe o novo índice, ou `null` ao fechar. */
  onIndice: (i: number | null) => void;
  /** Texto alternativo de cada foto, pelo índice. */
  legenda: (i: number) => string;
}

/** Distância mínima, em px, para um arrasto contar como troca de foto. */
const ARRASTO_MINIMO = 40;

export const Lightbox = ({ imagens, indice, onIndice, legenda }: Props) => {
  const aberto = indice !== null;
  const total = imagens.length;
  const toqueXRef = useRef<number | null>(null);

  const andar = useCallback(
    (passo: number) => {
      if (indice === null || total < 2) return;
      onIndice((indice + passo + total) % total);
    },
    [indice, onIndice, total],
  );

  // O Lenis escuta a roda na janela inteira: sem travar, a página correria
  // atrás do visor e o leitor voltaria noutro ponto ao fechar.
  useEffect(() => {
    if (!aberto) return;
    travarScrollSuave(true);
    return () => travarScrollSuave(false);
  }, [aberto]);

  // Setas do teclado. O Esc já é do Radix.
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); andar(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); andar(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto, andar]);

  // Aquece a foto vizinha: quem abre o visor quase sempre segue para a próxima,
  // e a da grade pode ainda não ter passado pelo `loading="lazy"`.
  useEffect(() => {
    if (indice === null || total < 2) return;
    for (const passo of [1, -1]) {
      const img = new Image();
      img.src = imagens[(indice + passo + total) % total];
    }
  }, [indice, imagens, total]);

  if (!total) return null;

  return (
    <Dialog.Root open={aberto} onOpenChange={(o) => !o && onIndice(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[80] flex items-center justify-center focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          onTouchStart={(e) => { toqueXRef.current = e.touches[0]?.clientX ?? null; }}
          onTouchEnd={(e) => {
            const inicio = toqueXRef.current;
            toqueXRef.current = null;
            if (inicio === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? inicio) - inicio;
            if (Math.abs(dx) >= ARRASTO_MINIMO) andar(dx < 0 ? 1 : -1);
          }}
        >
          <Dialog.Title className="sr-only">{legenda(indice ?? 0)}</Dialog.Title>

          {/* O clique no vazio fecha. Fica atrás da foto e dos controles, que
              param a propagação por serem elementos próprios em cima dele. */}
          <Dialog.Close
            aria-label={t("Fechar")}
            tabIndex={-1}
            className="absolute inset-0 cursor-zoom-out"
          />

          <img
            key={indice}
            src={imagens[indice ?? 0]}
            alt={legenda(indice ?? 0)}
            decoding="async"
            className="relative max-h-[86vh] max-w-[92vw] object-contain select-none animate-fade-in"
          />

          <Dialog.Close
            aria-label={t("Fechar")}
            className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X size={22} />
          </Dialog.Close>

          {total > 1 && (
            <>
              <button
                type="button"
                aria-label={t("Imagem anterior")}
                onClick={() => andar(-1)}
                className="absolute left-2 md:left-6 p-2 md:p-3 rounded-full bg-black/40 text-white/80 hover:bg-black/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                aria-label={t("Próxima imagem")}
                onClick={() => andar(1)}
                className="absolute right-2 md:right-6 p-2 md:p-3 rounded-full bg-black/40 text-white/80 hover:bg-black/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ChevronRight size={28} />
              </button>

              <p className="absolute bottom-5 md:bottom-7 font-mono text-[12px] tracking-[0.1em] text-white/60 tabular-nums">
                {(indice ?? 0) + 1} / {total}
              </p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
