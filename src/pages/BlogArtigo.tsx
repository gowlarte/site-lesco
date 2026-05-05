import { Link } from "react-router-dom";
import heroImg from "@/assets/cop30/hero.jpg";
import edificio1 from "@/assets/cop30/edificio-1.jpg";
import edificio2 from "@/assets/cop30/edificio-2.jpg";
import produtoWpc from "@/assets/cop30/produto-wpc.jpg";
import fachadaCop from "@/assets/cop30/fachada-cop30.jpg";
import related1 from "@/assets/cop30/related-1.jpg";
import related2 from "@/assets/cop30/related-2.jpg";

const SectionRule = () => <div className="w-10 h-px bg-dark/80 mt-4" />;

interface ArticleHeroProps {
  title: string;
  quote: string;
  image: string;
}
const ArticleHero = ({ title, quote, image }: ArticleHeroProps) => (
  <header>
    <h1 className="font-display font-bold text-[28px] md:text-[40px] lg:text-[44px] leading-[1.15] tracking-[-0.01em] text-dark max-w-[920px]">
      {title}
    </h1>
    <SectionRule />
    <figure className="mt-10">
      <div className="relative aspect-[21/9] overflow-hidden rounded-[10px]">
        <img src={image} alt="Parque da Cidade — fachada COP30" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <figcaption className="mt-5 text-center font-display italic font-light text-[14px] md:text-[15px] text-dark/70">
        "{quote}"
      </figcaption>
    </figure>
  </header>
);

