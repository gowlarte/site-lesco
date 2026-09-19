import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import {
  irParaTela,
  limita,
  pushEventoHome,
  suave,
  useLoopDeScroll,
  useMedidor,
  useSemMovimento,
  useSomenteAtivoInterativo,
} from "./palco";
import {
  slideAbertura,
  slidesTipologia,
  TOTAL_TELAS,
  type SlideTipologia,
} from "@/data/hero-solucoes";
import { prioridade } from "@/lib/utils";

/**
 * Hero da home — navegador de soluções (PRD "Hero de Soluções" v0.1).
 *
 * PALCO FIXO: um container de uma tela que gruda na viewport enquanto o leitor
 * percorre um trilho de 9 alturas de tela. O scroll não desce telas — ele troca
 * o conteúdo DENTRO do mesmo container.
 *
 * A TROCA É POR CORTE, não por fusão. A foto que entra é revelada de baixo para
 * cima com `clip-path: inset(X% 0 0 0)`, 100% → 0%, enquanto a anterior fica
 * parada embaixo. Isso importa por um motivo prático: como não há encaixe (ver
 * ./palco.ts), o scroll pode descansar em QUALQUER posição, e o corte reto lê
 * como intencional em todas elas. A fusão de opacidade que existia aqui antes
 * ficava com duas fotos lavadas no meio do caminho.
 *
 * A tipografia NÃO é cortada junto: ela é irmã da foto e faz fade +
 * deslocamento, senão o título apareceria serrado pela linha de corte.
 *
 * Decisões do PRD que sobrevivem ao formato:
 *
 * 1. SEM AUTOPLAY. Nada troca sozinho.
 * 2. AS 9 TELAS ESTÃO NO HTML INICIAL, com <a href> reais e um H2 por tipologia.
 *    Por isso a tela inativa é marcada `inert`: sem isso o Tab passearia por
 *    nove conjuntos de CTA invisíveis.
 * 3. UM ÚNICO H1 (tela 01). As tipologias são H2.
 */

const GA_EVENT_NAV = "hero_tab_click";
const GA_EVENT_CTA = "hero_cta_click";
const GA_EVENT_VIEW = "hero_slide_view";

/** Uma tela precisa ficar 1s como ativa para contar como visualização. */
const VIEW_DWELL_MS = 1000;

/** Distância do palco ao topo da viewport — a mesma goteira de 10px do site. */
const TOPO_PALCO = 10;

/** Zoom de overscan da imagem: a sobra que o parallax consome sem mostrar borda. */
const IMG_ESCALA = 1.14;
/** Deslocamento máximo do parallax, em % da altura. Menor que a sobra do zoom. */
const IMG_DESLOCA = 5.5;

/**
 * Janelas da transição, em fração de uma tela de scroll. A ordem importa: o
 * texto sai ANTES de o corte passar e só volta DEPOIS. Se as duas janelas se
 * cruzassem, o título de uma tela apareceria sobre a foto da outra.
 *
 *   |d| < 0.25          texto no lugar, legível
 *   0.25 .. 0.42        texto sai em fade + deslocamento
 *   0.38 .. 0.62        o corte atravessa a tela
 *   0.42 .. 0.25        texto da próxima entra
 */
const TXT_INICIO = 0.25;
const TXT_FIM = 0.42;
const CORTE_INICIO = 0.38;
const CORTE_FIM = 0.62;

/**
 * Todo CTA do módulo carrega `utm_content=hero_<tipologia>` para separar, no
 * GA4 e no destino, o tráfego que saiu de cada tela.
 */
function comUtm(href: string, slideId: string) {
  return href + "?utm_content=hero_" + slideId;
}

/** Peso do deslocamento de cada linha — é o que dá o leque na entrada e saída. */
const PESO = { regua: 0.6, titulo: 1, texto: 1.3, acao: 1.6 };

const estilo = (peso: number) => ({ "--peso": peso }) as React.CSSProperties;

/** Recuo lateral do texto. A régua usa só o da esquerda: ela vai até a borda. */
const RECUO = "px-6 sm:px-8 lg:px-12";

