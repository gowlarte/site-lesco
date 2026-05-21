import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import modelo119x12 from "@/assets/panel-modelo-119x12.png";
import modelo215x30 from "@/assets/panel-modelo-215x30.png";
import modelo260x15 from "@/assets/panel-modelo-260x15.png";
import modelo170x12 from "@/assets/panel-modelo-170x12.png";
import modelo169x15 from "@/assets/panel-modelo-169x15.png";
import modelo204x16 from "@/assets/panel-modelo-204x16.png";
import modelo202x25 from "@/assets/panel-modelo-202x25.png";
import modelo182x15 from "@/assets/panel-modelo-182x15.png";
import modelo119x14 from "@/assets/panel-modelo-119x14.png";
import modelo150x14 from "@/assets/panel-modelo-150x14.png";
import modelo180x14 from "@/assets/panel-modelo-180x14.png";
import modelo268x20 from "@/assets/panel-modelo-268x20.png";
import modelo204x35 from "@/assets/panel-modelo-204x35.png";
import modelo158x10 from "@/assets/panel-modelo-158x10.png";
import modelo153x12 from "@/assets/panel-modelo-153x12.png";
import modelo59x34 from "@/assets/panel-modelo-59x34.png";
import modelo45x35 from "@/assets/panel-modelo-45x35.png";
import projetoPanel1 from "@/assets/projeto-panel-1.png";
import projetoPanel2 from "@/assets/projeto-panel-2.png";
import projetoPanel3 from "@/assets/projeto-panel-3.png";
import projetoPanel4 from "@/assets/projeto-panel-4.png";
import projetoPanel5 from "@/assets/projeto-panel-5.png";
import projetoPanel6 from "@/assets/projeto-panel-6.png";

const heroImages = [projetoPanel1, projetoPanel2, projetoPanel3, projetoPanel4, projetoPanel5, projetoPanel6];

const acetinadasSwatches = [
  { nome: "Golden Oak", corAproximada: "#C4944A" },
  { nome: "Premium Oak", corAproximada: "#A07040" },
  { nome: "Hickory", corAproximada: "#8B6238" },
  { nome: "Tasmania Oak", corAproximada: "#7A5230" },
  { nome: "Merbau", corAproximada: "#5C3420" },
  { nome: "Urban Oak", corAproximada: "#6B5A4A" },
];

const foscasSwatches = [
  { nome: "Golden Oak", corAproximada: "#C4944A" },
  { nome: "Premium Oak", corAproximada: "#A07040" },
  { nome: "Hickory", corAproximada: "#8B6238" },
  { nome: "Tasmania Oak", corAproximada: "#7A5230" },
  { nome: "Merbau", corAproximada: "#5C3420" },
  { nome: "Urban Oak", corAproximada: "#6B5A4A" },
];

const modelos = [
  { nome: "Madeira Ecológica-Panel-119x12", medida: "119x12 mm", peso: "4,90 kg/m²", imageSrc: modelo119x12 },
  { nome: "Madeira Ecológica-Panel-215x30", medida: "215x30 mm", peso: "7,05 kg/m²", imageSrc: modelo215x30 },
  { nome: "Madeira Ecológica-Panel-260x15", medida: "260x15 mm", peso: "7,09 kg/m²", imageSrc: modelo260x15 },
  { nome: "Madeira Ecológica-Panel-170x12", medida: "170x12 mm", peso: "4,07 kg/m²", imageSrc: modelo170x12 },
  { nome: "Madeira Ecológica-Panel-169x15", medida: "169x15 mm", peso: "4,88 kg/m²", imageSrc: modelo169x15 },
  { nome: "Madeira Ecológica-Panel-204x16", medida: "204x16 mm", peso: "4,80 kg/m²", imageSrc: modelo204x16 },
  { nome: "Madeira Ecológica-Panel-202x25", medida: "202x25 mm", peso: "7,60 kg/m²", imageSrc: modelo202x25 },
  { nome: "Madeira Ecológica-Panel-182x15", medida: "182x15 mm", peso: "4,90 kg/m²", imageSrc: modelo182x15 },
  { nome: "Madeira Ecológica-Panel-119x14", medida: "119x14 mm", peso: "5,12 kg/m²", imageSrc: modelo119x14 },
  { nome: "Madeira Ecológica-Panel-150x14", medida: "150x14 mm", peso: "5,20 kg/m²", imageSrc: modelo150x14 },
  { nome: "Madeira Ecológica-Panel-180x14", medida: "180x14 mm", peso: "5,40 kg/m²", imageSrc: modelo180x14 },
  { nome: "Madeira Ecológica-Panel-268x20", medida: "268x20 mm", peso: "6,35 kg/m²", imageSrc: modelo268x20 },
  { nome: "Madeira Ecológica-Panel-204x35", medida: "204x35 mm", peso: "7,80 kg/m²", imageSrc: modelo204x35 },
  { nome: "Madeira Ecológica-Panel-158x10", medida: "158x10 mm", peso: "4,00 kg/m²", imageSrc: modelo158x10 },
  { nome: "Madeira Ecológica-Panel-153x12", medida: "153x12 mm", peso: "4,20 kg/m²", imageSrc: modelo153x12 },
  { nome: "Madeira Ecológica-Panel-59x34", medida: "59x34 mm", peso: "0,43 kg/m²", imageSrc: modelo59x34 },
  { nome: "Madeira Ecológica-Panel-45x35", medida: "45x35 mm", peso: "0,28 kg/m²", imageSrc: modelo45x35 },
];

