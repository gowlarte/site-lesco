import { site } from "./site";

/**
 * Destinos do redirecionador /wa/<slug>. Só os dados — como a pessoa chega até
 * a conversa está em src/lib/whatsappRedirect.ts.
 *
 * Existe por causa de uma regra da Meta: template de WhatsApp aprovado não
 * aceita botão "Visitar site" apontando direto para wa.me — link direto de
 * WhatsApp, assim como encurtador, é motivo de reprovação na revisão porque
 * esconde o destino real. Então o botão do template aponta para
 * https://lesco.com.br/wa/<slug>, num domínio que é nosso, e api/wa.ts é quem
 * leva a pessoa para a conversa.
 *
 * Serve também para qualquer link fora do template (LP externa, e-mail,
 * assinatura): trocar o número de um consultor passa a ser editar uma linha
 * aqui, em vez de caçar link espalhado por aí.
 */

export interface DestinoWhatsApp {
  /** Número em dígitos internacionais: DDI + DDD + número, sem "+" nem símbolo. */
  numero: string;
  /** Quem atende. Só para orientar quem for editar este arquivo. */
  nome: string;
  /** Texto que já vai preenchido na conversa — é o que identifica a origem do lead. */
  mensagem: string;
}

/** Usado quando a URL não traz slug, ou traz um que não existe mais. */
export const SLUG_PADRAO = "comercial";

/**
 * O slug é o que vai na URL do botão do template. Para adicionar um consultor,
 * copie um bloco, troque número/nome/mensagem e faça deploy — nada mais.
 *
 * Mensagens diferentes para a mesma pessoa (uma por campanha, por exemplo)
 * são slugs diferentes apontando para o mesmo número.
 */
export const DESTINOS_WHATSAPP: Record<string, DestinoWhatsApp> = {
  comercial: {
    numero: site.whatsappNumber,
    nome: "Comercial Lesco",
    mensagem: "Olá! Vim pelo WhatsApp da Lesco e quero falar com o comercial.",
  },
  // Exemplo de consultor — descomente e troque pelos dados reais:
  // joao: {
  //   numero: "5511999999999",
  //   nome: "João — Consultor técnico",
  //   mensagem: "Olá, João! Vim pelo WhatsApp da Lesco.",
  // },
};

/**
 * O slug chega da querystring da Vercel, que devolve array quando o parâmetro
 * aparece repetido. Normaliza para uma string comparável.
 */
export function normalizarSlug(valor: string | string[] | undefined): string {
  const bruto = Array.isArray(valor) ? valor[0] : valor;
  return (bruto ?? "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
}

/**
 * Slug desconhecido cai no destino padrão de propósito: um erro de digitação
 * no template (que só dá para corrigir passando por nova aprovação da Meta)
 * não pode deixar o lead na mão.
 */
export function resolverDestino(slug: string): DestinoWhatsApp {
  return DESTINOS_WHATSAPP[slug] ?? DESTINOS_WHATSAPP[SLUG_PADRAO];
}
