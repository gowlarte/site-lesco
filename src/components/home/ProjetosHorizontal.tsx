import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import { responsiva } from "@/lib/imagem";
/* `projetosDaHome`, e não `projetos`: a lista inteira inclui obras que
   entraram pelo tour 360 e ainda não têm case escrito — ver o comentário na
   fonte. */
import { projetosDaHome as projetos } from "@/data/projetos";
import { numero, pushEventoHome, useSemMovimento } from "./palco";

/**
 * Projetos selecionados — carrossel lateral de cartões.
 *
 * Era um palco fixo: a seção prendia a página por oito telas de rolagem e o
 * scroll vertical corria a faixa para o lado. Funcionava como vitrine, mas era
 * OBRIGATÓRIO — para passar dos projetos era preciso atravessar todos eles.
 *
 * Agora a seção tem a altura dela e a página passa direto. Ver os outros
 * projetos é opcional: desliza-se a faixa para o lado com o dedo (ou trackpad),
 * ou usam-se as setas. Os cartões não ocupam a largura inteira de propósito —
 * a borda do seguinte aparecendo ao lado é o que diz que há mais para ver.
 *
 * O encaixe é do próprio navegador (`scroll-snap`): cada gesto termina com um
 * cartão alinhado à esquerda, sem JS conduzindo a rolagem.
 */

const GA_EVENT_NAV = "projeto_nav_click";
const GA_EVENT_CTA = "projeto_cta_click";
const GA_EVENT_VIEW = "projeto_view";

/** Um projeto precisa ficar 1s como ativo para contar como visualização. */
const VIEW_DWELL_MS = 1000;

const TOTAL = projetos.length;

/** Largura do cartão: casa com as classes `w-[…]` dos <article>. */
const SIZES_CARTAO = "(min-width: 1024px) 62vw, (min-width: 640px) 72vw, 84vw";

/** "Xangri-Lá, RS · 2024" — o traço em `ano` marca projeto sem data fechada. */
function legenda(local: string, ano: string) {
  return [local, ano && ano !== "—" ? ano : null].filter(Boolean).join(" · ");
}

