import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { projetos } from "@/data/projetos";

import heroOrcamento from "@/assets/hero-home-altwood.webp";

import iconAntiMofo from "@/assets/madeira-ecologica/icon-anti-mofo.svg?raw";
import iconHidrofobico from "@/assets/madeira-ecologica/icon-hidrofobico.svg?raw";
import iconPragas from "@/assets/madeira-ecologica/icon-resistente-pragas.svg?raw";
import iconGarantia from "@/assets/madeira-ecologica/icon-garantia.svg?raw";
import iconReciclado from "@/assets/madeira-ecologica/icon-reciclado.svg?raw";

const beneficios = [
  {
    svg: iconGarantia,
    label: "10 anos de garantia",
    description: "Uma década de garantia que reflete a confiança na durabilidade do produto.",
  },
  {
    svg: iconReciclado,
    label: "100% reciclado",
    description: "Fabricado com materiais reciclados, para uma arquitetura mais responsável.",
  },
  {
    svg: iconHidrofobico,
    label: "Hidrofóbico",
    description: "Superfície que repele água, ideal para áreas externas e ambientes úmidos.",
  },
  {
    svg: iconAntiMofo,
    label: "Anti-mofo",
    description: "Tratamento que inibe o crescimento de fungos e bactérias ao longo dos anos.",
  },
  {
    svg: iconPragas,
    label: "Resistente a pragas",
    description: "Composição naturalmente resistente a cupins e insetos, sem químicos extras.",
  },
];

const FEATURED_SLUGS = ["casa-mansa", "casa-areia", "vaz-batel"] as const;
const projetosDestaque = FEATURED_SLUGS.map(
  (slug) => projetos.find((p) => p.slug === slug)!,
);

const Orcamento = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title="Solicitar Orçamento — Lesco"
        description="Solicite um orçamento personalizado para seu projeto. Nossa equipe entrará em contato para elaborar a melhor solução em revestimentos Lesco."
        path="/orcamento"
        image={heroOrcamento}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section className="relative rounded-[10px] overflow-hidden">
        <img
          src={heroOrcamento}
          alt="Revestimentos em madeira ecológica Lesco"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Esquerda — texto */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              Orçamento sem compromisso
            </span>
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] mb-6">
              Crie um ambiente exclusivo com elegância e autenticidade.
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md">
              Solicite um orçamento e faça parte da transformação com revestimentos
              em madeira ecológica de alto padrão.
            </p>
          </div>

          {/* Direita — formulário (iframe atual) */}
          <div className="bg-white rounded-[10px] p-3 sm:p-4 md:p-5 shadow-2xl">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/GTcMRzSzlRyI4MLLuFYJ"
              style={{ width: "100%", height: "1141px", border: "none", borderRadius: "3px" }}
              id="inline-GTcMRzSzlRyI4MLLuFYJ"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="[02] [FORM] [ORCAMENTO]"
              data-height="1141"
              data-layout-iframe-id="inline-GTcMRzSzlRyI4MLLuFYJ"
              data-form-id="GTcMRzSzlRyI4MLLuFYJ"
              title="[02] [FORM] [ORCAMENTO]"
            />
          </div>
        </div>
      </section>

      {/* ========== BENEFÍCIOS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            Por que Lesco
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            Tecnologia e durabilidade em cada superfície.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {beneficios.map((b) => (
              <div key={b.label} className="bg-white/50 rounded-[10px] p-8">
                <div
                  className="[&>svg]:h-10 [&>svg]:w-10 text-dark mb-5"
                  dangerouslySetInnerHTML={{ __html: b.svg }}
                  aria-hidden
                />
                <h3 className="font-display text-xl text-dark mb-3 font-normal">{b.label}</h3>
                <p className="font-body text-[14px] text-dark/70 leading-relaxed text-gray-950">{b.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== PROJETOS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
            Portfólio
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 max-w-2xl">
            Conheça alguns dos nossos projetos.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {projetosDestaque.map((p) => (
              <Link
                key={p.slug}
                to={`/projetos/${p.slug}`}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden relative">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
                </div>
                <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/60 mt-3 ml-1">
                  {p.linha}
                </p>
                <h3 className="font-display text-lg font-normal text-dark ml-1 group-hover:opacity-70 transition-opacity">
                  {p.nome}
                </h3>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== NÚMEROS ========== */}
      <section className="bg-dark rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <AnimatedCounter end={10} suffix="+" />
              <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary-foreground/60 mt-3">
                Anos de inovação
              </span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={100} suffix="%" />
              <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary-foreground/60 mt-3">
                Produtos reciclados
              </span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={3} />
              <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary-foreground/60 mt-3">
                Certificações de qualidade
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section
        className="py-20 md:py-28 rounded-[10px]"
        style={{ background: "linear-gradient(105deg, #F0C9A8 0%, #E8DCC2 30%, #C8D2C4 60%, #8FA4B5 100%)" }}
      >
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] text-dark mb-10">
              Vamos iniciar<br />seu projeto?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5511948449044"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                Falar no WhatsApp
              </a>
              <Link
                to="/catalogo-lesco"
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

export default Orcamento;
