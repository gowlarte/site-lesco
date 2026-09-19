import { en } from "./dictionaries/en";

/**
 * O locale do build, lido direto de `import.meta.env`.
 *
 * Por que não usar o `LOCALE` de ./locale, que é a fonte de verdade em todo o
 * resto: aquele valor sai de uma função com try/catch e checagem de `process`,
 * para também funcionar sob tsx no prerender. O bundler não consegue resolver
 * uma função assim em tempo de compilação, então ele precisava manter o
 * dicionário inteiro no bundle, por via das dúvidas. Eram 107 KB de strings em
 * inglês viajando em toda página do lesco.com.br sem nunca serem consultadas.
 *
 * `import.meta.env.VITE_LOCALE` é substituído por um literal durante o build.
 * A condição abaixo vira `false` no build PT, o ramo do dicionário morre e o
 * arquivo de traduções sai do bundle inteiro.
 *
 * Isto é seguro porque este módulo só é alcançado por código construído pelo
 * Vite (bundle do cliente e entrada de SSR). O prerender roda em tsx, onde
 * `import.meta.env` não existe, mas ele chega em i18n/locale e i18n/routes, e
 * nunca aqui.
 */
const EH_BUILD_EN = import.meta.env.VITE_LOCALE === "en";

/**
 * Traduz uma string de origem em português.
 *
 * - Build PT: devolve a origem intacta, sem consulta a dicionário.
 * - Build EN: procura no dicionário e cai de volta na origem quando não há
 *   tradução, de modo que conteúdo não traduzido fica em português em vez de
 *   quebrar.
 *
 * O dicionário é indexado pela string PT exata (ver dictionaries/en).
 */
export function t(pt: string): string {
  if (!EH_BUILD_EN) return pt;
  return en[pt] ?? pt;
}
