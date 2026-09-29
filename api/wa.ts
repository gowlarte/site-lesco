import { normalizarSlug, resolverDestino } from "../src/config/whatsapp";
import {
  ehDispositivoMovel,
  montarPaginaDeepLink,
  montarUrlWhatsApp,
} from "../src/lib/whatsappRedirect";

/**
 * GET /wa/<slug> → leva a pessoa para a conversa no WhatsApp do destino.
 * GET /wa        → mesma coisa, no destino padrão.
 *
 * As rotas públicas chegam aqui pelos rewrites do vercel.json. O porquê de
 * isto viver num domínio nosso está em src/config/whatsapp.ts; o porquê de
 * celular e desktop seguirem caminhos diferentes está em
 * src/lib/whatsappRedirect.ts.
 *
 * Nada da URL vai parar no destino além da escolha do slug — a mensagem
 * pré-preenchida é sempre a do arquivo de config. Assim ninguém consegue
 * montar um lesco.com.br/wa/... que abre o WhatsApp com texto arbitrário.
 */

/**
 * Tipagem mínima do (req, res) do runtime Node da Vercel. Escrita à mão para
 * não adicionar @vercel/node ao projeto só por causa de quatro campos.
 */
interface RequisicaoVercel {
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
}

interface RespostaVercel {
  setHeader(nome: string, valor: string): void;
  status(codigo: number): RespostaVercel;
  send(corpo: string): void;
}

function primeiroValor(valor: string | string[] | undefined): string | undefined {
  return Array.isArray(valor) ? valor[0] : valor;
}

export default function handler(req: RequisicaoVercel, res: RespostaVercel): void {
  const destino = resolverDestino(normalizarSlug(req.query?.slug));
  const userAgent = primeiroValor(req.headers?.["user-agent"]);

  // no-store porque o mapa de consultores muda: uma resposta cacheada no
  // navegador (ou no browser interno do WhatsApp) mandaria lead para o número
  // antigo por tempo indeterminado, e não temos como invalidar isso.
  res.setHeader("Cache-Control", "no-store");
  // A resposta muda conforme o aparelho — sem Vary, um cache intermediário
  // poderia servir a versão de desktop para um celular, e vice-versa.
  res.setHeader("Vary", "User-Agent");

  if (ehDispositivoMovel(userAgent)) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(montarPaginaDeepLink(destino));
    return;
  }

  const url = montarUrlWhatsApp(destino);
  res.setHeader("Location", url);

  // O corpo de um 302 quase nunca aparece, mas é o que sobra se o redirect
  // for bloqueado — melhor um link clicável do que tela branca.
  const href = url.replace(/&/g, "&amp;");
  res.status(302).send(
    `<!doctype html><html lang="pt-BR"><meta charset="utf-8">` +
      `<meta name="robots" content="noindex">` +
      `<title>Abrindo o WhatsApp…</title>` +
      `<p>Abrindo o WhatsApp… <a href="${href}">toque aqui se não abrir sozinho</a>.</p>`,
  );
}
