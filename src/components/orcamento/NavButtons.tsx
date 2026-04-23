import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface NavButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const NavButtons = ({ currentStep, totalSteps, onBack, onNext, onSubmit, isSubmitting }: NavButtonsProps) => {
  const isLast = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between mt-10 gap-4">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 font-display text-[13px] tracking-wider uppercase text-dark/60 hover:text-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      ) : (
        <div />
      )}

      {isLast ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 font-display text-[13px] tracking-wider uppercase bg-dark text-white px-8 py-3.5 rounded-[10px] hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Orçamento"
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 font-display text-[13px] tracking-wider uppercase bg-dark text-white px-8 py-3.5 rounded-[10px] hover:opacity-85 transition-opacity"
        >
          Avançar
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default NavButtons;
