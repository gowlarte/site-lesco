## Diagnóstico

O componente `src/components/SEO.tsx` já injeta tags Open Graph e Twitter Card (`og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, etc.) em **todas** as páginas via `react-helmet-async`, e o prerender (`generateSeoHeadHtml.ts`) replica isso no HTML estático para crawlers sem JS. O que falta para "melhorar o compartilhamento":

1. **Nenhuma página define `og:image`** → previews saem sem imagem.
2. Domínio das URLs está em `lesco.lovable.app` (deve ser `https://lesco.com.br`).
3. Faltam tags complementares que enriquecem o preview (`og:site_name`, `og:locale`, `og:image:width/height`, `og:image:alt`).

## O que será feito

### 1. Imagem de compartilhamento padrão
Gerar uma imagem de marca 1200×630 em `src/assets/og-default.jpg` (identidade Lesco — fundo escuro, logo, tipografia da marca), usada como fallback em qualquer página sem imagem própria.

### 2. Aprimorar o componente `SEO.tsx`
- Importar `og-default.jpg` como imagem padrão; usar a imagem da página quando fornecida, senão o padrão.
- Normalizar caminhos relativos (assets empacotados `/assets/...`) para **URL absoluta** com o domínio, exigido pelos crawlers.
- Adicionar: `og:site_name` ("Lesco"), `og:locale` ("pt_BR"), `og:image:width` (1200), `og:image:height` (630), `og:image:alt` (= título), e `twitter:image:alt`.
- Trocar `SITE_URL` para `https://lesco.com.br`.

### 3. Atualizar o prerender (`generateSeoHeadHtml.ts`)
- `SITE_URL` → `https://lesco.com.br`.
- Incluir as mesmas tags novas (site_name, locale, image:width/height/alt) e a `og:image` padrão como fallback no HTML estático.

### 4. Imagens reais por página
Passar `image={...}` no `<SEO>` das páginas que têm um hero/foto natural:
- `Index` (hero AltWood), `Linhas`, `Manto`, `MantoBrise`, `MantoShield`, `MantoDeck`, `MantoLine`, `MantoPanel` (hero/projeto de cada linha), `Sustentabilidade` (hero floresta), `MadeiraWPC`, `Blog` (imagem do artigo em destaque), `BlogArtigo` (hero do artigo).
- `Portfolio` (hero de um projeto). `PortfolioProjeto` e `LinhaEmBreve` **já passam** imagem.
- Páginas sem foto natural (QuemSomos, Catálogo, Biblioteca, Orçamento, Obrigado*) usam a imagem de marca padrão automaticamente.

### 5. Ajustes de domínio relacionados
- `ssg-routes.json`: trocar os `canonical` de `lesco.lovable.app` → `lesco.com.br`.
- `index.html`: atualizar a `url` do JSON-LD Organization para `https://lesco.com.br`.

## Detalhes técnicos

- A normalização de imagem: se `image` começar com `http`, usa como está (ex.: fotos Unsplash do blog); caso contrário, prefixa `https://lesco.com.br`.
- Como o site é pré-renderizado, as tags (incluindo `og:image` absoluta) ficam no HTML estático servido a LinkedIn/Facebook/WhatsApp/X, garantindo preview correto sem depender de JS.
- Validação: rodar `npm run build` e conferir em `dist/index.html`, `dist/madeira-ecologica-lesco/index.html` e `dist/portfolio/index.html` a presença de `og:image`, `og:site_name`, `twitter:card` e URLs em `lesco.com.br`.
