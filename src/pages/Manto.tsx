import { useState, useEffect, useRef, useCallback } from "react";
import { t } from "@/i18n/t";
import { HeroSection } from "@/components/altwood/HeroSection";
import { SEO } from "@/components/SEO";
import heroImg1 from "@/assets/hero-altwood-1.webp";
import heroImg2 from "@/assets/hero-altwood-2.webp";
import heroImg3 from "@/assets/hero-altwood-3.webp";
import heroImg4 from "@/assets/hero-altwood-4.webp";
import heroImg5 from "@/assets/hero-altwood-5.webp";
import heroImg6 from "@/assets/hero-altwood-6.webp";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6];
import { FiltroProdutos } from "@/components/altwood/FiltroProdutos";
import { PreviewProduto } from "@/components/altwood/PreviewProduto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";
import prevBrise1 from "@/assets/preview-brise-1.webp";
import prevBrise2 from "@/assets/preview-brise-2.webp";
import prevBrise3 from "@/assets/preview-brise-3.webp";
import prevBrise4 from "@/assets/preview-brise-4.webp";
import projetoShield1 from "@/assets/projeto-shield-1.webp";
import projetoShield2 from "@/assets/projeto-shield-2.webp";
import projetoShield3 from "@/assets/projeto-shield-3.webp";
import projetoShield4 from "@/assets/projeto-shield-4.webp";
import projetoShield5 from "@/assets/projeto-shield-5.webp";
import projetoShield6 from "@/assets/projeto-shield-6.webp";
import projetoDeck1 from "@/assets/projeto-deck-1.webp";
import projetoDeck2 from "@/assets/projeto-deck-2.webp";
import projetoDeck3 from "@/assets/projeto-deck-3.webp";
import projetoDeck4 from "@/assets/projeto-deck-4.webp";
import projetoDeck5 from "@/assets/projeto-deck-5.webp";
import projetoLine1 from "@/assets/projeto-line-1.webp";
import projetoLine2 from "@/assets/projeto-line-2.webp";
import projetoLine3 from "@/assets/projeto-line-3.webp";
import projetoPanel1 from "@/assets/projeto-panel-1.webp";
import projetoPanel2 from "@/assets/projeto-panel-2.webp";
import projetoPanel3 from "@/assets/projeto-panel-3.webp";
import projetoPanel4 from "@/assets/projeto-panel-4.webp";
import projetoPanel5 from "@/assets/projeto-panel-5.webp";
import projetoPanel6 from "@/assets/projeto-panel-6.webp";

const produtos = [
  {
    id: "brise",
    tag: "Brise",
    titulo: "Lesco Brise",
    descricao: t("Perfis de WPC para fachadas, brises soleil e elementos de proteção solar. Disponível nas linhas Madeira Ecológica Origens e Madeira Ecológica Classic."),
    swatches: [
      { nome: "Black", corAproximada: "#1A1A1A" },
      { nome: "Ipê", corAproximada: "#6B4226" },
      { nome: "Teak", corAproximada: "#8B5E3C" },
      { nome: "Oak", corAproximada: "#A0784A" },
    ],
    href: "/brise-madeira-ecologica",
    images: [prevBrise1, prevBrise2, prevBrise3, prevBrise4],
  },
  {
    id: "shield",
    tag: "Shield",
    titulo: "Lesco Shield",
    descricao: t("Revestimento de alta sofisticação para aplicações internas e externas. Acabamentos escovados e texturizados."),
    swatches: [
      { nome: "Black", corAproximada: "#1A1A1A" },
      { nome: "Ipê", corAproximada: "#6B4226" },
      { nome: "Teak", corAproximada: "#8B5E3C" },
      { nome: "Walnut", corAproximada: "#4A3728" },
    ],
    href: "/madeira-ecologica-para-fachada",
    images: [projetoShield1, projetoShield2, projetoShield3, projetoShield4, projetoShield5, projetoShield6],
  },
  {
    id: "deck",
    tag: "Deck",
    titulo: "Lesco Deck",
    descricao: t("Decks de madeira ecológica para espaços externos residenciais, comerciais e públicos. Fixação oculta por presilhas de aço inox."),
    swatches: [
      { nome: "Black", corAproximada: "#1A1A1A" },
      { nome: "Ipê", corAproximada: "#6B4226" },
      { nome: "Teak", corAproximada: "#8B5E3C" },
      { nome: "Oak", corAproximada: "#A0784A" },
    ],
    href: "/madeira-ecologica-para-deck",
    images: [projetoDeck2, projetoDeck1, projetoDeck3, projetoDeck4, projetoDeck5],
  },
  {
    id: "line",
    tag: "Line",
    titulo: "Lesco Line",
    descricao: t("Forros, sancas e superfícies contínuas com encaixe técnico. Acabamento acetinado com retardante ao fogo."),
    swatches: [
      { nome: "Golden Oak", corAproximada: "#C8972E" },
      { nome: "Hickory", corAproximada: "#9E7B4F" },
      { nome: "Tasmania Oak", corAproximada: "#C4A882" },
      { nome: "Urban Oak", corAproximada: "#7A7060" },
    ],
    href: "/forro-wpc",
    images: [projetoLine1, projetoLine2, projetoLine3],
  },
  {
    id: "panel",
    tag: "Panel",
    titulo: "Lesco Panel",
    descricao: t("Painéis para interiores e fachadas ventiladas protegidas. Disponível em acabamento acetinado e fosco com tratamento UV."),
    swatches: [
      { nome: "Golden Oak", corAproximada: "#C8972E" },
      { nome: "Hickory", corAproximada: "#9E7B4F" },
      { nome: "Merbau", corAproximada: "#5C2E1A" },
      { nome: "Urban Oak", corAproximada: "#7A7060" },
    ],
    href: "/placa-wpc-interior",
    images: [projetoPanel1, projetoPanel2, projetoPanel3, projetoPanel4, projetoPanel5, projetoPanel6],
  },
];

const Manto = () => {
  const [activeTab, setActiveTab] = useState("brise");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleTabClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleExplorar = useCallback(() => {
    const el = document.getElementById("filtro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        }
      },
      { rootMargin: "-56px 0px -60% 0px", threshold: 0.1 }
    );

    produtos.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <SEO
        title={t("Madeira Ecológica Lesco — AltWood")}
        description={t("Revestimentos premium em WPC: Brises, Panels, Decks, Forros e Shields para projetos arquitetônicos de alto padrão.")}
        path="/madeira-ecologica-lesco"
        image={heroImg1}
      />
      <HeroSection
        images={heroImages}
        headline={t("Madeira Ecológica")}
        subtitulo={t("Revestimentos premium em WPC. Brises, Panels, Decks, Forros e Shields em diferentes formatos que se adaptam a cada situação de projeto.")}
        ctaLabel={t("Explorar Produtos")}
        ctaAction={handleExplorar}
      />

      <FiltroProdutos activeId={activeTab} onTabClick={handleTabClick} />

      <div className="bg-secondary">
        {produtos.map((p) => (
          <PreviewProduto key={p.id} {...p} />
        ))}
      </div>

      <SecaoOrcamento />
    </div>
  );
};

export default Manto;