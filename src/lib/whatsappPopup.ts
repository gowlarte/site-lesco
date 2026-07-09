/**
 * Global helper to open the WhatsApp popup form (the same form used by the
 * floating green button). Any button on the site can call openWhatsAppPopup()
 * to trigger the popup instead of linking out to wa.me.
 */
export const WHATSAPP_POPUP_EVENT = "lesco:open-whatsapp";

export function openWhatsAppPopup() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(WHATSAPP_POPUP_EVENT));
}
