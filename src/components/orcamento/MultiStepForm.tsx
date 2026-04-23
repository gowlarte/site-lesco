import { useState, useRef } from "react";
import { FormData, initialFormData } from "./types";
import ProgressBar from "./ProgressBar";
import Step1Identity from "./Step1Identity";
import Step2Location from "./Step2Location";
import Step3Products from "./Step3Products";
import NavButtons from "./NavButtons";
import SuccessScreen from "./SuccessScreen";
import RDStationBridge, { RDStationBridgeRef } from "./RDStationBridge";

const TOTAL_STEPS = 3;

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => phone.replace(/\D/g, "").length >= 10;

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const bridgeRef = useRef<RDStationBridgeRef>(null);

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};

    if (s === 1) {
      if (!formData.name.trim()) errs.name = "Nome é obrigatório";
      if (!formData.email.trim()) errs.email = "Email é obrigatório";
      else if (!validateEmail(formData.email)) errs.email = "Email inválido";
      if (!formData.phone.trim()) errs.phone = "Telefone é obrigatório";
      else if (!validatePhone(formData.phone)) errs.phone = "Telefone inválido";
    }

    if (s === 2) {
      if (!formData.state) errs.state = "Estado é obrigatório";
      if (!formData.city) errs.city = "Cidade é obrigatória";
      if (!formData.profile) errs.profile = "Perfil é obrigatório";
    }

    if (s === 3) {
      if (!formData.timeline) errs.timeline = "Prazo é obrigatório";
      if (formData.products.length === 0) errs.products = "Selecione ao menos 1 produto";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setSlideDir("left");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setSlideDir("right");
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setIsSubmitting(true);
    try {
      await bridgeRef.current?.submit(formData);
      setIsSuccess(true);
    } catch {
      // Show success anyway — best effort
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessScreen name={formData.name} />;
  }

  return (
    <div className="relative">
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

      <div className="overflow-hidden">
        <div
          key={step}
          className="animate-slide-in"
          style={{
            animationDirection: slideDir === "right" ? "reverse" : "normal",
          }}
        >
          {step === 1 && <Step1Identity data={formData} onChange={updateField} errors={errors} />}
          {step === 2 && <Step2Location data={formData} onChange={updateField} errors={errors} />}
          {step === 3 && <Step3Products data={formData} onChange={updateField} errors={errors} />}
        </div>
      </div>

      <NavButtons
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <RDStationBridge ref={bridgeRef} />
    </div>
  );
};

export default MultiStepForm;
