import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import { projetos } from "@/data/projetos";
import {
  irParaTela,
  limita,
  numero,
  pushEventoHome,
  suave,
  useLoopDeScroll,
  useMedidor,
  useSemMovimento,
  useSomenteAtivoInterativo,
} from "./palco";

/**
 * Projetos selecionados — palco fixo com navegação HORIZONTAL.
 *
 * Mesma mecânica do hero (ver ./palco.ts): um trilho alto e um palco `sticky`
 * de uma tela. A diferença é o que a posição faz — aqui ela corre uma faixa de
 * projetos para o lado, um por tela cheia.
 *
 * A seção é a única da home que sangra: sem goteira de 10px, sem canto
 * arredondado, altura de tela inteira. É proposital — a foto de obra é o
 * argumento, e ela pede a tela toda.
 *
 * Três camadas em profundidades diferentes, que é o que dá a leitura de
 * parallax: a foto corre MAIS DEVAGAR que o painel (fica para trás), o painel
 * corre com o scroll, e a tipografia sai MAIS RÁPIDO que o painel.
 */

const GA_EVENT_NAV = "projeto_nav_click";
const GA_EVENT_CTA = "projeto_cta_click";
const GA_EVENT_VIEW = "projeto_view";

/** Um projeto precisa ficar 1s como ativo para contar como visualização. */
const VIEW_DWELL_MS = 1000;

/** O palco sangra: gruda no topo da viewport, sem goteira. */
const TOPO_PALCO = 0;

/** Zoom de overscan da foto: a sobra que o parallax consome sem mostrar borda. */
const IMG_ESCALA = 1.16;
/** Atraso da foto em relação ao painel, em % da largura. Menor que a sobra. */
const IMG_ATRASO = 7;

/**
 * Janelas da transição, em fração de uma tela de scroll. O texto some cedo:
 * em |d| = 0.5 o painel está metade fora da tela, e um título cortado ao meio
 * na borda esquerda fica pior do que título nenhum.
 */
const TXT_INICIO = 0.15;
const TXT_FIM = 0.4;

/** Peso do avanço de cada linha — é o que dá o leque na saída e na entrada. */
const PESO = { eyebrow: 0.6, titulo: 1, acao: 1.4 };

const estilo = (peso: number) => ({ "--peso": peso }) as React.CSSProperties;

const TOTAL = projetos.length;

/** "Xangri-Lá, RS · 2024" — o traço em `ano` marca projeto sem data fechada. */
function legenda(local: string, ano: string) {
  return [local, ano && ano !== "—" ? ano : null].filter(Boolean).join(" · ");
}

