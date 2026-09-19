import { useState } from "react";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import { Link } from "@/components/AppLink";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { ProjetosDoProduto } from "@/components/altwood/ProjetosDoProduto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";
import projetoPanel1 from "@/assets/projeto-panel-1.webp";
import projetoPanel2 from "@/assets/projeto-panel-2.webp";
import projetoPanel3 from "@/assets/projeto-panel-3.webp";
import projetoPanel4 from "@/assets/projeto-panel-4.webp";
import projetoPanel5 from "@/assets/projeto-panel-5.webp";
import projetoPanel6 from "@/assets/projeto-panel-6.webp";

import modelo119x12 from "@/assets/panel-modelo-119x12.webp";
import modelo215x30 from "@/assets/panel-modelo-215x30.webp";
import modelo260x15 from "@/assets/panel-modelo-260x15.webp";
import modelo170x12 from "@/assets/panel-modelo-170x12.webp";
import modelo169x15 from "@/assets/panel-modelo-169x15.webp";
import modelo204x16 from "@/assets/panel-modelo-204x16.webp";
import modelo202x25 from "@/assets/panel-modelo-202x25.webp";
import modelo182x15 from "@/assets/panel-modelo-182x15.webp";
import modelo119x14 from "@/assets/panel-modelo-119x14.webp";
import modelo150x14 from "@/assets/panel-modelo-150x14.webp";
import modelo180x14 from "@/assets/panel-modelo-180x14.webp";
import modelo268x20 from "@/assets/panel-modelo-268x20.webp";
import modelo204x35 from "@/assets/panel-modelo-204x35.webp";
import modelo158x10 from "@/assets/panel-modelo-158x10.webp";
import modelo153x12 from "@/assets/panel-modelo-153x12.webp";
import modelo59x34 from "@/assets/panel-modelo-59x34.webp";
import modelo45x35 from "@/assets/panel-modelo-45x35.webp";
import swUvGoldenOak from "@/assets/swatch-uv-golden-oak.webp";
import swUvPremiumOak from "@/assets/swatch-uv-premium-oak.webp";
import swUvHickory from "@/assets/swatch-uv-hickory.webp";
import swUvTasmaniaOak from "@/assets/swatch-uv-tasmania-oak.webp";
import swUvMerbau from "@/assets/swatch-uv-merbau.webp";
import swUvUrbanOak from "@/assets/swatch-uv-urban-oak.webp";
import swSemUvGoldenOak from "@/assets/swatch-semuv-golden-oak.webp";
import swSemUvPremiumOak from "@/assets/swatch-semuv-premium-oak.webp";
import swSemUvHickory from "@/assets/swatch-semuv-hickory.webp";
import swSemUvTasmaniaOak from "@/assets/swatch-semuv-tasmania-oak.webp";
import swSemUvMerbau from "@/assets/swatch-semuv-merbau.webp";
import swSemUvUrbanOak from "@/assets/swatch-semuv-urban-oak.webp";

const heroImages = [projetoPanel1, projetoPanel2, projetoPanel3, projetoPanel4, projetoPanel5, projetoPanel6];

const acetinadasSwatches = [
  { nome: "Golden Oak", corAproximada: "#C4944A", imageSrc: swSemUvGoldenOak as string },
  { nome: "Premium Oak", corAproximada: "#A07040", imageSrc: swSemUvPremiumOak as string },
  { nome: "Hickory", corAproximada: "#8B6238", imageSrc: swSemUvHickory as string },
  { nome: "Tasmania Oak", corAproximada: "#7A5230", imageSrc: swSemUvTasmaniaOak as string },
  { nome: "Merbau", corAproximada: "#5C3420", imageSrc: swSemUvMerbau as string },
  { nome: "Urban Oak", corAproximada: "#6B5A4A", imageSrc: swSemUvUrbanOak as string },
];

const foscasSwatches = [
  { nome: "Golden Oak", corAproximada: "#C4944A", imageSrc: swUvGoldenOak as string },
  { nome: "Premium Oak", corAproximada: "#A07040", imageSrc: swUvPremiumOak as string },
  { nome: "Hickory", corAproximada: "#8B6238", imageSrc: swUvHickory as string },
  { nome: "Tasmania Oak", corAproximada: "#7A5230", imageSrc: swUvTasmaniaOak as string },
  { nome: "Merbau", corAproximada: "#5C3420", imageSrc: swUvMerbau as string },
  { nome: "Urban Oak", corAproximada: "#6B5A4A", imageSrc: swUvUrbanOak as string },
];

