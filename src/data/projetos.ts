import projectCasaMansa from "@/assets/projetos/casa-mansa-hero.jpg";
import casaMansa2 from "@/assets/projetos/casa-mansa-2.jpg";
import casaMansa3 from "@/assets/projetos/casa-mansa-3.jpg";
import casaMansa4 from "@/assets/projetos/casa-mansa-4.jpg";
import casaMansa5 from "@/assets/projetos/casa-mansa-5.jpg";
import casaMansa6 from "@/assets/projetos/casa-mansa-6.jpg";
import casaMansa7 from "@/assets/projetos/casa-mansa-7.jpg";
import projectResidencialUrbano from "@/assets/project-residencial-urbano.webp";
import casaNhHero from "@/assets/projetos/casa-nh-hero.jpg";
import casaNh2 from "@/assets/projetos/casa-nh-2.jpg";
import casaNh3 from "@/assets/projetos/casa-nh-3.jpg";
import casaNh4 from "@/assets/projetos/casa-nh-4.jpg";
import casaNh5 from "@/assets/projetos/casa-nh-5.jpg";
import casaNh6 from "@/assets/projetos/casa-nh-6.jpg";
import casaNh7 from "@/assets/projetos/casa-nh-7.jpg";
import casaNh8 from "@/assets/projetos/casa-nh-8.jpg";
import casaNh9 from "@/assets/projetos/casa-nh-9.jpg";
import casaNh10 from "@/assets/projetos/casa-nh-10.jpg";
import casaNh11 from "@/assets/projetos/casa-nh-11.jpg";
import casaNh12 from "@/assets/projetos/casa-nh-12.jpg";
import casaNh13 from "@/assets/projetos/casa-nh-13.jpg";
import casaNh14 from "@/assets/projetos/casa-nh-14.jpg";
import casaNh15 from "@/assets/projetos/casa-nh-15.jpg";
import casaNh16 from "@/assets/projetos/casa-nh-16.jpg";
import casaNh17 from "@/assets/projetos/casa-nh-17.jpg";
import casaNh18 from "@/assets/projetos/casa-nh-18.jpg";
import casaNh19 from "@/assets/projetos/casa-nh-19.jpg";
import casaNh20 from "@/assets/projetos/casa-nh-20.jpg";
import casaNh21 from "@/assets/projetos/casa-nh-21.jpg";
import casaNh22 from "@/assets/projetos/casa-nh-22.jpg";
import casaNh23 from "@/assets/projetos/casa-nh-23.jpg";
import casaNh24 from "@/assets/projetos/casa-nh-24.jpg";
import casaNh25 from "@/assets/projetos/casa-nh-25.jpg";
import casaNh26 from "@/assets/projetos/casa-nh-26.jpg";
import casaAreia1 from "@/assets/projetos/casa-areia-1.webp";
import casaAreia2 from "@/assets/projetos/casa-areia-2.webp";
import casaAreia3 from "@/assets/projetos/casa-areia-3.webp";
import casaAreia4 from "@/assets/projetos/casa-areia-4.webp";
import casaAreia5 from "@/assets/projetos/casa-areia-5.webp";
import casaAreia6 from "@/assets/projetos/casa-areia-6.webp";
import casaAreia7 from "@/assets/projetos/casa-areia-7.webp";
import casaAreia8 from "@/assets/projetos/casa-areia-8.webp";
import casaAreia9 from "@/assets/projetos/casa-areia-9.webp";
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
    nome: "Casa NH",
    imagem: casaNhHero,
    linha: "Madeira Ecológica",
    local: "São Paulo",
    ano: "2023",
    area: "—",
    arquitetura: "Atelier Daniel Corsi e Dani Hirano",
    produtos: ["Lesco Green Shield 50×25 OAK"],
    descricao:
      "Um projeto realizado por Atelier Daniel Corsi + Dani Hirano, a Casa NH revela paisagens, convidando à contemplação e à introspecção. Buscamos aqui criar uma diversidade de ambientes que proporcionem experiências sensoriais únicas, permitindo que seus habitantes desfrutem da beleza da geografia circundante e fortaleçam seus laços com o entorno.",
    desafio:
      "A luz natural se revela como um elemento onipresente, destacando uma arquitetura que valoriza toda a natureza em torno do projeto.",
    solucao:
      "Aplicação do Lesco Green Shield 50×25 OAK no envelope da residência, garantindo continuidade visual, ritmo vertical e diálogo entre madeira ecológica, concreto e paisagem.",
    galeria: [
      casaNh2,
      casaNh3,
      casaNh4,
      casaNh5,
      casaNh6,
      casaNh7,
      casaNh8,
      casaNh9,
      casaNh10,
      casaNh11,
      casaNh12,
      casaNh13,
      casaNh14,
      casaNh15,
      casaNh16,
      casaNh17,
      casaNh18,
      casaNh19,
      casaNh20,
      casaNh21,
      casaNh22,
      casaNh23,
      casaNh24,
      casaNh25,
      casaNh26,
    ],
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
