import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import modelo40x45 from "@/assets/line-modelo-40x45.png";
import modelo40x100 from "@/assets/line-modelo-40x100.png";
import modelo100x20 from "@/assets/line-modelo-100x20.png";

const coresSwatches = [
  { nome: "Golden Oak", corAproximada: "#C4944A" },
  { nome: "Premium Oak", corAproximada: "#A07040" },
  { nome: "Hickory", corAproximada: "#8B6238" },
  { nome: "Tasmania Oak", corAproximada: "#7A5230" },
  { nome: "Merbau", corAproximada: "#5C3420" },
  { nome: "Urban Oak", corAproximada: "#6B5A4A" },
];

const modelos = [
  { nome: "AltWood-Line-40x45", medida: "40x45 mm", peso: "3,63 kg/m²", imageSrc: modelo40x45 },
  { nome: "AltWood-Line-40x100", medida: "40x100 mm", peso: "6,63 kg/m²", imageSrc: modelo40x100 },
  { nome: "AltWood-Line-100x20", medida: "100x20 mm", peso: "3 kg/m²", imageSrc: modelo100x20 },
];

const galeriaItems: { imageSrc?: string; legenda: string; ratio: "4:3" | "3:4" }[] = [];

const AltWoodLine = () => {
  const [selectedCor, setSelectedCor] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      {/* Hero */}
      <HeroSection
        headline="AltWood Line"
        subtitulo="Forros, sancas e superfícies contínuas com encaixe técnico."
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-[#7F7F7F] hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/altwood" className="text-[#7F7F7F] hover:text-white transition-colors">AltWood</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Line</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="max-w-[760px] mx-auto px-6 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8956C]">Line</span>
          <span className="flex-1 h-px bg-[#1E1E1E]" />
        </div>
        <p className="text-[17px] text-[#7F7F7F] leading-[1.7]">
          No mundo da arquitetura e design de interiores, a busca por materiais que combinem beleza natural e desempenho tecnológico está em alta. Os forros com tecnologia WPC emergem como uma solução sustentável, unindo o calor da madeira à resistência do plástico. Além de contar com características retardantes ao fogo, resistência à água e baixo custo de manutenção.
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
            Cores Acetinadas sem tratamento UV
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-4">
            {coresSwatches.map((s) => (
              <SwatchCor
                key={s.nome}
                nome={s.nome}
                corAproximada={s.corAproximada}
                selected={selectedCor === s.nome}
                onClick={() => setSelectedCor(selectedCor === s.nome ? null : s.nome)}
              />
            ))}
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
                    <p>✓ Retardante ao fogo</p>
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Galeria de Projetos */}
      {galeriaItems.length > 0 && (
        <div className="px-6 md:px-12 lg:px-20 py-24">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8956C] mb-3">Projetos</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-10">Realizações com AltWood Line</h2>
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
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-[#1E1E1E]">
        <div className="flex justify-between items-center">
          <Link to="/altwood-deck" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            ← Deck
          </Link>
          <Link to="/altwood" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            Panel →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default AltWoodLine;