const modelos = [
  { nome: "Lesco Panel-119x12", medida: "119x12 mm", peso: "4,90 kg/m²", imageSrc: modelo119x12 },
  { nome: "Lesco Panel-215x30", medida: "215x30 mm", peso: "7,05 kg/m²", imageSrc: modelo215x30 },
  { nome: "Lesco Panel-260x15", medida: "260x15 mm", peso: "7,09 kg/m²", imageSrc: modelo260x15 },
  { nome: "Lesco Panel-170x12", medida: "170x12 mm", peso: "4,07 kg/m²", imageSrc: modelo170x12 },
  { nome: "Lesco Panel-169x15", medida: "169x15 mm", peso: "4,88 kg/m²", imageSrc: modelo169x15 },
  { nome: "Lesco Panel-204x16", medida: "204x16 mm", peso: "4,80 kg/m²", imageSrc: modelo204x16 },
  { nome: "Lesco Panel-202x25", medida: "202x25 mm", peso: "7,60 kg/m²", imageSrc: modelo202x25 },
  { nome: "Lesco Panel-182x15", medida: "182x15 mm", peso: "4,90 kg/m²", imageSrc: modelo182x15 },
  { nome: "Lesco Panel-119x14", medida: "119x14 mm", peso: "5,12 kg/m²", imageSrc: modelo119x14 },
  { nome: "Lesco Panel-150x14", medida: "150x14 mm", peso: "5,20 kg/m²", imageSrc: modelo150x14 },
  { nome: "Lesco Panel-180x14", medida: "180x14 mm", peso: "5,40 kg/m²", imageSrc: modelo180x14 },
  { nome: "Lesco Panel-268x20", medida: "268x20 mm", peso: "6,35 kg/m²", imageSrc: modelo268x20 },
  { nome: "Lesco Panel-204x35", medida: "204x35 mm", peso: "7,80 kg/m²", imageSrc: modelo204x35 },
  { nome: "Lesco Panel-158x10", medida: "158x10 mm", peso: "4,00 kg/m²", imageSrc: modelo158x10 },
  { nome: "Lesco Panel-153x12", medida: "153x12 mm", peso: "4,20 kg/m²", imageSrc: modelo153x12 },
  { nome: "Lesco Panel-59x34", medida: "59x34 mm", peso: "0,43 kg/m²", imageSrc: modelo59x34 },
  { nome: "Lesco Panel-45x35", medida: "45x35 mm", peso: "0,28 kg/m²", imageSrc: modelo45x35 },
];

const MantoPanel = () => {
  const [selectedAcetinada, setSelectedAcetinada] = useState<string | null>(null);
  const [selectedFosca, setSelectedFosca] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={t("Placa WPC Interior | Lesco Panel")}
        description={t("Placas WPC para interiores fabricadas a partir da combinação de fibras de madeira reciclada e resinas plásticas, oferecendo resistência, estética sofisticada e sustentabilidade.")}
        path="/placa-wpc-interior"
        image={projetoPanel1}
      />
      {/* Hero */}
      <HeroSection
        images={heroImages}
        headline="Lesco Panel"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">{t("Início")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-muted-foreground hover:text-primary transition-colors">{t("Madeira Ecológica")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Panel</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-primary/15" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-ink">Panel</span>
          <span className="flex-1 h-px bg-primary/15" />
        </div>
        <p className="text-[17px] text-muted-foreground leading-[1.7]">
          {t("Essa categoria de produtos oferece uma opção sustentável e sofisticada para transformar o interior ou exterior de qualquer espaço. Fabricado a partir de uma combinação de fibras de madeira reciclada e resinas plásticas, este material apresenta uma estética natural e calorosa, sem comprometer a durabilidade e a resistência.")}
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Cores Acetinadas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              {t("Cores Acetinadas Sem Tratamento UV")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
              {acetinadasSwatches.map((s) => (
                <SwatchCor
                  key={`ace-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  imageSrc={s.imageSrc}
                  selected={selectedAcetinada === s.nome}
                  onClick={() => setSelectedAcetinada(selectedAcetinada === s.nome ? null : s.nome)}
                />
              ))}
            </div>
          </div>

          {/* Cores Foscas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              {t("Cores Foscas Com Tratamento UV")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
              {foscasSwatches.map((s) => (
                <SwatchCor
                  key={`fos-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  imageSrc={s.imageSrc}
                  selected={selectedFosca === s.nome}
                  onClick={() => setSelectedFosca(selectedFosca === s.nome ? null : s.nome)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modelos */}
        <div className="mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-6">
            {t("Modelos")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    <p>✓ {t("Anti-cupim")}</p>
                    <p>✓ {t("Hidrofóbico")}</p>
                    <p>✓ {t("Anti-mofo")}</p>
                    <p>✓ {t("Resistência UV")}</p>
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

      {/* Obras do portfolio que usaram este produto */}
      <ProjetosDoProduto tipo="panel" linha="Lesco Panel" />

      {/* Navegação entre produtos */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-primary/15">
        <div className="flex justify-between items-center">
          <Link to="/forro-wpc" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
            ← Line
          </Link>
          <Link to="/madeira-ecologica-lesco" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
            {t("Madeira Ecológica")} →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default MantoPanel;
