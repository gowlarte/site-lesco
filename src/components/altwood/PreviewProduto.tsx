import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { SwatchCor } from "./SwatchCor";
import { BotaoCTA } from "./BotaoCTA";
import { ImageIcon } from "lucide-react";

interface SwatchData {
  nome: string;
  corAproximada: string;
}

interface PreviewProdutoProps {
  id: string;
  tag: string;
  titulo: string;
  descricao: string;
  swatches: SwatchData[];
  href: string;
  imageSrc?: string;
  images?: string[];
}

export const PreviewProduto = ({ id, tag, titulo, descricao, swatches, href, imageSrc, images }: PreviewProdutoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const allImages = images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];
  const hasSlideshow = allImages.length > 1;

  const startSlideshow = useCallback(() => {
    if (!hasSlideshow) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);
  }, [hasSlideshow, allImages.length]);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndex(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    startSlideshow();
  }, [startSlideshow]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    stopSlideshow();
  }, [stopSlideshow]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <section id={id} className="py-24 border-b border-[#1E1E1E] last:border-b-0 mx-[10px] my-[10px] border-0">
      <Link
        to={href}
        className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left — Photo */}
        <div className="aspect-[3/2] rounded-[var(--aw-radius-card)] overflow-hidden relative">
          {allImages.length > 0 ? (
            allImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${titulo} ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{
                  opacity: i === currentIndex ? (isHovered ? 0.85 : 1) : 0,
                  transform: isHovered ? "scale(1.04)" : "scale(1)",
                }}
              />
            ))
          ) : (
            <div className="w-full h-full bg-[#141414] flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-[#2A2A2A]" />
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="flex flex-col justify-center gap-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8956C]">{tag}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] leading-tight text-primary font-light">{titulo}</h2>
          <p className="text-[15px] text-[#7F7F7F] leading-relaxed max-w-md">{descricao}</p>
          <div className="flex gap-3 flex-wrap">
            {swatches.map((s) => (
              <SwatchCor key={s.nome} nome={s.nome} corAproximada={s.corAproximada} />
            ))}
          </div>
          <BotaoCTA variant="ghost">Ver linha completa</BotaoCTA>
        </div>
      </Link>
    </section>
  );
};
