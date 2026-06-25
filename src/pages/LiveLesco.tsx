import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GhlForm } from "@/components/GhlForm";
import { projetos } from "@/data/projetos";

import heroLive from "@/assets/hero-home-altwood.webp";

import iconAntiMofo from "@/assets/madeira-ecologica/icon-anti-mofo.svg?raw";
import iconHidrofobico from "@/assets/madeira-ecologica/icon-hidrofobico.svg?raw";
import iconPragas from "@/assets/madeira-ecologica/icon-resistente-pragas.svg?raw";
import iconGarantia from "@/assets/madeira-ecologica/icon-garantia.svg?raw";
import iconReciclado from "@/assets/madeira-ecologica/icon-reciclado.svg?raw";

const diferenciais = [
  {
    svg: iconHidrofobico,
    label: "Água e resistência",
    description:
      "A madeira tradicional expande com a umidade. O WPC mantém sua estabilidade estrutural, evitando deformações.",
  },
  {
    svg: iconGarantia,
    label: "Durabilidade e resistência",
    description:
      "Enquanto a madeira convencional apodrece com o tempo, o WPC exibe robustez e imunidade à deterioração.",
  },
  {
    svg: iconPragas,
    label: "Resistência a fungos e pragas",
    description:
      "Cupins, mofo e fungos são desafios para a madeira. O WPC resiste a esses elementos, garantindo longa vida útil.",
  },
  {
    svg: iconAntiMofo,
    label: "Estabilidade e manutenção",
    description:
      "A madeira demanda manutenção frequente. O WPC tem alta estabilidade sob luz solar e exige pouca manutenção.",
  },
  {
    svg: iconReciclado,
    label: "Sustentável",
    description:
      "Fabricado com fibras de madeira e resinas de alta performance, 100% reciclável para uma arquitetura responsável.",
  },
];

const certificacoes = [
  {
    sigla: "GBC",
    titulo: "Certificação GBC",
    description:
      "Organização não governamental que fomenta a construção sustentável no país, atuando junto a governo e empresas focadas em qualidade e sustentabilidade.",
  },
  {
    sigla: "LEED",
    titulo: "Certificação LEED",
    description:
      "Leadership in Energy and Environmental Design — incentiva e acelera a adoção de práticas de construção sustentável, do projeto à construção final.",
  },
  {
    sigla: "ESG",
    titulo: "Certificação ESG",
    description:
      "Práticas sociais, ambientais e de governança que atestam empresas comprometidas com a redução de impactos ambientais e o respeito ao planeta.",
  },
];

const FEATURED_SLUGS = ["casa-mansa", "casa-areia", "vaz-batel"] as const;
const projetosDestaque = FEATURED_SLUGS.map(
  (slug) => projetos.find((p) => p.slug === slug)!,
).filter(Boolean);

const LiveLesco = () => {
  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title="Live Lesco — Madeira Plástica Ecológica de Alto Padrão"
        description="Solicite sua amostra da Lesco. Revestimentos em WPC Premium que unem sofisticação, tecnologia e sustentabilidade para projetos arquitetônicos de alto padrão."
        path="/live-lesco"
        image={heroLive}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section className="relative rounded-[10px] overflow-hidden">
        <img
          src={heroLive}
          alt="Revestimentos em madeira plástica WPC Premium Lesco"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Esquerda — texto */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              Live Lesco
            </span>
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] mb-6">
              Madeira Plástica Ecológica de Alto Padrão para Projetos Exclusivos.
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md">
              Os revestimentos em WPC Premium da Lesco unem sofisticação, tecnologia
              e sustentabilidade em cada detalhe. Preencha o formulário e transforme
              seus projetos em obras magníficas.
            </p>
          </div>

          {/* Direita — formulário (iframe Live Lesco) */}
          <div className="rounded-[10px] overflow-hidden">
            <GhlForm
              formId="UdrSMJdSvZWUJZVI46aE"
              formName="[09] [FORM] [LEADS LIVE LESCO]"
              title="[09] [FORM] [LEADS LIVE LESCO]"
              height={1034}
            />
          </div>
        </div>
      </section>

      {/* ========== WPC vs MADEIRA COMUM ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            WPC Premium x Madeira comum
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            Por que a WPC Premium Lesco supera a madeira comum.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {diferenciais.map((b) => (
              <div key={b.label} className="bg-white/50 rounded-[10px] p-8">
                <div
                  className="[&>svg]:h-10 [&>svg]:w-10 text-dark mb-5"
                  dangerouslySetInnerHTML={{ __html: b.svg }}
                  aria-hidden
                />
                <h3 className="font-display text-xl text-dark mb-3 font-normal">{b.label}</h3>
                <p className="font-body text-[14px] text-dark/70 leading-relaxed text-slate-950">{b.description}</p>
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
            Projetos inspiradores criados com a WPC Premium Lesco.
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

      {/* ========== CERTIFICAÇÕES ========== */}
      <section className="bg-dark rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground/50 mb-4 text-center">
            Certificações
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-primary-foreground mb-12 text-center max-w-2xl mx-auto">
            Excelência sustentável comprovada.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {certificacoes.map((c) => (
              <div key={c.sigla} className="bg-white/5 rounded-[10px] p-8 border border-white/10">
                <span className="font-display text-3xl font-light text-primary-foreground/90">{c.sigla}</span>
                <h3 className="font-display text-xl text-primary-foreground mt-4 mb-3 font-normal">{c.titulo}</h3>
                <p className="font-body text-[14px] text-primary-foreground/70 leading-relaxed">{c.description}</p>
              </div>
            ))}
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

export default LiveLesco;
