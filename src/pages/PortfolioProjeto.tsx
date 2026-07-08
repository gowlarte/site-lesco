import { useParams } from "react-router-dom";
import { Link } from "@/components/AppLink";
import { getProjetoBySlug, projetos } from "@/data/projetos";
import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";

const PortfolioProjeto = () => {
  const { slug } = useParams();
  const projeto = getProjetoBySlug(slug);

  if (!projeto) {
    return (
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 py-20">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-6">
            {t("Portfólio")}
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-normal text-dark mb-6">
            {t("Projeto não encontrado.")}
          </h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity"
          >
            {t("Ver todos os projetos")}
          </Link>
        </section>
      </main>
    );
  }


  const ficha: Array<[string, string]> = [
    [t("Local"), projeto.local],
    [t("Ano"), projeto.ano],
    [t("Área"), projeto.area],
    [t("Arquitetura"), projeto.arquitetura],
  ];

  return (
    <>
      <SEO
        title={`${projeto.nome} — Portfólio Lesco`}
        description={projeto.descricao.slice(0, 155)}
        path={`/projetos/${projeto.slug}`}
        image={projeto.imagem}
        type="article"
      />
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
                {t("Portfólio")}
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
                {t("Sobre o projeto")}
              </p>
              <p className="font-body text-base md:text-lg leading-[1.7] text-dark/80 text-slate-500">
                {projeto.descricao}
              </p>
            </div>
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                {t("Desafio")}
              </p>
              <p className="font-body text-base leading-[1.7] text-dark/80 text-gray-500">{projeto.desafio}</p>
            </div>
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                {t("Solução")}
              </p>
              <p className="font-body text-base leading-[1.7] text-dark/80 text-gray-500">{projeto.solucao}</p>
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-4 text-gray-950">
                {t("Ficha técnica")}
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
                {t("Produtos aplicados")}
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
                alt={`${projeto.nome} — ${t("imagem")} ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </section>

      </main>
    </>
  );
};

export default PortfolioProjeto;
