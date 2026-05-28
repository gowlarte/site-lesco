import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { linhasEmBreve } from "@/data/linhas-em-breve";
import { NewsletterLancamentoForm } from "@/components/NewsletterLancamentoForm";
import { SEO } from "@/components/SEO";

const LinhaEmBreve = () => {
  const params = useParams<{ linha: string }>();
  const location = useLocation();
  const key = (params.linha ?? location.pathname.replace(/^\//, "")).toLowerCase();
  const linha = linhasEmBreve[key];

  if (!linha) {
    return (
      <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
        <section className="bg-light rounded-[10px] min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <h1 className="font-display text-3xl text-dark mb-4">Linha não encontrada</h1>
            <Link to="/linhas" className="font-display text-[12px] uppercase tracking-[0.08em] text-dark/60 hover:text-dark">
              Voltar para linhas
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      {/* HERO + FORM */}
      <section className="relative rounded-[10px] overflow-hidden min-h-[calc(100vh-120px)] flex items-center">
        <img
          src={linha.imagem}
          alt={linha.nome}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-8 md:px-16 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Esquerda */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              Lançamento em breve
            </span>
            <div
              className="[&>svg]:h-[56px] md:[&>svg]:h-[80px] lg:[&>svg]:h-[96px] [&>svg]:w-auto text-white mb-6"
              dangerouslySetInnerHTML={{ __html: linha.logo }}
              aria-label={linha.nome}
            />
            <p className="font-display font-light text-white/90 text-xl md:text-2xl lg:text-3xl leading-tight tracking-[-0.01em] mb-6">
              {linha.tagline}
            </p>
            <p className="font-body text-[15px] md:text-[16px] text-white/75 leading-relaxed max-w-md">
              {linha.intro}
            </p>
          </div>

          {/* Direita — formulário */}
          <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-[10px] p-8 md:p-10">
            <h2 className="font-display text-white text-2xl md:text-3xl font-light leading-tight mb-3">
              Seja avisado no lançamento
            </h2>
            <p className="font-body text-[14px] text-white/70 leading-relaxed mb-6">
              Cadastre seu e-mail para receber em primeira mão a chegada da linha {linha.nome} ao portfólio Lesco.
            </p>
            <NewsletterLancamentoForm slug={linha.slug} nomeLinha={linha.nome} variant="dark" />
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
              A linha
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark">
              {linha.sobreTitulo}
            </h2>
          </div>
          <div>
            <p className="font-body text-[16px] md:text-[17px] text-dark/75 leading-[1.7] text-gray-950">
              {linha.sobreTexto}
            </p>
          </div>
        </div>
      </section>

      {/* APLICAÇÕES */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
          Aplicações
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 max-w-2xl">
          Onde a linha {linha.nome} pode chegar.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          {linha.aplicacoes.map((a) => (
            <div key={a.titulo} className="bg-white/50 rounded-[10px] p-8">
              <h3 className="font-display text-xl text-dark mb-3 font-normal">{a.titulo}</h3>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed text-gray-950">{a.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-light rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
              Diferenciais
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark">
              O que torna {linha.nome} especial.
            </h2>
          </div>
          <ul className="divide-y divide-dark/10">
            {linha.diferenciais.map((d, i) => (
              <li key={i} className="py-5 flex gap-4 items-start text-gray-950">
                <span className="font-mono text-[12px] text-dark/40 pt-1 text-gray-950">0{i + 1}</span>
                <span className="font-body text-[16px] md:text-[17px] text-dark/80 leading-relaxed text-gray-950">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-dark rounded-[10px] px-8 md:px-16 lg:px-24 py-20 lg:py-28 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4">
          {linha.nome}
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[52px] font-light leading-[1.1] text-white mb-6 max-w-3xl mx-auto">
          Receba o lançamento em primeira mão.
        </h2>
        <p className="font-body text-[15px] text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
          Cadastre seu e-mail e seja notificado assim que a linha {linha.nome} estiver disponível.
        </p>
        <div className="max-w-[520px] mx-auto">
          <NewsletterLancamentoForm slug={linha.slug} nomeLinha={linha.nome} variant="dark" />
        </div>

        <Link
          to="/linhas"
          className="inline-flex items-center gap-2 mt-12 font-display text-[12px] uppercase tracking-[0.08em] text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para linhas
        </Link>
      </section>
    </main>
  );
};

export default LinhaEmBreve;