interface AttributeCardProps {
  title: string;
  description: string;
}
const AttributeCard = ({ title, description }: AttributeCardProps) => (
  <div className="flex flex-col gap-2">
    <p className="font-display font-bold text-[13px] md:text-[14px] text-dark leading-snug">{title}</p>
    <p className="font-body font-light text-[12.5px] md:text-[13px] leading-[1.55] text-dark/70">{description}</p>
  </div>
);

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="relative pl-2">
    <span aria-hidden className="font-display text-[32px] leading-none text-dark/70 mr-2 align-top">❝</span>
    <span className="font-display italic font-light text-[18px] md:text-[20px] leading-[1.4] text-dark">
      {children}
    </span>
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
    <div className="overflow-hidden rounded-[10px] border border-dark/10">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-dark/[0.04]">
            <th className="px-5 py-4 font-display font-bold text-[13px] text-dark w-1/3">Critério</th>
            <th className="px-5 py-4 font-display font-bold text-[13px] text-dark">Leitura para obras de referência</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([criterio, leitura], i) => (
            <tr key={criterio} className={i % 2 === 1 ? "bg-dark/[0.02]" : ""}>
              <td className="px-5 py-4 font-body text-[13px] text-dark/80 align-top border-t border-dark/10">{criterio}</td>
              <td className="px-5 py-4 font-body text-[13px] text-dark/80 border-t border-dark/10">
                <span className="font-bold text-dark">WPC Lesco</span> {leitura}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CTABlock = () => (
  <section className="rounded-[10px] bg-dark/[0.05] p-8 md:p-12">
    <h3 className="font-display font-bold text-[20px] md:text-[24px] text-dark">
      Leve o padrão COP30 para o seu projeto
    </h3>
    <p className="mt-4 font-body font-light text-[13.5px] md:text-[14px] leading-[1.7] text-dark/80 max-w-[760px]">
      Explore perfis, cores, métodos de fixação e diretrizes de instalação das linhas Shield, Brise,
      Panel, Line e Deck. Baixe o Catálogo Lesco e descubra como especificar luxo funcional em
      fachadas, forros e áreas externas.
    </p>
    <a
      href="#"
      className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-[8px] bg-[#2D5016] text-white font-display font-bold text-[13px] tracking-wide hover:brightness-110 transition"
    >
      Baixe nosso catálogo
    </a>
    <p className="mt-5 font-body text-[12px] text-dark/60 max-w-[760px]">
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
    <section className="mt-20">
      <h2 className="font-display font-bold text-[22px] md:text-[28px] text-dark">Veja também</h2>
      <SectionRule />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        {items.map((it) => (
          <a key={it.title} href="#" className="group relative block rounded-[10px] overflow-hidden">
            <div className="relative aspect-[16/10]">
              <img src={it.img} alt={it.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            </div>
            <p className="absolute left-6 right-6 bottom-5 font-display font-bold text-white text-[15px] md:text-[17px] leading-tight">
              {it.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body font-light text-[13.5px] md:text-[14.5px] leading-[1.75] text-dark/85 max-w-[800px]">
    {children}
  </p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <>
    <h2 className="font-display font-bold text-[22px] md:text-[28px] text-dark leading-tight">{children}</h2>
    <SectionRule />
  </>
);

const BlogArtigo = () => {
  const attributes = [
    { title: "Estabilidade UV", description: "Cor e textura preservadas sob radiação solar intensa." },
    { title: "Estabilidade dimensional e umidade", description: "Não apodrece, não empena; ideal para a Amazônia chuvosa." },
    { title: "Resistência a pragas e fungos", description: "Dispensa tratamentos recorrentes contra cupins e mofo." },
    { title: "Acabamento premium", description: "Fixação oculta, superfície contínua e leitura estética impecável." },
    { title: "Baixa manutenção (OPEX)", description: "Limpeza simples, sem repinturas ou envernizamentos." },
  ];
  const engineering = [
    { title: "Estrutura de apoio dimensionada", description: "Vãos usuais (ex.: 60–80 cm, conforme cálculo) para rigidez e planicidade." },
    { title: "Modulação inteligente", description: "Paginação de barras e cortes otimizados para reduzir perdas e acelerar montagem." },
    { title: "Ventilação do respaldo", description: "Controle de dilatação e microclima, elevando a durabilidade do conjunto." },
    { title: "Arremates e encontros resolvidos", description: "Continuidade visual, estanqueidade e proteção à água." },
    { title: "Operação simplificada", description: "Rotina de limpeza com água e sabão neutro garante aparência estável." },
  ];

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <article className="bg-light rounded-[10px] overflow-hidden px-6 md:px-16 lg:px-24 pt-12 md:pt-16 pb-16 md:pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60 hover:text-dark transition-colors mb-10"
        >
          <span aria-hidden>←</span> Voltar ao blog
        </Link>

        <ArticleHero
          title="O Brasil que constrói para o mundo: Lesco e o DNA sustentável que assina a COP30"
          quote="Um bom ambiente é aquele que foi pensado para guiar a sua experiência dentro dele"
          image={heroImg}
        />

        {/* 2. De Belém para o mundo */}
        <section className="mt-16">
          <H2>De Belém para o mundo: inovação com identidade brasileira</H2>
          <div className="mt-6">
            <BodyText>
              O Brasil tem uma assinatura própria quando o assunto é construção sustentável: unir a
              estética da natureza à precisão da engenharia. No Parque da Cidade, essa assinatura
              ganha escala: um palco global revestido com um material que fala a língua do clima,
              da cultura e do legado urbano. É a prova de que o país não apenas acompanha
              tendências — lidera o diálogo entre tecnologia, conforto e responsabilidade ambiental.
            </BodyText>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-[10px] items-start">
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                <img src={edificio1} alt="Edifício Parque da Cidade ao entardecer" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <PullQuote>
                O Brasil tem uma assinatura própria quando o assunto é construção sustentável:
                unir a estética da natureza à precisão da engenharia.
              </PullQuote>
            </div>
            <div className="md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
                <img src={edificio2} alt="Detalhe interno do revestimento WPC" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Material de assinatura */}
        <section className="mt-20">
          <H2>Material de assinatura: Green Shield 184x20 em Red Cedar</H2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-[10px] items-center">
            <div className="md:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-[10px] bg-dark/[0.03]">
                <img src={produtoWpc} alt="Perfil Green Shield 184x20 Red Cedar" className="absolute inset-0 w-full h-full object-contain p-6" />
              </div>
            </div>
            <div className="md:col-span-8">
              <BodyText>
                O forro externo da fachada utiliza o Lesco Green Shield 184x20 na cor Red Cedar,
                um Wood Plastic Composite (WPC) que combina fibras naturais e polímeros de alta
                performance para entregar a leitura calorosa da madeira com desempenho superior em
                ambiente externo.
              </BodyText>
            </div>
          </div>

          <div className="mt-12 relative aspect-[21/10] overflow-hidden rounded-[10px]">
            <img src={fachadaCop} alt="Fachada COP30 com revestimento WPC" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6">
            {attributes.map((a) => <AttributeCard key={a.title} {...a} />)}
          </div>

          <div className="mt-10">
            <BodyText>
              O Red Cedar dialoga com a paleta da paisagem amazônica e reforça a narrativa de
              sofisticação + sustentabilidade — a estética que permanece bonita mesmo sob uso intenso.
            </BodyText>
          </div>
        </section>

        {/* 4. Engenharia */}
        <section className="mt-20">
          <H2>Engenharia que sustenta a estética</H2>
          <div className="mt-6">
            <BodyText>
              O Brasil tem uma assinatura própria quando o assunto é construção sustentável: unir a
              estética da natureza à precisão da engenharia. No Parque da Cidade, essa assinatura
              ganha escala: um palco global revestido com um material que fala a língua do clima,
              da cultura e do legado urbano. É a prova de que o país não apenas acompanha
              tendências — lidera o diálogo entre tecnologia, conforto e responsabilidade ambiental.
            </BodyText>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6">
            {engineering.map((a) => <AttributeCard key={a.title} {...a} />)}
          </div>
          <div className="mt-8">
            <BodyText>
              O resultado é o que chamamos de luxo funcional: beleza atemporal com desempenho
              mensurável em uso real.
            </BodyText>
          </div>
        </section>

        {/* 5. Tabela */}
        <section className="mt-20">
          <H2>Escolha de ciclo de vida: WPC Lesco x madeira natural</H2>
          <div className="mt-6 mb-8">
            <BodyText>
              Em clima severo, decisões baseadas apenas no menor custo inicial tendem a cobrar a
              conta no futuro. Na ótica do ciclo de vida:
            </BodyText>
          </div>
          <ComparisonTable />
        </section>

        {/* 6. Branding urbano */}
        <section className="mt-20">
          <H2>Branding urbano: a fachada como linguagem de cidade</H2>
          <h3 className="mt-8 font-display font-bold text-[16px] md:text-[18px] text-dark">
            Depois do evento, o legado
          </h3>
          <div className="mt-4">
            <BodyText>
              Em um evento global, a fachada deixa de ser apenas cobertura e se torna mídia. Cada
              enquadramento, transmissão e visita técnica carrega a narrativa material do lugar. Ao
              adotar WPC Lesco no Parque da Cidade, Belém comunica ao mundo uma mensagem clara: o
              futuro da madeira é responsável, técnico e belo.
            </BodyText>
          </div>
        </section>

        {/* 7. CTA */}
        <div className="mt-16">
          <CTABlock />
        </div>

        {/* 8. Veja também */}
        <RelatedArticles />
      </article>
    </main>
  );
};

export default BlogArtigo;
