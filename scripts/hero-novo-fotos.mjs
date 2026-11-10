/**
 * Importa as fotos cruas do hero 2.0 para src/assets/hero-novo/.
 *
 * POR QUE ISTO EXISTE
 *
 * As fotos chegaram como o cliente as tinha: `.jfif`, PNG de 40 MB, nomes de
 * exportador ("upscalemedia-transformed", "Ativo 3-8"). Nada disso entra no
 * repositório — o que fica versionado é o WebP normalizado, do tamanho que o
 * site serve. Os originais ficam de fora de propósito: são ~57 MB que o git
 * guardaria para sempre e que ninguém precisa para buildar.
 *
 * O que não pode se perder é QUAL ARQUIVO VIROU QUAL TELA, e é isso que o
 * mapa abaixo registra. Sem ele, trocar uma foto depois vira adivinhação.
 *
 * Rodar: `node scripts/hero-novo-fotos.mjs`, com os originais em
 * src/assets/new-hero/. Depois, `npm run responsivas` para gerar a escada —
 * as oito fotos já estão declaradas no lote `telaCheia` de lá.
 *
 * Deck e muxarabi não aparecem aqui: as fotos que os mockups mostram para
 * essas duas telas são as que o hero de produção já usa, e o hero novo
 * importa `hero-deck.webp` e `hero-muxarabi.webp` direto.
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ENTRADA = "src/assets/new-hero";
const SAIDA = "src/assets/hero-novo";

/** Lado maior, em px. Mesma régua dos `hero-*.webp` de produção. */
const LADO_MAX = 2200;
/** Mesma qualidade dos heroes de hoje. */
const QUALIDADE = 85;

/** nome da tela -> arquivo cru. A ordem é a das telas no hero. */
const MAPA = {
  capa: "2cea1923d381a74755eeb776b3e8a9b5.webp",
  brise: "casa-nor.jpg",
  shield: "876ab52b-b2eb-402a-9631-a2cab9a9dc10.jpg",
  line: "5f81377e-d06f-407a-88c6-cf813300437c.jfif",
  panel: "DJI_0526.jpg",
  bambu: "bambu-sampe.png",
  pedra: "Ativo 3-8.png",
  acustica: "upscalemedia-transformed.png",
};

if (!fs.existsSync(ENTRADA)) {
  console.error("Sem " + ENTRADA + ". Os originais não são versionados — peça o lote de volta.");
  process.exit(1);
}

fs.mkdirSync(SAIDA, { recursive: true });

for (const [nome, cru] of Object.entries(MAPA)) {
  const fonte = path.join(ENTRADA, cru);
  if (!fs.existsSync(fonte)) {
    console.error("FALTANDO: " + fonte);
    process.exit(1);
  }

  const destino = path.join(SAIDA, nome + ".webp");
  await sharp(fonte, { limitInputPixels: false })
    // Nunca AMPLIA: foto que já nasce menor que 2200 fica como está, e a
    // escada responsiva simplesmente tem menos degraus.
    .resize({ width: LADO_MAX, height: LADO_MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALIDADE, effort: 5 })
    .toFile(destino);

  const meta = await sharp(destino).metadata();
  const kb = (fs.statSync(destino).size / 1024).toFixed(0);
  console.log(nome.padEnd(10) + meta.width + "x" + meta.height + "  " + kb + " KB   <- " + cru);
}
