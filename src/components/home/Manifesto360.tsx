import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import { cn } from "@/lib/utils";
import { limita, useLoopDeScroll, useSemMovimento } from "./palco";
import { POSTER_ALTA, POSTER_LARGA } from "@/data/biotique";
import { AMBIENTES_HOME } from "@/data/tour-home";
import type { EstadoVisor, Visor } from "./pano-biotique";

/**
 * O manifesto da home, com uma sala de obra em 360 ao lado dele.
 *
 * Duas colunas: o copy à esquerda, e à direita um painel que não é foto — é a
 * sala de verdade, em 360. No celular a mesma coisa empilhada, e ali o painel
 * sangra de borda a borda entre o título e o parágrafo.
 *
 * O PAINEL É UMA PLAYLIST
 *
 * As salas vêm de src/data/tour-home.ts, uma curadoria de várias obras. Cada
 * uma fica `SEGUNDOS_POR_AMBIENTE` na tela e cede a vez para a seguinte; a seta
 * no canto adianta a troca. O anel em volta da seta mostra quanto falta.
 *
 * NO CELULAR O VISOR É TRAVADO
 *
 * Lá ele não aceita dedo nem rolagem: só um pan lento e automático pela sala.
 * Antes, o mesmo dedo que descia a página girava a câmera duas vezes — uma pelo
 * arrasto, outra pela rolagem — e a sala rodava para cima em torno de si mesma.
 * Sem controle no painel, o gesto sobre ele é só da página.
 *
 * NO DESKTOP A ROLAGEM CONTINUA SENDO O CONTROLE
 *
 * Descer vira a sala num sentido, subir desfaz: são 150º ao longo da travessia
 * da seção pela janela, com o enquadramento composto no meio. O desvio é SOMADO
 * ao rumo do visitante (ver `apontar()` no motor), então o arrasto do mouse e
 * as portas continuam valendo. Arrastar adia a troca automática.
 *
 * NÃO É UM PALCO FIXO, de propósito: a página não para em momento nenhum aqui.
 *
 * Nada de 3D existe até a seção se aproximar: three, o motor e o primeiro
 * panorama entram por import dinâmico. Quem não rola até aqui não paga nada, e
 * quem pediu Save-Data fica no pôster.
 */

/**
 * Quanto a câmera gira da entrada à saída da seção, em radianos — só no
 * desktop. 150º é o que faz a rolagem LER como controle: menos que isso passa
 * por deriva de parallax, e muito mais embrulha.
 */
const GIRO = (150 * Math.PI) / 180;
/** Um respiro de inclinação junto, só para o movimento não ser puro eixo Y. */
const INCLINA = 0.09;

/** Quanto cada sala fica na tela antes de ceder a vez. */
const SEGUNDOS_POR_AMBIENTE = 12;
/** Com quanto de antecedência a sala seguinte começa a baixar. */
const SEGUNDOS_DE_AQUECIMENTO = 5;

const ID_INSTRUCAO = "biotique-instrucao";

/**
 * Tela de toque é onde o visor trava. É o ponteiro, e não a largura, que decide:
 * o defeito era do dedo, e uma janela estreita de desktop arrasta sem problema.
 */
