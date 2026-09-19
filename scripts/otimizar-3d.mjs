// ---------------------------------------------------------------------------
// Prepara os modelos 3D da linha Zhú para a web.
//
// POR QUE ISSO EXISTE
//
// Os .glb que saem do editor trazem a textura de bambu embutida: um PNG de
// 1254x1254 com canal alfa, 2,50 MB. Os treze arquivos trazem o MESMO PNG,
// byte a byte — 32,4 dos 38 MB da pasta são a mesma imagem repetida treze
// vezes. Servir isso significaria baixar a textura de novo a cada modelo que
// o visitante abrisse.
//
// O QUE O SCRIPT FAZ
//
//   1. Confere que todos os modelos usam a mesma textura (se algum dia chegar
//      um com textura diferente, ele PARA em vez de texturizar errado).
//   2. Grava a textura uma única vez, em WebP, sem o alfa (que era 255 em
//      todo pixel) e em 1024px, que é potência de dois e gera mipmap limpo.
//   3. Reescreve cada .glb sem a imagem embutida, apontando para o arquivo
//      externo. O navegador baixa a textura uma vez e reaproveita nos dez.
//
// A troca de PNG por WebP precisa da extensão EXT_texture_webp, declarada em
// extensionsRequired: não existe PNG de reserva no arquivo, então um leitor
// sem suporte deve falhar alto em vez de renderizar sem textura. O three.js,
// que é quem lê esses arquivos no site, suporta desde a r127.
//
// GEOMETRIA: não comprimida de propósito. O perfil mais pesado tem 2240
// triângulos; Draco economizaria uns 300 KB no total e cobraria ~100 KB de
// decodificador em toda visita, além de uma etapa a mais de build. Não paga.
//
// Uso:  node scripts/otimizar-3d.mjs
// ---------------------------------------------------------------------------
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENTRADA = path.join(raiz, "src/assets/zhu-3d");
const SAIDA = path.join(raiz, "public/3d/zhu");
const TEXTURA = "bambu.webp";

/** Lado da textura de saída. 1024 é potência de dois e sobra resolução: o
 *  grão se repete 6x ao longo dos 300 mm da amostra, ou seja 20 px por mm. */
const LADO_TEXTURA = 1024;
const QUALIDADE = 90;

/**
 * Nome do arquivo de origem → nome publicado.
 *
 * Os arquivos de origem carregam o código do catálogo no nome ("slot-wave-
 * WEP-18VC35-12"), que é o código de UM dos dois acabamentos do modelo. Como
 * a geometria é a mesma nos dois, o código no nome do arquivo confundiria.
 * O mapa fica explícito para o rename ser auditável.
 */
const RENOMEAR = {
  "slot-wave-WEP-18VC35-12": "slot-wave",
  "square-wave-WEP-15VC7-7-TG": "square-wave",
};

/**
 * Modelos que vão para public/. Os dez perfis de painel e forro, que é o que
 * /painel-bambu mostra.
 *
 * Ficam de fora os três acústicos (case-classic, case-thin, case-compact) por
 * dois motivos. A página deles tem nove modelos e só existem três: uma seção
 * 3D com um terço da família sugere que os outros seis não existem. E a malha
 * deles vem sem índice — 57 mil vértices em triângulo solto — o que dá 1,1 a
 * 1,8 MB por arquivo mesmo depois de tirar a textura. Quando os seis que
 * faltam chegarem, vale soldar os vértices antes de publicar.
 *
 * A verificação de textura compartilhada roda em TODOS os arquivos da pasta,
 * publicados ou não: é ela que garante que o WebP externo serve para todo
 * mundo.
 */
const PUBLICAR = new Set([
  "cloud-wave",
  "grand-wave",
  "infinity-wave",
  "narrow-wave",
  "oblique-wave",
  "saw-wave",
  "slot-wave",
  "square-wave",
  "square-wave-xl",
  "square-wave-xxl",
]);

