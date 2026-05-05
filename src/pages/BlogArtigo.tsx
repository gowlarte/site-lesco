import { Link } from "react-router-dom";

const heroImg = "https://lesco.com.br/wp-content/uploads/2025/10/5410896545-1024x526.png";
const wideImg = "https://lesco.com.br/wp-content/uploads/2025/10/548674-1024x529.png";
const detailImg1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80";
const detailImg4 = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80";
const detailImg5 = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80";
const detailImg6 = "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80";

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
            <span>9 min de leitura</span>
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
            Parque da Cidade, Belém — fachada externa em WPC Lesco Green Shield
            184x20, cor Red Cedar.
          </p>
        </div>

        {/* Lead */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 max-w-[1024px] mx-auto">
          <p className="font-display font-light text-[20px] md:text-[24px] leading-[1.45] tracking-[-0.01em] text-dark mb-8">
            Quando o mundo voltar os olhos para a COP30, Belém não vai
            apresentar apenas debates sobre o futuro do clima — vai apresentar
            arquitetura que já o materializa. E parte dessa narrativa, em
            silêncio e em escala, foi assinada pela Lesco.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-6">
            No coração do <strong>Parque da Cidade</strong>, principal palco da
            conferência, a fachada externa de uma das edificações de uso
            permanente recebeu o forro em <strong>madeira ecológica</strong> da
            Lesco — um <strong>WPC (Wood Plastic Composite)</strong> que combina
            fibras naturais e polímeros de alta performance. A escolha não foi
            estética por acaso, nem técnica por conveniência: foi uma decisão
            de projeto que precisa atravessar décadas de chuva amazônica,
            radiação solar e uso intenso, sem perder o que importa — beleza,
            integridade e propósito.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80">
            É a tradução, em material, de uma ideia que a indústria brasileira
            vem amadurecendo há anos: <em>sustentabilidade não é discurso, é
            especificação</em>. E quando essa especificação resiste ao
            escrutínio de um evento global, ela deixa de ser apenas produto
            para se tornar <strong>posicionamento de país</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24 max-w-[1024px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50 mb-3">
            01 — Contexto
          </p>
          <h2 className="font-display font-light text-[26px] md:text-[34px] tracking-[-0.01em] text-dark mb-6">
            De Belém para o mundo: inovação com identidade brasileira
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            A escolha de Belém como sede da COP30 carrega uma simbologia que
            transcende a logística. É a primeira vez que a conferência climática
            global acontece dentro da maior floresta tropical do planeta — e a
            cidade respondeu ao desafio com um plano urbanístico que tenta unir
            <strong> infraestrutura permanente</strong> e{" "}
            <strong>vocação ambiental</strong>. O Parque da Cidade é a peça
            central dessa resposta: um equipamento que servirá ao evento e,
            sobretudo, à população nas décadas seguintes.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            Foi nesse cenário que a Lesco entrou — não como fornecedora pontual,
            mas como parceira técnica de um projeto que precisava resolver, com
            elegância, uma equação difícil: revestir externamente uma fachada
            exposta ao clima equatorial, com a leitura cálida da madeira, sem
            herdar suas fragilidades. A resposta foi o{" "}
            <strong>Lesco Green Shield 184x20</strong> na cor{" "}
            <strong>Red Cedar</strong>, um forro em WPC que reproduz o veio da
            madeira natural com uma diferença essencial: ele foi projetado para
            durar.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80">
            O Brasil tem uma assinatura própria quando o assunto é construção
            sustentável: unir a estética da natureza à precisão da engenharia.
            No Parque da Cidade, essa assinatura ganha escala — um palco global
            revestido por um material que fala a língua do clima, da cultura e
            do legado urbano. É a prova de que o país não apenas acompanha
            tendências; <strong>lidera</strong> o diálogo entre tecnologia,
            conforto e responsabilidade ambiental.
          </p>
        </div>

        {/* Image pair */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
                <img src={detailImg1} alt="Detalhe de fachada em madeira ecológica" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 font-display italic font-light text-[13px] text-dark/65">
                Leitura cálida e contínua: o veio do Red Cedar reproduz o
                conforto visual da madeira natural.
              </figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
                <img src={detailImg2} alt="Encontros e arremates do forro externo" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 font-display italic font-light text-[13px] text-dark/65">
                Encontros resolvidos no detalhe — sombra, profundidade e
                estanqueidade trabalhando juntos.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Pull quote 1 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24">
          <blockquote className="max-w-[860px] mx-auto text-center">
            <span aria-hidden className="block font-display text-[56px] leading-none text-dark/30 mb-2">"</span>
            <p className="font-display italic font-light text-[24px] md:text-[32px] leading-[1.3] tracking-[-0.01em] text-dark">
              Especificar com responsabilidade é escolher o material que ainda
              vai estar bonito quando o evento já tiver virado memória.
            </p>
            <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/55">
              — Equipe técnica Lesco
            </footer>
          </blockquote>
        </div>

        {/* Section 2 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24 max-w-[1024px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50 mb-3">
            02 — Material
          </p>
          <h2 className="font-display font-light text-[26px] md:text-[34px] tracking-[-0.01em] text-dark mb-6">
            Green Shield 184x20 em Red Cedar: a anatomia da escolha
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            O <strong>Lesco Green Shield 184x20</strong> nasce de um processo de
            extrusão que combina fibras vegetais recicladas e polímeros
            estabilizados. Não é madeira pintada de plástico, nem plástico
            disfarçado de madeira: é um <strong>compósito</strong> projetado
            desde a primeira linha do desenho industrial para entregar a
            experiência sensorial da madeira com o desempenho técnico que o
            ambiente externo exige. A largura de 184mm e a espessura de 20mm
            foram calibradas para criar planicidade visual em grandes panos de
            fachada, ao mesmo tempo em que oferecem a rigidez necessária para
            vencer os vãos típicos de subestrutura metálica.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-8">
            A cor <strong>Red Cedar</strong>, escolhida para o Parque da
            Cidade, não é gratuita. Ela dialoga com a paleta da paisagem
            amazônica — os tons quentes da terra, a luz filtrada pela floresta,
            a presença ancestral da madeira na arquitetura ribeirinha — e
            entrega ao projeto uma camada de <em>pertencimento</em> que
            materiais genéricos jamais alcançariam. É a sofisticação se
            apresentando como continuidade do lugar, não como imposição.
          </p>
          <ul className="space-y-4 font-body font-light text-[15px] md:text-[16px] leading-[1.65] text-dark/80">
            {[
              ["Estabilidade dimensional e umidade:", "não apodrece, não empena, não absorve água — característica decisiva para o regime chuvoso amazônico."],
              ["Resistência a pragas e fungos:", "dispensa tratamentos químicos recorrentes contra cupins, brocas e mofo, reduzindo passivo ambiental."],
              ["Estabilidade UV:", "pigmentação na massa e aditivos anti-UV preservam cor e textura sob radiação solar intensa."],
              ["Baixa manutenção (OPEX):", "limpeza simples com água e sabão neutro substitui ciclos de lixamento, repintura e envernizamento."],
              ["Acabamento premium:", "fixação oculta, superfície contínua e leitura estética impecável a curta e longa distância."],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-4">
                <span className="text-dark/40 mt-[12px] block w-4 h-px bg-dark/40 shrink-0" />
                <span>
                  <strong className="text-dark">{term}</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Wide hero image */}
        <div className="px-6 md:px-16 lg:px-28 mt-14 md:mt-20">
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
              <img src={wideImg} alt="Vista ampla da fachada em WPC Red Cedar" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <figcaption className="mt-4 text-center font-display italic font-light text-[13px] md:text-[14px] text-dark/65">
              A fachada como narrativa contínua: cor, modulação e ritmo
              compondo a leitura urbana do edifício.
            </figcaption>
          </figure>
        </div>

        {/* Pull quote 2 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24">
          <blockquote className="max-w-[860px] mx-auto">
            <span aria-hidden className="block font-display text-[56px] leading-none text-dark/30 mb-2">"</span>
            <p className="font-display italic font-light text-[22px] md:text-[28px] leading-[1.35] tracking-[-0.01em] text-dark">
              Luxo funcional é beleza atemporal com desempenho mensurável em
              uso real. É o que separa um material de uma especificação
              responsável.
            </p>
          </blockquote>
        </div>

        {/* Section 3 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24 max-w-[1024px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50 mb-3">
            03 — Engenharia
          </p>
          <h2 className="font-display font-light text-[26px] md:text-[34px] tracking-[-0.01em] text-dark mb-6">
            Engenharia que sustenta a estética
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            Nenhum produto, por melhor que seja, sobrevive a um projeto mal
            executado — e nenhum projeto, por mais ambicioso, atravessa o tempo
            sem o material certo. A performance da fachada do Parque da Cidade
            nasce desse encontro: produto e projeto executivo desenhados juntos,
            em diálogo constante entre fabricante, escritório de arquitetura e
            equipe de obra. O resultado é uma solução replicável, documentada e
            previsível — três adjetivos que valem ouro em obras de
            referência.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-8">
            Para que a leitura final fosse contínua e a manutenção, mínima, a
            implantação obedeceu a premissas claras:
          </p>
          <ul className="space-y-4 font-body font-light text-[15px] md:text-[16px] leading-[1.65] text-dark/80">
            {[
              ["Estrutura de apoio dimensionada:", "vãos usuais entre 60 e 80 cm, conforme cálculo, garantindo rigidez e planicidade do conjunto."],
              ["Modulação inteligente:", "paginação de barras e cortes otimizados para reduzir perdas de material e acelerar a montagem em obra."],
              ["Ventilação do respaldo:", "câmara de ar contínua para controle de dilatação térmica e do microclima por trás do forro."],
              ["Arremates e encontros resolvidos:", "perfis de finalização garantindo continuidade visual, estanqueidade e proteção contra infiltração."],
              ["Operação simplificada:", "rotina de limpeza periódica com água e sabão neutro mantém a aparência estável por anos."],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-4">
                <span className="text-dark/40 mt-[12px] block w-4 h-px bg-dark/40 shrink-0" />
                <span>
                  <strong className="text-dark">{term}</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Triptych */}
        <div className="px-6 md:px-16 lg:px-28 mt-14 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {[
              [detailImg3, "Subestrutura ventilada por trás do forro."],
              [detailImg4, "Modulação contínua, sem interrupções visuais."],
              [detailImg5, "Encontros resolvidos com perfis de arremate."],
            ].map(([src, cap]) => (
              <figure key={cap}>
                <div className="relative aspect-square overflow-hidden rounded-[10px]">
                  <img src={src} alt={cap} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <figcaption className="mt-3 font-display italic font-light text-[13px] text-dark/65">{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Section 4 — Comparison */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24 max-w-[1024px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50 mb-3">
            04 — Ciclo de vida
          </p>
          <h2 className="font-display font-light text-[26px] md:text-[34px] tracking-[-0.01em] text-dark mb-6">
            WPC Lesco x madeira natural: a conta que importa
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            Em climas severos como o amazônico, decisões baseadas apenas no
            menor custo inicial costumam cobrar a conta no futuro — e essa
            conta, quando chega, vem em forma de retrabalho, paralisação,
            substituição precoce e desgaste de imagem do empreendimento. Olhar
            para o <strong>ciclo de vida</strong> do material é olhar para o
            CAPEX e o OPEX como duas faces da mesma moeda.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-8">
            A tabela abaixo sintetiza a leitura técnica que vem orientando
            arquitetos e gestores de patrimônio em obras de referência —
            aquelas que precisam continuar bonitas e funcionais muito depois
            do corte de fita:
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
                  ["Umidade e intempéries", "WPC Lesco permanece estável; madeira incha, racha e exige retrabalhos sucessivos."],
                  ["Pragas e fungos", "WPC Lesco não atrai cupins nem mofo; madeira depende de tratamentos químicos periódicos."],
                  ["Exposição UV", "WPC Lesco preserva cor e textura por anos; madeira desbota rapidamente e perde leitura."],
                  ["Manutenção (OPEX)", "WPC Lesco pede limpeza simples; madeira demanda lixamento, repintura e verniz em ciclos curtos."],
                  ["Vida útil esperada", "WPC Lesco entrega décadas de desempenho estável; madeira exige reposição parcial recorrente."],
                ].map(([crit, desc]) => (
                  <tr key={crit} className="border-t border-dark/10">
                    <td className="p-4 font-medium text-dark align-top w-[35%]">{crit}</td>
                    <td className="p-4 leading-[1.6]">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80">
            A vantagem é objetiva: <strong>aparência estável</strong>,{" "}
            <strong>risco técnico reduzido</strong> e{" "}
            <strong>previsibilidade financeira</strong>. Em uma obra do porte
            do Parque da Cidade, esses três atributos não são luxo — são
            requisito.
          </p>
        </div>

        {/* Pull quote 3 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24">
          <blockquote className="max-w-[860px] mx-auto text-center">
            <span aria-hidden className="block font-display text-[56px] leading-none text-dark/30 mb-2">"</span>
            <p className="font-display italic font-light text-[24px] md:text-[32px] leading-[1.3] tracking-[-0.01em] text-dark">
              A fachada deixa de ser cobertura e se torna mídia. Cada
              transmissão, cada visita técnica, cada foto carrega a narrativa
              material do lugar.
            </p>
          </blockquote>
        </div>

        {/* Section 5 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24 max-w-[1024px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50 mb-3">
            05 — Branding urbano
          </p>
          <h2 className="font-display font-light text-[26px] md:text-[34px] tracking-[-0.01em] text-dark mb-6">
            A fachada como linguagem de cidade
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            Em um evento global da magnitude da COP30, a arquitetura assume um
            papel que vai muito além do funcional. Cada enquadramento de
            câmera, cada transmissão ao vivo, cada visita de delegação
            estrangeira é uma oportunidade de comunicar — sem palavras — o que
            o país pensa, valoriza e produz. A fachada, nesse contexto, é uma
            <strong> declaração</strong>.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80">
            Ao adotar o WPC Lesco no Parque da Cidade, Belém comunica ao mundo
            uma mensagem clara e direta: o futuro da madeira é{" "}
            <strong>responsável, técnico e belo</strong>. É possível ter
            calidez sem desmatar, durabilidade sem dependência química,
            sofisticação sem importação. É possível, em outras palavras,
            construir com identidade brasileira e padrão internacional ao
            mesmo tempo.
          </p>
        </div>

        {/* Final image */}
        <div className="px-6 md:px-16 lg:px-28 mt-14 md:mt-20">
          <figure>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[10px]">
              <img src={detailImg6} alt="Vista urbana do empreendimento" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <figcaption className="mt-4 text-center font-display italic font-light text-[13px] md:text-[14px] text-dark/65">
              O legado para Belém: um equipamento urbano que continua falando
              com a cidade muito depois do evento.
            </figcaption>
          </figure>
        </div>

        {/* Section 6 */}
        <div className="px-6 md:px-16 lg:px-28 mt-16 md:mt-24 pb-16 md:pb-24 max-w-[1024px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50 mb-3">
            06 — Legado
          </p>
          <h2 className="font-display font-light text-[26px] md:text-[34px] tracking-[-0.01em] text-dark mb-6">
            Depois do evento, o legado
          </h2>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80 mb-5">
            A COP30 vai terminar; a cidade continua. As delegações vão embora,
            os holofotes mudam de endereço — e o que sobra são os equipamentos
            urbanos que a população vai herdar. É aí que a especificação
            silenciosa de um forro externo se revela como uma das decisões
            mais consequentes do projeto: ela define quanto tempo a obra vai
            continuar parecendo nova, quanto recurso público será destinado à
            sua manutenção e que tipo de imagem a cidade vai conservar de si
            mesma nas próximas décadas.
          </p>
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.8] text-dark/80">
            A escolha do WPC Lesco assegura que o forro do Parque da Cidade
            mantenha integridade, cor e desempenho por anos com intervenção
            mínima. É assim, na soma de decisões aparentemente discretas, que
            transformamos a exigência de um palco global em{" "}
            <strong>valor urbano duradouro</strong> — para Belém, para a
            Amazônia e para o Brasil que projeta, com método e propósito, para
            o mundo.
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
