import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/components/AppLink";
import { ScrollReveal } from "@/components/ScrollReveal";
import { t } from "@/i18n/t";
import { cn } from "@/lib/utils";
import { suave, useLoopDeScroll, useSemMovimento } from "./palco";
import {
  CENAS,
  ESCRITORIO,
  LOCAL,
  OBRA,
  POSTER_ALTA,
  POSTER_LARGA,
} from "@/data/biotique";
import type { EstadoVisor, Visor } from "./pano-biotique";

/**
 * O manifesto da home, agora com o hall da Biotique dentro dele.
 *
 * Esta seção era só tipografia: um título de 52px à esquerda e um parágrafo à
 * direita. O copy continua inteiro e no mesmo lugar — o que mudou é que a
 * coluna da direita virou um painel 360 em que se pode olhar em volta e andar
 * pelas portas.
 *
 * NÃO É UM PALCO FIXO, de propósito. O hero são 9 telas presas e os projetos
 * são 8; uma terceira seção presa entre as duas daria dezenove telas seguidas
 * sem a página nunca andar. Aqui a página não para: a abertura é amarrada à
 * POSIÇÃO DO PAINEL na janela, e não a um trilho. Entra abrindo quando sobe
 * pela borda de baixo, fica aberto por cerca de uma tela de rolagem, e fecha
 * saindo por cima — que é a animação de entrada e de saída, sem sequestrar a
 * rolagem de ninguém.
 *
 * O CONTRASTE COM O QUE VEM DEPOIS é o que decide a forma. `ProjetosHorizontal`
 * sangra: preto, tela cheia, sem goteira, tipografia de 76px. Então aqui é o
 * oposto — fundo claro da página, painel recortado dentro da grade, copy em
 * texto escuro. A virada de registro é o que faz a foto de obra chegar como
 * chegada.
 *
 * Nada de 3D existe até a seção se aproximar: three, este módulo e o primeiro
 * panorama entram por import dinâmico quando o observador dispara. Quem não
 * rola até aqui não paga nada, e quem pediu Save-Data fica no pôster.
 */

/** O painel abre e fecha por distância do centro da janela, em telas. */
const ABRE_EM = 0.34;
const FECHA_EM = 0.7;
/** Daqui para cima o painel responde ao ponteiro e o laço de quadros roda. */
const VIVO_ACIMA_DE = 0.55;

const ID_INSTRUCAO = "biotique-instrucao";

const legenda = [OBRA, LOCAL, ESCRITORIO].filter(Boolean).join(" · ");

