import { t } from "@/i18n/t";

// Tela 01 — abertura institucional. É a capa: carrega ansiosa e vai no
// preload da home (ver src/pages/Index.tsx), ou seja, é ela que marca o LCP.
// Por isso fica na mesma qualidade 85 do resto — subir para 92 rendia 0,9 dB
// de PSNR e custava 300 KB bem no caminho crítico.
import heroAbertura from "@/assets/hero-capa.webp";
// Telas 02..11 — uma por tipologia de aplicação.
//
// Fundo de tela cheia: as fotos do lote `hero-*` saem do original em 2200px
// de largura, WebP qualidade 85 — largura suficiente para a tela cheia mais o
// zoom de 1,14 do parallax sem ampliar pixel. Ainda devendo arquivo:
//   muxarabi   hero-muxarabi      1280x720   — foto certa, curta de pixel
//   acústica   hero-home-echotex  1920x683   — larga, mas baixa demais
import imgBrise from "@/assets/hero-brise.webp";
import imgFachada from "@/assets/hero-fachada.webp";
import imgForroShield from "@/assets/hero-forro-shield.webp";
import imgForroLine from "@/assets/hero-forro-line.webp";
import imgPainel from "@/assets/hero-painel.webp";
import imgDeck from "@/assets/hero-deck.webp";
import imgMuxarabi from "@/assets/hero-muxarabi.webp";
import imgBambu from "@/assets/hero-home-zhuzen.webp";
import imgPedra from "@/assets/geo-hero/03.jpg";
import imgAcustica from "@/assets/hero-home-echotex.webp";

/**
 * Conteúdo do hero da home — "navegador de soluções" (PRD Hero de Soluções v0.1).
 *
 * O eixo é a TIPOLOGIA DE APLICAÇÃO (brise, fachada, forro…), não o material.
 * É como o especificador busca, e resolve o problema de o material ainda não
 * estar disponível: as linhas em pré-lançamento (Echo, Zhú, Geo) ocupam duas
 * telas marcadas como lançamento e as seis telas de venda real ficam com a
 * linha madura. Quando uma linha nova sair, ela entra na tela da tipologia que
 * já existe como segundo material — a taxonomia não muda.
 *
 * Regra de marca: o termo "WPC" não aparece em nenhum texto deste módulo
 * (usar "madeira ecológica" ou "material 100% reciclado"). Brise, Shield, Line,
 * Panel, Deck e Muxarabi são tipologias DENTRO da linha de madeira ecológica —
 * por isso a linha vai no eyebrow e a tipologia no título — salvo nas duas telas de Forro, onde a linha entra no título para distingui-las.
 */

export interface SlideAbertura {
  id: "abertura";
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  selos: string[];
  ctaPrimario: { label: string; href: string };
  ctaSecundario: { label: string; href: string };
  imagem: string;
  alt: string;
}

export interface SlideTipologia {
  /** Vira o id da âncora (#brise), o rótulo da barra e o `slide_id` no GA4. */
  id: string;
  /** Rótulo curto usado na barra de tipologias. */
  tab: string;
  /** Nome da linha + status separados por " · ". Máx. 40 caracteres. O
   *  status é o que vira a tag de lançamento na tela (telas 08 e 09). */
  eyebrow: string;
  /** A tipologia. 1–2 palavras. Vira o H2 indexável. */
  titulo: string;
  /** 1 frase, máx. 160 caracteres: benefício + aplicação + prova. */
  /** Verbo + destino específico. Nunca "Saiba mais" solto. */
  cta: string;
  href: string;
  imagem: string;
  alt: string;
}

export const slideAbertura: SlideAbertura = {
  id: "abertura",
  eyebrow: "Lesco",
  titulo: t("Arquitetura feita para o amanhã."),
  subtitulo: t(
    "Revestimentos de alto padrão em madeira ecológica, bambu, pedra flexível e tecido acústico. Do brise ao deck, uma superfície para cada decisão de projeto.",
  ),
  selos: [
    t("Pioneiros em madeira ecológica no Brasil"),
    t("Até 10 anos de garantia"),
    t("8 tipologias de aplicação"),
  ],
  ctaPrimario: { label: t("Fale com um especialista"), href: "/orcamento" },
  ctaSecundario: { label: t("Baixe o catálogo"), href: "/catalogo-lesco" },
  imagem: heroAbertura,
  alt: t("Coroamento de edifício em brises de madeira ecológica Lesco, ao entardecer sobre a cidade."),
};

