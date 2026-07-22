import { useState } from "react";
import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GhlForm } from "@/components/GhlForm";
import { projetos } from "@/data/projetos";
import { Check, X, ChevronDown, Star, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

import heroLive from "@/assets/projetos/casa-areia-2.webp";
import sobreLescoImg from "@/assets/projetos/casa-mansa-hero.webp";

import logoEchoRaw from "@/assets/linha-echotex-2.svg?raw";
import logoGeoRaw from "@/assets/linha-italflex-2.svg?raw";
import logoZhuRaw from "@/assets/linha-zhuzen-2.svg?raw";

import iconAntiMofo from "@/assets/madeira-ecologica/icon-anti-mofo.svg?raw";
import iconHidrofobico from "@/assets/madeira-ecologica/icon-hidrofobico.svg?raw";
import iconPragas from "@/assets/madeira-ecologica/icon-resistente-pragas.svg?raw";
import iconGarantia from "@/assets/madeira-ecologica/icon-garantia.svg?raw";
import iconReciclado from "@/assets/madeira-ecologica/icon-reciclado.svg?raw";

const diferenciais = [
  {
    svg: iconHidrofobico,
    label: t("Água e resistência"),
    description: t(
      "A madeira comum expande com a umidade. A Madeira Ecológica mantém sua estabilidade estrutural, evitando deformações.",
    ),
  },
  {
    svg: iconGarantia,
    label: t("Durabilidade e resistência"),
    description: t(
      "Enquanto a madeira convencional apodrece com o tempo, a Madeira Ecológica exibe robustez e imunidade à deterioração.",
    ),
  },
  {
    svg: iconPragas,
    label: t("Resistência a fungos e pragas"),
    description: t(
      "Cupins, mofo e fungos são desafios para a madeira comum. A Madeira Ecológica resiste a esses elementos, garantindo longa vida útil.",
    ),
  },
  {
    svg: iconAntiMofo,
    label: t("Estabilidade e manutenção"),
    description: t(
      "A madeira comum demanda manutenção frequente. A Madeira Ecológica tem alta estabilidade sob luz solar e exige pouca manutenção.",
    ),
  },
  {
    svg: iconReciclado,
    label: t("Sustentável"),
    description: t(
      "Fabricada com fibras de madeira e resinas de alta performance, 100% reciclável para uma arquitetura responsável.",
    ),
  },
];

/** Atributos-chave para a faixa em marquee. */
const atributosMarquee = [
  { svg: iconAntiMofo, label: t("Anti-mofo") },
  { svg: iconHidrofobico, label: t("Hidrofóbico") },
  { svg: iconPragas, label: t("Resistente a pragas") },
  { svg: iconReciclado, label: t("Sustentável") },
  { svg: iconGarantia, label: t("Baixa manutenção") },
];

/** Provas de credibilidade exibidas no hero. */
const provasHero = [
  t("Especificado por arquitetos e construtoras"),
  t("Materiais premium e sustentáveis"),
  t("Amostras enviadas para o seu projeto"),
];

/** Princípios reais do grupo Lesco. */
const principios = [
  {
    titulo: t("Alto padrão sem concessões"),
    texto: t(
      "Cada linha nasce para atender projetos exigentes — do detalhe técnico ao acabamento final. Especificamos com quem projeta e constrói obras de referência.",
    ),
  },
  {
    titulo: t("Sustentabilidade como projeto"),
    texto: t(
      "Materiais recicláveis, de longa vida útil e baixa manutenção. Levamos responsabilidade ambiental para dentro da arquitetura, sem abrir mão de estética.",
    ),
  },
  {
    titulo: t("Tecnologia aplicada"),
    texto: t(
      "Da Madeira Ecológica ao bambu e à pedra flexível, unimos inovação de materiais e engenharia para resolver, no mesmo elemento, performance e expressão.",
    ),
  },
];

/** Novas linhas Lesco — expandíveis. */
const novasLinhas = [
  {
    key: "echo",
    nome: "Echo",
    logo: logoEchoRaw,
    tagline: t("Tecido Acústico Moldado"),
    resumo: t(
      "Painéis de tecido acústico moldado para estúdios, home cinemas e ambientes corporativos que exigem performance sonora e identidade visual.",
    ),
    detalhes: [
      t("Performance acústica certificada, com absorção sonora controlada."),
      t("Variedade de cores, texturas e formatos para expressão arquitetônica."),
      t("Instalação rápida e modular, com soluções customizáveis sob projeto."),
    ],
  },
  {
    key: "geo",
    nome: "Geo",
    logo: logoGeoRaw,
    tagline: t("Revestimento Flexível"),
    resumo: t(
      "Revestimento flexível de estética mineral para fachadas, áreas molhadas e interiores — acabamento contínuo, leve e resistente.",
    ),
    detalhes: [
      t("Flexível e leve, de aplicação simples em superfícies diversas."),
      t("Indicado para uso interno e externo, resistente à umidade e ao calor."),
      t("Acabamento contínuo, sem juntas aparentes, com toque mineral."),
    ],
  },
  {
    key: "zhu",
    nome: "Zhú",
    logo: logoZhuRaw,
    tagline: t("Arquitetura em Bambu"),
    resumo: t(
      "Revestimentos, forros, luminárias e decorativos produzidos a partir do bambu — material ancestral, contemporâneo e radicalmente sustentável.",
    ),
    detalhes: [
      t("Matéria-prima 100% renovável e de rápido crescimento."),
      t("Estética natural com alta durabilidade e leveza."),
      t("Aplicação versátil em interiores, forros e mobiliário."),
    ],
  },
];

const paraQuemE = [
  t("Arquitetos e escritórios especificando projetos de alto padrão"),
  t("Construtoras e incorporadoras com obras em andamento"),
  t("Compradores com objetivo de aquisição em grande volume"),
  t("Profissionais que buscam materiais premium, sustentáveis e duráveis"),
];

const paraQuemNaoE = [
  t("Quem procura apenas revenda de material"),
  t("Projetos pequenos, caseiros ou de baixo investimento"),
  t("Quem não atua na área de arquitetura, construção ou especificação"),
];

/** Depoimentos reais (Google, 4,7 · 29 avaliações). */
const depoimentos = [
  {
    nome: "Eduardo",
    contexto: t("Arquiteto"),
    texto: t(
      "Empresa muito prestativa e rápida. Sou arquiteto e precisei solicitar alguns orçamentos e me enviaram prontamente, e ainda me ofereceram amostras dos produtos, que chegaram super rápidas! O material é de 1ª qualidade!!",
    ),
  },
  {
    nome: "Larissa Souza",
    contexto: t("Arquiteta"),
    texto: t(
      "Naturalidade e modernidade em um único material. Quando recebi as amostras fiquei encantada, prazo de entrega 100% fiel! Vou especificar mais vezes em meus projetos.",
    ),
  },
  {
    nome: "Romeu Quaresma Neto",
    contexto: t("Cliente"),
    texto: t(
      "Foi boa a experiência. O material é bem funcional e estético. Os profissionais envolvidos são bem interessados e explicaram bem.",
    ),
  },
  {
    nome: "Marzane Oliveira",
    contexto: t("Cliente"),
    texto: t(
      "Excelente demonstrativo sobre os produtos e diversas soluções de aplicação possíveis, apresentação prática e bem desenvolvida por parte da equipe.",
    ),
  },
  {
    nome: "Carlos Antonio dos Santos",
    contexto: t("Cliente"),
    texto: t(
      "Superou minhas expectativas. A apresentação foi bem desenvolvida e expõe tematicamente as técnicas de aplicação.",
    ),
  },
];

const FEATURED_SLUGS = ["casa-mansa", "casa-areia", "vaz-batel"] as const;
const projetosDestaque = FEATURED_SLUGS.map(
  (slug) => projetos.find((p) => p.slug === slug)!,
).filter(Boolean);

const initials = (nome: string) =>
  nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const scrollToForm = () => {
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const LiveLesco = () => {
  const [linhaAberta, setLinhaAberta] = useState<string | null>("echo");

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title={t("Live Lesco — Madeira Ecológica de Alto Padrão")}
        description={t("Solicite sua amostra da Lesco. Revestimentos em Madeira Ecológica que unem sofisticação, tecnologia e sustentabilidade para projetos arquitetônicos de alto padrão.")}
        path="/live-lesco"
        image={heroLive}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section id="form" className="relative rounded-[10px] overflow-hidden scroll-mt-[110px]">
        <img
          src={heroLive}
          alt={t("Revestimentos em Madeira Ecológica Premium Lesco")}
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
              {t("Madeira Ecológica de Alto Padrão para Projetos Exclusivos.")}
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md mb-8">
              {t("Os revestimentos em Madeira Ecológica Premium da Lesco unem sofisticação, tecnologia e sustentabilidade em cada detalhe. Preencha o formulário e transforme seus projetos em obras magníficas.")}
            </p>

            {/* Provas de credibilidade */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-xl text-white">4,7</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </span>
              <span className="font-body text-[12px] text-white/70">{t("29 avaliações no Google")}</span>
            </div>
            <ul className="space-y-3">
              {provasHero.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent/25">
                    <Check size={12} className="text-accent" />
                  </span>
                  <span className="font-body text-[13px] md:text-[14px] text-white/85 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
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

      {/* ========== SOBRE A LESCO ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="rounded-[10px] overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full">
              <img
                src={sobreLescoImg}
                alt={t("Projeto de alto padrão com revestimentos Lesco")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark mb-4">
                {t("Quem conduz")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-6">
                {t("Sobre a Lesco.")}
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-dark leading-relaxed mb-10 max-w-xl">
                {t("A Lesco desenvolve materiais de revestimento premium para arquitetura de alto padrão. Unimos tecnologia, estética e sustentabilidade em linhas completas — da Madeira Ecológica ao bambu e à pedra flexível — especificadas por arquitetos e construtoras nas obras mais exigentes do país.")}
              </p>
              <div className="space-y-[10px]">
                {principios.map((p) => (
                  <div key={p.titulo} className="bg-white/50 rounded-[10px] p-6">
                    <h3 className="font-display text-lg text-dark mb-2 font-normal">{p.titulo}</h3>
                    <p className="font-body text-[14px] text-dark leading-relaxed">{p.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== NOVAS LINHAS (EXPANDÍVEIS) ========== */}
      <section className="bg-dark rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60 mb-4 text-center">
            {t("Novas linhas Lesco")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-primary-foreground mb-12 text-center max-w-2xl mx-auto">
            {t("Três novas linhas para ampliar seus projetos.")}
          </h2>
          <div className="max-w-3xl mx-auto space-y-[10px]">
            {novasLinhas.map((linha) => {
              const aberta = linhaAberta === linha.key;
              return (
                <div key={linha.key} className="bg-white/5 rounded-[10px] border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setLinhaAberta(aberta ? null : linha.key)}
                    className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left"
                    aria-expanded={aberta}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className="[&_svg]:h-[20px] [&_svg]:w-auto [&_svg]:fill-current [&_svg_*]:fill-current text-primary-foreground"
                        dangerouslySetInnerHTML={{ __html: linha.logo }}
                        aria-label={linha.nome}
                      />
                      <span className="font-body text-[12px] uppercase tracking-[0.14em] text-primary-foreground/50">
                        {linha.tagline}
                      </span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "text-primary-foreground/70 shrink-0 transition-transform duration-300",
                        aberta && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                      aberta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-8">
                        <p className="font-body text-[15px] text-primary-foreground/80 leading-relaxed mb-5">
                          {linha.resumo}
                        </p>
                        <ul className="space-y-2.5">
                          {linha.detalhes.map((d) => (
                            <li key={d} className="flex items-start gap-3">
                              <Check size={16} className="text-accent mt-1 shrink-0" />
                              <span className="font-body text-[14px] text-primary-foreground/70 leading-relaxed">
                                {d}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== MADEIRA ECOLÓGICA vs MADEIRA COMUM ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24 overflow-hidden">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark mb-4 text-center">
            {t("Madeira Ecológica x Madeira comum")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            {t("Por que a Madeira Ecológica Lesco supera a madeira comum.")}
          </h2>
        </ScrollReveal>

        {/* Faixa marquee de atributos-chave */}
        <div
          className="relative mb-12 -mx-6 md:-mx-12 lg:-mx-20"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-[10px] hover:[animation-play-state:paused]">
            {[...atributosMarquee, ...atributosMarquee, ...atributosMarquee].map((a, i) => (
              <div
                key={`${a.label}-${i}`}
                className="flex items-center gap-3 bg-white/60 rounded-[10px] px-6 py-4 shrink-0"
              >
                <span
                  className="[&>svg]:h-6 [&>svg]:w-6 text-dark"
                  dangerouslySetInnerHTML={{ __html: a.svg }}
                  aria-hidden
                />
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-dark whitespace-nowrap">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          {diferenciais.map((b, i) => (
            <ScrollReveal key={b.label} delay={i * 0.1}>
              <div className="bg-white/50 rounded-[10px] p-8 h-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1.5 hover:shadow-lg">
                <div
                  className="[&>svg]:h-10 [&>svg]:w-10 text-dark mb-5"
                  dangerouslySetInnerHTML={{ __html: b.svg }}
                  aria-hidden
                />
                <h3 className="font-display text-xl text-dark mb-3 font-normal">{b.label}</h3>
                <p className="font-body text-[14px] text-dark leading-relaxed">{b.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========== PARA QUEM É / PARA QUEM NÃO É ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark mb-4 text-center">
            {t("Para você decidir antes")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-2xl mx-auto">
            {t("Esta live é (e não é) para todo mundo.")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] max-w-4xl mx-auto">
            <div className="bg-white/60 rounded-[10px] p-8 border-l-2 border-accent">
              <p className="font-body text-[12px] uppercase tracking-[0.14em] text-dark mb-6">
                {t("Para quem é")}
              </p>
              <ul className="space-y-4">
                {paraQuemE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                      <Check size={13} className="text-accent" />
                    </span>
                    <span className="font-body text-[15px] text-dark leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/60 rounded-[10px] p-8 border-l-2 border-dark/30">
              <p className="font-body text-[12px] uppercase tracking-[0.14em] text-dark mb-6">
                {t("Para quem não é")}
              </p>
              <ul className="space-y-4">
                {paraQuemNaoE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-dark/15">
                      <X size={13} className="text-dark" />
                    </span>
                    <span className="font-body text-[15px] text-dark leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== DEPOIMENTOS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark mb-4 text-center">
            {t("Quem já especificou")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-4 text-center max-w-2xl mx-auto">
            {t("O que arquitetos e clientes dizem da Lesco.")}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="font-display text-2xl text-dark">4,7</span>
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
            </span>
            <span className="font-body text-[13px] text-dark/60">{t("29 avaliações no Google")}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {depoimentos.map((d) => (
              <div key={d.nome} className="bg-white/60 rounded-[10px] p-8 flex flex-col">
                <span className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </span>
                <p className="font-body text-[14px] text-dark leading-relaxed flex-1">"{d.texto}"</p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-dark/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark text-white font-display text-[13px]">
                    {initials(d.nome)}
                  </span>
                  <div>
                    <p className="font-display text-[15px] text-dark leading-tight">{d.nome}</p>
                    <p className="font-body text-[12px] text-dark/50">{d.contexto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== PROJETOS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark mb-4">
            {t("Portfólio")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 max-w-2xl">
            {t("Projetos inspiradores criados com a Madeira Ecológica Lesco.")}
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
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-dark text-white font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:brightness-110 transition-all duration-250"
              >
                <ArrowUp size={16} />
                {t("Preencher o formulário")}
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

      {/* ========== LEGAL ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/politica-de-privacidade"
            className="font-body text-[12px] text-dark/60 hover:text-dark transition-colors"
          >
            {t("Política de Privacidade")}
          </Link>
          <span className="hidden sm:inline text-dark/20">·</span>
          <Link
            to="/termos-de-servico"
            className="font-body text-[12px] text-dark/60 hover:text-dark transition-colors"
          >
            {t("Termos de Serviço")}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LiveLesco;
