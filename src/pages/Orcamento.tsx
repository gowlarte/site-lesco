import MultiStepForm from "@/components/orcamento/MultiStepForm";

const Orcamento = () => {
  return (
    <div className="min-h-screen pt-[100px] pb-24" style={{ backgroundColor: "#DBDBDB" }}>
      <div className="max-w-[600px] mx-auto px-6">
        {/* Hero compacto */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl mx-auto mb-4">
            Solicite seu Orçamento
          </h1>
          <p className="font-body text-[15px] md:text-[17px] text-dark/80 leading-relaxed max-w-[560px] mx-auto text-primary">
            Preencha o formulário abaixo e nossa equipe entrará em contato para elaborar a melhor solução para o seu projeto.
          </p>
        </div>

        <MultiStepForm />
      </div>
    </div>
  );
};

export default Orcamento;
