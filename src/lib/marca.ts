import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Qual marca o cabeçalho desenha: a que está no ar ou a 2.0, que ainda está em
 * prova.
 *
 * A REGRA É: NO AR CONTINUA O QUE ESTÁ NO AR.
 *
 * O site de produção não enxerga a marca nova. Ela aparece em dois lugares, os
 * dois deliberados:
 *
 *   1. nas rotas de prova listadas aqui — hoje só /lesco-new;
 *   2. em QUALQUER página, quando se abre uma vez com `?marca=2`.
 *
 * O segundo caso é o que permite percorrer o site inteiro com a marca nova sem
 * que isso valha para mais ninguém: a escolha fica em `sessionStorage`, ou
 * seja, vive dentro daquela aba e morre quando ela fecha. `?marca=1` volta ao
 * normal na hora.
 *
 * Por que não uma variável de ambiente ou um build à parte: porque a pergunta
 * que se quer responder é "como ficaria", e isso se responde abrindo o site e
 * olhando — não publicando uma segunda versão dele em algum lugar.
 */

/** Rotas que já nascem com a marca 2.0, sem precisar de chave nenhuma. */
export const ROTAS_MARCA_NOVA = ["/lesco-new"];

const CHAVE = "lesco_marca_2";

export function useMarcaNova(): boolean {
  const { pathname, search } = useLocation();
  const [ligadaNaAba, setLigadaNaAba] = useState(false);

  useEffect(() => {
    const pedido = new URLSearchParams(search).get("marca");
    try {
      if (pedido === "2") sessionStorage.setItem(CHAVE, "1");
      if (pedido === "1") sessionStorage.removeItem(CHAVE);
      setLigadaNaAba(sessionStorage.getItem(CHAVE) === "1");
    } catch {
      // Navegação privada com storage bloqueado: fica a marca de produção,
      // que é o padrão seguro.
      setLigadaNaAba(false);
    }
  }, [search]);

  // A parte por rota é decidida sem tocar no navegador, então ela já vale no
  // HTML pré-renderizado. A chave de sessão, não — ela só pode ser lida depois
  // que a página monta, e por isso entra num segundo quadro.
  return ROTAS_MARCA_NOVA.includes(pathname) || ligadaNaAba;
}
