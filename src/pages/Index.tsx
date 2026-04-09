import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import heroImg from "@/assets/hero-facade.jpg";
import altwoodImg from "@/assets/altwood-card.jpg";
import bambuImg from "@/assets/bambu-card.jpg";
import pedraImg from "@/assets/pedra-card.jpg";
import echotexImg from "@/assets/echotex-card.jpg";
import caseArenaImg from "@/assets/case-arena.jpg";
import logoAltwood from "@/assets/logo-altwood.svg";
import logoZhuzen from "@/assets/logo-zhuzen.svg";
import logoItalflex from "@/assets/logo-italflex.svg";
import logoEchotex from "@/assets/logo-echotex.svg";

const lines = [
  {
    name: "Altwood",
    tag: "Madeira Ecológica",
    href: "/altwood",
    image: altwoodImg,
    logo: logoAltwood,
    bgClass: "bg-altwood-dark",
    soon: false,
  },
  {
    name: "Zhúzen",
    tag: "Fibra Natural",
    href: "/zhuzen",
    image: bambuImg,
    logo: logoZhuzen,
    bgClass: "bg-bambu-dark",
    soon: true,
  },
  {
    name: "Italflex",
    tag: "Pedra Ecológica",
    href: "/italflex",
    image: pedraImg,
    logo: logoItalflex,
    bgClass: "bg-pedra-dark",
    soon: true,
  },
  {
    name: "Echotex",
    tag: "Tecido Acústico",
    href: "/echotex",
    image: echotexImg,
    logo: logoEchotex,
    bgClass: "bg-echo-dark",
    soon: true,
  },
];

const Index = () => {
  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Fachada com revestimento WPC Lesco"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,8,0.7)] via-[rgba(10,9,8,0.2)] to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 lg:px-12 py-8">
          {/* Top label */}
          <p className="font-mono-tech text-xs text-primary-foreground/60 tracking-[0.2em] uppercase pt-24">
            Revestimentos Premium · Brasil
          </p>

          {/* Title */}
          <div className="mb-32 max-w-4xl">
            <h1 className="text-display-xl text-primary-foreground">
              Superfícies que<br />definem legados.
            </h1>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ArrowDown className="text-primary-foreground/50 animate-scroll-hint" size={24} />
          </div>
        </div>
      </section>

      {/* ========== AS LINHAS ========== */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-subheading text-muted-foreground mb-4">Nossas Linhas</p>
            <h2 className="text-display-l text-foreground mb-16">Quatro materiais,<br />uma filosofia.</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lines.map((line, i) => (
              <ScrollReveal key={line.name} delay={i * 0.1}>
                <Link
                  to={line.href}
                  className="group relative block aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,8,0.75)] via-[rgba(10,9,8,0.2)] to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-8">
                    {line.soon && (
                      <span className="absolute top-6 right-6 font-mono-tech text-[10px] text-accent tracking-[0.15em] uppercase bg-primary/60 px-3 py-1 backdrop-blur-sm">
                        Em breve
                      </span>
                    )}
                    <p className="text-caption text-primary-foreground/60 mb-2">{line.tag}</p>
                    <img
                      src={line.logo}
                      alt={line.name}
                      className="h-8 md:h-10 w-auto brightness-0 invert transition-transform duration-500 group-hover:-translate-y-2"
                    />
                    <span className="flex items-center gap-2 mt-3 text-sm text-accent opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      Explorar <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MANIFESTO ========== */}
      <section className="section-spacing bg-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex gap-8 max-w-4xl">
              {/* Accent line */}
              <div className="hidden md:block w-px bg-accent shrink-0 self-stretch" />
              <div>
                <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.2]">
                  "Não vendemos apenas revestimentos. Entregamos a matéria-prima da arquitetura que permanece."
                </blockquote>
                <p className="mt-8 text-body-lg text-muted-foreground max-w-xl">
                  Pioneiros em Madeira Ecológica no Brasil há mais de 15 anos. Cada superfície que criamos é pensada para resistir ao tempo — e ao olhar.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== CASE DE DESTAQUE ========== */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <ScrollReveal className="lg:col-span-3">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={caseArenaImg}
                  alt="Arena do Futuro — Rio 2016"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-2" delay={0.2}>
              <p className="text-caption text-muted-foreground mb-3">Case de Destaque</p>
              <h3 className="text-heading text-foreground mb-4">
                Arena do Futuro · Rio 2016
              </h3>
              <p className="text-body-lg text-muted-foreground mb-6">
                Um dos maiores projetos de brise em madeira ecológica do mundo. Mais de 3.000m² de revestimento Lesco Green Brise, feito para resistir ao clima tropical e encantar o mundo.
              </p>
              <Link
                to="/projetos"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-body uppercase tracking-[0.1em]"
              >
                Ver case <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== NÚMEROS ========== */}
      <section className="section-spacing bg-primary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-primary-foreground/10">
            {[
              { value: 15, suffix: "+", label: "Anos de inovação" },
              { value: 100, suffix: "%", label: "Produtos reciclados" },
              { value: 1000, suffix: "+", label: "Cases realizados" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center px-8">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="mt-4 text-caption text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-l text-foreground mb-8">
              Pronto para começar<br />um projeto?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground text-sm font-body uppercase tracking-[0.1em] hover:bg-accent/90 transition-colors"
              >
                Falar com especialista
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center px-8 py-4 border border-foreground/20 text-foreground text-sm font-body uppercase tracking-[0.1em] hover:bg-foreground/5 transition-colors"
              >
                Baixar catálogo
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Index;