export function ProjetosHorizontal() {
  const [ativo, setAtivo] = useState(0);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(TOTAL <= 1);
  const semMovimento = useSemMovimento();

  const faixaRef = useRef<HTMLDivElement>(null);
  const cartoesRef = useRef<Array<HTMLElement | null>>([]);
  const jaContadosRef = useRef<Set<number>>(new Set());

  /** Lê da rolagem qual cartão está alinhado e se há para onde ir. */
  const medir = useCallback(() => {
    const faixa = faixaRef.current;
    if (!faixa) return;
    const inicio = parseFloat(getComputedStyle(faixa).paddingLeft) || 0;
    const x = faixa.scrollLeft;
    const max = faixa.scrollWidth - faixa.clientWidth;
    // O cartão ativo é o de borda esquerda mais perto do ponto de encaixe.
    let melhor = 0;
    let menor = Infinity;
    cartoesRef.current.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(el.offsetLeft - inicio - x);
      if (dist < menor) {
        menor = dist;
        melhor = i;
      }
    });
    // No fim da faixa o último cartão não consegue encostar na esquerda; se
    // não há mais para onde rolar, ele é o ativo.
    if (x >= max - 2) melhor = TOTAL - 1;
    setAtivo(melhor);
    setNoInicio(x <= 2);
    setNoFim(x >= max - 2);
  }, []);

  useEffect(() => {
    const faixa = faixaRef.current;
    if (!faixa) return;
    let raf = 0;
    const aoRolar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(medir);
    };
    medir();
    faixa.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      cancelAnimationFrame(raf);
      faixa.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [medir]);

  const irPara = useCallback(
    (i: number) => {
      const faixa = faixaRef.current;
      const alvo = cartoesRef.current[Math.max(0, Math.min(TOTAL - 1, i))];
      if (!faixa || !alvo) return;
      const inicio = parseFloat(getComputedStyle(faixa).paddingLeft) || 0;
      faixa.scrollTo({
        left: alvo.offsetLeft - inicio,
        behavior: semMovimento ? "auto" : "smooth",
      });
    },
    [semMovimento],
  );

  // ------------------------------------------------- arrastar com o mouse

  /**
   * No toque a faixa já desliza sozinha (rolagem nativa). Com mouse não há
   * gesto nativo de arrastar para o lado, então ele é feito aqui — só para
   * `pointerType === "mouse"`, para não disputar o dedo com o navegador.
   *
   * Durante o arrasto o encaixe do CSS fica desligado (`data-arrastando`): com
   * `snap-mandatory` ligado, cada `scrollLeft` escrito à mão seria puxado de
   * volta para o cartão mais próximo. Na soltura a faixa vai ao cartão mais
   * perto — ou ao seguinte no sentido do arremesso, se o mouse vinha rápido —
   * e só depois que ela assenta o encaixe volta.
   *
   * O cartão inteiro é link: um arrasto que termina sobre ele não pode virar
   * clique. Daí o `onClickCapture` engolindo o clique que segue um arrasto.
   */
  const arrastoRef = useRef<{
    id: number;
    x0: number;
    s0: number;
    moveu: boolean;
    ultimoX: number;
    ultimoT: number;
    vel: number;
  } | null>(null);
  const engolirCliqueRef = useRef(false);

  const aoPressionar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const faixa = faixaRef.current;
    if (!faixa) return;
    engolirCliqueRef.current = false;
    arrastoRef.current = {
      id: e.pointerId,
      x0: e.clientX,
      s0: faixa.scrollLeft,
      moveu: false,
      ultimoX: e.clientX,
      ultimoT: performance.now(),
      vel: 0,
    };
  };

  const aoMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = arrastoRef.current;
    const faixa = faixaRef.current;
    if (!a || !faixa || e.pointerId !== a.id) return;
    const dx = e.clientX - a.x0;
    if (!a.moveu) {
      // Abaixo de 6px é clique, não arrasto.
      if (Math.abs(dx) < 6) return;
      a.moveu = true;
      faixa.setPointerCapture(e.pointerId);
      faixa.dataset.arrastando = "sim";
    }
    faixa.scrollLeft = a.s0 - dx;
    const agora = performance.now();
    const dt = agora - a.ultimoT;
    if (dt > 0) a.vel = (e.clientX - a.ultimoX) / dt;
    a.ultimoX = e.clientX;
    a.ultimoT = agora;
  };

  const aoSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = arrastoRef.current;
    arrastoRef.current = null;
    const faixa = faixaRef.current;
    if (!a || !faixa || e.pointerId !== a.id || !a.moveu) return;
    engolirCliqueRef.current = true;
    if (faixa.hasPointerCapture(e.pointerId)) faixa.releasePointerCapture(e.pointerId);

    // Posição fracionária na faixa, em cartões.
    const [c0, c1] = cartoesRef.current;
    const passoPx = c0 && c1 ? c1.offsetLeft - c0.offsetLeft : faixa.clientWidth;
    const p = faixa.scrollLeft / (passoPx || 1);
    // Mouse indo para a esquerda (vel < 0) é avançar a faixa.
    const parado = performance.now() - a.ultimoT > 120;
    const destino = parado || Math.abs(a.vel) < 0.3
      ? Math.round(p)
      : a.vel < 0
        ? Math.ceil(p)
        : Math.floor(p);
    irPara(destino);

    // O encaixe só volta com a faixa parada; ligado antes, ele brigaria com a
    // rolagem suave até o cartão.
    let feito = false;
    const religar = () => {
      if (feito) return;
      feito = true;
      delete faixa.dataset.arrastando;
    };
    faixa.addEventListener("scrollend", religar, { once: true });
    window.setTimeout(religar, 900);
  };

  const passo = (lado: 1 | -1) => {
    const destino = Math.max(0, Math.min(TOTAL - 1, ativo + lado));
    pushEventoHome(GA_EVENT_NAV, projetos[destino].slug, projetos[destino].nome);
    irPara(destino);
  };

  // projeto_view — uma vez por projeto, por carregamento de página.
  useEffect(() => {
    const contados = jaContadosRef.current;
    if (contados.has(ativo)) return;
    const id = window.setTimeout(() => {
      contados.add(ativo);
      pushEventoHome(GA_EVENT_VIEW, projetos[ativo].slug, projetos[ativo].nome);
    }, VIEW_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [ativo]);

  const seta =
    "grid h-11 w-11 place-items-center rounded-full border border-white/50 text-white transition-colors duration-300 hover:bg-white hover:text-[#141414] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-default";

  return (
    <section
      aria-labelledby="projetos-titulo"
      className="projetos-h mx-[10px] rounded-[10px] overflow-hidden bg-primary py-12 lg:py-16"
    >
      {/* ---------- Cabeçalho: rótulo, contador e setas ---------- */}
      <div className="flex items-end justify-between gap-6 px-6 sm:px-8 lg:px-12">
        <h2
          id="projetos-titulo"
          className="font-display text-[26px] sm:text-[30px] lg:text-[40px] font-light leading-[1.1] tracking-[-0.01em] text-white"
        >
          {t("Projetos selecionados")}
        </h2>

        {/* O contador sai abaixo de 640px: título, contador e duas setas não
            cabem lado a lado em 375px, e ali a borda do cartão seguinte já
            diz que há mais. */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline font-mono text-[12px] tracking-[0.1em] text-white tabular-nums">
            {numero(ativo + 1)} / {numero(TOTAL)}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => passo(-1)}
              disabled={noInicio}
              aria-label={t("Projeto anterior")}
              className={seta}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => passo(1)}
              disabled={noFim}
              aria-label={t("Próximo projeto")}
              className={seta}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Faixa de cartões ----------
           `data-lenis-prevent-horizontal`: o Lenis cuida da roda vertical da
           página inteira, e sem isto ele engoliria o gesto lateral do trackpad
           sobre a faixa. Com o atributo, gesto mais lateral que vertical é do
           navegador; o vertical continua rolando a página. */}
      <div
        ref={faixaRef}
        data-lenis-prevent-horizontal
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onClickCapture={(e) => {
          if (!engolirCliqueRef.current) return;
          engolirCliqueRef.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
        // Sem isto o navegador começa a arrastar a <img> ou o link como
        // arquivo, e o arrasto da faixa nunca recebe o movimento.
        onDragStart={(e) => e.preventDefault()}
        className="projetos-faixa relative mt-8 lg:mt-10 flex gap-[10px] overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-6 sm:px-8 lg:px-12 scroll-px-6 sm:scroll-px-8 lg:scroll-px-12"
      >
        {projetos.map((projeto, i) => (
          <article
            key={projeto.slug}
            ref={(el) => {
              cartoesRef.current[i] = el;
            }}
            aria-label={`${numero(i + 1)} / ${numero(TOTAL)}`}
            className="relative shrink-0 snap-start w-[84%] sm:w-[72%] lg:w-[62%] aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(70vh,620px)] overflow-hidden rounded-[10px]"
          >
            <Link
              to={"/projetos/" + projeto.slug}
              onClick={() => pushEventoHome(GA_EVENT_CTA, projeto.slug, projeto.nome)}
              className="group absolute inset-0 block text-white"
            >
              <img
                src={projeto.imagem}
                {...responsiva(projeto.imagem, SIZES_CARTAO)}
                alt={projeto.nome}
                loading={i < 2 ? undefined : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="projeto-tint absolute inset-0 pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-9">
                <p className="text-caption text-white mb-3">{legenda(projeto.local, projeto.ano)}</p>
                <h3 className="font-display font-light text-[30px] sm:text-[40px] lg:text-[52px] leading-[1.04] tracking-[-0.02em]">
                  {projeto.nome}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#141414] font-display text-[12px] uppercase tracking-[0.08em] group-hover:bg-white/85 transition-colors duration-300">
                  {t("Ver projeto")}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
