import { useState } from "react";
import { t } from "@/i18n/t";
import { SEO } from "@/components/SEO";
import { Link } from "@/components/AppLink";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SwatchCor } from "@/components/altwood/SwatchCor";
import { CardModelo } from "@/components/altwood/CardModelo";
import { CardProjeto } from "@/components/altwood/CardProjeto";
import { ProjetosDoProduto } from "@/components/altwood/ProjetosDoProduto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";

import heroMuxarabi from "@/assets/hero-muxarabi-1.webp";
import modelo50x50 from "@/assets/muxarabi-50x50.webp";
import modelo100x100 from "@/assets/muxarabi-100x100.webp";
import modelo150x150 from "@/assets/muxarabi-150x150.webp";
import aplicacao1 from "@/assets/muxarabi-aplicacao-1.webp";
import aplicacao2 from "@/assets/muxarabi-aplicacao-2.webp";
import aplicacao3 from "@/assets/muxarabi-aplicacao-3.webp";

import swatchBlack from "@/assets/swatch-black.webp";
import swatchLilyWhite from "@/assets/swatch-lily-white.webp";
import swatchIpe from "@/assets/swatch-ipe.webp";
import swatchTeak from "@/assets/swatch-teak.webp";
import swatchOak from "@/assets/swatch-oak.webp";
import swatchWalnut from "@/assets/swatch-walnut.webp";
import swatchRedCedar from "@/assets/swatch-red-cedar.webp";
import swatchWeatherwood from "@/assets/swatch-weatherwood.webp";

import swatchClassicBlack from "@/assets/swatch-classic-black.webp";
import swatchClassicCedro from "@/assets/swatch-classic-cedro.webp";
import swatchClassicGray from "@/assets/swatch-classic-gray.webp";
import swatchClassicSand from "@/assets/swatch-classic-sand.webp";
import swatchClassicNogal from "@/assets/swatch-classic-nogal.webp";
import swatchClassicTeka from "@/assets/swatch-classic-teka.webp";

/**
 * Muxarabi — tipo de produto da linha de madeira ecológica.
 *
 * Segue o padrão das outras páginas de produto (HeroSection + SwatchCor +
 * CardModelo + ProjetosDoProduto). Duas heranças de molde diferentes:
 *
 * - de MantoLine.tsx, o peso em kg/m²: muxarabi é elemento de área, não perfil
 *   linear, e os modelos se distinguem pela malha, não pela seção do perfil;
 * - de MantoBrise.tsx, as abas Origens/Classic. O muxarabi é montado com
 *   perfis de brise, então herda as duas famílias e as cartelas de cada uma —
 *   por isso os swatches aqui são os mesmos arquivos usados em MantoBrise.
 *
 * A aba troca só a cartela: as três malhas existem nas duas famílias.
 *
 * Modelos, pesos, renders e texto saíram do catálogo Lesco 2025 v1.3, páginas
 * 60-61 (o catálogo não traz cartela de muxarabi; as cores vieram do usuário).
 * Ainda faltando: subestrutura recomendada, que quando chegar vira mais um
 * bloco em Dados Técnicos, como o de MantoDeck.tsx.
 */
const origensSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A", imageSrc: swatchBlack },
  { nome: "Lily White", corAproximada: "#E8E0D5", imageSrc: swatchLilyWhite },
  { nome: "Ipê", corAproximada: "#6B4226", imageSrc: swatchIpe },
  { nome: "Teak", corAproximada: "#8B5E3C", imageSrc: swatchTeak },
  { nome: "Oak", corAproximada: "#A0784A", imageSrc: swatchOak },
  { nome: "Walnut", corAproximada: "#4A3728", imageSrc: swatchWalnut },
  { nome: "Red Cedar", corAproximada: "#7D3E2A", imageSrc: swatchRedCedar },
  { nome: "Weatherwood", corAproximada: "#6B6560", imageSrc: swatchWeatherwood },
];

const classicSwatches = [
  { nome: "Black", corAproximada: "#1A1A1A", imageSrc: swatchClassicBlack },
  { nome: "Cedro", corAproximada: "#7A5C3A", imageSrc: swatchClassicCedro },
  { nome: "Gray", corAproximada: "#6A6A6A", imageSrc: swatchClassicGray },
  { nome: "Sand", corAproximada: "#C4B89A", imageSrc: swatchClassicSand },
  { nome: "Nogal", corAproximada: "#4E3520", imageSrc: swatchClassicNogal },
  { nome: "Teka", corAproximada: "#9C7040", imageSrc: swatchClassicTeka },
];

const modelos = [
  { nome: "Lesco Muxarabi-50x50", medida: "50x50 mm", peso: "25,06 kg/m²", imageSrc: modelo50x50 },
  { nome: "Lesco Muxarabi-100x100", medida: "100x100 mm", peso: "15 kg/m²", imageSrc: modelo100x100 },
  { nome: "Lesco Muxarabi-150x150", medida: "150x150 mm", peso: "10,74 kg/m²", imageSrc: modelo150x150 },
];

