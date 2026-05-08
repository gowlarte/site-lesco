import projectCasaMansa from "@/assets/projetos/casa-mansa-hero.jpg";
import casaMansa2 from "@/assets/projetos/casa-mansa-2.jpg";
import casaMansa3 from "@/assets/projetos/casa-mansa-3.jpg";
import casaMansa4 from "@/assets/projetos/casa-mansa-4.jpg";
import casaMansa5 from "@/assets/projetos/casa-mansa-5.jpg";
import casaMansa6 from "@/assets/projetos/casa-mansa-6.jpg";
import casaMansa7 from "@/assets/projetos/casa-mansa-7.jpg";
import projectResidencialUrbano from "@/assets/project-residencial-urbano.webp";
import projectCasaAreia from "@/assets/project-casa-areia.jpg";
import projectCasaUna from "@/assets/project-casa-una.png";
import projectDeckDetail from "@/assets/project-deck-detail.jpg";

export type Projeto = {
  slug: string;
  nome: string;
  imagem: string;
  linha: string;
  local: string;
  ano: string;
  area: string;
  arquitetura: string;
  produtos: string[];
  descricao: string;
  desafio: string;
  solucao: string;
  galeria: string[];
};

export const projetos: Projeto[] = [
  {
    slug: "casa-mansa",
    nome: "Elegância e Resistência com Materiais Ecológicos de Alto Desempenho",
    imagem: projectCasaMansa,
    linha: "Madeira Ecológica",
    local: "Xangri-Lá, RS",
    ano: "2024",
    area: "420 m²",
    arquitetura: "Stemmer Rodrigues",
    produtos: [
      "Lesco Green Panel 215,5×30 Tasmania Oak",
      "Lesco Green Brise 100×50 Red Cedar",
    ],
    descricao:
      "Essa categoria de produtos oferece uma opção sustentável e sofisticada para transformar o interior ou exterior de qualquer espaço. Fabricado a partir de uma combinação de fibras de madeira reciclada e resinas plásticas, este material apresenta uma estética natural e calorosa, sem comprometer a durabilidade e a resistência.",
    desafio:
      "Desenvolver um envelope contínuo, resistente à maresia e à alta umidade, sem perder a textura e o calor da madeira natural.",
    solucao:
      "Aplicação de Shield em fachada ventilada e Deck em todo o pavimento térreo externo, garantindo unidade visual, baixa manutenção e desempenho técnico.",
    galeria: [casaMansa2, casaMansa3, casaMansa4, casaMansa5, casaMansa6, casaMansa7],
  },
  {
    slug: "residencial-urbano",
    nome: "Residencial Urbano",
    imagem: projectResidencialUrbano,
    linha: "Madeira Ecológica",
    local: "São Paulo, SP",
    ano: "2023",
    area: "1.860 m²",
    arquitetura: "MAB Arquitetura",
    produtos: ["AltWood Brise", "AltWood Shield"],
    descricao:
      "Edifício residencial multifamiliar com fachada ritmada por brises verticais, oferecendo privacidade aos apartamentos e identidade ao edifício no skyline urbano.",
    desafio:
      "Atender requisitos de conforto térmico e acústico em uma fachada exposta ao oeste, mantendo elegância e leveza visual.",
    solucao:
      "Brises modulares combinados com painéis Shield, criando uma pele técnica que filtra a radiação solar e qualifica os ambientes internos.",
    galeria: [projectResidencialUrbano, projectCasaUna, projectCasaMansa],
  },
  {
    slug: "casa-areia",
    nome: "Casa Areia",
    imagem: projectCasaAreia,
    linha: "Madeira Ecológica",
    local: "Búzios, RJ",
    ano: "2024",
    area: "310 m²",
    arquitetura: "Atelier Praia",
    produtos: ["AltWood Deck", "AltWood Line"],
    descricao:
      "Casa de praia com partido horizontal, deck contínuo entre interior e exterior e forro em madeira ecológica que unifica varanda e estar.",
    desafio:
      "Garantir continuidade visual entre piso interno, deck externo e forro, com resistência à exposição solar intensa.",
    solucao:
      "Especificação coordenada de Deck e Line em tonalidades complementares, com instalação técnica que respeita dilatações e drenagem.",
    galeria: [projectCasaAreia, projectDeckDetail, projectCasaMansa],
  },
  {
    slug: "casa-una",
    nome: "Casa Una",
    imagem: projectCasaUna,
    linha: "Madeira Ecológica",
    local: "Belo Horizonte, MG",
    ano: "2023",
    area: "540 m²",
    arquitetura: "Oficina UNA",
    produtos: ["AltWood Panel", "AltWood Shield"],
    descricao:
      "Residência contemporânea de volumetria pura, em que o revestimento em madeira ecológica define a identidade dos ambientes internos e da fachada principal.",
    desafio:
      "Integrar revestimento interno e externo de mesma família visual, mantendo coerência cromática e de textura.",
    solucao:
      "Combinação de Panel em ambientes internos e Shield na fachada, especificados na mesma cartela para máxima continuidade.",
    galeria: [projectCasaUna, projectResidencialUrbano, projectCasaAreia],
  },
  {
    slug: "deck-detail",
    nome: "Deck Detail",
    imagem: projectDeckDetail,
    linha: "Madeira Ecológica",
    local: "Florianópolis, SC",
    ano: "2024",
    area: "180 m²",
    arquitetura: "Studio Atlântico",
    produtos: ["AltWood Deck"],
    descricao:
      "Detalhamento de área externa com deck modular ao redor de piscina, explorando a precisão das juntas e o acabamento textural da madeira ecológica.",
    desafio:
      "Compatibilizar drenagem, fixação oculta e desenho de bordas em uma área de uso intenso e contato direto com a água.",
    solucao:
      "Sistema de clipes ocultos, ripado de borda em meia-esquadria e estrutura ventilada que prolonga a vida útil do deck.",
    galeria: [projectDeckDetail, projectCasaAreia, projectCasaMansa],
  },
];

export const getProjetoBySlug = (slug?: string) =>
  projetos.find((p) => p.slug === slug);
