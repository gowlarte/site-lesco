// ---------------------------------------------------------------------------
// Regressão do crash das páginas de linha em breve (/zhu, /echo, /geo).
//
// A página monta o MESMO formulário GHL duas vezes (hero + CTA final). Antes da
// correção: (1) os dois iframes tinham o mesmo id de DOM e cada instância
// reagia às mensagens da outra, e (2) cada mensagem somava +56px à altura. Como
// o form hospedado do GHL usa height:100%, ele devolve a altura que nós mesmos
// aplicamos — o ciclo nunca fechava e a página crescia sem limite.
//
// Aqui simulamos o postMessage do embed sem navegador: em jsdom o iframe não
// carrega a URL do GHL (sem rede) e ainda assim expõe `contentWindow`, que é o
// que o filtro de origem do componente usa.
// ---------------------------------------------------------------------------
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { NewsletterLancamentoForm } from "./NewsletterLancamentoForm";

// Valores reais de produção (src/data/linhas-em-breve.ts): as três linhas
// compartilham o mesmo formId, por isso o id duplicado era garantido.
const FORM_ID = "A7iX7TMKzhNq1vXwMiVy";
const FORM_HEIGHT = 470;
const ORIGIN = "https://api.leadconnectorhq.com";

/** Mínimo responsivo do componente no desktop (matchMedia stub = não-mobile). */
const MIN_DESKTOP = 545;
const MAX_HEIGHT = 2400;

/** Renderiza o par hero + CTA final, como em LinhaEmBreve.tsx. */
const renderPagina = () => {
  const { container } = render(
    <>
      <NewsletterLancamentoForm slug="zhu" nomeLinha="Zhú" formId={FORM_ID} formHeight={FORM_HEIGHT} />
      <NewsletterLancamentoForm slug="zhu" nomeLinha="Zhú" formId={FORM_ID} formHeight={FORM_HEIGHT} />
    </>
  );
  const [hero, cta] = Array.from(container.querySelectorAll("iframe"));
  return { hero, cta };
};

const alturaAplicada = (iframe: HTMLIFrameElement) => parseFloat(iframe.style.height);

/** postMessage do embed do GHL, atribuído a um iframe específico. */
const postDoIframe = (
  iframe: HTMLIFrameElement,
  data: unknown,
  { origin = ORIGIN, source }: { origin?: string; source?: unknown } = {}
) => {
  const event = new MessageEvent("message", { data, origin });
  Object.defineProperty(event, "source", {
    value: source === undefined ? iframe.contentWindow : source,
  });
  fireEvent(window, event);
};

/** Mensagem no formato iFrameSizer, que é o que o GHL realmente manda. */
const reportaAltura = (iframe: HTMLIFrameElement, altura: number) =>
  postDoIframe(iframe, `[iFrameSizer]${iframe.id}:${altura}`);

/** O comportamento do form real (height:100%): devolve a altura já aplicada. */
const echo = (iframe: HTMLIFrameElement) => reportaAltura(iframe, alturaAplicada(iframe));

/** Roda `fn` com o matchMedia respondendo mobile ou desktop, e restaura depois. */
const comMatchMedia = <T,>(mobile: boolean, fn: () => T): T => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: mobile,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  try {
    return fn();
  } finally {
    window.matchMedia = original;
  }
};

afterEach(cleanup);

