import { Link, useParams } from "react-router-dom";
import { getProjetoBySlug, projetos } from "@/data/projetos";

const PortfolioProjeto = () => {
  const { slug } = useParams();
  const projeto = getProjetoBySlug(slug);

  if (!projeto) {
    return (
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 py-20">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-6">
            Portfólio
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-normal text-dark mb-6">
            Projeto não encontrado.
          </h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity"
          >
            Ver todos os projetos
          </Link>
        </section>
      </main>
    );
  }

  const indexAtual = projetos.findIndex((p) => p.slug === projeto.slug);
  const proximo = projetos[(indexAtual + 1) % projetos.length];

  const ficha: Array<[string, string]> = [
    ["Local", projeto.local],
    ["Ano", projeto.ano],
    ["Área", projeto.area],
    ["Arquitetura", projeto.arquitetura],
  ];

  return (
    <>
      <title>{`${projeto.nome} — Portfólio Lesco`}</title>
      <meta name="description" content={projeto.descricao.slice(0, 155)} />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px] flex flex-col gap-[10px]">
        <section
          className="relative rounded-[10px] overflow-hidden min-h-[60vh] md:min-h-[75vh] flex items-end"
        >
          <img
            src={projeto.imagem}
            alt={projeto.nome}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay para contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
            <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-white/80 mb-6">
              <Link to="/portfolio" className="hover:text-white transition-colors">
                Portfólio
              </Link>
              <span className="mx-2">/</span>
              {projeto.linha}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-white max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              {projeto.nome}
            </h1>
          </div>
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                Sobre o projeto
              </p>
              <p className="font-body text-base md:text-lg leading-[1.7] text-dark/80 text-slate-500">
                {projeto.descricao}
              </p>
            </div>
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                Desafio
              </p>
              <p className="font-body text-base leading-[1.7] text-dark/80 text-gray-500">{projeto.desafio}</p>
            </div>
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                Solução
              </p>
              <p className="font-body text-base leading-[1.7] text-dark/80 text-gray-500">{projeto.solucao}</p>
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                Ficha técnica
              </p>
              <dl className="space-y-3">
                {ficha.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-dark/10 pb-2">
                    <dt className="font-body text-sm text-dark/60 text-gray-950">{k}</dt>
                    <dd className="font-display text-sm text-dark text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                Produtos aplicados
              </p>
              <ul className="space-y-2">
                {projeto.produtos.map((prod) => (
                  <li key={prod} className="font-display text-sm text-dark">
                    {prod}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          {projeto.galeria.map((img, i) => (
            <div key={i} className="aspect-[4/3] rounded-[10px] overflow-hidden">
              <img
                src={img}
                alt={`${projeto.nome} — imagem ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-2">
              Próximo projeto
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-normal text-dark">
              {proximo.nome}
            </h2>
          </div>
          <div className="flex gap-3">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-6 py-3 rounded border border-dark/20 text-dark font-display text-[13px] uppercase tracking-[0.08em] hover:bg-dark hover:text-white transition-colors"
            >
              Ver portfólio
            </Link>
            <Link
              to={`/portfolio/${proximo.slug}`}
              className="inline-flex items-center px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity"
            >
              Próximo
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default PortfolioProjeto;
