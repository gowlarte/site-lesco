import { useState } from "react";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import { Link } from "@/components/AppLink";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import modelo40x45 from "@/assets/line-modelo-40x45.webp";
import modelo40x100 from "@/assets/line-modelo-40x100.webp";
import modelo100x20 from "@/assets/line-modelo-100x20.webp";
import projetoLine1 from "@/assets/projeto-line-1.webp";
import projetoLine2 from "@/assets/projeto-line-2.webp";
import projetoLine3 from "@/assets/projeto-line-3.webp";
import swSemUvGoldenOak from "@/assets/swatch-semuv-golden-oak.webp";
import swSemUvPremiumOak from "@/assets/swatch-semuv-premium-oak.webp";
import swSemUvHickory from "@/assets/swatch-semuv-hickory.webp";
import swSemUvTasmaniaOak from "@/assets/swatch-semuv-tasmania-oak.webp";
import swSemUvMerbau from "@/assets/swatch-semuv-merbau.webp";
import swSemUvUrbanOak from "@/assets/swatch-semuv-urban-oak.webp";

const heroImages = [projetoLine1, projetoLine2, projetoLine3];

const coresSwatches = [
  { nome: "Golden Oak", corAproximada: "#C4944A", imageSrc: swSemUvGoldenOak as string },
  { nome: "Premium Oak", corAproximada: "#A07040", imageSrc: swSemUvPremiumOak as string },
  { nome: "Hickory", corAproximada: "#8B6238", imageSrc: swSemUvHickory as string },
  { nome: "Tasmania Oak", corAproximada: "#7A5230", imageSrc: swSemUvTasmaniaOak as string },
  { nome: "Merbau", corAproximada: "#5C3420", imageSrc: swSemUvMerbau as string },
  { nome: "Urban Oak", corAproximada: "#6B5A4A", imageSrc: swSemUvUrbanOak as string },
];

const modelos = [
  { nome: "Lesco Line-40x45", medida: "40x45 mm", peso: "3,63 kg/m²", imageSrc: modelo40x45 },
  { nome: "Lesco Line-40x100", medida: "40x100 mm", peso: "6,63 kg/m²", imageSrc: modelo40x100 },
  { nome: "Lesco Line-100x20", medida: "100x20 mm", peso: "3 kg/m²", imageSrc: modelo100x20 },
];

const galeriaItems = [
  { imageSrc: projetoLine1, legenda: t("Forro WPC em espaço comercial amplo"), ratio: "4:3" as const },
  { imageSrc: projetoLine2, legenda: t("Detalhe de ripado em forro contínuo"), ratio: "4:3" as const },
  { imageSrc: projetoLine3, legenda: t("Forro WPC com iluminação pendente"), ratio: "3:4" as const },
];

const MantoLine = () => {
  const [selectedCor, setSelectedCor] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={t("Forro WPC | Lesco Line")}
        description={t("Forros WPC retardantes ao fogo, resistentes à água e com baixo custo de manutenção. Uma solução sustentável que combina beleza natural e desempenho tecnológico.")}
        path="/forro-wpc"
        image={projetoLine1}
      />
      {/* Hero */}
      <HeroSection
        images={heroImages}
        headline="Lesco Line"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">{t("Início")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-muted-foreground hover:text-primary transition-colors">{t("Madeira Ecológica")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Line</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-primary/15" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-ink">Line</span>
          <span className="flex-1 h-px bg-primary/15" />
        </div>
        <p className="text-[17px] text-muted-foreground leading-[1.7]">
          {t("No mundo da arquitetura e design de interiores, a busca por materiais que combinem beleza natural e desempenho tecnológico está em alta. Os forros com tecnologia WPC emergem como uma solução sustentável, unindo o calor da madeira à resistência do plástico. Além de contar com características retardantes ao fogo, resistência à água e baixo custo de manutenção.")}
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
            {t("Cores Acetinadas sem tratamento UV")}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-4">
            {coresSwatches.map((s) => (
              <SwatchCor
                key={s.nome}
                nome={s.nome}
                corAproximada={s.corAproximada}
                imageSrc={s.imageSrc}
                selected={selectedCor === s.nome}
                onClick={() => setSelectedCor(selectedCor === s.nome ? null : s.nome)}
              />
            ))}
          </div>
        </div>

        {/* Modelos */}
        <div className="mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-6">
            {t("Modelos")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {modelos.map((m) => (
              <CardModelo key={m.nome} nome={m.nome} medida={m.medida} peso={m.peso} imageSrc={m.imageSrc} />
            ))}
          </div>
        </div>

        {/* Dados Técnicos */}
        <div className="mt-12 mb-16">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300 cursor-pointer flex items-center gap-1"
          >
            {t("Especificações técnicas")} {specsOpen ? "−" : "+"}
          </button>

          {specsOpen && (
            <div className="mt-6 bg-white rounded-[12px] p-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Material")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <div className="text-sm text-primary font-mono space-y-1">
                    <p>WPC — Wood-Plastic Composite</p>
                    <p className="text-muted-foreground">{t("55% pó de madeira natural")}</p>
                    <p className="text-muted-foreground">{t("35% HPDE reciclado")}</p>
                    <p className="text-muted-foreground">{t("10% aditivos")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Resistência")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <div className="text-sm text-primary space-y-1">
                    <p>{t("✓ Anti-cupim")}</p>
                    <p>{t("✓ Hidrofóbico")}</p>
                    <p>{t("✓ Anti-mofo")}</p>
                    <p>{t("✓ Retardante ao fogo")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Certificações")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <p className="text-sm text-primary">ISO 9001 · ISO 14001 · LEED · ESG</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Garantia")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <p className="text-sm text-primary">{t("10 anos")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Galeria de Projetos */}
      {galeriaItems.length > 0 && (
        <div className="px-6 md:px-12 lg:px-20 py-24">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-ink mb-3">{t("Projetos")}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-gray-950">{t("Realizações com")} Lesco Line</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {galeriaItems.map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <CardProjeto imageSrc={item.imageSrc} legenda={item.legenda} ratio={item.ratio} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navegação entre produtos */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-primary/15">
        <div className="flex justify-between items-center">
          <Link to="/madeira-ecologica-para-deck" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
            ← Deck
          </Link>
          <Link to="/placa-wpc-interior" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
            Panel →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default MantoLine;