const JSON_CHUNK = 0x4e4f534a;
const BIN_CHUNK = 0x004e4942;

function lerGlb(caminho) {
  const buf = fs.readFileSync(caminho);
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`${caminho}: não é um GLB`);
  let off = 12;
  let json = null;
  let bin = null;
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32LE(off);
    const tipo = buf.readUInt32LE(off + 4);
    const dados = buf.subarray(off + 8, off + 8 + len);
    if (tipo === JSON_CHUNK) json = JSON.parse(dados.toString("utf8"));
    if (tipo === BIN_CHUNK) bin = dados;
    off += 8 + len + ((4 - (len % 4)) % 4);
  }
  if (!json || !bin) throw new Error(`${caminho}: faltou chunk JSON ou BIN`);
  return { json, bin };
}

function escreverGlb(json, bin) {
  const jsonBuf = Buffer.from(JSON.stringify(json), "utf8");
  // A especificação exige chunks alinhados em 4 bytes: o JSON completa com
  // espaço (0x20) e o binário com zero.
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
  const binPad = (4 - (bin.length % 4)) % 4;
  const jsonAlinhado = Buffer.concat([jsonBuf, Buffer.alloc(jsonPad, 0x20)]);
  const binAlinhado = Buffer.concat([bin, Buffer.alloc(binPad, 0)]);
  const total = 12 + 8 + jsonAlinhado.length + 8 + binAlinhado.length;

  const saida = Buffer.alloc(total);
  saida.writeUInt32LE(0x46546c67, 0); // "glTF"
  saida.writeUInt32LE(2, 4);
  saida.writeUInt32LE(total, 8);
  saida.writeUInt32LE(jsonAlinhado.length, 12);
  saida.writeUInt32LE(JSON_CHUNK, 16);
  jsonAlinhado.copy(saida, 20);
  const binHeader = 20 + jsonAlinhado.length;
  saida.writeUInt32LE(binAlinhado.length, binHeader);
  saida.writeUInt32LE(BIN_CHUNK, binHeader + 4);
  binAlinhado.copy(saida, binHeader + 8);
  return saida;
}

