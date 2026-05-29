# Migração de tracking: GTM + GA4 + GHL no site Lovable

Objetivo: instalar o GTM (`GTM-NLMKCHH`) no site novo, garantir pageviews corretos em SPA, suportar conversões dos forms GHL e migrar tudo com `lesco.com.br` como domínio principal — sem duplicar eventos.

## O que faço no código (Lovable)

### 1. Snippet GTM no `index.html`
- `<script>` do GTM como **primeiro** item do `<head>` (antes do marcador `<!--seo-head-->`).
- `<noscript>` do GTM logo após `<body>`, **antes** de `<div id="root">`.
- É estático e sobrevive ao prerender SSG (o `prerender.ts` só substitui `<!--seo-head-->` e `<div id="root"></div>`).

```text
<head>
  <!-- Google Tag Manager (GTM-NLMKCHH) -->
  ... script ...
  <meta charset> ... <!--seo-head--> ...
</head>
<body>
  <noscript><iframe .../></noscript>
  <div id="root"></div>
```

### 2. Hook de pageview SPA — `src/hooks/usePageTracking.ts`
- Em cada mudança de rota faz `dataLayer.push({ event: 'virtual_page_view', page_path, page_title })`.
- Roda só no cliente (dentro de `useEffect`), seguro para SSG.

### 3. Chamada do hook
- Adicionar `usePageTracking()` dentro de `AppContent` em `src/App.tsx` (que já está sob `BrowserRouter` e já usa `useLocation`).

### Detalhes técnicos
- `window.dataLayer` já é usado por `src/lib/track404.ts`; o hook reutiliza o mesmo array sem conflito.
- O `GTM-NLMKCHH` é ID público — pode ficar hardcoded no `index.html`.
- Nada de RD Station (descontinuado; conversões via GHL).

## O que VOCÊ executa no painel (não tenho acesso à sua conta GTM/GA4)

Eu entrego o passo a passo; a configuração das tags é feita por você no GTM.

### GTM
1. **Trigger Custom Event** `virtual_page_view`.
2. **Tag [44] GA4 Configuração** → adicionar `send_page_view = false` (evita page_view duplicado na carga).
3. **Nova tag GA4 Event** `page_view` com `page_path = {{Page Path}}`, `page_title = {{Page Title}}`, disparando no trigger `virtual_page_view`.
4. **Forms GHL** ([147] `ghl_form_submit` / trigger 146): confirmar no Preview que o evento dispara nas páginas novas e que conversões Google Ads [42], Meta [92], GA4 [49] disparam.
5. **Triggers de pageview de obrigado**: atualizar URLs para as rotas reais do Lovable — `/obrigado-orcamento`, `/obrigado-whats`, `/obrigado-catalogo` (catálogo já pronto). Trigger 148 e trigger 62 (LPs) revisados.
6. **Limpeza pós Go-Live** (opcional): tags pausadas [140], [138], [139]; triggers antigos 106/111/81 se sem uso.

### GA4
- Data Streams → Enhanced Measurement → **desligar "Page changes based on browser history events"** (evita duplicação com o virtual_page_view manual).

## Plano de prevenção de erros

| Verificação | Ferramenta | Esperado |
|---|---|---|
| Carga inicial | GTM Preview | `gtm.js` + `virtual_page_view` (page_path=/) |
| Troca de rota | GTM Preview | `virtual_page_view` a cada rota |
| Pageviews | GA4 DebugView | 1 `page_view` por rota, sem duplicatas |
| Submit form GHL | GTM Preview | `ghl_form_submit` + conversões disparando |
| Conversão | GA4 DebugView | evento 1x por submit |
| Páginas de obrigado | Browser | trigger de pageview na URL certa |
| Google Ads | Tag Assistant | vinculador ativo, sem erros |

### Riscos e mitigação
- **Lovable sobrescreve `index.html`** (média): após qualquer regeneração grande via IA, conferir se o snippet GTM continua presente.
- **Page_view duplicado** (alta sem config): aplicar `send_page_view=false` + desligar Enhanced Measurement history; validar no DebugView.
- **Form GHL não dispara** (média): testar cada form no GTM Preview antes do Go-Live.
- **URL de obrigado divergente** (alta): URLs definitivas já confirmadas no código (`/obrigado-orcamento`, `/obrigado-whats`, `/obrigado-catalogo`).

## Checklist de deploy
- [ ] GTM no `index.html` (head + noscript)
- [ ] `usePageTracking` criado e chamado em `App.tsx`
- [ ] Build de produção testado (não só dev)
- [ ] GTM: trigger `virtual_page_view`
- [ ] GTM: GA4 config `send_page_view=false`
- [ ] GTM: nova tag GA4 `page_view`
- [ ] GA4: Enhanced Measurement history desligado
- [ ] Triggers de obrigado/LPs com URLs do Lovable
- [ ] GTM publicado
- [ ] GA4 DebugView sem duplicatas
- [ ] Conversão de teste (Google Ads + Meta) confirmada
