/**
 * Gera as variantes menores das imagens que o site serve grandes, e escreve o
 * mapa de `srcset` que o componente usa.
 *
 * O PROBLEMA QUE RESOLVE
 *
 * As fotos de tela cheia saem do original em 2200px de largura. Num celular
 * de 375px com DPR 3 bastam 1125px — e o navegador não tem como saber disso
 * sozinho, porque um `<img src>` sem `srcset` não oferece escolha nenhuma.
 * Medido a 375x812 antes desta mudança: a mediana das imagens da home chegava
 * 2,7x maior do que o necessário, já contando o DPR, e percorrer a home
 * custava 8,68 MB só de imagem.
 *
 * COMO FUNCIONA
 *
 * Para cada arquivo declarado em LOTES, grava `responsivas/<caminho>-<w>.webp`
 * com as larguras do lote que forem MENORES que a do original — nunca amplia
 * pixel. Depois escreve `src/assets/responsivas/mapa.ts`, que importa tudo e
 * exporta um dicionário da URL do original para a string de `srcset`. É por
 * isso que o call site muda tão pouco: ele já tem a URL do original na mão.
 *
 * As variantes são versionadas junto com os originais, como o resto de
 * `src/assets`. Custa alguns MB no repositório e economiza a maior parte do
 * tráfego de quem abre o site no celular.
 *
 * Rodar: `npm run responsivas`. É idempotente — pula o que já está no disco e
 * mais novo que a fonte, então rodar de novo depois de trocar UMA foto só
 * reencoda aquela.
 *
 * Qualidade 82 é a mesma de `scripts/optimize-images.mjs`, que foi onde os
 * assets atuais foram calibrados.
 */

import sharp from "sharp";
import { existsSync, mkdirSync, statSync, writeFileSync } from "fs";
import path from "path";

const RAIZ = "src/assets";
const SAIDA = path.join(RAIZ, "responsivas");
const QUALIDADE = 82;

/**
 * O que ganha variante, e em que larguras.
 *
 * `telaCheia` são as fotos que ocupam a janela inteira — o hero da home e a
 * faixa de projetos. Elas acompanham a largura da tela, então precisam de uma
 * escada: 640 cobre o celular comum, 1100 o celular denso e o tablet, 1600 o
 * notebook. Acima disso entra o próprio original.
 *
 * `galeria` é o oposto: a faixa em marquee desenha cada foto numa caixa FIXA
 * de 224 a 352px de largura, em qualquer tela. Não há escada a subir — 704
 * é o teto real (352 CSS x DPR 2) e 352 serve o DPR 1. Era o pior caso do
 * site: arquivos de 1500 a 1920px para caixas de 224px.
 */
const LOTES = [
  {
    nome: "telaCheia",
    larguras: [640, 1100, 1600],
    arquivos: [
      // Hero da home — uma por tipologia de aplicação.
      "hero-capa.webp",
      "hero-brise.webp",
      "hero-fachada.webp",
      "hero-forro-shield.webp",
      "hero-forro-line.webp",
      "hero-painel.webp",
      "hero-deck.webp",
      "hero-muxarabi.webp",
      "hero-home-zhuzen.webp",
      "hero-home-echotex.webp",
      "geo-hero/03.jpg",
      // Hero de /lesco-new — a versão 2.0, ainda não validada. Deck e
      // muxarabi não aparecem aqui porque reaproveitam os arquivos de cima.
      "hero-novo/capa.webp",
      "hero-novo/brise.webp",
      "hero-novo/shield.webp",
      "hero-novo/line.webp",
      "hero-novo/panel.webp",
      "hero-novo/bambu.webp",
      "hero-novo/pedra.webp",
      "hero-novo/acustica.webp",
      // Faixa de projetos da home — a capa de cada obra.
      "projetos/casa-mansa-hero.webp",
      "projetos/casa-nh-hero.webp",
      "projetos/casa-una-1.webp",
      "projetos/jha-corporate-1.webp",
      "projetos/residencial-felipe-cama-1.webp",
      "projetos/vaz-batel-1.webp",
      "projetos/arena-do-futuro-1.webp",
      "projetos/farani-221-1.webp",
    ],
  },
  {
    nome: "galeria",
    larguras: [352, 704],
    arquivos: [
      "gallery/img-01.webp",
      "gallery/img-02.webp",
      "gallery/img-03.webp",
      "gallery/img-04.webp",
      "gallery/img-05.webp",
      "gallery/img-06.webp",
      "gallery/img-07.webp",
      "gallery/img-08.webp",
      "gallery/img-09.webp",
    ],
  },
];

