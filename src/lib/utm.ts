// ---------------------------------------------------------------------------
// Captura, persistência e injeção de UTMs nos formulários GHL (LeadConnector).
//
// CONTEXTO IMPORTANTE: os formulários do site são embeds do GHL em <iframe>
// cross-origin. Não é possível escrever nos <input hidden> de dentro do iframe
// via DOM. O mecanismo confiável é anexar os valores como query params na
// própria `src` do iframe — o GHL casa cada param com o campo cujo "Query Key"
// tem o mesmo nome. É o que `buildGhlFormUrl()` faz.
// ---------------------------------------------------------------------------

const LS_PREFIX = "lesco_";
const LS_TS_KEY = "lesco_utm_ts";
const SS_KEY = "lesco_utm"; // mesmo do script externo do <body>
const TTL_MS = 86_400_000; // 24h

// Parâmetros lidos diretamente da URL
const URL_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
  "gclid",
  "fbclid",
] as const;

// Mapeamento: chave lógica (URL) -> nome do campo/Query Key no formulário GHL
const FIELD_MAP: Record<string, string> = {
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_content: "utm_content",
  utm_term: "utm_term",
  campaign_id: "campaign_id",
  adset_id: "adset_id",
  ad_id: "ad_id",
  gclid: "gclid_field", // URL "gclid" -> campo "gclid_field"
  fbclid: "fbclid",
  url_conversao: "url_conversao",
  user_agent_lead: "user_agent_lead",
};

// Chaves que vão na URL do iframe (curtas). UA e url_conversao são longos e
// vão apenas pelo forwarder, para não estourar o tamanho da URL.
const IFRAME_FIELD_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
  "gclid",
  "fbclid",
] as const;

// Quais chaves sinalizam que houve uma origem de campanha real
const SIGNAL_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "campaign_id",
  "gclid",
  "fbclid",
];

const isBrowser = () => typeof window !== "undefined";

// --- storage seguro (Safari privado/iOS não derruba o script) --------------
function lsSet(k: string, v: string) {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    /* noop */
  }
}
function lsGet(k: string): string | null {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
}

export type UtmValues = Record<string, string>;

/**
 * Lê a URL, persiste UTMs novas (24h) e devolve o objeto final de valores
 * (URL > localStorage > vazio). Também sincroniza o sessionStorage usado pelo
 * forwarder do dashboard. Seguro para SSR (retorna {} fora do browser).
 */
export function captureUtms(): UtmValues {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);
  const now = Date.now();

  // 1. Salva no localStorage só o que vier da URL agora
  let hasNewUtm = false;
  URL_PARAMS.forEach((k) => {
    const v = params.get(k);
    if (v) {
      lsSet(LS_PREFIX + k, v);
      hasNewUtm = true;
    }
  });
  if (hasNewUtm) {
    lsSet(LS_TS_KEY, String(now));
    // url_conversao = a LP de origem real (só quando há UTM nova na URL)
    lsSet(LS_PREFIX + "url_conversao", window.location.href);
  }

  // 2. Validade do localStorage (24h)
  const savedTs = lsGet(LS_TS_KEY);
  const isRecent = !!savedTs && now - parseInt(savedTs, 10) < TTL_MS;
  const ls = (k: string) => (isRecent ? lsGet(LS_PREFIX + k) || "" : "");

  // 3. Monta objeto final
  const values: UtmValues = {};
  URL_PARAMS.forEach((k) => {
    const v = params.get(k) || ls(k);
    if (v) values[k] = v;
  });
  const urlConversao = ls("url_conversao") || window.location.href;
  values.url_conversao = urlConversao;
  values.user_agent_lead = navigator.userAgent;

  // 4. Sincroniza sessionStorage (first-touch) para o forwarder
  try {
    if (!window.sessionStorage.getItem(SS_KEY)) {
      const hasSignal = SIGNAL_KEYS.some((k) => values[k]);
      if (hasSignal) {
        window.sessionStorage.setItem(SS_KEY, JSON.stringify(values));
      }
    }
  } catch {
    /* noop */
  }

  return values;
}

/** Igual a captureUtms mas sem reler/persistir — útil para leitura rápida. */
export function getUtmValues(): UtmValues {
  return captureUtms();
}

/**
 * Anexa os UTMs (chaves curtas) como query params na URL do iframe do GHL.
 * O GHL preenche os campos ocultos cujo Query Key bate com o nome do param.
 */
export function buildGhlFormUrl(baseUrl: string): string {
  if (!isBrowser()) return baseUrl;
  const values = captureUtms();

  try {
    const url = new URL(baseUrl);
    IFRAME_FIELD_KEYS.forEach((key) => {
      const val = values[key];
      if (!val) return;
      const field = FIELD_MAP[key] || key;
      url.searchParams.set(field, val);
    });
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/** Lê o payload de UTMs salvo no sessionStorage (para o forwarder). */
export function readSessionUtms(): UtmValues | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as UtmValues) : null;
  } catch {
    return null;
  }
}
