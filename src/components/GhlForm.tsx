import { useEffect, useState, type CSSProperties } from "react";
import { buildGhlFormUrl } from "@/lib/utm";

const SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

function ensureFormScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

interface GhlFormProps {
  formId: string;
  title: string;
  formName?: string;
  /** Altura fixa em px (mantém o layout atual das páginas). */
  height: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Embed do formulário GHL (LeadConnector) com injeção automática de UTMs.
 *
 * A `src` base é usada no SSR/primeiro render (sem mismatch de hidratação) e,
 * após montar no cliente, é trocada pela versão com os query params de UTM —
 * única forma de preencher os campos ocultos de um iframe cross-origin.
 */
export const GhlForm = ({
  formId,
  title,
  formName,
  height,
  className,
  style,
}: GhlFormProps) => {
  const baseUrl = `https://api.leadconnectorhq.com/widget/form/${formId}`;
  const [src, setSrc] = useState(baseUrl);

  useEffect(() => {
    ensureFormScript();
    setSrc(buildGhlFormUrl(baseUrl));
  }, [baseUrl]);

  return (
    <iframe
      src={src}
      style={{ width: "100%", height: `${height}px`, border: "none", borderRadius: "3px", ...style }}
      className={className}
      id={`inline-${formId}`}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={formName}
      data-height={`${height}`}
      data-layout-iframe-id={`inline-${formId}`}
      data-form-id={formId}
      title={title}
    />
  );
};
