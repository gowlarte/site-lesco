import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GhlForm } from "@/components/GhlForm";

import logoGeoRaw from "@/assets/linha-italflex-2.svg?raw";

import heroTravertino from "@/assets/geo/geo-hero-travertino.jpg";
import imgBanheiro from "@/assets/geo/geo-banheiro.jpg";
import imgSala from "@/assets/geo/geo-sala.jpg";
import imgFachada from "@/assets/geo/geo-fachada.jpg";
import imgPedra from "@/assets/geo/geo-pedra-fundo.png.asset.json";

import swatchTravertino from "@/assets/geo/swatch-travertino.jpg";
import swatchSlate from "@/assets/geo/swatch-slate.jpg";
import swatchRipple from "@/assets/geo/swatch-ripple.jpg";
import swatchGranite from "@/assets/geo/swatch-granite.jpg";

const aplicacoes = [
  {
    img: imgFachada,
    titulo: "Fachadas",
    descricao:
      "Revestimento contínuo, leve e resistente às intempéries — aplicado em grandes áreas com baixo custo de instalação.",
  },
  {
    img: imgBanheiro,
    titulo: "Áreas molhadas",
    descricao:
      "Cozinhas, banheiros e ambientes técnicos com a textura da pedra natural e alta resistência à umidade.",
  },
  {
    img: imgSala,
    titulo: "Interiores",
    descricao:
      "Paredes, painéis e detalhes decorativos com toque mineral, em ambientes residenciais e corporativos.",
  },
];

const diferenciais = [
  "Transporte fácil e instalação simples",
  "Aplicação em grandes áreas, internas e externas",
  "Textura de pedra natural com alto desempenho",
  "Respirável, resistente à umidade e ao fogo",
  "Estabilidade estrutural e vida útil elevada",
  "Material sustentável de base mineral",
];

const texturas = [
  { img: swatchTravertino, nome: "Travertino", desc: "Andes White" },
  { img: swatchSlate, nome: "Slate", desc: "Veil Dark Grey" },
  { img: swatchRipple, nome: "Ripple Board", desc: "Off White 100" },
  { img: swatchGranite, nome: "Raw Granite", desc: "Veil White" },
];