const galeriaItems = [
  { imageSrc: projetoPanel1, legenda: "Fachada com ripado vertical em painel WPC", ratio: "3:4" as const },
  { imageSrc: projetoPanel2, legenda: "Área gourmet com painéis contínuos em madeira ecológica", ratio: "4:3" as const },
  { imageSrc: projetoPanel3, legenda: "Forro externo com paginação linear elegante", ratio: "3:4" as const },
  { imageSrc: projetoPanel4, legenda: "Ambiente interno com revestimento e teto integrados", ratio: "3:4" as const },
  { imageSrc: projetoPanel5, legenda: "Varanda contemporânea com painel e deck integrados", ratio: "4:3" as const },
  { imageSrc: projetoPanel6, legenda: "Auditório com painéis laterais e acabamento técnico", ratio: "4:3" as const },
];

const MantoPanel = () => {
  const [selectedAcetinada, setSelectedAcetinada] = useState<string | null>(null);
  const [selectedFosca, setSelectedFosca] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      {/* Hero */}
      <HeroSection
        images={heroImages}
        headline="Lesco Panel"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-[#7F7F7F] hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-[#7F7F7F] hover:text-white transition-colors">Madeira Ecológica</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Panel</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8956C]">Panel</span>
          <span className="flex-1 h-px bg-[#1E1E1E]" />
        </div>
        <p className="text-[17px] text-[#7F7F7F] leading-[1.7]">
          Essa categoria de produtos oferece uma opção sustentável e sofisticada para transformar o interior ou exterior de qualquer espaço. Fabricado a partir de uma combinação de fibras de madeira reciclada e resinas plásticas, este material apresenta uma estética natural e calorosa, sem comprometer a durabilidade e a resistência.
        </p>
      </div>

      {/* Paleta de Cores */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Cores Acetinadas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              Cores Acetinadas Sem Tratamento UV
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
              {acetinadasSwatches.map((s) => (
                <SwatchCor
                  key={`ace-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  selected={selectedAcetinada === s.nome}
                  onClick={() => setSelectedAcetinada(selectedAcetinada === s.nome ? null : s.nome)}
                />
              ))}
            </div>
          </div>

          {/* Cores Foscas */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              Cores Foscas Com Tratamento UV
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
              {foscasSwatches.map((s) => (
                <SwatchCor
                  key={`fos-${s.nome}`}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
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
            Modelos
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Galeria de Projetos */}
      {galeriaItems.length > 0 && (
        <div className="px-6 md:px-12 lg:px-20 py-24">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8956C] mb-3">Projetos</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-gray-950">Realizações com Lesco Panel</h2>
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
          <Link to="/forro-wpc" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            ← Line
          </Link>
          <Link to="/madeira-ecologica-lesco" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            Madeira Ecológica →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default MantoPanel;
