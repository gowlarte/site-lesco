import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * `true` quando a página já saiu do hero de tela cheia — e sempre `true` em
 * página que não tem hero.
 *
 * Quem usa: o fundo do cabeçalho e o botão do WhatsApp, que só entram depois
 * que o hero passa.
 *
 * O ponto de virada não é óbvio, porque o hero é um palco fixo: ele fica
 * colado no topo enquanto as telas trocam e só então sobe. Os dois instantes
 * naturais falham, cada um para um lado:
 *
 *   - quando o palco DESCOLA — chega junto com a última tela, então tudo
 *     acenderia na chegada dela, cedo demais;
 *   - quando o palco SOME por completo — tarde demais: no meio da subida o
 *     título da última tela desfila por baixo do topo da janela e cruza a
 *     logo.
 *
 * O gatilho é o próprio texto do hero: vira quando o título alcança a base do
 * cabeçalho, o último quadro antes de ele estorvar. Sobra cerca de meia tela
 * de rolagem com a última tela ainda limpa.
 */

/** Base do cabeçalho quando não há um para medir: topo 10 + altura 80. */
const BASE_PADRAO = 90;

export function useSaiuDoHero(): boolean {
  const [saiu, setSaiu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Medido uma vez por página e a cada resize: o alvo é o título mais alto
    // de todas as telas, para que nenhuma passe por baixo de um cabeçalho
    // ainda transparente, seja qual for o número de linhas dela. Guardar o
    // alvo evita varrer a árvore a cada quadro de scroll.
    let alvo: HTMLElement | null = null;
    let base = BASE_PADRAO;
    let temHero = false;

    const recalcular = () => {
      const titulos = [...document.querySelectorAll<HTMLElement>("[data-hero-titulo]")];
      temHero = titulos.length > 0;
      alvo = titulos.reduce<HTMLElement | null>(
        (maior, el) => (!maior || el.offsetHeight > maior.offsetHeight ? el : maior),
        null,
      );
      const cabecalho = document.querySelector("header");
      base = cabecalho ? cabecalho.getBoundingClientRect().bottom : BASE_PADRAO;
    };

    const sincronizar = () => {
      if (!temHero || !alvo) {
        setSaiu(true);
        return;
      }
      setSaiu(alvo.getBoundingClientRect().top <= base);
    };

    const aoRedimensionar = () => {
      recalcular();
      sincronizar();
    };

    // Uma leitura na montagem: um F5 no meio da página já começa passado.
    aoRedimensionar();
    window.addEventListener("scroll", sincronizar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      window.removeEventListener("scroll", sincronizar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [pathname]);

  return saiu;
}
