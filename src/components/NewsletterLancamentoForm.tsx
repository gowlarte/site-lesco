import { useEffect } from "react";

interface Props {
  slug: string;
  nomeLinha: string;
  variant?: "light" | "dark";
  formId: string;
  formName?: string;
  formHeight?: number;
}

export const NewsletterLancamentoForm = ({
  variant = "light",
  formId,
  formName,
  formHeight = 675,
}: Props) => {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const isDark = variant === "dark";

  return (
    <div
      className={`overflow-hidden rounded-[10px] transition-all duration-500 ${
        isDark ? "bg-white/95 border border-white/15" : "bg-white border border-dark/10"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      <iframe
        key={formId}
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        style={{
          width: "100%",
          height: `${formHeight}px`,
          border: "none",
          borderRadius: "10px",
          display: "block",
        }}
        id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={`${formHeight}`}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={formName}
      />
    </div>
  );
};
