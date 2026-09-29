import { describe, it, expect } from "vitest";
import { site } from "./site.js";
import {
  DESTINOS_WHATSAPP,
  SLUG_PADRAO,
  normalizarSlug,
  resolverDestino,
} from "./whatsapp.js";

describe("normalizarSlug", () => {
  it("aceita o que a querystring da Vercel pode devolver", () => {
    expect(normalizarSlug("comercial")).toBe("comercial");
    expect(normalizarSlug(["comercial", "outro"])).toBe("comercial");
    expect(normalizarSlug(undefined)).toBe("");
  });

  it("tolera caixa, espaço e barra sobrando na URL", () => {
    expect(normalizarSlug("  /Comercial/ ")).toBe("comercial");
  });
});

describe("resolverDestino", () => {
  it("resolve um slug conhecido", () => {
    expect(resolverDestino("comercial")).toBe(DESTINOS_WHATSAPP.comercial);
  });

  it("cai no padrão em vez de deixar o lead na mão", () => {
    expect(resolverDestino("nao-existe")).toBe(DESTINOS_WHATSAPP[SLUG_PADRAO]);
    expect(resolverDestino("")).toBe(DESTINOS_WHATSAPP[SLUG_PADRAO]);
  });
});

describe("DESTINOS_WHATSAPP", () => {
  it("tem o slug padrão cadastrado, senão todo fallback vira undefined", () => {
    expect(DESTINOS_WHATSAPP[SLUG_PADRAO]).toBeDefined();
  });

  it("guarda número só com dígitos e mensagem não vazia", () => {
    for (const [slug, destino] of Object.entries(DESTINOS_WHATSAPP)) {
      expect(destino.numero, slug).toMatch(/^\d{12,13}$/);
      expect(destino.mensagem.trim(), slug).not.toBe("");
    }
  });
});

describe("o número do comercial e o do site", () => {
  /**
   * São dois campos com o mesmo valor e vidas diferentes: um atende o site, o
   * outro é o destino de um template já aprovado pela Meta, que não pode mudar
   * sozinho. Este teste existe para a divergência ser uma decisão — se for
   * intencional, troque a asserção; se não for, você acabou de ser avisado.
   */
  it("hoje apontam para o mesmo lugar", () => {
    expect(DESTINOS_WHATSAPP.comercial.numero).toBe(site.whatsappNumber);
  });
});
