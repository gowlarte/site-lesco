import { describe, it, expect } from "vitest";
import { DESTINOS_WHATSAPP, type DestinoWhatsApp } from "../config/whatsapp";
import {
  ehDispositivoMovel,
  montarDeepLinkWhatsApp,
  montarPaginaDeepLink,
  montarUrlWhatsApp,
} from "./whatsappRedirect";

const DESTINO: DestinoWhatsApp = {
  numero: "5511948449044",
  nome: "Comercial Lesco",
  mensagem: "Olá! Tudo bem?",
};

describe("montarUrlWhatsApp", () => {
  it("monta a URL que abre no Android, no iOS e no WhatsApp Web", () => {
    expect(montarUrlWhatsApp(DESTINO)).toBe(
      "https://api.whatsapp.com/send?phone=5511948449044&text=Ol%C3%A1!%20Tudo%20bem%3F",
    );
  });

  it("limpa número salvo com símbolo, que quebraria só na hora do clique", () => {
    const url = montarUrlWhatsApp({ ...DESTINO, numero: "+55 (11) 94844-9044" });
    expect(url).toContain("phone=5511948449044");
  });

  it("nunca aponta para wa.me, que é o que a Meta reprova no template", () => {
    for (const destino of Object.values(DESTINOS_WHATSAPP)) {
      expect(montarUrlWhatsApp(destino)).toMatch(/^https:\/\/api\.whatsapp\.com\/send\?/);
    }
  });
});

describe("montarDeepLinkWhatsApp", () => {
  it("usa o esquema do app, com o mesmo número e a mesma mensagem", () => {
    expect(montarDeepLinkWhatsApp(DESTINO)).toBe(
      "whatsapp://send?phone=5511948449044&text=Ol%C3%A1!%20Tudo%20bem%3F",
    );
  });
});

describe("ehDispositivoMovel", () => {
  it("reconhece celular, inclusive o browser interno do WhatsApp no Android", () => {
    expect(ehDispositivoMovel("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe(true);
    expect(ehDispositivoMovel("Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit")).toBe(true);
    expect(
      ehDispositivoMovel("Mozilla/5.0 (Linux; Android 13; wv) AppleWebKit/537.36 Chrome/120 Mobile"),
    ).toBe(true);
  });

  it("manda desktop para o caminho https, onde sempre há saída", () => {
    expect(ehDispositivoMovel("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140")).toBe(false);
    expect(ehDispositivoMovel("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605")).toBe(false);
    expect(ehDispositivoMovel(undefined)).toBe(false);
    expect(ehDispositivoMovel("")).toBe(false);
  });
});

describe("montarPaginaDeepLink", () => {
  const html = montarPaginaDeepLink(DESTINO);

  it("dispara o deep link e guarda a URL https como fallback", () => {
    expect(html).toContain(JSON.stringify(montarDeepLinkWhatsApp(DESTINO)));
    expect(html).toContain(JSON.stringify(montarUrlWhatsApp(DESTINO)));
    expect(html).toContain("location.href=app");
    expect(html).toContain("location.replace(web)");
  });

  it("cancela o fallback quando o app assume, para não voltar na página do WhatsApp", () => {
    expect(html).toContain("visibilitychange");
    expect(html).toContain("pagehide");
  });

  it("ainda funciona sem JS", () => {
    expect(html).toContain("<noscript><meta http-equiv=\"refresh\"");
  });

  it("fecha a tag do script sem quebrar o HTML", () => {
    expect(html).toContain("</script>");
    expect(html.match(/<script>/g)).toHaveLength(1);
  });

  it("não é indexável — é uma passagem, não uma página", () => {
    expect(html).toContain('name="robots" content="noindex"');
  });
});
