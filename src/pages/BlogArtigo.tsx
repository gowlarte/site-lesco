import { Link } from "react-router-dom";
import heroImg from "@/assets/cop30/hero.jpg";
import edificio1 from "@/assets/cop30/edificio-1.jpg";
import edificio2 from "@/assets/cop30/edificio-2.webp";
import produtoWpc from "@/assets/cop30/produto-wpc.png";
import fachadaCop from "@/assets/cop30/fachada-cop30.webp";
import extra1 from "@/assets/cop30/extra-1.webp";
import extra2 from "@/assets/cop30/extra-2.jpg";
import related1 from "@/assets/cop30/related-1.jpg";
import related2 from "@/assets/cop30/related-2.jpg";

/* ---------- atoms ---------- */
const SectionRule = () => <div className="w-8 h-px bg-dark mt-3" />;

const H1 = ({ children }: { children: React.ReactNode }) => (
  <>
    <h1 className="font-display font-bold text-[26px] md:text-[32px] leading-[1.2] tracking-[-0.01em] text-dark">
      {children}
    </h1>
    <SectionRule />
  </>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display font-bold text-[15px] md:text-[16px] leading-tight text-dark">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display font-bold text-[14px] md:text-[15px] leading-tight text-dark">
    {children}
  </h3>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body font-normal text-[12.5px] md:text-[13px] leading-[1.65] text-dark">
    {children}
  </p>
);

interface AttributeProps {
  title: string;
  description: string;
}
const Attribute = ({ title, description }: AttributeProps) => (
  <div className="flex flex-col gap-1.5">
    <p className="font-display font-bold text-[12px] text-dark leading-snug">{title}</p>
    <p className="font-body font-normal text-[11.5px] leading-[1.5] text-dark">{description}</p>
  </div>
);

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="relative pt-2">
    <span aria-hidden className="absolute -left-1 -top-2 font-display text-[40px] leading-none text-dark">
      ❝
    </span>
    <p className="pl-7 font-display italic font-light text-[18px] md:text-[20px] leading-[1.35] text-dark">
      {children}
    </p>
  </blockquote>
);

