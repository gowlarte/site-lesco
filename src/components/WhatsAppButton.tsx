import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { buildGhlFormUrl } from "@/lib/utm";
import { WHATSAPP_POPUP_EVENT } from "@/lib/whatsappPopup";
import { useSaiuDoHero } from "@/hooks/useSaiuDoHero";
import { site } from "@/config/site";
import { t } from "@/i18n/t";

const FORM_BASE_URL = `https://api.leadconnectorhq.com/widget/form/${site.forms.whatsappPopup}`;
const FORM_URL = FORM_BASE_URL;
const SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

function ensureFormScript() {
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [formSrc, setFormSrc] = useState(FORM_URL);
  // O botão não disputa espaço com o hero: entra junto com o fundo do menu,
  // quando a página sai da primeira tela. Em página sem hero ele já nasce
  // visível.
  const visivel = useSaiuDoHero();

  useEffect(() => {
    if (open) {
      ensureFormScript();
      setFormSrc(buildGhlFormUrl(FORM_BASE_URL));
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onOpen = () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_popup_open',
        form_id: site.forms.whatsappPopup,
        page_path: window.location.pathname,
      });
      setOpen(true);
    };
    window.addEventListener(WHATSAPP_POPUP_EVENT, onOpen);
    return () => window.removeEventListener(WHATSAPP_POPUP_EVENT, onOpen);
  }, []);



  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'whatsapp_popup_open',
            form_id: site.forms.whatsappPopup,
            page_path: window.location.pathname,
          });
          setOpen(true);
        }}
        aria-label={t("Falar no WhatsApp")}
        aria-hidden={!visivel}
        tabIndex={visivel ? undefined : -1}
        className={
          "fixed bottom-[20px] right-[20px] z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[transform,opacity] duration-300 hover:scale-110 " +
          (visivel ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0")
        }
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.7-12.81-12.7zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.39a10.58 10.58 0 0 1-1.62-5.66c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.87-4.77 10.53-10.64 10.53zm5.83-7.93c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[480px] overflow-hidden rounded-[10px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("Fechar")}
              className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black/70 transition-colors hover:bg-black/20"
            >
              <X size={18} />
            </button>
            <iframe
              src={formSrc}
              title="[07] [FORM] [WHATSAPP] [POPUP]"
              className="w-full"
              style={{ height: "min(950px, 85vh)", border: "none", borderRadius: "3px" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
