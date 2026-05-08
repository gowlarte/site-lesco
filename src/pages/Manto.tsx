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
import projetoDeck1 from "@/assets/projeto-deck-1.jpg";
import projetoDeck2 from "@/assets/projeto-deck-2.png";
import projetoDeck3 from "@/assets/projeto-deck-3.jpg";
import projetoDeck4 from "@/assets/projeto-deck-4.jpg";
import projetoDeck5 from "@/assets/projeto-deck-5.jpg";
import projetoLine1 from "@/assets/projeto-line-1.png";
import projetoLine2 from "@/assets/projeto-line-2.png";
import projetoLine3 from "@/assets/projeto-line-3.png";
import projetoPanel1 from "@/assets/projeto-panel-1.png";
import projetoPanel2 from "@/assets/projeto-panel-2.png";
import projetoPanel3 from "@/assets/projeto-panel-3.png";
import projetoPanel4 from "@/assets/projeto-panel-4.png";
import projetoPanel5 from "@/assets/projeto-panel-5.png";
import projetoPanel6 from "@/assets/projeto-panel-6.png";

const produtos = [
  {
    id: "brise",
    tag: "Brise",
    titulo: "Madeira Ecológica Brise",
    descricao: "Perfis de WPC para fachadas, brises soleil e elementos de proteção solar. Disponível nas linhas Madeira Ecológica Origens e Madeira Ecológica Classic.",
...
    titulo: "Madeira Ecológica Shield",
...
    titulo: "Madeira Ecológica Deck",
...
    titulo: "Madeira Ecológica Line",
...
    titulo: "Madeira Ecológica Panel",
...
  return (
    <div className="min-h-screen bg-[#e5e1dc]">
      <HeroSection
        images={heroImages}
        headline="Madeira Ecológica"
        subtitulo="Revestimentos premium em WPC. Brises, Panels, Decks, Forros e Shields em diferentes formatos que se adaptam a cada situação de projeto."
        ctaLabel="Explorar Produtos"
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
