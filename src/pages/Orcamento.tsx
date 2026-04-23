import { useEffect, useRef } from "react";

declare global {
  interface Window {
    RDStationForms: new (formId: string, trackingId: string) => { createForm: () => void };
  }
}

const Orcamento = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the target div for RD Station
    const formDiv = document.createElement("div");
    formDiv.setAttribute("role", "main");
    formDiv.id = "solicite-orcamento-site-e1ebbbdda007b9fa6071";
    containerRef.current.appendChild(formDiv);

    // Load RD Station script
    const script = document.createElement("script");
    script.src = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    script.async = true;
    script.onload = () => {
      if (window.RDStationForms) {
        new window.RDStationForms(
          "solicite-orcamento-site-e1ebbbdda007b9fa6071",
          "UA-191702288-1"
        ).createForm();
      }
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="min-h-screen pt-[100px] pb-24" style={{ backgroundColor: "#DBDBDB" }}>
      <div className="max-w-[800px] mx-auto px-6">
        {/* Hero compacto */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-dark mb-4">
            Solicite seu Orçamento
          </h1>
          <p className="font-body text-[15px] md:text-[17px] text-dark/70 leading-relaxed max-w-[560px] mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato para elaborar a melhor solução para o seu projeto.
          </p>
        </div>

        {/* RD Station Form Container */}
        <div ref={containerRef} className="rd-station-form-container" />
      </div>
    </div>
  );
};

export default Orcamento;
