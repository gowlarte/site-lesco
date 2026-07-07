import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/config/site";

import heroCatalogo from "@/assets/hero-home-altwood.webp";

import iconVidaUtil from "@/assets/madeira-ecologica/catalogo/vida-util.png";
import iconGarantia from "@/assets/madeira-ecologica/catalogo/garantia.png";
import iconReciclado from "@/assets/madeira-ecologica/catalogo/reciclado.png";
import iconUv from "@/assets/madeira-ecologica/catalogo/uv.png";
import iconPersonalizavel from "@/assets/madeira-ecologica/catalogo/personalizavel.png";
import iconAcustico from "@/assets/madeira-ecologica/catalogo/acustico.png";
import iconInstalacao from "@/assets/madeira-ecologica/catalogo/instalacao.png";
import iconInsetos from "@/assets/madeira-ecologica/catalogo/insetos.png";
import iconTermico from "@/assets/madeira-ecologica/catalogo/termico.png";

const diferenciais = [
  { svg: iconVidaUtil, label: "Vida útil de até 20 anos", description: "Durabilidade excepcional para projetos que atravessam o tempo." },
  { svg: iconGarantia, label: "Garantia de 10 anos", description: "Uma década de garantia que reflete a confiança no produto." },
  { svg: iconReciclado, label: "Produzido com material reciclado", description: "Fabricado com materiais reciclados, para uma arquitetura mais responsável." },
  { svg: iconUv, label: "Proteção UV para toda a linha WPC Lesco", description: "Resistência à exposição solar, preservando cor e integridade." },
  { svg: iconPersonalizavel, label: "Tamanhos e texturas personalizáveis", description: "Flexibilidade total para adaptar o material ao seu projeto." },
  { svg: iconAcustico, label: "Material com isolamento acústico", description: "Conforto sonoro para ambientes internos e externos." },
  { svg: iconInstalacao, label: "Instalação rápida, limpa e fácil", description: "Sistema prático que reduz prazos e desperdícios na obra." },
  { svg: iconInsetos, label: "Resistência a insetos e fungos", description: "Composição naturalmente resistente a cupins e fungos." },
  { svg: iconTermico, label: "Material com isolamento térmico", description: "Eficiência térmica que contribui para o conforto do ambiente." },
];

const Catalogo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px] space-y-[10px]">
      <SEO
        title="Catálogo Lesco — Baixe o catálogo completo"
        description="Receba o catálogo completo da Lesco com todas as linhas, modelos e especificações técnicas dos nossos revestimentos premium."
        path="/catalogo-lesco"
        image={heroCatalogo}
      />

      {/* ========== HERO + FORMULÁRIO ========== */}
      <section className="relative rounded-[10px] overflow-hidden">
        <img
          src={heroCatalogo}
          alt="Revestimentos em madeira ecológica Lesco"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.65)]" />

        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Esquerda — texto */}
          <div className="text-white">
            <span className="inline-block font-display text-white bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-8">
              Catálogo Lesco
            </span>
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] mb-6">
              Conheça o novo e explore todos os benefícios que a madeira ecológica pode oferecer.
            </h1>
            <p className="font-body text-[15px] md:text-[17px] text-white/80 leading-relaxed max-w-md">
              Acesse nosso catálogo exclusivo e explore uma seleção diversificada de
              revestimentos ecológicos, criados com o compromisso de oferecer soluções
              estéticas e ambientalmente responsáveis.
            </p>
          </div>

          {/* Direita — formulário (iframe atual do catálogo) */}
          <div className="bg-white rounded-[10px] overflow-hidden shadow-2xl">
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${site.forms.catalogo}`}
              style={{ width: "100%", height: "720px", border: "none", borderRadius: "3px" }}
              id={`inline-${site.forms.catalogo}`}
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="[01] [FORM] [DOWNLOAD CATALOGO]"
              data-height="720"
              data-layout-iframe-id={`inline-${site.forms.catalogo}`}
              data-form-id={site.forms.catalogo}
              title="[01] [FORM] [DOWNLOAD CATALOGO]"
            />
          </div>
        </div>
      </section>

      {/* ========== DIFERENCIAIS ========== */}
      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4 text-center">
            Por que Lesco
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-dark mb-12 text-center max-w-3xl mx-auto">
            Principais diferenciais da madeira ecológica WPC.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {diferenciais.map((d) => (
              <div key={d.label} className="bg-white/50 rounded-[10px] p-8">
                <img src={d.svg} alt="" aria-hidden className="h-10 w-10 mb-5 object-contain" />
                <h3 className="font-display text-xl text-dark mb-3 font-normal">{d.label}</h3>
                <p className="font-body text-[14px] text-dark/70 leading-relaxed text-slate-950">{d.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section
        className="py-20 md:py-28 rounded-[10px]"
        style={{ background: "linear-gradient(105deg, #F0C9A8 0%, #E8DCC2 30%, #C8D2C4 60%, #8FA4B5 100%)" }}
      >
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] text-dark mb-10">
              Vamos iniciar<br />seu projeto?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                Falar no WhatsApp
              </a>
              <Link
                to="/orcamento"
                className="inline-flex items-center px-7 py-3.5 border border-[hsl(var(--primary))] text-dark font-body text-[13px] font-medium uppercase tracking-[0.08em] rounded hover:bg-primary/[0.08] transition-colors duration-250"
              >
                Solicitar orçamento
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Catalogo;
