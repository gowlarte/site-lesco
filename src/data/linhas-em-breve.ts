import { t } from "@/i18n/t";
import heroZhuzen from "@/assets/hero-home-zhuzen.webp";
import heroEcho from "@/assets/hero-home-echotex.webp";
import heroGeo from "@/assets/hero-home-italflex.webp";

import logoZhuzenRaw from "@/assets/linha-zhuzen-2.svg?raw";
import logoEchoRaw from "@/assets/linha-echotex-2.svg?raw";
import logoItalflexRaw from "@/assets/linha-italflex-2.svg?raw";

export interface LinhaEmBreve {
  slug: string;
  nome: string;
  logo: string;
  imagem: string;
  tagline: string;
  intro: string;
  sobreTitulo: string;
  sobreTexto: string;
  /** `id` vira âncora da seção — usado pelos links de tipo no menu (ex. /zhu#forro). */
  aplicacoes: { titulo: string; descricao: string; id?: string }[];
  diferenciais: string[];
  /** GHL form (lançamento) específico da linha */
  formId?: string;
  formName?: string;
  formHeight?: number;
}

export const linhasEmBreve: Record<string, LinhaEmBreve> = {
  zhu: {
    slug: "zhu",
    nome: "Zhú",
    logo: logoZhuzenRaw,
    imagem: heroZhuzen,
    tagline: t("Arquitetura em Bambu"),
    intro:
      t("Uma nova linha dedicada ao bambu — material ancestral, contemporâneo e radicalmente sustentável. Em breve disponível para projetos."),
    sobreTitulo: t("Sobre a linha Zhú"),
    sobreTexto:
      t("Zhú reúne forros, painéis acústicos e decks produzidos a partir do bambu. Uma linha que celebra a leveza, a textura natural e o tempo de vida longo de uma das fibras mais nobres do planeta."),
    aplicacoes: [
      { id: "forro", titulo: t("Forros"), descricao: t("Forros decorativos em bambu para ambientes internos, com acabamento natural ou tingido.") },
      { id: "acustico", titulo: t("Painéis acústicos"), descricao: t("Painéis em bambu com performance acústica para ambientes que exigem conforto sonoro.") },
      { id: "deck", titulo: t("Decks"), descricao: t("Decks em bambu para áreas externas e internas, com alta durabilidade e estética natural.") },
    ],
    diferenciais: [
      t("Matéria-prima 100% renovável e de rápido crescimento"),
      t("Estética natural com alta durabilidade"),
      t("Aplicação versátil em interiores e mobiliário"),
      t("Fabricação artesanal com controle de qualidade"),
    ],
    // Sem formulário: a Zhú saiu do pré-lançamento e /zhu agora é a visão geral
    // da linha (src/pages/Zhu.tsx), com as páginas de produto por família.
    // O Echo, abaixo, segue captando pelo formulário.
  },
  echo: {
    slug: "echo",
    nome: "Echo",
    logo: logoEchoRaw,
    imagem: heroEcho,
    tagline: t("Tecido Acústico Moldado"),
    intro:
      t("A nova linha de tecido acústico moldado para estúdios profissionais, home cinemas e ambientes que exigem performance sonora e identidade visual."),
    sobreTitulo: t("Sobre a linha Echo"),
    sobreTexto:
      t("Echo é desenvolvida para resolver, no mesmo elemento, performance acústica e expressão arquitetônica. Painéis moldados em tecido com diferentes texturas, padrões e cores, prontos para integrar projetos de alto desempenho sonoro."),
    aplicacoes: [
      { titulo: t("Estúdios profissionais"), descricao: t("Tratamento acústico de salas de gravação, mixagem e masterização.") },
      { titulo: t("Home cinemas"), descricao: t("Painéis decorativos com absorção sonora controlada para residências.") },
      { titulo: t("Ambientes corporativos"), descricao: t("Salas de reunião, auditórios e espaços colaborativos.") },
    ],
    diferenciais: [
      t("Performance acústica certificada"),
      t("Variedade de cores, texturas e formatos"),
      t("Instalação rápida e modular"),
      t("Soluções customizáveis sob projeto"),
    ],
    formId: "A7iX7TMKzhNq1vXwMiVy",
    formName: "[05] [FORM] [LANÇAMENTOS]",
    formHeight: 470,
  },
  geo: {
    slug: "geo",
    nome: "Geo",
    logo: logoItalflexRaw,
    imagem: heroGeo,
    tagline: t("Revestimento Flexível"),
    intro:
      t("Revestimento flexível para fachadas, paredes de cozinhas, banheiros e ambientes internos e externos. Em breve no portfólio Lesco."),
    sobreTitulo: t("Sobre a linha Geo"),
    sobreTexto:
      t("Geo é uma linha de revestimentos flexíveis que combina estética mineral com instalação simples e durabilidade superior. Indicada para áreas molhadas, fachadas e qualquer superfície que peça acabamento contínuo, leve e resistente."),
    aplicacoes: [
      { titulo: t("Fachadas"), descricao: t("Acabamento contínuo, leve e resistente às intempéries.") },
      { titulo: t("Áreas molhadas"), descricao: t("Cozinhas, banheiros e áreas técnicas com alta exigência de impermeabilidade.") },
      { titulo: t("Interiores residenciais"), descricao: t("Paredes, painéis e detalhes decorativos com toque mineral.") },
    ],
    diferenciais: [
      t("Flexível e leve, fácil de aplicar"),
      t("Indicado para uso interno e externo"),
      t("Resistente à umidade e à variação térmica"),
      t("Acabamento contínuo, sem juntas aparentes"),
    ],
    formId: "A7iX7TMKzhNq1vXwMiVy",
    formName: "[05] [FORM] [GEO]",
    formHeight: 470,
  },
};
