import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

import altwoodProject1 from "@/assets/altwood-project-1.jpg";
import altwoodProject2 from "@/assets/altwood-project-2.jpg";
import altwoodProject3 from "@/assets/altwood-project-3.jpg";
import altwoodProject4 from "@/assets/altwood-project-4.jpg";
import heroZhuzenImg from "@/assets/hero-zhuzen.jpg";
import heroEchotexImg from "@/assets/hero-echotex.jpg";
import heroItalflexImg from "@/assets/hero-italflex.jpg";

import linhaAltwoodLogo from "@/assets/linha-altwood.svg";
import linhaZhuzenLogo from "@/assets/linha-zhuzen.svg";
import linhaEchotexLogo from "@/assets/linha-echotex.svg";
import linhaItalflexLogo from "@/assets/linha-italflex.svg";

import projectCasaMansa from "@/assets/project-casa-mansa.jpg";
import projectResidencialUrbano from "@/assets/project-residencial-urbano.webp";
import projectCasaAreia from "@/assets/project-casa-areia.jpg";
import projectCasaUna from "@/assets/project-casa-una.png";
import projectDeckDetail from "@/assets/project-deck-detail.jpg";

const linhas = [
  {
    nome: "AltWood",
    logo: linhaAltwoodLogo,
    descricao: "Madeira ecológica premium. Fachadas, brises, panels e decks.",
    href: "/altwood",
    imagens: [altwoodProject1, altwoodProject2, altwoodProject3, altwoodProject4],
    corHover: "#f7c39b",
  },
  {
    nome: "Zhúzen",
    logo: linhaZhuzenLogo,
    descricao: "Revestimentos, forros, luminárias, decorativos, utilitários feitas a partir do bambu.",
    href: "/zhuzen",
    imagens: [heroZhuzenImg],
    corHover: "#a3dba0",
  },
  {
    nome: "Echotex",
    logo: linhaEchotexLogo,
    descricao: "Tecido acústico moldado. Revestimento para estúdios profissionais ou home cinemas.",
    href: "/echotex",
    imagens: [heroEchotexImg],
    corHover: "#c6e1d7",
  },
  {
    nome: "Italflex",
    logo: linhaItalflexLogo,
    descricao: "Revestimento para fachadas, paredes de cozinhas e banheiros, interno e externo.",
    href: "/italflex",
    imagens: [heroItalflexImg],
    corHover: "#f57d69",
  },
];

const projects = [
  { nome: "Casa Mansa", imagem: projectCasaMansa, href: "/projetos/casa-mansa" },
  { nome: "Residencial Urbano", imagem: projectResidencialUrbano, href: "/projetos/residencial-urbano" },
  { nome: "Casa Areia", imagem: projectCasaAreia, href: "/projetos/casa-areia" },
  { nome: "Casa Una", imagem: projectCasaUna, href: "/projetos/casa-una" },
  { nome: "Deck Detail", imagem: projectDeckDetail, href: "/projetos/deck-detail" },
];

