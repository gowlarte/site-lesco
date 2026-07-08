import { useState } from "react";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import heroShield1 from "@/assets/hero-shield-1.webp";
import heroShield2 from "@/assets/hero-shield-2.webp";
import heroShield3 from "@/assets/hero-shield-3.webp";
import heroShield4 from "@/assets/hero-shield-4.webp";
import { Link } from "@/components/AppLink";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import projetoShield1 from "@/assets/projeto-shield-1.webp";
import projetoShield2 from "@/assets/projeto-shield-2.webp";
import projetoShield3 from "@/assets/projeto-shield-3.webp";
import projetoShield4 from "@/assets/projeto-shield-4.webp";
import projetoShield5 from "@/assets/projeto-shield-5.webp";
import projetoShield6 from "@/assets/projeto-shield-6.webp";

import imgShield124x155 from "@/assets/shield-124x155.webp";
import imgShield124x20 from "@/assets/shield-124x20.webp";
import imgShield184x20 from "@/assets/shield-184x20.webp";
import imgShield149x20 from "@/assets/shield-149x20.webp";
import imgShield217x35 from "@/assets/shield-217x35.webp";
import imgShield169x25 from "@/assets/shield-169x25.webp";
import imgShield217x25 from "@/assets/shield-217x25.webp";
import imgShield219x385 from "@/assets/shield-219x385.webp";
import imgShield124x50 from "@/assets/shield-124x50.webp";

import swEscBlack from "@/assets/swatch-black.webp";
import swEscLilyWhite from "@/assets/swatch-lily-white.webp";
import swEscIpe from "@/assets/swatch-ipe.webp";
import swEscTeak from "@/assets/swatch-teak.webp";
import swEscOak from "@/assets/swatch-oak.webp";
import swEscWalnut from "@/assets/swatch-walnut.webp";
import swEscRedCedar from "@/assets/swatch-red-cedar.webp";
import swEscWeatherwood from "@/assets/swatch-weatherwood.webp";

import swTexLilyWhite from "@/assets/swatch-texturizado-lily-white.webp";
import swTexIpe from "@/assets/swatch-texturizado-ipe.webp";
import swTexTeak from "@/assets/swatch-texturizado-teak.webp";
import swTexOak from "@/assets/swatch-texturizado-oak.webp";
import swTexWalnut from "@/assets/swatch-texturizado-walnut.webp";
import swTexRedCedar from "@/assets/swatch-texturizado-red-cedar.webp";
import swTexWeatherwood from "@/assets/swatch-texturizado-weatherwood.webp";

const escovadasSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A", imageSrc: swEscBlack },
  { nome: "Lily White", corAproximada: "#E8E0D5", imageSrc: swEscLilyWhite },
  { nome: "Ipê", corAproximada: "#6B4226", imageSrc: swEscIpe },
  { nome: "Teak", corAproximada: "#8B5E3C", imageSrc: swEscTeak },
  { nome: "Oak", corAproximada: "#A0784A", imageSrc: swEscOak },
  { nome: "Walnut", corAproximada: "#4A3728", imageSrc: swEscWalnut },
  { nome: "Red Cedar", corAproximada: "#7D3E2A", imageSrc: swEscRedCedar },
  { nome: "Weatherwood", corAproximada: "#6B6560", imageSrc: swEscWeatherwood },
];

const texturizadasSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A", imageSrc: undefined as string | undefined },
  { nome: "Lily White", corAproximada: "#E8E0D5", imageSrc: swTexLilyWhite as string | undefined },
  { nome: "Ipê", corAproximada: "#6B4226", imageSrc: swTexIpe },
  { nome: "Teak", corAproximada: "#8B5E3C", imageSrc: swTexTeak },
  { nome: "Oak", corAproximada: "#A0784A", imageSrc: swTexOak },
  { nome: "Walnut", corAproximada: "#4A3728", imageSrc: swTexWalnut },
  { nome: "Red Cedar", corAproximada: "#7D3E2A", imageSrc: swTexRedCedar },
  { nome: "Weatherwood", corAproximada: "#6B6560", imageSrc: swTexWeatherwood },
];

