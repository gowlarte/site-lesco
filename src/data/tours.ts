/**
 * Os tours 360 das obras, como o portfólio os usa.
 *
 * GERADO por scripts/importar-tours.mjs — não edite à mão. Rodar
 * `npm run tours` reescreve este arquivo inteiro.
 *
 * A lista e a ficha vêm do Lesco Viewer (só o que está publicado); os
 * panoramas vêm prontos do Visogram. O cabeçalho do script explica a divisão.
 *
 * Quem amarra um tour a uma obra do portfólio é o campo `tour` em
 * src/data/projetos.ts, pelo slug daqui.
 *
 * Os nomes de ambiente passam por t() para entrarem no dicionário como
 * qualquer outro texto visível — o tour é falado em português, e o
 * lescousa.com não é.
 */

import { t } from "@/i18n/t";

export interface PortaTour {
  /** Convenção do viewer: radianos. Onde a passagem está nesta cena. */
  yaw: number;
  pitch: number;
  /** Id da cena em que essa passagem desemboca. */
  destino: string;
}

export interface CenaTour {
  id: string;
  nome: string;
  /** Enquadramento de abertura. Radianos em yaw/pitch, graus no fov vertical. */
  vista: { yaw: number; pitch: number; fov: number };
  /** Equirretangular de 4096, o mesmo que o Visogram serve. */
  src: string;
  /** Miniatura para a tira de ambientes. */
  miniatura: string;
  /** Algumas centenas de bytes de borrão, enquanto o panorama não chega. */
  borrao: string;
  portas: PortaTour[];
}

export interface Tour {
  slug: string;
  obra: string;
  /** "São Paulo, SP" — cidade e UF como o Viewer os guarda. */
  local: string;
  ano: string | null;
  escritorio: string | null;
  /** Capa reprojetada no enquadramento em que o visor abre. 16:9 e 4:5. */
  capa: string;
  capaAlta: string;
  /** A primeira é a capa: é onde o visitante chega. */
  cenas: CenaTour[];
}

