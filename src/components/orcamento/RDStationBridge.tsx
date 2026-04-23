import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { FormData } from "./types";

declare global {
  interface Window {
    RDStationForms: new (formId: string, trackingId: string) => { createForm: () => void };
    $: any;
    jQuery: any;
  }
}

export interface RDStationBridgeRef {
  submit: (data: FormData) => Promise<boolean>;
}

const FORM_ID = "solicite-orcamento-site-e1ebbbdda007b9fa6071";
const TRACKING_ID = "UA-191702288-1";

const RDStationBridge = forwardRef<RDStationBridgeRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const formDiv = document.createElement("div");
    formDiv.setAttribute("role", "main");
    formDiv.id = FORM_ID;
    containerRef.current.appendChild(formDiv);

    const script = document.createElement("script");
    script.src = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    script.async = true;
    script.onload = () => {
      if (window.RDStationForms) {
        new window.RDStationForms(FORM_ID, TRACKING_ID).createForm();
        // Wait for RD Station to render
        const check = setInterval(() => {
          const form = document.querySelector(`#${FORM_ID} form`);
          if (form) {
            clearInterval(check);
            setReady(true);
          }
        }, 500);
        setTimeout(() => clearInterval(check), 15000);
      }
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  const setInputValue = (selector: string, value: string) => {
    const el = document.querySelector(selector) as HTMLInputElement | HTMLSelectElement | null;
    if (!el) return;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, "value"
    )?.set || Object.getOwnPropertyDescriptor(
      window.HTMLSelectElement.prototype, "value"
    )?.set;
    nativeInputValueSetter?.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new Event("blur", { bubbles: true }));
  };

  useImperativeHandle(ref, () => ({
    submit: async (data: FormData): Promise<boolean> => {
      // Wait for form if not ready
      if (!ready) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error("RD Station form not found")), 10000);
          const obs = new MutationObserver(() => {
            if (document.querySelector(`#${FORM_ID} form`)) {
              clearTimeout(timeout);
              obs.disconnect();
              resolve();
            }
          });
          obs.observe(document.body, { childList: true, subtree: true });
        });
      }

      try {
        // Step 1 fields
        setInputValue(`#${FORM_ID} input[name="name"]`, data.name);
        setInputValue(`#${FORM_ID} input[name="email"]`, data.email);
        setInputValue(`#${FORM_ID} input[name="personal_phone"]`, `+55 ${data.phone}`);

        // Step 2 fields
        setInputValue(`#${FORM_ID} select[name="uf"]`, data.state);
        setInputValue(`#${FORM_ID} select[name="cf_3aa574b6fc49c58c1da345d0e9f5b300"]`, data.profile);

        // City — Select2 special handling
        try {
          const $ = window.jQuery || window.$;
          if ($) {
            const citySelect = $(`#${FORM_ID}`).find('select[name*="mlb6kjdj"], select.js-field-city, [id*="mlb6kjdj"]');
            if (citySelect.length) {
              // Create option if not exists
              if (citySelect.find(`option[value="${data.city}"]`).length === 0) {
                citySelect.append(new Option(data.city, data.city, true, true));
              }
              citySelect.val(data.city).trigger("change");
              // Try Select2 API
              try { citySelect.select2("val", data.city); } catch {}
              citySelect.trigger("change");
            }
          }
        } catch {
          // Fallback: direct value set
          const cityEl = document.querySelector(`#${FORM_ID} select[name*="mlb6kjdj"]`) as HTMLSelectElement;
          if (cityEl) {
            const opt = document.createElement("option");
            opt.value = data.city;
            opt.text = data.city;
            opt.selected = true;
            cityEl.appendChild(opt);
            cityEl.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }

        // Step 3 fields
        setInputValue(`#${FORM_ID} select[name="cf_73120c8fb402f6ffe62a80220181e61f"]`, data.timeline);

        // Checkboxes — use .click()
        const checkboxes = document.querySelectorAll<HTMLInputElement>(
          `#${FORM_ID} input[name="cf_cc81fc61e3dbccc3ef42bd50578feaff[]"]`
        );
        checkboxes.forEach((cb) => {
          const shouldCheck = data.products.includes(cb.value);
          if (cb.checked !== shouldCheck) cb.click();
        });

        // Hidden fields
        setInputValue(`#${FORM_ID} input[name="url_conversao"]`, window.location.href);
        setInputValue(`#${FORM_ID} input[name="user_agent_lead"]`, navigator.userAgent);

        // Small delay for RD Station internal processing
        await new Promise((r) => setTimeout(r, 300));

        // Submit
        const submitBtn = document.querySelector(`#${FORM_ID} .bricks-form__submit button`) as HTMLButtonElement;
        if (submitBtn) {
          submitBtn.click();
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
  }));

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
});

RDStationBridge.displayName = "RDStationBridge";
export default RDStationBridge;
