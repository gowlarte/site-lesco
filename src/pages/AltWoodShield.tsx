import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import imgShield124x155 from "@/assets/shield-124x155.png";
import imgShield124x20 from "@/assets/shield-124x20.png";
import imgShield184x20 from "@/assets/shield-184x20.png";
import imgShield149x20 from "@/assets/shield-149x20.png";
import imgShield217x35 from "@/assets/shield-217x35.png";
import imgShield169x25 from "@/assets/shield-169x25.png";
import imgShield217x25 from "@/assets/shield-217x25.png";
import imgShield219x385 from "@/assets/shield-219x385.png";
import imgShield124x50 from "@/assets/shield-124x50.png";

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
  { nome: "AltWood-Shield-124x15,5", medida: "124x15,5 mm", peso: "10,50 kg/m²", imageSrc: imgShield124x155 },
  { nome: "AltWood-Shield-124x20", medida: "124x20 mm", peso: "13,50 kg/m²", imageSrc: imgShield124x20 },
  { nome: "AltWood-Shield-184x20", medida: "184x20 mm", peso: "13,28 kg/m²", imageSrc: imgShield184x20 },
  { nome: "AltWood-Shield-149x20", medida: "149x20 mm", peso: "14,30 kg/m²", imageSrc: imgShield149x20 },
  { nome: "AltWood-Shield-217x35", medida: "217x35 mm", peso: "14,15 kg/m²", imageSrc: imgShield217x35 },
  { nome: "AltWood-Shield-169x25", medida: "169x25 mm", peso: "14,60 kg/m²", imageSrc: imgShield169x25 },
  { nome: "AltWood-Shield-217x25", medida: "217x25 mm", peso: "13,25 kg/m²", imageSrc: imgShield217x25 },
  { nome: "AltWood-Shield-219x38,5", medida: "219x38,5 mm", peso: "15,60 kg/m²", imageSrc: imgShield219x385 },
  { nome: "AltWood-Shield-124x50", medida: "124x50 mm", peso: "15,60 kg/m²", imageSrc: imgShield124x50 },
];

const galeriaItems = [
  { legenda: "Fachada de arena/pavilhão — revestimento externo Shield", ratio: "4:3" as const },
  { legenda: "Residência de luxo — fachada com Shield em tom natural", ratio: "3:4" as const },
  { legenda: "Restaurante/terraço de hotel — teto em Shield, vista panorâmica", ratio: "4:3" as const },
  { legenda: "Edifício corporativo — fachada Shield + estrutura metálica, contrapicado", ratio: "3:4" as const },
];

const AltWoodShield = () => {
  const [selectedEscovada, setSelectedEscovada] = useState<string | null>(null);
  const [selectedTexturizada, setSelectedTexturizada] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      {/* Hero */}
      <HeroSection
        headline="AltWood Shield"
        subtitulo="Um novo paradigma de qualidade e sofisticação para aplicações internas e externas."
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-[#7F7F7F] hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/altwood" className="text-[#7F7F7F] hover:text-white transition-colors">AltWood</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Shield</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="max-w-[760px] mx-auto px-6 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8956C]">Shield</span>
          <span className="flex-1 h-px bg-[#1E1E1E]" />
        </div>
        <p className="text-[17px] text-[#7F7F7F] leading-[1.7]">
          Os revestimentos Lesco representam um paradigma de qualidade e sofisticação para aplicações tanto internas quanto externas. Ele combina tecnologia e durabilidade do plástico com a beleza estética da madeira, criando um material de alta resistência e durabilidade, sem perder o aspecto natural.
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
                    <p>Aplicação em parede: <span className="text-[#7F7F7F]">espaçamento 80 cm entre estruturas</span></p>
                    <p>Aplicação em teto: <span className="text-[#7F7F7F]">espaçamento 60 cm entre estruturas</span></p>
                    <p>Fixação: <span className="text-[#7F7F7F]">parafuso Philips autobrocante flangeado ou cabeça panela 4,2×19 mm</span></p>
                    <p>Estrutura auxiliar: <span className="text-[#7F7F7F]">alumínio ou aço — 50×50 mm · 38×38 mm · 50×25 mm</span></p>
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
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-10">Realizações com AltWood Shield</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {galeriaItems.map((item, i) => (
            <div key={i} className="break-inside-avoid">
              <CardProjeto legenda={item.legenda} ratio={item.ratio} />
            </div>
          ))}
        </div>
      </div>

      {/* Navegação entre produtos */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-[#1E1E1E]">
        <div className="flex justify-between items-center">
          <Link to="/altwood-brise" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            ← Brise
          </Link>
          <Link to="/altwood-deck" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            Deck →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default AltWoodShield;
