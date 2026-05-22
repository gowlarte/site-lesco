import { useEffect } from "react";

const Orcamento = () => {
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
    <div className="min-h-screen pt-[100px] pb-24" style={{ backgroundColor: "#DBDBDB" }}>
      <div className="max-w-[600px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl mx-auto mb-4">
            Solicite seu Orçamento
          </h1>
          <p className="font-body text-[15px] md:text-[17px] text-dark/80 leading-relaxed max-w-[560px] mx-auto text-primary">
            Preencha o formulário abaixo e nossa equipe entrará em contato para elaborar a melhor solução para o seu projeto.
          </p>
        </div>

        <iframe
          src="https://api.leadconnectorhq.com/widget/form/lr26Z8p5zKyXXMvt1CKn"
          style={{ width: "100%", height: "862px", border: "none", borderRadius: "3px" }}
          id="inline-lr26Z8p5zKyXXMvt1CKn"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="[01] [FORM] [DOWNLOAD CATALOGO]"
          data-height="862"
          data-layout-iframe-id="inline-lr26Z8p5zKyXXMvt1CKn"
          data-form-id="lr26Z8p5zKyXXMvt1CKn"
          title="[01] [FORM] [DOWNLOAD CATALOGO]"
        />
      </div>
    </div>
  );
};

export default Orcamento;