export const slidesTipologia: SlideTipologia[] = [
  {
    id: "brise",
    tab: t("Brise"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Brise"),
    cta: t("Ver perfis e cores"),
    href: "/brise-madeira-ecologica",
    imagem: imgBrise,
    alt: t("Fachada de edifício com brises verticais em madeira ecológica Lesco."),
  },
  {
    id: "fachada",
    tab: t("Fachada"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Fachada"),
    cta: t("Ver a linha Shield"),
    href: "/madeira-ecologica-para-fachada",
    imagem: imgFachada,
    alt: t("Edifício com fachada em madeira ecológica Lesco, brises verticais e sacadas plantadas."),
  },
  // Duas telas de Forro. O que as distingue é a linha, e ela vai no próprio
  // título (Forro Shield, Forro Line) — não no eyebrow. Vêm em sequência e
  // logo após a Fachada, que também é Shield, para o material não pular de tela.
  {
    id: "forro-shield",
    tab: t("Forro"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Forro Shield"),
    // Não existe página de forro Shield; o destino é a da linha.
    cta: t("Ver a linha Shield"),
    href: "/madeira-ecologica-para-fachada",
    imagem: imgForroShield,
    alt: t("Forro externo em prancha de madeira ecológica Lesco Shield."),
  },
  {
    id: "forro-line",
    tab: t("Forro"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Forro Line"),
    cta: t("Ver a linha Line"),
    href: "/forro-wpc",
    imagem: imgForroLine,
    alt: t("Forro ripado em madeira ecológica Lesco em ambiente comercial."),
  },
  {
    id: "painel",
    tab: t("Painel"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Painel"),
    cta: t("Ver a linha Panel"),
    href: "/placa-wpc-interior",
    imagem: imgPainel,
    alt: t("Parede interna revestida em painéis de madeira ecológica Lesco."),
  },
  {
    id: "deck",
    tab: t("Deck"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Deck"),
    cta: t("Ver a linha Deck"),
    href: "/madeira-ecologica-para-deck",
    imagem: imgDeck,
    alt: t("Deck em madeira ecológica Lesco visto de cima, com a sombra do guarda-corpo."),
  },
  {
    id: "muxarabi",
    tab: t("Muxarabi"),
    eyebrow: t("Madeira ecológica"),
    titulo: t("Muxarabi"),
    cta: t("Ver o Muxarabi"),
    href: "/muxarabi-madeira-ecologica",
    imagem: imgMuxarabi,
    alt: t("Painel muxarabi em madeira ecológica Lesco filtrando a luz natural."),
  },
  {
    id: "bambu",
    tab: t("Bambu"),
    eyebrow: t("Zhú"),
    titulo: t("Bambu"),
    cta: t("Ver a linha Zhú"),
    href: "/painel-bambu",
    imagem: imgBambu,
    alt: t("Painéis e forros em bambu maciço da linha Zhú."),
  },
  {
    id: "pedra-flexivel",
    tab: t("Pedra flexível"),
    eyebrow: t("Geo"),
    titulo: t("Pedra flexível"),
    cta: t("Baixar o catálogo Geo"),
    href: "/geo",
    imagem: imgPedra,
    alt: t("Revestimento em pedra flexível Geo Lesco aplicado em fachada."),
  },
  {
    id: "acustica",
    tab: t("Acústica"),
    eyebrow: t("Echo · Lançamento em breve"),
    titulo: t("Acústica"),
    cta: t("Receber o lançamento"),
    href: "/echo",
    imagem: imgAcustica,
    alt: t("Painéis acústicos Lesco em estúdio de gravação."),
  },
];

/** Total de telas do módulo (abertura + tipologias) — usado no indicador "03 / 09". */
export const TOTAL_TELAS = slidesTipologia.length + 1;
