# Corrigir SSG/SSR — conteúdo estático não aparece (view-source vazio na Vercel)

## Diagnóstico

Investiguei toda a cadeia (`vercel.json`, `package.json`, `scripts/prerender.ts`, `entry-server.tsx`, `entry-client.tsx`, `index.html`, `App.tsx`, `usePageAssets`, `SplashScreen`). O pipeline de prerender em si está correto e seguro para SSR. Há **dois problemas independentes**:

### Problema 1 (causa do "view-source vazio") — a Vercel não roda o prerender
O `vercel.json` não define `buildCommand`. Com o preset **Vite**, a Vercel executa por padrão `vite build` — e **não** o script `npm run build` do `package.json` (que é quem encadeia `build:client → build:server → tsx scripts/prerender.ts`).

Resultado: a Vercel publica o `index.html` "cru" do Vite, com apenas:

```text
<div id="root"></div>
```

Por isso o view-source de **todas** as rotas vem vazio: o passo de prerender nunca roda no deploy. Localmente o `npm run build` funciona, mas a Vercel ignora.

### Problema 2 (conteúdo só aparece via JS) — o conteúdo fica oculto até o splash terminar
Mesmo quando o HTML é pré-renderizado, em `App.tsx` todo o conteúdo é envolvido por:

```text
<div style={{ visibility: contentVisible ? 'visible' : 'hidden' }}>
```

e `contentVisible` só vira `true` depois que o SplashScreen (≈4s de JS) termina. Ou seja, o conteúdo estático existe no HTML, mas fica **invisível até o JS rodar** — se a hidratação falhar/atrasar, a página fica em branco. Isso anula o propósito do SSG (conteúdo visível imediatamente, inclusive sem JS) e cria risco de mismatch de hidratação (o servidor renderiza o estado oculto/splash que o cliente precisa reproduzir exatamente).

## Correções

### 1. Forçar a Vercel a rodar o pipeline completo (`vercel.json`)
- Adicionar `"buildCommand": "npm run build"` e `"outputDirectory": "dist"`.
- Manter `cleanUrls` e o rewrite de fallback apenas para rotas dinâmicas (ex.: `/projetos/:slug`, `/blog/:slug`). A Vercel serve os arquivos estáticos pré-renderizados (`dist/quem-somos/index.html`, etc.) antes de aplicar o rewrite, então as rotas com HTML próprio continuam servindo seu conteúdo real; o rewrite só pega o que não tem arquivo, caindo no SPA com roteamento no cliente.

### 2. Tornar o conteúdo estático visível sem depender do JS (`App.tsx` + `SplashScreen`)
- Remover o portão `visibility/opacity` que esconde `AppContent` até o splash terminar. O conteúdo passa a renderizar normalmente (visível no carregamento direto da URL, mesmo antes da hidratação).
- Transformar o `SplashScreen` em um **overlay puro** por cima do conteúdo (ele já é `fixed inset-0 z-[9999]`), e exibi-lo **somente após o mount no cliente** (via estado `mounted` setado em `useEffect`). Assim:
  - O HTML do servidor = conteúdo real (sem splash) → view-source com conteúdo e **sem mismatch de hidratação**.
  - No cliente, após hidratar, o splash aparece como animação de entrada e depois some, sem nunca ocultar o conteúdo subjacente.
- Ajustar o `background-color: #141414` inline do `<body>` em `index.html` para não deixar a página "preta" caso o overlay não monte (o overlay já pinta o próprio fundo enquanto ativo).

### 3. Validação do build (obrigatória antes de concluir)
Rodar `npm run build` e conferir que o view-source tem conteúdo real:
- `dist/index.html`
- `dist/quem-somos/index.html`
- `dist/orcamento/index.html`

Cada um deve conter o `<title>`/meta corretos e o HTML renderizado dentro de `<div id="root">…</div>` (texto, H1, etc.), não apenas `<div id="root"></div>`. Vou inspecionar o conteúdo gerado para confirmar.

## Detalhes técnicos
- Nenhuma dependência nova. `react-helmet-async@3.0.0` já instalado e funcionando no build SSR.
- `entry-server.tsx`, `entry-client.tsx` e `scripts/prerender.ts` permanecem como estão (já corretos); a mudança de visibilidade é só em `App.tsx`/`SplashScreen.tsx`.
- `main.tsx` é código morto (o `index.html` usa `entry-client.tsx`); posso removê-lo para evitar confusão, mas é opcional e não afeta o deploy.
- Os hooks que tocam o DOM (`usePageAssets`, loaders) já só acessam `document`/`window` dentro de `useEffect`, então continuam seguros no SSR.

## Resultado esperado
- Na Vercel, o deploy executa o prerender e cada rota pública é servida como HTML estático com conteúdo real no view-source.
- Ao acessar a URL diretamente, o conteúdo aparece imediatamente (sem ficar refém do JS/splash); o splash vira apenas uma animação por cima.
- SEO técnico atendido: `<title>`, descrição, canonical, OG/Twitter e JSON-LD presentes no HTML inicial de cada rota.