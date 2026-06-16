import { useEffect } from "react";
import { captureUtms, readSessionUtms } from "@/lib/utm";

// Endpoints e tokens do dashboard (idênticos ao script das LPs externas).
const UTM_PUSH_ENDPOINT = "https://lesco-dash.vercel.app/api/utm-push";
const SUPPLEMENT_ENDPOINT = "https://lesco-dash.vercel.app/api/supplement";
const UTM_PUSH_TOKEN = "Lescomkt@2026#$";
const SUPPLEMENT_TOKEN = "LescoGHL2026";
const SUPPLEMENT_DELAY = 5000;

function postBeacon(url: string, payload: unknown) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }
  } catch {
    /* fallback below */
  }
  fetch(url, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  }).catch(() => {});
}

/**
 * Encaminha os UTMs ao dashboard quando um formulário GHL é enviado.
 * Replica o script do <body> das LPs externas: postMessage do GHL + fallback
 * de submit, com flag para evitar duplo disparo.
 */
export function useUtmForwarder() {
  useEffect(() => {
    // Garante UTMs persistidas/sincronizadas o quanto antes.
    captureUtms();

    let alreadySent = false;

    const onFormSubmit = (contactId: string | null, email: string | null) => {
      if (alreadySent) return;
      alreadySent = true;

      const utms = readSessionUtms();
      if (!utms) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ghl_form_submit',
        formId: 'NCyQbX00m3csRV6jg6RB',
        formName: 'whatsapp_popup',
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_content: utms.utm_content,
        utm_term: utms.utm_term,
        campaign_id: utms.campaign_id,
        adset_id: utms.adset_id,
        ad_id: utms.ad_id,
      });

      // a) utm-push imediato
      postBeacon(
        `${UTM_PUSH_ENDPOINT}?token=${encodeURIComponent(UTM_PUSH_TOKEN)}`,
        { ghl_contact_id: contactId, email, ...utms },
      );

      // b) supplement após 5s (com retry se o deal ainda não existir)
      if (email) {
        const suppUrl = `${SUPPLEMENT_ENDPOINT}?token=${encodeURIComponent(SUPPLEMENT_TOKEN)}`;
        const suppBody = JSON.stringify({ email, ...utms });
        const suppOpts: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: suppBody,
        };
        window.setTimeout(() => {
          fetch(suppUrl, suppOpts)
            .then((r) => r.json())
            .then((data) => {
              if (data?.moskit?.skipped === "deal nao encontrado ainda") {
                window.setTimeout(() => {
                  fetch(suppUrl, suppOpts).catch(() => {});
                }, 10000);
              }
            })
            .catch(() => {});
        }, SUPPLEMENT_DELAY);
      }
    };

    const onMessage = (ev: MessageEvent) => {
      try {
        const msg = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data;
        if (msg && (msg.event === "form_submitted" || msg.type === "FORM_SUBMITTED")) {
          const contactId =
            msg.contact?.id || msg.data?.contact_id || null;
          const email = msg.contact?.email || msg.data?.email || null;
          onFormSubmit(contactId, email);
        }
      } catch {
        /* ignore */
      }
    };

    const onSubmit = (ev: Event) => {
      const form = ev.target as HTMLElement | null;
      const emailEl = form?.querySelector?.(
        "[name=email],[type=email]",
      ) as HTMLInputElement | null;
      onFormSubmit(null, emailEl ? emailEl.value : null);
    };

    window.addEventListener("message", onMessage);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);
}
