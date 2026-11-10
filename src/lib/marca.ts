import { useLocation } from "react-router-dom";

/**
 * Onde o site de prova mora, e qual marca cada caminho desenha.
 *
 * SÃO DOIS SITES, NÃO DUAS PÁGINAS.
 *
 * O site que está no ar vive na raiz e continua com o logotipo de hoje. Sob
 * `/lesco-new` vive o MESMO site — as mesmas páginas, os mesmos componentes —
 * com duas diferenças: a home tem o hero 2.0 e o cabeçalho desenha a marca
 * 2.0. Clicar numa linha lá dentro leva a `/lesco-new/brise-madeira-ecologica`,
 * que é a página de sempre com o logotipo novo.
 *
 * Nada disso é cópia. Quem serve as duas árvores com uma lista só de páginas é
 * `paginasDoSite()` em src/App.tsx; quem mantém a navegação dentro da prova é
 * o <Link> do site, em src/components/AppLink.tsx; e quem troca o logotipo é o
 * cabeçalho, perguntando daqui.
 *
 * Houve antes uma versão com `?marca=2`, que vestia o site de produção com a
 * marca nova pela sessão da aba. Foi descartada a pedido: a prova tem de ter
 * endereço próprio, para ser aberta, mandada por link e fechada sem deixar
 * rastro em nada.
 */

/** O caminho onde o site de prova começa. */
export const PREFIXO_PROVA = "/lesco-new";

/** Se um caminho está dentro do site de prova. A raiz dele conta. */
export function dentroDaProva(caminho: string): boolean {
  return caminho === PREFIXO_PROVA || caminho.startsWith(PREFIXO_PROVA + "/");
}

/** Se a página atual desenha a marca 2.0. */
export function useMarcaNova(): boolean {
  return dentroDaProva(useLocation().pathname);
}

/**
 * Devolve a função que mantém um destino dentro da prova.
 *
 * Fora dela, devolve o caminho intacto — então usar isto não muda nada no
 * site de produção. Dentro, acrescenta o prefixo, e é o que impede um clique
 * de jogar o leitor de volta no site antigo no meio da avaliação.
 *
 * A query e a âncora ficam de fora da comparação: quem diz se o link já está
 * dentro da prova é o caminho, não o `?utm_content` que vem colado nele.
 *
 * Mora aqui, e não dentro do <Link>, porque há dois jeitos de navegar neste
 * site: o <Link> de src/components/AppLink.tsx e o <a> cru do BotaoCTA. A
 * regra tem de ser a mesma nos dois, e uma regra em dois lugares é uma regra
 * que vai divergir.
 */
export function useCaminhoDaProva(): (caminho: string) => string {
  const dentro = dentroDaProva(useLocation().pathname);

  return (caminho: string) => {
    if (!dentro || !caminho.startsWith("/")) return caminho;
    if (dentroDaProva(caminho.split(/[?#]/)[0])) return caminho;
    return caminho === "/" ? PREFIXO_PROVA : PREFIXO_PROVA + caminho;
  };
}

/**
 * Para onde a logo do cabeçalho leva.
 *
 * Dentro da prova ela volta para a home DA PROVA, não para a de produção:
 * clicar na marca 2.0 e cair na home com a marca antiga é sair do que se
 * estava avaliando sem ter pedido para sair.
 */
export function useInicioDaMarca(): string {
  return dentroDaProva(useLocation().pathname) ? PREFIXO_PROVA : "/";
}
