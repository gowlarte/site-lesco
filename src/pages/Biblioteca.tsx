import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const Biblioteca = () => {
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
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-dark max-w-4xl mb-4">
            Acesse a Biblioteca
          </h1>
          <p className="font-body text-[15px] md:text-[17px] text-dark/80 leading-relaxed max-w-[560px] mx-auto text-primary">
            Preencha o formulário abaixo para ter acesso a catálogos, fichas técnicas, blocos 3D e imagens HD da Lesco.
          </p>
        </div>

        <iframe
          src="https://api.leadconnectorhq.com/widget/form/RWTy3Nwtw9O1iGmxd3wT"
          style={{ width: "100%", height: "862px", border: "none", borderRadius: "3px" }}
          id="inline-RWTy3Nwtw9O1iGmxd3wT"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="[01] [FORM] [ACESSAR BIBLIOTECA]"
          data-height="862"
          data-layout-iframe-id="inline-RWTy3Nwtw9O1iGmxd3wT"
          data-form-id="RWTy3Nwtw9O1iGmxd3wT"
          title="[01] [FORM] [ACESSAR BIBLIOTECA]"
        />
      </div>
    </div>
  );
};

export default Biblioteca;
