import { SRCSET } from "@/assets/responsivas/mapa";

/**
 * Dá ao navegador a escolha do tamanho da foto.
 *
 * Um `<img src>` sozinho não oferece escolha nenhuma: o celular de 375px
 * baixa o mesmo arquivo de 2200px que o notebook. O mapa é gerado por
 * `scripts/responsivas.mjs` e é indexado pela URL do ORIGINAL, que é
 * justamente o que o call site já tem depois do `import` — por isso aqui
 * cabe um spread no `<img>` em vez de um componente novo.
 *
 * Quem não está no mapa não quebra: volta um objeto vazio e a imagem segue
 * servida como antes. É o que permite cobrir as fotos pesadas primeiro e as
 * outras depois, sem um passo grande.
 */

/**
 * Fotos que ocupam a janela inteira — hero da home, faixa de projetos.
 *
 * `100vw` é literalmente verdade aqui, e é de propósito: num aparelho DPR 3
 * o navegador vai pedir ~1125px e pegar a variante de 1600. Dá para cortar
 * mais trocando este valor por algo como `75vw`, que é o truque comum de
 * limitar o DPR, mas isso é trocar nitidez por bytes — decisão de quem
 * manda na marca, não deste arquivo.
 */
export const SIZES_TELA_CHEIA = "100vw";

/**
 * Faixa em marquee da home.
 *
 * Aqui a caixa tem largura FIXA por breakpoint (`h-[140px] sm:h-[180px]
 * lg:h-[220px]` com `aspect-[16/10]` dá 224, 288 e 352px), então não há
 * escada a subir com a janela — e era o pior caso do site: arquivos de 1500
 * a 1920px desenhados numa caixa de 224px.
 */
export const SIZES_GALERIA = "(min-width: 1024px) 352px, (min-width: 640px) 288px, 224px";

/** O `srcset` de uma foto, ou `undefined` se ela ainda não tem variantes. */
export function srcSetDe(src: string): string | undefined {
  return SRCSET[src];
}

/**
 * Props de `<img>` para uma foto com variantes. Uso:
 *
 *     <img src={foto} {...responsiva(foto, SIZES_TELA_CHEIA)} />
 */
export function responsiva(src: string, sizes: string) {
  const srcSet = SRCSET[src];
  return srcSet ? { srcSet, sizes } : {};
}

/**
 * Props de `<link rel="preload" as="image">` para a foto de LCP.
 *
 * Sem isto o preload e o `<img>` discordam: o `<link>` puxa o original de
 * 2200px enquanto o `<img>` escolhe uma variante pelo `srcset`, e o celular
 * baixa as DUAS. Com `imagesrcset`/`imagesizes` os dois fazem a mesma conta
 * e convergem no mesmo arquivo.
 *
 * Atributo em minúsculas pelo mesmo motivo do `prioridade()` em utils.ts:
 * esta versão do React descarta a forma camelCase em silêncio, e uma dica
 * que nunca chega ao DOM é pior do que dica nenhuma, porque parece resolvida.
 */
export function preloadResponsivo(src: string, sizes: string) {
  const srcSet = SRCSET[src];
  if (!srcSet) return {};
  return { imagesrcset: srcSet, imagesizes: sizes } as unknown as {
    imageSrcSet: string;
    imageSizes: string;
  };
}
