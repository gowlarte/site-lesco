# Plano revisado: Captura de UTMs nos formulários GHL (site React Lesco)

## ⚠️ A contradição que muda tudo (leia primeiro)

Seu guia e os scripts das LPs externas preenchem os campos com `document.querySelectorAll('input[name="utm_source"]')` / `getElementById`. **Isso NÃO alcança os formulários deste site.**

Aqui todos os forms são embeds do GHL em **iframe cross-origin**:
```text
<iframe src="https://api.leadconnectorhq.com/widget/form/GTcMRzSzlRyI4MLLuFYJ">
```
Os `<input hidden>` de UTM estão **dentro** desse iframe, servidos por `leadconnectorhq.com`. O navegador **proíbe** o JS da página-pai de ler/escrever ali. Logo, todo o bloco de `setVal` + `MutationObserver` + retries escalonados **roda, mas não preenche nada** nos forms reais deste site. Ele só funcionaria em form HTML nativo (Elementor, RD, Gravity) — que é o cenário do seu guia, não o nosso.

Por que "funciona nas LPs externas": o próprio `form_embed.js` do GHL repassa os query params da URL da página-pai para dentro do iframe. Não é o `querySelectorAll` que faz o trabalho lá — é o GHL lendo a URL.

**Conclusão:** o mecanismo que de fato preenche campos ocultos do GHL em iframe é **anexar os valores como query params na própria `src` do iframe**. O GHL casa cada param com o campo cujo *Query Key* tem o mesmo nome. É isso que vamos construir como camada principal. O DOM-fill entra só como fallback inofensivo (caso algum dia exista form nativo).

Forms afetados (5 iframes hoje hardcoded):
- `src/pages/Orcamento.tsx` (`GTcMRzSzlRyI4MLLuFYJ`)
- `src/pages/Catalogo.tsx` (`lr26Z8p5zKyXXMvt1CKn`)
- `src/pages/Biblioteca.tsx` (`RWTy3Nwtw9O1iGmxd3wT`)
- `src/components/WhatsAppButton.tsx` (`NCyQbX00m3csRV6jg6RB`)
- `src/components/NewsletterLancamentoForm.tsx` (recebe `formId` por prop)

## Plano de Ação

### 1. Módulo central `src/lib/utm.ts`
Incorpora **todas** as correções do seu guia:
- Lê da URL: `utm_source, utm_medium, utm_campaign, utm_content, utm_term, campaign_id, adset_id, ad_id, gclid, fbclid`.
- Persiste em `localStorage` com TTL de 24h (`lesco_*` + `lesco_utm_ts`), tudo em **try/catch** (Safari privado não derruba o script).
- `FIELD_MAP` explícito: `gclid → gclid_field`, `fbclid → fbclid`, etc. (corrige o Gap 3/5).
- `url_conversao`: salva no localStorage **apenas quando há UTM nova na URL** (= LP de origem real); fallback = URL atual (corrige o Gap 2).
- `user_agent_lead`: capturado fresco.
- Sincroniza `sessionStorage` (`lesco_utm`) com o mesmo conteúdo, para o forwarder (item 4) e o script externo conversarem (corrige o Gap 1).
- Exporta `getUtmValues()` e `buildGhlFormUrl(baseUrl)`.

### 2. `buildGhlFormUrl()` — camada principal (o que realmente funciona)
Anexa à `src` do iframe os campos com valor, como query params (com `encodeURIComponent`). Para não estourar o tamanho da URL, `user_agent_lead` e `url_conversao` (longos) vão **só pelo forwarder do item 4**, não pela URL do iframe — os IDs de UTM/click, que são o essencial para o GHL, vão na URL.

### 3. Componente único `src/components/GhlForm.tsx`
- Centraliza `<iframe>`, carregamento do `form_embed.js` e o auto-resize (reaproveita a lógica que já existe em `NewsletterLancamentoForm.tsx`).
- Monta a `src` via `buildGhlFormUrl()`.
- Substitui os 5 iframes espalhados (fim da duplicação). Layout/altura/estilo idênticos aos atuais — zero regressão visual.

### 4. Forwarder do dashboard `src/hooks/useUtmForwarder.ts` (montado 1x no `App.tsx`)
Replica o script do `<body>` da LP:
- Listener de `postMessage` (`form_submitted` / `FORM_SUBMITTED`) + fallback `submit`.
- `navigator.sendBeacon` para `lesco-dash.vercel.app/api/utm-push` e `/api/supplement` (tokens e delay 5s + retry de 10s iguais), usando as UTMs do `sessionStorage`.
- Flag `alreadySent` para não disparar 2x.

### 5. Captura precoce no `index.html`
Script curto no `<head>` (após o GTM) que chama a persistência assim que a página abre — garante a UTM salva mesmo se o usuário entrar numa página sem form e só depois ir ao orçamento/catálogo.

## Plano de Prevenção de Erros

1. **Cross-origin (o gap principal)** → valores via query param na `src` do iframe; nunca tento tocar o DOM interno do iframe.
2. **Query Key do GHL** → o preenchimento depende de cada campo oculto ter *Query Key* = nome do param (`utm_source`, `gclid_field`, `url_conversao`...). Preciso que você confirme isso no GHL; se algum diferir, ajusto o `FIELD_MAP`.
3. **Storage bloqueado (Safari privado/iOS)** → todo acesso a `localStorage`/`sessionStorage` em try/catch; cai para URL direta.
4. **SPA perde a query string** → persistência em localStorage (24h) + captura no `<head>`.
5. **SSR/prerender** (`scripts/prerender.ts`) → todo acesso a `window`/`navigator`/`storage` guardado por `typeof window !== 'undefined'`.
6. **url_conversao errada** → só sobrescreve quando há UTM nova na URL (preserva first-touch).
7. **Duplo disparo à API** → `alreadySent`; o head só persiste/preenche, nunca chama a API (responsabilidades separadas).
8. **URL do iframe muito longa** → UA e url_conversao vão pelo forwarder, não pela URL.
9. **Valores vazios** → só anexo params com valor (não suja a URL nem sobrescreve com vazio).
10. **Sem regressão visual** → `GhlForm` mantém layout/altura/estilo atuais.

## Detalhes técnicos
- Tokens (`Lescomkt@2026#$`, `LescoGHL2026`) ficam no client, como já estão na LP externa (são tokens de endpoint, não segredo crítico). Registro que ficam visíveis no bundle.
- Trabalho 100% frontend — sem mudanças de backend/Supabase.

## Pergunta antes de implementar
Confirma que os campos ocultos no GHL têm **Query Key** = `utm_source, utm_medium, utm_campaign, utm_content, utm_term, campaign_id, adset_id, ad_id, gclid_field, fbclid, url_conversao, user_agent_lead`? Se algum nome divergir, me passa o correto que eu mapeio.