const modelos = [
  { nome: "Madeira Ecológica-Shield-124x15,5", medida: "124x15,5 mm", peso: "10,50 kg/m²", imageSrc: imgShield124x155 },
  { nome: "Madeira Ecológica-Shield-124x20", medida: "124x20 mm", peso: "13,50 kg/m²", imageSrc: imgShield124x20 },
  { nome: "Madeira Ecológica-Shield-184x20", medida: "184x20 mm", peso: "13,28 kg/m²", imageSrc: imgShield184x20 },
  { nome: "Madeira Ecológica-Shield-149x20", medida: "149x20 mm", peso: "14,30 kg/m²", imageSrc: imgShield149x20 },
  { nome: "Madeira Ecológica-Shield-217x35", medida: "217x35 mm", peso: "14,15 kg/m²", imageSrc: imgShield217x35 },
  { nome: "Madeira Ecológica-Shield-169x25", medida: "169x25 mm", peso: "14,60 kg/m²", imageSrc: imgShield169x25 },
  { nome: "Madeira Ecológica-Shield-217x25", medida: "217x25 mm", peso: "13,25 kg/m²", imageSrc: imgShield217x25 },
  { nome: "Madeira Ecológica-Shield-219x38,5", medida: "219x38,5 mm", peso: "15,60 kg/m²", imageSrc: imgShield219x385 },
  { nome: "Madeira Ecológica-Shield-124x50", medida: "124x50 mm", peso: "15,60 kg/m²", imageSrc: imgShield124x50 },
];

const galeriaItems = [
  { imageSrc: projetoShield1, legenda: t("Edifício comercial — revestimento Shield em fachada"), ratio: "4:3" as const },
  { imageSrc: projetoShield2, legenda: t("Arena/pavilhão — fachada e cobertura Shield"), ratio: "4:3" as const },
  { imageSrc: projetoShield3, legenda: t("Terraço e área gourmet — teto em Shield"), ratio: "4:3" as const },
  { imageSrc: projetoShield4, legenda: t("Edifício corporativo — fachada Shield + estrutura metálica"), ratio: "4:3" as const },
  { imageSrc: projetoShield5, legenda: t("Resort à beira-mar — revestimento Shield em varandas"), ratio: "4:3" as const },
  { imageSrc: projetoShield6, legenda: t("Residência contemporânea — Shield e brise em fachada"), ratio: "3:4" as const },
];

