import CatalogoForm from "@/components/catalogo/CatalogoForm";

const Catalogo = () => {
  return (
    <div className="min-h-screen pt-[100px] pb-24" style={{ backgroundColor: "#DBDBDB" }}>
      <div className="max-w-[600px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-dark mb-4">
            Baixe nosso Catálogo
          </h1>
          <p className="font-body text-[15px] md:text-[17px] text-dark/80 leading-relaxed max-w-[560px] mx-auto text-primary">
            Preencha o formulário abaixo para receber o catálogo completo da Lesco com todas as linhas, modelos e especificações técnicas.
          </p>
        </div>

        <CatalogoForm />
      </div>
    </div>
  );
};

export default Catalogo;
