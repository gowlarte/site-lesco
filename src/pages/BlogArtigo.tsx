import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";
const sideSmallImg = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85";
const sideLargeImg = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85";
const portraitImg = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85";
const productImg = "https://lesco.com.br/wp-content/uploads/2025/10/548674-1024x529.png";

const produtos = [
  { nome: "Panel PVC 00001", medida: "170X12 mm", featured: true },
  { nome: "Panel PVC 00002", medida: "170X12 mm" },
  { nome: "Panel PVC 00003", medida: "170X12 mm" },
  { nome: "Panel PVC 00004", medida: "170X12 mm" },
  { nome: "Panel PVC 00005", medida: "170X12 mm" },
];

const SectionRule = () => <div className="w-10 h-px bg-dark mt-3" />;

const BlogArtigo = () => {
  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <article className="bg-light rounded-[10px] overflow-hidden px-6 md:px-16 lg:px-24 pt-12 md:pt-16 pb-16 md:pb-20">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/60 hover:text-dark transition-colors mb-10"
        >
          <span aria-hidden>←</span> Voltar ao blog
        </Link>

        {/* Title */}
        <header className="mb-10">
          <h1 className="font-display font-bold text-[28px] md:text-[36px] lg:text-[40px] leading-[1.15] tracking-[-0.01em] text-dark">
            Superfícies e sensações, com Carlo Zaskia
          </h1>
          <SectionRule />
        </header>

        {/* Hero (cinematic) */}
        <figure>
          <div className="relative aspect-[21/8] overflow-hidden rounded-[10px]">
            <img
              src={heroImg}
              alt="Ambiente residencial com revestimento de madeira e iluminação difusa"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-5 text-center font-display italic font-light text-[14px] md:text-[15px] text-dark/70">
            "Um bom ambiente é aquele que foi pensado para guiar a sua experiência dentro dele"
          </figcaption>
        </figure>

        {/* First paragraph */}
        <div className="max-w-[920px] mx-auto mt-10">
          <p className="font-body font-light text-[13.5px] md:text-[14.5px] leading-[1.75] text-dark/85 text-center">
            Quando pensamos em arquitetura, é comum falarmos de forma, função e técnica. Mas existe
            uma camada mais silenciosa — e talvez mais poderosa — que define como um espaço é
            percebido: a sensação que ele provoca. Essa sensação nasce, quase sempre, do contato
            entre luz, matéria e ritmo. Ao longo da minha prática, aprendi que superfícies não são
            apenas acabamentos. Elas organizam o olhar, modulam o conforto e constroem a
            experiência de quem habita o espaço. Cada material carrega uma temperatura, uma textura,
            um peso visual. E a combinação entre eles é o que dá caráter a um ambiente. Materiais
            mais contínuos tendem a acalmar. Superfícies com ritmo, juntas ou variações sutis criam
            movimento e conduzem o olhar. Já os contrastes — quando bem dosados — trazem identidade
            sem gerar ruído. O segredo está no equilíbrio: permitir que o espaço respire, sem abrir
            mão de intenção.
          </p>
        </div>

        {/* Two-column: small img + quote (left) / large img (right) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-[10px] items-start">
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
              <img
                src={sideSmallImg}
                alt="Detalhe de cozinha com painéis de madeira"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <blockquote className="pl-2">
              <span aria-hidden className="font-display text-[28px] leading-none text-dark/70 mr-1 align-top">
                ❝
              </span>
              <span className="font-display italic font-light text-[17px] md:text-[19px] leading-[1.45] text-dark">
                As paredes definem a narrativa do ambiente; são elas que recebem a luz lateral, que
                enquadram o mobiliário e que sustentam a linguagem estética. Quando bem resolvidas,
                criam um pano de fundo silencioso, capaz de valorizar tudo ao redor.
              </span>
            </blockquote>
          </div>
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
              <img
                src={sideLargeImg}
                alt="Sala ampla com revestimento de madeira contínuo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Second paragraph */}
        <div className="max-w-[920px] mx-auto mt-12">
          <p className="font-body font-light text-[13.5px] md:text-[14.5px] leading-[1.75] text-dark/85 text-center">
            É por isso que, ao projetar, observo com atenção como cada plano se comporta. As paredes
            definem a narrativa do ambiente; são elas que recebem a luz lateral, que enquadram o
            mobiliário e que sustentam a linguagem estética. Quando bem resolvidas, criam um pano de
            fundo silencioso, capaz de valorizar tudo ao redor. O teto, por sua vez, é um plano
            muitas vezes negligenciado — e, paradoxalmente, um dos mais importantes. Ele influencia
            diretamente a percepção de altura, conforto acústico e continuidade visual. Um teto bem
            desenhado não se impõe, mas transforma completamente a sensação de acolhimento do
            espaço. Tenho buscado, cada vez mais, soluções que ofereçam controle estético e
            simplicidade construtiva. Materiais que permitam criar ritmo sem excesso, que dialoguem
            com diferentes escalas e que não dependam de gestos exagerados para se fazerem
            presentes.
          </p>
        </div>

        {/* Tall image */}
        <div className="mt-12">
          <div className="relative aspect-[16/12] md:aspect-[16/10] overflow-hidden rounded-[10px]">
            <img
              src={portraitImg}
              alt="Ambiente com paredes texturizadas e iluminação natural"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Closing paragraph */}
        <div className="max-w-[920px] mx-auto mt-12">
          <p className="font-body font-light text-[13.5px] md:text-[14.5px] leading-[1.75] text-dark/85 text-center">
            Nesse contexto, soluções como os revestimentos de parede e os tetos vinílicos da MONO se
            mostram especialmente interessantes. Eles trabalham a superfície de forma inteligente,
            com texturas equilibradas, leitura contínua e uma materialidade que contribui para o
            conforto visual e sensorial do ambiente. Mais do que um acabamento, esses elementos
            passam a fazer parte da arquitetura — organizando planos, suavizando transições e
            criando uma atmosfera agradável, coerente e durável. No fim, projetar é isso:
            selecionar materiais que não apenas ocupam o espaço, mas constroem sensações. Quando
            paredes e tetos dialogam entre si, o ambiente deixa de ser apenas funcional e passa a
            ser vivido com mais presença, conforto e significado.
          </p>
        </div>

        {/* Products section */}
        <section className="mt-20">
          <h2 className="font-display font-bold text-[24px] md:text-[32px] leading-[1.15] tracking-[-0.01em] text-dark">
            Conheça os revestimentos para seu próximo projeto
          </h2>
          <SectionRule />

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[10px]">
            {produtos.map((p) => (
              <div
                key={p.nome}
                className="flex flex-col rounded-[10px] border border-dark/10 overflow-hidden bg-light"
              >
                <div className="relative aspect-[4/3] bg-dark/5 overflow-hidden">
                  <img src={productImg} alt={p.nome} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <p className="font-display font-bold text-[14px] text-dark">{p.nome}</p>
                  <p className="font-body text-[12px] text-dark/60">{p.medida}</p>
                </div>
                <div className="px-4 pb-4">
                  <a
                    href="#"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-[8px] font-body text-[12px] tracking-[0.04em] transition-colors ${
                      p.featured
                        ? "bg-[#A9744F] text-white hover:brightness-110"
                        : "bg-[#F2EADD] text-dark hover:bg-[#EAE0CF]"
                    }`}
                  >
                    Ver no site <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default BlogArtigo;
