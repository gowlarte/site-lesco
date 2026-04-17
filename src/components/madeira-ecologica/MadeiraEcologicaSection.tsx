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

      const frame = Math.floor(progress * (total - 1));
      canvasRef.current?.setFrame(frame);

      const complete = progress >= 0.95;
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
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
              align="center"
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
      className="relative mx-[10px] rounded-[10px] bg-[#DBDBDB] h-[300vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <h2 className="font-display text-4xl lg:text-[52px] font-normal leading-[1.15] text-[#141414] text-center pt-16 lg:pt-20">
          Conheça nossa madeira ecológica
        </h2>

        {/* Stage: icons + canvas */}
        <div className="relative flex-1 w-full max-w-[1400px] mx-auto px-8">

          {/* Canvas centralizado */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[42%] max-w-[560px] aspect-square">
              <ProdutoCanvas
                ref={canvasRef}
                onReady={handleReady}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Ícones — posicionados conforme layout do PRD */}
          {/* Top-left: Anti-mofo */}
          <FeatureIcon
            id={features[0].id}
            label={features[0].label}
            description={features[0].description}
            svgRaw={features[0].svg}
            isActive={activeId === features[0].id}
            isVisible={isComplete}
            delayMs={0}
            onToggle={handleToggle}
            align="left"
            className="absolute top-[10%] left-[6%]"
          />
          {/* Bottom-left: Hidrofóbico */}
          <FeatureIcon
            id={features[1].id}
            label={features[1].label}
            description={features[1].description}
            svgRaw={features[1].svg}
            isActive={activeId === features[1].id}
            isVisible={isComplete}
            delayMs={150}
            onToggle={handleToggle}
            align="left"
            className="absolute bottom-[14%] left-[6%]"
          />
          {/* Bottom-center: Pragas */}
          <FeatureIcon
            id={features[2].id}
            label={features[2].label}
            description={features[2].description}
            svgRaw={features[2].svg}
            isActive={activeId === features[2].id}
            isVisible={isComplete}
            delayMs={300}
            onToggle={handleToggle}
            align="center"
            className="absolute bottom-[4%] left-1/2 -translate-x-1/2"
          />
          {/* Top-right: Garantia */}
          <FeatureIcon
            id={features[3].id}
            label={features[3].label}
            description={features[3].description}
            svgRaw={features[3].svg}
            isActive={activeId === features[3].id}
            isVisible={isComplete}
            delayMs={450}
            onToggle={handleToggle}
            align="right"
            className="absolute top-[10%] right-[6%]"
          />
          {/* Bottom-right: Reciclado */}
          <FeatureIcon
            id={features[4].id}
            label={features[4].label}
            description={features[4].description}
            svgRaw={features[4].svg}
            isActive={activeId === features[4].id}
            isVisible={isComplete}
            delayMs={600}
            onToggle={handleToggle}
            align="right"
            className="absolute bottom-[14%] right-[6%]"
          />
        </div>
      </div>
    </section>
  );
};
