import { useEffect, useRef, useState } from "react";
import { ProdutoCanvas, type ProdutoCanvasHandle } from "./ProdutoCanvas";
import { FeatureIcon } from "./FeatureIcon";


import iconAntiMofo from "@/assets/madeira-ecologica/icon-anti-mofo.svg?raw";
import iconHidrofobico from "@/assets/madeira-ecologica/icon-hidrofobico.svg?raw";
import iconPragas from "@/assets/madeira-ecologica/icon-resistente-pragas.svg?raw";
import iconGarantia from "@/assets/madeira-ecologica/icon-garantia.svg?raw";
import iconReciclado from "@/assets/madeira-ecologica/icon-reciclado.svg?raw";

const features = [
  {
    id: "anti-mofo",
    label: "Anti-mofo",
    svg: iconAntiMofo,
    description:
      "Tratamento que inibe o crescimento de fungos e bactérias, mantendo a superfície íntegra ao longo dos anos.",
  },
  {
    id: "hidrofobico",
    label: "Hidrofóbico",
    svg: iconHidrofobico,
    description:
      "Superfície que repele água, ideal para áreas externas e ambientes úmidos como decks e revestimentos de fachada.",
  },
  {
    id: "pragas",
    label: "Resistente a pragas",
    svg: iconPragas,
    description:
      "Composição naturalmente resistente a cupins e insetos, sem necessidade de tratamentos químicos adicionais.",
  },
  {
    id: "garantia",
    label: "10 anos de garantia",
    svg: iconGarantia,
    description:
      "Uma década de garantia que reflete nossa confiança na durabilidade e estabilidade do produto.",
  },
  {
    id: "reciclado",
    label: "100% reciclado",
    svg: iconReciclado,
    description:
      "Fabricado com materiais reciclados, contribuindo para uma arquitetura mais sustentável e responsável.",
  },
];

export const MadeiraEcologicaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<ProdutoCanvasHandle>(null);
  const totalFramesRef = useRef(0);
  const rafScheduledRef = useRef(false);

  const [isComplete, setIsComplete] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Scroll → frame (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    let isVisible = false;

    const compute = () => {
      rafScheduledRef.current = false;
      const total = totalFramesRef.current;
      if (!total) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(1, scrollable)));

      // Anima o GIF apenas nos primeiros 60% do scroll;
      // os 40% restantes mantêm a seção "presa" com ícones visíveis.
      const animationProgress = Math.min(1, progress / 0.6);
      const frame = Math.floor(animationProgress * (total - 1));
      canvasRef.current?.setFrame(frame);

      const complete = animationProgress >= 1;
      setIsComplete((prev) => (prev !== complete ? complete : prev));
    };

    const onScroll = () => {
      if (!isVisible) return;
      if (rafScheduledRef.current) return;
      rafScheduledRef.current = true;
      requestAnimationFrame(compute);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) compute();
        }
      },
      { rootMargin: "0px" },
    );
    io.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Initial compute when frames become available
    const interval = setInterval(() => {
      if (totalFramesRef.current > 0) {
        compute();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(interval);
    };
  }, [isMobile]);

  // Mobile: jump to last frame once loaded; ícones sempre visíveis
  useEffect(() => {
    if (!isMobile) return;
    setIsComplete(true);
    const tryJump = () => {
      const total = totalFramesRef.current;
      if (total > 0) {
        canvasRef.current?.setFrame(total - 1);
        return true;
      }
      return false;
    };
    if (tryJump()) return;
    const id = setInterval(() => {
      if (tryJump()) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [isMobile]);

  const handleReady = (n: number) => {
    totalFramesRef.current = n;
  };

  const handleToggle = (id: string) => {
    setActiveId((cur) => (cur === id ? null : id));
  };

  // ============ MOBILE LAYOUT ============
  if (isMobile) {
    return (
      <section className="mx-[10px] rounded-[10px] bg-[#DBDBDB] py-16 px-5">
        <h2 className="font-display text-3xl font-normal leading-[1.15] text-[#141414] text-center mb-10">
          Conheça nossa<br />madeira ecológica
        </h2>
        <div className="w-full aspect-square mb-10">
          <ProdutoCanvas
            ref={canvasRef}
            onReady={handleReady}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6">
          {features.map((f) => (
            <FeatureIcon
              key={f.id}
              id={f.id}
              label={f.label}
              description={f.description}
              svgRaw={f.svg}
              isActive={activeId === f.id}
              isVisible
              onToggle={handleToggle}
              align="left"
            />
          ))}
        </div>
      </section>
    );
  }

  // ============ DESKTOP LAYOUT ============
  return (
    <section
      ref={sectionRef}
      className="relative mx-[10px] rounded-[10px] bg-[#DBDBDB] h-[450vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <h2 className="font-display text-4xl lg:text-[52px] font-normal leading-[1.15] text-[#141414] text-center pt-16 lg:pt-20">
          Conheça nossa madeira ecológica
        </h2>

        {/* Stage: canvas à esquerda + ícones empilhados à direita */}
        <div className="flex-1 w-full flex items-center justify-center px-4 sm:px-8">
          <div className="w-full flex items-center justify-center gap-8 lg:gap-16 xl:gap-24">
            {/* Coluna esquerda: canvas */}
            <div className="w-[45%] max-w-[640px] aspect-square shrink-0">
              <ProdutoCanvas
                ref={canvasRef}
                onReady={handleReady}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Coluna direita: lista de ícones */}
            <div className="flex flex-col gap-6 flex-1 max-w-[520px]">
              {features.map((f, i) => (
                <FeatureIcon
                  key={f.id}
                  id={f.id}
                  label={f.label}
                  description={f.description}
                  svgRaw={f.svg}
                  isActive={activeId === f.id}
                  isVisible={isComplete}
                  delayMs={i * 150}
                  onToggle={handleToggle}
                  align="left"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
