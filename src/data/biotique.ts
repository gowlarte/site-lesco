/**
 * O tour 360 da Biotique, na medida em que a home usa.
 *
 * GERADO por scripts/importar-biotique.mjs a partir do Visogram — não edite à
 * mão. Rodar `npm run biotique` reescreve este arquivo inteiro.
 *
 * São as 3 salas que se alcançam A PÉ desde o hall; as outras
 * 12 do tour completo só existem pela tira de miniaturas do viewer em
 * overlay do Visogram, que não veio para cá.
 *
 * Os nomes passam por t() para entrarem no dicionário como qualquer outro
 * texto visível — o tour é falado em português, e o lescousa.com não é.
 */

import { t } from "@/i18n/t";

export interface PortaBiotique {
  /** Convenção do viewer: radianos. Onde a porta está nesta cena. */
  yaw: number;
  pitch: number;
  /** Id da cena em que essa porta desemboca. */
  destino: string;
}

export interface CenaBiotique {
  id: string;
  nome: string;
  /** Enquadramento de abertura. Radianos em yaw/pitch, graus no fov vertical. */
  vista: { yaw: number; pitch: number; fov: number };
  /** Equirretangular de 4096 — ver o cabeçalho do script sobre a resolução. */
  src: string;
  /** Algumas centenas de bytes de borrão, enquanto o panorama não chega. */
  borrao: string;
  portas: PortaBiotique[];
}

export const OBRA = "Biotique";
export const LOCAL = "São Paulo/SP";
export const ESCRITORIO = "Setin";

/** O enquadramento de abertura de cada pôster acompanha PAINEL no script. */
export const POSTER_LARGA = "/tours/biotique/poster-larga.webp";
export const POSTER_ALTA = "/tours/biotique/poster-alta.webp";

/** A primeira é a capa: é onde o visitante chega. */
export const CENAS: CenaBiotique[] = [
  {
    id: "c3",
    nome: t("Corredor Hub"),
    vista: { yaw: 0.188496, pitch: 0.02, fov: 82 },
    src: "/tours/biotique/c3.webp",
    borrao: "data:image/webp;base64,UklGRhYBAABXRUJQVlA4IAoBAADQBgCdASowABgAPu1srlCppiQiqqgBMB2JQBOmWXkQ/VvQTO5ol9kMQU7T9ubvgPP/j9kC6NfTTrZbrJG0NsAA64pXuZU5nqAumQRjjmAwlwleIVH+ykF57QC195a9XzoduU9vXZ8BeOfZaGfpsFVKiCQLhEe2vcqSpiXoz6dyYnnRr+veeo71JGPCHENyC+Wma9jb073pa0qRHVYdk2KQZLhGu/VxRdfDMZkT2bK+InF168GHagy4C0S5mXsDwBvpupuMUzMfBpdYhh2K+GtOUifA9IirUw305vHgBSzMc0Gx1H1mj1ZCSFKaUvv+CzRuIzdBmJMr2BVNxjupQvP0/nIpqTV1ZgAAAA==",
    portas: [
      { yaw: 0.696679, pitch: -0.437137, destino: "c15" },
    ],
  },
  {
    id: "c15",
    nome: t("Entrada Elevador"),
    vista: { yaw: 4.175197744940731, pitch: -0.09120478104804282, fov: 76 },
    src: "/tours/biotique/c15.webp",
    borrao: "data:image/webp;base64,UklGRvoAAABXRUJQVlA4IO4AAAAwBwCdASowABgAPu1srlIppaQipWsxMB2JQBWGZ/X/1NZHfZY79QqJfmpqDnUk9PnTef4R6U735OzhMjUIX9kD7QAA/IpXWvfDw0eH4WRqsUG7B6Ejew2QANsS5WulFGHEFLtMt1b0nOkN+DqV7Z6PCLpMByJCYmbSeyVuEbVJOZ8sR0kIJFPzVErXKLZfn3QYBPTWDjToUr3RtCdVhd5YwnSyKCe7E1gi2nooN+bc+e8nFGwitt5sWWMnimT+v/vDWcysgXIwhqR71RiwiE8jpM9e+pzJGn3NYJKhdq78MhOTTnhRf5Mg66+ztAAA",
    portas: [
      { yaw: 2.946361, pitch: -0.682684, destino: "c2" },
    ],
  },
  {
    id: "c2",
    nome: t("Corredor"),
    vista: { yaw: 0, pitch: 0, fov: 76 },
    src: "/tours/biotique/c2.webp",
    borrao: "data:image/webp;base64,UklGRgYBAABXRUJQVlA4IPoAAADwBgCdASowABgAPuVoqE2pJqQiNVgIASAciUAVJO6ZxwCYrF7aq/ZcBHlf76Qd91K3lVzIBxN0DVMLDdMSTMaIAP3O6Xmeyup09RpKdCsUOpis5p216/truhRQ10z5H+EturUBoK1VTabfXSKrwZ9TZaDrUaEOsRoLOCuXMzVYOOun9VRjJtmS8xhvqEy3xnHfQupw7rHW2IiBxko8uKMVZoxffab2ivRx+f33XHFM4xBi0guYYlDePY8hrhnMIjq0mslbO8v4xQt+JnxnmyNQc09fGoFyqTbb6EanwjrN5zzl8SqhpKB+e0Z4HUFdsFA+ftODMOgNM0AA",
    portas: [
      { yaw: 0.087712, pitch: -0.083722, destino: "c3" },
    ],
  },
];
