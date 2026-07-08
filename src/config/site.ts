import { LOCALE, type Locale } from "../i18n/locale";

/**
 * Locale-specific site configuration. Everything here is chosen by the build
 * locale (see src/i18n/locale.ts). Import this instead of hardcoding domain,
 * contact, form or analytics values anywhere in the app.
 *
 * NOTE: relative import of ../i18n/locale (not "@/i18n/locale") so this module
 * also resolves under tsx/Node in scripts/prerender.ts, which doesn't know the
 * "@" path alias.
 */
export interface SiteConfig {
  /** Absolute site origin, no trailing slash. Used for canonical/OG URLs. */
  siteUrl: string;
  /** <html lang> value. */
  htmlLang: string;
  /** Open Graph og:locale. */
  ogLocale: string;
  /** WhatsApp number in international digits (for wa.me/<number>). */
  whatsappNumber: string;
  /** Human-readable phone shown in UI. */
  phoneDisplay: string;
  /** Contact email. */
  email: string;
  /** Google Tag Manager container id. */
  gtmId: string;
  /** LeadConnector/GoHighLevel embedded form ids. */
  forms: {
    orcamento: string;
    catalogo: string;
    biblioteca: string;
    whatsappPopup: string;
  };
}

const CONFIGS: Record<Locale, SiteConfig> = {
  pt: {
    siteUrl: "https://lesco.com.br",
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    whatsappNumber: "5511948449044",
    phoneDisplay: "(11) 94844-9044",
    email: "contato@lesco.com.br",
    gtmId: "GTM-NLMKCHH",
    forms: {
      orcamento: "GTcMRzSzlRyI4MLLuFYJ",
      catalogo: "lr26Z8p5zKyXXMvt1CKn",
      biblioteca: "RWTy3Nwtw9O1iGmxd3wT",
      whatsappPopup: "NCyQbX00m3csRV6jg6RB",
    },
  },
  en: {
    siteUrl: "https://lescousa.com",
    htmlLang: "en",
    ogLocale: "en_US",
    // TODO(en): substituir pelos dados dos EUA quando disponiveis.
    // Ate la, faz fallback para os valores PT para nao quebrar o build EN.
    whatsappNumber: "5511948449044",
    phoneDisplay: "(11) 94844-9044",
    email: "contato@lesco.com.br",
    // TODO(en): usar container GTM separado do site EN.
    gtmId: "GTM-NLMKCHH",
    // TODO(en): criar formularios em ingles no GHL e colocar os novos IDs aqui.
    forms: {
      orcamento: "GTcMRzSzlRyI4MLLuFYJ",
      catalogo: "lr26Z8p5zKyXXMvt1CKn",
      biblioteca: "RWTy3Nwtw9O1iGmxd3wT",
      whatsappPopup: "NCyQbX00m3csRV6jg6RB",
    },
  },
};

export const site: SiteConfig = CONFIGS[LOCALE];

/** Origin de cada locale — usado para gerar hreflang cruzado entre os dois domínios. */
export const LOCALE_URLS: Record<Locale, string> = {
  pt: CONFIGS.pt.siteUrl,
  en: CONFIGS.en.siteUrl,
};

/** Ordem estável dos locales para iterar (ex.: gerar tags hreflang). */
export const LOCALES: Locale[] = ["pt", "en"];

export { LOCALE };
