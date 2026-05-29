import { useEffect, useState } from "react";

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
  const [height, setHeight] = useState<number>(formHeight);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    setHeight(formHeight);

    const parseHeight = (value: unknown): number | null => {
      const num = typeof value === "string" ? parseFloat(value) : Number(value);
      return Number.isFinite(num) && num > 0 ? num : null;
    };

    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin || "";
      if (!/leadconnectorhq\.com|msgsndr\.com/.test(origin)) return;

      let data: any = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== "object") return;

      // Ignora mensagens de outro formulário, quando identificável
      const msgFormId = data.formId || data.form_id || data.id;
      if (msgFormId && msgFormId !== formId) return;

      const newHeight =
        parseHeight(data.height) ??
        parseHeight(data["embed-height"]) ??
        parseHeight(data.scrollHeight) ??
        (data.type === "hpb-resize" ? parseHeight(data.height) : null);

      if (newHeight) setHeight(newHeight);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formId, formHeight]);

  const isDark = variant === "dark";

  return (
    <div
      className={`overflow-hidden rounded-[10px] transition-all duration-500 ${
        isDark ? "bg-white/95 border border-white/15" : "bg-white border border-dark/10"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      <div
        className="overflow-hidden rounded-[10px] transition-all duration-500"
        style={{
          height: `${height}px`,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <iframe
          key={formId}
          scrolling="no"
          src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
          style={{
            width: "calc(100% + 24px)",
            height: `${height}px`,
            border: "none",
            borderRadius: "10px",
            display: "block",
            overflow: "hidden",
            marginRight: "-24px",
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
    </div>
  );
};