const CYCLE_INTERVAL = 1200; // ms between image switches

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageFrame, setImageFrame] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = useCallback(() => {
    stopCycling();
    setImageFrame(0);
    intervalRef.current = setInterval(() => {
      setImageFrame((prev) => prev + 1);
    }, CYCLE_INTERVAL);
  }, []);

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <main className="px-[10px] pb-[10px] pt-[100px] flex flex-col gap-[10px]">
      {/* ========== HERO — LINE SELECTOR ========== */}
      <section className="relative min-h-screen bg-primary flex items-center rounded-[10px]">
        <div
          ref={sectionRef}
          className="container px-6 lg:px-8 w-full pt-24 pb-16 py-[97px] my-0 mx-0"
          onMouseMove={handleMouseMove}
        >
          {/* 3-column grid: names | image | descriptions */}
          <div className="relative">
            {/* Central floating image — follows mouse, desktop only */}
            <div
              className="hidden lg:block absolute z-10 w-[340px] xl:w-[380px] pointer-events-none"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                transform: "translate(-50%, -50%)",
                transition: isHovering
                  ? "left 0.15s ease-out, top 0.15s ease-out"
                  : "opacity 0.3s ease",
              }}
            >
              {linhas.map((linha, i) => (
                <img
                  key={linha.nome}
                  src={linha.imagem}
                  alt={linha.nome}
                  className="absolute inset-0 w-full h-[420px] xl:h-[480px] object-cover rounded-2xl transition-opacity duration-[350ms]"
                  style={{
                    opacity: activeIndex === i && isHovering ? 1 : 0,
                  }}
                  width={380}
                  height={480}
                />
              ))}
              {/* Spacer for layout */}
              <div className="w-full h-[420px] xl:h-[480px]" />
            </div>

            {/* Rows */}
            {linhas.map((linha, i) => (
              <Link
                key={linha.nome}
                to={linha.href}
                className="block"
              >
                <div
                  ref={(el) => { rowRefs.current[i] = el; }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_380px_1fr] xl:grid-cols-[1fr_420px_1fr] items-center border-t border-white/[0.12] py-10 lg:py-12 cursor-pointer group"
                  onMouseEnter={() => {
                    setActiveIndex(i);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Name */}
                  <div
                    className="h-8 md:h-10 lg:h-11 w-[200px] md:w-[240px] transition-all duration-[350ms]"
                    style={{
                      maskImage: `url(${linha.logo})`,
                      WebkitMaskImage: `url(${linha.logo})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      backgroundColor: activeIndex === i && isHovering
                        ? linha.corHover
                        : "rgba(255,255,255,0.3)",
                      opacity: activeIndex === i && isHovering ? 1 : 0.5,
                    }}
                  />

                  {/* Spacer for image column on desktop */}
                  <div className="hidden lg:block" />

                  {/* Description */}
                  <p
                    className="font-body font-light leading-[1.65] mt-2 md:mt-0 max-w-sm transition-colors duration-[350ms] text-xl"
                    style={{
                      color: activeIndex === i && isHovering
                        ? "rgba(240,237,232,0.85)"
                        : "rgba(240,237,232,0.3)",
                    }}
                  >
                    {linha.descricao}
                  </p>
                </div>
              </Link>
            ))}
            {/* Bottom border */}
            <div className="border-t border-white/[0.12]" />
          </div>
        </div>
      </section>

      {/* ========== MANIFESTO ========== */}
      <section className="bg-light section-spacing rounded-[10px]">
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-start">
              <h2 className="font-display text-3xl md:text-4xl lg:text-[52px] font-normal leading-[1.15] text-dark">
                Não vendemos apenas revestimentos. Entregamos a matéria-prima da arquitetura que permanece.
              </h2>
              <div className="max-w-[320px]">
                <p className="font-body text-[16px] font-light leading-[1.65] text-dark/70 text-primary">
                  Pioneiros em Madeira Ecológica no Brasil há mais de 15 anos. Cada superfície que criamos é pensada para resistir ao tempo, e ao olhar.
                </p>
                <Link
                  to="/contato"
                  className="inline-flex items-center mt-8 px-6 py-3 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary hover:text-foreground transition-colors duration-300"
                >
                  Fale com um especialista
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== GALERIA DE PROJETOS ========== */}
      <section className="flex flex-col gap-[10px]">
        {/* Top row — 2 equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {[projects[0], projects[1]].map((p) => (
            <Link key={p.nome} to={p.href} className="group">
              <div className="aspect-[4/3] rounded-[10px] overflow-hidden relative">
                <img
                  src={p.imagem}
                  alt={p.nome}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
              </div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.1em] text-dark mt-3 ml-1">
                {p.nome}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom row — 3 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px]">
          {[projects[2], projects[3], projects[4]].map((p) => (
            <Link key={p.nome} to={p.href} className="group">
              <div className="aspect-square rounded-[10px] overflow-hidden relative">
                <img
                  src={p.imagem}
                  alt={p.nome}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
              </div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.1em] text-dark mt-3 ml-1">
                {p.nome}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section
        className="py-24 md:py-32 lg:py-40 rounded-[10px]"
        style={{ background: "linear-gradient(135deg, #A8D9A0 0%, #F5C9A0 100%)" }}
      >
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.15] text-dark mb-10">
              Vamos iniciar<br />seu projeto?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/orcamento"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                Solicite um orçamento
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                Baixe nosso catálogo
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Index;