const Geo = () => {
  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title="Geo Lesco — Revestimento de Pedra Flexível"
        description="Revestimento de pedra flexível Lesco Geo: textura de pedra natural para fachadas, áreas molhadas e interiores. Baixe o catálogo de cores."
        path="/geo"
        image={heroTravertino}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section className="relative rounded-[10px] overflow-hidden">
        <img
          src={heroTravertino}
          alt="Parede em pedra flexível Geo com lareira"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Esquerda — texto */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              Catálogo de Cores · Geo
            </span>
            <div
              className="[&>svg]:h-[52px] md:[&>svg]:h-[68px] [&>svg]:w-auto [&>svg_*]:fill-white text-white mb-6"
              dangerouslySetInnerHTML={{ __html: logoGeoRaw }}
              aria-label="Geo"
            />
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.02em] mb-6">
              Revestimento de pedra flexível.
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md">
              A textura da pedra natural com o desempenho dos materiais modernos —
              aplicável em grandes áreas, internas e externas, com instalação simples
              e custo inferior ao dos revestimentos tradicionais.
            </p>
          </div>

          {/* Direita — formulário GHL (catálogo Geo) */}
          <div className="bg-white rounded-[10px] overflow-hidden shadow-2xl">
            <GhlForm
              formId="jx3SjqfVzHStGmOnyu6H"
              formName="[12] [FORM] [DOWNLOAD CATALOGO] [GEO]"
              title="[12] [FORM] [DOWNLOAD CATALOGO] [GEO]"
              height={1035}
            />
          </div>
        </div>
      </section>

      {/* ========== SOBRE A PEDRA ========== */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex justify-center">
            <img
              src={imgPedra.url}
              alt="Pedra mineral, matéria-prima da linha Geo"
              className="w-full max-w-[420px] h-auto object-contain"
            />
          </div>
          <div>
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
                Sobre a pedra flexível
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-6">
                Durabilidade mineral, plasticidade dos materiais modernos.
              </h2>
              <p className="font-body text-[15px] md:text-[16px] text-dark/75 leading-[1.7] text-slate-950">
                A Geo é produzida a partir de solo modificado de base mineral, triturado
                até virar um pó microscópico e unido a polímeros ecológicos. O resultado
                une a estabilidade estrutural dos materiais inorgânicos à flexibilidade dos
                orgânicos — preservando as propriedades naturais da pedra: respirabilidade,
                resistência à umidade e ao fogo, e sustentabilidade.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== COMPARATIVO TÉCNICO ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            Comparativo técnico
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-4 text-center max-w-3xl mx-auto">
            Pedra flexível vs. materiais tradicionais.
          </h2>
          <p className="font-body text-[14px] text-dark/60 leading-relaxed mb-16 text-center max-w-xl mx-auto">
            Menor custo consolidado, instalação simplificada e desempenho superior em todos os quesitos críticos.
          </p>

          {/* Gráfico de custos */}
          <div className="bg-white rounded-[10px] p-6 md:p-10 lg:p-12 mb-[10px]">
            <h3 className="font-display text-xl md:text-2xl text-dark mb-2 text-center">
              Comparativo de custos: Pedra Flexível vs. Pedra Natural
            </h3>
            <p className="font-body text-[13px] text-dark text-center mb-10">
              Menor investimento em todas as etapas — do produto à obra finalizada.
            </p>
            <div className="grid grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto items-end" style={{ minHeight: '220px' }}>
              {[
                { label: 'Preço unitário', flex: 35, nat: 85 },
                { label: 'Armazenagem', flex: 25, nat: 70 },
                { label: 'Acessórios', flex: 40, nat: 75 },
                { label: 'Mão de obra', flex: 35, nat: 75 },
                { label: 'Custo total', flex: 55, nat: 100 },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <div className="flex gap-1.5 md:gap-2 items-end h-[160px] w-full justify-center">
                    <div
                      className="w-3 md:w-5 rounded-t bg-[#B8B8B8]"
                      style={{ height: `${item.flex}%` }}
                      title={`Pedra Flexível: ${item.flex}%`}
                    />
                    <div
                      className="w-3 md:w-5 rounded-t bg-[#4A4A4A]"
                      style={{ height: `${item.nat}%` }}
                      title={`Pedra Natural: ${item.nat}%`}
                    />
                  </div>
                  <span className="font-body text-[10px] md:text-[11px] text-dark text-center leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#B8B8B8]" />
                <span className="font-body text-[12px] text-dark">Pedra Flexível</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#4A4A4A]" />
                <span className="font-body text-[12px] text-dark">Pedra Natural</span>
              </div>
            </div>
          </div>

          {/* Tabela comparativa */}
          <div className="bg-white rounded-[10px] p-6 md:p-10 lg:p-12 mb-[10px] overflow-x-auto">
            <h3 className="font-display text-xl md:text-2xl text-dark mb-2 text-center">
              Comparativo com materiais tradicionais
            </h3>
            <p className="font-body text-[13px] text-dark/50 text-center mb-10">
              Desempenho ambiental, logístico e estrutural em cada categoria.
            </p>
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-dark/10">
                  <th className="text-left font-display text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-dark py-3 px-2 md:px-4">
                    Critério
                  </th>
                  <th className="text-center font-display text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-dark py-3 px-2 md:px-4">
                    Pedra Natural
                  </th>
                  <th className="text-center font-display text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-dark py-3 px-2 md:px-4">
                    Revestimento Cerâmico
                  </th>
                  <th className="text-center font-display text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-dark py-3 px-2 md:px-4">
                    Pintura / Revestimento
                  </th>
                  <th className="text-center font-display text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-dark py-3 px-2 md:px-4">
                    ACM
                  </th>
                  <th className="text-center font-display text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-dark py-3 px-2 md:px-4 bg-dark/5">
                    Pedra Flexível
                  </th>
                </tr>
              </thead>
              <tbody className="font-body text-[12px] md:text-[13px]">
                {[
                  { crit: 'Emissão de CO₂', vals: ['Alta', 'Alta', 'Excesso de HCHO', 'Emissões excessivas', 'Zero poluição'] },
                  { crit: 'Logística', vals: ['Muito pesado / Alto custo', 'Muito pesado / Alto custo', 'Proteção especial / Alto custo', 'Proteção especial / Alto custo', 'Leve / Baixo custo'] },
                  { crit: 'Segurança', vals: ['Instalação arriscada', 'Risco de queda / instalação', 'Seguro', 'Inseguro', 'Leve / Fixação segura'] },
                  { crit: 'Durabilidade', vals: ['Duradoura', 'Duradoura', 'Descascamento fácil', 'Geral', 'Resistente ao gelo e calor'] },
                  { crit: 'Resistência ao fogo', vals: ['À prova de fogo', 'À prova de fogo', '—', 'Resistente ao fogo', 'Classe A à prova de fogo'] },
                  { crit: 'Praticidade', vals: ['Construção inconveniente', 'Construção inconveniente', 'Construção fácil', 'Construção inconveniente', 'Construção fácil'] },
                  { crit: 'Expressividade', vals: ['Expressão limitada', 'Expressão limitada', 'Falta de expressão', 'Falta de expressão', 'Expressivo'] },
                  { crit: 'Poluição luminosa', vals: ['Comparativamente pequena', 'Sim', 'Comparativamente grande', 'Sim', 'Não'] },
                ].map((row, i) => (
                  <tr key={row.crit} className={i % 2 === 0 ? 'bg-dark/[0.02]' : ''}>
                    <td className="py-3 px-2 md:px-4 font-medium text-dark">{row.crit}</td>
                    {row.vals.map((v, j) => (
                      <td
                        key={j}
                        className={`py-3 px-2 md:px-4 text-center text-dark ${j === 4 ? 'bg-dark/5 font-medium' : ''}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Features e vantagens */}
          <div className="bg-dark rounded-[10px] p-6 md:p-10 lg:p-12">
            <h3 className="font-display text-xl md:text-2xl text-white mb-2 text-center">
              Vantagens do produto
            </h3>
            <p className="font-body text-[13px] text-white/50 text-center mb-10">
              Tecnologia mineral que une flexibilidade, resistência e sustentabilidade.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10 max-w-3xl mx-auto">
              {[
                'Flexível e dobrável',
                'Alta resistência',
                'Resistência ao envelhecimento',
                'Impermeável / À prova de fogo / Umidade',
                'Leve',
                'Ecológico',
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 bg-white/10 rounded-[10px] px-4 py-3"
                >
                  <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
                  <span className="font-body text-[12px] md:text-[13px] text-white/85">{f}</span>
                </div>
              ))}
            </div>
            <ul className="space-y-3 max-w-3xl mx-auto">
              {[
                'Não precisa remover a base antiga: aplica diretamente, sem geração de resíduos sólidos e sem incômodo.',
                'Alta produtividade, baixo custo, prazo de construção rápido, instalação simples e excelente acabamento.',
                'Produtos sob medida, alinhados aos costumes e estilos locais.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-white/40 text-[14px] leading-relaxed shrink-0">★</span>
                  <span className="font-body text-[13px] md:text-[14px] text-white/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== APLICAÇÕES ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            Infinitas aplicações
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-3xl mx-auto">
            Onde a Geo transforma o ambiente.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {aplicacoes.map((a) => (
              <div key={a.titulo} className="bg-white rounded-[10px] overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl text-dark mb-3 font-normal">{a.titulo}</h3>
                  <p className="font-body text-[14px] text-dark/70 leading-relaxed text-slate-950">{a.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== TEXTURAS (amostra) ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            Texturas
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-3 text-center max-w-3xl mx-auto">
            Algumas das texturas da linha.
          </h2>
          <p className="font-body text-[14px] text-dark/60 leading-relaxed mb-12 text-center max-w-xl mx-auto">
            Esta é apenas uma amostra. O catálogo completo reúne todas as coleções, cores e formatos disponíveis.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
            {texturas.map((t) => (
              <div key={t.nome} className="bg-white rounded-[10px] overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img src={t.img} alt={t.nome} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base text-dark font-normal">{t.nome}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-dark mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== DIFERENCIAIS ========== */}
      <section className="bg-dark rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4">
              Diferenciais
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-light leading-[1.15] text-white">
              Por que escolher a Geo.
            </h2>
          </div>
          <ul className="divide-y divide-white/10">
            {diferenciais.map((d, i) => (
              <li key={i} className="py-5 flex gap-4 items-start">
                <span className="font-mono text-[12px] text-white/40 pt-1">0{i + 1}</span>
                <span className="font-body text-[16px] md:text-[17px] text-white/85 leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section
        className="py-20 md:py-28 rounded-[10px]"
        style={{ background: "linear-gradient(105deg, #E8E2DA 0%, #D6D2CC 40%, #B9BDC0 75%, #8E9398 100%)" }}
      >
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] text-dark mb-6">
              Baixe o catálogo<br />de cores da Geo.
            </h2>
            <p className="font-body text-[15px] text-dark/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Receba o catálogo completo com todas as coleções, formatos e especificações da linha de pedra flexível.
            </p>
            <a
              href="#topo"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center px-8 py-3.5 border border-dark text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-dark hover:text-white transition-colors duration-250"
            >
              Baixar catálogo
            </a>
            <div className="mt-10">
              <Link
                to="/linhas"
                className="font-display text-[12px] uppercase tracking-[0.08em] text-dark/60 hover:text-dark transition-colors"
              >
                Ver todas as linhas
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Geo;