export function Manifesto360() {
  const molduraRef = useRef<HTMLDivElement>(null);
  const telaRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const marcasRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<Visor | null>(null);
  /** Fora do React: muda a cada quadro de rolagem. */
  const abertoRef = useRef(false);
  /** O painel está em algum pedaço da janela. Governa o laço de quadros. */
  const visivelRef = useRef(false);

  const semMovimento = useSemMovimento();
  const [querCarregar, setQuerCarregar] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [tocado, setTocado] = useState(false);
  const [estado, setEstado] = useState<EstadoVisor | null>(null);

  // ---------------------------------------------------------------- abertura

  const desenhar = useCallback(() => {
    const moldura = molduraRef.current;
    if (!moldura) return;
    const r = moldura.getBoundingClientRect();
    const altura = window.innerHeight || 1;
    // Distância do centro do painel ao centro da janela, em telas. Simétrica,
    // então a mesma curva serve para entrar e para sair.
    const d = Math.abs(r.top + r.height / 2 - altura / 2) / altura;
    const abre = semMovimento ? 1 : 1 - suave(d, ABRE_EM, FECHA_EM);
    moldura.style.setProperty("--abre", abre.toFixed(4));

    // Só o ponteiro depende disto. O laço de quadros NÃO: ver o observador de
    // visibilidade abaixo.
    const aberto = abre > VIVO_ACIMA_DE;
    if (aberto === abertoRef.current) return;
    abertoRef.current = aberto;
    moldura.dataset.aberto = aberto ? "sim" : "nao";
  }, [semMovimento]);

  useLoopDeScroll(desenhar);

  // ---------------------------------------------------------- quando carregar

  useEffect(() => {
    const moldura = molduraRef.current;
    if (!moldura || querCarregar) return;

    // Save-Data é o único pedido explícito de gastar menos que o navegador
    // manda. 440 KB de panorama numa seção que ninguém pediu para abrir é
    // exatamente o que ele está pedindo para não acontecer: fica o pôster.
    const conexao = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conexao?.saveData) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        observador.disconnect();
        setQuerCarregar(true);
      },
      // Uma tela cheia de antecedência: o módulo e o primeiro panorama têm tempo
      // de chegar antes de o painel começar a abrir.
      { rootMargin: "1000px 0px" },
    );
    observador.observe(moldura);
    return () => observador.disconnect();
  }, [querCarregar]);

  // ------------------------------------------------- quando desenhar quadros

  /**
   * O laço segue a VISIBILIDADE do painel, e não o quanto ele está aberto.
   *
   * A primeira versão desligava junto com a abertura, e o painel meio fechado
   * ficava PRETO: sem `preserveDrawingBuffer`, o canvas não guarda o último
   * quadro, e parar de desenhar apaga o que estava ali. Ou seja, a animação de
   * saída — que é justamente quando a abertura cai — era a única hora em que
   * não havia imagem para recortar.
   *
   * Ligar `preserveDrawingBuffer` resolveria o sintoma cobrando uma cópia do
   * buffer a cada quadro, que numa GPU de celular é caro para o que é. Desenhar
   * enquanto o painel estiver em qualquer pedaço da janela sai de graça: em
   * repouso o motor desenha uma vez e para sozinho.
   */
  useEffect(() => {
    const moldura = molduraRef.current;
    if (!moldura) return;
    const observador = new IntersectionObserver((entradas) => {
      const visivel = entradas.some((e) => e.isIntersecting);
      if (visivel === visivelRef.current) return;
      visivelRef.current = visivel;
      visorRef.current?.ativar(visivel);
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
          cenas: CENAS,
          rotuloPorta: (nome) => `${t("Ir para")} ${nome}`,
          aoMudar: (novo) => {
            if (!cancelado) setEstado(novo);
          },
        });
        visorRef.current.ativar(visivelRef.current);
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

  // O pôster só sai quando há uma sala desenhada por baixo dele.
  const mostraTela = pronto && !estado?.falhou;

  return (
    <section className="section-spacing">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[46%_1fr] gap-12 lg:gap-16 items-center">
          {/* ---------- o copy, inteiro e no mesmo lugar ---------- */}
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[52px] font-normal leading-[1.4] text-dark">
              {t("Pioneiros em Madeira Ecológica no Brasil, somos arquitetura feita para o amanhã.")}
            </h2>
            <p className="font-body text-[16px] font-light leading-[1.65] text-primary mt-8 max-w-[380px]">
              {t("Acabamento premium para projetos de alto padrão, com garantia de até 10 anos. Cada superfície que criamos resiste ao tempo e agrada o olhar.")}
            </p>
            <Link
              to="/orcamento"
              className="inline-flex items-center mt-8 px-6 py-3 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary hover:text-foreground transition-colors duration-300"
            >
              {t("Fale com um especialista")}
            </Link>
          </ScrollReveal>

          {/* ---------- o hall, que abre e fecha com a rolagem ---------- */}
          <div ref={molduraRef} className="moldura-360" data-aberto="nao">
            <div
              ref={palcoRef}
              className="palco-360 relative w-full aspect-[4/5] lg:aspect-[5/4] overflow-hidden rounded-[10px] bg-primary"
            >
              {/* O pôster é o que o HTML pré-renderizado mostra, o que vê quem
                  não executa JS e o que fica de pé sob Save-Data. Reprojetado
                  no enquadramento EXATO em que o WebGL abre — ver o cabeçalho
                  de scripts/importar-biotique.mjs. */}
              <picture>
                <source media="(min-width: 1024px)" srcSet={POSTER_LARGA} />
                <img
                  src={POSTER_ALTA}
                  alt={t("Hall de entrada da Biotique, com o volume revestido em ripado de madeira")}
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
                tabIndex={0}
                role="img"
                aria-label={`${t("Vista 360")}. ${estado?.nome ?? CENAS[0].nome}. ${legenda}`}
                aria-describedby={ID_INSTRUCAO}
                onPointerDown={() => setTocado(true)}
                className={cn(
                  "absolute inset-0 w-full h-full outline-none transition-opacity duration-700",
                  "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-0",
                  mostraTela ? "opacity-100" : "opacity-0",
                )}
              />

              {/* As portas. Posicionadas a cada quadro pelo motor, por isso o
                  container é dele e não do React. */}
              <div ref={marcasRef} className="marcas-360" aria-live="off" />

              {/* Véu de baixo: a legenda e os controles pousam sobre foto, e a
                  foto muda de sala para sala. */}
              <div className="veu-360" aria-hidden="true" />

              <div className="rodape-360">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
                  {legenda}
                  {estado?.nome ? <span className="text-white"> · {estado.nome}</span> : null}
                </p>

                {estado?.podeVoltar ? (
                  <button
                    type="button"
                    onClick={() => visorRef.current?.voltar()}
                    className="botao-360"
                  >
                    {t("Voltar")}
                  </button>
                ) : null}
              </div>

              {/* Some ao primeiro gesto, e nunca aparece antes de haver o que
                  arrastar. Não é um título anunciando nada: é a única pista de
                  que a foto responde ao ponteiro. */}
              <p
                id={ID_INSTRUCAO}
                className={cn(
                  "dica-360 font-mono text-[10px] uppercase tracking-[0.14em]",
                  mostraTela && !tocado ? "opacity-100" : "opacity-0",
                )}
              >
                {t("arraste para olhar")}
              </p>

              {estado?.falhou ? (
                <p className="aviso-360 font-body text-[12px]">
                  {t("Não foi possível abrir a vista 360 neste navegador.")}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

