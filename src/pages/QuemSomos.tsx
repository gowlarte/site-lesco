import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Check } from "lucide-react";
import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";

const certifications = [
  "ISO 9001",
  "ISO 14001",
  "LEED",
  "ESG",
  "Green Building Council",
];

const QuemSomos = () => {
  return (
    <main>
      <SEO
        title={t("Quem Somos — Lesco")}
        description={t("Conheça a Lesco: Madeira Ecológica. Sobre nossa história, valores e certificações.")}
        path="/quem-somos"
      />
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-caption text-primary-foreground/40 mb-6">{t("Sobre a Lesco")}</p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-primary-foreground max-w-4xl">
            {t("Somos arquitetura feita para o amanhã.")}
          </h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-spacing bg-secondary">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <div className="flex gap-8">
              <div className="hidden md:block w-px bg-accent shrink-0 self-stretch" />
              <div className="space-y-8">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-[1.3] text-gray-950">
                  {t("A Lesco nasceu da convicção de que a arquitetura pode ser bonita, durável e responsável — ao mesmo tempo.")}
                </p>
                <p className="text-body-lg text-muted-foreground">
                  {t("Há mais de 15 anos, fomos pioneiros em trazer a madeira ecológica WPC para o Brasil. Hoje, evoluímos. Não somos mais apenas uma empresa de WPC — somos uma casa de linhas premium de revestimento que coloca arquitetos, designers e construtores em contato com superfícies extraordinárias.")}
                </p>
                <p className="text-body-lg text-muted-foreground">
                  {t("Cada material que selecionamos passa por um crivo rigoroso de estética, performance e sustentabilidade. Porque acreditamos que o revestimento certo não é um detalhe — é a assinatura de um projeto.")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Identidade */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto">
            <ScrollReveal>
              <h3 className="text-heading text-foreground mb-8">{t("O que somos")}</h3>
              <ul className="space-y-4">
                {[
                  t("Uma curadoria de materiais premium"),
                  t("Referência técnica para especificadores"),
                  t("Parceiros de projetos icônicos"),
                  t("Pioneiros em sustentabilidade aplicada"),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-lg text-muted-foreground">
                    <Check className="text-accent mt-1 shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h3 className="text-heading text-foreground mb-8">{t("O que não somos")}</h3>
              <ul className="space-y-4">
                {[
                  t("Um catálogo genérico de acabamentos"),
                  t("Uma marca que compete por preço"),
                  t("Fornecedores de soluções descartáveis"),
                  t("Uma empresa que acompanha tendências passageiras"),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-lg text-muted-foreground">
                    <span className="text-muted-foreground/40 mt-1 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="section-spacing bg-primary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-primary-foreground/10">
            {[
              { value: 15, suffix: "+", label: t("Anos de inovação") },
              { value: 100, suffix: "%", label: t("Produtos recicláveis") },
              { value: 1000, suffix: "+", label: t("Cases realizados") },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center px-8">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="mt-4 text-caption text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-subheading text-muted-foreground mb-4">{t("Certificações")}</p>
            <h2 className="text-heading text-foreground mb-12">
              {t("Compromisso com excelência")}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="px-6 py-3 border border-border bg-secondary text-foreground font-mono-tech text-sm tracking-wider text-gray-950"
                >
                  {cert}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16 max-w-2xl mx-auto">
              <p className="text-subheading text-muted-foreground mb-4">{t("Composição WPC")}</p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <span className="font-mono-tech text-sm text-foreground">{t("55% Pó de Madeira")}</span>
                <span className="text-muted-foreground/30">+</span>
                <span className="font-mono-tech text-sm text-foreground">35% HDPE</span>
                <span className="text-muted-foreground/30">+</span>
                <span className="font-mono-tech text-sm text-foreground">{t("10% Aditivos")}</span>
              </div>
              <p className="mt-6 text-body-lg text-muted-foreground">
                {t("Material 100% reciclável · Resistente a cupim · Hidrofóbico · Anti-mofo · 10 anos de garantia")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default QuemSomos;
