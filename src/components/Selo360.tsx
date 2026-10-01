import { cn } from "@/lib/utils";
import { t } from "@/i18n/t";

/**
 * O selo de "tem visita 360" na capa de uma obra.
 *
 * Vai por cima da foto, nos cards do portfólio e das páginas de produto. É a
 * única pista de que aquele card leva a algo diferente dos outros: sem ele, a
 * capa de um tour é indistinguível de uma fotografia parada.
 *
 * Desenho: a elipse é a órbita vista de lado e a seta fecha a volta. Um ícone
 * de câmera ou de olho diria "imagem", que todo card já é; o que precisa ser
 * dito é que dá para GIRAR. O número vem junto porque a elipse sozinha, a 16
 * pixels, é só um traço.
 *
 * O contraste não depende da foto por baixo: fundo preto a 60% com desfoque,
 * texto branco. Medido contra a pior capa do acervo, que é a do JHA — teto de
 * madeira clara ao sol.
 */
export const Selo360 = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "pointer-events-none inline-flex items-center gap-1.5 rounded-full",
      "bg-black/60 backdrop-blur-[2px] pl-2 pr-2.5 py-1 text-white",
      "font-display text-[11px] leading-none tracking-[0.08em]",
      className,
    )}
  >
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <ellipse cx="12" cy="12" rx="10" ry="5.4" />
      <path d="M6.6 7.9 3.4 6.6l1 3.3" />
    </svg>
    <span aria-hidden="true">360°</span>
    <span className="sr-only">{t("Esta obra tem visita 360°")}</span>
  </span>
);