/** Remove a imagem embutida e recompacta o binário sem o buraco que sobrou. */
function externalizarTextura(json, bin) {
  const imagem = json.images?.[0];
  if (imagem?.bufferView == null) throw new Error("imagem não está embutida no BIN");
  const bvImagem = imagem.bufferView;

  const png = (() => {
    const bv = json.bufferViews[bvImagem];
    const ini = bv.byteOffset || 0;
    return bin.subarray(ini, ini + bv.byteLength);
  })();

  // Reescreve os bufferViews restantes em sequência, alinhados em 4 bytes, e
  // guarda o índice novo de cada um para remapear quem aponta para eles.
  const pedacos = [];
  const indiceNovo = new Map();
  let cursor = 0;
  const bufferViewsNovos = [];
  json.bufferViews.forEach((bv, i) => {
    if (i === bvImagem) return;
    const ini = bv.byteOffset || 0;
    const dados = bin.subarray(ini, ini + bv.byteLength);
    const sobra = (4 - (cursor % 4)) % 4;
    if (sobra) {
      pedacos.push(Buffer.alloc(sobra, 0));
      cursor += sobra;
    }
    indiceNovo.set(i, bufferViewsNovos.length);
    bufferViewsNovos.push({ ...bv, byteOffset: cursor, buffer: 0 });
    pedacos.push(dados);
    cursor += dados.length;
  });

  const binNovo = Buffer.concat(pedacos);

  const remapear = (i) => {
    if (i == null) return i;
    const novo = indiceNovo.get(i);
    if (novo == null) throw new Error(`bufferView ${i} sumiu mas ainda é referenciado`);
    return novo;
  };
  for (const a of json.accessors || []) {
    if (a.bufferView != null) a.bufferView = remapear(a.bufferView);
    if (a.sparse) throw new Error("accessor sparse não é remapeado por este script");
  }
  for (const m of json.meshes || []) {
    for (const p of m.primitives || []) {
      const dracoBv = p.extensions?.KHR_draco_mesh_compression?.bufferView;
      if (dracoBv != null) p.extensions.KHR_draco_mesh_compression.bufferView = remapear(dracoBv);
    }
  }

  json.bufferViews = bufferViewsNovos;
  json.buffers = [{ byteLength: binNovo.length }];

  json.images[0] = { uri: TEXTURA, mimeType: "image/webp" };
  for (const tex of json.textures || []) {
    if (tex.source !== 0) continue;
    delete tex.source;
    tex.extensions = { ...(tex.extensions || {}), EXT_texture_webp: { source: 0 } };
  }

  const usadas = new Set(json.extensionsUsed || []);
  usadas.add("EXT_texture_webp");
  json.extensionsUsed = [...usadas];
  const exigidas = new Set(json.extensionsRequired || []);
  exigidas.add("EXT_texture_webp");
  json.extensionsRequired = [...exigidas];

  return { json, bin: binNovo, png };
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/**
 * Relê o arquivo gravado e confere o que um carregador conferiria.
 *
 * O remapeamento de bufferView é a parte do script que erra em silêncio: um
 * índice trocado não quebra o parse, só desenha a geometria errada. Mais
 * barato conferir aqui do que descobrir no navegador.
 */
function conferir(caminho, nome) {
  const { json, bin } = lerGlb(caminho);
  const erro = (m) => {
    throw new Error(`${nome}: ${m}`);
  };

  if (json.buffers?.[0]?.byteLength !== bin.length) {
    erro(`buffers[0].byteLength=${json.buffers?.[0]?.byteLength} mas o BIN tem ${bin.length}`);
  }
  if (json.images?.[0]?.uri !== TEXTURA) erro("imagem não aponta para a textura externa");
  if (json.images?.[0]?.bufferView != null) erro("ainda restou imagem embutida");
  if (!json.extensionsRequired?.includes("EXT_texture_webp")) erro("EXT_texture_webp não declarada");
  for (const tex of json.textures || []) {
    if (tex.extensions?.EXT_texture_webp?.source !== 0) erro("textura sem fonte WebP");
  }

  for (const bv of json.bufferViews) {
    if ((bv.byteOffset || 0) + bv.byteLength > bin.length) erro("bufferView aponta para fora do BIN");
  }

  const tamanhos = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };
  const componentes = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
  for (const [i, a] of json.accessors.entries()) {
    const bv = json.bufferViews[a.bufferView];
    if (!bv) erro(`accessor ${i} sem bufferView`);
    const largura = tamanhos[a.componentType] * componentes[a.type];
    const passo = bv.byteStride || largura;
    const fim = (a.byteOffset || 0) + (a.count - 1) * passo + largura;
    if (fim > bv.byteLength) erro(`accessor ${i} lê ${fim} bytes de um bufferView de ${bv.byteLength}`);
  }

  // Os índices precisam cair dentro do POSITION da mesma primitiva, senão a
  // malha sai rasgada. É o sintoma exato de um remapeamento errado.
  let triangulos = 0;
  for (const m of json.meshes || []) {
    for (const p of m.primitives || []) {
      const pos = json.accessors[p.attributes.POSITION];
      if (p.indices == null) continue;
      const idx = json.accessors[p.indices];
      triangulos += idx.count / 3;
      const bv = json.bufferViews[idx.bufferView];
      const ini = (bv.byteOffset || 0) + (idx.byteOffset || 0);
      const ler = idx.componentType === 5125 ? "readUInt32LE" : idx.componentType === 5123 ? "readUInt16LE" : "readUInt8";
      const largura = tamanhos[idx.componentType];
      let maior = 0;
      for (let k = 0; k < idx.count; k++) maior = Math.max(maior, bin[ler](ini + k * largura));
      if (maior >= pos.count) erro(`índice ${maior} fora do POSITION de ${pos.count} vértices`);
    }
  }
  return { triangulos: Math.round(triangulos) };
}

