// ---------------------------------------------------------------------------
// Captura, persistência e injeção de UTMs nos formulários GHL (LeadConnector).
//
// CONTEXTO IMPORTANTE: os formulários do site são embeds do GHL em <iframe>
// cross-origin. Não é possível escrever nos <input hidden> de dentro do iframe
// via DOM. O mecanismo confiável é anexar os valores como query params na
// própria `src` do iframe — o GHL casa cada param com o campo cujo "Query Key"
// tem o mesmo nome. É o que `buildGhlFormUrl()` faz.
//
// MODELO DE ATRIBUIÇÃO (decidido com o cliente):
//   • Last-touch: quando a URL traz UTM nova, a campanha do clique atual VENCE
//     e sobrescreve o que estava guardado.
//   • Entrada direta/orgânica = SEM campanha. Não ressuscitamos campanha de
//     visitas antigas (era o bug de "lead entrando com dado de outra página").
//
// FONTE DE VERDADE ÚNICA: `sessionStorage` (chave `lesco_utm`).
//   - Sobrevive à navegação interna (que apaga a query string da URL), então o
//     lead mantém a atribuição enquanto navega no site na mesma sessão.
//   - É zerado quando a aba/sessão do navegador fecha, então um novo acesso
//     direto começa limpo (sem campanha).
//   - O MESMO objeto resolvido alimenta o iframe (buildGhlFormUrl) e o
//     forwarder do dashboard (readSessionUtms) — fim da divergência
//     first-touch × last-touch que misturava dados de campanhas diferentes.
// ---------------------------------------------------------------------------

const SS_KEY = "lesco_utm"; // fonte de verdade por sessão de navegação

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

// Quais chaves sinalizam que houve uma origem de campanha real (novo touch)
const SIGNAL_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "campaign_id",
  "gclid",
  "fbclid",
];

const isBrowser = () => typeof window !== "undefined";

export type UtmValues = Record<string, string>;

// --- storage seguro (Safari privado/iOS não derruba o script) --------------
function ssSetStore(values: UtmValues) {
  try {
    window.sessionStorage.setItem(SS_KEY, JSON.stringify(values));
  } catch {
    /* noop */
  }
}
function ssGetStore(): UtmValues | null {
  try {
    const raw = window.sessionStorage.getItem(SS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as UtmValues) : null;
  } catch {
    return null;
  }
}
function ssClearStore() {
  try {
    window.sessionStorage.removeItem(SS_KEY);
  } catch {
    /* noop */
  }
}

// Marca se a carga atual da página (full load / reload) já foi processada.
// É resetada a cada reload real porque o módulo é reavaliado; a navegação
// interna da SPA NÃO reseta, então mantém a atribuição de quem veio de campanha.
let pageLoadHandled = false;

/**
 * Resolve as UTMs da sessão atual (last-touch) e devolve o objeto final.
 *
 * - URL com sinal de campanha  → nova campanha VENCE e sobrescreve a sessão.
 * - URL sem sinal              → reaproveita a campanha da sessão (navegação
 *                                 interna). Se não houver, fica VAZIO (entrada
 *                                 direta/orgânica não herda campanha antiga).
 *
 * Seguro para SSR (retorna {} fora do browser).
 */
export function captureUtms(): UtmValues {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);
  const hasSignal = SIGNAL_KEYS.some((k) => params.get(k));

  let values: UtmValues;

  if (hasSignal) {
    // Last-touch: o clique atual define a atribuição e sobrescreve a sessão.
    values = {};
    URL_PARAMS.forEach((k) => {
      const v = params.get(k);
      if (v) values[k] = v;
    });
    // url_conversao = a LP onde a campanha realmente entrou.
    values.url_conversao = window.location.href;
    ssSetStore(values);
  } else {
    // Sem sinal na URL: mantém o que já existe na sessão (nav. interna).
    // Entrada direta sem sessão prévia → objeto vazio (sem campanha).
    values = ssGetStore() || {};
  }

  // user_agent sempre do momento atual; não altera a atribuição.
  const enriched: UtmValues = { ...values };
  enriched.user_agent_lead = navigator.userAgent;
  if (!enriched.url_conversao) enriched.url_conversao = window.location.href;

  return enriched;
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

/**
 * Lê os UTMs da sessão para o forwarder do dashboard.
 * Usa exatamente a MESMA resolução que alimenta o iframe (captureUtms), para
 * que form e forwarder nunca enviem campanhas diferentes. Retorna null quando
 * não há nenhum sinal de campanha (entrada direta) — o forwarder ignora.
 */
export function readSessionUtms(): UtmValues | null {
  if (!isBrowser()) return null;
  const values = captureUtms();
  const hasSignal = SIGNAL_KEYS.some((k) => values[k]);
  return hasSignal ? values : null;
}
