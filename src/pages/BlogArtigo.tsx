import { Link } from "react-router-dom";

const heroImg = "https://lesco.com.br/wp-content/uploads/2025/10/5410896545-1024x526.png";
const wideImg = "https://lesco.com.br/wp-content/uploads/2025/10/548674-1024x529.png";

const relacionados = [
  { nome: "Green Shield 184x20", medida: "Red Cedar", href: "/altwood-shield" },
  { nome: "Brise", medida: "Linha completa", href: "/altwood-brise" },
  { nome: "Panel", medida: "Linha completa", href: "/altwood-panel" },
  { nome: "Line", medida: "Linha completa", href: "/altwood-line" },
  { nome: "Deck", medida: "Linha completa", href: "/altwood-deck" },
];

const BlogArtigo = () => {
  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <article className="bg-light rounded-[10px] overflow-hidden">
        {/* Header */}
        <header className="px-6 md:px-16 lg:px-28 pt-12 md:pt-20 pb-8 md:pb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60 hover:text-dark transition-colors mb-8"
          >
            <span aria-hidden>←</span> Voltar ao blog
          </Link>
          <div className="w-12 h-px bg-dark/40 mb-8" />
          <h1 className="font-display font-light text-[32px] md:text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.015em] text-dark max-w-[1100px]">
            O Brasil que constrói para o mundo: Lesco e o DNA sustentável que
            assina a COP30
          </h1>
          <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60">
            <span>AltWood</span>
            <span className="w-1 h-1 rounded-full bg-dark/40" />
            <span>31 Out 2025</span>
            <span className="w-1 h-1 rounded-full bg-dark/40" />
            <span>7 min de leitura</span>
          </div>
        </header>

        {/* Hero */}
        <div className="px-6 md:px-16 lg:px-28">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[10px]">
            <img
              src={heroImg}
              alt="Parque da Cidade revestido com madeira ecológica Lesco para a COP30"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="mt-5 text-center font-display italic font-light text-[14px] md:text-[15px] text-dark/70">
            "Uma obra que permanece depois do evento e inspira o futuro."
          </p>
        </div>

        {/* Intro */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16">
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 max-w-[960px] mx-auto">
            Quando o mundo volta os olhos para a <strong>COP30</strong>, Belém
            apresenta mais do que debates: apresenta arquitetura que traduz
            propósito. No <strong>Parque da Cidade</strong>, a{" "}
            <strong>Lesco Revestimentos</strong> assina o forro externo da
            fachada com <strong>madeira ecológica (WPC)</strong>,
            materializando a visão de um Brasil que alia design premium,
            engenharia precisa e sustentabilidade — uma obra que permanece
            depois do evento e inspira o futuro.
          </p>
        </div>

        {/* Section 1 */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 max-w-[1024px] mx-auto">
          <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-5">
            De Belém para o mundo: inovação com identidade brasileira
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80">
            O Brasil tem uma assinatura própria quando o assunto é construção
            sustentável: unir a estética da natureza à precisão da engenharia.
            No Parque da Cidade, essa assinatura ganha escala — um palco global
            revestido com um material que fala a língua do clima, da cultura e
            do legado urbano. É a prova de que o país não apenas acompanha
            tendências, mas <strong>lidera</strong> o diálogo entre tecnologia,
            conforto e responsabilidade ambiental.
          </p>
        </div>

        {/* Section 2 */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 max-w-[1024px] mx-auto">
          <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-5">
            Material de assinatura: Green Shield 184x20 em Red Cedar
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 mb-8">
            O forro externo da fachada utiliza o{" "}
            <strong>Lesco Green Shield 184x20</strong> na cor{" "}
            <strong>Red Cedar</strong>, um{" "}
            <strong>Wood Plastic Composite (WPC)</strong> que combina fibras
            naturais e polímeros de alta performance para entregar a leitura
            calorosa da madeira com desempenho superior em ambiente externo.
          </p>
          <ul className="space-y-3 font-body font-light text-[15px] md:text-[16px] leading-[1.6] text-dark/80">
            {[
              ["Estabilidade dimensional e umidade:", "não apodrece, não empena; ideal para a Amazônia chuvosa."],
              ["Resistência a pragas e fungos:", "dispensa tratamentos recorrentes contra cupins e mofo."],
              ["Estabilidade UV:", "cor e textura preservadas sob radiação solar intensa."],
              ["Baixa manutenção (OPEX):", "limpeza simples, sem repinturas ou envernizamentos."],
              ["Acabamento premium:", "fixação oculta, superfície contínua e leitura estética impecável."],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-3">
                <span className="text-dark/40 mt-[10px] block w-3 h-px bg-dark/40 shrink-0" />
                <span>
                  <strong className="text-dark">{term}</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80">
            O <strong>Red Cedar</strong> dialoga com a paleta da paisagem
            amazônica e reforça a narrativa de sofisticação + sustentabilidade —
            a estética que permanece bonita mesmo sob uso intenso.
          </p>
        </div>

        {/* Pull quote */}
        <div className="px-6 md:px-16 lg:px-28 mt-14 md:mt-20">
          <blockquote className="max-w-[820px] mx-auto">
            <span aria-hidden className="block font-display text-[40px] leading-none text-dark/40 mb-2">"</span>
            <p className="font-display italic font-light text-[22px] md:text-[28px] leading-[1.35] tracking-[-0.01em] text-dark">
              Luxo funcional: beleza atemporal com desempenho mensurável em uso
              real.
            </p>
          </blockquote>
        </div>

        {/* Section 3 */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 max-w-[1024px] mx-auto">
          <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-5">
            Engenharia que sustenta a estética
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 mb-6">
            A performance nasce do encontro entre produto e projeto executivo.
            Para transformar a fachada em padrão replicável, a implantação
            seguiu premissas claras:
          </p>
          <ul className="space-y-3 font-body font-light text-[15px] md:text-[16px] leading-[1.6] text-dark/80">
            {[
              ["Estrutura de apoio dimensionada:", "vãos usuais (60–80 cm, conforme cálculo) para rigidez e planicidade."],
              ["Modulação inteligente:", "paginação de barras e cortes otimizados para reduzir perdas e acelerar montagem."],
              ["Ventilação do respaldo:", "controle de dilatação e microclima, elevando a durabilidade do conjunto."],
              ["Arremates e encontros resolvidos:", "continuidade visual, estanqueidade e proteção à água."],
              ["Operação simplificada:", "rotina de limpeza com água e sabão neutro garante aparência estável."],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-3">
                <span className="text-dark/40 mt-[10px] block w-3 h-px bg-dark/40 shrink-0" />
                <span>
                  <strong className="text-dark">{term}</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Wide image */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
            <img
              src={wideImg}
              alt="Detalhe do forro externo em WPC Red Cedar"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Comparison */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 max-w-[1024px] mx-auto">
          <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-5">
            Escolha de ciclo de vida: WPC Lesco x madeira natural
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 mb-8">
            Em clima severo, decisões baseadas apenas no menor custo inicial
            tendem a cobrar a conta no futuro. Na ótica do ciclo de vida:
          </p>
          <div className="overflow-hidden rounded-[10px] border border-dark/10">
            <table className="w-full text-left font-body text-[14px] md:text-[15px]">
              <thead>
                <tr className="bg-dark/5 font-mono text-[11px] uppercase tracking-[0.12em] text-dark/70">
                  <th className="p-4 font-medium">Critério</th>
                  <th className="p-4 font-medium">Leitura para obras de referência</th>
                </tr>
              </thead>
              <tbody className="font-light text-dark/80">
                {[
                  ["Umidade e intempéries", "WPC Lesco permanece estável; madeira incha/racha e exige retrabalhos."],
                  ["Pragas e fungos", "WPC Lesco não atrai cupins/mofo; madeira precisa de tratamentos."],
                  ["Exposição UV", "WPC Lesco preserva cor/textura; madeira desbota rapidamente."],
                  ["Manutenção (OPEX)", "WPC Lesco pede limpeza simples; madeira demanda repintura/verniz."],
                ].map(([crit, desc]) => (
                  <tr key={crit} className="border-t border-dark/10">
                    <td className="p-4 font-medium text-dark align-top w-[35%]">{crit}</td>
                    <td className="p-4 leading-[1.6]">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80">
            A vantagem é objetiva: aparência estável, risco técnico reduzido e
            previsibilidade financeira.
          </p>
        </div>

        {/* Section 4 */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 max-w-[1024px] mx-auto">
          <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-5">
            Branding urbano: a fachada como linguagem de cidade
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80">
            Em um evento global, a fachada deixa de ser apenas cobertura e se
            torna <strong>mídia</strong>. Cada enquadramento, transmissão e
            visita técnica carrega a narrativa material do lugar. Ao adotar WPC
            Lesco no Parque da Cidade, Belém comunica ao mundo uma mensagem
            clara: o futuro da madeira é responsável, técnico e belo.
          </p>
        </div>

        {/* Section 5 */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 pb-16 md:pb-24 max-w-[1024px] mx-auto">
          <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-5">
            Depois do evento, o legado
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80">
            A COP30 termina; a cidade continua. A especificação em WPC assegura
            que o forro externo conserve integridade, cor e desempenho por anos
            com intervenção mínima. É assim que transformamos a exigência de um
            palco global em <strong>valor urbano duradouro</strong> — para
            Belém e para o Brasil que projeta para o mundo.
          </p>
        </div>
      </article>

      {/* CTA + Linhas */}
      <section className="bg-light rounded-[10px] mt-[10px] px-6 md:px-16 lg:px-28 py-12 md:py-16">
        <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-3">
          Leve o padrão COP30 para o seu projeto
        </h2>
        <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/70 max-w-[760px] mb-10">
          Explore perfis, cores, métodos de fixação e diretrizes de instalação
          das linhas <strong>Shield, Brise, Panel, Line</strong> e{" "}
          <strong>Deck</strong>.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[10px] mb-10">
          {relacionados.map((item) => (
            <Link
              key={item.nome}
              to={item.href}
              className="group flex flex-col p-6 rounded-[10px] bg-dark/5 hover:bg-dark/10 transition-colors duration-300"
            >
              <p className="font-display text-[16px] text-dark">{item.nome}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-dark/55 mt-2">
                {item.medida}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.1em] text-dark group-hover:gap-3 transition-all">
                Conhecer <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          to="/orcamento"
          className="inline-flex items-center px-6 py-3 rounded font-display font-light text-[12px] uppercase tracking-[0.08em] text-[#303030] hover:brightness-110 transition-all"
          style={{
            background:
              "linear-gradient(135deg, #a3dba0 2%, #c6e1d7 26%, #f7c39b 50%, #ed8d7b 80%)",
          }}
        >
          Solicitar orçamento
        </Link>
      </section>
    </main>
  );
};

export default BlogArtigo;
