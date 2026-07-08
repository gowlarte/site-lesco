import { Link } from "@/components/AppLink";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GhlForm } from "@/components/GhlForm";
import { projetos } from "@/data/projetos";
import { t } from "@/i18n/t";

import heroAmostra from "@/assets/hero-facade.webp";

import iconAntiMofo from "@/assets/madeira-ecologica/icon-anti-mofo.svg?raw";
import iconHidrofobico from "@/assets/madeira-ecologica/icon-hidrofobico.svg?raw";
import iconPragas from "@/assets/madeira-ecologica/icon-resistente-pragas.svg?raw";
import iconGarantia from "@/assets/madeira-ecologica/icon-garantia.svg?raw";
import iconReciclado from "@/assets/madeira-ecologica/icon-reciclado.svg?raw";

const prioridades = [
  {
    svg: iconGarantia,
    label: t("Projetos em andamento"),
    description:
      t("Damos prioridade a quem já tem um projeto em execução e precisa avaliar a peça na prática."),
  },
  {
    svg: iconHidrofobico,
    label: t("Arquitetos"),
    description:
      t("Profissionais de arquitetura especificando WPC Premium para obras de alto padrão."),
  },
  {
    svg: iconPragas,
    label: t("Construtoras"),
    description:
      t("Construtoras e incorporadoras com demandas reais para fachadas, decks e revestimentos."),
  },
  {
    svg: iconAntiMofo,
    label: t("Especificação técnica"),
    description:
      t("A amostra ajuda você a validar cor, textura e acabamento antes de fechar a especificação."),
  },
  {
    svg: iconReciclado,
    label: t("Compromisso sustentável"),
    description:
      t("Material 100% reciclável: leve a sustentabilidade do projeto às mãos do cliente."),
  },
];

const diferenciais = [
  {
    svg: iconHidrofobico,
    label: t("Água e resistência"),
    description:
      t("A madeira tradicional expande com a umidade. O WPC mantém sua estabilidade estrutural, evitando deformações."),
  },
  {
    svg: iconGarantia,
    label: t("Durabilidade e resistência"),
    description:
      t("Enquanto a madeira convencional apodrece com o tempo, o WPC exibe robustez e imunidade à deterioração."),
  },
  {
    svg: iconPragas,
    label: t("Resistência a fungos e pragas"),
    description:
      t("Cupins, mofo e fungos são desafios para a madeira. O WPC resiste a esses elementos, garantindo longa vida útil."),
  },
  {
    svg: iconAntiMofo,
    label: t("Estabilidade e manutenção"),
    description:
      t("A madeira demanda manutenção frequente. O WPC tem alta estabilidade sob luz solar e exige pouca manutenção."),
  },
  {
    svg: iconReciclado,
    label: t("Sustentável"),
    description:
      t("Fabricado com fibras de madeira e resinas de alta performance, 100% reciclável para uma arquitetura responsável."),
  },
];

const FEATURED_SLUGS = ["casa-mansa", "casa-areia", "vaz-batel"] as const;
const projetosDestaque = FEATURED_SLUGS.map(
  (slug) => projetos.find((p) => p.slug === slug)!,
).filter(Boolean);

const LiveLescoAmostra = () => {
  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title={t("Solicite sua Amostra — Live Lesco | Madeira Plástica WPC Premium")}
        description={t("Solicite uma amostra da Lesco. Prioridade para arquitetos e construtoras com projetos em andamento. Avalie cor, textura e acabamento do WPC Premium na prática.")}
        path="/live-lesco-amostra"
        image={heroAmostra}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section className="relative rounded-[10px] overflow-hidden">
        <img
          src={heroAmostra}
          alt={t("Fachada em madeira plástica WPC Premium Lesco")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Esquerda — texto */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              {t("Solicite sua amostra")}
            </span>
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] mb-6">
              {t("Sinta a qualidade da Lesco nas suas mãos.")}
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md mb-6">
              {t("Damos prioridade a profissionais que já têm projeto em andamento — sejam arquitetos ou construtoras. Solicite sua amostra e avalie cor, textura e acabamento do WPC Premium antes de especificar.")}
            </p>
            <p className="font-body text-[13px] text-white/60 leading-relaxed max-w-md">
              {t("Preencha o formulário ao lado e nossa equipe entrará em contato para alinhar o envio da amostra.")}
            </p>
          </div>

          {/* Direita — formulário (iframe Live Lesco Amostra) */}
          <div className="rounded-[10px] overflow-hidden">
            <GhlForm
              formId="kFitazuzLyVtpAdFfnI4"
              formName="[10] [FORM] [LEAD LIVE SOLICITOU AMOSTRA]"
              title="[10] [FORM] [LEAD LIVE SOLICITOU AMOSTRA]"
              height={1118}
            />
          </div>
        </div>
      </section>

      {/* ========== QUEM TEM PRIORIDADE ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            {t("Quem tem prioridade")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            {t("Amostras prioritárias para quem já tem projeto em andamento.")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {prioridades.map((b) => (
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

      {/* ========== WPC vs MADEIRA COMUM ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            {t("WPC Premium x Madeira comum")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            {t("Por que a WPC Premium Lesco supera a madeira comum.")}
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
            {t("Portfólio")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 max-w-2xl">
            {t("Projetos inspiradores criados com a WPC Premium Lesco.")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {projetosDestaque.map((p) => (
              <div key={p.slug} className="flex flex-col">
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden relative">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/60 mt-3 ml-1">
                  {p.linha}
                </p>
                <h3 className="font-display text-lg font-normal text-dark ml-1">
                  {p.nome}
                </h3>
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
              {t("Vamos iniciar")}<br />{t("seu projeto?")}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5511948449044"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                {t("Falar no WhatsApp")}
              </a>
              <Link
                to="/catalogo-lesco"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                {t("Baixe nosso catálogo")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default LiveLescoAmostra;
