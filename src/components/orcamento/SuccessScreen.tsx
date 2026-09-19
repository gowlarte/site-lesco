import { CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  name: string;
}

const SuccessScreen = ({ name }: SuccessScreenProps) => {
  const firstName = name.split(" ")[0];

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-16 h-16 text-primary/80" strokeWidth={1.2} />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-dark mb-3">
        Obrigado, {firstName}!
      </h2>
      <p className="font-body text-[15px] text-primary/70 leading-relaxed max-w-[400px] mx-auto">
        Recebemos sua solicitação de orçamento. Nossa equipe entrará em contato em breve para elaborar a melhor solução para o seu projeto.
      </p>
    </div>
  );
};

export default SuccessScreen;
