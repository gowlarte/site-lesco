import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MultiStepForm from "@/components/orcamento/MultiStepForm";

const FormularioTeste = () => {
  return (
    <>
      <SEO
        title="Formulário de Teste — Lesco"
        description="Página interna de teste do formulário por etapas."
        noindex
      />
      <Header />
      <main className="min-h-screen pt-[120px] pb-20 px-[10px] bg-lesco-bone">
        <div className="max-w-[640px] mx-auto bg-lesco-white rounded-[10px] p-8 md:p-12 shadow-sm">
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dark/50 mb-2">
              Página de teste
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-dark leading-tight">
              Formulário por etapas
            </h1>
            <p className="font-body text-[14px] text-dark/60 mt-3">
              Ambiente isolado para validar o fluxo multi-etapas. O envio não integra com CRM — os dados aparecem apenas no console do navegador.
            </p>
          </div>
          <MultiStepForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FormularioTeste;
