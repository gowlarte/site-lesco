import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import heroBrise1 from "@/assets/hero-brise-1.jpg";
import heroBrise2 from "@/assets/hero-brise-2.jpg";
import heroBrise3 from "@/assets/hero-brise-3.webp";

const heroImages = [heroBrise1, heroBrise2, heroBrise3];
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

const origensSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A" },
  { nome: "Lily White", corAproximada: "#E8E0D5" },
  { nome: "Ipê", corAproximada: "#6B4226" },
  { nome: "Teak", corAproximada: "#8B5E3C" },
  { nome: "Oak", corAproximada: "#A0784A" },
  { nome: "Walnut", corAproximada: "#4A3728" },
  { nome: "Red Cedar", corAproximada: "#7D3E2A" },
  { nome: "Weatherwood", corAproximada: "#6B6560" },
];

const classicSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A" },
  { nome: "Cedro", corAproximada: "#7A5C3A" },
  { nome: "Gray", corAproximada: "#6A6A6A" },
  { nome: "Sand", corAproximada: "#C4B89A" },
  { nome: "Nogal", corAproximada: "#4E3520" },
  { nome: "Teka", corAproximada: "#9C7040" },
];

const origensModelos = [
  { nome: "AltWood-Brise-25x25-Origens", medida: "25x25 mm", peso: "0,43 kg/mL" },
  { nome: "AltWood-Brise-50x25-Origens", medida: "50x25 mm", peso: "0,94 kg/mL" },
  { nome: "AltWood-Brise-50x50-Origens", medida: "50x50 mm", peso: "1,31 kg/mL" },
  { nome: "AltWood-Brise-75x25-Origens", medida: "75x25 mm", peso: "1,21 kg/mL" },
  { nome: "AltWood-Brise-100x35-Origens", medida: "100x35 mm", peso: "1,83 kg/mL" },
  { nome: "AltWood-Brise-100x50-Origens", medida: "100x50 mm", peso: "2,63 kg/mL" },
  { nome: "AltWood-Brise-150x50-Origens", medida: "150x50 mm", peso: "2,90 kg/mL" },
  { nome: "AltWood-Brise-200x50-Origens", medida: "200x50 mm", peso: "3,30 kg/mL" },
  { nome: "AltWood-Brise-250x50-Origens", medida: "250x50 mm", peso: "3,90 kg/mL" },
  { nome: "AltWood-Brise-100x25-Origens", medida: "100x25 mm", peso: "1,83 kg/mL" },
];

const classicModelos = [
  { nome: "AltWood-Brise-50x30-Classic", medida: "50x30 mm", peso: "1,00 kg/mL" },
  { nome: "AltWood-Brise-50x50-Classic", medida: "50x50 mm", peso: "1,40 kg/mL" },
  { nome: "AltWood-Brise-100x30-Classic", medida: "100x30 mm", peso: "1,95 kg/mL" },
  { nome: "AltWood-Brise-100x50-Classic", medida: "100x50 mm", peso: "2,70 kg/mL" },
  { nome: "AltWood-Brise-150x50-Classic", medida: "150x50 mm", peso: "3,55 kg/mL" },
  { nome: "AltWood-Brise-145x145-Classic", medida: "145x145 mm", peso: "6,20 kg/mL" },
  { nome: "AltWood-Brise-200x50-Classic", medida: "200x50 mm", peso: "4,90 kg/mL" },
  { nome: "AltWood-Brise-250x50-Classic", medida: "250x50 mm", peso: "6,50 kg/mL" },
];

const galeriaItems = [
  { legenda: "Residência com brises verticais entre jardim e vidro", ratio: "4:3" as const },
  { legenda: "Obra Pátio Estaleiro — Balneário Camboriú, SC · Brise 25x25 · Cor Teak", ratio: "3:4" as const },
  { legenda: "Fachada comercial com brises verticais alinhados · Cor Teak", ratio: "4:3" as const },
  { legenda: "Projeto com brises verticais em estrutura de aço", ratio: "3:4" as const },
  { legenda: "Edifício alto — fachada completa com brises verticais", ratio: "4:3" as const },
  { legenda: "Empreendimento residencial — brises em fachada e pergolado", ratio: "3:4" as const },
  { legenda: "Fachada residencial — perspectiva plana", ratio: "4:3" as const },
];

const AltWoodBrise = () => {
  const [activeTab, setActiveTab] = useState<"origens" | "classic">("origens");
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  const swatches = activeTab === "origens" ? origensSwatches : classicSwatches;
  const modelos = activeTab === "origens" ? origensModelos : classicModelos;

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      {/* Hero */}
      <HeroSection
        images={heroImages}
        headline="AltWood Brise"
        subtitulo="Um recurso artístico para a arquitetura contemporânea."
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-[#7F7F7F] hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/altwood" className="text-[#7F7F7F] hover:text-white transition-colors">AltWood</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Brise</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="max-w-[760px] mx-auto px-6 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8956C]">Brise</span>
          <span className="flex-1 h-px bg-[#1E1E1E]" />
        </div>
        <p className="text-[17px] text-[#7F7F7F] leading-[1.7]">
          Os perfis de Brises de WPC (Wood-Plastic Composite) representam uma inovação notável no campo da arquitetura e da construção, oferecendo uma solução sustentável que combina a durabilidade do plástico com a estética natural da madeira.
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex gap-0 border-b border-[#1E1E1E]">
          {(["origens", "classic"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedSwatch(null); }}
              className={`px-6 py-3 text-[13px] font-medium uppercase tracking-[0.06em] transition-all duration-300 border-b-2 -mb-px cursor-pointer ${
                activeTab === tab
                  ? "text-white border-[#C8956C]"
                  : "text-[#7F7F7F] border-transparent hover:text-white"
              }`}
            >
              AltWood {tab === "origens" ? "Origens" : "Classic"}
            </button>
          ))}
        </div>

        {/* Tab content with fade */}
        <div key={activeTab} className="animate-fade-in pt-12">
          {/* Paleta de Cores */}
          <div className="mb-12">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
              Cores disponíveis
            </span>
            <div className={`flex flex-wrap gap-4 ${activeTab === "origens" ? "max-w-[720px]" : "max-w-[540px]"}`}>
              {swatches.map((s) => (
                <SwatchCor
                  key={s.nome}
                  nome={s.nome}
                  corAproximada={s.corAproximada}
                  selected={selectedSwatch === s.nome}
                  onClick={() => setSelectedSwatch(selectedSwatch === s.nome ? null : s.nome)}
                />
              ))}
            </div>
          </div>

          {/* Modelos */}
          <div className="mb-12">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-6">
              Modelos
            </span>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {modelos.map((m) => (
                <CardModelo key={m.nome} nome={m.nome} medida={m.medida} peso={m.peso} />
              ))}
            </div>
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
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-10">Realizações com AltWood Brise</h2>

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
          <Link to="/altwood" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            ← AltWood
          </Link>
          <Link to="/altwood-shield" className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors">
            Shield →
          </Link>
        </div>
      </div>

      {/* Orçamento */}
      <SecaoOrcamento />
    </div>
  );
};

export default AltWoodBrise;
