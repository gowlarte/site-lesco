import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { Link } from "@/components/AppLink";
import {
  irParaTela,
  limita,
  suave,
  useLoopDeScroll,
  useMedidor,
  useSemMovimento,
  useSomenteAtivoInterativo,
} from "@/components/home/palco";
import {
  LINHAS_CAPA,
  TOTAL_TELAS,
  telaCapa,
  telasProduto,
  type TelaProduto,
} from "@/data/hero-novo";
import { responsiva, SIZES_TELA_CHEIA } from "@/lib/imagem";

/**
 * Hero da marca 2.0 — a versão de /lesco-new, ainda não validada.
 *
 * MESMA MECÂNICA DO HERO DE PRODUÇÃO, OUTRA FORMA.
 *
 * Por baixo é o palco fixo de sempre (ver ../home/palco.ts): um trilho alto,
 * um palco `sticky` de uma tela, e o scroll virando uma posição contínua
 * entre 0 e N-1. Reaproveitar isso não é economia de linhas — é o que
 * garante que esta versão role exatamente como a outra, que já foi afinada
 * no aparelho.
 *
 * O que muda é o desenho:
 *
 *   - A PÁGINA tem a cor da linha. A foto é um cartão com margem nos quatro
 *     lados, não um fundo sangrando.
 *   - O nome do produto e a etiqueta ficam ABAIXO do cartão, sobre a cor.
 *   - A cor do fundo é interpolada entre as telas, com a MESMA curva do corte
 *     da foto: a página muda de cor no instante em que a foto troca, e não
 *     antes nem depois.
 *
 * O DEDO MANDA, E NADA PODE ENGASGAR
 *
 * Nada aqui anima por conta própria: cada quadro lê a posição do scroll e
 * escreve o estado correspondente. Não há `transition` em nada que o scroll
 * controle — transição é atraso, e atraso é exatamente o que se sente como
 * "a tela não acompanha o dedo".
 *
 * O custo por quadro é fixo e pequeno, de propósito:
 *
 *   - no máximo DUAS camadas de foto visíveis (o resto fica `hidden`, então
 *     não entra na composição);
 *   - no máximo dois blocos de texto com opacidade entre 0 e 1;
 *   - uma cor de fundo, um `translate` na coluna de pontos.
 *
 * Tudo o que se mexe se mexe por `transform`/`opacity`/`clip-path`, nunca por
 * largura, altura ou posição — nenhum quadro causa reflow.
 */

/** O palco encosta no topo: a margem do cartão é dada por dentro. */
const TOPO_PALCO = 0;

/** Zoom de sobra da foto: o quanto o parallax pode consumir sem mostrar borda. */
const IMG_ESCALA = 1.12;
/** Deslocamento máximo do parallax, em % da altura. Menor que a sobra. */
const IMG_DESLOCA = 4.5;

/**
 * Janelas da transição, em fração de uma tela de scroll. A ordem importa: o
 * texto sai ANTES de o corte passar e só volta DEPOIS, senão o nome de uma
 * tela apareceria sobre a foto da outra.
 */
const TXT_INICIO = 0.25;
const TXT_FIM = 0.42;
const CORTE_INICIO = 0.38;
const CORTE_FIM = 0.62;

/** Quanto o bloco de texto viaja ao sair, em px. */
const TXT_VIAGEM = 14;

/**
 * As medidas do esqueleto, escritas uma vez só.
 *
 * O palco desenha a moldura (cartão + linha do nome) e cada tela desenha o
 * próprio conteúdo por cima, em `absolute inset-0`. Para o "VER MAIS" cair
 * dentro do cartão e o nome cair na linha de baixo, os dois precisam da MESMA
 * caixa — daí as classes virem de constantes e não de literais repetidos.
 */
const CAIXA = "px-4 pt-[96px] pb-[18px] sm:px-5 sm:pt-[104px] sm:pb-5 lg:px-8 lg:pt-[120px] lg:pb-8";
const LINHA_NOME = "h-[44px] mt-5 lg:h-[72px] lg:mt-7";

/** Raio do cartão, repetido na moldura e na máscara das fotos. */
const RAIO = "rounded-[16px]";

type RGB = [number, number, number];

function hexParaRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** As cores de fundo na ordem das telas, já em números. */
const CORES: RGB[] = [telaCapa.fundo, ...telasProduto.map((t) => t.fundo)].map(hexParaRgb);

