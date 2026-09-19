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

import modelo97 from "@/assets/deck-modelo-97x22.webp";
import modelo140 from "@/assets/deck-modelo-140x22.webp";
import modelo150 from "@/assets/deck-modelo-150x22.webp";
import projetoDeck1 from "@/assets/projeto-deck-1.webp";
import projetoDeck2 from "@/assets/projeto-deck-2.webp";
import projetoDeck3 from "@/assets/projeto-deck-3.webp";
import projetoDeck4 from "@/assets/projeto-deck-4.webp";
import projetoDeck5 from "@/assets/projeto-deck-5.webp";

const heroImages = [projetoDeck2, projetoDeck1, projetoDeck3, projetoDeck4, projetoDeck5];

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
  { nome: "Lesco Deck-97x22", medida: "97x22 mm", peso: "20,0 kg/m²", imageSrc: modelo97 },
  { nome: "Lesco Deck-140x22", medida: "140x22 mm", peso: "28 kg/m²", imageSrc: modelo140 },
  { nome: "Lesco Deck-150x22", medida: "150x22 mm", peso: "18,75 kg/m²", imageSrc: modelo150 },
];

const MantoDeck = () => {
  const [selectedEscovada, setSelectedEscovada] = useState<string | null>(null);
  const [selectedTexturizada, setSelectedTexturizada] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={t("Madeira Ecológica para Deck | Lesco Deck")}
        description={t("Madeira ecológica para decks, piscinas e áreas externas. Solução ideal para projetos residenciais, comerciais e públicos que buscam criar ambientes externos sofisticados e duráveis.")}
        path="/madeira-ecologica-para-deck"
        image={projetoDeck1}
      />
      {/* Hero */}
      <HeroSection
        images={heroImages}
        headline="Lesco Deck"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">{t("Início")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-muted-foreground hover:text-primary transition-colors">{t("Madeira Ecológica")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Deck</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <p className="text-[17px] text-muted-foreground leading-[1.7] max-w-[62ch] mx-auto">
          {t("Os decks de madeira ecológica representam uma escolha inteligente e elegante para aprimorar espaços externos. Eles são uma solução ideal para projetos residenciais, comerciais e públicos que buscam criar ambientes externos excepcionais que perduram ao longo do tempo.")}
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Cores Escovadas */}
          <div>
            <span className="block rotulo text-[#525252] mb-4">
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
            <span className="block rotulo text-[#525252] mb-4">
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
          <span className="block rotulo text-[#525252] mb-6">
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
            <div className="mt-6 bg-white rounded-[10px] p-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="rotulo text-[#525252] mb-3">{t("Material")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <div className="text-sm text-primary font-mono space-y-1">
                    <p>WPC (Wood-Plastic Composite)</p>
                    <p className="text-muted-foreground">{t("55% pó de madeira natural")}</p>
                    <p className="text-muted-foreground">{t("35% HPDE reciclado")}</p>
                    <p className="text-muted-foreground">{t("10% aditivos")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="rotulo text-[#525252] mb-3">{t("Resistência")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <div className="text-sm text-primary space-y-1">
                    <p>✓ {t("Anti-cupim")}</p>
                    <p>✓ {t("Hidrofóbico")}</p>
                    <p>✓ {t("Anti-mofo")}</p>
                    <p>✓ {t("Resistência UV")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="rotulo text-[#525252] mb-3">{t("Certificações")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <p className="text-sm text-primary">ISO 9001 · ISO 14001 · LEED · ESG</p>
                </div>
                <div>
                  <h4 className="rotulo text-[#525252] mb-3">{t("Garantia")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <p className="text-sm text-primary">{t("10 anos")}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="rotulo text-[#525252] mb-3">{t("Subestrutura Recomendada")}</h4>
                  <div className="h-px bg-primary/15 mb-4" />
                  <div className="text-sm text-primary font-mono space-y-1">
                    <p>{t("Espaçamento entre perfis:")} <span className="text-muted-foreground">{t("máximo 40 cm entre apoios")}</span></p>
                    <p>{t("Fixação:")} <span className="text-muted-foreground">{t("clip de fixação oculta ou parafuso autobrocante 4,2×19 mm")}</span></p>
                    <p>{t("Estrutura auxiliar:")} <span className="text-muted-foreground">{t("alumínio ou aço: 50×50 mm · 38×38 mm")}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Obras do portfolio que usaram este produto */}
      <ProjetosDoProduto tipo="deck" linha="Lesco Deck" />

      {/* Navegação entre produtos */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-primary/15">
        <div className="flex justify-between items-center">
          <Link to="/madeira-ecologica-para-fachada" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
            ← Shield
          </Link>
          <Link to="/forro-wpc" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
            Line →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default MantoDeck;
