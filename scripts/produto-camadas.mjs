/**
 * Prepara as camadas da peça de madeira ecológica e escreve a geometria da
 * montagem.
 *
 * DE ONDE VEM
 *
 * O cliente entregou os 8 PNGs do render — o núcleo, a placa do topo e a
 * lateral em três acabamentos cada (cortiça, madeira, filme) e a sombra. Eles
 * substituem o GIF de 3,35 MB que era baixado inteiro e decodificado quadro a
 * quadro em JS. Com as peças soltas a trajetória passa a ser nossa: o
 * navegador compõe 8 imagens com `transform`, e a animação deixa de ser um
 * arquivo fechado.
 *
 * A GEOMETRIA NÃO É CHUTE
 *
 * Os PNGs vêm aparados no conteúdo, sem informação de posição, mas as caixas
 * delatam o encaixe — é projeção isométrica do mesmo render:
 *
 *   núcleo        830x567
 *   placa do topo 830x431   <- mesma largura: é a face superior do núcleo
 *   lateral       602x489
 *
 * Com a face superior em 431 de altura, sobram 567-431 = 136 de queda das
 * faces laterais. Montando o paralelogramo do topo com A(0,78) B(228,0)
 * C(830,353) D(602,431), a face frontal-esquerda ocupa de y=78 a y=78+136+353
 * = 567, ou seja 489 de altura — exatamente a altura da lateral. Daí os dois
 * offsets de montagem serem (0,0) e (0,78), e não aproximações.
 *
 * COMO A EXPLOSÃO É DESCRITA
 *
 * Cada camada afasta na NORMAL da sua face: as do topo sobem na vertical da
 * tela; as da lateral saem na direção da aresta curta (228,-78) invertida.
 * O deslocamento sai daqui em PORCENTAGEM DO PRÓPRIO TAMANHO da camada, que é
 * o que permite ao componente animar tudo com uma variável só em CSS e ainda
 * assim escalar com o container — ver ProdutoExplodido.tsx.
 *
 * Rodar: `npm run produto-camadas`, passando a pasta dos PNGs:
 *   npm run produto-camadas -- caminho/para/os/pngs
 */

import sharp from "sharp";
import { existsSync, mkdirSync, statSync, writeFileSync } from "fs";
import path from "path";

const ORIGEM = process.argv[2];
const SAIDA = "src/assets/madeira-ecologica/camadas";

if (!ORIGEM || !existsSync(ORIGEM)) {
  console.error("Uso: npm run produto-camadas -- <pasta com 1.png..8.png>");
  process.exit(1);
}

/** Offsets de montagem, relativos à caixa do núcleo. Ver o cabeçalho. */
const TOPO = { x: 0, y: 0 };
const LADO = { x: 0, y: 78 };
/** A sombra é desenhada no plano do chão, não encosta na peça. */
const SOMBRA = { x: -10, y: 300 };

/** Normal da face lateral em tela, da aresta curta (228,-78). */
const COMP = Math.hypot(228, 78);
const NX = -228 / COMP;
const NY = 78 / COMP;

/** Afastamento de cada degrau da pilha, em px do render. */
const PASSO = 108;

/**
 * A ordem é a de desenho, de trás para a frente.
 *
 * A pilha do TOPO vem antes da LATERAL porque no render a face frontal está
 * mais perto da câmera: é ela que esconde a borda de cortiça do topo com a
 * peça montada, e é ela que passa à frente do núcleo quando tudo se separa.
 *
 * `filme` é a película de acabamento. Ela nasce invisível e só aparece com a
 * separação: montada ela não acrescenta nada além de um brilho lavado, e
 * separada é a única forma de mostrar que a camada existe. O GIF não tinha
 * como fazer essa distinção.
 */
const PECAS = [
  { arq: "8.png", nome: "sombra", base: SOMBRA, passos: 0 },
  { arq: "7.png", nome: "nucleo", base: { x: 0, y: 0 }, passos: 0 },
  { arq: "6.png", nome: "topo-cortica", base: TOPO, passos: 1, eixo: "topo" },
  { arq: "5.png", nome: "topo-madeira", base: TOPO, passos: 2, eixo: "topo" },
  { arq: "4.png", nome: "topo-filme", base: TOPO, passos: 3, eixo: "topo", filme: true },
  { arq: "3.png", nome: "lado-cortica", base: LADO, passos: 1, eixo: "lado" },
  { arq: "2.png", nome: "lado-madeira", base: LADO, passos: 2, eixo: "lado" },
  { arq: "1.png", nome: "lado-filme", base: LADO, passos: 3, eixo: "lado", filme: true },
];

mkdirSync(SAIDA, { recursive: true });