/** Número da tela e pílulas da linha. Mora no bloco de cada tela — entra e
 *  sai no fade junto com o título, encostada por cima da linha do loader. */
/**
 * A faixa de pílulas logo acima da linha.
 *
 * A abertura não tem pílula e por isso não rende nada — mas o espaço dela
 * continua reservado no CSS (`--legenda-h`), senão o título da tela 01 cairia
 * mais baixo que o das outras e a troca daria um solavanco.
 */
function Legenda({ pilulas }: { pilulas: string[] }) {
  if (pilulas.length === 0) return null;
  return (
    <div
      className="hero-slot-legenda hero-mov absolute inset-x-0 flex items-center gap-3 pl-6 sm:pl-8 lg:pl-12"
      style={estilo(PESO.regua)}
    >
      {pilulas.map((rotulo) => (
        <span key={rotulo} className={pilula}>
          {rotulo}
        </span>
      ))}
    </div>
  );
}

const pilula =
  "inline-flex shrink-0 items-center rounded-full border border-white/40 px-3 py-1 rotulo text-white";

export function HeroSolucoes() {
  const [ativo, setAtivo] = useState(0);
  const semMovimento = useSemMovimento();

  const trilhoRef = useRef<HTMLDivElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const camadasRef = useRef<Array<HTMLDivElement | null>>([]);
  const imagensRef = useRef<Array<HTMLImageElement | null>>([]);
  const conteudosRef = useRef<Array<HTMLDivElement | null>>([]);
  /** Barra única: vive na camada fixa, fora dos blocos que dão fade. */
  const barraRef = useRef<HTMLSpanElement>(null);
  /** Tela mais próxima, fora do React: o loop de scroll roda a cada quadro. */
  const ativoRef = useRef(0);
  const jaContadasRef = useRef<Set<number>>(new Set());

  const medir = useMedidor(trilhoRef, palcoRef, TOPO_PALCO, TOTAL_TELAS);

  const irPara = useCallback(
    (i: number) => irParaTela(medir, i, TOTAL_TELAS, !semMovimento),
    [medir, semMovimento],
  );

  /** Última tela: leva para o conteúdo que vem depois do módulo. */
  const sairDoModulo = useCallback(() => {
    const proxima = trilhoRef.current?.nextElementSibling as HTMLElement | null;
    const behavior = semMovimento ? "auto" : "smooth";
    if (proxima) proxima.scrollIntoView({ behavior, block: "start" });
    else window.scrollBy({ top: window.innerHeight, behavior });
  }, [semMovimento]);

  const desenhar = useCallback(() => {
    const m = medir();
    if (!m) return;
    /** Posição contínua entre telas: 0 = abertura, 8 = pedra flexível. */
    const pos = m.pos;

    for (let i = 0; i < TOTAL_TELAS; i++) {
      const d = pos - i;

      // Corte: a camada é revelada de baixo para cima. `inset(100%)` = nada
      // visível; `inset(0%)` = tela cheia. A de cima sempre cobre a anterior,
      // então nunca há duas fotos misturadas — há uma linha entre elas.
      const camada = camadasRef.current[i];
      if (camada) {
        const revela = suave(d + 1, CORTE_INICIO, CORTE_FIM);
        camada.style.clipPath = "inset(" + ((1 - revela) * 100).toFixed(3) + "% 0% 0% 0%)";
        // Fora da janela a camada não pinta nada: ou está fechada, ou está
        // inteiramente coberta pela de cima. Mantém 2 camadas compostas, não 9.
        camada.style.visibility = d > -CORTE_FIM && d < 1 + CORTE_INICIO ? "" : "hidden";
      }

      const img = imagensRef.current[i];
      if (img) {
        const dy = semMovimento ? 0 : -limita(d, -1, 1) * IMG_DESLOCA;
        img.style.transform =
          "translate3d(0," + dy.toFixed(3) + "%,0) scale(" + IMG_ESCALA + ")";
      }

      // Tipografia: fade simétrico em torno da tela. O deslocamento segue a
      // MESMA curva do fade, então o texto fica parado enquanto está legível
      // e só viaja no trecho em que está sumindo ou chegando.
      const conteudo = conteudosRef.current[i];
      if (conteudo) {
        const saida = suave(Math.abs(d), TXT_INICIO, TXT_FIM);
        conteudo.style.opacity = String(1 - saida);
        conteudo.style.visibility = saida < 0.999 ? "" : "hidden";
        conteudo.style.setProperty(
          "--tela-d",
          semMovimento ? "0" : String(Math.sign(d) * saida),
        );
      }
    }

    // Progresso do CONJUNTO: 0 na primeira tela, 1 na última — não é o
    // progresso da tela atual. A barra é uma só e mora na camada fixa, então
    // ela atravessa o módulo inteiro sem sumir a cada troca.
    if (barraRef.current) {
      const progresso = pos / (TOTAL_TELAS - 1);
      barraRef.current.style.transform = "scaleX(" + progresso.toFixed(4) + ")";
    }

    const proximo = Math.round(pos);
    if (proximo !== ativoRef.current) {
      ativoRef.current = proximo;
      setAtivo(proximo);
    }
  }, [medir, semMovimento]);

  useLoopDeScroll(desenhar);
  useSomenteAtivoInterativo(conteudosRef, ativo);

  // hero_slide_view — uma vez por tela, por carregamento de página.
  useEffect(() => {
    const contadas = jaContadasRef.current;
    if (contadas.has(ativo)) return;
    const id = window.setTimeout(() => {
      contadas.add(ativo);
      const tela = ativo === 0 ? slideAbertura : slidesTipologia[ativo - 1];
      pushEventoHome(GA_EVENT_VIEW, tela.id, tela.titulo);
    }, VIEW_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [ativo]);

  /** Setas ↑↓ percorrem as telas quando o foco está dentro do módulo. */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    if ((e.target as HTMLElement).closest("input, textarea, select")) return;
    const proximo = ativo + (e.key === "ArrowDown" ? 1 : -1);
    if (proximo < 0 || proximo >= TOTAL_TELAS) return;
    e.preventDefault();
    irPara(proximo);
  };

  const avancar = () => {
    if (ativo >= TOTAL_TELAS - 1) {
      sairDoModulo();
      return;
    }
    const destino = slidesTipologia[ativo];
    pushEventoHome(GA_EVENT_NAV, destino.id, destino.titulo);
    irPara(ativo + 1);
  };

  const rotuloScroll =
    ativo >= TOTAL_TELAS - 1 ? t("Continuar a página") : t("Scroll para explorar");

  return (
    <div
      ref={trilhoRef}
      onKeyDown={onKeyDown}
      className="hero-solucoes relative mt-[10px]"
      style={{ height: "calc(" + TOTAL_TELAS + " * 100svh - 20px)" }}
    >
      <div
        ref={palcoRef}
        className="hero-palco sticky top-[10px] h-[calc(100svh-20px)] mx-[10px] rounded-[10px] overflow-hidden bg-primary"
      >
        {/* ---------- Camadas de imagem ---------- */}
        {[slideAbertura, ...slidesTipologia].map((tela, i) => (
          <div
            key={tela.id}
            ref={(el) => {
              camadasRef.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          >
            <img
              ref={(el) => {
                imagensRef.current[i] = el;
              }}
              src={tela.imagem}
              alt={tela.alt}
              loading={i === 0 ? undefined : "lazy"}
              {...prioridade(i === 0 ? "high" : undefined)}
              decoding="async"
              className="hero-img absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Tint chapado: uma cor só sobre a foto inteira, sem degradê. */}
        <div className="hero-tint absolute inset-0 z-[5] pointer-events-none" />

        {/* ---------- Tela 01 — abertura institucional ---------- */}
        <div
          ref={(el) => {
            conteudosRef.current[0] = el;
          }}
          id="hero-abertura"
          className="hero-conteudo hero-sem-pilula absolute inset-0 z-10 text-white"
          style={{ opacity: 1 }}
        >
          {/* A marca é lida por useSaiuDoHero: é a chegada deste título à
              base do cabeçalho que acende o fundo do menu e o WhatsApp. */}
          <div data-hero-titulo className={"hero-slot-titulo absolute inset-x-0 " + RECUO}>
            <h1
              className="hero-mov max-w-[16ch] font-display font-light text-[40px] sm:text-[54px] lg:text-[72px] leading-[1.02] tracking-[-0.02em]"
              style={estilo(PESO.titulo)}
            >
              {slideAbertura.titulo}
            </h1>
          </div>

          <div className={"hero-slot-corpo absolute inset-x-0 bottom-0 " + RECUO}>
            <ul
              className="hero-mov flex flex-col sm:flex-row sm:flex-wrap gap-y-1.5 gap-x-8"
              style={estilo(PESO.texto)}
            >
              {slideAbertura.selos.map((selo) => (
                <li
                  key={selo}
                  className="font-body text-[12px] lg:text-[13px] font-light text-white"
                >
                  {selo}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Telas 02..09 — uma por tipologia ---------- */}
        {slidesTipologia.map((slide, i) => (
          <TelaTipologia
            key={slide.id}
            ref={(el) => {
              conteudosRef.current[i + 1] = el;
            }}
            slide={slide}
          />
        ))}

        {/* ---------- Linha do loader ----------
             É a ÚNICA coisa fixa do módulo: atravessa a página e mede o
             progresso do conjunto. Fica fora dos blocos que dão fade, senão
             sumiria e voltaria a cada troca de tela. Número e pílulas, esses
             sim, entram e saem com a tela (ver Legenda). */}
        <span className="hero-regua absolute inset-x-0 z-20 block h-px overflow-hidden bg-white/30">
          <span
            ref={barraRef}
            className="block h-full w-full origin-left bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </span>

        {/* ---------- Indicador de scroll ----------
             No mobile sobra só a seta: o rótulo não cabe ao lado dela sem
             espremer, e ali o gesto de rolar é óbvio. O recuo é dado por
             padding em vez de posição para o alvo de toque chegar a 42px —
             os valores compensam um ao outro, então o ícone cai no mesmo
             ponto em qualquer largura.

             Pode usar o canto: o botão do WhatsApp só entra depois do hero
             (ver useSaiuDoHero), e quando ele entra o palco já subiu o
             bastante para a seta não estar mais lá embaixo. */}
        <button
          type="button"
          onClick={avancar}
          aria-label={rotuloScroll}
          className="absolute bottom-3.5 right-2.5 lg:right-[34px] z-30 inline-flex items-center gap-2 p-3.5 font-body text-[12px] text-white hover:opacity-70 transition-opacity duration-300"
        >
          <span className="hidden sm:inline">{rotuloScroll}</span>
          <ArrowDown size={14} className="hero-seta" />
        </button>
      </div>
    </div>
  );
}

interface TelaTipologiaProps {
  slide: SlideTipologia;
}

const TelaTipologia = forwardRef<HTMLDivElement, TelaTipologiaProps>(function TelaTipologia(
  { slide },
  ref,
) {
  return (
    <div
      ref={ref}
      id={slide.id}
      className="hero-conteudo absolute inset-0 z-10 text-white"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <div data-hero-titulo className={"hero-slot-titulo absolute inset-x-0 " + RECUO}>
        <h2
          className="hero-mov font-display font-light text-[40px] sm:text-[54px] lg:text-[72px] leading-[1.02] tracking-[-0.02em]"
          style={estilo(PESO.titulo)}
        >
          {slide.titulo}
        </h2>
      </div>

      <Legenda pilulas={slide.eyebrow.split(" · ").filter(Boolean)} />

      <div className={"hero-slot-corpo absolute inset-x-0 bottom-0 " + RECUO}>
        <div className="hero-mov" style={estilo(PESO.acao)}>
          <Link
            to={comUtm(slide.href, slide.id)}
            onClick={() => pushEventoHome(GA_EVENT_CTA, slide.id, slide.cta)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#141414] font-display text-[12px] uppercase tracking-[0.08em] hover:bg-white/85 transition-colors duration-300"
          >
            {slide.cta}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
});
