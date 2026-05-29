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
  aplicacoes: { titulo: string; descricao: string }[];
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
    tagline: "Arquitetura em Bambu",
    intro:
      "Uma nova linha dedicada ao bambu — material ancestral, contemporâneo e radicalmente sustentável. Em breve disponível para projetos.",
    sobreTitulo: "Sobre a linha Zhú",
    sobreTexto:
      "Zhú reúne revestimentos, forros, luminárias, decorativos e utilitários produzidos a partir do bambu. Uma linha que celebra a leveza, a textura natural e o tempo de vida longo de uma das fibras mais nobres do planeta.",
    aplicacoes: [
      { titulo: "Revestimentos", descricao: "Painéis e lâminas para paredes, com acabamento natural ou tingido." },
      { titulo: "Forros e luminárias", descricao: "Soluções para forros decorativos e peças luminotécnicas em bambu." },
      { titulo: "Decorativos e utilitários", descricao: "Coleção de objetos para projetos residenciais, hoteleiros e gastronômicos." },
    ],
    diferenciais: [
      "Matéria-prima 100% renovável e de rápido crescimento",
      "Estética natural com alta durabilidade",
      "Aplicação versátil em interiores e mobiliário",
      "Fabricação artesanal com controle de qualidade",
    ],
    formId: "A7iX7TMKzhNq1vXwMiVy",
    formName: "[05] [FORM] [LANÇAMENTOS]",
    formHeight: 470,
  },
  echo: {
    slug: "echo",
    nome: "Echo",
    logo: logoEchoRaw,
    imagem: heroEcho,
    tagline: "Tecido Acústico Moldado",
    intro:
      "A nova linha de tecido acústico moldado para estúdios profissionais, home cinemas e ambientes que exigem performance sonora e identidade visual.",
    sobreTitulo: "Sobre a linha Echo",
    sobreTexto:
      "Echo é desenvolvida para resolver, no mesmo elemento, performance acústica e expressão arquitetônica. Painéis moldados em tecido com diferentes texturas, padrões e cores, prontos para integrar projetos de alto desempenho sonoro.",
    aplicacoes: [
      { titulo: "Estúdios profissionais", descricao: "Tratamento acústico de salas de gravação, mixagem e masterização." },
      { titulo: "Home cinemas", descricao: "Painéis decorativos com absorção sonora controlada para residências." },
      { titulo: "Ambientes corporativos", descricao: "Salas de reunião, auditórios e espaços colaborativos." },
    ],
    diferenciais: [
      "Performance acústica certificada",
      "Variedade de cores, texturas e formatos",
      "Instalação rápida e modular",
      "Soluções customizáveis sob projeto",
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
    tagline: "Revestimento Flexível",
    intro:
      "Revestimento flexível para fachadas, paredes de cozinhas, banheiros e ambientes internos e externos. Em breve no portfólio Lesco.",
    sobreTitulo: "Sobre a linha Geo",
    sobreTexto:
      "Geo é uma linha de revestimentos flexíveis que combina estética mineral com instalação simples e durabilidade superior. Indicada para áreas molhadas, fachadas e qualquer superfície que peça acabamento contínuo, leve e resistente.",
    aplicacoes: [
      { titulo: "Fachadas", descricao: "Acabamento contínuo, leve e resistente às intempéries." },
      { titulo: "Áreas molhadas", descricao: "Cozinhas, banheiros e áreas técnicas com alta exigência de impermeabilidade." },
      { titulo: "Interiores residenciais", descricao: "Paredes, painéis e detalhes decorativos com toque mineral." },
    ],
    diferenciais: [
      "Flexível e leve, fácil de aplicar",
      "Indicado para uso interno e externo",
      "Resistente à umidade e à variação térmica",
      "Acabamento contínuo, sem juntas aparentes",
    ],
    formId: "A7iX7TMKzhNq1vXwMiVy",
    formName: "[05] [FORM] [GEO]",
    formHeight: 470,
  },
};
