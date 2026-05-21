import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import modelo97 from "@/assets/deck-modelo-97x22.png";
import modelo140 from "@/assets/deck-modelo-140x22.png";
import modelo150 from "@/assets/deck-modelo-150x22.png";
import projetoDeck1 from "@/assets/projeto-deck-1.jpg";
import projetoDeck2 from "@/assets/projeto-deck-2.png";
import projetoDeck3 from "@/assets/projeto-deck-3.jpg";
import projetoDeck4 from "@/assets/projeto-deck-4.jpg";
import projetoDeck5 from "@/assets/projeto-deck-5.jpg";

const heroImages = [projetoDeck2, projetoDeck1, projetoDeck3, projetoDeck4, projetoDeck5];

const escovadasSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A" },
  { nome: "Lily White", corAproximada: "#E8E0D5" },
  { nome: "Ipê", corAproximada: "#6B4226" },
  { nome: "Teak", corAproximada: "#8B5E3C" },
  { nome: "Oak", corAproximada: "#A0784A" },
  { nome: "Walnut", corAproximada: "#4A3728" },
  { nome: "Red Cedar", corAproximada: "#7D3E2A" },
  { nome: "Weatherwood", corAproximada: "#6B6560" },
];

const texturizadasSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A" },
  { nome: "Lily White", corAproximada: "#E8E0D5" },
  { nome: "Ipê", corAproximada: "#6B4226" },
  { nome: "Teak", corAproximada: "#8B5E3C" },
  { nome: "Oak", corAproximada: "#A0784A" },
  { nome: "Walnut", corAproximada: "#4A3728" },
  { nome: "Red Cedar", corAproximada: "#7D3E2A" },
  { nome: "Weatherwood", corAproximada: "#6B6560" },
];

const modelos = [
  { nome: "Madeira Ecológica-Deck-97x22", medida: "97x22 mm", peso: "20,0 kg/m²", imageSrc: modelo97 },
  { nome: "Madeira Ecológica-Deck-140x22", medida: "140x22 mm", peso: "28 kg/m²", imageSrc: modelo140 },
  { nome: "Madeira Ecológica-Deck-150x22", medida: "150x22 mm", peso: "18,75 kg/m²", imageSrc: modelo150 },
];

const galeriaItems = [
  { imageSrc: projetoDeck1, legenda: "Deck paisagístico com iluminação noturna", ratio: "4:3" as const },
  { imageSrc: projetoDeck2, legenda: "Residência contemporânea com deck frontal", ratio: "4:3" as const },
  { imageSrc: projetoDeck3, legenda: "Passarela em deck com paisagismo integrado", ratio: "4:3" as const },
  { imageSrc: projetoDeck4, legenda: "Deck em jardim zen com espelho d'água", ratio: "4:3" as const },
  { imageSrc: projetoDeck5, legenda: "Projeto noturno com deck e paisagismo", ratio: "3:4" as const },
];

const MantoDeck = () => {
  const [selectedEscovada, setSelectedEscovada] = useState<string | null>(null);
  const [selectedTexturizada, setSelectedTexturizada] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      {/* Hero */}
      <HeroSection
        images={heroImages}
        headline="Lesco Deck"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-[#7F7F7F] hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-[#7F7F7F] hover:text-white transition-colors">Madeira Ecológica</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Deck</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8956C]">Deck</span>
          <span className="flex-1 h-px bg-[#1E1E1E]" />
        </div>
        <p className="text-[17px] text-[#7F7F7F] leading-[1.7]">
          Os decks de madeira ecológica representam uma escolha inteligente e elegante para aprimorar espaços externos. Eles são uma solução ideal para projetos residenciais, comerciais e públicos que buscam criar ambientes externos excepcionais que perduram ao longo do tempo.
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Cores Escovadas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              Cores Escovadas
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              {escovadasSwatches.map((s) => (
                <SwatchCor
                  key={`esc-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  selected={selectedEscovada === s.nome}
                  onClick={() => setSelectedEscovada(selectedEscovada === s.nome ? null : s.nome)}
                />
              ))}
            </div>
          </div>

          {/* Cores Texturizadas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              Cores Texturizadas
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              {texturizadasSwatches.map((s) => (
                <SwatchCor
                  key={`tex-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
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
            Modelos
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
            className="text-[#7F7F7F] hover:text-white text-sm transition-colors duration-300 cursor-pointer flex items-center gap-1"
          >
            Especificações técnicas {specsOpen ? "−" : "+"}
          </button>

          {specsOpen && (
            <div className="mt-6 bg-[#141414] rounded-[12px] p-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">Material</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <div className="text-sm text-white font-mono space-y-1">
                    <p>WPC — Wood-Plastic Composite</p>
                    <p className="text-[#7F7F7F]">55% pó de madeira natural</p>
                    <p className="text-[#7F7F7F]">35% HPDE reciclado</p>
                    <p className="text-[#7F7F7F]">10% aditivos</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">Resistência</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <div className="text-sm text-white space-y-1">
                    <p>✓ Anti-cupim</p>
                    <p>✓ Hidrofóbico</p>
                    <p>✓ Anti-mofo</p>
                    <p>✓ Resistência UV</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">Certificações</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <p className="text-sm text-white">ISO 9001 · ISO 14001 · LEED · ESG</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">Garantia</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <p className="text-sm text-white">10 anos</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-3">Subestrutura Recomendada</h4>
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <div className="text-sm text-white font-mono space-y-1">
                    <p>Espaçamento entre perfis: <span className="text-[#7F7F7F]">máximo 40 cm entre apoios</span></p>
                    <p>Fixação: <span className="text-[#7F7F7F]">clip de fixação oculta ou parafuso autobrocante 4,2×19 mm</span></p>
                    <p>Estrutura auxiliar: <span className="text-[#7F7F7F]">alumínio ou aço — 50×50 mm · 38×38 mm</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Galeria de Projetos */}
      <div className="px-6 md:px-12 lg:px-20 py-24">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8956C] mb-3">Projetos</span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-gray-950">Realizações com Lesco Deck</h2>

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
          <Link to="/madeira-ecologica-para-fachada" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            ← Shield
          </Link>
          <Link to="/forro-wpc" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
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
