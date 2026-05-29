

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Registra a visualização de uma página 404.
 * - Persiste o acesso no Lovable Cloud (tabela not_found_hits).
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

  // Lovable Cloud
  try {
    await supabase.from("not_found_hits").insert({
      path,
      referrer,
      user_agent: userAgent,
    });
  } catch {
    // silencioso — falhas de rede não devem afetar a página
  }
}
