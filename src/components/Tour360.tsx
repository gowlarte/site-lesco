import { useEffect, useRef, useState } from "react";
import { Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/i18n/t";
import type { Tour } from "@/data/tours";
import type { EstadoVisor, Visor } from "@/components/home/pano-biotique";

/**
 * A visita 360 de uma obra, dentro da página dela.
 *
 * Mesmo motor da seção da home (`pano-biotique.ts`, que é genérico: recebe as
 * cenas e não sabe de que obra são). O que muda é o CONTROLE e a NAVEGAÇÃO.
 *
 * NA HOME, A ROLAGEM GIRA. Aqui não: lá o painel é um enfeite do manifesto e
 * girar sozinho é o que o faz ler como sala de verdade; aqui o visitante
 * clicou para visitar, e uma câmera que anda quando ele rola a página seria
 * ele perdendo o quadro que escolheu. Só a mão e o teclado mandam.
 *
 * A TIRA DE AMBIENTES existe porque as passagens não bastam. Elas só existem
 * onde alguém as desenhou no Lesco Viewer, e de quatro tours publicados apenas
 * a Biotique tem alguma: sem a tira, o Alpha One seria uma foto só, com outros
 * oito panoramas inalcançáveis no servidor. Ela também é a única navegação que
 * funciona por teclado sem mirar uma porta.
 *
 * NADA DE HUD SOBRE A IMAGEM, como na home: o nome do ambiente, a dica de
 * arrasto e o voltar ficam na faixa ABAIXO do painel. Sobre a foto só as
 * portas, que precisam estar onde a porta está.
 *
 * Nada de 3D existe até a seção se aproximar: three, o motor e o primeiro
 * panorama entram por import dinâmico. Quem abre a página e não rola até aqui
 * paga só a capa.
 */

const ID_INSTRUCAO = "tour-360-instrucao";

interface Props {
  tour: Tour;
  /** Nome da obra no portfólio, que pode não ser o mesmo que o do Viewer. */
  obra: string;
}

export const Tour360 = ({ tour, obra }: Props) => {
  const molduraRef = useRef<HTMLDivElement>(null);
  const telaRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const marcasRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<Visor | null>(null);
  /** Fora do React: o observador de visibilidade mexe nisto a cada entrada. */
  const visivelRef = useRef(false);

  const [querCarregar, setQuerCarregar] = useState(false);
  /** Save-Data pediu para não gastar: o visor espera um clique. */
  const [pedeClique, setPedeClique] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [estado, setEstado] = useState<EstadoVisor | null>(null);

  // ---------------------------------------------------------- quando carregar

  useEffect(() => {
    const moldura = molduraRef.current;
    if (!moldura || querCarregar) return;

    // Save-Data é o único pedido explícito de gastar menos que o navegador
    // manda. Aqui ele não pode simplesmente desligar o tour, que é o conteúdo
    // da seção — vira um botão, e quem quiser paga os 300 KB sabendo.
    const conexao = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conexao?.saveData) {
      setPedeClique(true);
      return;
    }

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
    observador.observe(moldura);
    return () => observador.disconnect();
  }, [querCarregar]);

  // ------------------------------------------------- quando desenhar quadros

  /* O laço segue a visibilidade do painel. Sem `preserveDrawingBuffer` o
     canvas não guarda o último quadro, então parar de desenhar apagaria o que
     estava ali; desenhar enquanto o painel está à vista sai de graça, porque
     em repouso o motor desenha uma vez e para sozinho. */
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
        const { criarVisor } = await import("@/components/home/pano-biotique");
        const tela = telaRef.current;
        const palco = palcoRef.current;
        const marcas = marcasRef.current;
        if (cancelado || !tela || !palco || !marcas) return;
        visorRef.current = criarVisor({
          tela,
          palco,
          marcas,
          cenas: tour.cenas,
          rotuloPorta: (nome) => `${t("Ir para")} ${nome}`,
          aoMudar: (novo) => {
            if (!cancelado) setEstado(novo);
          },
        });
        visorRef.current.ativar(visivelRef.current);
        if (!cancelado) setPronto(true);
      } catch (erro) {
        console.warn(`[tour ${tour.slug}] visor não subiu`, erro);
      }
    })();

    return () => {
      cancelado = true;
      visorRef.current?.destruir();
      visorRef.current = null;
    };
  }, [querCarregar, tour]);

  // A capa só sai quando há uma sala desenhada por baixo dela.
  const mostraTela = pronto && !estado?.falhou;
  const ambiente = estado?.nome ?? tour.cenas[0].nome;
  const ficha = [tour.local, tour.escritorio].filter(Boolean).join(" · ");

  return (
    <section
      id="visita-360"
      aria-labelledby="tour-360-titulo"
      /* `scroll-mt` pela altura do header fixo: sem isso o link do hero para
         aqui enfia o título por baixo dele. */
      className="scroll-mt-[110px] bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-16 md:py-20"
    >
      <p className="rotulo text-primary/65 mb-4">{t("Visita 360")}</p>
      <h2
        id="tour-360-titulo"
        className="font-display text-2xl md:text-3xl lg:text-[40px] font-normal leading-[1.2] md:leading-[1.2] lg:leading-[1.2] text-dark max-w-2xl"
      >
        {t("Ande pela obra.")}
      </h2>
      <p className="font-body text-base leading-[1.7] text-gray-500 mt-4 max-w-2xl">
        {t(
          "Os panoramas são fotografias da obra entregue. Arraste para olhar em volta e use a tira de ambientes para trocar de lugar.",
        )}
      </p>

      <div ref={molduraRef} className="mt-10">
        <div
          ref={palcoRef}
          className="palco-360 relative w-full aspect-[4/5] md:aspect-video overflow-hidden rounded-[10px] bg-primary"
        >
          {/* A capa é o que o HTML pré-renderizado mostra, o que vê quem não
              executa JS e o que fica de pé sob Save-Data. Reprojetada no
              enquadramento EXATO em que o WebGL abre — uma por proporção de
              painel, no mesmo corte de 768px da className acima. */}
          <picture>
            <source media="(min-width: 768px)" srcSet={tour.capa} />
            <img
              src={tour.capaAlta}
              alt={`${obra} — ${tour.cenas[0].nome}`}
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
            aria-label={`${t("Vista 360")}. ${ambiente}. ${obra}`}
            aria-describedby={ID_INSTRUCAO}
            className={cn(
              "absolute inset-0 w-full h-full outline-none transition-opacity duration-700",
              "focus-visible:ring-2 focus-visible:ring-white/70",
              mostraTela ? "opacity-100" : "opacity-0",
            )}
          />

          {/* As passagens. Posicionadas a cada quadro pelo motor, por isso o
              container é dele e não do React. */}
          <div ref={marcasRef} className="marcas-360" aria-live="off" />

          {pedeClique && (
            <button
              type="button"
              onClick={() => {
                setPedeClique(false);
                setQuerCarregar(true);
              }}
              className="absolute inset-0 flex items-end justify-center pb-10 bg-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            >
              <span className="inline-flex items-center px-6 py-3 rounded bg-white text-dark font-display text-[13px] uppercase tracking-[0.08em]">
                {t("Abrir a visita 360")}
              </span>
            </button>
          )}

          <p id={ID_INSTRUCAO} className="sr-only">
            {t("arraste ou use as setas para girar")}
          </p>
        </div>

        {/* A faixa de controle, fora da imagem. */}
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="font-display text-sm text-dark" aria-live="polite">
            {ambiente}
            {ficha && <span className="text-gray-500"> · {ficha}</span>}
          </p>
          {estado?.podeVoltar && (
            <button
              type="button"
              onClick={() => visorRef.current?.voltar()}
              className="inline-flex items-center gap-1.5 font-body text-[13px] text-gray-500 hover:text-dark transition-colors"
            >
              <Undo2 size={14} aria-hidden="true" />
              {t("Desfazer o último passo")}
            </button>
          )}
        </div>

        {/* A tira de ambientes. Uma cena só não é tira nenhuma. */}
        {tour.cenas.length > 1 && (
          <ul className="mt-5 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {tour.cenas.map((cena) => {
              const aqui = (estado?.cena ?? tour.cenas[0].id) === cena.id;
              return (
                <li key={cena.id} className="shrink-0">
                  <button
                    type="button"
                    /* Sem visor de pé — ou com o WebGL fora — a tira não leva
                       a lugar nenhum: fica de enfeite, não de botão morto. */
                    disabled={!mostraTela}
                    onClick={() => visorRef.current?.irParaCena(cena.id)}
                    aria-current={aqui ? "true" : undefined}
                    className={cn(
                      "group block w-28 text-left rounded-[6px] overflow-hidden",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark",
                      "disabled:cursor-default",
                    )}
                  >
                    <span
                      className={cn(
                        "block aspect-[3/2] rounded-[6px] overflow-hidden ring-inset transition-all",
                        aqui ? "ring-2 ring-dark" : "ring-0 opacity-70 group-hover:opacity-100",
                      )}
                    >
                      <img
                        src={cena.miniatura}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span
                      className={cn(
                        "block mt-1.5 font-body text-[12px] leading-tight truncate",
                        aqui ? "text-dark" : "text-gray-500",
                      )}
                    >
                      {cena.nome}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