function misturar(a: RGB, b: RGB, f: number) {
  const c = (i: number) => Math.round(a[i] + (b[i] - a[i]) * f);
  return "rgb(" + c(0) + "," + c(1) + "," + c(2) + ")";
}

export function HeroNovo() {
  const [ativo, setAtivo] = useState(0);
  const semMovimento = useSemMovimento();

  const trilhoRef = useRef<HTMLDivElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const camadasRef = useRef<Array<HTMLDivElement | null>>([]);
  const imagensRef = useRef<Array<HTMLImageElement | null>>([]);
  const conteudosRef = useRef<Array<HTMLDivElement | null>>([]);
  /** A frase da capa, à parte: ela some pela cor, não pela opacidade. */
  const capaRef = useRef<HTMLHeadingElement>(null);
  const pontosRef = useRef<HTMLDivElement>(null);
  /** Tela mais próxima, fora do React: o loop roda a cada quadro. */
  const ativoRef = useRef(0);
  /** Se o cartão ainda cobre a janela. Muda pouco, então guarda o último valor. */
  const noArRef = useRef<boolean | null>(null);

  const medir = useMedidor(trilhoRef, palcoRef, TOPO_PALCO, TOTAL_TELAS);

  const irPara = useCallback(
    (i: number) => irParaTela(medir, i, TOTAL_TELAS, !semMovimento),
    [medir, semMovimento],
  );

  const desenhar = useCallback(() => {
    const m = medir();
    if (!m) return;
    const pos = m.pos;

    for (let i = 0; i < TOTAL_TELAS; i++) {
      const d = pos - i;

      // Corte: a camada é revelada de baixo para cima. `inset(100%)` = nada
      // visível, `inset(0%)` = cartão cheio. A de cima sempre cobre a de
      // baixo, então nunca há duas fotos misturadas — há uma linha entre elas.
      const camada = camadasRef.current[i];
      if (camada) {
        const revela = suave(d + 1, CORTE_INICIO, CORTE_FIM);
        camada.style.clipPath = "inset(" + ((1 - revela) * 100).toFixed(3) + "% 0% 0% 0%)";
        // Fora da janela a camada não pinta nada: ou está fechada, ou está
        // inteiramente coberta. Mantém 2 camadas compostas, não 10.
        camada.style.visibility = d > -CORTE_FIM && d < 1 + CORTE_INICIO ? "" : "hidden";
      }

      const img = imagensRef.current[i];
      if (img) {
        const dy = semMovimento ? 0 : -limita(d, -1, 1) * IMG_DESLOCA;
        img.style.transform =
          "translate3d(0," + dy.toFixed(3) + "%,0) scale(" + IMG_ESCALA + ")";
      }

      // Texto: fade simétrico em torno da tela, com o deslocamento seguindo a
      // MESMA curva — assim ele fica parado enquanto está legível e só viaja
      // no trecho em que está sumindo ou chegando.
      const conteudo = conteudosRef.current[i];
      if (conteudo) {
        const saida = suave(Math.abs(d), TXT_INICIO, TXT_FIM);
        conteudo.style.visibility = saida < 0.999 ? "" : "hidden";

        if (i === 0) {
          /*
           * A CAPA SOME PELA TINTA, NÃO PELA OPACIDADE.
           *
           * A frase está em `mix-blend-mode: difference` e isso proíbe
           * opacidade em qualquer ancestral: opacidade isola o grupo, a
           * mesclagem deixa de enxergar a foto e a tipografia pula de "âmbar
           * sobre o céu" para branco chapado no meio da transição.
           *
           * Por sorte a própria conta dá a saída de graça. `difference` é
           * |fundo - tinta|, então tinta PRETA devolve o fundo intacto, ou
           * seja: invisível. Escurecer a tinta de branco até preto É o fade,
           * e ele acontece dentro da mesclagem em vez de por cima dela.
           */
          const tinta = Math.round(255 * (1 - saida));
          const capa = capaRef.current;
          if (capa) capa.style.color = "rgb(" + tinta + "," + tinta + "," + tinta + ")";
          continue;
        }

        conteudo.style.opacity = String(1 - saida);
        const dy = semMovimento ? 0 : Math.sign(d) * saida * TXT_VIAGEM;
        conteudo.style.transform = "translate3d(0," + dy.toFixed(2) + "px,0)";
      }
    }

    // A cor da página acompanha o corte da foto: `i` é a tela de baixo, `f` o
    // quanto já andou para a de cima, e a curva é a mesma do clip-path.
    const i = Math.min(Math.floor(pos), TOTAL_TELAS - 2);
    const mistura = suave(pos - i, CORTE_INICIO, CORTE_FIM);
    if (palcoRef.current) {
      palcoRef.current.style.backgroundColor = misturar(CORES[i], CORES[i + 1], mistura);
    }

    // A coluna de pontos só existe para as telas de produto, então ela entra
    // junto com a primeira delas.
    if (pontosRef.current) {
      pontosRef.current.style.opacity = suave(pos, CORTE_INICIO, CORTE_FIM).toFixed(3);
    }

    /*
     * O BOTÃO DO WHATSAPP SÓ SOBE ENQUANTO O HERO ESTÁ NA TELA.
     *
     * Ele é fixo no canto inferior direito da janela, e durante o hero esse
     * canto é do nome do produto e da etiqueta — por isso ele sobe para
     * dentro do cartão (ver `body.hero-novo-no-ar` em index.css). Passado o
     * hero, as seções de baixo são as mesmas da home de produção e o botão
     * tem de voltar ao canto, senão fica flutuando alto no meio do showroom.
     *
     * A classe muda no corpo da página, não aqui dentro, porque o botão mora
     * na raiz da árvore. E só é tocada na VIRADA: escrever no classList a
     * cada quadro custaria um recálculo de estilo por quadro para dizer a
     * mesma coisa.
     */
    const noAr = window.scrollY <= m.inicio + m.curso;
    if (noAr !== noArRef.current) {
      noArRef.current = noAr;
      document.body.classList.toggle("hero-novo-no-ar", noAr);
    }

    const proximo = Math.round(pos);
    if (proximo !== ativoRef.current) {
      ativoRef.current = proximo;
      setAtivo(proximo);
    }
  }, [medir, semMovimento]);

  // Sair da rota não pode deixar a marca no corpo da página: o botão ficaria
  // alto em todas as outras.
  useEffect(() => () => document.body.classList.remove("hero-novo-no-ar"), []);

  useLoopDeScroll(desenhar);
  useSomenteAtivoInterativo(conteudosRef, ativo);

  /** Setas ↑↓ percorrem as telas quando o foco está dentro do módulo. */
  const aoTeclar = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    if ((e.target as HTMLElement).closest("input, textarea, select")) return;
    const proximo = ativo + (e.key === "ArrowDown" ? 1 : -1);
    if (proximo < 0 || proximo >= TOTAL_TELAS) return;
    e.preventDefault();
    irPara(proximo);
  };

  const telas = [telaCapa, ...telasProduto];

  return (
    <div
      ref={trilhoRef}
      onKeyDown={aoTeclar}
      className="hero-novo relative"
      /*
       * O TRILHO CARREGA O PALCO DENTRO DA PRÓPRIA ALTURA.
       *
       * O palco mede a janela ATUAL (`dvh`), para o cartão crescer quando a
       * barra do Safari encolhe. O curso de rolagem mede janelas ESTÁVEIS
       * (`svh`). Escrevendo o trilho como a soma dos dois, o motor enxerga
       * sempre o mesmo curso:
       *
       *     curso = trilho - palco = (N-1)*svh + dvh - dvh = (N-1)*svh
       *
       * Sem isso, encolher a barra no meio da rolagem mudaria o curso e a
       * posição daria um pulo. É a mesma conta do hero de produção.
       */
      style={{ height: "calc(" + (TOTAL_TELAS - 1) + " * 100svh + 100dvh)" }}
    >
      <div
        ref={palcoRef}
        className="hero-novo-palco sticky top-0 h-[100dvh] overflow-hidden"
        style={{ backgroundColor: telaCapa.fundo }}
      >
        {/* ---------- Esqueleto: o cartão e a linha do nome ----------
             É esta moldura que define onde tudo cai. As telas desenham por
             cima dela, na mesma caixa. */}
        <div className={"relative h-full flex flex-col " + CAIXA}>
          <div className={"relative flex-1 min-h-0 overflow-hidden " + RAIO}>
            {/* Camadas de foto, uma por tela, na ordem de baixo para cima. */}
            {telas.map((tela, i) => (
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
                  {...responsiva(tela.imagem, SIZES_TELA_CHEIA)}
                  alt={tela.alt}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Sem véu de contraste sobre a foto, de propósito. A capa não
                precisa: a mesclagem `difference` já garante que a frase
                apareça em cima de qualquer coisa. E escurecer a foto para
                salvar o "VER MAIS" seria lavar as nove fotos por causa de
                dezesseis pixels de texto — se algum dia uma foto clara comer
                o rótulo, a correção é na foto ou numa sombra no próprio
                rótulo, não num véu sobre tudo. */}

            {/* ---------- Pontos ----------
                 Um por tela de produto, todos à vista. Os mockups desenham
                 cinco, mas ali é a prancha que está errada: um indicador que
                 mostra metade das telas deixa de dizer onde a pessoa está, que
                 é a única coisa que ele faz. A capa fica de fora — ela não é
                 produto, e lá a coluna ainda não entrou. */}
            <div
              ref={pontosRef}
              aria-hidden="true"
              className="absolute left-3 bottom-3 z-20 lg:left-5 lg:bottom-5"
              style={{ opacity: 0 }}
            >
              {telasProduto.map((tela, i) => (
                <div
                  key={tela.id}
                  className="flex h-6 items-center justify-center lg:h-9"
                >
                  <span
                    className={
                      "block rounded-full border border-white " +
                      (i === ativo - 1
                        ? "w-[9px] h-[9px] bg-white lg:w-[12px] lg:h-[12px]"
                        : "w-[7px] h-[7px] lg:w-[9px] lg:h-[9px]")
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* A linha do nome fica SEMPRE reservada, inclusive na capa, que não
              tem nome nenhum. Animar a altura do cartão na troca significaria
              remedir e repintar a foto a cada quadro — o preço de um layout
              mais fiel ao mockup seria justamente o engasgo que não pode
              acontecer. Na capa, então, sobram estes 44px de cor embaixo. */}
          <div className={"shrink-0 " + LINHA_NOME} />

          {/* O cabeçalho só fica transparente enquanto não passou do hero, e
              quem diz isso é este marcador (ver hooks/useSaiuDoHero). Fica na
              altura da linha do nome: é o último ponto da tela a cruzar a base
              do cabeçalho, ou seja, o hero inteiro passa com a marca branca. */}
          <span
            data-hero-titulo
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[18px] left-4 w-px lg:bottom-8 lg:left-8"
            style={{ height: 44 }}
          />
        </div>

        {/* ---------- Tela 01 — a capa ---------- */}
        <div
          ref={(el) => {
            conteudosRef.current[0] = el;
          }}
          id="capa"
          className={"absolute inset-0 z-10 flex flex-col text-white pointer-events-none " + CAIXA}
          style={{ opacity: 1 }}
        >
          <div className="relative flex-1 min-h-0">
            {/* As cinco linhas se espalham pela ALTURA do cartão, não por uma
                entrelinha fixa. É o que o mockup mostra, e é também o que faz
                a primeira linha cair no céu da foto em vez de sobre o prédio:
                em cartão alto as linhas se afastam, em cartão baixo se
                aproximam, e a composição continua ocupando a foto inteira. */}
            {/* A TINTA É UMA SÓ, E É A MESCLAGEM QUE DÁ AS CORES.
                `difference` devolve |fundo - tinta|: com a tinta em branco,
                cada pixel sai como o NEGATIVO do que está atrás. Sobre o céu
                claro isso vira o âmbar que aparece nos mockups, sobre o
                prédio escuro vira um cinza claro. Nenhuma palavra tem cor
                própria — é o fundo que muda debaixo delas, e é por isso que a
                frase se lê em qualquer foto que entre aqui depois.

                A consequência prática: este bloco NÃO pode ganhar opacidade
                nem filtro, porque qualquer um dos dois isola o grupo e a
                mesclagem passa a enxergar o vazio em vez da foto. O
                desaparecimento dele, então, é feito na própria tinta — ver
                `desenhar`, o caso da capa. */}
            <h1
              ref={capaRef}
              /* O respiro de baixo é o espaço do botão do WhatsApp, que é fixo
                 e pousa dentro do cartão (ver `body:has(.hero-novo)` em
                 index.css). Sem ele a última linha passa por baixo do botão,
                 e botão de z-60 não se discute: ele ganha. */
              className="absolute inset-0 flex flex-col justify-around px-4 pb-14 lg:px-8 lg:pb-[84px]"
              style={{ color: "#ffffff", mixBlendMode: "difference" }}
            >
              <span className="sr-only">Arquitetura feita para o amanhã.</span>
              {LINHAS_CAPA.map((linha) => (
                <span
                  key={linha.texto}
                  aria-hidden="true"
                  className="flex items-center gap-[0.18em] font-display font-light uppercase leading-[1] tracking-[-0.01em] text-[12vw] sm:text-[8vw] lg:text-[clamp(48px,5.4vw,104px)]"
                >
                  {linha.regua === "antes" && <Filete />}
                  <span>{linha.texto}</span>
                  {linha.regua === "depois" && <Filete />}
                  {/* "FEITA PARA" não leva filete no celular: ali a palavra já
                      ocupa a linha inteira. Numa tela larga ela ocupa um terço
                      dela, e sem o filete a linha fica com um vão no meio da
                      composição — nenhum corpo de letra razoável preencheria
                      1300px com dez caracteres. Então o filete entra a partir
                      de lg, e aí as cinco linhas se justificam igual. */}
                  {linha.regua === "nenhuma" && <Filete className="hidden lg:block" />}
                </span>
              ))}
            </h1>
          </div>
          <div className={"shrink-0 " + LINHA_NOME} />
        </div>

        {/* ---------- Telas 02..10 — uma por produto ---------- */}
        {telasProduto.map((tela, i) => (
          <TelaDeProduto
            key={tela.id}
            ref={(el) => {
              conteudosRef.current[i + 1] = el;
            }}
            tela={tela}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * O filete que justifica a linha.
 *
 * `flex-1` com `min-w-0`: ele come o espaço que a palavra deixar e, numa tela
 * estreita em que não sobra espaço nenhum, encolhe até sumir em vez de
 * empurrar a palavra para fora. É isso que faz a composição caber em qualquer
 * largura sem larguras fixas.
 */
function Filete({ className = "" }: { className?: string }) {
  return <span className={"flex-1 min-w-0 h-px bg-current " + className} />;
}

interface TelaDeProdutoProps {
  tela: TelaProduto;
}

const TelaDeProduto = forwardRef<HTMLDivElement, TelaDeProdutoProps>(function TelaDeProduto(
  { tela },
  ref,
) {
  return (
    <div
      ref={ref}
      id={tela.id}
      className={"absolute inset-0 z-10 flex flex-col text-white pointer-events-none " + CAIXA}
      style={{ opacity: 0 }}
    >
      {/* Área do cartão: aqui dentro mora só o "VER MAIS". */}
      <div className="relative flex-1 min-h-0">
        {/* A sombra existe porque o rótulo é branco e pousa no alto da foto,
            que é justamente onde costuma haver céu. Num céu de meio-dia ele
            sumiria. Uma sombra de 16px resolve no tamanho do próprio texto;
            a alternativa seria um véu sobre a foto inteira, que escureceria
            as nove por causa deste canto. `drop-shadow` e não `text-shadow`
            para a seta, que é SVG, vir junto. */}
        <Link
          to={tela.href}
          style={{
            filter:
              "drop-shadow(0 0 2px rgba(0,0,0,0.85)) drop-shadow(0 1px 14px rgba(0,0,0,0.7))",
          }}
          className="pointer-events-auto absolute top-4 right-4 inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.14em] lg:top-7 lg:right-7 lg:gap-4 lg:text-[13px] hover:opacity-70 transition-opacity duration-300"
        >
          Ver mais
          <MoveRight className="w-5 lg:w-7" strokeWidth={1.25} />
        </Link>
      </div>

      {/* Linha do nome, fora do cartão e sobre a cor da linha. */}
      {/* O par nome + etiqueta tem de caber numa linha SÓ, em 375px, no pior
          caso do conjunto — que é "Tecido Acústico" ao lado de "Linha ECHO".
          Se quebrar, a segunda linha cai fora da altura reservada e some por
          baixo da borda da janela. Daí o corpo menor no celular e a etiqueta
          mais apertada ali: não é timidez tipográfica, é o que sobra de
          largura depois da etiqueta. */}
      <div className={"shrink-0 flex items-center justify-between gap-3 " + LINHA_NOME}>
        <h2 className="font-display font-light leading-none whitespace-nowrap text-[26px] sm:text-[32px] lg:text-[clamp(44px,3.6vw,68px)]">
          {tela.titulo}
        </h2>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-white px-3 py-1.5 font-display text-[11px] leading-none sm:px-4 sm:text-[12px] lg:px-6 lg:py-2.5 lg:text-[15px]">
          {tela.etiqueta}
        </span>
      </div>
    </div>
  );
});