export function ProjetosHorizontal() {
  const [ativo, setAtivo] = useState(0);
  const semMovimento = useSemMovimento();

  const trilhoRef = useRef<HTMLDivElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);
  const imagensRef = useRef<Array<HTMLImageElement | null>>([]);
  const conteudosRef = useRef<Array<HTMLDivElement | null>>([]);
  /** Projeto mais próximo, fora do React: o loop roda a cada quadro. */
  const ativoRef = useRef(0);
  const jaContadosRef = useRef<Set<number>>(new Set());

  const medir = useMedidor(trilhoRef, palcoRef, TOPO_PALCO, TOTAL);

  const irPara = useCallback(
    (i: number) => irParaTela(medir, i, TOTAL, !semMovimento),
    [medir, semMovimento],
  );

  const desenhar = useCallback(() => {
    const m = medir();
    if (!m) return;
    const pos = m.pos;

    // A faixa inteira corre para a esquerda: 100% = a largura do palco.
    const faixa = faixaRef.current;
    if (faixa) {
      faixa.style.transform = "translate3d(" + (-pos * 100).toFixed(4) + "%,0,0)";
    }

    for (let i = 0; i < TOTAL; i++) {
      const d = pos - i;

      const img = imagensRef.current[i];
      if (img) {
        // A foto fica PARA TRÁS do painel: deslocamento no mesmo sentido em que
        // o painel sai, o que a faz parecer mais lenta que o resto.
        const dx = semMovimento ? 0 : limita(d, -1, 1) * IMG_ATRASO;
        img.style.transform =
          "translate3d(" + dx.toFixed(3) + "%,0,0) scale(" + IMG_ESCALA + ")";
        // Aquece a foto vizinha: o lazy nativo mede a viewport, e um painel que
        // só se move por transform pode chegar sem ter começado a carregar.
        if (Math.abs(d) < 1.5 && img.loading === "lazy") img.loading = "eager";
      }

      // Tipografia: fade + avanço. O deslocamento segue a MESMA curva do fade,
      // então o título fica parado enquanto está legível e só viaja ao sair.
      const conteudo = conteudosRef.current[i];
      if (conteudo) {
        const saida = suave(Math.abs(d), TXT_INICIO, TXT_FIM);
        conteudo.style.opacity = String(1 - saida);
        conteudo.style.visibility = saida < 0.999 ? "" : "hidden";
        conteudo.style.setProperty(
          "--proj-d",
          semMovimento ? "0" : String(Math.sign(d) * saida),
        );
      }
    }

    const proximo = Math.round(pos);
    if (proximo !== ativoRef.current) {
      ativoRef.current = proximo;
      setAtivo(proximo);
    }
  }, [medir, semMovimento]);

  useLoopDeScroll(desenhar);
  useSomenteAtivoInterativo(conteudosRef, ativo);

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

  /** Setas ←→ percorrem os projetos quando o foco está dentro da seção. */
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    let destino: number | null = null;
    if (e.key === "ArrowRight") destino = Math.min(ativo + 1, TOTAL - 1);
    if (e.key === "ArrowLeft") destino = Math.max(ativo - 1, 0);
    if (e.key === "Home") destino = 0;
    if (e.key === "End") destino = TOTAL - 1;
    if (destino === null) return;
    if ((e.target as HTMLElement).closest("input, textarea, select")) return;
    e.preventDefault();
    irPara(destino);
  };

  return (
    <section
      ref={trilhoRef}
      onKeyDown={onKeyDown}
      aria-labelledby="projetos-titulo"
      // -my-[10px] cancela o `gap` do <main>: esta é a única seção que encosta
      // nas bordas da página, e um respiro de 10px acima e abaixo estragaria o
      // efeito de tela cheia.
      className="projetos-h relative -my-[10px]"
      style={{ height: "calc(" + TOTAL + " * 100svh)" }}
    >
      <div
        ref={palcoRef}
        className="projetos-palco sticky top-0 h-[100svh] overflow-hidden bg-primary"
      >
        {/* ---------- Faixa horizontal de projetos ---------- */}
        <div ref={faixaRef} className="flex h-full">
          {projetos.map((projeto, i) => (
            <article
              key={projeto.slug}
              className="relative h-full w-full shrink-0 overflow-hidden"
            >
              <img
                ref={(el) => {
                  imagensRef.current[i] = el;
                }}
                src={projeto.imagem}
                alt={projeto.nome}
                loading={i === 0 ? undefined : "lazy"}
                decoding="async"
                className="projeto-img absolute inset-0 w-full h-full object-cover"
              />
              <div className="projeto-tint absolute inset-0 pointer-events-none" />

              <div
                ref={(el) => {
                  conteudosRef.current[i] = el;
                }}
                className="projeto-conteudo absolute inset-x-0 bottom-0 z-10 px-6 pb-10 sm:px-8 lg:px-12 lg:pb-14 text-white"
                style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? undefined : "none" }}
              >
                <p
                  className="projeto-mov text-caption text-white mb-4"
                  style={estilo(PESO.eyebrow)}
                >
                  {legenda(projeto.local, projeto.ano)}
                </p>
                <h3
                  className="projeto-mov font-display font-light text-[40px] sm:text-[56px] lg:text-[76px] leading-[1.02] tracking-[-0.02em]"
                  style={estilo(PESO.titulo)}
                >
                  {projeto.nome}
                </h3>
                <div className="projeto-mov mt-7" style={estilo(PESO.acao)}>
                  <Link
                    to={"/projetos/" + projeto.slug}
                    onClick={() => pushEventoHome(GA_EVENT_CTA, projeto.slug, projeto.nome)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#141414] font-display text-[12px] uppercase tracking-[0.08em] hover:bg-white/85 transition-colors duration-300"
                  >
                    {t("Ver projeto")}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- Barra da seção: rótulo, contador e índice ---------- */}
        <div className="projetos-barra absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-6 px-6 sm:px-8 lg:px-12 pt-[104px] lg:pt-[112px] pointer-events-none">
          <h2
            id="projetos-titulo"
            className="font-display text-[22px] sm:text-[26px] lg:text-[32px] font-light leading-none tracking-[-0.01em] text-white"
          >
            {t("Projetos selecionados")}
          </h2>

          <div className="flex flex-col items-end gap-3 pointer-events-auto">
            <span className="font-mono text-[12px] tracking-[0.1em] text-white tabular-nums">
              {numero(ativo + 1)} / {numero(TOTAL)}
            </span>
            {/* Botão, e não link: o índice anda pela faixa, não sai da página.
                Um <a href="/projetos/…"> aqui prometeria uma navegação que o
                clique cancela. Os links reais para cada obra são os CTAs dos
                painéis — oito, contra os três da grade anterior.

                Some no mobile: oito marcas não cabem ao lado do rótulo em 375px,
                e encolhê-las deixaria o alvo de toque em 12px. Lá o contador
                sozinho já diz a posição, e o dedo rola. */}
            <div className="hidden sm:flex items-center gap-1.5">
              {projetos.map((projeto, i) => (
                <button
                  key={projeto.slug}
                  type="button"
                  aria-label={projeto.nome}
                  aria-current={i === ativo ? "true" : undefined}
                  onClick={() => {
                    pushEventoHome(GA_EVENT_NAV, projeto.slug, projeto.nome);
                    irPara(i);
                  }}
                  className="group flex h-6 items-center"
                >
                  <span
                    aria-hidden="true"
                    className={
                      "block h-px transition-all duration-300 group-hover:w-9 group-hover:bg-white " +
                      (i === ativo ? "w-9 bg-white" : "w-4 bg-white/70")
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