/**
 * Galeria de aplicação — fotos de produto, não de portfólio. Deliberadamente
 * sem nome de obra, local ou crédito: a obra não está formalizada, então as
 * legendas descrevem o produto aplicado, não o projeto. Se um dia ela for
 * formalizada, entra em projetos.ts com tipo "muxarabi" e aparece sozinha na
 * seção ProjetosDoProduto, que já está montada no fim da página.
 */
const galeria = [
  { imageSrc: aplicacao1, legenda: t("Trama contínua vista em perspectiva"), ratio: "3:4" as const },
  { imageSrc: aplicacao2, legenda: t("Vedação vazada em fachada ventilada"), ratio: "3:4" as const },
  { imageSrc: aplicacao3, legenda: t("Fechamento completo de fachada em muxarabi"), ratio: "3:4" as const },
];

const aplicacoes = [
  {
    titulo: t("Fachadas e varandas"),
    descricao: t("Filtra a incidência solar direta sem bloquear a ventilação natural, reduzindo o ganho térmico do ambiente."),
  },
  {
    titulo: t("Divisórias e vedações"),
    descricao: t("Separa ambientes preservando a passagem de luz e ar — útil em áreas de transição entre interno e externo."),
  },
  {
    titulo: t("Privacidade"),
    descricao: t("Garante recuo visual em sacadas, áreas de serviço e áreas técnicas sem fechar o vão por completo."),
  },
];

const Muxarabi = () => {
  const [activeTab, setActiveTab] = useState<"origens" | "classic">("origens");
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  const swatches = activeTab === "origens" ? origensSwatches : classicSwatches;

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={t("Muxarabi em Madeira Ecológica | Lesco Muxarabi")}
        description={t("Muxarabi em madeira ecológica: elemento vazado em três malhas — 50x50, 100x100 e 150x150 mm — que filtra luz, permite ventilação natural e garante privacidade em fachadas, varandas e divisórias.")}
        path="/muxarabi-madeira-ecologica"
        image={heroMuxarabi}
      />

      {/* Hero */}
      <HeroSection
        imageSrc={heroMuxarabi}
        headline="Lesco Muxarabi"
        subtitulo=""
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">{t("Início")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <Link to="/madeira-ecologica-lesco" className="text-muted-foreground hover:text-primary transition-colors">{t("Madeira Ecológica")}</Link>
          <ChevronRight className="w-3 h-3 text-[#525252]" />
          <span className="text-[#525252]">Muxarabi</span>
        </nav>
      </div>

      {/* Introdução */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="flex-1 h-px bg-primary/15" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-ink">Muxarabi</span>
          <span className="flex-1 h-px bg-primary/15" />
        </div>
        <p className="text-[17px] text-muted-foreground leading-[1.7]">
          {t("O muxarabi traduz uma tradição arquitetônica milenar do Oriente Médio e do norte da África em um material de alta performance. Composto por fibras de madeira reciclada e polímeros, o elemento vazado une a beleza natural da madeira à resistência às intempéries: os padrões geométricos promovem controle de luminosidade, ventilação natural e privacidade, enquanto o material não racha, não deforma e dispensa tratamentos periódicos. Ideal para interiores e fachadas ventiladas protegidas.")}
        </p>
      </div>

      {/* Tabs — trocam só a cartela: as três malhas existem nas duas famílias. */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex gap-0">
          {(["origens", "classic"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedSwatch(null); }}
              className={`px-6 py-3 text-[13px] font-medium uppercase tracking-[0.06em] transition-all duration-300 border-b-2 -mb-px cursor-pointer ${
                activeTab === tab
                  ? "text-primary border-accent-ink"
                  : "text-muted-foreground border-transparent hover:text-primary"
              }`}
            >
              {t("Madeira Ecológica")} {tab === "origens" ? "Origens" : "Classic"}
            </button>
          ))}
        </div>

        {/* Paleta de Cores */}
        <div key={activeTab} className="animate-fade-in pt-12 mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-4">
            {t("Cores disponíveis")}
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 w-full">
            {swatches.map((s) => (
              <SwatchCor
                key={s.nome}
                nome={s.nome}
                corAproximada={s.corAproximada}
                imageSrc={s.imageSrc}
                selected={selectedSwatch === s.nome}
                onClick={() => setSelectedSwatch(selectedSwatch === s.nome ? null : s.nome)}
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
                    <p>{t("✓ Resistência UV")}</p>
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

        {/* Aplicações */}
        <div className="mb-16">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-6">
            {t("Aplicações")}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {aplicacoes.map((a) => (
              <div key={a.titulo} className="bg-white rounded-md p-8">
                <h3 className="font-display text-xl text-gray-950 mb-3 font-normal">{a.titulo}</h3>
                <p className="font-body text-[14px] text-muted-foreground leading-relaxed">{a.descricao}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Galeria de aplicação */}
        <div className="mb-16">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#525252] mb-6">
            {t("Galeria")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galeria.map((g) => (
              <CardProjeto key={g.legenda} imageSrc={g.imageSrc} legenda={g.legenda} ratio={g.ratio} />
            ))}
          </div>
        </div>
      </div>

      <ProjetosDoProduto tipo="muxarabi" linha="Lesco Muxarabi" />

      <SecaoOrcamento />
    </div>
  );
};

export default Muxarabi;
