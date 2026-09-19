import { Link } from "@/components/AppLink";
import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";

const artigos = [
  {
    slug: "madeira-ecologica-arquitetura",
    categoria: t("Madeira Ecológica"),
    titulo: t("Madeira ecológica: o futuro das fachadas sustentáveis"),
    resumo:
      t("Como a madeira plástica de alta performance está redefinindo brises, decks e revestimentos em projetos contemporâneos."),
    data: t("12 Mar 2026"),
    leitura: t("6 min"),
    imagem:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "bambu-na-arquitetura",
    categoria: "Zhú",
    titulo: t("Bambu: o material milenar que voltou a ser tendência"),
    resumo:
      t("Forros, luminárias e revestimentos em bambu trazem aconchego e identidade aos interiores de alto padrão."),
    data: t("28 Fev 2026"),
    leitura: t("5 min"),
    imagem:
      "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "acustica-em-home-cinemas",
    categoria: "Echo",
    titulo: t("Acústica perfeita: tecidos moldados para home cinemas"),
    resumo:
      t("Entenda como o tratamento acústico transforma a experiência sonora em estúdios e salas residenciais."),
    data: t("14 Fev 2026"),
    leitura: t("7 min"),
    imagem:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "pedra-flexivel-fachadas",
    categoria: "Geo",
    titulo: t("Pedra flexível: leveza e resistência em fachadas"),
    resumo:
      t("A revolução das pedras naturais ultrafinas para revestimentos internos e externos."),
    data: t("01 Fev 2026"),
    leitura: t("4 min"),
    imagem:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "tendencias-arquitetura-2026",
    categoria: t("Tendências"),
    titulo: t("5 tendências da arquitetura sustentável em 2026"),
    resumo:
      t("Materiais reciclados, biofilia e integração com a natureza ditam o ritmo dos projetos deste ano."),
    data: t("20 Jan 2026"),
    leitura: t("8 min"),
    imagem:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "deck-area-externa",
    categoria: t("Madeira Ecológica"),
    titulo: t("Como escolher o deck ideal para sua área externa"),
    resumo:
      t("Durabilidade, estética e manutenção: tudo o que você precisa avaliar antes de instalar um deck."),
    data: t("08 Jan 2026"),
    leitura: t("5 min"),
    imagem:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "biofilia-projetos",
    categoria: t("Inspiração"),
    titulo: t("Design biofílico: trazendo a natureza para dentro"),
    resumo:
      t("Projetos que integram materiais naturais e luz para criar ambientes mais saudáveis e produtivos."),
    data: t("22 Dez 2025"),
    leitura: t("6 min"),
    imagem:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "manutencao-revestimentos",
    categoria: t("Guias"),
    titulo: t("Guia de manutenção para revestimentos premium"),
    resumo:
      t("Cuidados essenciais para preservar a beleza e a vida útil dos seus revestimentos arquitetônicos."),
    data: t("10 Dez 2025"),
    leitura: t("4 min"),
    imagem:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
  },
];

const Blog = () => {
  const [destaque, ...demais] = artigos;

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <SEO
        title={t("Blog — Lesco")}
        description={t("Ideias, materiais e inspiração para a arquitetura do amanhã. Artigos sobre madeira ecológica, sustentabilidade e tendências de projeto.")}
        path="/blog"
        image={destaque.imagem}
        type="article"
      />
      {/* Header editorial */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-16 md:py-24 mb-[10px]">
        <p className="rotulo-tec text-primary/65 mb-6">
          {t("Blog Lesco")}
        </p>
        <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl">
          {t("Ideias, materiais e inspiração para a arquitetura do amanhã.")}
        </h1>
      </section>

      {/* Destaque */}
      <section className="bg-light rounded-[10px] overflow-hidden mb-[10px]">
        <Link
          to={`/blog/${destaque.slug}`}
          className="group grid grid-cols-1 md:grid-cols-2 gap-0"
        >
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            <img
              src={destaque.imagem}
              alt={destaque.titulo}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <div className="flex items-center gap-3 rotulo-tec text-primary/65 mb-6">
              <span>{destaque.categoria}</span>
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              <span>{destaque.data}</span>
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              <span>{destaque.leitura}</span>
            </div>
            <h2 className="font-display font-extralight text-[28px] md:text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.015em] text-dark mb-6">
              {destaque.titulo}
            </h2>
            <p className="font-body text-[15px] md:text-[17px] font-light leading-relaxed text-primary/70 max-w-[560px] mb-8">
              {destaque.resumo}
            </p>
            <span className="inline-flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.1em] text-dark group-hover:gap-3 transition-all duration-300">
              {t("Ler artigo")} <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      </section>

      {/* Grid de artigos */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {demais.map((artigo) => (
            <Link
              key={artigo.slug}
              to={`/blog/${artigo.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] mb-5">
                <img
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-2 rotulo-tec text-primary/65 mb-3">
                <span>{artigo.categoria}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>{artigo.data}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>{artigo.leitura}</span>
              </div>
              <h3 className="font-display font-extralight text-[22px] md:text-[24px] leading-[1.15] tracking-[-0.01em] text-dark mb-3 group-hover:opacity-70 transition-opacity duration-300">
                {artigo.titulo}
              </h3>
              <p className="font-body text-[14px] font-light leading-relaxed text-primary/65">
                {artigo.resumo}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