async function principal() {
  const arquivos = fs
    .readdirSync(ENTRADA)
    .filter((f) => f.toLowerCase().endsWith(".glb"))
    .sort();
  if (arquivos.length === 0) throw new Error(`nenhum .glb em ${ENTRADA}`);

  fs.mkdirSync(SAIDA, { recursive: true });

  const hashes = new Set();
  let pngCompartilhado = null;
  let entrada = 0;
  let saida = 0;
  let publicados = 0;
  const linhas = [];
  const ignorados = [];

  for (const arquivo of arquivos) {
    const base = path.basename(arquivo, ".glb");
    const nome = RENOMEAR[base] ?? base;
    const bruto = fs.readFileSync(path.join(ENTRADA, arquivo));
    entrada += bruto.length;

    const { json, bin } = lerGlb(path.join(ENTRADA, arquivo));
    const resultado = externalizarTextura(json, bin);

    const hash = crypto.createHash("sha256").update(resultado.png).digest("hex");
    hashes.add(hash);
    if (hashes.size > 1) {
      throw new Error(
        `${arquivo} usa uma textura diferente das anteriores. ` +
          `Este script assume uma textura para todos os modelos: revise antes de publicar.`,
      );
    }
    pngCompartilhado ??= resultado.png;

    if (!PUBLICAR.has(nome)) {
      ignorados.push(nome);
      continue;
    }

    const glb = escreverGlb(resultado.json, resultado.bin);
    const destino = path.join(SAIDA, `${nome}.glb`);
    fs.writeFileSync(destino, glb);
    const { triangulos } = conferir(destino, nome);
    saida += glb.length;
    publicados += 1;
    linhas.push(
      `  ${nome.padEnd(20)} ${kb(bruto.length).padStart(8)} → ${kb(glb.length).padStart(7)}` +
        `  ${String(triangulos).padStart(5)} triângulos` +
        (nome === base ? "" : `   (era ${base})`),
    );
  }

  const naoEncontrados = [...PUBLICAR].filter((n) => !linhas.some((l) => l.trim().startsWith(n + " ")));
  if (naoEncontrados.length) {
    throw new Error(`modelos da lista de publicação que não existem na pasta: ${naoEncontrados.join(", ")}`);
  }

  const webp = await sharp(pngCompartilhado)
    .removeAlpha()
    .resize(LADO_TEXTURA, LADO_TEXTURA, { kernel: "lanczos3" })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(SAIDA, TEXTURA), webp);
  saida += webp.length;

  console.log(
    `\n${arquivos.length} modelos lidos, ${publicados} publicados, 1 textura compartilhada ` +
      `(sha256 ${[...hashes][0].slice(0, 12)})\n`,
  );
  console.log(linhas.join("\n"));
  console.log(
    `  ${TEXTURA.padEnd(20)} ${kb(pngCompartilhado.length * publicados).padStart(8)} → ` +
      `${kb(webp.length).padStart(7)}  ${LADO_TEXTURA}px sem alfa, q${QUALIDADE}`,
  );
  console.log(
    `\n  os ${publicados} publicados somam ${(saida / 1048576).toFixed(2)} MB, ` +
      `contra ${((pngCompartilhado.length * publicados) / 1048576).toFixed(1)} MB só de textura repetida antes\n`,
  );
  if (ignorados.length) {
    console.log(`  fora da publicação: ${ignorados.join(", ")}  (ver PUBLICAR no topo do script)\n`);
  }
}

principal().catch((erro) => {
  console.error(`\notimizar-3d: ${erro.message}\n`);
  process.exit(1);
});
