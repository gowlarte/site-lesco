import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import { cn } from "@/lib/utils";
import { limita, useLoopDeScroll, useSemMovimento } from "./palco";
import { CENAS, ESCRITORIO, LOCAL, OBRA, POSTER_ALTA, POSTER_LARGA } from "@/data/biotique";
import type { EstadoVisor, Visor } from "./pano-biotique";

/**
 * O manifesto da home, com o corredor da Biotique ao lado dele.
 *
 * Duas colunas: o copy à esquerda, e à direita um painel que não é foto — é a
 * sala de verdade, em 360. No celular a mesma coisa empilhada, e ali o painel
 * sangra de borda a borda entre o título e o parágrafo.
 *
 * NADA DE HUD sobre a imagem, só as portas. Legenda da obra, dica de arrasto e
 * botão de voltar saíram: a rolagem já gira a sala sozinha, o que tornava a
 * dica redundante, e o tour é um LAÇO de três salas — Hub, Entrada Elevador e
 * Corredor —, então dá para voltar andando e não falta botão nenhum. A
 * instrução sobrou só para leitor de tela.
 *
 * A ROLAGEM É O CONTROLE
 *
 * Quem gira a câmera é o scroll da página: descer vira a sala num sentido,
 * subir desfaz. São 150º ao longo da travessia da seção pela janela, e o
 * enquadramento composto é o que aparece quando ela está bem no meio da tela —
 * ou seja, a foto "certa" é o meio do caminho, e os dois extremos mostram o
 * resto do ambiente.
 *
 * O desvio da rolagem é SOMADO ao rumo do visitante, nunca atribuído (ver
 * `apontar()` no motor). Quem arrastar com a mão continua mandando, e a página
 * andando por baixo só acrescenta — os dois não disputam a mesma variável.
 *
 * NÃO É UM PALCO FIXO, de propósito. O hero são 9 telas presas e os projetos
 * são 8; uma terceira presa entre as duas daria dezenove seguidas sem a página
 * nunca andar. Aqui a página não para em momento nenhum.
 *
 * Nada de 3D existe até a seção se aproximar: three, o motor e o primeiro
 * panorama entram por import dinâmico. Quem não rola até aqui não paga nada, e
 * quem pediu Save-Data fica no pôster.
 */

/**
 * Quanto a câmera gira da entrada à saída da seção, em radianos. 150º é o que
 * faz a rolagem LER como controle: menos que isso passa por deriva de parallax,
 * e muito mais embrulha, porque a sala inteira cabe em 360º.
 */
const GIRO = (150 * Math.PI) / 180;
/** Um respiro de inclinação junto, só para o movimento não ser puro eixo Y. */
const INCLINA = 0.09;

const ID_INSTRUCAO = "biotique-instrucao";
const legenda = [OBRA, LOCAL, ESCRITORIO].filter(Boolean).join(" · ");

export function Manifesto360() {
  const secaoRef = useRef<HTMLElement>(null);
  const molduraRef = useRef<HTMLDivElement>(null);
  const telaRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const marcasRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<Visor | null>(null);
  /** Fora do React: muda a cada quadro de rolagem. */
  const visivelRef = useRef(false);

  const semMovimento = useSemMovimento();
  const [querCarregar, setQuerCarregar] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [estado, setEstado] = useState<EstadoVisor | null>(null);

  // ---------------------------------------------------------- a rolagem gira

  const desenhar = useCallback(() => {
    const secao = secaoRef.current;
    const visor = visorRef.current;
    if (!secao || !visor) return;
    if (semMovimento) {
      visor.apontar(0, 0);
      return;
    }
    const r = secao.getBoundingClientRect();
    const janela = window.innerHeight || 1;
    // Travessia: 0 quando o topo da seção encosta no pé da janela, 1 quando o
    // pé dela passa do topo. Uma conta só, que serve para seção mais alta ou
    // mais baixa que a janela.
    const p = limita((janela - r.top) / (janela + r.height), 0, 1);
    // Centrado em 0,5: o enquadramento composto é o do meio da travessia.
    visor.apontar((p - 0.5) * GIRO, (p - 0.5) * INCLINA);
  }, [semMovimento]);

  useLoopDeScroll(desenhar);

  /* O efeito do visor precisa mirar a câmera assim que ela nasce, mas não pode
     depender de `desenhar`: ele muda quando `prefers-reduced-motion` muda, e
     isso derrubaria e recriaria o contexto WebGL por causa de uma preferência
     de movimento. */
  const desenharRef = useRef(desenhar);
  useEffect(() => {
    desenharRef.current = desenhar;
  }, [desenhar]);

  // ---------------------------------------------------------- quando carregar

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao || querCarregar) return;

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
      // Uma tela cheia de antecedência: o módulo e o primeiro panorama têm
      // tempo de chegar antes de a seção entrar.
      { rootMargin: "1000px 0px" },
    );
    observador.observe(secao);
    return () => observador.disconnect();
  }, [querCarregar]);

  // ------------------------------------------------- quando desenhar quadros

  /**
   * O laço segue a VISIBILIDADE do painel.
   *
   * Sem `preserveDrawingBuffer`, o canvas não guarda o último quadro: parar de
   * desenhar apaga o que estava ali. Ligar essa opção resolveria cobrando uma
   * cópia do buffer por quadro, cara numa GPU de celular; desenhar enquanto o
   * painel estiver à vista sai de graça, porque em repouso o motor desenha uma
   * vez e para sozinho.
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
              className="palco-360 relative w-full aspect-[4/5] lg:aspect-square overflow-hidden bg-primary lg:rounded-[10px]"
            >
              {/* O pôster é o que o HTML pré-renderizado mostra, o que vê quem
                  não executa JS e o que fica de pé sob Save-Data. Reprojetado
                  no enquadramento EXATO em que o WebGL abre — um por proporção
                  de painel, no mesmo corte de 1024px da className acima. */}
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
                tabIndex={0}
                role="img"
                aria-label={`${t("Vista 360")}. ${estado?.nome ?? CENAS[0].nome}. ${legenda}`}
                aria-describedby={ID_INSTRUCAO}
                className={cn(
                  "absolute inset-0 w-full h-full outline-none transition-opacity duration-700",
                  "focus-visible:ring-2 focus-visible:ring-white/70",
                  mostraTela ? "opacity-100" : "opacity-0",
                )}
              />

              {/* As portas. Posicionadas a cada quadro pelo motor, por isso o
                  container é dele e não do React. */}
              <div ref={marcasRef} className="marcas-360" aria-live="off" />

              {/* Única coisa que sobra por cima da imagem: as portas.

                  A instrução fica só para quem navega por voz ou teclado. Com
                  a rolagem girando a sala sozinha, a pista visual virou
                  redundante — e legenda, dica e botão sobre a foto eram
                  exatamente o que estava pedindo para sair daqui. */}
              <p id={ID_INSTRUCAO} className="sr-only">
                {t("arraste ou use as setas para girar")}
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