// ------------------------------------------------- medir, converter, montar

const medidas = [];
let bytesAntes = 0;
let bytesDepois = 0;

for (const peca of PECAS) {
  const fonte = path.join(ORIGEM, peca.arq);
  const destino = path.join(SAIDA, peca.nome + ".webp");
  const meta = await sharp(fonte).metadata();

  // `alphaQuality` cheio: o recorte das peças é o que faz a montagem fechar,
  // e borda de alfa comprimida apareceria como franja no encontro das camadas.
  await sharp(fonte).webp({ quality: 86, alphaQuality: 100, effort: 5 }).toFile(destino);

  bytesAntes += statSync(fonte).size;
  bytesDepois += statSync(destino).size;

  const dx = peca.eixo === "lado" ? NX * PASSO * peca.passos : 0;
  const dy =
    peca.eixo === "lado" ? NY * PASSO * peca.passos : -PASSO * (peca.passos ?? 0);

  medidas.push({ ...peca, largura: meta.width, altura: meta.height, dx, dy });
}

/**
 * Respiro em volta, em px do render.
 *
 * Sem ele a caixa é o bounding box exato da separação e a ponta do núcleo
 * encosta na borda direita — num celular de 375px isso lê como corte, não
 * como enquadramento.
 */
const MARGEM = 46;

// A caixa precisa comportar a peça montada E tudo que sai dela.
let minX = 0, minY = 0, maxX = 0, maxY = 0;
for (const m of medidas) {
  for (const p of [0, 1]) {
    minX = Math.min(minX, m.base.x + m.dx * p);
    minY = Math.min(minY, m.base.y + m.dy * p);
    maxX = Math.max(maxX, m.base.x + m.dx * p + m.largura);
    maxY = Math.max(maxY, m.base.y + m.dy * p + m.altura);
  }
}
minX -= MARGEM;
minY -= MARGEM;
maxX += MARGEM;
maxY += MARGEM;
const CAIXA_L = Math.ceil(maxX - minX);
const CAIXA_A = Math.ceil(maxY - minY);

const pct = (n) => Math.round(n * 10000) / 10000;

const linhasImport = [];
const linhasCamada = [];
for (const m of medidas) {
  const id = "img_" + m.nome.replace(/-/g, "_");
  linhasImport.push(`import ${id} from "./camadas/${m.nome}.webp";`);
  linhasCamada.push(
    "  {\n" +
      `    nome: ${JSON.stringify(m.nome)},\n` +
      `    url: ${id},\n` +
      `    esquerda: ${pct(((m.base.x - minX) / CAIXA_L) * 100)},\n` +
      `    topo: ${pct(((m.base.y - minY) / CAIXA_A) * 100)},\n` +
      `    largura: ${pct((m.largura / CAIXA_L) * 100)},\n` +
      // deslocamento em % do PRÓPRIO tamanho — ver o cabeçalho
      `    dx: ${pct((m.dx / m.largura) * 100)},\n` +
      `    dy: ${pct((m.dy / m.altura) * 100)},\n` +
      (m.filme ? "    filme: true,\n" : "") +
      "  },",
  );
}

const conteudo = `/* GERADO por scripts/produto-camadas.mjs — não edite à mão.
 *
 * Geometria da peça de madeira ecológica desmontando. \`esquerda\`, \`topo\` e
 * \`largura\` são % da caixa; \`dx\`/\`dy\` são % do tamanho da própria camada,
 * que é o que deixa o deslocamento escalar junto com o container usando uma
 * variável só. Ver o cabeçalho do script para a dedução dos encaixes.
 */

${linhasImport.join("\n")}

export interface CamadaProduto {
  nome: string;
  url: string;
  /** % da caixa */
  esquerda: number;
  topo: number;
  largura: number;
  /** deslocamento no fim da separação, em % do próprio tamanho */
  dx: number;
  dy: number;
  /** película de acabamento: nasce invisível e aparece ao separar */
  filme?: boolean;
}

/** Proporção da caixa de composição. */
export const CAIXA = { largura: ${CAIXA_L}, altura: ${CAIXA_A} };

export const CAMADAS: CamadaProduto[] = [
${linhasCamada.join("\n")}
];
`;

writeFileSync("src/assets/madeira-ecologica/camadas.ts", conteudo, "utf8");

const kb = (b) => Math.round(b / 1024) + " KB";
console.log("");
console.log("camadas  : " + medidas.length);
console.log("png      : " + kb(bytesAntes));
console.log("webp     : " + kb(bytesDepois));
console.log("caixa    : " + CAIXA_L + "x" + CAIXA_A);
console.log("geometria: src/assets/madeira-ecologica/camadas.ts");
