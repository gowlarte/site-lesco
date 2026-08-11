// ---------------------------------------------------------------------------
// Linha Zhú (bambu maciço) — famílias de produto, modelos e dados técnicos.
//
// FONTE: catálogo "Lesco - Zhú - Catálogo" (2026), páginas 7 a 36 e 55. Medidas,
// códigos, acabamentos e uso saíram do próprio catálogo; os renders de perfil
// foram extraídos das mesmas páginas, então cada `imagem` corresponde ao modelo
// da página onde estava.
//
// Fora de escopo por decisão de produto: instruções de instalação (o catálogo
// traz, as páginas não), paleta de cores e galeria de projetos (a Zhú ainda não
// tem esses assets aprovados, ao contrário da madeira ecológica).
// ---------------------------------------------------------------------------
import { t } from "@/i18n/t";

import infintyWave from "@/assets/zhu-infinty-wave.webp";
import slotWave from "@/assets/zhu-slot-wave.webp";
import obliqueWave from "@/assets/zhu-oblique-wave.webp";
import squareWave from "@/assets/zhu-square-wave.webp";
import sawWave from "@/assets/zhu-saw-wave.webp";
import grandWave from "@/assets/zhu-grand-wave.webp";
import narrowWave from "@/assets/zhu-narrow-wave.webp";
import cloudWave from "@/assets/zhu-cloud-wave.webp";
import squareWaveXl from "@/assets/zhu-square-wave-xl.webp";
import squareWaveXxl from "@/assets/zhu-square-wave-xxl.webp";
import caseClassic from "@/assets/zhu-case-classic.webp";
import caseThin from "@/assets/zhu-case-thin.webp";
import caseCompact from "@/assets/zhu-case-compact.webp";
import perfon3 from "@/assets/zhu-perfon-3mm.webp";
import perfon6 from "@/assets/zhu-perfon-6mm.webp";
import perfon8 from "@/assets/zhu-perfon-8mm.webp";
import petSlim from "@/assets/zhu-pet-slim.webp";
import petThin from "@/assets/zhu-pet-thin.webp";
import petLarge from "@/assets/zhu-pet-large.webp";
import briseSlim from "@/assets/zhu-brise-slim.webp";
import briseDeep from "@/assets/zhu-brise-deep.webp";
import briseWide from "@/assets/zhu-brise-wide.webp";
import briseXtraSlim from "@/assets/zhu-brise-xtra-slim.webp";
import briseUltraWide from "@/assets/zhu-brise-ultra-wide.webp";
import deckWood from "@/assets/zhu-deck-wood.webp";
import deckObsidian from "@/assets/zhu-deck-obsidian.webp";

/** Acabamento disponível para um modelo — o catálogo lista até dois. */
export interface VarianteZhu {
  codigo: string;
  acabamento: string;
  uso: string;
}

export interface ModeloZhu {
  nome: string;
  descricao?: string;
  /** Comprimento × largura × espessura, como impresso no catálogo. */
  medida: string;
  /** Resumo de uso mostrado no card. */
  uso: string;
  aplicacao: string;
  imagem: string;
  variantes: VarianteZhu[];
}

export interface FamiliaZhu {
  /** Slug PT — chave em src/i18n/routes.ts. */
  slug: string;
  /** Nome da família, como no catálogo. */
  nome: string;
  /** Rótulo curto para breadcrumb e etiquetas. */
  curto: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  modelos: ModeloZhu[];
  /** Navegação entre famílias, no rodapé da página. */
  anterior: { href: string; label: string };
  proximo: { href: string; label: string };
}

const USO_INTERNO = t("Interno");
const USO_AMBOS = t("Interno e externo");
const USO_SO_INTERNO = t("Apenas interno");
const VERNIZ = t("Verniz UV");
const OLEO = t("Óleo de madeira");
const PET_PRETA = t("Bambu com base PET preta");
const APLIC_PAINEL = t("Painel / Revestimento de parede");
const APLIC_ACUSTICO = t("Painel acústico, parede e teto");
const APLIC_ACUSTICO_PAREDE = t("Painel acústico de parede");
const APLIC_BRISE = t("Grelha / Forro / Baffle");
const APLIC_DECK = t("Decks de alta densidade");