const MantoShield = () => {
  const [selectedEscovada, setSelectedEscovada] = useState<string | null>(null);
  const [selectedTexturizada, setSelectedTexturizada] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={t("Madeira Ecológica para Fachada | Lesco Shield")}
        description={t("Nossa madeira ecológica para fachadas e painéis verticais combina tecnologia e durabilidade do plástico com a beleza estética da madeira, criando um material de alta resistência e longa durabilidade.")}
        path="/madeira-ecologica-para-fachada"
        image={heroShield3}
      />
      {/* Hero */}
      <HeroSection
        images={[heroShield1, heroShield2, heroShield3, heroShield4]}
        headline="Lesco Shield"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-[#7F7F7F] hover:text-white transition-colors">{t("Início")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-[#7F7F7F] hover:text-white transition-colors">{t("Madeira Ecológica")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Shield</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8956C]">Shield</span>
          <span className="flex-1 h-px bg-[#1E1E1E]" />
        </div>
        <p className="text-[17px] text-[#7F7F7F] leading-[1.7] whitespace-pre-line">
          {t(`Os revestimentos Lesco representam um paradigma de qualidade e sofisticação para aplicações tanto internas quanto externas. Ele combina tecnologia e durabilidade do plástico com a beleza estética da madeira, criando um material de alta resistência e durabilidade, sem perder o aspecto natural.

          Explore as características e benefícios desses perfis, que destacam suas aplicações versáteis e seu potencial para aprimorar tanto o desempenho quanto a aparência de uma variedade de estruturas.

          Aplicações: fachadas e painéis verticais.
          Garantia: 10 anos.`)}
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Cores Escovadas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              {t("Cores Escovadas")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              {escovadasSwatches.map((s) => (
                <SwatchCor
                  key={`esc-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  imageSrc={s.imageSrc}
                  selected={selectedEscovada === s.nome}
                  onClick={() => setSelectedEscovada(selectedEscovada === s.nome ? null : s.nome)}
                />
              ))}
            </div>
          </div>

          {/* Cores Texturizadas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              {t("Cores Texturizadas")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              {texturizadasSwatches.map((s) => (
                <SwatchCor
                  key={`tex-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  imageSrc={s.imageSrc}
                  selected={selectedTexturizada === s.nome}
                  onClick={() => setSelectedTexturizada(selectedTexturizada === s.nome ? null : s.nome)}
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
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {modelos.map((m) => (
              <CardModelo key={m.nome} nome={m.nome} medida={m.medida} peso={m.peso} imageSrc={m.imageSrc} />
            ))}
          </div>
        </div>

        {/* Dados Técnicos */}
        <div className="mt-12 mb-16">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="text-[#7F7F7F] hover:text-white text-sm transition-colors duration-300 cursor-pointer flex items-center gap-1"
          >
            {t("Especificações técnicas")} {specsOpen ? "−" : "+"}
          </button>

          {specsOpen && (
            <div className="mt-6 bg-[#141414] rounded-[12px] p-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Material")}</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <div className="text-sm text-white font-mono space-y-1">
                    <p>{t("WPC — Wood-Plastic Composite")}</p>
                    <p className="text-[#7F7F7F]">{t("55% pó de madeira natural")}</p>
                    <p className="text-[#7F7F7F]">{t("35% HPDE reciclado")}</p>
                    <p className="text-[#7F7F7F]">{t("10% aditivos")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Resistência")}</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <div className="text-sm text-white space-y-1">
                    <p>{t("✓ Anti-cupim")}</p>
                    <p>{t("✓ Hidrofóbico")}</p>
                    <p>{t("✓ Anti-mofo")}</p>
                    <p>{t("✓ Resistência UV")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Certificações")}</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <p className="text-sm text-white">ISO 9001 · ISO 14001 · LEED · ESG</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Garantia")}</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <p className="text-sm text-white">{t("10 anos")}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">{t("Subestrutura Recomendada")}</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <div className="text-sm text-white font-mono space-y-1">
                    <p>{t("Aplicação em parede:")} <span className="text-[#7F7F7F]">{t("espaçamento 80 cm entre estruturas")}</span></p>
                    <p>{t("Aplicação em teto:")} <span className="text-[#7F7F7F]">{t("espaçamento 60 cm entre estruturas")}</span></p>
                    <p>{t("Fixação:")} <span className="text-[#7F7F7F]">{t("parafuso Philips autobrocante flangeado ou cabeça panela 4,2×19 mm")}</span></p>
                    <p>{t("Estrutura auxiliar:")} <span className="text-[#7F7F7F]">{t("alumínio ou aço — 50×50 mm · 38×38 mm · 50×25 mm")}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Galeria de Projetos */}
      <div className="px-6 md:px-12 lg:px-20 py-24">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8956C] mb-3">{t("Projetos")}</span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-gray-950">{t("Realizações com Lesco Shield")}</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {galeriaItems.map((item, i) => (
            <div key={i} className="break-inside-avoid">
              <CardProjeto imageSrc={item.imageSrc} legenda={item.legenda} ratio={item.ratio} />
            </div>
          ))}
        </div>
      </div>

      {/* Navegação entre produtos */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-[#1E1E1E]">
        <div className="flex justify-between items-center">
          <Link to="/brise-madeira-ecologica" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            ← Brise
          </Link>
          <Link to="/madeira-ecologica-para-deck" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            Deck →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default MantoShield;