export const TOURS: Tour[] = [
  {
    slug: "alpha-one",
    obra: "Alpha One",
    local: "São Paulo, SP",
    ano: "2026",
    escritorio: "Construcompany",
    capa: "/tours/alpha-one/capa.webp",
    capaAlta: "/tours/alpha-one/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Ambiente 1"),
        vista: { yaw: -0.1933848915271479, pitch: -0.014554252843180637, fov: 100 },
        src: "/tours/alpha-one/c1.webp",
        miniatura: "/tours/alpha-one/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAAAQBgCdASowABgAPu1qq0+ppiOiMBVYATAdiWMAzFgLMCSI1SSugxLVJ8qBtdhWU+Lv8pvtVann6dQA/sMEoNLActLG3vboSzwsn5iYmUKIKgDSYzfBkwxG48ix0BauBZsBEeVJWaM2JXe9k1uor/twSC2ZmaokJp7Lc9Zs4n2G+Qvsly2rydaku/0fBl1WNNVSuo38fhRy1nBMS24q2YPSV/f5Jbe0j9MdfIl+65COMyHzHDm8tU3/caH33AAA",
        portas: [],
      },
      {
        id: "c2",
        nome: t("Ambiente 2"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c2.webp",
        miniatura: "/tours/alpha-one/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAABQBgCdASowABgAPu1gp02ppaOiMAgBMB2JYwDCgCHfy7k/5Fkg3sF1mRnmW6RdECZ3gUEWtV2VHA4MgAD+wtchRIijWggjATHJTWVjHqhC/8GuKmNEvb+gDBLKENVXzz7ia4f9kVIZVYTBBOlqERiZdf3A0YKusBb1+qo4jye6Q9O/7DP9oY7JgSVXPRGbyPknqWRumAxtD/GPvzEZ3moAOIv8AcO1ntuM03p1E8KJ+GlHN2iSyqS8AAA=",
        portas: [],
      },
      {
        id: "c3",
        nome: t("Ambiente 3"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c3.webp",
        miniatura: "/tours/alpha-one/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRtIAAABXRUJQVlA4IMYAAABQBgCdASowABgAPu1oqk8ppiOiMBVaqTAdiWMAw3ALL/TatzkU1vgNjGqDmDVDv5MKJ/NR5Wv9pNMyAAD+wxz1HrdRG0T2wxTVgxI6Ozm3KOxAyiSzg1pDdQWnHcrVhejTV/VNvwA37deoFocKGyeGg4KYRqNydj1DJ7OBF7avOs7fmtLo1y+/pa+h+OM4hc1Sj9jOCD8e8GRwe93KLqVVF7HnGTNIsk6WJeEFoRAFdpbUudYGv5q9vWX4nCgtcXdLRiAAAAA=",
        portas: [],
      },
      {
        id: "c4",
        nome: t("Ambiente 4"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c4.webp",
        miniatura: "/tours/alpha-one/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRgABAABXRUJQVlA4IPQAAABQBwCdASowABgAPu1wr1CppqQiqrgKATAdiUATpntk5bE3ZGJ6cCoJC1iO+p1bLQGsoir7a2u+raLa5ShDPby6QUugAP7eWgz2bL/Ybm368olMA29L0/gAvRbBZ2gHC7FlQfAKQk7MzRx0mCu2ZjnvHO4aFGFD6UrvXDDUQjjQTPbwvrTxWQpKVgRjzq1NPeTT9I5kSee0B7WruHnc/5Xw4c9nvdEr5gv7ZzJiPtZ3RQPUd6FqpAi/NkjG/3be/0HqQV3mybjeaAK4CBp2cZdKEQluQXK7JuGlrvIOJ84P6lTeu4lAi5xpikkVsxcZenTE1wAA",
        portas: [],
      },
      {
        id: "c5",
        nome: t("Ambiente 5"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c5.webp",
        miniatura: "/tours/alpha-one/c5-min.webp",
        borrao: "data:image/webp;base64,UklGRgQBAABXRUJQVlA4IPgAAAAQBwCdASowABgAPu1mq08ppaOiMBqoATAdiUAVT6ZoQEAKJdlIPe6KOOagBjcUjswd6B748fMNACSzI7Vb08ZtAAD+3llQ0Aue4EGAIsb7aTttgiO6e9af4pIJxMcnHJVeueAhMYtMCXjE/dwdaNNExskeAoPR0uEO7m4qJuADMxh63lJvQiVrSIlP11XQYGRZ/HBUE4TILsMl/fKsLaRRk0MT0WHSMiQrTTQZgFf4bRqlV6RCcZFMUZptziZ3wXD6peRoVdJJQXHDM2n61RiNrI+OD1PhsvSxRBhVblOEsJMB0gwdSQ4x5iQq1TqSg6IVVCUxNx7AAA==",
        portas: [],
      },
      {
        id: "c6",
        nome: t("Ambiente 6"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c6.webp",
        miniatura: "/tours/alpha-one/c6-min.webp",
        borrao: "data:image/webp;base64,UklGRtYAAABXRUJQVlA4IMoAAADwBQCdASowABgAPu1sr1CppiQiqrgKATAdiUAYdYFmlgkrLTlKLe4VwmCvkwYjx4mfVzERcFoTgAD+0vzdrHKyoFyjYFErB+dBr5VFnrGTZemFZ/6ECLrh2zUaxohx39EwW02JLkyFK6bfBxB/KON8lCPuUdv/aJNAjMgYODVm7RyBkGk0su+fnZ0fpga5AkzlqzJdsT/4yqW9H77ScAh4dZx9QrrFWmmbY3/t96pGomTKJO0Zt35MQR10IhupffCqyUBLaMQ6zAAA",
        portas: [],
      },
      {
        id: "c7",
        nome: t("Ambiente 7"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c7.webp",
        miniatura: "/tours/alpha-one/c7-min.webp",
        borrao: "data:image/webp;base64,UklGRtoAAABXRUJQVlA4IM4AAAAwBgCdASowABgAPu1orE6ppiQiMBqoATAdiUAZIgLNvU1AEGkiDgpMvW8dPauYG/C01XaWq86Ar8wAAP7S4UqjqfM6o9rL6Z0UX5vq5ZnMIHdb61H4MuzYhNxm6UdAwhNrzUZeDsm/7J+UUoPe8DDtkag3JYZJwiubJYkXf/3hOyw00o6Rgzt1fAbQMwGucuaoLUe+up1N3ZhvlLIsrXPjb+gdYF4XYhm8j6FUofjd59vT3RWNgwr+iVVL3woQCoJNCIf5NtmLLlk0VSAAAA==",
        portas: [],
      },
      {
        id: "c8",
        nome: t("Ambiente 8"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c8.webp",
        miniatura: "/tours/alpha-one/c8-min.webp",
        borrao: "data:image/webp;base64,UklGRuIAAABXRUJQVlA4INYAAAAQBgCdASowABgAPu1krE6ppaQiMBqoATAdiWMAyJgWWoPikMaV+b3DzamGyYuV4oLhp8zaDDRlAQAA/tMATFNqWQwX8oT4vfFD2vPbtcHrIADXSTdxCPTpEpqHPAe4YElPIiPCTkQ9qaf31sE3cmYAMUcqL+u1/t3YlBkj8PurrK9YEIL7O/iNZshVkX2KpphTOL+KUC5wZEELucJhJJQi0p6/xUwHLFA/4z5EM69rOUzg31MI5xbTSfD/uGfLAkxOZ80inVgUEfAUbmHFP4/CUJS2AAAA",
        portas: [],
      },
      {
        id: "c9",
        nome: t("Ambiente 9"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/alpha-one/c9.webp",
        miniatura: "/tours/alpha-one/c9-min.webp",
        borrao: "data:image/webp;base64,UklGRvgAAABXRUJQVlA4IOwAAADQBgCdASowABgAPu1orlEppaQiqrgKATAdiWMAuDALNajPSNDCfmg3gsGkf64avqlwjBzEjZT6sCS5yLJXafAA/t5lSJsNqfabeABWSsJJ/62cx5KqEYAKZbJeBBHnax14UE/l8AmhxI962XJ0UE3vscIvQ7tDjYJy7bHcCbEywOekU1RcaPnrn4VbpJL1uES9ASrOgV0aJjtAZoechGxftd9HYqSHKCPhh+xkbuUJk6avWR7xN/p/hPc63m02pmgt5+f9P9TSXUIiEjwMCTO+0TGhVw0eJjjtsYYxTKWm18f4nqJ/PQci8gAAAA==",
        portas: [],
      },
    ],
  },
  {
    slug: "biotique",
    obra: "Biotique",
    local: "São Paulo, SP",
    ano: "2026",
    escritorio: "Setin",
    capa: "/tours/biotique/capa.webp",
    capaAlta: "/tours/biotique/capa-alta.webp",
    cenas: [
      {
        id: "c3",
        nome: t("Corredor Hub"),
        vista: { yaw: 0.188496, pitch: 0.02, fov: 76 },
        src: "/tours/biotique/c3.webp",
        miniatura: "/tours/biotique/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRhYBAABXRUJQVlA4IAoBAADQBgCdASowABgAPu1srlCppiQiqqgBMB2JQBOmWXkQ/VvQTO5ol9kMQU7T9ubvgPP/j9kC6NfTTrZbrJG0NsAA64pXuZU5nqAumQRjjmAwlwleIVH+ykF57QC195a9XzoduU9vXZ8BeOfZaGfpsFVKiCQLhEe2vcqSpiXoz6dyYnnRr+veeo71JGPCHENyC+Wma9jb073pa0qRHVYdk2KQZLhGu/VxRdfDMZkT2bK+InF168GHagy4C0S5mXsDwBvpupuMUzMfBpdYhh2K+GtOUifA9IirUw305vHgBSzMc0Gx1H1mj1ZCSFKaUvv+CzRuIzdBmJMr2BVNxjupQvP0/nIpqTV1ZgAAAA==",
        portas: [
        { yaw: 0.696679, pitch: -0.437137, destino: "c15" },
        ],
      },
      {
        id: "c16",
        nome: t("Hall de entrada"),
        vista: { yaw: 0.046112772230804434, pitch: 0.7762713201935924, fov: 76 },
        src: "/tours/biotique/c16.webp",
        miniatura: "/tours/biotique/c16-min.webp",
        borrao: "data:image/webp;base64,UklGRvgAAABXRUJQVlA4IOwAAAAwBwCdASowABgAPu1kqU6ppaOiMBqoATAdiUAWnQdRL+v7NayxEoXUX0qdf8ezfEyYdBaLW1cTHoi6yiiGRKX1ndgA/oum/jtjS2YCIgT6JAWlxB9MGkiCmYFefsFWB38kRJgxWU2Z+1q8FQquM/cz3QXKU4FMcn81iTlolaRnbWYnLUH7dYiL78fS5VHPOw6R/USLYAHrbVmIBKNDe3W7/AiB609F2KxuVB48K3Dk1ACaI5VlmF6PuQO64Ttz4QL+xnQUUCE/almJRJi/HgzT7O3GquQjVspXF29DyiS/+PadDKpSjhB1ZygAAA==",
        portas: [
        { yaw: -2.995966, pitch: -0.185517, destino: "c13" },
        ],
      },
      {
        id: "c1",
        nome: t("Entrada Fitness"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/biotique/c1.webp",
        miniatura: "/tours/biotique/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRuAAAABXRUJQVlA4INQAAADQBQCdASowABgAPu1wr1KppiQipWmZMB2JZQC84ENKWOk8vGHdPIhsDFE51D/UmtK6E2Y35heAANTWOGy8C5K9nesj/8/amJHcBI/20PkDe5aKaAlXq80vCtBb8IvPanvvJAzqlRNJDfnAdO3tSvcttiYizn4Rm76LV4el6mO7s2K4aGcE1dYg/8cEdwxRs4q7RMmjcZTWU081Ay38bG5x+C1DQGAgAwHSPYutmuFB6q//f3Q5j4pOsjsDLfa98qlftYjtB6cNfrDhgcJoePNxuzAAAA==",
        portas: [
        { yaw: -1.109575, pitch: -0.298680, destino: "c2" },
        ],
      },
      {
        id: "c2",
        nome: t("Corredor"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/biotique/c2.webp",
        miniatura: "/tours/biotique/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRgYBAABXRUJQVlA4IPoAAADwBgCdASowABgAPuVoqE2pJqQiNVgIASAciUAVJO6ZxwCYrF7aq/ZcBHlf76Qd91K3lVzIBxN0DVMLDdMSTMaIAP3O6Xmeyup09RpKdCsUOpis5p216/truhRQ10z5H+EturUBoK1VTabfXSKrwZ9TZaDrUaEOsRoLOCuXMzVYOOun9VRjJtmS8xhvqEy3xnHfQupw7rHW2IiBxko8uKMVZoxffab2ivRx+f33XHFM4xBi0guYYlDePY8hrhnMIjq0mslbO8v4xQt+JnxnmyNQc09fGoFyqTbb6EanwjrN5zzl8SqhpKB+e0Z4HUFdsFA+ftODMOgNM0AA",
        portas: [
        { yaw: 0.087712, pitch: -0.083722, destino: "c3" },
        ],
      },
      {
        id: "c15",
        nome: t("Entrada Elevador"),
        vista: { yaw: 4.175197744940731, pitch: -0.09120478104804282, fov: 76 },
        src: "/tours/biotique/c15.webp",
        miniatura: "/tours/biotique/c15-min.webp",
        borrao: "data:image/webp;base64,UklGRvoAAABXRUJQVlA4IO4AAAAwBwCdASowABgAPu1srlIppaQipWsxMB2JQBWGZ/X/1NZHfZY79QqJfmpqDnUk9PnTef4R6U735OzhMjUIX9kD7QAA/IpXWvfDw0eH4WRqsUG7B6Ejew2QANsS5WulFGHEFLtMt1b0nOkN+DqV7Z6PCLpMByJCYmbSeyVuEbVJOZ8sR0kIJFPzVErXKLZfn3QYBPTWDjToUr3RtCdVhd5YwnSyKCe7E1gi2nooN+bc+e8nFGwitt5sWWMnimT+v/vDWcysgXIwhqR71RiwiE8jpM9e+pzJGn3NYJKhdq78MhOTTnhRf5Mg66+ztAAA",
        portas: [
        { yaw: 2.946361, pitch: -0.682684, destino: "c2" },
        ],
      },
      {
        id: "c4",
        nome: t("Entrada Fitness principal"),
        vista: { yaw: -5.226830807837064, pitch: 0.22213635081365227, fov: 100 },
        src: "/tours/biotique/c4.webp",
        miniatura: "/tours/biotique/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRggBAABXRUJQVlA4IPwAAADQBgCdASowABgAPu1oq06ppiQiKqwBMB2JQBBfyROKu0AAMjVLQX1FidxUyZNt/S3sXEFriIDZ1M6G8U/BjlAA9wbOM8B8BruZAYqCcMZaIUL4Zay0gSl302gv8osz+6XwPiyWZxmT17AWeNzdZ9n4r5SpB38qV7uapCUf872ABILM3nVF2nevYc/kD4tg59wA8x7sEO34oOfKYqTpR8w8FlRMuaXpYc/cm5wshjUmkZO3hRtEF09+oXG4wo84QONKYbe+7Kh7FJhflWejKPjd8XFlgwxmadbwR/vzd6q1Jb5XceUgpiow98mbFIoKyBWyBJ9m2xZ8okcpAAA=",
        portas: [
        { yaw: 3.009559, pitch: -0.113062, destino: "c2" },
        { yaw: -0.132394, pitch: -0.066203, destino: "c5" },
        ],
      },
      {
        id: "c13",
        nome: t("Escada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/biotique/c13.webp",
        miniatura: "/tours/biotique/c13-min.webp",
        borrao: "data:image/webp;base64,UklGRvYAAABXRUJQVlA4IOoAAADQBgCdASowABgAPu1sr1GppaQipWsxMB2JQBdmb3/rKsZBoMsMeFPIykT4LCJBYVePBaEw3wTThKfJwKZJZaAA/dxggkas3ZJkZh368Evt60MSS4jVPbAnYHiGqFF6H8GLcRUc7zv6ArK1RsBFRtB39FZEqh2je7bIqSy51DlvblTJGx0NIfEhFI0TRJUxCY6S3b9Al5Hz8NZ8355f2PtBj+6SgFf0kVvmesIzxpaUpv7schYxEkRSRpGuTTMaEgCqT3PzZJh0RWsAxkKckb02DXARX+8t2OzJJ3KJA8Xf61wCbFCFgq6AAAA=",
        portas: [
        { yaw: -2.972202, pitch: 0.233501, destino: "c3" },
        ],
      },
      {
        id: "c5",
        nome: t("Lounge Gourmet"),
        vista: { yaw: -0.45924929516015545, pitch: -0.04277336763874372, fov: 76 },
        src: "/tours/biotique/c5.webp",
        miniatura: "/tours/biotique/c5-min.webp",
        borrao: "data:image/webp;base64,UklGRuYAAABXRUJQVlA4INoAAACQBgCdASowABgAPu1epU2ppKMiNVQMATAdiWMArAA17eF1h6jmdoXbPP0KonFa+gb13WVtHPAZ8nzZPKgAAPxaUEXr3prkptu0QLXzTnfvj9z+8B1IS+YHQK4l+aL4WyC5fANgWJm1emhQaNpuK7LVwjqlyqEKNRgvvIdQzm0G9kdhvUbNm9MswOqYfnAUUWoE1F6xPJcxc2mm5v7hVNbX9VmnaiadUMBH31inD2yxdNm5XBfyOjCbpUyWfPOjWc6qkf6LZifM18NxTqEshCo1O8LSgwn71nAAAA==",
        portas: [
        { yaw: -3.087023, pitch: -0.116962, destino: "c3" },
        { yaw: 0.862730, pitch: -0.343311, destino: "c7" },
        ],
      },
      {
        id: "c7",
        nome: t("Hall Social"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/biotique/c7.webp",
        miniatura: "/tours/biotique/c7-min.webp",
        borrao: "data:image/webp;base64,UklGRvQAAABXRUJQVlA4IOgAAABwBgCdASowABgAPu1oqlCppaOiqrgMATAdiUAXZnrQ947m6pwSKnrxQbAb1LC4PlyzVLdudIQqdkbdKAAA/d31mAt8rbUxwq54r8tKgbrcMygnUtvJYpVOxGNJyn/hMUsDGrBagJjGcCq2bvp7A67XeecDvqVmXCO9ayDIRe+jgweHL62SnEG4auV9/bbrQPkOw2FenJwEGuVwIrZcSN4myXcMS37MUtGfVBwFAnMERfkxUKPsek0b7DJagdYA41sVt8ohpmd2LvjNWc3iVlTHsFZP5TVTFji3RU41V3DJbVNcnKRrAgAA",
        portas: [
        { yaw: -3.101479, pitch: -0.163165, destino: "c8" },
        ],
      },
      {
        id: "c8",
        nome: t("Hall Social 2"),
        vista: { yaw: -3.762232086360878, pitch: -0.010840037091143753, fov: 76 },
        src: "/tours/biotique/c8.webp",
        miniatura: "/tours/biotique/c8-min.webp",
        borrao: "data:image/webp;base64,UklGRgQBAABXRUJQVlA4IPgAAAAQBwCdASowABgAPu1kr1GppKQiqrgKATAdiWIAnTOhw3zDnk0MvqiRVWIwU+v/Fd0ulR0iYVuSAkIa1c6phNdoYAD9Uu8g0SfHPhu69afGx99gDJG4m+zYnJjyO7ZU7HmPjs4/YDE4/wJt/KAcFoTmbVlYXA2vEc8PQE99GrVHWe/3vCL1d4hlH3tyUQr/LIDTpnoLI03P4gwC71wwDmOl6pl0xnuuvIofk4Uz4w4FuQzTc88zMvqrdmhysBiQSCdArQbx9bT5J4dgSQ1GrwEgFevb/OFpPDNVekdAnycFOhrN0Ssr37BN/gArTlUomBvA0GP2v0yAAA==",
        portas: [
        { yaw: 1.758555, pitch: -0.169694, destino: "c7" },
        { yaw: -1.589817, pitch: -0.148471, destino: "c9" },
        ],
      },
      {
        id: "c9",
        nome: t("Brinquedoteca"),
        vista: { yaw: -3.3359876019929016, pitch: -0.2823016816798999, fov: 76 },
        src: "/tours/biotique/c9.webp",
        miniatura: "/tours/biotique/c9-min.webp",
        borrao: "data:image/webp;base64,UklGRj4BAABXRUJQVlA4IDIBAAAwBwCdASowABgAPu1qrVCppaQiqqgBMB2JZACl5b+NGy0qahQa7vIOaV8+m/5kqtw2916HrnlSTn/1hHXrjki2FwAA/Rv84uyyu1Z943wtHEPHysfykQbwZyKVhccXtm3WjxH1SO+mQK4TwIZAsuiEsf8oyeo+rU0ZS9hirgKlGedlL1nSydXQkLqW0hgInudpjiWhJXIBcnsW0HwxvN5+GLGz/WjE8LzBujjVRhseFK6Jje6vOxEbeXtnmSHkM1i5BTsgKpTrh9DL3DXMFeBlc04VHsfTcCn7DyuvEXGkXMe55d9ArO0wlKgcDvKummg3f5iOnS1rDq0tmIDKhjK6g/SC7hEQxcc/qPfVCHGbRgMnuZp0+4iV41fsxh/y9vrRfDXmwE9KXKNt+hGGFC4AAAA=",
        portas: [
        { yaw: 1.558973, pitch: -0.142231, destino: "c8" },
        { yaw: -1.701728, pitch: -0.232045, destino: "c10" },
        ],
      },
      {
        id: "c10",
        nome: t("Corredor 3"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/biotique/c10.webp",
        miniatura: "/tours/biotique/c10-min.webp",
        borrao: "data:image/webp;base64,UklGRkIBAABXRUJQVlA4IDYBAAAwBwCdASowABgAPu1ksVEppSSiqrgKATAdiWIAnTLoRx/ahi+a2ozc9K5GYMZoCGYoKZ/MpXvTGWyVG3tKLksErZwA98xsYIutrdUEWgu+tUA8gEI2Jj4o6mTK8fb+cqQisTEWR9jV4ceGeRmWfIf8TXOXggPNstw3OBO3nqnyaWSdNkeu849GCnubVQGgyDfisZYMzG7kY7U33BTcZt2LhsoJ96qyqLSkBn2nHXXaKDmCvZ3inzAem76IBcpAnVGsnMKHfPZ41MVD7eR1UhPu5Nps+glu8qsm1nfVOoYNX90ZG1PGtLlSq9IfO7obAkqzvRBLzzY2ZY1r0vhwttdRWIKBdyRbsUb5ndj3lG2uQDbHLplzxlicXG5b6eLg5aSr19wBhqPoiRzB5CcW9RWI/s3CAAAA",
        portas: [
        { yaw: 1.694288, pitch: -0.138629, destino: "c9" },
        { yaw: -3.032282, pitch: -0.271017, destino: "c11" },
        ],
      },
      {
        id: "c11",
        nome: t("Fim"),
        vista: { yaw: 1.4388942268807523, pitch: 0.08979349968393896, fov: 76 },
        src: "/tours/biotique/c11.webp",
        miniatura: "/tours/biotique/c11-min.webp",
        borrao: "data:image/webp;base64,UklGRu4AAABXRUJQVlA4IOIAAACwBgCdASowABgAPu1qqFAppiOiqqoBMB2JQBOmafCREgARl7HteC0597aj5sUS8Knl8zJm75iTwns0kn3wAAD3zLgqmasn2Agvr/tHgV6DkahZMSZKMzQdWzJ7ZTgRB7XT4zsdRo74trUvy4v/PJhO9OBFITZ6jR+vm20OMqQvHxvDK6HA9cRjkC4P2RPU5SNPbmRZE+QYO/F/WJX8DuxGTKkiR+iGDHPiB0YjcpOO3gNlIBvGudLRv37clo3VgXINOG6YSuQCNouW4tBNbUJGt74bURTLXJMX2pUVBTf0gAAA",
        portas: [],
      },
      {
        id: "c12",
        nome: t("Ultimo corredor"),
        vista: { yaw: 3.086919445600724, pitch: 0.33032825301351726, fov: 100 },
        src: "/tours/biotique/c12.webp",
        miniatura: "/tours/biotique/c12-min.webp",
        borrao: "data:image/webp;base64,UklGRioBAABXRUJQVlA4IB4BAACwBgCdASowABgAPu1qr0+ppiSiKqoBMB2JYgCdMoR4iEjpMwoTcycj0SmxYFTiVicymjZHAguFWJi0GJ4OAAD+YWGA6dCEN2cw5+Wu3WV9h8vxfdPkEgG8WF9s9AghaCruhcu28G68yU6OwTG4GRsNVCe2z3uNjQ3a4+KKNIptpt9krrjSDioAtbzhaffEzLY/W7MFmDf70upyEZf72vSR5fIuvxzx0kG3o0d54b+Q++uNpyizcZG1V78WoEBYqnRvJ6LelxwESwuxDIt3b1oeHK1XYuGJPZ2TONQ2i2ExYhoTX2ybm7pM20GxY0O6tcHA/NkzztBp0xM36fYl4b1eE/vM2DhN4MDBf2JBnplMcPISBUhyh4ykqz//KAAA",
        portas: [
        { yaw: 1.620855, pitch: -0.243948, destino: "c10" },
        { yaw: -1.692334, pitch: -0.389598, destino: "c11" },
        ],
      },
      {
        id: "c14",
        nome: t("Sala de reunião"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/biotique/c14.webp",
        miniatura: "/tours/biotique/c14-min.webp",
        borrao: "data:image/webp;base64,UklGRjYBAABXRUJQVlA4ICoBAABQCACdASowABgAPu1opk2ppqMiMBqqqTAdiWYAnTKEgsCP8QW3+XgKdoUzPvBYbm2hVtzDbDJva6AUUwwNkhZO29/hmUyUi44ecgAA/R+DpJwpmWgZJpPxbaJeAwKfe4awY7qlq65SilB/wXWI0HclBxiqnLZqBm3OMGlCzd4//w1exnS7Lug7iMq6Igehcj9aQcP8BYMPB7IK2/AOi1l6PGlV5NAuGk8bb3sG7bUobUOJf9kHFTrnpDfx1DrHwEkN7qIb53sjMFZV/xDzsB/RyfE5u+0m5fOUziKaG4Cjs8bh2OmRu202v/jO7ySQMCm30IKIR2ir2SceyUOqYnKG8BWJRuyQW51ggku6QLKITDL8tbDBefTl+QncVfTA+uxu+UMv9zHnDAAA",
        portas: [
        { yaw: 1.697325, pitch: -0.266801, destino: "c1" },
        ],
      },
    ],
  },
  {
    slug: "jha-boutique",
    obra: "JHA Boutique",
    local: "São Paulo, SP",
    ano: "2026",
    escritorio: null,
    capa: "/tours/jha-boutique/capa.webp",
    capaAlta: "/tours/jha-boutique/capa-alta.webp",
    cenas: [
      {
        id: "c2",
        nome: t("Ambiente 2"),
        vista: { yaw: -0.27615523770356537, pitch: 0.4010706084782076, fov: 76 },
        src: "/tours/jha-boutique/c2.webp",
        miniatura: "/tours/jha-boutique/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRtQAAABXRUJQVlA4IMgAAABQBgCdASowABgAPu1kq06ppaQiMBVaqTAdiUAXYAW+V6kciuUddUuKzaoouwa+d7xKIL63FVQNETPWwAD93Vk1b16sSPVvdb52t+bUtgPZ73lP07OSJ6S2Ph0SeFsTjB275zG+kq71cc6KpX6PnFbiwcCEnHHHTftRJHvN7biQtq4R1etVkZPVeyEWTu8TPIm/XJaWxJLQU9m2R0jk1sfwJ2E1M15GiDjT63Tr6QFBwZYnER+Twfs420zSCIJ5+oNJFmU31AAAAA==",
        portas: [],
      },
      {
        id: "c1",
        nome: t("Ambiente 1"),
        vista: { yaw: -1.7559941978766949, pitch: 0.32686385949535374, fov: 76 },
        src: "/tours/jha-boutique/c1.webp",
        miniatura: "/tours/jha-boutique/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRsQAAABXRUJQVlA4ILgAAACwBQCdASowABgAPu1ork8ppiSiKqoBMB2JZQDHMAduCbB3jzOf+f43EdarQX644Nr7cJP5yzIA/RwTkQWI0Pca3m9mtMesjPAfzDAxGwB6+yHoFwrybCtUcAsrqMfUVOaRYDrwjs2LymuKXBkZ1v8DM9mreRvSNwKhiqEIGAtTtFtNQ4541FXDVgOJUVTBEbjyJcQocbNj4lkNwXgXJoz6RV9yKuinMae6yNFSYS7kMCQeYRpCGQAA",
        portas: [],
      },
    ],
  },
  {
    slug: "lavvi",
    obra: "Lavvi",
    local: "São Paulo, SP",
    ano: "2026",
    escritorio: "Lavvi",
    capa: "/tours/lavvi/capa.webp",
    capaAlta: "/tours/lavvi/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Entrada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/lavvi/c1.webp",
        miniatura: "/tours/lavvi/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRvIAAABXRUJQVlA4IOYAAADwBgCdASowABgAPu1gq02ppSQiMBqqqTAdiWQAnTMABvgWzORp4mtiMpHGJqfiwc7POwlrvizOUQOPIQiP356wAPxPGPiu5BDzjGjJftVgk9d7DyESslgs6ZJiJooo6cWTYL6Z9RHBBJTyrkLYOCWUGuKHuqwLid8AuDPMJB38Dkp6a8CXZdiU00IU/yZg/DXkq439bu6S6xr3K6zYUUMIXYNtw5FNsPgBeJGV4hWN5fsi/VsAwIPc+L90y58QYaHH/tCSXk0NPQyNAmJ+P2hpv9sSt+VsuCF0T8iSJgCiL0D8owAAAA==",
        portas: [],
      },
      {
        id: "c2",
        nome: t("Detalhe"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/lavvi/c2.webp",
        miniatura: "/tours/lavvi/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRuwAAABXRUJQVlA4IOAAAACQBgCdASowABgAPu1yrlGppyQiqrgIATAdiWMArDN7w2vcNF28TaORl2v7tWdG6eViJHlQFGoykn13RG1AAP4UHSPnVeTNqARboq3HwFHbeofLcQBpwEv4ow+ftSxubGXFHniyW/uxRwWrHiWoZZYZBLlzSMZOh9SkgkAFGFmQ1iaIp6ntrk2wABGmBourB3AGcrcjUmISrN3yn3lIM9ThBeHQiOZOSEM+TfMve5YKqzy4NGvRknPMNmdq8rHu68GrD8LLe/NT1w6vuQdRKhz2kNDC76zQCj1hy8GgxkAAAA==",
        portas: [],
      },
      {
        id: "c3",
        nome: t("Ambiente 3"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/lavvi/c3.webp",
        miniatura: "/tours/lavvi/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRroAAABXRUJQVlA4IK4AAACwBgCdASowABgAPu1eqU2ppKOiMBqqqTAdiWMAtZwWbXBAtkKiV/WzGSLKhk51rmEnG7MX/2WXcueqOUmrAAD+uJn1E79Uk/P7ifXb/bRQZlKuWW1zldAhsOYhGCyhT35jwJnrCNf5afXmjS7M2iSMXFmzERMfoBcIZFR3d4ei61WLlldbmiYPSXHYxcTxFL3ESohU+VUlTVc7EIfnpbKtStDsZa7qdZ1YYOsAAAA=",
        portas: [],
      },
      {
        id: "c4",
        nome: t("Ambiente 4"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/lavvi/c4.webp",
        miniatura: "/tours/lavvi/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRjQBAABXRUJQVlA4ICgBAABwBwCdASowABgAPu1kq08ppSOiMBqoATAdiWMAwc8w2MDmGmpurPAIoxdMiH2CFRWmwDFQ6n4WtWyfqtSR+3uU/EtBAAD+fcLeyIAqY1gO+5QWkk7wJMjw0r3Acx1T6LdGmRHTQ8Ecw+x8U79D+oqhzaze4UA3QmQG8FV5Ae+X8uPJUggGPH/HNowH5uTStRNGWC/3mrMi21uFNdH4mluVD1oRIr4cNQhCogkKbviCU65WeMIlNvp9HTaMkjXTADrtce61UMBoZDlJ2Y2l/+WODxATuHv0CeAt1e8jKYZO+Z5egY20bbwVML+XvjMgrhej4VfGjqF0VpfZlAqijUyNbTpNUSgJGrqEYXxKbMt3dInMWdDdsE6qGzFFctzxgJv0Suvo+KAAAA==",
        portas: [],
      },
    ],
  },
];

export const getTour = (slug?: string | null) =>
  slug ? TOURS.find((t) => t.slug === slug) : undefined;
