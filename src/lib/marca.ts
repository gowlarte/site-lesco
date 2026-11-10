import { useLocation } from "react-router-dom";

/**
 * Qual marca o cabeçalho desenha, e para onde a logo leva.
 *
 * A REGRA É: NO AR CONTINUA O QUE ESTÁ NO AR.
 *
 * O site de produção não enxerga a marca 2.0. Ela existe só nas rotas de
 * prova listadas aqui — e isso é a regra inteira, não um caso particular dela.
 *
 * Houve uma versão com `?marca=2`, que ligava a marca nova em qualquer página
 * do site pela sessão da aba. Foi descartada a pedido: o que está em prova é
 * a home nova, não o site atual vestido de novo. Se um dia a pergunta voltar
 * a ser "como ficariam as outras páginas", ela se responde acrescentando
 * rotas a esta lista, uma a uma — e não com um interruptor que vale para
 * todas.
 */

/** Rotas que desenham a marca 2.0. Fora daqui, a logo é a de produção. */
export const ROTAS_MARCA_NOVA = ["/lesco-new"];

export function useMarcaNova(): boolean {
  const { pathname } = useLocation();
  return ROTAS_MARCA_NOVA.includes(pathname);
}

/**
 * Para onde a logo do cabeçalho leva.
 *
 * Dentro da prova ela volta para a PRÓPRIA prova, não para a home de
 * produção: clicar na marca 2.0 e cair na home com a marca antiga é sair do
 * que se estava avaliando sem pedir para sair. Fora da prova, "/" como sempre.
 */
export function useInicioDaMarca(): string {
  const { pathname } = useLocation();
  const prova = ROTAS_MARCA_NOVA.find((rota) => rota === pathname);
  return prova ?? "/";
}
