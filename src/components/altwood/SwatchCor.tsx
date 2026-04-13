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
      "text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 whitespace-nowrap",
      selected ? "text-white" : "text-[#7F7F7F]"
    )}>
      {nome}
    </span>
  </button>
);
