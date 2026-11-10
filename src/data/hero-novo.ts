/**
 * Conteúdo do hero da marca 2.0 — a versão que mora em /lesco-new.
 *
 * NÃO é o hero que está no ar. O de produção continua sendo
 * `src/data/hero-solucoes.ts`, com a taxonomia por TIPOLOGIA DE APLICAÇÃO
 * (brise, fachada, forro…). Aqui o eixo é o PRODUTO: Brise, Shield, Line,
 * Panel, Deck, Muxarabi são os nomes da linha de madeira ecológica, e cada um
 * ganha uma tela. Foi assim que os mockups vieram, e é a diferença de fundo
 * entre as duas versões — não um detalhe de rótulo.
 *
 * O que mudou de forma, em relação ao hero de hoje:
 *
 *   1. A PÁGINA tem cor, e a cor é da linha. O cartão de foto é uma ilha
 *      dentro dela, com margem nos quatro lados, em vez de sangrar.
 *   2. O nome do produto e a etiqueta da linha ficam ABAIXO do cartão, sobre
 *      a cor — não por cima da foto.
 *   3. Sem texto corrido: cada tela é foto + nome + etiqueta + "VER MAIS".
 *
 * Nenhum texto passa por `t()`: a rota não é localizada e a capa é uma
 * composição tipográfica em português, com ARQUI/TETURA partidos à mão. Em
 * inglês a quebra não existiria, então traduzir pedaço por pedaço daria uma
 * frase sem sentido. Quando (e se) esta versão virar a de produção, a capa
 * precisa de uma composição própria para o EN — ver a nota em LINHAS_CAPA.
 */

import imgCapa from "@/assets/hero-novo/capa.webp";
import imgBrise from "@/assets/hero-novo/brise.webp";
import imgShield from "@/assets/hero-novo/shield.webp";
import imgLine from "@/assets/hero-novo/line.webp";
import imgPanel from "@/assets/hero-novo/panel.webp";
import imgBambu from "@/assets/hero-novo/bambu.webp";
import imgPedra from "@/assets/hero-novo/pedra.webp";
import imgAcustica from "@/assets/hero-novo/acustica.webp";
// Deck e muxarabi não vieram no lote novo: as fotos que os mockups mostram
// são as que o hero de produção já usa.
import imgDeck from "@/assets/hero-deck.webp";
import imgMuxarabi from "@/assets/hero-muxarabi.webp";

/**
 * As cores de fundo, por linha. Vieram do cliente como hex, e ficam como hex:
 * são a identidade de cada linha, não um papel no tema do site (nada aqui é
 * "superfície" ou "texto secundário"), então não há token a reaproveitar.
 */
export const FUNDO = {
  /** Fora de qualquer linha: a capa é institucional. */
  capa: "#181818",
  madeira: "#B89C7A",
  bambu: "#909F8F",
  pedra: "#B77053",
  acustica: "#728EA0",
} as const;

export interface TelaProduto {
  /** Vira o id da âncora e o `slide_id` no GA4. */
  id: string;
  /** O nome do produto, do tamanho que aparece abaixo do cartão. */
  titulo: string;
  /** A etiqueta arredondada à direita do nome: a linha a que ele pertence. */
  etiqueta: string;
  /** Destino do "VER MAIS". */
  href: string;
  imagem: string;
  alt: string;
  fundo: string;
}