/** Painéis, revestimentos e forros ripados em bambu maciço. */
const paineisForros: ModeloZhu[] = [
  {
    nome: "Infinty Wave",
    descricao: t("Para uma textura ripada contínua e uniforme, ideal para salas e áreas de convivência."),
    medida: "5800/2900 × 140 × 18 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: infintyWave,
    variantes: [
      { codigo: "WP-18VC18-5", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-18VC18-5", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Slot Wave",
    descricao: t("Ritmo, leveza e movimento em superfícies que trazem sofisticação em cada detalhe."),
    medida: "5800/2900 × 140 × 18 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: slotWave,
    variantes: [
      { codigo: "WP-18VC35-12", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-18VC35-12", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Oblique Wave",
    descricao: t("Uma textura cadenciada e angulada. Normalmente colocado em paredes que necessitam de um preenchimento minimalista e diferenciado."),
    medida: "5800/2900 × 135 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: obliqueWave,
    variantes: [
      { codigo: "WP-15VC5-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VC5-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Square Wave",
    descricao: t("Ripado padrão reto. Ritmo uniforme e contínuo, ideal para fachadas ou paredes de fundo."),
    medida: "2900 × 140 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: squareWave,
    variantes: [
      { codigo: "WP-15VC7-7-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VC7-7-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Saw Wave",
    descricao: t("Forro angulado em serra, ideal para estúdios, salas de estar, lounges ou recepções."),
    medida: "2900 × 140 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: sawWave,
    variantes: [
      { codigo: "WP-15VCV28-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VCV28-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Grand Wave",
    descricao: t("Padrão ondulatório, para uma sensação de movimento e leveza no ambiente."),
    medida: "2900 × 140 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: grandWave,
    variantes: [
      { codigo: "WP-15VCR18G-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VCR18G-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Narrow Wave",
    descricao: t("Padrão ondulatório, para uma sensação de movimento e leveza no ambiente."),
    medida: "2900 × 140 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: narrowWave,
    variantes: [
      { codigo: "WP-15VCS8-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VCS8-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Cloud Wave",
    descricao: t("Ondas invertidas maiores, dando uma sensação de conforto e segurança. Ideal para quartos."),
    medida: "2900 × 140 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: cloudWave,
    variantes: [
      { codigo: "WP-15VCR18T-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VCR18T-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Square Wave XL",
    descricao: t("Padrões retos e ripados mais largos."),
    medida: "2900 × 120 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: squareWaveXl,
    variantes: [
      { codigo: "WP-15VC20-4-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VC20-4-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
  {
    nome: "Square Wave XXL",
    descricao: t("Padrões retos e ripados mais largos, com quatro cotas grandes em cada perfil."),
    medida: "2900 × 120 × 15 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_PAINEL,
    imagem: squareWaveXxl,
    variantes: [
      { codigo: "WP-15VC28-2-TG", acabamento: VERNIZ, uso: USO_INTERNO },
      { codigo: "WEP-15VC28-2-TG", acabamento: OLEO, uso: USO_AMBOS },
    ],
  },
];

/** Painéis acústicos: camada cruzada, perfurados e ripados com base PET. */
const paineisAcusticos: ModeloZhu[] = [
  {
    nome: "Case Classic",
    descricao: t("Painel acústico em bambu maciço com ranhuras lineares e perfurações laterais, indicado para paredes e tetos em ambientes internos."),
    medida: "2900 × 128 × 18 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO,
    imagem: caseClassic,
    variantes: [{ codigo: "WA-18VC28-4-TG", acabamento: VERNIZ, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Case Thin",
    descricao: t("Variação acústica com paginação linear e superfície em bambu, indicada para composições internas em paredes e tetos."),
    medida: "2900 × 128 × 18 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO,
    imagem: caseThin,
    variantes: [{ codigo: "WA-18VC23-3-TG", acabamento: VERNIZ, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Case Compact",
    descricao: t("Painel acústico de leitura linear, desenvolvido para aplicações internas que exigem acabamento natural e controle sonoro."),
    medida: "2900 × 128 × 18 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO,
    imagem: caseCompact,
    variantes: [{ codigo: "WA-18VC13-3-TG", acabamento: VERNIZ, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Perfon 3mm",
    descricao: t("Painel perfurado em bambu maciço, indicado para tratamento acústico em paredes e forros internos."),
    medida: "1200/600 × 600 × 15 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO,
    imagem: perfon3,
    variantes: [{ codigo: "WA-15VC16ø3-S", acabamento: VERNIZ, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Perfon 6mm",
    descricao: t("Painel acústico perfurado com distribuição regular de furos, indicado para ambientes internos que exigem acabamento natural."),
    medida: "1200/600 × 600 × 15 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO,
    imagem: perfon6,
    variantes: [{ codigo: "WA-15VC16ø6-S", acabamento: VERNIZ, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Perfon 8mm",
    descricao: t("Painel acústico com perfurações maiores e desenho geométrico, indicado para paredes e tetos internos."),
    medida: "1200/600 × 600 × 15 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO,
    imagem: perfon8,
    variantes: [{ codigo: "WA-15VC32ø8-D", acabamento: VERNIZ, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Pet Slim",
    descricao: t("Painel acústico ripado com base PET preta de 9 mm, composto por ripas de bambu e indicado para paredes internas."),
    medida: "2900 × 405 × 28 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO_PAREDE,
    imagem: petSlim,
    variantes: [{ codigo: "WA-28VC18-3220PE", acabamento: PET_PRETA, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Pet Thin",
    descricao: t("Painel acústico ripado com composição linear mais fechada, desenvolvido para paredes internas com acabamento em bambu e base PET preta."),
    medida: "2900 × 405 × 28 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO_PAREDE,
    imagem: petThin,
    variantes: [{ codigo: "WA-28VC20-2020PE", acabamento: PET_PRETA, uso: USO_SO_INTERNO }],
  },
  {
    nome: "Pet Large",
    descricao: t("Painel acústico ripado com ripas mais largas e base PET preta, indicado para composições internas de parede."),
    medida: "2900 × 405 × 28 mm",
    uso: USO_SO_INTERNO,
    aplicacao: APLIC_ACUSTICO_PAREDE,
    imagem: petLarge,
    variantes: [{ codigo: "WA-28VC12-4520PE", acabamento: PET_PRETA, uso: USO_SO_INTERNO }],
  },
];

/** Grelhas e baffles: ripas de bambu maciço sobre base de alumínio preto. */
const brises: ModeloZhu[] = [
  {
    nome: "Brise Slim",
    descricao: t("Grelha em bambu com ripas de 20 x 20 mm sobre base de alumínio preto, com espaçamento de 20 mm."),
    medida: "5800/2900 × 400 × 30 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_BRISE,
    imagem: briseSlim,
    variantes: [{ codigo: "WS-30VC20-2020", acabamento: OLEO, uso: USO_AMBOS }],
  },
  {
    nome: "Brise Deep",
    descricao: t("Grelha em bambu com ripas de 20 x 32 mm sobre base de alumínio preto, com espaçamento de 20 mm."),
    medida: "5800/2900 × 400 × 42 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_BRISE,
    imagem: briseDeep,
    variantes: [{ codigo: "WS-42VC20-2032", acabamento: OLEO, uso: USO_AMBOS }],
  },
  {
    nome: "Brise Wide",
    descricao: t("Grelha em bambu com ripas de 45 x 20 mm sobre base de alumínio preto, com espaçamento de 12 mm."),
    medida: "5800/2900 × 400 × 30 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_BRISE,
    imagem: briseWide,
    variantes: [{ codigo: "WS-30VC12-4520", acabamento: OLEO, uso: USO_AMBOS }],
  },
  {
    nome: "Brise Xtra Slim",
    descricao: t("Grelha em bambu com ripas de 30 x 38 mm sobre base de alumínio preto, com espaçamento de 20 mm."),
    medida: "5800/2900 × 400 × 30 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_BRISE,
    imagem: briseXtraSlim,
    variantes: [{ codigo: "WS-48VC20-3038", acabamento: OLEO, uso: USO_AMBOS }],
  },
  {
    nome: "Brise Ultra Wide",
    descricao: t("Grelha em bambu com ripas de 68 x 20 mm sobre base de alumínio preto, com espaçamento de 12 mm."),
    medida: "5800/2900 × 400 × 30 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_BRISE,
    imagem: briseUltraWide,
    variantes: [{ codigo: "WS-30VC12-6820", acabamento: OLEO, uso: USO_AMBOS }],
  },
];

/** Decks em bambu strand woven, super e extrema densidade. */
const decks: ModeloZhu[] = [
  {
    nome: "Deck Wood",
    descricao: t("Deck na cor padrão madeira."),
    medida: "1860 × 139 × 18 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_DECK,
    imagem: deckWood,
    variantes: [{ codigo: "DS-SW18-V", acabamento: OLEO, uso: USO_AMBOS }],
  },
  {
    nome: "Deck Obsidian",
    descricao: t("Deck na cor madeira escura."),
    medida: "1860 × 139 × 18 mm",
    uso: USO_AMBOS,
    aplicacao: APLIC_DECK,
    imagem: deckObsidian,
    variantes: [{ codigo: "DX-SW18-V", acabamento: OLEO, uso: USO_AMBOS }],
  },
];

export const familiasZhu: Record<string, FamiliaZhu> = {
  paineis: {
    slug: "/painel-bambu",
    nome: t("Painéis e Forros"),
    curto: t("Painéis"),
    intro: t("Linha de painéis, revestimentos e forros produzidos em bambu maciço. Os modelos contemplam versões para uso interno e externo, com acabamento em óleo de madeira ou verniz UV."),
    seoTitle: t("Painel e Forro de Bambu | Lesco Zhú"),
    seoDescription: t("Painéis, revestimentos e forros ripados em bambu maciço da linha Zhú. Dez modelos com medidas, códigos e acabamento em verniz UV ou óleo de madeira."),
    modelos: paineisForros,
    anterior: { href: "/zhu", label: "Zhú" },
    proximo: { href: "/painel-acustico-bambu", label: t("Acústicos") },
  },
  acusticos: {
    slug: "/painel-acustico-bambu",
    nome: t("Painéis Acústicos"),
    curto: t("Acústicos"),
    intro: t("Os painéis acústicos em bambu foram desenvolvidos para aplicações internas em paredes e forros. As opções incluem painéis em camada cruzada e modelos ripados com base PET preta de 9 mm, oferecendo acabamento natural, leitura arquitetônica e desempenho funcional."),
    seoTitle: t("Painel Acústico de Bambu | Lesco Zhú"),
    seoDescription: t("Painéis acústicos em bambu maciço da linha Zhú: camada cruzada, perfurados e ripados com base PET preta. Nove modelos com medidas e códigos."),
    modelos: paineisAcusticos,
    anterior: { href: "/painel-bambu", label: t("Painéis") },
    proximo: { href: "/brise-bambu", label: t("Brises") },
  },
  brises: {
    slug: "/brise-bambu",
    nome: t("Brises"),
    curto: t("Brises"),
    intro: t("As grelhas e baffles em bambu combinam ripas de bambu maciço com base em alumínio preto. Os modelos são indicados para uso interno e externo e permitem diferentes composições visuais, com variações de seção, profundidade e espaçamento entre ripas."),
    seoTitle: t("Brise de Bambu | Lesco Zhú"),
    seoDescription: t("Grelhas e baffles em bambu maciço sobre base de alumínio preto, da linha Zhú. Cinco modelos com medidas, seção das ripas e espaçamento."),
    modelos: brises,
    anterior: { href: "/painel-acustico-bambu", label: t("Acústicos") },
    proximo: { href: "/deck-bambu", label: t("Decks") },
  },
  decks: {
    slug: "/deck-bambu",
    nome: t("Decks"),
    curto: t("Decks"),
    intro: t("Os decks em bambu strand woven estão disponíveis em versões de super densidade e extrema densidade, com acabamento em cor clara ou escura. São peças desenvolvidas para paginações lineares, com estética natural e alta resistência estrutural."),
    seoTitle: t("Deck de Bambu | Lesco Zhú"),
    seoDescription: t("Decks em bambu strand woven da linha Zhú, em super e extrema densidade, com acabamento claro ou escuro. Medidas e códigos de especificação."),
    modelos: decks,
    anterior: { href: "/brise-bambu", label: t("Brises") },
    proximo: { href: "/zhu", label: "Zhú" },
  },
};

/** Dados técnicos da linha (catálogo, página 55) — valem para todas as famílias. */
export const dadosTecnicosZhu: { rotulo: string; valor: string }[] = [
  { rotulo: t("Densidade"), valor: "±680 kg/m³" },
  { rotulo: t("Dureza Janka"), valor: "1.380 lbf" },
  { rotulo: t("Emissão de formaldeído"), valor: t("Classe E1 — 0,72 mg/m².h (EN 717-2)") },
  { rotulo: t("Resistência a fungos"), valor: t("Alta resistência, conforme EN 846") },
  { rotulo: t("Teor de umidade"), valor: "10% — 14%" },
  { rotulo: t("Condutividade térmica"), valor: "0,39 W/(m·K) (EN 12524)" },
  { rotulo: t("Expansão linear"), valor: t("0,1% entre 50% e 90% de umidade relativa (ASTM D1037:2012)") },
  { rotulo: t("Resistência ao fogo"), valor: t("Classificação Bfl-s1 disponível sob consulta (EN 13501)") },
  { rotulo: t("Ensaio de durabilidade"), valor: t("Classe 1 (EN 350 / CEN/TS 15083-2) e Classe 4 (EN 335)") },
  { rotulo: t("Certificação FSC"), valor: t("Disponível sob consulta — certificado C135631") },
];
