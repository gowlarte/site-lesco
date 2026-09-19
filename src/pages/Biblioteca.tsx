import { Link } from "@/components/AppLink";
import { openWhatsAppPopup } from "@/lib/whatsappPopup";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GhlForm } from "@/components/GhlForm";
import { projetos } from "@/data/projetos";
import { site } from "@/config/site";

import heroBiblioteca from "@/assets/hero-home-altwood.webp";

import iconReciclado from "@/assets/madeira-ecologica/catalogo/reciclado.png";
import iconPersonalizavel from "@/assets/madeira-ecologica/catalogo/personalizavel.png";
import iconVidaUtil from "@/assets/madeira-ecologica/catalogo/vida-util.png";

const recursos = [
  {
    svg: iconReciclado,
    label: t("Catálogos completos"),
    description: t("Acesse os catálogos atualizados de todas as linhas Lesco em alta resolução."),
  },
  {
    svg: iconPersonalizavel,
    label: t("Fichas técnicas e blocos 3D"),
    description: t("Especificações detalhadas e blocos 3D prontos para incluir no seu projeto."),
  },
  {
    svg: iconVidaUtil,
    label: t("Imagens HD"),
    description: t("Banco de imagens em alta definição para apresentações e propostas."),
  },
];

const FEATURED_SLUGS = ["casa-mansa", "casa-una", "vaz-batel"] as const;
const projetosDestaque = FEATURED_SLUGS.map(
  (slug) => projetos.find((p) => p.slug === slug)!,
);

const Biblioteca = () => {


  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title={t("Biblioteca — Lesco")}
        description={t("Acesse catálogos, fichas técnicas, blocos 3D e imagens HD da Lesco para incluir nossos revestimentos no seu projeto.")}
        path="/biblioteca"
        image={heroBiblioteca}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section className="relative rounded-[10px] overflow-hidden">
        <img
          src={heroBiblioteca}
          alt={t("Revestimentos em madeira ecológica Lesco")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Esquerda — texto */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              {t("Biblioteca Lesco")}
            </span>
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] mb-6">
              {t("Tudo o que você precisa para especificar a Lesco no seu projeto.")}
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md">
              {t("Preencha o formulário para ter acesso a catálogos, fichas técnicas, blocos 3D e imagens HD dos nossos revestimentos em madeira ecológica.")}
            </p>
          </div>

          {/* Direita — formulário (iframe atual da biblioteca) */}
          <div className="rounded-[10px] overflow-hidden">
            <GhlForm
              formId={site.forms.biblioteca}
              formName="[01] [FORM] [ACESSAR BIBLIOTECA]"
              title="[01] [FORM] [ACESSAR BIBLIOTECA]"
              height={862}
            />
          </div>
        </div>
      </section>

      {/* ========== RECURSOS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="rotulo-tec text-primary/65 mb-4 text-center">
            {t("O que você encontra")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            {t("Recursos completos para o seu projeto.")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {recursos.map((r) => (
              <div key={r.label} className="bg-white/50 rounded-[10px] p-8">
                <img src={r.svg} alt="" aria-hidden className="h-10 w-10 mb-5 object-contain" />
                <h3 className="font-display text-xl text-dark mb-3 font-normal">{r.label}</h3>
                <p className="font-body text-[14px] leading-relaxed text-slate-950">{r.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== PROJETOS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="rotulo-tec text-primary/65 mb-4">
            {t("Portfólio")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 max-w-2xl">
            {t("Conheça alguns dos nossos projetos.")}
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
                <p className="rotulo text-primary/65 mt-3 ml-1">
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
              <AnimatedCounter end={15} suffix="+" />
              <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary-foreground/60 mt-3">
                {t("Anos de inovação")}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={100} suffix="%" />
              <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary-foreground/60 mt-3">
                {t("Produtos recicláveis")}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={3} />
              <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary-foreground/60 mt-3">
                {t("Certificações de qualidade")}
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
              {t("Vamos iniciar")}<br />{t("seu projeto?")}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={openWhatsAppPopup}
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                {t("Falar no WhatsApp")}
              </button>
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

export default Biblioteca;
