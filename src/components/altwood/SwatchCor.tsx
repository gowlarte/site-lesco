import { cn } from "@/lib/utils";

interface SwatchCorProps {
  nome: string;
  corAproximada: string;
  imageSrc?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const SwatchCor = ({ nome, corAproximada, imageSrc, selected, onClick }: SwatchCorProps) => (
  <button onClick={onClick} className="flex items-center gap-3 group cursor-pointer">
    <div
      className={cn(
        "w-10 h-10 rounded-full transition-all duration-300 overflow-hidden shrink-0",
        // O anel é elemento de interface, então precisa de 3:1 contra o fundo
        // da página, não de 4,5:1. O âmbar de marca mede 2,02:1 no osso; o
        // --accent-ink fecha 4,83:1 e marca a seleção sem depender de cor
        // clara sobre fundo claro.
        selected ? "ring-2 ring-accent-ink" : "ring-1 ring-primary/25 group-hover:ring-primary/50"
      )}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={nome} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full" style={{ backgroundColor: corAproximada }} />
      )}
    </div>
    {/* O estado selecionado era `text-white` sobre a página cor de osso: 1,3:1,
        ou seja, escolher uma cor fazia o nome dela sumir. O destaque agora
        vem do tom mais escuro, que é o que a página inteira usa para dar
        ênfase. */}
    <span className={cn(
      "text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 whitespace-nowrap",
      selected ? "text-primary font-medium" : "text-muted-foreground"
    )}>
      {nome}
    </span>
  </button>
);
