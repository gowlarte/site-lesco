import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";
import esquemaCamadas from "@/assets/madeira-wpc/esquema-camadas.webp";

const composicaoWPC = [
  { label: t("55% Pó de madeira"), color: "#8B5E3C", text: "#FFFFFF" },
  { label: t("35% HDPE"), color: "#C8956C", text: "#3A2A1E" },
  { label: t("10% Aditivos"), color: "#D9D9D9", text: "#3A2A1E" },
];

const composicaoPVC = [
  { label: t("35% Pó de madeira"), color: "#8B5E3C", text: "#FFFFFF" },
  { label: t("50% PVC"), color: "#C8B59A", text: "#3A2A1E" },
  { label: t("10% Composto reciclado"), color: "#9BA08F", text: "#3A2A1E" },
  { label: t("5% Aditivos"), color: "#D9D9D9", text: "#3A2A1E" },
];

const features = [
  t("10 anos de garantia"),
  t("Material 100% reciclado"),
  t("Resistente a cupim"),
  t("Hidrofóbico"),
  t("Anti-mofo"),
];

const Bar = ({ items }: { items: { label: string; color: string; text: string }[] }) => (
  <div className="flex flex-col gap-2">
    {items.map((it) => (
      <div
        key={it.label}
        className="px-5 py-4 rounded-[6px] font-display text-[12px] md:text-[13px] uppercase tracking-[0.08em]"
        style={{ background: it.color, color: it.text }}
      >
        {it.label}
      </div>
    ))}
  </div>
);

import { SEO } from "@/components/SEO";

const MadeiraWPC = () => {
  return (
    <>
      <SEO
        title={t("Madeira WPC — Lesco")}
        description={t("Wood Polymer Composite — entenda a composição da madeira ecológica Lesco e como ela se aplica nas linhas Brise, Shield, Deck, Panel e Line.")}
        path="/madeira-wpc"
      />
      <main className="min-h-screen pt-[110px] pb-[10px] px-[10px]">
        {/* HERO / TÍTULO */}
        <section className="bg-[#DBDBDB] rounded-[10px] px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-10">
          <p className="rotulo text-[#141414]/65 mb-4">
            {t("Tecnologia")}
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-[#141414] max-w-4xl">
            Wood Polymer<br />Composite
          </h1>
        </section>

        {/* COMPOSIÇÃO */}
        <section className="bg-[#DBDBDB] rounded-[10px] mt-[10px] px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Imagem do esquema de camadas */}
            <div className="flex items-center justify-center">
              <img
                src={esquemaCamadas}
                alt={t("Esquema das camadas da madeira ecológica WPC")}
                className="w-full max-w-[640px] h-auto object-contain"
              />
            </div>

            {/* Composições + textos */}
            <div className="flex flex-col gap-12">
              {/* WPC */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-8">
                <Bar items={composicaoWPC} />
                <div>
                  <p className="font-body text-[14px] md:text-[15px] font-light leading-[1.65] text-[#141414]/80">
                    {t("O WPC, por ter madeira em sua composição, tende a apresentar um visual mais natural, semelhante à madeira, enquanto o PVC tem um acabamento mais liso e uniforme.")}
                  </p>
                  <p className="mt-6 font-display rotulo text-[#141414]/65">
                    {t("Aplicado em")}
                  </p>
                  <p className="mt-2 font-display text-[14px] tracking-[0.08em] text-[#141414]">
                    Brise · Shield · Deck
                  </p>
                </div>
              </div>

              {/* PVC */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-8">
                <Bar items={composicaoPVC} />
                <div>
                  <p className="font-body text-[14px] md:text-[15px] font-light leading-[1.65] text-[#141414]/80">
                    {t("O PVC (cloreto de polivinila) é um plástico puro, enquanto o WPC (Wood Plastic Composite) é um composto de fibras de madeira e plástico.")}
                  </p>
                  <p className="mt-6 font-display rotulo text-[#141414]/65">
                    {t("Aplicado em")}
                  </p>
                  <p className="mt-2 font-display text-[14px] tracking-[0.08em] text-[#141414]">
                    Panel · Line
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-[#141414]/10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
              {features.map((f) => (
                <div key={f} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#141414]/30 flex items-center justify-center mb-3">
                    <span className="block w-2 h-2 rounded-full bg-[#141414]/60" />
                  </div>
                  <p className="font-display rotulo text-[#141414] leading-tight max-w-[140px]">
                    {f}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0D0D0D] rounded-[10px] mt-[10px] px-6 md:px-12 lg:px-20 py-16 md:py-20 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-normal text-white leading-[1.15] mb-8">
            {t("Conheça as linhas em WPC.")}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/orcamento" className="inline-flex items-center px-6 py-3 rounded-[6px] bg-[#d5b89f] text-[#141414] font-display text-[12px] uppercase tracking-[0.1em] hover:brightness-95 transition">
              {t("Solicitar orçamento")}
            </Link>
            <Link to="/madeira-ecologica-lesco" className="inline-flex items-center px-6 py-3 rounded-[6px] border border-white/40 text-white font-display text-[12px] uppercase tracking-[0.1em] hover:bg-white/10 transition">
              {t("Ver linha de produtos")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default MadeiraWPC;
