import { Link } from "react-router-dom";

const heroImg =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";
const portraitImg =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85";
const interiorImg =
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85";
const wideImg =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=85";

const relacionados = Array.from({ length: 5 }).map((_, i) => ({
  nome: `Panel PVC 0000${i + 1}`,
  medida: "170x12 mm",
  imagem:
    "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&w=600&q=85",
}));

const BlogArtigo = () => {
  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      {/* Card editorial principal */}
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
            Superfícies e sensações, com Carlo Zaskia
          </h1>
          <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60">
            <span>AltWood</span>
            <span className="w-1 h-1 rounded-full bg-dark/40" />
            <span>12 Mar 2026</span>
            <span className="w-1 h-1 rounded-full bg-dark/40" />
            <span>6 min de leitura</span>
          </div>
        </header>

        {/* Hero image */}
        <div className="px-6 md:px-16 lg:px-28">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[10px]">
            <img
              src={heroImg}
              alt="Ambiente em madeira ecológica"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="mt-5 text-center font-display italic font-light text-[14px] md:text-[15px] text-dark/70">
            "Um bom ambiente é aquele que faz pensar, para guiar a sua
            experiência dentro dele."
          </p>
        </div>

        {/* Intro */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16">
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 max-w-[960px] mx-auto">
            Quando pensamos em arquitetura, é comum focarmos de forma fungível e
            técnica. Mas existe uma camada mais silenciosa — e talvez mais
            potente — que define como um espaço é percebido e usado. Para Carlo
            Zaskia, arquiteto reconhecido por projetos residenciais de alta
            performance, essa camada nasce do encontro entre matéria, luz e
            tempo. "Os materiais que escolhemos não são apenas acabamentos,
            eles dão estrutura à experiência sensorial do habitar", diz ele.
            Cada superfície carrega uma intenção, uma textura, um peso visual
            — e é nessa coreografia silenciosa que um projeto se torna
            memorável.
          </p>
        </div>

        {/* 2-col image block with quote */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-[35%_65%] gap-[10px]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
            <img
              src={portraitImg}
              alt="Carlo Zaskia"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden rounded-[10px]">
            <img
              src={interiorImg}
              alt="Interior projetado"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16">
          <blockquote className="max-w-[760px] mx-auto">
            <span
              aria-hidden
              className="block font-display text-[40px] leading-none text-dark/40 mb-2"
            >
              "
            </span>
            <p className="font-display italic font-light text-[22px] md:text-[28px] leading-[1.35] tracking-[-0.01em] text-dark">
              As paredes definem a narrativa do ambiente; são elas que recebem
              a luz lateral, que enquadram o mobiliário e que sustentam a
              linguagem estética. Quando bem resolvidas, criam um plano de
              fundo silencioso, capaz de valorizar tudo ao redor.
            </p>
          </blockquote>
        </div>

        {/* Body text */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16">
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 max-w-[960px] mx-auto">
            É por isto que, em projetos de alto padrão, observamos uma atenção
            cada vez maior à escolha de superfícies. Os painéis definem o
            ritmo do ambiente, oferecem aconchego visual ou marcam um eixo
            estrutural que orienta toda a leitura espacial. Carlo procura,
            em cada novo projeto, equilibrar materiais com camadas distintas
            — uma de fundo silencioso, capaz de valorizar tudo ao redor, e
            outra de protagonismo, que carrega a personalidade do morador.
            "É preciso saber quando recuar e quando aparecer. Materiais
            naturais ajudam nisso porque envelhecem bem e ganham vida com o
            uso", reforça.
          </p>
        </div>

        {/* Wide image */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
            <img
              src={wideImg}
              alt="Detalhe de revestimento"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Closing text */}
        <div className="px-6 md:px-16 lg:px-28 mt-12 md:mt-16 pb-16 md:pb-24">
          <p className="font-body font-light text-[15px] md:text-[16px] leading-[1.75] text-dark/80 max-w-[960px] mx-auto">
            Nesse contexto, soluções como os revestimentos em painéis e os
            brises entram em cena como modeladores invisíveis do ambiente. Eles
            trabalham a superfície de forma delicada, com texturas equilibradas,
            sem nunca roubar a atenção principal. Para Carlo, isso é o que
            separa um projeto correto de um projeto memorável: a capacidade de
            criar ambiência sem alarde, deixando que a arquitetura — e quem a
            habita — ganhe presença e significado.
          </p>
        </div>
      </article>

      {/* Produtos relacionados */}
      <section className="bg-light rounded-[10px] mt-[10px] px-6 md:px-16 lg:px-28 py-12 md:py-16">
        <h2 className="font-display font-light text-[24px] md:text-[32px] tracking-[-0.01em] text-dark mb-10">
          Conheça os revestimentos para seu próximo projeto
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[10px]">
          {relacionados.map((item, i) => (
            <Link
              key={i}
              to="/altwood-panel"
              className="group flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden rounded-[10px] bg-dark/5">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <p className="font-display text-[14px] text-dark">
                  {item.nome}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-dark/55 mt-1">
                  {item.medida}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogArtigo;
