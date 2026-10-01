/**
 * Traz para o portfólio TODOS os tours 360 publicados no Lesco Viewer.
 *
 *   npm run tours
 *
 * Parente do `importar-biotique.mjs`, e de propósito com outro recorte: aquele
 * pega três salas da Biotique para a seção da home; este pega o tour INTEIRO de
 * cada obra publicada, porque na página da obra o visitante veio para visitar.
 *
 * DOIS PROJETOS, DOIS PAPÉIS
 *
 * - O **Lesco Viewer** (`../LESCO-VIEWER`) é a fonte da verdade editorial: é
 *   ali que alguém sobe o tour, dá nome aos ambientes, liga as passagens,
 *   escolhe a capa e aperta publicar. Daqui saem a LISTA (só `publicado`) e a
 *   ficha de cada obra — cidade, UF, ano, escritório, tipo.
 * - O **Visogram** (`../VISOGRAM`) já preparou esses mesmos panoramas para a
 *   web: o mestre de 11904 virou equirretangular de 4096 em WebP, com miniatura
 *   e borrão embutido. Daqui saem os PIXELS.
 *
 * Reencodar os mestres de novo aqui seria meia hora de sharp para chegar no
 * mesmo arquivo, e jogaria fora as decisões de resolução que estão comentadas
 * lá (`tools/build-scenes.mjs`). Então: metadado do Viewer, imagem do Visogram,
 * e uma checagem de que os dois falam das mesmas cenas — se divergirem, o
 * script para em vez de publicar tour pela metade.
 *
 * O QUE SAI DAQUI
 *
 *   public/tours/<slug>/<id>.webp       panorama equirretangular de 4096
 *   public/tours/<slug>/<id>-min.webp   miniatura, para a tira de ambientes
 *   public/tours/<slug>/capa.webp       capa 16:9, painel deitado e hero
 *   public/tours/<slug>/capa-alta.webp  capa 4:5, painel do celular
 *   src/data/tours.ts                   os dados, gerados
 *
 * As duas capas são REPROJETADAS no enquadramento exato em que o WebGL abre —
 * mesma cena, mesmo yaw/pitch, mesmo fov que `abertura()` daria naquela
 * proporção. Uma capa só, esticada nos dois formatos, entregaria um
 * reenquadramento visível no instante em que a textura chega.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

/** Os dois vizinhos deste repo; dá para apontar noutro lugar. */
const VIEWER = process.env.LESCO_VIEWER ?? path.resolve(process.cwd(), "..", "LESCO-VIEWER");
const VISOGRAM = process.env.VISOGRAM ?? path.resolve(process.cwd(), "..", "VISOGRAM");

const DESTINO_IMG = path.resolve("public/tours");
const DESTINO_DADOS = path.resolve("src/data/tours.ts");

/**
 * Arquivos de `public/tours/<slug>/` que NÃO são deste script e não podem ser
 * varridos pela limpeza.
 *
 * A pasta da Biotique é dividida com `importar-biotique.mjs`, que põe ali os
 * dois pôsteres da seção da home. Os panoramas são os mesmos bytes nos dois
 * casos — quem os escreve é este script, que traz as 15 salas; aquele traz um
 * subconjunto de 3 e não apaga mais nada.
 */
const DE_OUTRO_DONO = { biotique: ["poster-larga.webp", "poster-alta.webp"] };

/**
 * Enquadramento de abertura por tour, quando a escolha do Viewer não é a
 * melhor para um painel. Sem entrada aqui vale a capa do próprio tour
 * (`capaCenaId`) no `vistaInicial` dela.
 *
 * A única até agora é a Biotique. A capa que o Viewer aponta, "Entrada
 * Fitness", é um corredor envidraçado com quase nenhum ripado no quadro; e o
 * hall de entrada, que o Visogram usa no lugar dela, num painel deitado vira
 * um primeiro plano de folhagem contra a parede, sem profundidade nenhuma.
 *
 * Esta é a abertura que a seção da home já usa — c3, o Corredor Hub —, e o
 * enquadramento foi escolhido lá comparando sete direções lado a lado: a
 * parede ripada com a luz de cima corre em perspectiva pela esquerda e o
 * corredor desemboca no estar iluminado. Material, profundidade e escala no
 * mesmo quadro, que é exatamente o que uma capa de obra precisa mostrar.
 *
 * Reenquadrar um tour é trabalho do Lesco Viewer: mudar a capa lá e rodar de
 * novo é o caminho normal. Isto aqui é a exceção que sobrevive a isso.
 */
