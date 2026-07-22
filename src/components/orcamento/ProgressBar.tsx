interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Quem é você?", "Onde você está?", "O que você precisa?"];

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-xs tracking-wider uppercase text-dark/80 text-muted-foreground">
          Etapa {currentStep} de {totalSteps}
        </span>
        <span className="font-display text-xs tracking-wider uppercase text-dark/80 font-medium text-muted-foreground">
          {stepLabels[currentStep - 1]}
        </span>
      </div>
      <div className="w-full h-[3px] bg-dark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-dark rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