function useToque() {
  const [toque, setToque] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setToque(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return toque;
}

const TOTAL = AMBIENTES_HOME.length;

const indiceDe = (id: string | undefined) =>
  Math.max(0, AMBIENTES_HOME.findIndex((a) => a.id === id));

export function Manifesto360() {
  const secaoRef = useRef<HTMLElement>(null);
  const molduraRef = useRef<HTMLDivElement>(null);
  const telaRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const marcasRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<Visor | null>(null);
  /** Fora do React: o observador de visibilidade e o visor leem daqui. */
  const visivelRef = useRef(false);

  const semMovimento = useSemMovimento();
  const travado = useToque();
  const travadoRef = useRef(travado);
  const [querCarregar, setQuerCarregar] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [estado, setEstado] = useState<EstadoVisor | null>(null);
  /** Muda a cada arrasto no desktop: reinicia a contagem da troca. */
  const [mexida, setMexida] = useState(0);

  const ambiente = AMBIENTES_HOME[indiceDe(estado?.cena)];

  // ---------------------------------------------------------- a rolagem gira

  const desenhar = useCallback(() => {
    const secao = secaoRef.current;
    const visor = visorRef.current;
    if (!secao || !visor) return;
    if (semMovimento || travado) {
      visor.apontar(0, 0);
      return;
    }
    const r = secao.getBoundingClientRect();
    const janela = window.innerHeight || 1;
    // Travessia: 0 quando o topo da seção encosta no pé da janela, 1 quando o
    // pé dela passa do topo.
    const p = limita((janela - r.top) / (janela + r.height), 0, 1);
    // Centrado em 0,5: o enquadramento composto é o do meio da travessia.
    visor.apontar((p - 0.5) * GIRO, (p - 0.5) * INCLINA);
  }, [semMovimento, travado]);

  useLoopDeScroll(desenhar);

  /* O efeito do visor precisa mirar a câmera assim que ela nasce, mas não pode
     depender de `desenhar`: ele muda com `prefers-reduced-motion` e com o tipo
     de ponteiro, e isso derrubaria e recriaria o contexto WebGL. */
  const desenharRef = useRef(desenhar);
  useEffect(() => {
    desenharRef.current = desenhar;
  }, [desenhar]);

  useEffect(() => {
    travadoRef.current = travado;
    visorRef.current?.travar(travado);
  }, [travado]);

  // ---------------------------------------------------------- quando carregar

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao || querCarregar) return;

    // Save-Data é o único pedido explícito de gastar menos que o navegador
    // manda: fica o pôster.
    const conexao = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conexao?.saveData) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        observador.disconnect();
        setQuerCarregar(true);
      },
      // Uma tela cheia de antecedência: o módulo e o primeiro panorama têm
      // tempo de chegar antes de a seção entrar.
      { rootMargin: "1000px 0px" },
    );
    observador.observe(secao);
    return () => observador.disconnect();
  }, [querCarregar]);

  // ------------------------------------------------- quando desenhar quadros

  /**
   * O laço segue a VISIBILIDADE do painel. Sem `preserveDrawingBuffer` o canvas
   * não guarda o último quadro, então ele desenha enquanto o painel estiver à
   * vista e para quando sai. A troca automática segue a mesma regra: sala que
   * ninguém está vendo não precisa ceder a vez, nem baixar a seguinte.
   */
  useEffect(() => {
    const moldura = molduraRef.current;
    if (!moldura) return;
    const observador = new IntersectionObserver((entradas) => {
      const agora = entradas.some((e) => e.isIntersecting);
      if (agora === visivelRef.current) return;
      visivelRef.current = agora;
      setVisivel(agora);
      visorRef.current?.ativar(agora);
    });
    observador.observe(moldura);
    return () => observador.disconnect();
  }, []);

  // ------------------------------------------------------------------ o visor

  useEffect(() => {
    if (!querCarregar) return;
    let cancelado = false;

    void (async () => {
      try {
        const { criarVisor } = await import("./pano-biotique");
        const tela = telaRef.current;
        const palco = palcoRef.current;
        const marcas = marcasRef.current;
        if (cancelado || !tela || !palco || !marcas) return;
        visorRef.current = criarVisor({
          tela,
          palco,
          marcas,
          cenas: AMBIENTES_HOME,
          segundosPorCena: SEGUNDOS_POR_AMBIENTE,
          rotuloPorta: (nome) => `${t("Ir para")} ${nome}`,
          aoMudar: (novo) => {
            if (!cancelado) setEstado(novo);
          },
        });
        visorRef.current.travar(travadoRef.current);
        visorRef.current.ativar(visivelRef.current);
        // Sem isto a sala abre no enquadramento de repouso e só se endireita no
        // próximo evento de scroll, que pode não vir se a pessoa parar de rolar.
        desenharRef.current();
        if (!cancelado) setPronto(true);
      } catch (erro) {
        console.warn("[biotique] visor não subiu", erro);
      }
    })();

    return () => {
      cancelado = true;
      visorRef.current?.destruir();
      visorRef.current = null;
    };
  }, [querCarregar]);

  // ------------------------------------------------------------ a playlist

  const proximo = useCallback(() => {
    const visor = visorRef.current;
    if (!visor || TOTAL < 2) return;
    const seguinte = AMBIENTES_HOME[(indiceDe(estado?.cena) + 1) % TOTAL];
    if (seguinte) visor.irParaCena(seguinte.id);
  }, [estado?.cena]);

  /**
   * A contagem só corre com a sala INTEIRA na tela: visível, com o panorama já
   * chegado. Numa conexão lenta, contar desde o borrão daria doze segundos de
   * borrão e nenhuma sala. Menos movimento desliga a troca sozinha — sobra a
   * seta, e nada muda na tela sem a pessoa pedir.
   */
  const contando =
    pronto && visivel && !!estado && !estado.carregando && !semMovimento && TOTAL > 1;

  useEffect(() => {
    if (!contando) return;
    const seguinte = AMBIENTES_HOME[(indiceDe(estado?.cena) + 1) % TOTAL];
    const aquece = window.setTimeout(
      () => seguinte && visorRef.current?.aquecer(seguinte.id),
      (SEGUNDOS_POR_AMBIENTE - SEGUNDOS_DE_AQUECIMENTO) * 1000,
    );
    const troca = window.setTimeout(() => {
      // Aba em segundo plano: os timers seguem, a tela não. Recomeça a conta.
      if (document.hidden) setMexida((n) => n + 1);
      else proximo();
    }, SEGUNDOS_POR_AMBIENTE * 1000);
    return () => {
      window.clearTimeout(aquece);
      window.clearTimeout(troca);
    };
  }, [contando, estado?.cena, mexida, proximo]);

  // O pôster só sai quando há uma sala desenhada por baixo dele.
  const mostraTela = pronto && !estado?.falhou;

  return (
    <section ref={secaoRef} className="manifesto-360">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[34%_1fr] lg:gap-x-14 xl:gap-x-20 lg:items-center">
          <h2 className="order-1 lg:col-start-1 lg:row-start-1 font-display text-3xl md:text-4xl lg:text-[44px] xl:text-[52px] font-normal leading-[1.28] md:leading-[1.28] lg:leading-[1.22] text-dark">
            {t("Pioneiros em Madeira Ecológica no Brasil, somos arquitetura feita para o amanhã.")}
          </h2>

          {/* No celular o painel sangra de borda a borda; no desktop ele
              respeita a mesma margem lateral de todo bloco da página, que é a
              do container. */}
          <div
            ref={molduraRef}
            className="moldura-360 order-2 -mx-6 my-10 lg:mx-0 lg:my-0 lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <div
              ref={palcoRef}
              onPointerDown={() => {
                if (!travado) setMexida((n) => n + 1);
              }}
              className="palco-360 relative w-full aspect-[4/5] lg:aspect-square overflow-hidden bg-primary lg:rounded-[10px]"
            >
              {/* O pôster é o que o HTML pré-renderizado mostra, o que vê quem
                  não executa JS e o que fica de pé sob Save-Data. Reprojetado
                  no enquadramento EXATO em que a primeira sala da playlist
                  abre — um por proporção de painel. */}
              <picture>
                <source media="(min-width: 1024px)" srcSet={POSTER_LARGA} />
                <img
                  src={POSTER_ALTA}
                  alt={t("Corredor da Biotique, com a parede revestida em ripado de madeira")}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                    mostraTela ? "opacity-0" : "opacity-100",
                  )}
                />
              </picture>

              <canvas
                ref={telaRef}
                tabIndex={travado ? -1 : 0}
                role="img"
                aria-label={`${t("Vista 360")}. ${ambiente?.obra ?? ""}, ${estado?.nome ?? ambiente?.nome ?? ""}`}
                aria-describedby={ID_INSTRUCAO}
                className={cn(
                  "absolute inset-0 w-full h-full outline-none transition-opacity duration-700",
                  "focus-visible:ring-2 focus-visible:ring-white/70",
                  mostraTela ? "opacity-100" : "opacity-0",
                )}
              />

              {/* As portas (só no desktop). Posicionadas a cada quadro pelo
                  motor, por isso o container é dele e não do React. */}
              <div ref={marcasRef} className="marcas-360" aria-live="off" />

              {/* A obra e a seta. Fica à ESQUERDA de propósito: o canto
                  inferior direito da tela é do botão fixo do WhatsApp, e o
                  painel passa por baixo dele na rolagem. */}
              {mostraTela && TOTAL > 1 && (
                <div className="absolute left-3 bottom-3 lg:left-4 lg:bottom-4 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={proximo}
                    aria-label={t("Próximo ambiente")}
                    className="relative grid h-11 w-11 place-items-center rounded-full bg-white/90 text-[#111110] hover:bg-white transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {contando && (
                      <svg
                        key={`${estado?.cena}-${mexida}`}
                        aria-hidden="true"
                        viewBox="0 0 44 44"
                        className="pointer-events-none absolute inset-0 -rotate-90"
                      >
                        <circle
                          cx="22"
                          cy="22"
                          r="20.5"
                          fill="none"
                          stroke="#111110"
                          strokeOpacity="0.55"
                          strokeWidth="1.5"
                          pathLength={100}
                          strokeDasharray="100"
                          className="anel-360-conta"
                          style={{ "--tempo": `${SEGUNDOS_POR_AMBIENTE}s` } as React.CSSProperties}
                        />
                      </svg>
                    )}
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                  {/* Sem aria-live: a sala troca sozinha a cada 12s, e um leitor
                      de tela anunciando cada troca atropelaria a leitura da
                      página. O nome segue no rótulo do canvas. */}
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-white bg-[rgba(17,17,16,0.72)] rounded-full px-2.5 py-1.5"
                  >
                    {ambiente?.obra}
                  </span>
                </div>
              )}

              <p id={ID_INSTRUCAO} className="sr-only">
                {travado
                  ? t("A sala gira sozinha e troca de ambiente a cada poucos segundos.")
                  : t("arraste ou use as setas para girar")}
              </p>
            </div>
          </div>

          <div className="order-3 lg:col-start-1 lg:row-start-2 lg:mt-8">
            <p className="font-body text-[16px] font-light leading-[1.65] text-primary max-w-[420px]">
              {t("Acabamento premium para projetos de alto padrão, com garantia de até 10 anos. Cada superfície que criamos resiste ao tempo e agrada o olhar.")}
            </p>
            <Link
              to="/orcamento"
              className="inline-flex items-center mt-8 px-6 py-3 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary hover:text-foreground transition-colors duration-300"
            >
              {t("Fale com um especialista")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
