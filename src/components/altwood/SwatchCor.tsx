import { cn } from "@/lib/utils";

interface SwatchCorProps {
  nome: string;
  corAproximada: string;
  imageSrc?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const SwatchCor = ({ nome, corAproximada, imageSrc, selected, onClick }: SwatchCorProps) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 group cursor-pointer">
    <div
      className={cn(
        "w-[80px] h-[56px] rounded-[var(--aw-radius-swatch)] transition-all duration-300 overflow-hidden",
        selected ? "ring-2 ring-[#C8956C]" : "ring-1 ring-[#1E1E1E] group-hover:ring-[#525252]"
      )}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={nome} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full" style={{ backgroundColor: corAproximada }} />
      )}
    </div>
    <span className={cn(
      "text-[11px] uppercase tracking-[0.1em] transition-colors duration-300",
      selected ? "text-white" : "text-[#7F7F7F]"
    )}>
      {nome}
    </span>
  </button>
);