/** `projetos/casa-una-1.webp` -> `projetos_casa_una_1` */
function identificador(relativo, sufixo) {
  const base = relativo.replace(/\.[^.]+$/, "").replace(/[^A-Za-z0-9]+/g, "_");
  return "a_" + base + (sufixo ? "_" + sufixo : "");
}

function precisaGerar(fonte, destino) {
  if (!existsSync(destino)) return true;
  return statSync(fonte).mtimeMs > statSync(destino).mtimeMs;
}

const entradas = [];
let geradas = 0;
let puladas = 0;
let bytesVariantes = 0;
let bytesOriginais = 0;

for (const lote of LOTES) {
  for (const relativo of lote.arquivos) {
    const fonte = path.join(RAIZ, relativo);
    if (!existsSync(fonte)) {
      console.warn("  ausente, ignorado: " + relativo);
      continue;
    }

    const meta = await sharp(fonte).metadata();
    const larguraOriginal = meta.width;
    bytesOriginais += statSync(fonte).size;

    const variantes = [];
    for (const largura of lote.larguras) {
      // Nunca ampliar: variante maior que o original seria arquivo maior com
      // menos informação.
      if (largura >= larguraOriginal) continue;

      const destinoRel = relativo.replace(/\.[^.]+$/, "") + "-" + largura + ".webp";
      const destino = path.join(SAIDA, destinoRel);
      mkdirSync(path.dirname(destino), { recursive: true });

      if (precisaGerar(fonte, destino)) {
        await sharp(fonte)
          .resize({ width: largura, withoutEnlargement: true })
          .webp({ quality: QUALIDADE, alphaQuality: 100, effort: 4 })
          .toFile(destino);
        geradas++;
      } else {
        puladas++;
      }

      bytesVariantes += statSync(destino).size;
      variantes.push({ largura, destinoRel });
    }

    if (variantes.length) {
      entradas.push({ relativo, larguraOriginal, variantes });
    }
  }
}

// ----------------------------------------------------------------- o mapa.ts

const linhasImport = [];
const linhasMapa = [];

for (const entrada of entradas) {
  const idOriginal = identificador(entrada.relativo);
  linhasImport.push('import ' + idOriginal + ' from "../' + entrada.relativo + '";');

  const partes = [];
  for (const v of entrada.variantes) {
    const id = identificador(entrada.relativo, String(v.largura));
    linhasImport.push('import ' + id + ' from "./' + v.destinoRel + '";');
    partes.push("${" + id + "} " + v.largura + "w");
  }
  partes.push("${" + idOriginal + "} " + entrada.larguraOriginal + "w");

  linhasMapa.push("  [" + idOriginal + "]: `" + partes.join(", ") + "`,");
}

const conteudo = `/* GERADO por scripts/responsivas.mjs — não edite à mão.
 *
 * Roda \`npm run responsivas\` para reescrever. A chave é a URL do ORIGINAL,
 * que é o que o call site já tem na mão depois do \`import\` — por isso dar
 * \`srcset\` a uma imagem custa um atributo, e não uma refatoração.
 */

${linhasImport.join("\n")}

export const SRCSET: Record<string, string> = {
${linhasMapa.join("\n")}
};
`;

mkdirSync(SAIDA, { recursive: true });
writeFileSync(path.join(SAIDA, "mapa.ts"), conteudo, "utf8");

const mb = (b) => (b / 1048576).toFixed(2) + " MB";
console.log("");
console.log("variantes geradas: " + geradas + "   já em dia: " + puladas);
console.log("originais cobertos: " + entradas.length + "   " + mb(bytesOriginais));
console.log("peso das variantes: " + mb(bytesVariantes));
console.log("mapa: " + path.join(SAIDA, "mapa.ts"));
