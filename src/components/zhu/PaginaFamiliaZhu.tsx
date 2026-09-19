import { useState } from "react";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import { Link } from "@/components/AppLink";
import { ChevronRight } from "lucide-react";
import { CardModelo } from "@/components/altwood/CardModelo";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";
import { dadosTecnicosZhu, type FamiliaZhu } from "@/data/zhu";

/**
 * Página de uma família de produto da linha Zhú (bambu).
 *
 * Segue o formato das páginas de madeira ecológica (breadcrumb → introdução →
 * grade de modelos com CardModelo → especificação → dados técnicos →
 * navegação → orçamento). Difere em dois pontos, por falta de asset aprovado:
 * não tem o HeroSection com carrossel de fotos nem galeria de projetos, e o
 * herói é textual. Quando as fotos de aplicação chegarem, é só trocar o bloco
 * do herói por <HeroSection images={...} /> como em MantoLine.tsx.
 */
export const PaginaFamiliaZhu = ({ familia }: { familia: FamiliaZhu }) => {
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={familia.seoTitle}
        description={familia.seoDescription}
        path={familia.slug}
        image={familia.modelos[0]?.imagem}
      />

      {/* Hero */}
      <section className="bg-primary px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-40 md:pb-20">
        <p className="rotulo text-primary-foreground/70 mb-6">
          Zhú · {t("Bambu")}
        </p>
        <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-primary-foreground max-w-4xl">
          {familia.nome}
        </h1>
      </section>

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            {t("Início")}
          </Link>
          <ChevronRight className="w-3 h-3 text-primary/65" />
          <Link to="/zhu" className="text-muted-foreground hover:text-primary transition-colors">
            Zhú
          </Link>
          <ChevronRight className="w-3 h-3 text-primary/65" />
          <span className="text-[#525252]">{familia.curto}</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20 text-center">
        <p className="text-[17px] text-[#525252] leading-[1.7] max-w-3xl mx-auto">{familia.intro}</p>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        {/* Modelos */}
        <div className="mb-12">
          <span className="block rotulo text-[#525252] mb-6">
            {t("Modelos")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {familia.modelos.map((m) => (
              <CardModelo
                key={m.nome}
                titulo={m.nome}
                nome={m.nome}
                medida={m.medida}
                nota={m.uso}
                imageSrc={m.imagem}
              />
            ))}
          </div>
        </div>

        {/* Especificação — códigos e acabamentos do catálogo */}
        <div className="mb-12">
          <span className="block rotulo text-[#525252] mb-6">
            {t("Especificação")}
          </span>
          <div className="overflow-x-auto rounded-md bg-white">
            <table className="w-full text-left text-[13px] text-gray-950">
              <thead>
                <tr className="border-b border-primary/15">
                  <th className="px-5 py-3 font-medium whitespace-nowrap">{t("Modelo")}</th>
                  <th className="px-5 py-3 font-medium whitespace-nowrap">{t("Código")}</th>
                  <th className="px-5 py-3 font-medium whitespace-nowrap">{t("Medidas")}</th>
                  <th className="px-5 py-3 font-medium whitespace-nowrap">{t("Acabamento")}</th>
                  <th className="px-5 py-3 font-medium whitespace-nowrap">{t("Uso")}</th>
                  <th className="px-5 py-3 font-medium whitespace-nowrap">{t("Aplicação")}</th>
                </tr>
              </thead>
              <tbody>
                {familia.modelos.flatMap((m) =>
                  m.variantes.map((v, i) => (
                    <tr key={v.codigo} className="border-b border-primary/10 last:border-0">
                      <td className="px-5 py-3 whitespace-nowrap">{i === 0 ? m.nome : ""}</td>
                      <td className="px-5 py-3 font-mono text-[12px] whitespace-nowrap">{v.codigo}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{m.medida}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{v.acabamento}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{v.uso}</td>
                      <td className="px-5 py-3">{m.aplicacao}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dados Técnicos */}
        <div className="mt-12 mb-16">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="text-[#525252] hover:text-primary text-sm transition-colors duration-300 cursor-pointer flex items-center gap-1"
          >
            {t("Especificações técnicas")} {specsOpen ? "−" : "+"}
          </button>

          {specsOpen && (
            <div className="mt-6 bg-white rounded-[10px] p-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {dadosTecnicosZhu.map((d) => (
                  <div key={d.rotulo}>
                    <h4 className="rotulo text-[#525252] mb-3">
                      {d.rotulo}
                    </h4>
                    <div className="h-px bg-primary/15 mb-4" />
                    <p className="text-sm text-primary">{d.valor}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[12px] text-muted-foreground leading-relaxed">
                {t("Material de alto desempenho desenvolvido para aplicações arquitetônicas que exigem durabilidade, segurança e responsabilidade ambiental.")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navegação entre famílias */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-primary/15">
        <div className="flex justify-between items-center gap-4">
          <Link
            to={familia.anterior.href}
            className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
          >
            ← {familia.anterior.label}
          </Link>
          <Link
            to={familia.proximo.href}
            className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
          >
            {familia.proximo.label} →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};
