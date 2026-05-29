import { Link } from "react-router-dom";
import { projetos } from "@/data/projetos";
import { SEO } from "@/components/SEO";

const Portfolio = () => {
  return (
    <>
      <SEO
        title="Portfólio de Projetos — Lesco"
        description="Cases reais com revestimentos Lesco: residências, projetos comerciais e instalações premium em madeira ecológica."
        path="/portfolio"
        image={projetos[0]?.imagem}
      />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px] flex flex-col gap-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-6">
            Portfólio
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl">
            Projetos selecionados.
          </h1>
        </section>

        <section className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {projetos.map((p) => (
              <Link to={`/projetos/${p.slug}`} key={p.slug} className="group block">
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/60 mt-3 ml-1 text-gray-600">
                  {p.linha}
                </p>
                <h3 className="font-display text-lg font-normal text-dark ml-1 group-hover:opacity-70 transition-opacity">
                  {p.nome}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-dark mb-6">
            Quer ver seu projeto aqui?
          </h2>
          <Link
            to="/orcamento"
            className="inline-flex items-center px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity duration-300"
          >
            Falar com um especialista
          </Link>
        </section>
      </main>
    </>
  );
};

export default Portfolio;
