/**
 * Importa as fotos cruas do Zenith Barigui para src/assets/projetos/.
 *
 * POR QUE ISTO EXISTE
 *
 * As fotos chegaram como saíram da câmera: PNG de 6192 px, 32 a 72 MB cada,
 * 432 MB no total, com nomes de arquivo de cartão ("DSC06056.png"). Nada disso
 * entra no repositório — o que fica versionado é o WebP normalizado, do
 * tamanho que o site serve. É a mesma divisão de `scripts/hero-novo-fotos.mjs`
 * e das outras pastas cruas listadas no .gitignore.
 *
 * O que não pode se perder é QUAL ARQUIVO VIROU QUAL POSIÇÃO na página, e é
 * isso que o mapa abaixo registra. Sem ele, trocar uma foto depois vira
 * adivinhação — os nomes de origem não dizem nada.
 *
 * Rodar: `node scripts/zenith-fotos.mjs`, com os originais em
 * src/assets/projetos/zenith/. Não apaga original nenhum.
 *
 * AS DUAS RÉGUAS
 *
 * 1920 no lado maior é o teto das fotos de obra que já estão no repositório
 * (as da Arena do Futuro são 1920x1280; o resto é menor). Qualidade 82 é a de
 * `scripts/responsivas.mjs`, que é onde os assets atuais foram calibrados.
 * Juntas, as duas levam os 432 MB para 3,4 MB.
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ENTRADA = "src/assets/projetos/zenith";
const SAIDA = "src/assets/projetos";

/** Lado maior, em px. Mesma régua das fotos de obra já versionadas. */
const LADO_MAX = 1920;
/** Mesma qualidade de scripts/responsivas.mjs. */
const QUALIDADE = 82;

/**
 * posição na página -> arquivo cru.
 *
 * `hero` é a capa: o cartão do portfólio e o topo da página da obra. É a única
 * foto do conjunto que mostra duas casas inteiras de ponta a ponta, com o
 * Shield ocupando a fachada toda — numa caixa de cartão, as outras viram
 * recorte de parede sem escala.
 *
 * Depois dela a galeria vai do conjunto para o detalhe: a rua e a implantação
 * primeiro, as fachadas inteiras no meio, e os dois últimos são o Brise 50x50
 * de perto, que é o produto que a foto de longe não consegue mostrar.
 */
const MAPA = {
  hero: "DSC06150.png",
  2: "DSC06165.png",
  3: "DSC06183.png",
  4: "DSC06189.png",
  5: "DSC06056.png",
  6: "DSC06070.png",
  7: "DSC06162.png",
  8: "DSC06068.png",
  9: "Brise---DSC06174.png",
  10: "DSC06180.png",
};

let antes = 0;
let depois = 0;

for (const [posicao, cru] of Object.entries(MAPA)) {
  const entrada = path.join(ENTRADA, cru);
  if (!fs.existsSync(entrada)) {
    console.error(`FALTA ${entrada}`);
    process.exit(1);
  }
  const saida = path.join(SAIDA, `zenith-${posicao}.webp`);

  const orig = await sharp(entrada, { limitInputPixels: 512e6 }).metadata();
  await sharp(entrada, { limitInputPixels: 512e6 })
    .resize({ width: LADO_MAX, height: LADO_MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toFile(saida);

  const m = await sharp(saida).metadata();
  const a = fs.statSync(entrada).size;
  const d = fs.statSync(saida).size;
  antes += a;
  depois += d;

  console.log(
    `zenith-${posicao}`.padEnd(14) +
      `${cru.padEnd(24)} ${orig.width}x${orig.height} -> ${m.width}x${m.height}  ` +
      `${(a / 1024 / 1024).toFixed(1)} MB -> ${(d / 1024).toFixed(0)} KB`,
  );
}

console.log(
  `\n${Object.keys(MAPA).length} fotos: ${(antes / 1024 / 1024).toFixed(0)} MB -> ` +
    `${(depois / 1024 / 1024).toFixed(1)} MB`,
);
