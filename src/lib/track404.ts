declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Registra a visualização de uma página 404.
 * - Persiste o acesso no Lovable Cloud (tabela not_found_hits) via REST.
 * - Dispara o evento `page_not_found` no dataLayer (pronto para GTM/GA4).
 * Roda apenas no cliente e nunca quebra a renderização.
 */
export async function track404(path: string): Promise<void> {
  if (typeof window === "undefined") return;

  const referrer = document.referrer || null;
  const userAgent = navigator.userAgent || null;

  // dataLayer (GTM-ready)
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_not_found",
      page_path: path,
      referrer,
    });
  } catch {
    // silencioso
  }

  // Lovable Cloud (REST direto — evita o client e o acesso a localStorage no SSG)
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return;

    await fetch(`${url}/rest/v1/not_found_hits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ path, referrer, user_agent: userAgent }),
    });
  } catch {
    // silencioso — falhas de rede não devem afetar a página
  }
}
