import { BotaoCTA } from "./BotaoCTA";

interface HeroSectionProps {
  imageSrc?: string;
  headline: string;
  subtitulo: string;
  ctaLabel?: string;
  ctaAction?: () => void;
}

export const HeroSection = ({ imageSrc, headline, subtitulo, ctaLabel, ctaAction }: HeroSectionProps) => (
  <section className="relative w-full h-screen overflow-hidden">
    {/* Background */}
    {imageSrc ? (
      <img src={imageSrc} alt={headline} className="absolute inset-0 w-full h-full object-cover" />
    ) : (
      <div className="absolute inset-0 bg-[#0D0D0D]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")" }}
      />
    )}
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,13,13,0.2)] to-[rgba(13,13,13,0.7)]" />
    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 lg:p-20">
      <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold uppercase tracking-[-0.02em] text-white leading-none mb-4">
        {headline}
      </h1>
      <p className="text-[#7F7F7F] text-lg md:text-xl max-w-lg mb-8">{subtitulo}</p>
      {ctaLabel && (
        <div>
          <BotaoCTA variant="secondary" onClick={ctaAction}>{ctaLabel}</BotaoCTA>
        </div>
      )}
    </div>
  </section>
);