describe("NewsletterLancamentoForm — blindagem do loop de altura", () => {
  it("dá id de DOM único a cada instância do mesmo formId", () => {
    const { hero, cta } = renderPagina();

    expect(hero.id).not.toBe(cta.id);
    expect(hero.dataset.layoutIframeId).toBe(hero.id);
    expect(cta.dataset.layoutIframeId).toBe(cta.id);
    // O formId continua igual — é o mesmo formulário, só o id de DOM difere.
    expect(hero.dataset.formId).toBe(FORM_ID);
    expect(cta.dataset.formId).toBe(FORM_ID);
  });

  it("não cresce quando o iframe devolve a própria altura (o loop do crash)", () => {
    const { hero, cta } = renderPagina();
    const inicialHero = alturaAplicada(hero);
    const inicialCta = alturaAplicada(cta);

    for (let i = 0; i < 60; i++) {
      echo(hero);
      echo(cta);
    }

    // Com o bug antigo cada mensagem somava 56px: 60 rodadas = +3360px por form.
    expect(alturaAplicada(hero)).toBe(inicialHero);
    expect(alturaAplicada(cta)).toBe(inicialCta);
  });

  it("é estável no cenário de produção (form reporta 470 indefinidamente)", () => {
    const { hero } = renderPagina();
    expect(alturaAplicada(hero)).toBe(MIN_DESKTOP);

    for (let i = 0; i < 40; i++) reportaAltura(hero, FORM_HEIGHT);

    expect(alturaAplicada(hero)).toBe(MIN_DESKTOP);
  });

  it("uma instância não altera a altura da outra", () => {
    const { hero, cta } = renderPagina();
    const alturaCta = alturaAplicada(cta);

    reportaAltura(hero, 1200);

    expect(alturaAplicada(hero)).toBeGreaterThan(alturaCta);
    expect(alturaAplicada(cta)).toBe(alturaCta);
  });

  it("ignora mensagem de origem estranha", () => {
    const { hero } = renderPagina();
    const antes = alturaAplicada(hero);

    postDoIframe(hero, `[iFrameSizer]${hero.id}:1800`, { origin: "https://evil.example" });

    expect(alturaAplicada(hero)).toBe(antes);
  });

  it("ignora mensagem sem source do próprio iframe", () => {
    const { hero } = renderPagina();
    const antes = alturaAplicada(hero);

    postDoIframe(hero, `[iFrameSizer]${hero.id}:1800`, { source: null });
    postDoIframe(hero, { height: 1800 }, { source: window });

    expect(alturaAplicada(hero)).toBe(antes);
  });

  it("cresce uma vez para o conteúdo real e para de reagir (ponto fixo)", () => {
    const { hero } = renderPagina();

    reportaAltura(hero, 1200);
    const negociada = alturaAplicada(hero);
    expect(negociada).toBe(1256); // 1200 + folga de 56

    // O conteúdo continua com 1200: nenhuma correção nova.
    for (let i = 0; i < 20; i++) reportaAltura(hero, 1200);
    expect(alturaAplicada(hero)).toBe(negociada);

    // E se o form passar a ecoar a altura aplicada, também fica parado.
    for (let i = 0; i < 20; i++) echo(hero);
    expect(alturaAplicada(hero)).toBe(negociada);
  });

  it("respeita o teto rígido de altura", () => {
    const { hero } = renderPagina();

    reportaAltura(hero, 99999);
    expect(alturaAplicada(hero)).toBe(MAX_HEIGHT);

    for (let i = 0; i < 20; i++) reportaAltura(hero, 99999);
    expect(alturaAplicada(hero)).toBe(MAX_HEIGHT);
  });

  it("aceita também o formato JSON de altura", () => {
    const { hero } = renderPagina();

    postDoIframe(hero, JSON.stringify({ height: 900 }));
    expect(alturaAplicada(hero)).toBe(956);
  });

  it("resize da janela não desfaz a altura já negociada", () => {
    const { hero } = renderPagina();
    reportaAltura(hero, 1200);
    const negociada = alturaAplicada(hero);

    for (let i = 0; i < 10; i++) fireEvent(window, new Event("resize"));

    expect(alturaAplicada(hero)).toBe(negociada);
  });

  it("primeiro render não depende de matchMedia (hidratação do SSG)", () => {
    const form = (
      <NewsletterLancamentoForm slug="zhu" nomeLinha="Zhú" formId={FORM_ID} formHeight={FORM_HEIGHT} />
    );
    // O prerender roda sem window; o cliente hidrata com window. Se o primeiro
    // render consultar matchMedia, os dois divergem e a altura do HTML estático
    // fica congelada (React não corrige atributo em mismatch de hidratação).
    const desktop = comMatchMedia(false, () => renderToStaticMarkup(form));
    const mobile = comMatchMedia(true, () => renderToStaticMarkup(form));

    expect(mobile).toBe(desktop);
    expect(desktop).toMatch(/height:526px/);
  });

  it("aplica o mínimo responsivo mobile depois de montar", () => {
    comMatchMedia(true, () => {
      const { hero, cta } = renderPagina();
      expect(alturaAplicada(hero)).toBe(650);
      expect(alturaAplicada(cta)).toBe(650);
    });
  });

  it("para de reagir se o embed mandar alturas contraditórias para sempre", () => {
    const { hero } = renderPagina();
    const alturas: number[] = [alturaAplicada(hero)];

    // Pior caso: o embed alterna entre conteúdo (1200) e eco da animação (700),
    // que sozinho manteria o componente re-renderizando indefinidamente.
    for (let i = 0; i < 200; i++) {
      reportaAltura(hero, i % 2 === 0 ? 1200 : 700);
      const atual = alturaAplicada(hero);
      if (atual !== alturas[alturas.length - 1]) alturas.push(atual);
    }

    // Não importa quantas mensagens cheguem: o número de correções é limitado.
    expect(alturas.length).toBeLessThanOrEqual(25);
    expect(alturaAplicada(hero)).toBeLessThanOrEqual(MAX_HEIGHT);
  });
});
