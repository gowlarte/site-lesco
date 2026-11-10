import { useEffect, useRef, useState } from "react";
import { t } from "@/i18n/t";
import { ProdutoExplodido } from "./ProdutoExplodido";
import { FeatureIcon } from "./FeatureIcon";
import { assinarScroll } from "@/lib/scroll-suave";


import iconAntiMofo from "@/assets/madeira-ecologica/icon-anti-mofo.svg?raw";
import iconHidrofobico from "@/assets/madeira-ecologica/icon-hidrofobico.svg?raw";
import iconPragas from "@/assets/madeira-ecologica/icon-resistente-pragas.svg?raw";
import iconGarantia from "@/assets/madeira-ecologica/icon-garantia.svg?raw";
import iconReciclado from "@/assets/madeira-ecologica/icon-reciclado.svg?raw";

const features = [
  {
    id: "anti-mofo",
    label: t("Anti-mofo"),
    svg: iconAntiMofo,
    description: t(
      "Tratamento que inibe o crescimento de fungos e bactérias, mantendo a superfície íntegra ao longo dos anos.",
    ),
  },
  {
    id: "hidrofobico",
    label: t("Hidrofóbico"),
    svg: iconHidrofobico,
    description: t(
      "Superfície que repele água, ideal para áreas externas e ambientes úmidos como decks e revestimentos de fachada.",
    ),
  },
  {
    id: "pragas",
    label: t("Resistente a pragas"),
    svg: iconPragas,
    description: t(
      "Composição naturalmente resistente a cupins e insetos, sem necessidade de tratamentos químicos adicionais.",
    ),
  },
  {
    id: "garantia",
    label: t("10 anos de garantia"),
    svg: iconGarantia,
    description: t(
      "Uma década de garantia que reflete nossa confiança na durabilidade e estabilidade do produto.",
    ),
  },
  {
    id: "reciclado",
    label: t("100% reciclável"),
    svg: iconReciclado,
    description: t(
      "Fabricado com materiais reciclados, contribuindo para uma arquitetura mais sustentável e responsável.",
    ),
  },
];

export const MadeiraEcologicaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

  /*
   * A ROLAGEM É O CONTROLE, NOS DOIS TAMANHOS.
   *
   * Antes só o desktop acompanhava a rolagem; no celular a animação tocava
   * sozinha uma vez e acabava. Agora é a mesma mecânica para os dois, e o que
   * muda é só o mapeamento — porque os dois layouts são diferentes, não porque
   * a animação seja.
   *
   *   desktop  palco preso em 450vh: a separação acontece nos primeiros 60%
   *            do curso e os 40% finais seguram a peça aberta com os ícones.
   *   celular  a seção corre no fluxo normal: a separação acompanha a
   *            travessia dela pela janela, completando quando ela chega perto
   *            do topo — ou seja, a peça está aberta enquanto os ícones são
   *            lidos.
   *
   * O que sai daqui é UM número em `--p`, escrito na própria seção. Quem
   * distribui esse número pelas 8 camadas é o CSS, em `transform` fixos; ver
   * ProdutoExplodido.tsx.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const limita = (v: number) => Math.min(1, Math.max(0, v));
    const escrever = (p: number) => {
      section.style.setProperty("--p", p.toFixed(4));
      setIsComplete((antes) => (antes !== (p >= 1) ? p >= 1 : antes));
    };

    // Menos movimento: a peça fica separada e parada. É o estado que explica
    // o produto; o estado montado é o que não diz nada sozinho.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      escrever(1);
      return;
    }

    let visivel = false;

    const medir = () => {
      rafScheduledRef.current = false;
      const r = section.getBoundingClientRect();
      const janela = window.innerHeight || 1;

      if (isMobile) {
        escrever(limita((janela * 0.9 - r.top) / (janela * 0.75)));
        return;
      }
      const curso = r.height - janela;
      escrever(limita(-r.top / Math.max(1, curso) / 0.6));
    };

    const aoRolar = () => {
      if (!visivel || rafScheduledRef.current) return;
      rafScheduledRef.current = true;
      requestAnimationFrame(medir);
    };

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          visivel = e.isIntersecting;
          if (visivel) medir();
        }
      },
      { rootMargin: "0px" },
    );
    io.observe(section);

    const desassinar = assinarScroll(aoRolar);
    window.addEventListener("resize", aoRolar);
    medir();

    return () => {
      io.disconnect();
      desassinar();
      window.removeEventListener("resize", aoRolar);
    };
  }, [isMobile]);

  const handleToggle = (id: string) => {
    setActiveId((cur) => (cur === id ? null : id));
  };

  // ============ MOBILE LAYOUT ============
  if (isMobile) {
    return (
      <section ref={sectionRef} className="bg-[#DBDBDB] rounded-[10px] mx-[10px] py-16 px-5">
        <h2 className="sr-only">{t("Conheça nossa madeira ecológica")}</h2>
        {/* Sem `aspect-square`: a proporção da caixa de composição vem do
            próprio render e é o ProdutoExplodido que a declara. Forçar outra
            aqui distorceria a peça, porque as camadas são posicionadas em
            porcentagem dessa caixa. */}
        <div className="w-full mb-10">
          <ProdutoExplodido className="w-full" />
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
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
      className="relative bg-[#DBDBDB] rounded-[10px] mx-[10px] h-[450vh]"
    >
      {/* Palco fixo: aqui a altura precisa ser definida, não mínima, porque o
          scroll é medido contra ela. Fica em `svh` — a menor das janelas —
          porque este palco não tem fundo próprio: o que aparece abaixo dele é
          o #DBDBDB da própria seção, então encolher a barra do navegador não
          abre faixa nenhuma. É o que o diferencia dos palcos do hero e dos
          projetos, que têm `bg-primary` e por isso precisaram ir para `dvh`
          (ver a soma do trilho em HeroSolucoes). */}
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col">
        {/* O título saiu da tela: a peça desmontada e os cinco ícones já dizem
            o que a seção é. Ele fica como marcação — leitor de tela e sumário
            da página continuam enxergando um h2 aqui. */}
        <h2 className="sr-only">{t("Conheça nossa madeira ecológica")}</h2>

        {/* Stage: canvas à esquerda + ícones empilhados à direita.
            O respiro de 100px no topo é o header flutuante (fixed em
            top-[10px], 80px de altura). Enquanto o título ocupava essa faixa
            ele já servia de afastamento; sem ele o palco centraliza na tela
            inteira e, em notebook (~750px de altura), a peça subiria por baixo
            do header. O teto de altura do canvas é a mesma conta pelo avesso:
            ele nunca passa do que sobra entre o header e a borda de baixo. */}
        <div className="flex-1 w-full flex items-center justify-center px-4 sm:px-8 pt-[100px] pb-10">
          <div className="w-full flex items-center justify-center gap-8 lg:gap-16 xl:gap-24">
            {/* Coluna esquerda: a peça.
                O teto de largura é a mesma conta de antes pelo avesso, agora
                escrita em largura e não em altura: a caixa de composição é
                1146x1086, então a altura que sobra entre o header e a borda de
                baixo vira largura multiplicando por essa proporção. Em
                notebook de ~750px a peça encolhe em vez de passar por baixo do
                header. */}
            <div className="w-[45%] max-w-[min(640px,calc((100svh-140px)*1.0552))] shrink-0">
              <ProdutoExplodido className="w-full" />
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
