import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import heroAltwood from "@/assets/hero-home-altwood.webp";
import heroZhuzen from "@/assets/hero-home-zhuzen.webp";
import heroEchotex from "@/assets/hero-home-echotex.jpg";
import heroItalflex from "@/assets/hero-home-italflex.webp";

import logoAltwoodRaw from "@/assets/linha-altwood-2.svg?raw";
import logoZhuzenRaw from "@/assets/linha-zhuzen-2.svg?raw";
import logoEchotexRaw from "@/assets/linha-echotex-2.svg?raw";
import logoItalflexRaw from "@/assets/linha-italflex-2.svg?raw";

const linhas = [
  {
    nome: "AltWood",
    logo: logoAltwoodRaw,
    descricao: "Madeira ecológica premium. Fachadas, brises, panels e decks.",
    href: "/altwood",
    imagem: heroAltwood,
    cor: "#F7C39B",
  },
  {
    nome: "Zhúzen",
    logo: logoZhuzenRaw,
    descricao: "Revestimentos, forros, luminárias, decorativos e utilitários feitas a partir do bambu.",
    href: "/zhuzen",
    imagem: heroZhuzen,
    cor: "#A3DBA0",
  },
  {
    nome: "Echotex",
    logo: logoEchotexRaw,
    descricao: "Tecido acústico moldado. Revestimento para estúdios profissionais e home cinemas.",
    href: "/echotex",
    imagem: heroEchotex,
    cor: "#C6E1D7",
  },
  {
    nome: "Italflex",
    logo: logoItalflexRaw,
    descricao: "Revestimento para fachadas, paredes de cozinhas e banheiros, interno e externo.",
    href: "/italflex",
    imagem: heroItalflex,
    cor: "#F57D69",
  },
];

const Linhas = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Preload all hero images on mount so hover switching is instant
  useEffect(() => {
    linhas.forEach((linha) => {
      const img = new Image();
      img.src = linha.imagem;
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative bg-light rounded-[10px] overflow-hidden"
      >
        {/* Floating image preview that follows the cursor — always mounted, opacity controlled per image */}
        <div
          className="pointer-events-none absolute z-20 w-[320px] h-[400px] md:w-[420px] md:h-[520px] rounded-[10px] overflow-hidden shadow-2xl"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            opacity: activeIndex !== null ? 1 : 0,
          }}
        >
          {linhas.map((linha, i) => (
            <img
              key={linha.nome}
              src={linha.imagem}
              alt={linha.nome}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
              style={{ opacity: activeIndex === i ? 1 : 0 }}
              draggable={false}
            />
          ))}
        </div>

        <ul className="relative z-10 divide-y divide-dark/10">
          {linhas.map((linha, i) => (
            <li key={linha.nome}>
              <Link
                to={linha.href}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="group grid grid-cols-1 md:grid-cols-[40%_60%] items-center gap-6 md:gap-12 px-8 md:px-16 lg:px-24 py-14 md:py-20 lg:py-24 transition-colors duration-500"
              >
                {/* Logo — left */}
                <div
                  className="transition-all duration-500 [&>svg]:h-[44px] md:[&>svg]:h-[64px] lg:[&>svg]:h-[80px] [&>svg]:w-auto"
                  style={{
                    color: activeIndex === i ? linha.cor : "#141414",
                    opacity: activeIndex !== null && activeIndex !== i ? 0.25 : 1,
                  }}
                  dangerouslySetInnerHTML={{ __html: linha.logo }}
                  aria-label={linha.nome}
                />

                {/* Descrição — right */}
                <p
                  className="font-display font-extralight text-[20px] md:text-[26px] lg:text-[32px] leading-[1.2] tracking-[-0.01em] text-dark text-left transition-opacity duration-500"
                  style={{
                    opacity: activeIndex !== null && activeIndex !== i ? 0.25 : 1,
                  }}
                >
                  {linha.descricao}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Linhas;
