/**
 * Traz o tour 360 da Biotique do Visogram para dentro deste repo.
 *
 *   npm run biotique
 *
 * O Visogram (../VISOGRAM) é outro projeto e outro deploy. Apontar a home para
 * o domínio dele exigiria CORS na textura e amarraria esta página a um segundo
 * deploy — então os panoramas vêm para cá, e o que sai daqui é estático.
 *
 * O QUE ELE TRAZ, E POR QUE NÃO É O TOUR INTEIRO
 *
 * A Biotique tem 15 cenas, mas o grafo de portas só liga 5 delas a partir do
 * hall: c16 -> c13 -> c3 -> c15 -> c2 -> c3. As outras 10 existem apenas pela
 * tira de miniaturas do viewer em overlay, que não vem para a home. Então o
 * alcance é CALCULADO por busca em largura a partir da capa, e não escrito à
 * mão: se um dia o grafo do Visogram ganhar arestas, rodar de novo traz as
 * salas novas junto.
 *
 * RESOLUÇÃO
 *
 * Vem o equirretangular de 4096, não o de 2048. A câmera fixa o ângulo
 * VERTICAL, então um painel estreito corta a varredura em vez de reduzi-la: o
 * celular é justamente quem mais precisa de densidade (DPR 3 contra os ~88º
 * horizontais que `framing.ts` abre ali). A 2048 seriam 500 texels para 1125
 * pixels de tela — 2,25x de ampliação, e a madeira ripada do volume central
 * vira mingau. Essa conclusão é do Visogram; ver o comentário de `source()` em
 * src/tour/viewer.ts lá.
 *
 * PÔSTERES
 *
 * Dois, um por formato de painel, reprojetados no ENQUADRAMENTO EXATO em que o
 * WebGL vai abrir — mesma cena, mesmo yaw/pitch, mesmo fov que `openingFov`
 * daria naquele aspecto. Um pôster só, esticado nos dois formatos, entregaria
 * um reenquadramento visível no instante em que a textura chega.
 *
 * Eles não são enfeite de carregamento: são o que o HTML pré-renderizado
 * mostra, o que vê quem não executa JS e o que fica para quem pediu Save-Data.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

/** O Visogram vive ao lado deste repo; dá para apontar noutro lugar. */
const VISOGRAM = process.env.VISOGRAM ?? path.resolve(process.cwd(), "..", "VISOGRAM");
const SLUG = "biotique";

/** Caminho servido — `public/` some no build, e o dado precisa do público. */
const BASE_PUBLICA = `/tours/${SLUG}`;
const DESTINO_IMG = path.resolve("public/tours", SLUG);
const DESTINO_DADOS = path.resolve("src/data/biotique.ts");

/**
 * Os dois formatos de painel, e o horizonte de varredura que `framing.ts`
 * garante. Mudou a proporção do painel no componente? Muda aqui junto, ou o
 * pôster deixa de bater com o primeiro quadro do WebGL.
 */
const PAINEL = [
  { nome: "poster-larga", aspecto: 1, largura: 1000 },
  { nome: "poster-alta", aspecto: 4 / 5, largura: 820 },
];
/**
 * A capa abre num enquadramento DIFERENTE do autoral, e só aqui.
 *
 * O `vista` da cena foi composto para o viewer em overlay, que ocupa a tela
 * inteira; ali, 76º verticais dão 107º de varredura e o hall inteiro aparece.
 * Neste painel de 5/4 os mesmos 76º dão 88º, e o que sobra é um close na
 * parede ripada — material bonito, espaço nenhum. O construtor de cards do
 * Visogram chegou à mesma conclusão pelo mesmo motivo e abre os dele a 88º.
 *
 * Girado um oitavo de volta para a quina onde o envidraçado encontra o volume
 * ripado: vidro, canteiro, ripado e clarabóia no mesmo quadro. Escolhido
 * comparando seis enquadramentos lado a lado, não no olho.
 *
 * Vale para o pôster E para o WebGL — é por isso que mora aqui e não no
 * componente. Nos dois lugares, eles divergem.
 */
const ABERTURA = { yaw: 2 * Math.PI * (0.5 - 0.35), pitch: 0.18, fov: 82 };

const H_SWEEP = 88;
const FOV_MAX_TALL = 104;
const QUALIDADE = 78;