const ComparisonTable = () => {
  const rows = [
    ["Umidade e intempéries", "permanece estável; madeira incha/racha e exige retrabalhos."],
    ["Pragas e fungos", "não atrai cupins/mofo; madeira precisa de tratamentos."],
    ["Exposição UV", "preserva cor/textura; madeira desbota rapidamente."],
    ["Manutenção (OPEX)", "pede limpeza simples; madeira demanda repintura/verniz."],
  ];
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-y border-dark/20">
          <th className="py-3 pr-6 font-display font-bold text-[12px] text-dark w-[38%]">Critério</th>
          <th className="py-3 font-display font-bold text-[12px] text-dark">
            Leitura para obras de referência
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([criterio, leitura]) => (
          <tr key={criterio} className="border-b border-dark/10">
            <td className="py-3.5 pr-6 align-top font-body text-[12.5px] text-dark">{criterio}</td>
            <td className="py-3.5 font-body text-[12.5px] text-dark">
              <span className="font-bold">WPC Lesco</span> {leitura}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CTABlock = () => (
  <section className="rounded-[10px] bg-bone border border-dark/10 px-7 md:px-9 py-7 md:py-8">
    <H2>Leve o padrão COP30 para o seu projeto</H2>
    <p className="mt-3 font-body text-[12.5px] leading-[1.6] text-dark">
      Explore perfis, cores, métodos de fixação e diretrizes de instalação das linhas Shield, Brise,
      Panel, Line e Deck. Baixe o Catálogo Lesco e descubra como especificar luxo funcional em
      fachadas, forros e áreas externas.
    </p>
    <a
      href="#"
      className="inline-flex items-center justify-center mt-5 px-5 py-2.5 rounded-[6px] bg-[#2D5016] text-white font-display font-bold text-[12px] tracking-wide hover:brightness-110 transition"
    >
      Baixe nosso catálogo
    </a>
    <p className="mt-4 font-body text-[11px] text-dark">
      Precisa de apoio técnico, amostras ou fichas detalhadas? Nosso time está pronto para apoiar
      sua especificação.
    </p>
  </section>
);

const RelatedArticles = () => {
  const items = [
    { img: related1, title: "Conheça a melhor madeira para brise: beleza e durabilidade" },
    { img: related2, title: "Onde comprar brise de madeira WPC: Lesco Revestimentos" },
  ];
  return (
    <section className="mt-14">
      <H2>Veja também</H2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        {items.map((it) => (
          <a key={it.title} href="#" className="group relative block rounded-[10px] overflow-hidden">
            <div className="relative aspect-[16/10]">
              <img
                src={it.img}
                alt={it.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <p className="absolute left-5 right-5 bottom-4 font-display font-bold text-white text-[14px] md:text-[15px] leading-tight">
              {it.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

const BlogArtigo = () => {
  const attributes: AttributeProps[] = [
    { title: "Estabilidade UV:", description: "cor e textura preservadas sob radiação solar intensa." },
    { title: "Estabilidade dimensional e umidade:", description: "não apodrece, não empena; ideal para a Amazônia chuvosa." },
    { title: "Resistência a pragas e fungos:", description: "dispensa tratamentos recorrentes contra cupins e mofo." },
    { title: "Acabamento premium:", description: "fixação oculta, superfície contínua e leitura estética impecável." },
    { title: "Baixa manutenção (OPEX):", description: "limpeza simples, sem repinturas ou envernizamentos." },
  ];
  const engineering: AttributeProps[] = [
    { title: "Estrutura de apoio dimensionada:", description: "Vãos usuais (ex.: 60–80 cm, conforme cálculo) para rigidez e planicidade." },
    { title: "Modulação inteligente:", description: "Paginação de barras e cortes otimizados para reduzir perdas e acelerar montagem." },
    { title: "Ventilação do respaldo:", description: "Controle de dilatação e microclima, elevando a durabilidade do conjunto." },
    { title: "Arremates e encontros resolvidos:", description: "Continuidade visual, estanqueidade e proteção à água." },
    { title: "Operação simplificada:", description: "Rotina de limpeza com água e sabão neutro garante aparência estável." },
  ];

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <article className="mx-auto w-full max-w-[920px] px-6 sm:px-10 md:px-14 pt-10 md:pt-14 pb-14 md:pb-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dark hover:opacity-70 transition-opacity mb-8"
        >
          <span aria-hidden>←</span> Voltar ao blog
        </Link>

        <H1>O Brasil que constrói para o mundo: Lesco e o DNA sustentável que assina a COP30</H1>

        {/* Hero */}
        <figure className="mt-8">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[10px]">
            <img src={heroImg} alt="Parque da Cidade — fachada COP30" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <figcaption className="mt-4 text-center font-display italic font-light text-[13px] text-dark">
            "Um bom ambiente é aquele que foi pensado para guiar a sua experiência dentro dele"
          </figcaption>
        </figure>

        {/* §1 */}
        <section className="mt-12">
          <H2>De Belém para o mundo: inovação com identidade brasileira</H2>
          <div className="mt-3">
            <Body>
              O Brasil tem uma assinatura própria quando o assunto é construção sustentável: unir a
              estética da natureza à precisão da engenharia. No Parque da Cidade, essa assinatura
              ganha escala: um palco global revestido com um material que fala a língua do clima,
              da cultura e do legado urbano. É a prova de que o país não apenas acompanha
              tendências — lidera o diálogo entre tecnologia, conforto e responsabilidade ambiental.
            </Body>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-[10px] items-start">
            <div className="col-span-12 md:col-span-5 flex flex-col gap-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                <img src={edificio1} alt="Edifício Parque da Cidade ao entardecer" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <PullQuote>
                O Brasil tem uma assinatura própria quando o assunto é construção sustentável:
                unir a estética da natureza à precisão da engenharia.
              </PullQuote>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
                <img src={edificio2} alt="Detalhe do revestimento WPC à noite" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* §2 */}
        <section className="mt-14">
          <div className="grid grid-cols-12 gap-[14px] items-start">
            <div className="col-span-4 md:col-span-3">
              <div className="relative aspect-square overflow-hidden rounded-[10px] bg-dark/[0.04]">
                <img src={produtoWpc} alt="Perfil Green Shield 184x20 Red Cedar" className="absolute inset-0 w-full h-full object-contain p-3" />
              </div>
            </div>
            <div className="col-span-8 md:col-span-9 pt-1">
              <H2>Material de assinatura: Green Shield 184x20 em Red Cedar</H2>
              <div className="mt-3">
                <Body>
                  O forro externo da fachada utiliza o Lesco Green Shield 184x20 na cor Red Cedar,
                  um Wood Plastic Composite (WPC) que combina fibras naturais e polímeros de alta
                  performance para entregar a leitura calorosa da madeira com desempenho superior em
                  ambiente externo.
                </Body>
              </div>
            </div>
          </div>

          <div className="mt-10 relative aspect-[16/9] overflow-hidden rounded-[10px]">
            <img src={fachadaCop} alt="Fachada COP30 com revestimento WPC" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
            {attributes.map((a) => <Attribute key={a.title} {...a} />)}
          </div>

          <div className="mt-6">
            <Body>
              O Red Cedar dialoga com a paleta da paisagem amazônica e reforça a narrativa de
              sofisticação + sustentabilidade — a estética que permanece bonita mesmo sob uso intenso.
            </Body>
          </div>
        </section>

        {/* §3 */}
        <section className="mt-14">
          <H2>Engenharia que sustenta a estética</H2>
          <div className="mt-3">
            <Body>
              O Brasil tem uma assinatura própria quando o assunto é construção sustentável: unir a
              estética da natureza à precisão da engenharia. No Parque da Cidade, essa assinatura
              ganha escala: um palco global revestido com um material que fala a língua do clima,
              da cultura e do legado urbano. É a prova de que o país não apenas acompanha
              tendências — lidera o diálogo entre tecnologia, conforto e responsabilidade ambiental.
            </Body>
          </div>
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
            {engineering.map((a) => <Attribute key={a.title} {...a} />)}
          </div>
          <div className="mt-6">
            <Body>
              O resultado é o que chamamos de luxo funcional: beleza atemporal com desempenho
              mensurável em uso real.
            </Body>
          </div>
        </section>

        {/* §4 */}
        <section className="mt-14">
          <H2>Escolha de ciclo de vida: WPC Lesco x madeira natural</H2>
          <div className="mt-3 mb-5">
            <Body>
              Em clima severo, decisões baseadas apenas no menor custo inicial tendem a cobrar a
              conta no futuro. Na ótica do ciclo de vida:
            </Body>
          </div>
          <ComparisonTable />
        </section>

        {/* §5 */}
        <section className="mt-14">
          <Body>Branding urbano: a fachada como linguagem de cidade</Body>
          <div className="mt-6">
            <H3>Depois do evento, o legado</H3>
            <div className="mt-3">
              <Body>
                Em um evento global, a fachada deixa de ser apenas cobertura e se torna mídia. Cada
                enquadramento, transmissão e visita técnica carrega a narrativa material do lugar.
                Ao adotar WPC Lesco no Parque da Cidade, Belém comunica ao mundo uma mensagem clara:
                o futuro da madeira é responsável, técnico e belo.
              </Body>
            </div>
          </div>
        </section>

        <div className="mt-12">
          <CTABlock />
        </div>

        <RelatedArticles />
      </article>
    </main>
  );
};

export default BlogArtigo;
