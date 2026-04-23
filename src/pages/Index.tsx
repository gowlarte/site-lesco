import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Header } from "@/components/Header";
import { MadeiraEcologicaSection } from "@/components/madeira-ecologica/MadeiraEcologicaSection";
import { ScrollMarqueeGallery } from "@/components/ScrollMarqueeGallery";

import partnerLogo1 from "@/assets/partners/logo-1.png";
import partnerLogo2 from "@/assets/partners/logo-2.png";
import partnerLogo3 from "@/assets/partners/logo-3.png";
import partnerLogo4 from "@/assets/partners/logo-4.png";

import showroomMain from "@/assets/showroom/showroom-main.jpg";
import showroomDetail1 from "@/assets/showroom/showroom-detail-1.jpg";
import showroomDetail2 from "@/assets/showroom/showroom-detail-2.jpg";

import heroAltwood from "@/assets/hero-home-altwood.webp";
import heroZhuzen from "@/assets/hero-home-zhuzen.webp";
import heroEchotex from "@/assets/hero-home-echotex.jpg";
import heroItalflex from "@/assets/hero-home-italflex.webp";

import logoAltwoodRaw from "@/assets/linha-altwood-2.svg?raw";
import logoZhuzenRaw from "@/assets/linha-zhuzen-2.svg?raw";
import logoEchotexRaw from "@/assets/linha-echotex-2.svg?raw";
import logoItalflexRaw from "@/assets/linha-italflex-2.svg?raw";

import projectCasaMansa from "@/assets/project-casa-mansa.jpg";
import projectResidencialUrbano from "@/assets/project-residencial-urbano.webp";
import projectCasaAreia from "@/assets/project-casa-areia.jpg";
import projectCasaUna from "@/assets/project-casa-una.png";
import projectDeckDetail from "@/assets/project-deck-detail.jpg";

const linhas = [
  {
    nome: "AltWood",
    logo: logoAltwoodRaw,
    descricao: "Madeira ecológica premium. Fachadas, brises, panels e decks.",
    href: "/altwood",
    imagem: heroAltwood,
  },
  {
    nome: "Zhúzen",
    logo: logoZhuzenRaw,
    descricao: "Revestimentos, forros, luminárias e decorativos feitos a partir do bambu.",
    href: "/zhuzen",
    imagem: heroZhuzen,
  },
  {
    nome: "Echotex",
    logo: logoEchotexRaw,
    descricao: "Tecido acústico moldado. Revestimento para estúdios profissionais e home cinemas.",
    href: "/echotex",
    imagem: heroEchotex,
  },
  {
    nome: "Italflex",
    logo: logoItalflexRaw,
    descricao: "Revestimento para fachadas, paredes de cozinhas e banheiros, interno e externo.",
    href: "/italflex",
    imagem: heroItalflex,
  },
];

const projects = [
  { nome: "Casa Mansa", imagem: projectCasaMansa, href: "/projetos/casa-mansa", descricao: "Integração total entre arquitetura e natureza com revestimentos AltWood.", linha: "AltWood" },
  { nome: "Residencial Urbano", imagem: projectResidencialUrbano, href: "/projetos/residencial-urbano", descricao: "Fachada contemporânea com brises em madeira ecológica.", linha: "AltWood" },
  { nome: "Casa Areia", imagem: projectCasaAreia, href: "/projetos/casa-areia", descricao: "Deck e pergolado em harmonia com a paisagem litorânea.", linha: "AltWood" },
  { nome: "Casa Una", imagem: projectCasaUna, href: "/projetos/casa-una", descricao: "Revestimento externo que dialoga com a vegetação nativa.", linha: "Zhúzen" },
  { nome: "Deck Detail", imagem: projectDeckDetail, href: "/projetos/deck-detail", descricao: "Detalhe de acabamento em deck de alta resistência.", linha: "AltWood" },
];