export const telasProduto: TelaProduto[] = [
  {
    id: "brise",
    titulo: "Brise",
    etiqueta: "Madeira Ecológica",
    href: "/brise-madeira-ecologica",
    imagem: imgBrise,
    alt: "Fachada de edifício com brises verticais em madeira ecológica Lesco e sacadas plantadas.",
    fundo: FUNDO.madeira,
  },
  {
    id: "shield",
    titulo: "Shield",
    etiqueta: "Madeira Ecológica",
    href: "/madeira-ecologica-para-fachada",
    imagem: imgShield,
    alt: "Parede e forro em réguas de madeira ecológica Lesco Shield em área gourmet.",
    fundo: FUNDO.madeira,
  },
  {
    id: "line",
    titulo: "Line",
    etiqueta: "Madeira Ecológica",
    href: "/forro-line",
    imagem: imgLine,
    alt: "Forro ripado circular em madeira ecológica Lesco Line sobre o lobby de um hotel.",
    fundo: FUNDO.madeira,
  },
  {
    id: "panel",
    titulo: "Panel",
    etiqueta: "Madeira Ecológica",
    href: "/lesco-panel",
    imagem: imgPanel,
    alt: "Residência revestida em painéis de madeira ecológica Lesco sob marquise de concreto.",
    fundo: FUNDO.madeira,
  },
  {
    id: "deck",
    titulo: "Deck",
    etiqueta: "Madeira Ecológica",
    href: "/madeira-ecologica-para-deck",
    imagem: imgDeck,
    alt: "Deck em madeira ecológica Lesco visto de cima, com a sombra do guarda-corpo.",
    fundo: FUNDO.madeira,
  },
  {
    id: "muxarabi",
    titulo: "Muxarabi",
    etiqueta: "Madeira Ecológica",
    href: "/muxarabi-madeira-ecologica",
    imagem: imgMuxarabi,
    alt: "Painel muxarabi em madeira ecológica Lesco filtrando a luz natural.",
    fundo: FUNDO.madeira,
  },
  {
    id: "bambu",
    titulo: "Bambu",
    etiqueta: "Linha ZHÚ",
    href: "/painel-bambu",
    imagem: imgBambu,
    alt: "Edifício curvo revestido em lâminas de bambu da linha Zhú, refletido no espelho d'água.",
    fundo: FUNDO.bambu,
  },
  {
    id: "pedra-flexivel",
    titulo: "Pedra Flexível",
    etiqueta: "Linha GEO",
    href: "/geo",
    imagem: imgPedra,
    alt: "Parede em pedra flexível Geo Lesco atrás de mesa de jantar e poltrona.",
    fundo: FUNDO.pedra,
  },
  {
    id: "acustica",
    // Dois mockups brigam aqui: um escreve "Tecido Acústico", o outro "Painel
    // Acústico". Fica o primeiro — é o que não tem nenhum dos outros erros da
    // prancha (o "Deck" repetido, o bambu etiquetado como madeira ecológica) e
    // é a palavra que o site já usa para a linha Echo.
    titulo: "Tecido Acústico",
    etiqueta: "Linha ECHO",
    href: "/echo",
    imagem: imgAcustica,
    alt: "Painéis acústicos em leque da linha Echo, em azul e cinza, sobre parede clara.",
    fundo: FUNDO.acustica,
  },
];

/** A tela 01: a capa institucional, sem etiqueta e sem "VER MAIS". */
export const telaCapa = {
  id: "capa",
  imagem: imgCapa,
  alt: "Edifício com brises verticais em madeira ecológica Lesco, visto de baixo contra o céu.",
  fundo: FUNDO.capa,
};

/**
 * A frase da capa, uma linha por item.
 *
 * Cada linha é PALAVRA + um filete que come o espaço que sobra — é o filete
 * que justifica a linha, não o espaçamento entre letras. Por isso a
 * composição não precisa de larguras fixas: num celular estreito o filete
 * encolhe, num tablet ele estica, e a palavra nunca quebra nem se deforma.
 *
 * `regua` diz de que lado o filete entra. "ARQUI" e "TETURA" são a mesma
 * palavra partida ao meio, e os filetes nas pontas opostas são o que faz a
 * leitura atravessar as duas linhas.
 *
 * NÃO há cor por palavra. A frase inteira é de uma cor neutra só e o que a
 * faz aparecer sobre o céu e sobre o prédio é o modo de mesclagem
 * `difference` — ver HeroNovo.tsx. Nos mockups "ARQUI" parece âmbar e "FEITA
 * PARA" parece branco porque é o fundo que muda debaixo delas, não a tinta.
 *
 * Em inglês isso não se traduz pedaço a pedaço: a frase é outra e a quebra
 * cairia em outro lugar. Seria uma composição nova, não uma string nova.
 */
export const LINHAS_CAPA = [
  { texto: "ARQUI", regua: "depois" },
  { texto: "TETURA", regua: "antes" },
  { texto: "FEITA PARA", regua: "nenhuma" },
  { texto: "O", regua: "depois" },
  { texto: "AMANHÃ", regua: "antes" },
] as const;

/** Total de telas do módulo: a capa mais uma por produto. */
export const TOTAL_TELAS = telasProduto.length + 1;

/** Toda tela na ordem em que o dedo as encontra — capa primeiro. */
export const TODAS_AS_FOTOS = [telaCapa.imagem, ...telasProduto.map((t) => t.imagem)];