const ABERTURA = {
  biotique: { cena: "c3", yaw: 0.188496, pitch: 0.02 },
};

/**
 * As duas proporções de painel, e a largura de cada capa.
 *
 * 16:9 é o painel deitado da página da obra e o que o hero recorta; 4:5 é o
 * painel do celular. Mudou a proporção no componente? Muda aqui junto, ou a
 * capa deixa de bater com o primeiro quadro do WebGL.
 */
const CAPAS = [
  { nome: "capa", aspecto: 16 / 9, largura: 1920 },
  { nome: "capa-alta", aspecto: 4 / 5, largura: 900 },
];

/** Cópia de `framing.ts` do Visogram, e dos mesmos ajustes em pano-biotique.ts. */
const VARREDURA = 88;
const FOV_TETO = 104;
const QUALIDADE = 78;

const grau = (r) => (r * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
const verticalPara = (h, aspecto) => 2 * grau(Math.atan(Math.tan(rad(h / 2)) / aspecto));
const fovDeAbertura = (fov, aspecto) =>
  Math.min(Math.max(fov, verticalPara(VARREDURA, aspecto)), FOV_TETO);

const morrer = (...linhas) => {
  for (const linha of linhas) console.error(linha);
  process.exit(1);
};

/**
 * As passagens de uma cena, no vocabulário do Lesco Viewer.
 *
 * Lá o campo é `destinoId` e não `destino`, e ele pode ser NULO: a gestão
 * permite marcar o ponto na esfera antes de dizer para onde ele leva, e três
 * das 23 marcas publicadas estão nesse estado. `tipo` também é aberto, ainda
 * que hoje só exista "navegacao". Marca sem destino vira botão que não faz
 * nada — some aqui.
 */
const passagens = (cena) =>
  (cena.hotspots ?? []).filter((h) => h.tipo === "navegacao" && h.destinoId);

// ------------------------------------------------------- leitura: o Viewer

const pastaTours = path.join(VIEWER, "data", "tours");
if (!fs.existsSync(pastaTours)) {
  morrer(
    `Não achei o Lesco Viewer em ${VIEWER}.`,
    "Aponte com  LESCO_VIEWER=/caminho/para/LESCO-VIEWER npm run tours",
  );
}

/** Todo tour publicado, na ordem em que o Viewer os lista. */
const obras = fs
  .readdirSync(pastaTours, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => path.join(pastaTours, e.name, "tour.json"))
  .filter((f) => fs.existsSync(f))
  .map((f) => JSON.parse(fs.readFileSync(f, "utf8")))
  .filter((t) => t.publicado);

if (!obras.length) morrer("Nenhum tour publicado no Viewer.");

// ----------------------------------------------------- leitura: o Visogram

const manifesto = path.join(VISOGRAM, "src/tour/scenes.json");
if (!fs.existsSync(manifesto)) {
  morrer(
    `Não achei o Visogram em ${VISOGRAM}.`,
    "Aponte com  VISOGRAM=/caminho/para/VISOGRAM npm run tours",
  );
}
const preparados = new Map(
  JSON.parse(fs.readFileSync(manifesto, "utf8")).map((t) => [t.slug, t]),
);

/** O caminho de um arquivo que o Visogram serve, no disco dele. */
const noVisogram = (url) => path.join(VISOGRAM, "public", url.replace(/^\//, ""));

const { reproject } = await import(
  pathToFileURL(path.join(VISOGRAM, "tools/reproject.mjs")).href
);

// ---------------------------------------------------------------- trabalho

/** `"texto"` com as aspas, para colar no fonte. */
const aspas = (s) => JSON.stringify(s);
const blocos = [];
let bytes = 0;

fs.mkdirSync(DESTINO_IMG, { recursive: true });

for (const obra of obras) {
  const pronto = preparados.get(obra.slug);
  if (!pronto) {
    morrer(
      `O Visogram não tem "${obra.slug}", que o Viewer publicou.`,
      "Rode  npm run scenes && npm run tours  no Visogram antes deste.",
    );
  }

  const porId = new Map(pronto.cenas.map((c) => [c.id, c]));
  const faltando = obra.cenas.filter((c) => !porId.has(c.id)).map((c) => c.id);
  if (faltando.length) {
    morrer(
      `"${obra.slug}": o Visogram não preparou ${faltando.join(", ")}.`,
      "Os dois projetos estão fora de sincronia — rode  npm run scenes  no Visogram.",
    );
  }

  // A capa vem primeiro no array: é onde `criarVisor` abre o tour.
  const escolha = ABERTURA[obra.slug] ?? {};
  const idCapa = escolha.cena ?? obra.capaCenaId ?? obra.cenas[0]?.id;
  const capa = obra.cenas.find((c) => c.id === idCapa) ?? obra.cenas[0];
  if (!capa) morrer(`"${obra.slug}" não tem cena nenhuma.`);
  const cenas = [capa, ...obra.cenas.filter((c) => c.id !== capa.id)];

  /** O enquadramento de abertura da capa — o da escolha, senão o do Viewer. */
  const vistaCapa = {
    yaw: escolha.yaw ?? capa.vistaInicial.yaw,
    pitch: escolha.pitch ?? capa.vistaInicial.pitch,
    fov: capa.vistaInicial.fov,
  };

  const pasta = path.join(DESTINO_IMG, obra.slug);
  fs.mkdirSync(pasta, { recursive: true });

  console.log(`\n${obra.obra} — ${cenas.length} ambientes, capa em "${capa.nome}"`);

  /** Apaga o que sobrou de uma rodada anterior com outro conjunto de cenas. */
  const esperados = new Set([
    ...cenas.flatMap((c) => [`${c.id}.webp`, `${c.id}-min.webp`]),
    ...CAPAS.map((c) => `${c.nome}.webp`),
    ...(DE_OUTRO_DONO[obra.slug] ?? []),
  ]);
  for (const arquivo of fs.readdirSync(pasta)) {
    if (esperados.has(arquivo)) continue;
    fs.unlinkSync(path.join(pasta, arquivo));
    console.log(`  - ${arquivo} (sobra de outra rodada)`);
  }

  // ------------------------------------------------------------ panoramas

  for (const cena of cenas) {
    const preparada = porId.get(cena.id);
    for (const [url, sufixo] of [
      [preparada.src, ""],
      [preparada.thumb, "-min"],
    ]) {
      const origem = noVisogram(url);
      if (!fs.existsSync(origem)) morrer(`  FALTA ${origem}`);
      const destino = path.join(pasta, `${cena.id}${sufixo}.webp`);
      fs.copyFileSync(origem, destino);
      bytes += fs.statSync(destino).size;
    }
    const saidas = passagens(cena).map((h) => h.destinoId);
    const portas = saidas.length ? `  ->  ${saidas.join(", ")}` : "";
    console.log(`  ${cena.id.padEnd(4)} ${cena.nome}${portas}`);
  }

  // ---------------------------------------------------------------- capas

  const origemCapa = noVisogram(porId.get(capa.id).src);
  for (const { nome, aspecto, largura } of CAPAS) {
    const altura = Math.round(largura / aspecto);
    const fov = fovDeAbertura(vistaCapa.fov, aspecto);
    const bruto = await reproject({
      source: origemCapa,
      yaw: vistaCapa.yaw,
      pitch: vistaCapa.pitch,
      fov,
      width: largura,
      height: altura,
    });
    const saida = path.join(pasta, `${nome}.webp`);
    await sharp(bruto, { raw: { width: largura, height: altura, channels: 3 } })
      .webp({ quality: QUALIDADE, effort: 6 })
      .toFile(saida);
    const tam = fs.statSync(saida).size;
    bytes += tam;
    console.log(
      `  ${nome.padEnd(10)} ${largura}x${altura}  fov ${fov.toFixed(1)}º  ${(tam / 1024).toFixed(0)} KB`,
    );
  }

  // ----------------------------------------------------------------- dado

  const linhasCenas = cenas
    .map((cena) => {
      const preparada = porId.get(cena.id);
      const portas = passagens(cena)
        .filter((h) => cenas.some((c) => c.id === h.destinoId))
        .map(
          (h) =>
            `        { yaw: ${h.yaw.toFixed(6)}, pitch: ${h.pitch.toFixed(6)}, ` +
            `destino: ${aspas(h.destinoId)} },`,
        );
      const vista =
        cena.id === capa.id
          ? vistaCapa
          : {
              yaw: cena.vistaInicial.yaw,
              pitch: cena.vistaInicial.pitch,
              fov: cena.vistaInicial.fov,
            };
      return [
        `      {`,
        `        id: ${aspas(cena.id)},`,
        `        nome: t(${aspas(cena.nome.trim())}),`,
        `        vista: { yaw: ${vista.yaw}, pitch: ${vista.pitch}, fov: ${vista.fov} },`,
        `        src: ${aspas(`/tours/${obra.slug}/${cena.id}.webp`)},`,
        `        miniatura: ${aspas(`/tours/${obra.slug}/${cena.id}-min.webp`)},`,
        `        borrao: ${aspas(preparada.lqip)},`,
        portas.length ? `        portas: [\n${portas.join("\n")}\n        ],` : `        portas: [],`,
        `      },`,
      ].join("\n");
    })
    .join("\n");

  blocos.push(
    [
      `  {`,
      `    slug: ${aspas(obra.slug)},`,
      `    obra: ${aspas(obra.obra)},`,
      `    local: ${aspas([obra.cidade, obra.uf].filter(Boolean).join(", "))},`,
      `    ano: ${obra.ano ? aspas(String(obra.ano)) : "null"},`,
      `    escritorio: ${obra.escritorio ? aspas(obra.escritorio) : "null"},`,
      `    capa: ${aspas(`/tours/${obra.slug}/capa.webp`)},`,
      `    capaAlta: ${aspas(`/tours/${obra.slug}/capa-alta.webp`)},`,
      `    cenas: [`,
      linhasCenas,
      `    ],`,
      `  },`,
    ].join("\n"),
  );
}

/** Pastas de tours que saíram do ar no Viewer. */
for (const entrada of fs.readdirSync(DESTINO_IMG, { withFileTypes: true })) {
  if (!entrada.isDirectory()) continue;
  if (obras.some((o) => o.slug === entrada.name)) continue;
  fs.rmSync(path.join(DESTINO_IMG, entrada.name), { recursive: true });
  console.log(`\n- ${entrada.name}/ (não está mais publicado no Viewer)`);
}

// ------------------------------------------------------------------ fonte

const fonte = `/**
 * Os tours 360 das obras, como o portfólio os usa.
 *
 * GERADO por scripts/importar-tours.mjs — não edite à mão. Rodar
 * \`npm run tours\` reescreve este arquivo inteiro.
 *
 * A lista e a ficha vêm do Lesco Viewer (só o que está publicado); os
 * panoramas vêm prontos do Visogram. O cabeçalho do script explica a divisão.
 *
 * Quem amarra um tour a uma obra do portfólio é o campo \`tour\` em
 * src/data/projetos.ts, pelo slug daqui.
 *
 * Os nomes de ambiente passam por t() para entrarem no dicionário como
 * qualquer outro texto visível — o tour é falado em português, e o
 * lescousa.com não é.
 */

import { t } from "@/i18n/t";

export interface PortaTour {
  /** Convenção do viewer: radianos. Onde a passagem está nesta cena. */
  yaw: number;
  pitch: number;
  /** Id da cena em que essa passagem desemboca. */
  destino: string;
}

export interface CenaTour {
  id: string;
  nome: string;
  /** Enquadramento de abertura. Radianos em yaw/pitch, graus no fov vertical. */
  vista: { yaw: number; pitch: number; fov: number };
  /** Equirretangular de 4096, o mesmo que o Visogram serve. */
  src: string;
  /** Miniatura para a tira de ambientes. */
  miniatura: string;
  /** Algumas centenas de bytes de borrão, enquanto o panorama não chega. */
  borrao: string;
  portas: PortaTour[];
}

export interface Tour {
  slug: string;
  obra: string;
  /** "São Paulo, SP" — cidade e UF como o Viewer os guarda. */
  local: string;
  ano: string | null;
  escritorio: string | null;
  /** Capa reprojetada no enquadramento em que o visor abre. 16:9 e 4:5. */
  capa: string;
  capaAlta: string;
  /** A primeira é a capa: é onde o visitante chega. */
  cenas: CenaTour[];
}

export const TOURS: Tour[] = [
${blocos.join("\n")}
];

export const getTour = (slug?: string | null) =>
  slug ? TOURS.find((t) => t.slug === slug) : undefined;
`;

fs.writeFileSync(DESTINO_DADOS, fonte);

const ambientes = obras.reduce((a, o) => a + o.cenas.length, 0);
console.log(
  `\n${obras.length} tours, ${ambientes} ambientes, ${(bytes / 1024 / 1024).toFixed(1)} MB` +
    `\n${path.relative(process.cwd(), DESTINO_DADOS)} reescrito.\n`,
);
