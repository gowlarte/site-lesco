import { Link } from "react-router-dom";

const MadeiraWPC = () => {
  return (
    <>
      <title>Madeira WPC — Lesco</title>
      <meta
        name="description"
        content="Conheça a tecnologia WPC (Wood-Plastic Composite) da Lesco — um compósito sustentável de madeira e polímeros reciclados para revestimentos de alta performance."
      />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-6">
            Tecnologia
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl mb-10">
            Madeira WPC: o material do futuro.
          </h1>
          <div className="max-w-3xl space-y-6 font-body text-[16px] md:text-[18px] font-light leading-[1.65] text-dark/75">
            <p>
              WPC (Wood-Plastic Composite) é um compósito de pó de madeira natural,
              polímeros reciclados e aditivos. Resulta em um revestimento que une a
              estética da madeira ao desempenho técnico de materiais de engenharia —
              resistente à água, anti-cupim, anti-mofo e com retardância ao fogo.
            </p>
            <p>
              Cada superfície da Lesco é desenvolvida para resistir ao tempo e dispensar
              manutenção complexa, mantendo a aparência por décadas em ambientes externos
              e internos.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/orcamento"
              className="inline-flex items-center px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity duration-300"
            >
              Solicitar orçamento
            </Link>
            <Link
              to="/madeira-ecologica-lesco"
              className="inline-flex items-center px-6 py-3 rounded border border-dark text-dark font-display text-[13px] uppercase tracking-[0.08em] hover:bg-dark hover:text-white transition-colors duration-300"
            >
              Ver linha de produtos
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default MadeiraWPC;
