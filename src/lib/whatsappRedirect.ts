import type { DestinoWhatsApp } from "../config/whatsapp";

/**
 * Como o /wa/<slug> leva a pessoa até a conversa. Os destinos em si estão em
 * src/config/whatsapp.ts.
 *
 * São dois caminhos porque nenhum serve sozinho:
 *
 * - Celular ganha o deep link `whatsapp://`, que abre a conversa direto. Sem
 *   ele a pessoa passa pela página "Abrir app" do WhatsApp e precisa de mais
 *   um toque — e note que isso não é culpa do nosso redirect: wa.me faz 302
 *   para exatamente a mesma página, então um botão apontando direto para o
 *   wa.me teria o mesmo passo a mais.
 * - Desktop fica na URL https, que sempre resolve. Lá o `whatsapp://` só
 *   funciona se o app de desktop estiver instalado, e sem ele a pessoa
 *   ficaria sem saída nenhuma.
 *
 * NOTE: import relativo de ../config/whatsapp (e não "@/config/whatsapp")
 * porque este módulo também é carregado pela função serverless em api/wa.ts,
 * que roda fora do Vite e não conhece o alias "@" — mesmo motivo comentado em
 * src/config/site.ts.
 */

/** Número salvo com "+", espaço ou tracinho quebraria o link só na hora do clique. */
function somenteDigitos(numero: string): string {
  return numero.replace(/\D/g, "");
}

/**
 * URL universal: abre no Android, no iOS e no WhatsApp Web. É o destino final
 * de todo mundo e o fallback de quem tentou o deep link e não conseguiu.
 */
export function montarUrlWhatsApp(destino: DestinoWhatsApp): string {
  const numero = somenteDigitos(destino.numero);
  return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(destino.mensagem)}`;
}

/** Deep link do app: abre a conversa sem passar por página nenhuma. */
export function montarDeepLinkWhatsApp(destino: DestinoWhatsApp): string {
  const numero = somenteDigitos(destino.numero);
  return `whatsapp://send?phone=${numero}&text=${encodeURIComponent(destino.mensagem)}`;
}

/**
 * Quem recebe o deep link.
 *
 * iPad a partir do iPadOS 13 se identifica como Macintosh e cai no caminho de
 * desktop — de propósito: é melhor abrir o WhatsApp Web do que arriscar um
 * esquema que talvez não resolva ali.
 */
export function ehDispositivoMovel(userAgent: string | undefined): boolean {
  return /android|iphone|ipad|ipod/i.test(userAgent ?? "");
}

/**
 * Página que dispara o deep link no celular.
 *
 * Tem que ser uma página, e não um 302 com `Location: whatsapp://`, porque
 * navegador bloqueia redirect para esquema externo vindo de outra origem. Mas
 * ela não chega a ser vista: o app assume antes de qualquer coisa pintar.
 *
 * O fallback existe porque o deep link pode falhar calado (app não instalado,
 * navegador que bloqueia o esquema). E ele é cancelado quando a aba fica
 * escondida, que é o sinal de que o app assumiu — sem isso, quem voltasse do
 * WhatsApp para o navegador daria de cara com a página "Abrir app".
 */
export function montarPaginaDeepLink(destino: DestinoWhatsApp): string {
  const app = montarDeepLinkWhatsApp(destino);
  const web = montarUrlWhatsApp(destino);
  // & vira &amp; para o href ser HTML válido; o resto da URL já saiu encodado.
  const webHtml = web.replace(/&/g, "&amp;");

  return [
    "<!doctype html>",
    '<html lang="pt-BR">',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta name="robots" content="noindex">',
    "<title>Abrindo o WhatsApp…</title>",
    // Sem JS não há deep link possível: vai direto para a URL universal.
    `<noscript><meta http-equiv="refresh" content="0;url=${webHtml}"></noscript>`,
    "<style>body{margin:0;min-height:100vh;display:flex;align-items:center;" +
      "justify-content:center;font:16px/1.5 system-ui,-apple-system,sans-serif;" +
      "color:#555;text-align:center;padding:24px}a{color:#25D366}</style>",
    `<p>Abrindo o WhatsApp… <a href="${webHtml}">toque aqui se não abrir</a>.</p>`,
    "<script>(function(){",
    `var app=${JSON.stringify(app)},web=${JSON.stringify(web)},assumiu=false;`,
    'function marcar(){if(document.visibilityState==="hidden"){assumiu=true;}}',
    'document.addEventListener("visibilitychange",marcar);',
    'window.addEventListener("pagehide",function(){assumiu=true;});',
    "setTimeout(function(){if(!assumiu){location.replace(web);}},1200);",
    "try{location.href=app;}catch(e){location.replace(web);}",
    "})();<" + "/script>",
  ].join("");
}