const SLIDE_INTERVAL = 6000;

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);

  const goToSlide = useCallback((i: number) => {
    setCurrentSlide(((i % linhas.length) + linhas.length) % linhas.length);
  }, []);

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartX.current === null) return;
    dragDeltaX.current = clientX - dragStartX.current;
  };

  const handleDragEnd = () => {
    if (dragStartX.current === null) return;
    const threshold = 60;
    if (dragDeltaX.current <= -threshold) {
      goToSlide(currentSlide + 1);
    } else if (dragDeltaX.current >= threshold) {
      goToSlide(currentSlide - 1);
    }
    dragStartX.current = null;
    dragDeltaX.current = 0;
    setIsDragging(false);
    setIsPaused(false);
  };

  // Preload all hero images on mount so slide transitions are instant
  useEffect(() => {
    linhas.forEach((linha) => {
      const img = new Image();
      img.src = linha.imagem;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % linhas.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [isPaused]);

  const active = linhas[currentSlide];

  return (
    <main className="flex flex-col gap-[10px]">
      {/* ========== HERO BANNER — SLIDESHOW ========== */}
      <section
        className={`relative m-[10px] h-[calc(100vh-20px)] rounded-[10px] overflow-hidden select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          if (isDragging) handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => isDragging && handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Slides */}
        {linhas.map((linha, i) => (
          <div
            key={linha.nome}
            className="absolute inset-0"
            style={{
              opacity: currentSlide === i ? 1 : 0,
              transition: "opacity 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            aria-hidden={currentSlide !== i}
          >
            <img
              src={linha.imagem}
              alt={`${linha.nome} — fundo`}
              draggable={false}
              className={
                currentSlide === i
                  ? "hero-slide-img w-full h-full object-cover pointer-events-none"
                  : "w-full h-full object-cover pointer-events-none"
              }
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#141414]/50 pointer-events-none" />

        {/* Header inside banner */}
        <div className="relative z-20">
          <Header variant="overlay" />
        </div>

        {/* Bottom-left: logo + descrição */}
        <div className="absolute bottom-20 lg:bottom-16 left-8 lg:left-12 right-8 lg:right-auto z-10 max-w-[640px] text-white flex flex-col items-start">
          <div
            className="mb-5 transition-opacity duration-500 [&>svg]:h-[44px] md:[&>svg]:h-[56px] lg:[&>svg]:h-[68px] [&>svg]:w-auto"
            style={{ color: "#FFFFFF" }}
            dangerouslySetInnerHTML={{ __html: active.logo }}
            aria-label={active.nome}
          />
          <p className="font-display font-extralight text-[20px] md:text-[26px] lg:text-[30px] leading-[1.2] tracking-[-0.01em] text-white/95 max-w-[520px] text-left">
            {active.descricao}
          </p>
          {/* CTA — mobile: below description, left-aligned */}
          <Link
            to={active.href}
            onClick={(e) => { if (Math.abs(dragDeltaX.current) > 5) e.preventDefault(); }}
            className="lg:hidden mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/95 hover:bg-white text-[#141414] font-display text-[12px] uppercase tracking-[0.08em] transition-all duration-300 cursor-pointer"
          >
            Ver linha completa
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Bottom-right: CTA — desktop only */}
        <Link
          to={active.href}
          onClick={(e) => { if (Math.abs(dragDeltaX.current) > 5) e.preventDefault(); }}
          className="hidden lg:inline-flex absolute bottom-16 right-8 lg:right-12 z-10 items-center gap-2 px-5 py-3 rounded-full bg-white/95 hover:bg-white text-[#141414] font-display text-[12px] uppercase tracking-[0.08em] transition-all duration-300 cursor-pointer"
        >
          Ver linha completa
          <ArrowUpRight size={16} />
        </Link>

        {/* Bullets — bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {linhas.map((linha, i) => (
            <button
              key={linha.nome}
              onClick={() => goToSlide(i)}
              aria-label={`Ir para slide ${i + 1} — ${linha.nome}`}
              aria-current={currentSlide === i}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === i ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ========== MANIFESTO ========== */}
      <section className="bg-light section-spacing rounded-[10px]">
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-start">
              <h2 className="font-display text-3xl md:text-4xl lg:text-[52px] font-normal leading-[1.15] text-dark">
                Pioneiros em Madeira Ecológica no Brasil, somos arquitetura feita para o amanhã.
              </h2>
              <div className="max-w-[320px]">
                <p className="font-body text-[16px] font-light leading-[1.65] text-dark/70 text-primary">
                  Acabamento premium para projetos de alto padrão, com garantia de até 10 anos. Cada superfície que criamos resiste ao tempo e agrada o olhar.
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
      <section className="relative flex flex-col overflow-hidden px-[10px]">
        <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] font-normal leading-[1.15] text-primary mb-8 ml-1">
          Projetos selecionados
        </h2>

        {/* Inline project viewer */}
        {selectedProject && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-[10px] overflow-hidden relative bg-secondary">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors duration-200"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
                <img
                  src={selectedProject.imagem}
                  alt={selectedProject.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-10 lg:p-16 bg-primary">
                <p className="font-body text-[11px] font-light uppercase tracking-[0.1em] text-foreground/50 mb-4">
                  {selectedProject.linha}
                </p>
                <h3 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-foreground mb-6">
                  {selectedProject.nome}
                </h3>
                <p className="font-body text-[16px] font-light leading-[1.65] text-foreground/70 max-w-[400px]">
                  {selectedProject.descricao}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery grid — hidden when a project is open */}
        {!selectedProject && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {/* Left — large featured image spanning full height */}
            <div
              className="group cursor-zoom-in"
              onClick={() => setSelectedProject(projects[0])}
            >
              <div className="aspect-[4/3] md:aspect-auto md:h-full rounded-[10px] overflow-hidden relative">
                <img
                  src={projects[0].imagem}
                  alt={projects[0].nome}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
              </div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.1em] text-foreground mt-3 ml-1">
                {projects[0].nome}
              </p>
            </div>

            {/* Right — two stacked images */}
            <div className="flex flex-col gap-[10px]">
              {[projects[1], projects[2]].map((p) => (
                <div
                  key={p.nome}
                  className="group cursor-zoom-in flex-1"
                  onClick={() => setSelectedProject(p)}
                >
                  <div className="aspect-video rounded-[10px] overflow-hidden relative">
                    <img
                      src={p.imagem}
                      alt={p.nome}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
                  </div>
                  <p className="font-body text-[11px] font-light uppercase tracking-[0.1em] text-foreground mt-3 ml-1">
                    {p.nome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========== MADEIRA ECOLÓGICA — SCROLL ANIMATION ========== */}
      <MadeiraEcologicaSection />

      {/* ========== SCROLL MARQUEE GALLERY ========== */}
      <ScrollMarqueeGallery />

      {/* ========== PARCEIROS 3D ========== */}
      <section className="py-16 md:py-20 mx-[10px] rounded-[10px]">
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <h3 className="font-display text-lg md:text-xl lg:text-2xl font-normal text-primary mb-10 text-center">
                Nossos produtos em 3D para seu próximo projeto
              </h3>
              <div className="flex items-center justify-center gap-10 md:gap-16 lg:gap-20 flex-wrap">
                {[partnerLogo1, partnerLogo2, partnerLogo3, partnerLogo4].map((logo, i) => (
                  <img
                    key={i}
                    src={logo}
                    alt={`Parceiro ${i + 1}`}
                    className="h-6 md:h-8 lg:h-9 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      <section
        className="py-24 md:py-32 lg:py-40 rounded-[10px] mx-[10px] mb-[10px]"
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
