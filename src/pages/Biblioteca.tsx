import { Link } from "react-router-dom";

const recursos = [
  { titulo: "Catálogo geral", desc: "PDF com a linha completa de produtos e especificações." },
  { titulo: "Fichas técnicas", desc: "Documentação técnica por produto." },
  { titulo: "Blocos 3D", desc: "Arquivos para SketchUp, Revit e AutoCAD." },
  { titulo: "Imagens HD", desc: "Banco de imagens para apresentações de projeto." },
];

const Biblioteca = () => {
  return (
    <>
      <title>Biblioteca de Recursos — Lesco</title>
      <meta
        name="description"
        content="Acesse catálogos, fichas técnicas, blocos 3D e materiais de apoio para arquitetos e especificadores."
      />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px] flex flex-col gap-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-6">
            Biblioteca
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl">
            Recursos para arquitetos e especificadores.
          </h1>
          <p className="mt-8 max-w-2xl font-body text-[16px] md:text-[18px] font-light leading-[1.65] text-dark/75">
            Em breve você poderá baixar catálogos, fichas técnicas e blocos 3D
            diretamente desta página. Enquanto isso, fale com nosso time para
            receber o material por e-mail.
          </p>
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
            {recursos.map((r) => (
              <div
                key={r.titulo}
                className="rounded-[10px] border border-dark/10 p-8 bg-white/40 hover:bg-white transition-colors duration-300"
              >
                <h3 className="font-display text-xl font-normal text-dark mb-3">{r.titulo}</h3>
                <p className="font-body text-[14px] font-light leading-[1.6] text-dark/70 mb-6 text-slate-950">{r.desc}</p>
                <span className="font-body text-[11px] uppercase tracking-[0.12em] text-dark/50 text-gray-950">
                  Em breve
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/orcamento"
            className="inline-flex items-center mt-12 px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity duration-300"
          >
            Solicitar materiais
          </Link>
        </section>
      </main>
    </>
  );
};

export default Biblioteca;
