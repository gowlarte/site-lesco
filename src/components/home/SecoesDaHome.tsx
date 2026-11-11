import { Link } from "@/components/AppLink";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Manifesto360 } from "@/components/home/Manifesto360";
import { ProjetosHorizontal } from "@/components/home/ProjetosHorizontal";
import { MadeiraEcologicaSection } from "@/components/madeira-ecologica/MadeiraEcologicaSection";
import { ScrollMarqueeGallery } from "@/components/ScrollMarqueeGallery";

import partnerLogo1 from "@/assets/partners/logo-1.webp";
import partnerLogo2 from "@/assets/partners/logo-2.webp";
import partnerLogo3 from "@/assets/partners/logo-3.webp";
import partnerLogo4 from "@/assets/partners/logo-4.webp";

import { site } from "@/config/site";
import { t } from "@/i18n/t";

/**
 * Tudo o que a home tem DEPOIS do hero.
 *
 * Existe porque há duas homes: a que está no ar (src/pages/Index.tsx, com o
 * HeroSolucoes) e a prova da marca 2.0 (src/pages/LescoNew.tsx, com o
 * HeroNovo). Abaixo do hero as duas são a MESMA página — era esse o pedido,
 * "as páginas continuam as mesmas do site".
 *
 * Então o corpo mora aqui, e cada página escolhe só o próprio hero. Duplicar
 * estas seções daria duas cópias que divergiriam na primeira correção feita
 * em uma só delas, e a prova deixaria de provar.
 *
 * O espaçamento continua vindo do `gap-[10px]` do <main> de quem chama — por
 * isso aqui é um fragmento, e não uma <div> com classes próprias: uma caixa a
 * mais mudaria o gap em um dos lados.
 */
export function SecoesDaHome() {
  return (
    <>
      {/* ========== MANIFESTO + 360 — o hall da Biotique dentro do copy ========== */}
      <Manifesto360 />

      {/* ========== PROJETOS SELECIONADOS — palco fixo, navegação horizontal ========== */}
      <ProjetosHorizontal />

      {/* ========== MADEIRA ECOLÓGICA — SCROLL ANIMATION ========== */}
      <MadeiraEcologicaSection />

      {/* ========== SCROLL MARQUEE GALLERY ========== */}
      <ScrollMarqueeGallery />

      {/* ========== PARCEIROS 3D ========== */}
      {/* Temporariamente oculto
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
      */}

      {/* ========== SHOWROOM ==========
           Só texto: as fotos do showroom saíram a pedido. No desktop o título
           fica à esquerda e o resto à direita, para a faixa larga não ficar
           com uma metade vazia; no celular, empilhado. */}
      <section className="mx-[10px] rounded-[10px] overflow-hidden bg-secondary">
        <ScrollReveal>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-16 p-8 md:p-12 lg:p-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.1] md:leading-[1.1] text-primary mb-6 lg:mb-0">
                {t("Te esperamos")}<br />{t("para um")}<br />{t("cafezinho!")}
              </h2>

              <div>
                <p className="font-body text-[15px] font-light leading-[1.65] text-primary/80 max-w-[420px]">
                  {t("Visite nosso espaço em São Paulo – SP e conheça nossos materiais. Converse com um representante e adquira o kit de amostras para seus próximos projetos.")}
                </p>

                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span className="font-display text-[16px] font-medium text-primary">{t("São Paulo")}</span>
                  </div>
                  <p className="font-body text-[13px] font-light leading-[1.6] text-primary/70 max-w-[320px] mb-6">
                    {t("Avenida Nove de Julho, número 3147, CJ 22 – Jardim Paulista – São Paulo – SP")}
                  </p>
                  {/* O salmão da marca fica: o que muda é o texto. Branco
                      sobre ele media 2,22:1, ilegível ao sol. O mesmo tom
                      escuro do resto da página fecha 8,43:1 e a pílula
                      continua exatamente com a mesma cor. */}
                  <a
                    href={`https://wa.me/${site.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3 rounded-full bg-[hsl(10,50%,72%)] hover:bg-[hsl(10,50%,65%)] text-primary font-body text-[13px] font-medium tracking-[0.04em] transition-colors duration-300"
                  >
                    {t("Agende uma visita")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section
        className="py-24 md:py-32 lg:py-40 rounded-[10px] mx-[10px] mb-[10px]"
        style={{ background: "linear-gradient(105deg, #F0C9A8 0%, #E8DCC2 30%, #C8D2C4 60%, #8FA4B5 100%)" }}
      >
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.15] text-dark mb-10">
              {t("Vamos iniciar")}<br />{t("seu projeto?")}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/orcamento"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                {t("Solicite um orçamento")}
              </Link>
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
    </>
  );
}
