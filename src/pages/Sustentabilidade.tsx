import { Link } from "react-router-dom";

const pilares = [
  { titulo: "Material reciclado", texto: "Polímeros pós-consumo e pó de madeira de reflorestamento — desviando resíduos de aterros." },
  { titulo: "Vida útil longa", texto: "Garantia de 10 anos. Menos substituições, menos resíduo, menor pegada ambiental." },
  { titulo: "Manutenção mínima", texto: "Não requer vernizes, óleos ou solventes ao longo da vida útil do produto." },
  { titulo: "Certificações", texto: "ISO 9001, ISO 14001, LEED e diretrizes ESG aplicadas em toda a cadeia produtiva." },
];

const Sustentabilidade = () => {
  return (
    <>
      <title>Revestimento Sustentável — Lesco</title>
      <meta
        name="description"
        content="Compromisso ambiental da Lesco: revestimentos premium feitos com material reciclado, longa vida útil e certificações reconhecidas internacionalmente."
      />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px] flex flex-col gap-[10px]">
        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-dark/50 mb-6">
            Sustentabilidade
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl">
            Arquitetura responsável, do design ao descarte.
          </h1>
          <p className="mt-8 max-w-2xl font-body text-[16px] md:text-[18px] font-light leading-[1.65] text-dark/75">
            Acreditamos que o revestimento certo precisa ser bonito, durável e responsável
            — ao mesmo tempo. Cada produto Lesco nasce de uma cadeia produtiva que respeita
            o ciclo da matéria.
          </p>
        </section>

        <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl lg:text-[40px] font-normal text-dark mb-12">
            Nossos pilares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl">
            {pilares.map((p) => (
              <div key={p.titulo}>
                <h3 className="font-display text-xl md:text-2xl font-normal text-dark mb-3">{p.titulo}</h3>
                <p className="font-body text-[15px] font-light leading-[1.65] text-dark/70">{p.texto}</p>
              </div>
            ))}
          </div>
          <Link
            to="/orcamento"
            className="inline-flex items-center mt-14 px-6 py-3 rounded bg-dark text-white font-display text-[13px] uppercase tracking-[0.08em] hover:opacity-90 transition-opacity duration-300"
          >
            Falar com um especialista
          </Link>
        </section>
      </main>
    </>
  );
};

export default Sustentabilidade;
