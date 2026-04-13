import { ImageIcon } from "lucide-react";

interface CardProjetoProps {
  imageSrc?: string;
  legenda: string;
  ratio?: "4:3" | "16:9" | "3:4";
}

export const CardProjeto = ({ imageSrc, legenda, ratio = "4:3" }: CardProjetoProps) => {
  const aspectClass = ratio === "16:9" ? "aspect-video" : ratio === "3:4" ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <div className={`relative ${aspectClass} rounded-[var(--aw-radius-card)] overflow-hidden group cursor-pointer`}>
      {imageSrc ? (
        <img src={imageSrc} alt={legenda} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#141414] flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-[#2A2A2A]" />
        </div>
      )}
      <div className="absolute inset-0 bg-[rgba(13,13,13,0.72)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
        <p className="text-white text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {legenda}
        </p>
      </div>
    </div>
  );
};