const grau = (r) => (r * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
/** Cópia fiel de framing.ts do Visogram — uma linha, e duplicá-la é mais
 *  honesto do que importar um módulo de outro projeto só por ela. */
const verticalPara = (h, aspecto) => 2 * grau(Math.atan(Math.tan(rad(h / 2)) / aspecto));
const fovDeAbertura = (fov, aspecto) =>
  Math.min(Math.max(fov, verticalPara(H_SWEEP, aspecto)), FOV_MAX_TALL);

// ---------------------------------------------------------------- leitura

const manifesto = path.join(VISOGRAM, "src/tour/scenes.json");
if (!fs.existsSync(manifesto)) {
  console.error(`Não achei o Visogram em ${VISOGRAM}.`);
  console.error("Aponte com  VISOGRAM=/caminho/para/VISOGRAM npm run biotique");
  process.exit(1);
}

const tours = JSON.parse(fs.readFileSync(manifesto, "utf8"));
const tour = tours.find((t) => t.slug === SLUG);
if (!tour) {
  console.error(`O manifesto não tem o tour "${SLUG}".`);
  process.exit(1);
}

const porId = new Map(tour.cenas.map((c) => [c.id, c]));

/** Busca em largura pelas portas, a partir da capa. */
function alcancavel(capa) {
  const vistos = new Set([capa]);
  const fila = [capa];
  const ordem = [];
  while (fila.length) {
    const id = fila.shift();
    const cena = porId.get(id);
    if (!cena) continue;
    ordem.push(cena);
    for (const h of cena.hotspots) {
      if (vistos.has(h.destino) || !porId.has(h.destino)) continue;
      vistos.add(h.destino);
      fila.push(h.destino);
    }
  }
  return ordem;
}

const cenas = alcancavel(tour.capa);
const fora = tour.cenas.length - cenas.length;
console.log(`\n${tour.obra} — ${tour.cenas.length} cenas no Visogram`);
console.log(`${cenas.length} alcançáveis a pé desde "${porId.get(tour.capa).nome}"` +
  (fora ? `, ${fora} só pela tira de miniaturas (ficam de fora)` : ""));

// ---------------------------------------------------------------- panoramas

fs.mkdirSync(DESTINO_IMG, { recursive: true });

/** Apaga o que sobrou de uma rodada anterior com outro alcance. */
const esperados = new Set([
  ...cenas.map((c) => `${c.id}.webp`),
  ...PAINEL.map((p) => `${p.nome}.webp`),
]);
for (const arquivo of fs.readdirSync(DESTINO_IMG)) {
  if (esperados.has(arquivo)) continue;
  fs.unlinkSync(path.join(DESTINO_IMG, arquivo));
  console.log(`  - ${arquivo} (sobra de outra rodada)`);
}

let bytes = 0;
console.log("");
for (const cena of cenas) {
  // `src` é o 4096; `srcSmall` é o 2048, que não vem. Ver o cabeçalho.
  const origem = path.join(VISOGRAM, "public", cena.src.replace(/^\//, ""));
  if (!fs.existsSync(origem)) {
    console.error(`  FALTA ${origem}`);
    process.exit(1);
  }
  const destino = path.join(DESTINO_IMG, `${cena.id}.webp`);
  fs.copyFileSync(origem, destino);
  const tam = fs.statSync(destino).size;
  bytes += tam;
  const portas = cena.hotspots.map((h) => porId.get(h.destino)?.nome ?? h.destino);
  console.log(
    `  ${cena.id.padEnd(4)} ${(tam / 1024).toFixed(0).padStart(4)} KB  ${cena.nome}` +
      (portas.length ? `  ->  ${portas.join(", ")}` : "  (sem saída)"),
  );
}

// ---------------------------------------------------------------- pôsteres

const { reproject } = await import(
  pathToFileURL(path.join(VISOGRAM, "tools/reproject.mjs")).href
);

const capa = porId.get(tour.capa);
const origemCapa = path.join(VISOGRAM, "public", capa.src.replace(/^\//, ""));

console.log("");
for (const { nome, aspecto, largura } of PAINEL) {
  const altura = Math.round(largura / aspecto);
  const fov = fovDeAbertura(ABERTURA.fov, aspecto);
  const bruto = await reproject({
    source: origemCapa,
    yaw: ABERTURA.yaw,
    pitch: ABERTURA.pitch,
    fov,
    width: largura,
    height: altura,
  });
  const saida = path.join(DESTINO_IMG, `${nome}.webp`);
  await sharp(bruto, { raw: { width: largura, height: altura, channels: 3 } })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toFile(saida);
  const tam = fs.statSync(saida).size;
  bytes += tam;
  console.log(
    `  ${nome.padEnd(13)} ${largura}x${altura}  fov ${fov.toFixed(1)}º  ` +
      `${(tam / 1024).toFixed(0)} KB`,
  );
}

// ---------------------------------------------------------------- dados

/** `"texto"` com as aspas, para colar no fonte. */
const aspas = (s) => JSON.stringify(s);

const linhasCenas = cenas
  .map((cena) => {
    const hotspots = cena.hotspots
      .filter((h) => porId.has(h.destino))
      .map(
        (h) =>
          `      { yaw: ${h.yaw.toFixed(6)}, pitch: ${h.pitch.toFixed(6)}, ` +
          `destino: ${aspas(h.destino)} },`,
      );
    return [
      `  {`,
      `    id: ${aspas(cena.id)},`,
      `    nome: t(${aspas(cena.nome)}),`,
      // A capa abre pelo ABERTURA acima; as outras mantêm o enquadramento
      // autoral, que é o que o Visogram compôs para cada sala.
      cena.id === tour.capa
        ? `    vista: { yaw: ${ABERTURA.yaw.toFixed(6)}, pitch: ${ABERTURA.pitch}, fov: ${ABERTURA.fov} },`
        : `    vista: { yaw: ${cena.vista.yaw}, pitch: ${cena.vista.pitch}, fov: ${cena.vista.fov} },`,
      `    src: ${aspas(`${BASE_PUBLICA}/${cena.id}.webp`)},`,
      `    borrao: ${aspas(cena.lqip)},`,
      hotspots.length
        ? `    portas: [\n${hotspots.join("\n")}\n    ],`
        : `    portas: [],`,
      `  },`,
    ].join("\n");
  })
  .join("\n");

const fonte = `/**
 * O tour 360 da Biotique, na medida em que a home usa.
 *
 * GERADO por scripts/importar-biotique.mjs a partir do Visogram — não edite à
 * mão. Rodar \`npm run biotique\` reescreve este arquivo inteiro.
 *
 * São as ${cenas.length} salas que se alcançam A PÉ desde o hall; as outras
 * ${fora} do tour completo só existem pela tira de miniaturas do viewer em
 * overlay do Visogram, que não veio para cá.
 *
 * Os nomes passam por t() para entrarem no dicionário como qualquer outro
 * texto visível — o tour é falado em português, e o lescousa.com não é.
 */

import { t } from "@/i18n/t";

export interface PortaBiotique {
  /** Convenção do viewer: radianos. Onde a porta está nesta cena. */
  yaw: number;
  pitch: number;
  /** Id da cena em que essa porta desemboca. */
  destino: string;
}

export interface CenaBiotique {
  id: string;
  nome: string;
  /** Enquadramento de abertura. Radianos em yaw/pitch, graus no fov vertical. */
  vista: { yaw: number; pitch: number; fov: number };
  /** Equirretangular de 4096 — ver o cabeçalho do script sobre a resolução. */
  src: string;
  /** Algumas centenas de bytes de borrão, enquanto o panorama não chega. */
  borrao: string;
  portas: PortaBiotique[];
}

export const OBRA = ${aspas(tour.obra)};
export const LOCAL = ${aspas(`${tour.cidade}/${tour.uf}`)};
export const ESCRITORIO = ${tour.escritorio ? aspas(tour.escritorio) : "null"};

/** O enquadramento de abertura de cada pôster acompanha PAINEL no script. */
export const POSTER_LARGA = ${aspas(`${BASE_PUBLICA}/poster-larga.webp`)};
export const POSTER_ALTA = ${aspas(`${BASE_PUBLICA}/poster-alta.webp`)};

/** A primeira é a capa: é onde o visitante chega. */
export const CENAS: CenaBiotique[] = [
${linhasCenas}
];
`;

fs.writeFileSync(DESTINO_DADOS, fonte);

console.log(`\n  src/data/biotique.ts  ${cenas.length} cenas`);
console.log(`\n${(bytes / 1024 / 1024).toFixed(2)} MB em public/tours/${SLUG}/\n`);
