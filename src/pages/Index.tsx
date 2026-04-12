import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

import altwoodProject1 from "@/assets/altwood-project-1.jpg";
import altwoodProject2 from "@/assets/altwood-project-2.jpg";
import altwoodProject3 from "@/assets/altwood-project-3.jpg";
import altwoodProject4 from "@/assets/altwood-project-4.jpg";
import heroZhuzenImg from "@/assets/hero-zhuzen.jpg";
import heroEchotexImg from "@/assets/hero-echotex.jpg";
import heroItalflexImg from "@/assets/hero-italflex.jpg";

import logoAltwood from "@/assets/linha-altwood-2.svg";
import logoZhuzen from "@/assets/linha-zhuzen-2.svg";
import logoEchotex from "@/assets/linha-echotex-2.svg";
import logoItalflex from "@/assets/linha-italflex-2.svg";

import projectCasaMansa from "@/assets/project-casa-mansa.jpg";
import projectResidencialUrbano from "@/assets/project-residencial-urbano.webp";
import projectCasaAreia from "@/assets/project-casa-areia.jpg";
import projectCasaUna from "@/assets/project-casa-una.png";
import projectDeckDetail from "@/assets/project-deck-detail.jpg";

const linhas = [
  {
    nome: "AltWood",
    logo: logoAltwood,
    descricao: "Madeira ecológica premium. Fachadas, brises, panels e decks.",
    href: "/altwood",
    imagens: [altwoodProject1, altwoodProject2, altwoodProject3, altwoodProject4],
    corHover: "#C8956C",
  },
  {
    nome: "Zhúzen",
    logo: logoZhuzen,
    descricao: "Revestimentos, forros, luminárias, decorativos, utilitários feitas a partir do bambu.",
    href: "/zhuzen",
    imagens: [heroZhuzenImg],
    corHover: "#A8E063",
  },
  {
    nome: "Echotex",
    logo: logoEchotex,
    descricao: "Tecido acústico moldado. Revestimento para estúdios profissionais ou home cinemas.",
    href: "/echotex",
    imagens: [heroEchotexImg],
    corHover: "#A0A0A0",
  },
  {
    nome: "Italflex",
    logo: logoItalflex,
    descricao: "Revestimento para fachadas, paredes de cozinhas e banheiros, interno e externo.",
    href: "/italflex",
    imagens: [heroItalflexImg],
    corHover: "#D4A89A",
  },
];

const projects = [
  { nome: "Casa Mansa", imagem: projectCasaMansa, href: "/projetos/casa-mansa" },
  { nome: "Residencial Urbano", imagem: projectResidencialUrbano, href: "/projetos/residencial-urbano" },
  { nome: "Casa Areia", imagem: projectCasaAreia, href: "/projetos/casa-areia" },
  { nome: "Casa Una", imagem: projectCasaUna, href: "/projetos/casa-una" },
  { nome: "Deck Detail", imagem: projectDeckDetail, href: "/projetos/deck-detail" },
];

const CYCLE_INTERVAL = 1200;

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageFrame, setImageFrame] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <main className="px-[10px] pb-[10px] pt-[100px] flex flex-col gap-[10px]">
      {/* ========== HERO — LINE SELECTOR ========== */}
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-primary flex items-center rounded-[10px]"
        onMouseMove={handleMouseMove}
      >
        <div className="w-full px-12 lg:px-20 pt-32 pb-20">
          <div className="relative">
            {/* Rows */}
            {linhas.map((linha, i) => {
              const isActive = activeIndex === i && isHovering;

              return (
                <Link key={linha.nome} to={linha.href} className="block">
                  <div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start border-t border-white/[0.12] py-14 lg:py-20 cursor-pointer"
                    onMouseEnter={() => {
                      setActiveIndex(i);
                      setIsHovering(true);
                      startCycling();
                    }}
                    onMouseLeave={() => {
                      setIsHovering(false);
                      stopCycling();
                    }}
                  >
                    {/* Left — Brand name + underline */}
                    <div className="self-start">
                      <h3
                        className="font-display font-light text-[48px] md:text-[72px] lg:text-[96px] leading-[1] tracking-[-0.02em] transition-colors duration-[400ms]"
                        style={{
                          color: isActive ? linha.corHover : "#2E2E2E",
                        }}
                      >
                        {linha.nome}
                      </h3>
                      {/* Decorative underline */}
                      <span
                        className="block h-[1px] w-[80px] mt-3 transition-all duration-300 origin-left"
                        style={{
                          backgroundColor: linha.corHover,
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                    </div>

                    {/* Right — Description */}
                    <p
                      className="font-display font-extralight leading-[1.65] mt-4 lg:mt-2 max-w-[360px] text-[16px] lg:text-[18px] text-left self-start transition-colors duration-[400ms]"
                      style={{
                        color: isActive ? linha.corHover : "#525252",
                      }}
                    >
                      {linha.descricao}
                    </p>
                  </div>
                </Link>
              );
            })}
            {/* Bottom border */}
            <div className="border-t border-white/[0.12]" />

            {/* Mouse-following image */}
            <div
              className="hidden lg:block pointer-events-none absolute z-10 w-[280px] xl:w-[320px] h-[350px] xl:h-[400px] rounded-2xl overflow-hidden transition-all duration-[250ms] ease-out"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: "translate(-50%, -50%)",
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? "1" : "0.95",
              }}
            >
              {linhas.map((linha, i) =>
                linha.imagens.map((src, imgIdx) => (
                  <img
                    key={`${linha.nome}-${imgIdx}`}
                    src={src}
                    alt={`${linha.nome} projeto ${imgIdx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms]"
                    style={{
                      opacity:
                        activeIndex === i && isHovering && (imageFrame % linha.imagens.length) === imgIdx
                          ? 1
                          : 0,
                    }}
                    width={320}
                    height={400}
                  />
                ))
              )}
            </div>
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
