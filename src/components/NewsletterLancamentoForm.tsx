import { useEffect, useId, useRef, useState } from "react";
import { buildGhlFormUrl } from "@/lib/utm";

interface Props {
  slug: string;
  nomeLinha: string;
  variant?: "light" | "dark";
  formId: string;
  formName?: string;
  formHeight?: number;
}

/** Folga somada à altura reportada pelo iframe. */
const PADDING = 56;
/** Teto rígido de segurança: o iframe do GHL reporta de volta a própria altura. */
const MAX_HEIGHT = 2400;
/**
 * Correções de altura aceitas por montagem. Último anteparo: se o embed passar
 * a mandar alturas contraditórias (conteúdo x eco da animação), paramos de
 * reagir em vez de re-renderizar a cada mensagem. Um formulário normal precisa
 * de poucas correções (negociação inicial, erro de validação, tela de obrigado).
 */
const MAX_ADJUSTMENTS = 24;

/** Piso da altura no cliente; o embed do GHL renderiza mais alto no mobile. */
const responsiveMinimumHeight = (fallback: number) => {
  if (typeof window === "undefined") return fallback;
  return window.matchMedia("(max-width: 640px)").matches ? 650 : 545;
};

// Fora do componente de propósito: sem closure sobre props, as deps do useEffect
// ficam honestas (só formId/formHeight) e o listener de message não é recriado a
// cada render — recriar era mais uma fonte de mensagens duplicadas.
const clampHeight = (nextHeight: number, fallbackMinimum: number) =>
  Math.ceil(
    Math.min(Math.max(nextHeight, responsiveMinimumHeight(fallbackMinimum)), MAX_HEIGHT)
  );

export const NewsletterLancamentoForm = ({
  variant = "light",
  formId,
  formName,
  formHeight = 675,
}: Props) => {
  // A mesma página monta este formulário duas vezes (hero + CTA final) com o
  // mesmo formId. Sem sufixo único os dois iframes ficavam com o mesmo id.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const iframeId = `inline-${formId}-${uid}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // O primeiro render precisa ser idêntico no SSG e no cliente (estas páginas
  // são pré-renderizadas), então ele não pode consultar matchMedia. O mínimo
  // responsivo é aplicado no efeito de mount, já no cliente.
  const [height, setHeight] = useState<number>(() =>
    Math.ceil(Math.min(formHeight + PADDING, MAX_HEIGHT))
  );
  // Espelho do state: deixa a decisão acontecer fora do updater do setHeight,
  // o que mantém a regra pura e permite contar quantas correções já fizemos.
  const heightRef = useRef(height);
  const adjustments = useRef(0);

  const applyHeight = (next: number) => {
    heightRef.current = next;
    setHeight(next);
  };

  const baseUrl = `https://api.leadconnectorhq.com/widget/form/${formId}`;
  const [src, setSrc] = useState(baseUrl);

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
    setSrc(buildGhlFormUrl(baseUrl));
  }, [baseUrl]);

  useEffect(() => {
    adjustments.current = 0;
    const base = clampHeight(formHeight + PADDING, formHeight);
    if (base !== heightRef.current) applyHeight(base);

    const parseHeight = (value: unknown): number | null => {
      const num = typeof value === "string" ? parseFloat(value) : Number(value);
      return Number.isFinite(num) && num > 0 ? num : null;
    };

    const applyReportedHeight = (reported: number) => {
      // Anteparo: quantidade de correções por montagem é limitada.
      if (adjustments.current >= MAX_ADJUSTMENTS) return;

      const currentHeight = heightRef.current;
      // O GHL reporta de volta a altura que nós mesmos aplicamos. Somar PADDING
      // a cada mensagem fazia a altura crescer indefinidamente, e cada resize
      // gerava nova mensagem — o ciclo nunca fechava. Só reagimos quando a
      // diferença passa da folga, ou seja, quando o conteúdo realmente mudou.
      // A folga é a mesma dos dois lados de propósito: assim `reported + PADDING`
      // é ponto fixo e a mensagem seguinte cai no early return acima.
      if (Math.abs(reported - currentHeight) <= PADDING) return;

      const next = clampHeight(reported + PADDING, formHeight);
      if (next === currentHeight) return;

      adjustments.current += 1;
      applyHeight(next);
    };

    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin || "";
      if (!/leadconnectorhq\.com|msgsndr\.com/.test(origin)) return;

      // Só aceitamos mensagens do nosso próprio iframe. Antes o filtro era pelo
      // formId, que é idêntico nas duas instâncias: cada uma reagia às mensagens
      // da outra e as duas se realimentavam.
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return;

      let data: unknown = event.data;
      if (typeof data === "string") {
        if (data.startsWith("[iFrameSizer]")) {
          const [, messageHeight] = data.replace("[iFrameSizer]", "").split(":");
          const iframeHeight = parseHeight(messageHeight);
          if (iframeHeight) applyReportedHeight(iframeHeight);
          return;
        }

        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== "object") return;

      const payload = data as Record<string, unknown>;
      const newHeight =
        parseHeight(payload.height) ??
        parseHeight(payload["embed-height"]) ??
        parseHeight(payload.scrollHeight);

      if (newHeight) applyReportedHeight(newHeight);
    };

    // Só reavalia o mínimo responsivo; não mexe na altura já negociada.
    const handleResize = () => {
      const next = clampHeight(heightRef.current, formHeight);
      if (next !== heightRef.current) applyHeight(next);
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("resize", handleResize);
    };
  }, [formId, formHeight]);

  const isDark = variant === "dark";

  return (
    <div
      className={`w-full min-w-0 overflow-visible rounded-[10px] transition-all duration-500 ${
        isDark ? "bg-white/95 border border-white/15" : "bg-white border border-dark/10"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      <iframe
        ref={iframeRef}
        key={formId}
        scrolling="no"
        src={src}
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          height: `${height}px`,
          minHeight: `${height}px`,
          border: "none",
          borderRadius: "10px",
          display: "block",
          overflow: "hidden",
          transition: "height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), min-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        id={iframeId}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={`${height}`}
        data-layout-iframe-id={iframeId}
        data-form-id={formId}
        title={formName}
      />
    </div>
  );
};
