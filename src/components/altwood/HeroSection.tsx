import { useState, useEffect, useCallback } from "react";
import { BotaoCTA } from "./BotaoCTA";

interface HeroSectionProps {
  imageSrc?: string;
  images?: string[];
  headline: string;
  subtitulo: string;
  ctaLabel?: string;
  ctaAction?: () => void;
}

export const HeroSection = ({ imageSrc, images, headline, subtitulo, ctaLabel, ctaAction }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideImages = images || (imageSrc ? [imageSrc] : []);

  const nextSlide = useCallback(() => {
    if (slideImages.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }
  }, [slideImages.length]);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, slideImages.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slideshow */}
      {slideImages.length > 0 ? (
        slideImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${headline} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
          />
        ))
      ) : (
        <div
          className="absolute inset-0 bg-[#0D0D0D]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />
      )}
      {/* Dark overlay at 60% */}
      <div className="absolute inset-0 bg-[rgba(13,13,13,0.6)]" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 lg:p-20">
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold uppercase tracking-[-0.02em] text-white leading-none mb-4">
          {headline}
        </h1>
        {subtitulo?.trim() && (
          <p className="text-[#B0B0B0] text-lg md:text-xl max-w-lg mb-8 whitespace-pre-line">{subtitulo}</p>
        )}
        {ctaLabel && (
          <div>
            <BotaoCTA variant="secondary" onClick={ctaAction}>
              {ctaLabel}
            </BotaoCTA>
          </div>
        )}
      </div>
    </section>
  );
};
