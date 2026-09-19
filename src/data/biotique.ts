/**
 * O tour 360 da Biotique, na medida em que a home usa.
 *
 * GERADO por scripts/importar-biotique.mjs a partir do Visogram — não edite à
 * mão. Rodar `npm run biotique` reescreve este arquivo inteiro.
 *
 * São as 5 salas que se alcançam A PÉ desde o hall; as outras
 * 10 do tour completo só existem pela tira de miniaturas do viewer em
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
    id: "c16",
    nome: t("Hall de entrada"),
    vista: { yaw: 0.942478, pitch: 0.18, fov: 82 },
    src: "/tours/biotique/c16.webp",
    borrao: "data:image/webp;base64,UklGRvgAAABXRUJQVlA4IOwAAAAwBwCdASowABgAPu1kqU6ppaOiMBqoATAdiUAWnQdRL+v7NayxEoXUX0qdf8ezfEyYdBaLW1cTHoi6yiiGRKX1ndgA/oum/jtjS2YCIgT6JAWlxB9MGkiCmYFefsFWB38kRJgxWU2Z+1q8FQquM/cz3QXKU4FMcn81iTlolaRnbWYnLUH7dYiL78fS5VHPOw6R/USLYAHrbVmIBKNDe3W7/AiB609F2KxuVB48K3Dk1ACaI5VlmF6PuQO64Ttz4QL+xnQUUCE/almJRJi/HgzT7O3GquQjVspXF29DyiS/+PadDKpSjhB1ZygAAA==",
    portas: [
      { yaw: -2.995966, pitch: -0.185517, destino: "c13" },
    ],
  },
  {
    id: "c13",
    nome: t("Escada"),
    vista: { yaw: 0, pitch: 0, fov: 76 },
    src: "/tours/biotique/c13.webp",
    borrao: "data:image/webp;base64,UklGRvYAAABXRUJQVlA4IOoAAADQBgCdASowABgAPu1sr1GppaQipWsxMB2JQBdmb3/rKsZBoMsMeFPIykT4LCJBYVePBaEw3wTThKfJwKZJZaAA/dxggkas3ZJkZh368Evt60MSS4jVPbAnYHiGqFF6H8GLcRUc7zv6ArK1RsBFRtB39FZEqh2je7bIqSy51DlvblTJGx0NIfEhFI0TRJUxCY6S3b9Al5Hz8NZ8355f2PtBj+6SgFf0kVvmesIzxpaUpv7schYxEkRSRpGuTTMaEgCqT3PzZJh0RWsAxkKckb02DXARX+8t2OzJJ3KJA8Xf61wCbFCFgq6AAAA=",
    portas: [
      { yaw: -2.972202, pitch: 0.233501, destino: "c3" },
    ],
  },
  {
    id: "c3",
    nome: t("Corredor Hub"),
    vista: { yaw: 0, pitch: 0, fov: 76 },
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
