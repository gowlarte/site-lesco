/* GERADO por scripts/produto-camadas.mjs — não edite à mão.
 *
 * Geometria da peça de madeira ecológica desmontando. `esquerda`, `topo` e
 * `largura` são % da caixa; `dx`/`dy` são % do tamanho da própria camada,
 * que é o que deixa o deslocamento escalar junto com o container usando uma
 * variável só. Ver o cabeçalho do script para a dedução dos encaixes.
 */

import img_sombra from "./camadas/sombra.webp";
import img_nucleo from "./camadas/nucleo.webp";
import img_topo_cortica from "./camadas/topo-cortica.webp";
import img_topo_madeira from "./camadas/topo-madeira.webp";
import img_topo_filme from "./camadas/topo-filme.webp";
import img_lado_cortica from "./camadas/lado-cortica.webp";
import img_lado_madeira from "./camadas/lado-madeira.webp";
import img_lado_filme from "./camadas/lado-filme.webp";

export interface CamadaProduto {
  nome: string;
  url: string;
  /** % da caixa */
  esquerda: number;
  topo: number;
  largura: number;
  /** deslocamento no fim da separação, em % do próprio tamanho */
  dx: number;
  dy: number;
  /** película de acabamento: nasce invisível e aparece ao separar */
  filme?: boolean;
}

/** Proporção da caixa de composição. */
export const CAIXA = { largura: 1238, altura: 1178 };

export const CAMADAS: CamadaProduto[] = [
  {
    nome: "sombra",
    url: img_sombra,
    esquerda: 27.6702,
    topo: 56.8761,
    largura: 68.5784,
    dx: 0,
    dy: 0,
  },
  {
    nome: "nucleo",
    url: img_nucleo,
    esquerda: 28.478,
    topo: 31.4092,
    largura: 67.0436,
    dx: 0,
    dy: 0,
  },
  {
    nome: "topo-cortica",
    url: img_topo_cortica,
    esquerda: 28.478,
    topo: 31.4092,
    largura: 66.7205,
    dx: 0,
    dy: -23.6324,
  },
  {
    nome: "topo-madeira",
    url: img_topo_madeira,
    esquerda: 28.478,
    topo: 31.4092,
    largura: 67.0436,
    dx: 0,
    dy: -50.116,
  },
  {
    nome: "topo-filme",
    url: img_topo_filme,
    esquerda: 28.478,
    topo: 31.4092,
    largura: 67.0436,
    dx: 0,
    dy: -75.174,
    filme: true,
  },
  {
    nome: "lado-cortica",
    url: img_lado_cortica,
    esquerda: 28.478,
    topo: 38.0306,
    largura: 49.5153,
    dx: -16.6698,
    dy: 7.1053,
  },
  {
    nome: "lado-madeira",
    url: img_lado_madeira,
    esquerda: 28.478,
    topo: 38.0306,
    largura: 48.6268,
    dx: -33.9487,
    dy: 14.2979,
  },
  {
    nome: "lado-filme",
    url: img_lado_filme,
    esquerda: 28.478,
    topo: 38.0306,
    largura: 48.6268,
    dx: -50.9231,
    dy: 21.4468,
    filme: true,
  },
];
