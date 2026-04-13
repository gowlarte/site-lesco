import { useState, useEffect, useRef, useCallback } from "react";
import { HeroSection } from "@/components/altwood/HeroSection";
import heroImg1 from "@/assets/hero-altwood-1.webp";
import heroImg2 from "@/assets/hero-altwood-2.jpg";
import heroImg3 from "@/assets/hero-altwood-3.jpg";
import heroImg4 from "@/assets/hero-altwood-4.jpg";
import heroImg5 from "@/assets/hero-altwood-5.jpg";
import heroImg6 from "@/assets/hero-altwood-6.jpg";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6];
import { FiltroProdutos } from "@/components/altwood/FiltroProdutos";
import { PreviewProduto } from "@/components/altwood/PreviewProduto";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";
import prevBrise1 from "@/assets/preview-brise-1.png";
import prevBrise2 from "@/assets/preview-brise-2.png";
import prevBrise3 from "@/assets/preview-brise-3.png";
import prevBrise4 from "@/assets/preview-brise-4.png";
import projetoShield1 from "@/assets/projeto-shield-1.png";
import projetoShield2 from "@/assets/projeto-shield-2.png";
import projetoShield3 from "@/assets/projeto-shield-3.png";
import projetoShield4 from "@/assets/projeto-shield-4.png";
import projetoShield5 from "@/assets/projeto-shield-5.png";
import projetoShield6 from "@/assets/projeto-shield-6.jpg";

const produtos = [
  {
    id: "brise",
    tag: "Brise",
    titulo: "AltWood Brise",
    descricao: "Perfis de WPC para fachadas, brises soleil e elementos de proteção solar. Disponível nas linhas AltWood Origens e AltWood Classic.",
    swatches: [
      { nome: "Black", corAproximada: "#1A1A1A" },
      { nome: "Ipê", corAproximada: "#6B4226" },
      { nome: "Teak", corAproximada: "#8B5E3C" },
      { nome: "Oak", corAproximada: "#A0784A" },
    ],
    href: "/altwood-brise",
    images: [prevBrise1, prevBrise2, prevBrise3, prevBrise4],
  },
  {
    id: "shield",
    tag: "Shield",
    titulo: "AltWood Shield",
    descricao: "Revestimento de alta sofisticação para aplicações internas e externas. Acabamentos escovados e texturizados.",
    swatches: [
      { nome: "Black", corAproximada: "#1A1A1A" },
      { nome: "Ipê", corAproximada: "#6B4226" },
      { nome: "Teak", corAproximada: "#8B5E3C" },
      { nome: "Walnut", corAproximada: "#4A3728" },
    ],
    href: "/altwood-shield",
    images: [projetoShield1, projetoShield2, projetoShield3, projetoShield4, projetoShield5, projetoShield6],
  },
  {
    id: "deck",
    tag: "Deck",
    titulo: "AltWood Deck",
    descricao: "Decks de madeira ecológica para espaços externos residenciais, comerciais e públicos. Fixação oculta por presilhas de aço inox.",
    swatches: [
      { nome: "Black", corAproximada: "#1A1A1A" },
      { nome: "Ipê", corAproximada: "#6B4226" },
      { nome: "Teak", corAproximada: "#8B5E3C" },
      { nome: "Oak", corAproximada: "#A0784A" },
    ],
    href: "/altwood-deck",
  },
  {
    id: "line",
    tag: "Line",
    titulo: "AltWood Line",
    descricao: "Forros, sancas e superfícies contínuas com encaixe técnico. Acabamento acetinado com retardante ao fogo.",
    swatches: [
      { nome: "Golden Oak", corAproximada: "#C8972E" },
      { nome: "Hickory", corAproximada: "#9E7B4F" },
      { nome: "Tasmania Oak", corAproximada: "#C4A882" },
      { nome: "Urban Oak", corAproximada: "#7A7060" },
    ],
    href: "/altwood-line",
  },
  {
    id: "panel",
    tag: "Panel",
    titulo: "AltWood Panel",
    descricao: "Painéis para interiores e fachadas ventiladas protegidas. Disponível em acabamento acetinado e fosco com tratamento UV.",
    swatches: [
      { nome: "Golden Oak", corAproximada: "#C8972E" },
      { nome: "Hickory", corAproximada: "#9E7B4F" },
      { nome: "Merbau", corAproximada: "#5C2E1A" },
      { nome: "Urban Oak", corAproximada: "#7A7060" },
    ],
    href: "/altwood-panel",
  },
];

const AltWood = () => {
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

  // Intersection Observer for active tab
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
    <div className="bg-[#0D0D0D] min-h-screen">
      <HeroSection
        images={heroImages}
        headline="AltWood"
        subtitulo="Madeira ecológica premium. Fachadas, brises, panels e decks."
        ctaLabel="Explorar Produtos"
        ctaAction={handleExplorar}
      />

      <FiltroProdutos activeId={activeTab} onTabClick={handleTabClick} />

      <div>
        {produtos.map((p) => (
          <PreviewProduto key={p.id} {...p} />
        ))}
      </div>

      <SecaoOrcamento />
    </div>
  );
};

export default AltWood;
