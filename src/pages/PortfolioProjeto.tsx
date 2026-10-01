import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "@/components/AppLink";
import { getProjetoBySlug, projetos } from "@/data/projetos";
import { Lightbox } from "@/components/Lightbox";
import { SEO } from "@/components/SEO";
import { Tour360 } from "@/components/Tour360";
import { getTour } from "@/data/tours";
import { cn } from "@/lib/utils";
import { t } from "@/i18n/t";

const PortfolioProjeto = () => {
  const { slug } = useParams();
  const projeto = getProjetoBySlug(slug);
  /** Foto aberta em tela cheia. `null` = grade normal. */
  const [ampliada, setAmpliada] = useState<number | null>(null);

  if (!projeto) {
    return (
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 py-20">
          <p className="rotulo text-primary/65 mb-6">
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


  /** Mesmo texto no alt da grade, no título do visor e no rótulo do botão. */
  const legendaFoto = (i: number) => `${projeto.nome}, ${t("imagem")} ${i + 1}`;

  const tour = getTour(projeto.tour);
  /**
   * Obra que entrou pelo tour ainda não tem case escrito. Sem isto, a coluna
   * de texto seria um vazio de dois terços ao lado da ficha.
   */
  const temTexto = Boolean(projeto.descricao || projeto.desafio || projeto.solucao);

  // Linha de ficha sem valor não vira "—" na tela: sai da lista. Numa obra sem
  // metragem e sem escritório, quatro linhas viravam duas de travessão.
  const ficha: Array<[string, string]> = (
    [
      [t("Local"), projeto.local],
      [t("Ano"), projeto.ano],
      [t("Área"), projeto.area],
      [t("Arquitetura"), projeto.arquitetura],
    ] as Array<[string, string]>
  ).filter(([, v]) => v && v !== "—");

  return (
    <>
      <SEO
        title={`${projeto.nome} — Portfólio Lesco`}
        description={
          projeto.descricao.slice(0, 155) ||
          `${projeto.nome} — ${projeto.local}. ${
            tour ? t("Visita 360 pela obra entregue, com a Lesco.") : t("Obra com revestimentos Lesco.")
          }`
        }
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
            <p className="rotulo text-white/80 mb-6">
              <Link to="/portfolio" className="hover:text-white transition-colors">
                {t("Portfólio")}
              </Link>
              <span className="mx-2">/</span>
              {projeto.linha || projeto.local}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-white max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              {projeto.nome}
            </h1>
            {/* Âncora, e não botão de abrir: o visor está mais abaixo na
                própria página, e carrega sozinho quando chega perto. */}
            {tour && (
              <a
                href="#visita-360"
                className="inline-flex items-center mt-8 px-6 py-3 rounded bg-white text-dark font-display text-[13px] uppercase tracking-[0.08em] hover:bg-white/85 transition-colors duration-300"
              >
                {t("Ver a visita 360")}
              </a>
            )}
          </div>
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {temTexto && (
            <div className="lg:col-span-2 space-y-10">
              {projeto.descricao && (
                <div>
                  <p className="rotulo mb-4 text-gray-950">
                    {t("Sobre o projeto")}
                  </p>
                  <p className="font-body text-base md:text-lg leading-[1.7] text-slate-500">
                    {projeto.descricao}
                  </p>
                </div>
              )}
              {projeto.desafio && (
                <div>
                  <p className="rotulo mb-4 text-gray-950">
                    {t("Desafio")}
                  </p>
                  <p className="font-body text-base leading-[1.7] text-gray-500">{projeto.desafio}</p>
                </div>
              )}
              {projeto.solucao && (
                <div>
                  <p className="rotulo mb-4 text-gray-950">
                    {t("Solução")}
                  </p>
                  <p className="font-body text-base leading-[1.7] text-gray-500">{projeto.solucao}</p>
                </div>
              )}
            </div>
          )}

          {/* Sem texto ao lado, a ficha ocupa a linha inteira — mas não estica
              junto: um `dl` de duas colunas com 900px de largura separaria
              rótulo e valor por meia tela. */}
          <aside className={cn("space-y-8", !temTexto && "lg:col-span-3 lg:max-w-sm")}>
            <div>
              <p className="rotulo mb-4 text-gray-950">
                {t("Ficha técnica")}
              </p>
              <dl className="space-y-3">
                {ficha.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-primary/10 pb-2">
                    <dt className="font-body text-sm text-gray-950">{k}</dt>
                    <dd className="font-display text-sm text-dark text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {projeto.produtos.length > 0 && (
              <div>
                <p className="rotulo mb-4 text-gray-950">
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
            )}
          </aside>
        </section>

        {tour && <Tour360 tour={tour} obra={projeto.nome} />}

        {/* A grade recorta em 4:3 e desenha a foto pequena. O clique abre o
            arquivo inteiro, no tamanho em que ele veio — ver Lightbox.tsx. */}
        {projeto.galeria.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          {projeto.galeria.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAmpliada(i)}
              aria-label={`${t("Ampliar")}: ${legendaFoto(i)}`}
              className="group aspect-[4/3] rounded-[10px] overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <img
                src={img}
                alt={legendaFoto(i)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </section>
        )}

        <Lightbox
          imagens={projeto.galeria}
          indice={ampliada}
          onIndice={setAmpliada}
          legenda={legendaFoto}
        />

      </main>
    </>
  );
};

export default PortfolioProjeto;
