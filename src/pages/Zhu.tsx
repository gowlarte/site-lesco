import { useState } from "react";
import { Link } from "@/components/AppLink";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";
import { dadosTecnicosZhu, familiasZhu } from "@/data/zhu";
import { t } from "@/i18n/t";

import heroZhu from "@/assets/hero-home-zhuzen.webp";
import logoZhuRaw from "@/assets/linha-zhuzen-2.svg?raw";

/**
 * /zhu — visão geral da linha de bambu, no papel que /madeira-ecologica-lesco
 * tem para a AltWood: apresenta a linha e distribui para as páginas de produto.
 *
 * Antes esta rota caía em LinhaEmBreve (página de pré-lançamento com formulário
 * de newsletter). O formulário saiu porque a linha já tem catálogo e produtos
 * especificados; /echo segue em LinhaEmBreve, com o formulário dele intacto.
 */
const familias = [familiasZhu.paineis, familiasZhu.acusticos, familiasZhu.brises, familiasZhu.decks];

const atributos = [t("Ecológico"), t("Estrutural"), t("Alta eficiência"), t("Infinitas aplicações")];

const ondeUtilizar = [t("Paredes"), t("Fachadas"), t("Tetos"), t("Decks")];

const diferenciais = [
  t("Matéria-prima 100% renovável e de rápido crescimento"),
  t("Estética natural com alta durabilidade"),
  t("Aplicação versátil em interiores e mobiliário"),
  t("Fabricação artesanal com controle de qualidade"),
];

const Zhu = () => {
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title={t("Zhú — Bambu Maciço para Arquitetura | Lesco")}
        description={t("A linha Zhú reúne painéis, forros, painéis acústicos, brises e decks em bambu maciço, com opções para uso interno e externo.")}
        path="/zhu"
        image={heroZhu}
      />

      {/* HERO */}
      <section className="relative rounded-[10px] overflow-hidden min-h-[calc(100vh-120px)] flex items-center">
        <img src={heroZhu} alt="Zhú" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-16 lg:px-20 py-16 sm:py-20">
          <div className="max-w-3xl text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              {t("Bambu")}
            </span>
            <div
              className="[&>svg]:h-[56px] md:[&>svg]:h-[80px] lg:[&>svg]:h-[96px] [&>svg]:w-auto text-white mb-6"
              dangerouslySetInnerHTML={{ __html: logoZhuRaw }}
              aria-label="Zhú"
            />
            <p className="font-display font-light text-white/90 text-xl md:text-2xl lg:text-3xl leading-tight tracking-[-0.01em] mb-6">
              {t("Arquitetura em Bambu")}
            </p>
            <p className="font-body text-[15px] md:text-[16px] text-white/75 leading-relaxed max-w-xl">
              {t("Quando se especifica madeira natural em grandes áreas, o projeto precisa equilibrar estética, desempenho e manutenção. A linha Zhú apresenta revestimentos, painéis, forros, baffles, grelhas, painéis acústicos e decks em bambu maciço, com opções para uso interno e externo.")}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10">
              {atributos.map((a) => (
                <span
                  key={a}
                  className="rotulo-tec text-white/75"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <p className="rotulo-tec text-primary/65 mb-4">
          {t("Produtos")}
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 max-w-2xl">
          {t("Quatro famílias, um material.")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {familias.map((f) => (
            <Link
              key={f.slug}
              to={f.slug}
              className="group bg-white rounded-[10px] p-8 flex flex-col transition-colors hover:bg-white/70"
            >
              <div className="h-36 md:h-40 flex items-center justify-center mb-6">
                <img
                  src={f.modelos[0].imagem}
                  alt={f.nome}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-display text-xl text-dark mb-2 font-normal">{f.nome}</h3>
              <p className="rotulo-tec text-primary/65 mb-3">
                {f.modelos.length} {f.modelos.length === 1 ? t("modelo") : t("modelos")}
              </p>
              <p className="font-body text-[14px] text-primary/70 leading-relaxed flex-1">{f.intro}</p>
              <span className="inline-flex items-center gap-2 mt-6 font-display text-[12px] uppercase tracking-[0.08em] text-primary/65 group-hover:text-dark transition-colors">
                {t("Ver modelos")}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* A LINHA */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
          <div>
            <p className="rotulo-tec text-primary/65 mb-4">
              {t("A linha")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark">
              {t("Por que a Lesco desenvolveu a Zhú?")}
            </h2>
          </div>
          <div className="space-y-6">
            <p className="font-body text-[16px] md:text-[17px] text-primary/75 leading-[1.7]">
              {t("O bambu é uma das matérias-primas mais versáteis da natureza. No mercado de arquitetura, cresce a demanda por materiais de baixo impacto, alta resistência e ampla possibilidade de aplicação.")}
            </p>
            <p className="font-body text-[16px] md:text-[17px] text-primary/75 leading-[1.7]">
              {t("A partir desse contexto, a Lesco desenvolveu a linha Zhú: soluções em bambu para projetos que exigem desempenho técnico, naturalidade e expressão estética.")}
            </p>
          </div>
        </div>
      </section>

      {/* ONDE UTILIZAR */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <p className="rotulo-tec text-primary/65 mb-4">
          {t("Onde utilizar")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] mb-16">
          {ondeUtilizar.map((o) => (
            <div key={o} className="bg-white/50 rounded-[10px] px-6 py-8 text-center">
              <span className="font-display text-lg text-dark">{o}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
          <div>
            <p className="rotulo-tec text-primary/65 mb-4">
              {t("Diferenciais")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark">
              {t("O que torna")} Zhú {t("especial.")}
            </h2>
          </div>
          <ul className="divide-y divide-primary/10">
            {diferenciais.map((d, i) => (
              <li key={d} className="py-5 flex gap-4 items-start">
                <span className="font-mono text-[12px] text-primary/65 pt-1">0{i + 1}</span>
                <span className="font-body text-[16px] md:text-[17px] text-primary/80 leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DADOS TÉCNICOS */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <button
          onClick={() => setSpecsOpen(!specsOpen)}
          className="rotulo-tec text-primary/65 hover:text-dark transition-colors cursor-pointer"
        >
          {t("Dados técnicos")} {specsOpen ? "−" : "+"}
        </button>

        {specsOpen && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 animate-fade-in">
            {dadosTecnicosZhu.map((d) => (
              <div key={d.rotulo}>
                <h3 className="rotulo-tec text-primary/65 mb-2">
                  {d.rotulo}
                </h3>
                <div className="h-px bg-primary/10 mb-3" />
                <p className="font-body text-[14px] text-primary/80 leading-relaxed">{d.valor}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <SecaoOrcamento />
    </main>
  );
};

export default Zhu;
