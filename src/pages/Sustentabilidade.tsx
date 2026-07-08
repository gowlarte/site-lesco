import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import heroFloresta from "@/assets/sustentabilidade/hero-floresta.webp";
import esgBadge from "@/assets/certifications/esg.webp";
import gbcBadge from "@/assets/certifications/gbc.webp";
import leedBadge from "@/assets/certifications/leed.webp";
import iso9001Badge from "@/assets/certifications/iso-9001.webp";
import iso14001Badge from "@/assets/certifications/iso-14001.webp";

const pilares = [
  { titulo: t("Material reciclado"), texto: t("Polímeros pós-consumo e pó de madeira de reflorestamento — desviando resíduos de aterros.") },
  { titulo: t("Vida útil longa"), texto: t("Garantia de 10 anos. Menos substituições, menos resíduo, menor pegada ambiental.") },
  { titulo: t("Manutenção mínima"), texto: t("Não requer vernizes, óleos ou solventes ao longo da vida útil do produto.") },
  { titulo: t("Certificações"), texto: t("ISO 9001, ISO 14001, LEED e diretrizes ESG aplicadas em toda a cadeia produtiva.") },
];

const certificacoes = [
  { src: esgBadge, alt: t("Selo ESG — Environmental Social Governance Certified") },
  { src: gbcBadge, alt: t("Selo Green Building Council") },
  { src: leedBadge, alt: t("Selo LEED — Leadership in Energy & Environmental Design") },
  { src: iso9001Badge, alt: t("Selo ISO 9001 — Quality Management System Certified") },
  { src: iso14001Badge, alt: t("Selo ISO 14001 — Environmental Management System Certified") },
];

import { SEO } from "@/components/SEO";

const Sustentabilidade = () => {
  return (
    <>
      <SEO
        title={t("Revestimento Sustentável — Lesco")}
        description={t("Compromisso ambiental da Lesco: revestimentos premium feitos com material reciclado, longa vida útil e certificações reconhecidas internacionalmente.")}
        path="/revestimento-sustentavel"
        image={heroFloresta}
      />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px] flex flex-col gap-[10px]">
        <section
          className="relative overflow-hidden rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-28 min-h-[60vh] flex flex-col justify-end"
        >
          <img
            src={heroFloresta}
            alt={t("Casa minimalista entre pinheiros, refletindo arquitetura responsável")}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="relative z-10">
            <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-white/80 mb-6">
              {t("Sustentabilidade")}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-white max-w-4xl">
              {t("Arquitetura responsável, do design ao descarte.")}
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[16px] md:text-[18px] font-light leading-[1.65] text-white/85">
              {t("Acreditamos que o revestimento certo precisa ser bonito, durável e responsável — ao mesmo tempo. Cada produto Lesco nasce de uma cadeia produtiva que respeita o ciclo da matéria.")}
            </p>
          </div>
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl lg:text-[40px] font-normal text-dark mb-12">
            {t("Nossos pilares")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {pilares.map((p) => (
              <div key={p.titulo}>
                <h3 className="font-display text-xl md:text-2xl font-normal text-dark mb-3">{p.titulo}</h3>
                <p className="font-body text-[15px] font-light leading-[1.65] text-dark/70 text-gray-950">{p.texto}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-dark/10">
            <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-10">
              {t("Certificações reconhecidas")}
            </p>
            <ul className="grid grid-cols-3 sm:grid-cols-5 gap-8 md:gap-12 items-center">
              {certificacoes.map((c) => (
                <li key={c.alt} className="flex items-center justify-center">
                  <img
                    src={c.src}
                    alt={c.alt}
                    loading="lazy"
                    className="w-full max-w-[100px] h-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/orcamento"
            className="inline-flex items-center mt-16 px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity duration-300"
          >
            {t("Falar com um especialista")}
          </Link>
        </section>
      </main>
    </>
  );
};

export default Sustentabilidade;

