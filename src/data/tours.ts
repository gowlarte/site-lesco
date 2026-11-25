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
    slug: "artesano",
    obra: "ARTESANO",
    local: "Londrina, PR",
    ano: "2026",
    escritorio: "ESTÚDIO 41 ARQUITETURA",
    capa: "/tours/artesano/capa.webp",
    capaAlta: "/tours/artesano/capa-alta.webp",
    cenas: [
      {
        id: "c19",
        nome: t("Detalhe fachada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c19.webp",
        miniatura: "/tours/artesano/c19-min.webp",
        borrao: "data:image/webp;base64,UklGRg4BAABXRUJQVlA4IAIBAAAwBwCdASowABgAPu1qrVCppiQipWzJMB2JQBfPctfqt5hgMDD6C+0ltIp5M1ALlADugAR2BXo7W/apH46WTcqD4AAA4Dfx+vweUpg8eYsBuBmoHgWdRqp+pG5mKYeMrqgjqdZtbtSq9eDQ2YWefWat9H3CvA+dkN6fHAMKZP7gJXRF8yOMJmkGn+wvZybFiH38GpSHWoDiPPEPD662CvGU6qb3xaxZDNdb/AFp6zS0N7Y0y/EXdko+dClwV7vtg8/734MittW6Fs2wuOG1DPtvKmY6c4QQEbrbxNLRJ6K87JZCXdn90yiGFIkuwFYZBmgZVSMn81ylyDM0rSvevZgAAAA=",
        portas: [
        { yaw: 2.702993, pitch: -0.297136, destino: "c16" },
        { yaw: 1.600514, pitch: -0.079727, destino: "c18" },
        ],
      },
      {
        id: "c16",
        nome: t("Fachada recepção"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c16.webp",
        miniatura: "/tours/artesano/c16-min.webp",
        borrao: "data:image/webp;base64,UklGRvYAAABXRUJQVlA4IOoAAACwBQCdASowABgAPuFcpE2opSOiMA1REBwJYgDE2F1tgF+s2eGj+a6m4QVl8CUwsweE8sw/tYAA/vYo0c+3cVXw+YiCatIudAv0VFv6bAb/f8pKxNiNdWvCfjrU8qBBhhO//JbX+K4stOo6ziiWxn/D0lFN1wUg1JSAXYBh7I04/NYOkoMAIN23il5E+RMVTPwKcLxqTT/g1b5golCDsSxPDBIQwopZfPK7ZHJUNvljdItFWsSvheVotTXVbYRoupfda2jCTBQllMQjefvyzSBAP9QQx/zqUiLBwqvyENZjvCVUQboQy5mAAAA=",
        portas: [
        { yaw: -0.946301, pitch: -0.128400, destino: "c19" },
        { yaw: 0.753223, pitch: -0.085760, destino: "c18" },
        ],
      },
      {
        id: "c18",
        nome: t("Detalhe fachada 2"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c18.webp",
        miniatura: "/tours/artesano/c18-min.webp",
        borrao: "data:image/webp;base64,UklGRuwAAABXRUJQVlA4IOAAAACwBgCdASowABgAPu1osFKppSSiqrgIATAdiWIArCFXAxrlYIm+mCa8w3DVYyVJLgIP2nZpY9n5fa1jYsVXAADyp+N97PdywBO4cd4rle/3M9gm1bstjXax3COHh/n5+7XvxqwPcq4EkSEz0ctDQRPeSC6CVF29JtsOowTsAb7K0onnhmRhRfsEABMJTsGV7FH7EKZk2WRHEX81I2XLyd5oiD1362GF9uK1nzw5RTUYs3bgXGQlmtSdFN/N8czgETtTPyoRO+6LXcEXyYdt5J2bXeTf81cwpk+bvZo95b0AAA==",
        portas: [
        { yaw: -1.860257, pitch: -0.084701, destino: "c19" },
        { yaw: -2.342425, pitch: -0.146785, destino: "c16" },
        { yaw: 1.660239, pitch: -0.047801, destino: "c1" },
        ],
      },
      {
        id: "c1",
        nome: t("Fachada Lazer"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c1.webp",
        miniatura: "/tours/artesano/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAABwBQCdASowABgAPuVcpk2pJSOiOrM4ASAciUAZiwibNuvIJuXfeQK23RWQXG4yZ3Dp2wAAAP7tOUpMhZQvuiZPjjBICMR50+df4LcG/EVmT1R+XIUDwqgarkme2uiifoH30rq1/pM2Rc7FHr5MY0HOjj0UqApB/Cnx9V1g/do7s3f0n/qb97YT2Gys4Y5clQzAX+QLoYM3Z6T8zLYx8XXeAA+hcQTvuOd6G0XFJba9rsibsLRNntBWkAA=",
        portas: [
        { yaw: -2.421005, pitch: -0.255965, destino: "c16" },
        ],
      },
      {
        id: "c3",
        nome: t("Portaria Lazer"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c3.webp",
        miniatura: "/tours/artesano/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRuYAAABXRUJQVlA4INoAAABwBgCdASowABgAPu1srlCppiQiqqgBMB2JQBmJbXAmilFWWbmEZ3hwyLJGdiJSq3DYHeQOFUYN8hVsxAAA/uLw2ivMJBTPY5Ox5o/2ryOl49ZNVWct4TH/Hja57Kcn9DBI9XBhLnqy795TrgftkRjaycb+mHpGMtLXc6sSTRKDRoAKtqvpzpiHCNo1PO9SqjJ9kh6yNTmQ/g+rVlUITuagIowCMB4r/9NuOn0Zgph5RSgMxoB1ZDhaE7qdRp/g8gTUVBsCD2EOS+cBqw6pWn3QojfrQZGKlgAAAA==",
        portas: [
        { yaw: -2.229135, pitch: -0.347908, destino: "c1" },
        { yaw: 2.458358, pitch: -0.426655, destino: "c4" },
        ],
      },
      {
        id: "c2",
        nome: t("Lateral da entrada"),
        vista: { yaw: 6.4489101671756766, pitch: -0.17403457440063186, fov: 76 },
        src: "/tours/artesano/c2.webp",
        miniatura: "/tours/artesano/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRuYAAABXRUJQVlA4INoAAABwBgCdASowABgAPu1mq1AppSOiqrgMATAdiUAZ0qDoIB/jOjRiZ8JBkNYjZWXtJK/QI3ZFg7Fab+rnUAAA/t5jIWHpg5tAhrR7MzVKuxPOj+B96fLJV/1We5OHVud3cXh0DVHLV5wOoFZyqmhQdktCD29/Vh8lhzS/z7w+ASJbq9wGeN9mVc5Uvpx0ymDbkY5872Mn5ySn0jzxVKhl6sV2pdxfRoS6tbJFy3Go4OHGoNdANWXx6Ze9exxuv4GBkJHV+ALCSYRp9xuEQYNs+yR+guxZT0PNMk1gAA==",
        portas: [
        { yaw: -1.425460, pitch: -0.166414, destino: "c1" },
        ],
      },
      {
        id: "c4",
        nome: t("HUB lazer"),
        vista: { yaw: -5.558867749680002, pitch: 0.04889059229430702, fov: 76 },
        src: "/tours/artesano/c4.webp",
        miniatura: "/tours/artesano/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRtQAAABXRUJQVlA4IMgAAAAQBgCdASowABgAPt1co02opSMiOrZoARAbiWMAxzBQ3urc34G0mz2457FQpH3/yEvFQmPkN+DBAAAA/upwN4x5ZqXU+GiUHkqJ9zuOiZBrButwb8z5JZbwE6JGamg5n2dJcZIKnXCDZ3FKfz7jmbZyYtZmTeQnnt0eKWUYtecp8RNPmoZ0jcwiO9SAZbqwsC/GI9dePCJgbNdIeR5OK9ba2iQHCRF7OqDwMH76jO2dIapfZJgtn0SJ5ZyczezUGS7A9lQboAAAAA==",
        portas: [
        { yaw: 2.846004, pitch: -0.212757, destino: "c6" },
        { yaw: 1.215284, pitch: -0.121119, destino: "c5" },
        ],
      },
      {
        id: "c5",
        nome: t("HUB lazer 2"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c5.webp",
        miniatura: "/tours/artesano/c5-min.webp",
        borrao: "data:image/webp;base64,UklGRgABAABXRUJQVlA4IPQAAAAQBwCdASowABgAPu1wtFKppiUipWmZMB2JYgCBuhfdjXnEjex6gfAET1fpDIsTDMkwYRQuc1YzgL2uTAfbBFtWUAD+85+/BkujAyRJShqBxqNHVBVMbt49IOg6R52L0A0QI7IwtaNCs4SarkSMYG6OKE2sZQIMty3mUpSzjsIT0QRZYQlvZE2Pit1RfzXQG13nULwt6uMiMYj6KCEhD80cmAIQobHIak/gRWHYWX3+3DvVVRFra8CcEQy5KXhWdnA7dadUSP2F9gYptPGcRunHYNZQS72okwC1St5DMD6/4KjHmIXUOgldwnGYWQvUFz8adwAA",
        portas: [
        { yaw: -1.257212, pitch: -0.145190, destino: "c4" },
        { yaw: -2.664215, pitch: -0.027470, destino: "c6" },
        ],
      },
      {
        id: "c6",
        nome: t("Acesso brinquedoteca"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c6.webp",
        miniatura: "/tours/artesano/c6-min.webp",
        borrao: "data:image/webp;base64,UklGRuoAAABXRUJQVlA4IN4AAACQBgCdASowABgAPu1ysVOppqSipWgBMB2JQADgZZjV4PvTrAuNEff4JDU76wiDLacxC/mW1C3HBqYaacyAAP7xzpcDDtgjoksjCjGrm7gtpemkQoTU69aB94REwsmL/1+3V+VXloh8gJjpz1ap85cmZDv+EpApqI60P7yw0evaSYpSK09opqFk2d380CjbZVefdRdntJk/OOOwtBNkFBlhvRHQ6cgzLF1cNCOCCfbRazBg8qGl8Ez/NNdaBtKVTnGBWFW5UVlKRs7DmVTdvPKsIC0K1bNkov7CSlhAAAA=",
        portas: [
        { yaw: -1.625106, pitch: -0.142878, destino: "c4" },
        { yaw: 0.879911, pitch: 0.106129, destino: "c7" },
        ],
      },
      {
        id: "c7",
        nome: t("Bar / Lounge"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c7.webp",
        miniatura: "/tours/artesano/c7-min.webp",
        borrao: "data:image/webp;base64,UklGRvAAAABXRUJQVlA4IOQAAAAQBwCdASowABgAPu1gqU8ppSOiMBqoATAdiWMAwCgWU5E4NgPFNtSl2inRndKusr0BJujl5V9/yQQfEQkOKSbJgAD+QTgc304fD97U9nqulclSmHfl6OmotkIOKlaiUuwjfTOukzMFbSa4HQq4gZot+IbpJ6GgB9/I3g1hAoRgxw/BuscBMO2ryNPW5/Wt1cVZgi1CYu9mv1JBHLtKZPuX40Y/aOkRdND8fJ/XgkPiHTGm7JxN1QJsni05mJLuikFSleDzHNr9CzfHwBwwTf+36+LdynYFRMg8stdDsieO+/2EAAA=",
        portas: [
        { yaw: -0.205688, pitch: -0.117653, destino: "c8" },
        ],
      },
      {
        id: "c8",
        nome: t("Copa"),
        vista: { yaw: -3.4257506649582026, pitch: 0.012264065260945506, fov: 100 },
        src: "/tours/artesano/c8.webp",
        miniatura: "/tours/artesano/c8-min.webp",
        borrao: "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAABwBgCdASowABgAPuVgok2pJaMiMA1RIByJYwAAW+shJeLS1LlzOMed2eEKivfdRXRsyb93JInQ2p4YJIAA/ui/2L1SfJi4ht2a0AEqjh370WDnI4P0HSvzr8J/pOwGQSJQfP2+MT9v5WqnOGOZ3paHP1A+FEn/P8x0Mzk85Qv/WJM3x7HwhaGrj5PA6qHItB76EAZgOF9Y4PGvFdX+rX5TFjPjipq4hhbI0KaYh2e+dBMB13ypwhnMfTn0AAAA",
        portas: [
        { yaw: -1.927472, pitch: -0.268336, destino: "c7" },
        { yaw: 1.502451, pitch: -0.374953, destino: "c10" },
        ],
      },
      {
        id: "c9",
        nome: t("Acesso banheiros"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c9.webp",
        miniatura: "/tours/artesano/c9-min.webp",
        borrao: "data:image/webp;base64,UklGRu4AAABXRUJQVlA4IOIAAACQBgCdASowABgAPu1kqE2ppaOiMAgBMB2JYwC/sCHEwCCjOMM7e9PCKMthOuZx/irejxizrpelR4w4GpoAAP7Y4zfTRBWdti2B2vCt4mrI0LAZFVO8Dnq9pX1OTmB2BPuIQDW3KhQUM+3p/LuN8OX8QIdFvEEluPj94gHFLF4NTwwBsZVWnalnLBRYVH7BigRm0Tzvgnr5ofD40Bh0NNo3gbW3UHBblgCfmVtNcKUtgZu9vHYl6a3xGtqx1VWv8dXir03j1RTjx/VEnOIsorqFK3Ech0n1EnPeBjSsD/TQAAAA",
        portas: [
        { yaw: 0.886413, pitch: -0.128485, destino: "c8" },
        { yaw: 1.098733, pitch: -0.127395, destino: "c7" },
        { yaw: -0.338515, pitch: 0.021766, destino: "c10" },
        ],
      },
      {
        id: "c10",
        nome: t("Entrada corredor banheiros"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c10.webp",
        miniatura: "/tours/artesano/c10-min.webp",
        borrao: "data:image/webp;base64,UklGRugAAABXRUJQVlA4INwAAAAwBgCdASowABgAPu1qr1GppaQipWsxMB2JQBYhsGAgIhy8IthbCOWkfOkumcduJyGSctJbVTVP3kNAAP67q3MVfrVbxJ1Ls0yPZCrgGJImYBxPS2tGqQbbAw2HuIZFVmeFq04M0o3O5PIjNuaJ/KcFNHrxmsV6Lx3htvcUsNXHAMyXhjqyblxB/nBKyai7z8YpoFqvxOVjL0e0EN2uAucYdqD5e1/QRdkoEXFgb6rdrqS/HZZ3wpzaHX4HDy5R5rN2f2K/7r+DF2wTJVGSQznoqPvISJ/N6D3PAAAA",
        portas: [
        { yaw: 1.625880, pitch: -0.123596, destino: "c9" },
        { yaw: 0.030552, pitch: -0.358724, destino: "c14" },
        ],
      },
      {
        id: "c14",
        nome: t("Corredor banheiros"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c14.webp",
        miniatura: "/tours/artesano/c14-min.webp",
        borrao: "data:image/webp;base64,UklGRgoBAABXRUJQVlA4IP4AAACwBgCdASowABgAPu1cp04ppKMiMBqqqTAdiWQAnTO+Qj2q6GkeNeWVuKYiBRpduUqqLVyM2DteXtK75i7P8AD+vDXX+lqsHkeu1HMgd+ctZOr3N8/44WL5m3EkdPUv/WoXDwDOCTmd0PqWtxk5L91aQZfMBJ+5rr7aOYb+6YHW5+bKLRAxxxgKkY8rvVEIY859iiieSdvfg7W/aa82s192Tg4kRBwUBYS6Z/CEGtVoohC5dXcF4k466F+c7NJcwfFwaGZ+EvM4yeRdLr7e9sRKbQd9XpEcl8GcMgq4olEVekM1OPwNhRSsBUGhHLrb8zC5Yo3kY7Z82jhRiDsAAA==",
        portas: [
        { yaw: 3.054793, pitch: -0.752740, destino: "c15" },
        ],
      },
      {
        id: "c15",
        nome: t("HUB Banheiros"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/artesano/c15.webp",
        miniatura: "/tours/artesano/c15-min.webp",
        borrao: "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAACwBQCdASowABgAPu1gqk2ppaQiMBVdUTAdiUAWHYXLl1nJeSvprENSaKTOA3XXLRJPQewVAgAA/nCmWH6xq/UdRz4SENCstB/KA2KZOyHK1QjVal0WcLoj7ZT3GCp9DpWldIsmA2tWaMWtH6QsS9U9DPZD3BOpVgMobX+cHC+4bx9kv4qVYyc/aLCFQ7OlgegL5IyPy3l7rEqyi4gAzWvJaGsLV5dH3pV+ohWIEAyRAZpOdAA=",
        portas: [
        { yaw: -0.209500, pitch: -0.558770, destino: "c14" },
        ],
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
    slug: "casa-campo-largo",
    obra: "Casa Campo Largo",
    local: "Campo Largo, PR",
    ano: "2026",
    escritorio: "ARQUITETARE",
    capa: "/tours/casa-campo-largo/capa.webp",
    capaAlta: "/tours/casa-campo-largo/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Ambiente 1"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/casa-campo-largo/c1.webp",
        miniatura: "/tours/casa-campo-largo/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRioBAABXRUJQVlA4IB4BAACQBwCdASowABgAPuFapk2opSOiNVgMARAcCWQAyLkIyf4L1XOztJ767F173Yfsu888HBRONJH+Re4wFTiXgsQqYul54MAA/vT8A3fSMk8ZSr2zfmb9U62mQ1emYUv4uZb+7XZ4MsYz47FjBJI1GbG7oV6vMQndqzxLWq/X0+rAMJIPQjz+amczl94UIedWIu0O3xCPfzmFgne6CzjmHopU6iNF5y6OdDF0NU9jd43jWdq9rCoaqgOnNuDdxPv9cC7Bhx/5ql1+QNtnOsywiKIdLZpYvRMeTLypIAzZWwXdWCMo+1gj2wrJYtppGP1bb2hR0rrenbnSMg4mh65irLkztGYhMT+pVOhXzRGVcBccmzj6c6wPXNWlBIy7SEAA",
        portas: [],
      },
      {
        id: "c8",
        nome: t("Frente"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/casa-campo-largo/c8.webp",
        miniatura: "/tours/casa-campo-largo/c8-min.webp",
        borrao: "data:image/webp;base64,UklGRvQAAABXRUJQVlA4IOgAAADwBgCdASowABgAPuVkpk2pJiOiMBqtUSAciWIAwQ+iJwFU0JRBBT9DIvbHKJxEb5y0AVoHsIMrw0xwDq9IpjwwAP7qbRixsRn2Y6FedfqVJlgextPD1SHFFb/2ejwbH224dHuDl4q1MtyA7uivDMgnJLS9dKMqrXFCai+iZOpq6Ri/8oauzwIBjUP5/s5+Ayyna0sfcGNti5H3U8fPyZqXL+xq1NK6hPipShFjv34NNDH8z8NodghJw/4zJHxTok7yeVaLmr+ATO6PZZWtKZydAXqmLID76LW44WnseDjd6roAL+AJswAA",
        portas: [],
      },
      {
        id: "c5",
        nome: t("Principal"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/casa-campo-largo/c5.webp",
        miniatura: "/tours/casa-campo-largo/c5-min.webp",
        borrao: "data:image/webp;base64,UklGRu4AAABXRUJQVlA4IOIAAADwBgCdASowABgAPu1eqE2ppKOiNVgIATAdiUAWnQLNlOrL2eyU1kS9lXCznHzGyWTbxvibIQg+6RoD4d2OBv8AAP7Yo6XVks5tcq5xBO0WHZvN158o7lic2U82lU0MS/5WeuGNPleQgkmg6M7n88YgVPhK7i8CntkzDEBfZTdfhxvYtzsyYDFhpNbv3LluwojZtY1k2CrtasitfV5hMFghu6m6Cmhu0sWod1oI/SBlm2hrafNTSXNAkDWU/HgNJ0VcFga3HDOqG9UtUdXSluyTE+NAbuAZKsy+9kn06z/uHJgA",
        portas: [],
      },
      {
        id: "c3",
        nome: t("Garagem"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/casa-campo-largo/c3.webp",
        miniatura: "/tours/casa-campo-largo/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAABQBgCdASowABgAPuVgpE2pJaOiMA1RIByJYwDCgCG65xcxltkiXcH8Vk8PTanqtfVXSrYFhOUuT7x/AAD9EaWPVdT4C7vYnCJwpyo585qzJ4vVFK8gHSFJHMz4u1G43xb7bc0KCLvIr3qvt0d1gSEAalVOGPN9LCZ914CsxrVo3Qw9ZF3a8QItLSG71Z5NAAA=",
        portas: [],
      },
      {
        id: "c4",
        nome: t("Acesso interno"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/casa-campo-largo/c4.webp",
        miniatura: "/tours/casa-campo-largo/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRgwBAABXRUJQVlA4IAABAADQBgCdASowABgAPu1mqk2ppaQiMAgBMB2JYwDL14qGliPns858MGlgxe99EVH/Cx82NdtXlXaTyv0prN1aAAAA/tJpJ8wtbhEX8gJeDCVzUa7bLtKMbq3LT9WTAjXeRWat3UIYCjJTjBvx7lZSHjSq1rE53i+N0QNzQrAYwaWmpXLAip84ELqy/5Gbc3e8nV5qtubVVW0jB+ZZs4LpbPUBuWa3Oezb2U3a/DhoSq8Qu2PRVDXy1LljKj10CWSdMpSsSxpEDxLH/aVC/aEnubnacXF843LB5bA8At/zh+vB4BB3Mhto4+hY7UYNcxCMPInlzIAOE90DFzCgBQTZ3AAA",
        portas: [],
      },
      {
        id: "c7",
        nome: t("Sacada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/casa-campo-largo/c7.webp",
        miniatura: "/tours/casa-campo-largo/c7-min.webp",
        borrao: "data:image/webp;base64,UklGRkQBAABXRUJQVlA4IDgBAAAQBwCdASowABgAPtFUoU2oJKMiOrzIAQAaCWQAwzcv2HxaUGaDFQTbsPu7NwmIMIxIMlUZbrPyNy5ygxu3V2WYAAD8EstOwH9xXV/nCZaqc+RNoLSvbByMXJfErIsDUjjyq3tQ2N6/r9SegAiAiffVaTOTgBUkPZ6wEGYfS/1xkkgk2RTVlJSCDC7EZFSSaqubQZUzfKrcfPQTK0aAEcHpbGtHFEvUeLrLqlmL/WIcCCmIMz2wCk/YUZou8DJN/CpZ+y5dDz9Vkw12Etb9MqOKBK5sT3qn651Y963TC5ywo2d12sOla/WGwlvSy9kXyKSVl3oihvon4MEmoo1RmAOcm25ZvE73JjllHSFKlCOPVZ36QBtciBTY6IVVbuIXPEUl7Y2RNmME7L5O/hDxXg4knKFJULKwAAA=",
        portas: [],
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
    slug: "laguna-kaa",
    obra: "Laguna KAA",
    local: "Curitiba, PR",
    ano: "2026",
    escritorio: "Bernardes Arquitetura",
    capa: "/tours/laguna-kaa/capa.webp",
    capaAlta: "/tours/laguna-kaa/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Principal"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/laguna-kaa/c1.webp",
        miniatura: "/tours/laguna-kaa/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRiIBAABXRUJQVlA4IBYBAADwBgCdASowABgAPu1qqk6ppiOiMBqoATAdiWIAnTNCiqCiBh8sz5m2Yvu9TGKMARcFQCyXei+nOgDOhDZvaRBwAP7Hc9Q1EoDuFAod6dzM0IWbIlWjgj/nHGsNrDj6XbgtKmk0YXeSK7j5XtW0QNpFPGlm7WyRUSOPYt9tsnGnl90zlwCSt3HrOIXnWTF3bg6zLkuxS60dusMzPWEO/IUPTV1JirzNnrMVeKBcZS5FeKRSxMe1nzavZdT3RhQFbpddbpXxpH1VH5lHJ2NiVIuX8P8Cdv0d8YSfJXzLk6m3abTyngIEGsblrSe2Mp5XqOHWdfud2c2aGpDduetfNw91gVyuUHgrjjrjBlkEZ/usgxXyRXn4AA==",
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
  {
    slug: "residencial-curitiba",
    obra: "Residencial Curitiba",
    local: "Curitiba, PR",
    ano: "2026",
    escritorio: "ARQUITETARE",
    capa: "/tours/residencial-curitiba/capa.webp",
    capaAlta: "/tours/residencial-curitiba/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Sala principal"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c1.webp",
        miniatura: "/tours/residencial-curitiba/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRggBAABXRUJQVlA4IPwAAADwBgCdASowABgAPuFcpk2opSOiNVgMARAcCWMAvzgWHQ+OmV6zF92ig1g0bLUbsjLXhx4pAFjZy/e1ZY5RxD7wAPJyT2XrYIHVVNTksQ7x3h1xlTsZ2t8wZ9QDbWNaN2+vph1p8N610lxySM5rzYsU5A/oqJZHY8hSTzon4CiUohKWks8RIh++AW7FNEYAC+YzYYxmvt/b5MFSRkf/nsmgYmC+KQ/rg59Usfi9G500MPdP4BUZXd0APCjXnv81gLiIgmOj8h5KZEbvbvq3AJlg/POXTXOO65xl36ts+UWhQMVAv/80UCnfPwEH0eW9i9Ubrneg1DOQFQ/gAAA=",
        portas: [],
      },
      {
        id: "c2",
        nome: t("Sala principal 2"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c2.webp",
        miniatura: "/tours/residencial-curitiba/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRggBAABXRUJQVlA4IPwAAABwBgCdASowABgAPu1oqk+ppaOiKqoBMB2JZQDCgBI2wzPQFhZ55oHJ+1cGcGTSjvXUXaVoC+p7nE6PbEAA/nhDH3qlGL5/cU1fK8ttPyjjgnPzh5GME60q/eEP4Y8Z03ndKpqJpfDkmKOxBSvz9PVP0dUgcP7Q7eb8Ut44uMW7f4Wzp5aCdQgK58WSflt5DA5x2vsQ1cQBARd0aoQDS7rT+YYwluutVVLPM27ZiCUuD+Rdw1gp/glrf3XNTus/RH/MFq65MkVxtNbsOfXL+DRbl2JdXckw4EdMYWTMB/FQRH7nYygBP1AbFrLlElPisFnQo1fE8mdro6DbwAA=",
        portas: [],
      },
      {
        id: "c3",
        nome: t("Sala principal close"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c3.webp",
        miniatura: "/tours/residencial-curitiba/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRgYBAABXRUJQVlA4IPoAAACwBgCdASowABgAPu1qq0+ppiOiKqoBMB2JQBYj8sGzAGvb6xP0j/gWfWkJ4+1n6fCLNvAXhISVxgbljFwsUAD+I2WO+Zg4K0IvGXLWbyO3eFcPBLuUIQ1GWQdL069gB42u549VugSA8IE3yo98Np+dNkR3zqBerVm5j6BMUIAgv/YjLQJkdiAjV3UO6NvwlT6qDiOkL2yGuyfsIkA7LWz5GRO9bYQpEWIoQKOltsp7okC2bmdc1OjYSea1i1sSAnfNNU6GPTPpahW/g1MU/GoT8ke+/wOv64cEZ6tQnrPIKSt8BL8bqTbpjCZ7KMxDR43OxM/1IArSwQAA",
        portas: [],
      },
      {
        id: "c4",
        nome: t("Pátio 1"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c4.webp",
        miniatura: "/tours/residencial-curitiba/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRlIBAABXRUJQVlA4IEYBAADwBgCdASowABgAPu1kqE2ppaOiKq35MB2JYwDNhY0qkvKH8cmM4nBn1WfzJ0WTnqPqcGxGl1Dy7nE1Zd/nFPQAAP62uOZFMbtztXXL5DAOjvCAw/IhvcXrmsQ28XPDZP6VJeNivFdtdPoAPPXvJmIwD29EhIvToAXRhMk9UUy11JFpX11/KXkhXvdIFpN2XWV8NtagX1k/dGubH+iZIiFrdwmVVd8ori6AFbhIwqI2pfXlx+W4fl6te6Sp8lMGXsT93q73k03IWcmkArgTfZVQeVofdhhFgrY+6Fbpjh1AfPIXdYkBdHhlD2FRGYLZ+dd3MdS2VfitfBqwkKPeTzV1+57pVWTFwqjU2DpOTb1YUvdd/uzgIrdOzHhW0di4qrzKQrFfMtpuxonrUMknPNFF+usBWFsrEigK7pqgzv6fOjyJFQAAAA==",
        portas: [],
      },
      {
        id: "c5",
        nome: t("Pátio 2"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c5.webp",
        miniatura: "/tours/residencial-curitiba/c5-min.webp",
        borrao: "data:image/webp;base64,UklGRlYBAABXRUJQVlA4IEoBAACQBwCdASowABgAPu1cpU2ppKMiMBqtUTAdiWMAyrXc64fEpDcGn2KBXkqDtbMG+SL5F/zRN7Vh+ZUanoIid0oohuHT2AAA/rakaJwP735ustZP173FktXwUrBddePOLf8JFQSf0qHPwfcvaidw5ekgWAF0k7yXfrTh+bNK1RWqBy62BSv4PrZL/axC3EOmrIK/sgBrugy4DjhgIvfp9u1AFCi5C1u22yyOF//6blT+w5jObdBu18lbQ0s2iK9bdOcKrIW+k9TBBD6N2KahpRrzIpimiRzLRMdxbKgC4bBMyrs/PDn9jQzlLx3EOlSZde36Svv23W0/6gZcN1t5SfY06tPiFU72I6IG6eLG2hsO+IE2h1qseZ2bNbGhgDqLmTTPvXwx1Z3960dGKjBHxHZ2zQe0ZtFpV8e3ImrPlGAAHTOdRU4KssgAAAA=",
        portas: [],
      },
      {
        id: "c8",
        nome: t("Pátio 3"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c8.webp",
        miniatura: "/tours/residencial-curitiba/c8-min.webp",
        borrao: "data:image/webp;base64,UklGRlABAABXRUJQVlA4IEQBAACQBwCdASowABgAPu1cpU2ppKMiMBqtUTAdiUAYbjufMOSGbS6+kloQ3L6G+NI7SR4ZiTEGoPFJ4p91pYuHIaCSkB6S1igA/mfbm4WP+eBmjaaxKxLrfPwn7k+YJGUKCrXoh7L6IieOTow8TKLDljw8+LMTDAlLRn4d0iEgXW/iD5hghZTNEq/L2qd0+dYhNkS/db/c4eXcKXghgo7KgTuCstH6j0FA6RnxNO7g1hDwIF2SkBEOtIIlKbUdeW83QW8lImj9z0thsmbd2p6aqwHU77riCG2Rxh/AvSq8ijn79FoLeveyBHqKJL38sthiJwX/jB4L+4Uh0KlnwQjJGlcn8MDEtaav1rgz63BelpIGHo4n4I/35XDbi/T85qaf3yqRlXIlJGrbXMsjlh+fs6GzZIEbYvxI4/MJ4xL9YBqVjzn2gAA=",
        portas: [],
      },
      {
        id: "c6",
        nome: t("Pátio 4"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba/c6.webp",
        miniatura: "/tours/residencial-curitiba/c6-min.webp",
        borrao: "data:image/webp;base64,UklGRloBAABXRUJQVlA4IE4BAACQBwCdASowABgAPu1qqU6ppiOiKrgN+TAdiWMAvOJsmVA+CiDtVw4+w/d7Q3e2KxDtznaLu8wDDwE33PHEY5oO0dinTOAA/rakaYeoQVYKfEFNGmwd4ZnO4VmQYZpB635fOfKJ7SYMyI/DFLrT/JFEoLo5+g2uyyWYmtquwFhX88T8ya7syOz+Z9d4UyQyrW3LIy8bifYTyG5f8r0CdL8E97sIRHg6Hb3jX0Nm7KIoRSnLVlHpq89l7T/9YIW69UpPpWNsHhQFqVGmi46RkQ3kH+OOHMGM+oYZde9FzVpH0MShRQW/p/YM4KLkCvtOjMK2v8GEUVmZoEvO95mFo2sr+MHgv7hSnyTtUnd0c0EL9Var5tMUhhKbn+v1YLUVc8LTL1K6H5fQ9PuyEa4mZ05MDja+UJU9UeZLkZa5cU4EtzW9VvSyN1irby1U2YAA",
        portas: [],
      },
    ],
  },
  {
    slug: "residencial-curitiba-2",
    obra: "Residencial Curitiba",
    local: "Curitiba, PR",
    ano: "2026",
    escritorio: "Solo Arquitetos",
    capa: "/tours/residencial-curitiba-2/capa.webp",
    capaAlta: "/tours/residencial-curitiba-2/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Casa Lateral"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba-2/c1.webp",
        miniatura: "/tours/residencial-curitiba-2/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRt4AAABXRUJQVlA4INIAAADwBQCdASowABgAPu1iqE2ppaOiMAgBMB2JZgCdMzRI8CnJ4tmDPsRi1ypLqTtWYllp+ZOAYKrYUAD31Bbx8DYkUsK4u3tCJDLv8hqI9517P+naopzg4b537GZQvcOuwj7/o7xOZ6cprBJjFCzoFO34B4OmvVXezE7huf0sXnaZMn8H/a3gM7aPWXEN4Mnjtmxdfb1Lbi4Vlzi4hW7NjwKB7cLMDkXyJW1cwCOjE+7iURu9EoV6GTRQrzKak0z4XYETuswI8YJ59fbD2YgTJ/8YAAA=",
        portas: [],
      },
      {
        id: "c3",
        nome: t("Entrada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba-2/c3.webp",
        miniatura: "/tours/residencial-curitiba-2/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRgYBAABXRUJQVlA4IPoAAADQBgCdASowABgAPu1ip02ppaMiMAgBMB2JYgDE3vFBJpM89zcsT+guZ6ikAeQOHznTFGt/Vy0Q7Pi6zH24/sAA/d4CxVYUS5kiVthGnFXzEV2M8lrUDabtpcL+vb7pO3mrUbkfCWFtUm7p8b6pYgYHXCKXAVVYzEmHh89IDvnx19toMR9rEzvNMEJwM5cOG3i3hD2LDPJzZJllzXmSx0FO1rdY3uxoxy+UR1Jto4G2LKFcrlf2EQakPiNscQDNMsvmiXS2VbCOGQV2D+N5wzqViFS+vUUqXLyUyN/lPCciaqHHB6Q5wbQgX67knzKejNY5nV3oqKTwAAAA",
        portas: [],
      },
      {
        id: "c2",
        nome: t("Quintal"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-curitiba-2/c2.webp",
        miniatura: "/tours/residencial-curitiba-2/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRigBAABXRUJQVlA4IBwBAABQBwCdASowABgAPu1kr1EppSQiqrgKATAdiWYAs7PsPbhLKeShcCCzE8iIA42fKKUiWXroJcDRWB7RkGmVEDfJmyRIAPx/XN/HuvasYuix8++CFh8wGfuvVFr4xLi8mlW48l3W/mB6WOCnG6tpR0no9yIkDR1+A55edVxxKUFmuQ8UTrpbFy8XudRRFeKYV+Uq4BtlHEfoq+Z2OSvmue/efMeXXJYmkFiUXFnWhb/DgeFgwz/XFVM0IIv1u0f0hNhLtPJ18nEIeTdoqhL5hf/Pv10kXS4Y4UyJyURgJgoa7yshPztD0hhjC3ZCGkhzRuNZBzSAzm2hUzQoCTrrHCHCfHX8Jyd9WZkr5ADspUInxngOaNK1Q0R1uAAAAA==",
        portas: [],
      },
    ],
  },
  {
    slug: "residencial-marcos-marin",
    obra: "Residencial Maringá",
    local: "Maringá, PR",
    ano: "2026",
    escritorio: "Ao Cubo Arquitetura",
    capa: "/tours/residencial-marcos-marin/capa.webp",
    capaAlta: "/tours/residencial-marcos-marin/capa-alta.webp",
    cenas: [
      {
        id: "c1",
        nome: t("Fachada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-marcos-marin/c1.webp",
        miniatura: "/tours/residencial-marcos-marin/c1-min.webp",
        borrao: "data:image/webp;base64,UklGRioBAABXRUJQVlA4IB4BAAAwBwCdASowABgAPu1mqU2ppaOiMAgBMB2JZACsIPRcJxkIuhqxNIbwYPPDiuxI1KRh9h5c29JCL87quV6JQxd2rTAA/uqKrf+7Z/OK/hHh74luleUrE7MctqX6XoHwgGJXd+rCbBRs3q3sehV5b6RnFLsoZJ+qgSZOTyBI2rn8baeeFzSD3R3p45kLQc1XrxCpjPJOzaRE+R5ExJOXKd52hQJ1kwIobpxPpo7lT0p+hb4MkaGeTVe+2k/yKsZ5QyskhJDvphdmZl9gFIXlxgcBFWbacaaFOJtl0nljigZcvBppPqWkHxMxlaOud4RG8alRKmu9qCl3dtdIHtdtizOZZ22zOq8pNZUdcoRuxkVXD7gP0a1shuuBEWNeAAAA",
        portas: [
        { yaw: 0.838547, pitch: 0.236165, destino: "c2" },
        { yaw: -0.198263, pitch: 0.125805, destino: "c3" },
        ],
      },
      {
        id: "c2",
        nome: t("Entrada"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-marcos-marin/c2.webp",
        miniatura: "/tours/residencial-marcos-marin/c2-min.webp",
        borrao: "data:image/webp;base64,UklGRiwBAABXRUJQVlA4ICABAADwBgCdASowABgAPu1wrlGppqQiqrgIATAdiUAXYj/8B7yEEoLlXJLKHcxunmO80bvMCh4Y7OIOioFmSGbnjia8AP6RvYQrbd2EXJv9bQCRQJLG2a1wv1rN67tiptkmZWr2+Igq20dm/1FxfgZrKFOVunmQznsaw/E8HW9XGRhcFihnrE8oc1genmBJK5F0G5hyHJIsxJXjnWEOE0FN4QE6rsegF3iAy/OLjk7Jtp4RkYCRFYtIbSBCz5oa+KDFKeKOgvyKMBWe/+ev9oZg3ZRXBSJfZ2CauGP1fxcRIT7GnJ8QYnai4+iaPiEyfjkh76lSwPOtGUv4liFf3duHrehVVSlW92cY0NndvYu7l8yy3ISCSNY4QidnMOLCgogEAAA=",
        portas: [
        { yaw: -1.911313, pitch: -0.111970, destino: "c1" },
        { yaw: -1.474937, pitch: -0.153714, destino: "c3" },
        ],
      },
      {
        id: "c3",
        nome: t("Interno fechado"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-marcos-marin/c3.webp",
        miniatura: "/tours/residencial-marcos-marin/c3-min.webp",
        borrao: "data:image/webp;base64,UklGRi4BAABXRUJQVlA4ICIBAACwBwCdASowABgAPu1qqE6ppiOiMBqoATAdiUAWI/AZzuhRlHSBbwAroGu4R39XPR4VaVBeupzs3Lp6/q2iP6BCB/Bk3H90AP7qzF7Ld077lu1pUVnyBoa/0RtmIArRTHfNtoN+/gnugRDaIijXMnlCix7eiLhNbGoPeTz8CdSJSBgwph153kfmeINefAgUZ6f7m8w0Do8ndR5tHajfphHmXMNXifLSBp4V21Gpiv/06qrDSIV6GkDpZ0VUMOV42t9Cp3RKLkfV3zuUzT6hSMsS8aBAmH1GgOUSL71Gts8PeAfq2sdGeESGGA1GAL6CYTuvnv8/QrimmsFqbotxa/5/Kk/IjLY4J22PVzXDylucF7+cP7VetM3aUY70k3x6JSAAAA==",
        portas: [],
      },
      {
        id: "c4",
        nome: t("Interno aberto"),
        vista: { yaw: 0, pitch: 0, fov: 76 },
        src: "/tours/residencial-marcos-marin/c4.webp",
        miniatura: "/tours/residencial-marcos-marin/c4-min.webp",
        borrao: "data:image/webp;base64,UklGRi4BAABXRUJQVlA4ICIBAABwBwCdASowABgAPu1qqU4ppqOiMBqoATAdiUAXBmYAv0Ehjb7129iprWp1Cu+EVoGUKvJN0/kp7vRhWT0g3ygaiqqoAAD+3ySQ6jcsEWTguTNMM8dvrnLAPdKOkzMhTW98m8IZaHcFZDoUREBPMWhl62QR0TL5ISD/pHDiuCYtZQGe/VVjpwR6UTG7B0LkwsJMPgN9rGCvVC0Fkb5+ictz633TQGvlQnL5QI6iWBmD0ffBCdtDpDwmz+es9Cb0qoUc3KpB5tDHbVv8GbJAlJuhYAzqIOzrnV9MRIuoAxHq3t4YIY2gipi/3b6ACXjUJqb5s2p4WOfD5MMmxJJ89mPSU+jWHulmorRsEO5FDufZLm3ajFTg/NMS+fGXLktHxJFAAA==",
        portas: [
        { yaw: -0.673595, pitch: -0.185259, destino: "c2" },
        ],
      },
    ],
  },
];

export const getTour = (slug?: string | null) =>
  slug ? TOURS.find((t) => t.slug === slug) : undefined;
