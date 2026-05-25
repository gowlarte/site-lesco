import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import heroManto from "@/assets/hero-home-altwood.webp";
import heroZhuzen from "@/assets/hero-home-zhuzen.webp";
import heroEcho from "@/assets/hero-home-echotex.jpg";
import heroGeo from "@/assets/hero-home-italflex.webp";

import logoMantoRaw from "@/assets/linha-altwood-2.svg?raw";
import logoZhuzenRaw from "@/assets/linha-zhuzen-2.svg?raw";
import logoEchoRaw from "@/assets/linha-echotex-2.svg?raw";
import logoGeoRaw from "@/assets/linha-italflex-2.svg?raw";

const linhas = [
  {
    nome: "Arquitetura feita para o amanhã",
    logo: logoMantoRaw,
    descricao: "Revestimentos premium em WPC. Brises, Panels, Decks, Forros e Shields em diferentes formatos que se adaptam a cada situação de projeto.",
    href: "/madeira-ecologica-lesco",
    imagem: heroManto,
    cor: "#F7C39B",
  },
  {
    nome: "Zhú",
    logo: logoZhuzenRaw,
    descricao: "Revestimentos, forros, luminárias, decorativos e utilitários feitas a partir do bambu.",
    href: "/zhu",
    imagem: heroZhuzen,
    cor: "#A3DBA0",
  },
  {
    nome: "Echo",
    logo: logoEchoRaw,
    descricao: "Tecido acústico moldado. Revestimento para estúdios profissionais e home cinemas.",
    href: "/echo",
    imagem: heroEcho,
    cor: "#C6E1D7",
  },
  {
    nome: "Geo",
    logo: logoGeoRaw,
    descricao: "Revestimento para fachadas, paredes de cozinhas e banheiros, interno e externo.",
    href: "/geo",
    imagem: heroGeo,
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
                {/* Logo — left.
                    NOTE: o logo da linha "Madeira Ecológica" (ex-Manto) está
                    temporariamente OCULTO conforme PRD §5.2; reativar trocando
                    `linha.nome === "Madeira Ecológica"` por `false`. */}
                {linha.nome === "Arquitetura feita para o amanhã" ? (
                  <h2
                    className="font-display font-light text-[44px] md:text-[64px] lg:text-[80px] leading-none tracking-[-0.02em] transition-all duration-500"
                    style={{
                      color: activeIndex === i ? linha.cor : "#141414",
                      opacity: activeIndex !== null && activeIndex !== i ? 0.25 : 1,
                    }}
                  >
                    {linha.nome}
                  </h2>
                ) : (
                  <div
                    className="flex items-center gap-4 transition-all duration-500"
                    style={{
                      opacity: activeIndex !== null && activeIndex !== i ? 0.25 : 1,
                    }}
                  >
                    <div
                      className="[&>svg]:h-[44px] md:[&>svg]:h-[64px] lg:[&>svg]:h-[80px] [&>svg]:w-auto transition-colors duration-500"
                      style={{ color: activeIndex === i ? linha.cor : "#141414" }}
                      dangerouslySetInnerHTML={{ __html: linha.logo }}
                      aria-label={linha.nome}
                    />
                    <span className="font-display font-light text-white bg-[#141414] rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.15em] uppercase whitespace-nowrap">
                      Lançamento<br />em breve
                    </span>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Linhas;
