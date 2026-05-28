## Pre-rendering no Lovable — Situação e Plano de Ação

### Entendimento Atual

**A pré-renderização já está ativa automaticamente** para o seu projeto. Segundo a documentação oficial do Lovable (atualizada em 13/05/2026):

- Apps legados (React + Vite, como o seu) usam **on-request pre-rendering** automática em URLs publicadas
- Não requer opt-in, migração ou mudanças de código
- A pré-renderização é servida **apenas para bots verificados** (Google, Bing, social-preview bots, AI engines como ChatGPT, Perplexity, Claude, Gemini)
- Agentes não verificados (incluindo simuladores de SEO de terceiros) continuam vendo o SPA normal
- A pré-renderização acontece no momento da requisição, incluindo conteúdo dinâmico

### O Que Precisa Ser Feito

Como a pré-renderização já está ativa, o foco agora é **garantir que o conteúdo entregue aos crawlers seja otimizado para indexação**. Isso envolve:

1. **Verificar e otimizar meta tags em todas as páginas** — cada página precisa de title, description, Open Graph tags e canonical únicos
2. **Implementar react-helmet-async** para gerenciamento de head por rota (o projeto atual não usa)
3. **Garantir que o index.html base tenha tags adequadas** como fallback
4. **Verificar/criar sitemap.xml** com todas as rotas públicas
5. **Verificar robots.txt** — já existe e permite todos os crawlers
6. **Adicionar JSON-LD estruturado** para rich snippets nas páginas principais
7. **Executar scan SEO no Lovable** para identificar issues específicas

### Detalhes Técnicos

#### Stack atual do projeto
- React 18 + Vite 5 + Tailwind CSS + TypeScript
- React Router DOM (BrowserRouter) — SPA tradicional
- Não usa react-helmet-async para head dinâmico
- `index.html` tem title e description estáticos genéricos
- `robots.txt` permite todos os crawlers

#### O que será implementado

1. **Instalar react-helmet-async** e configurar HelmetProvider no main.tsx
2. **Adicionar <Helmet> em cada página** com:
   - `<title>` único por rota
   - `<meta name="description">` único
   - `<meta property="og:*">` para social previews
   - `<link rel="canonical">` por rota
   - JSON-LD `<script type="application/ld+json">` onde aplicável
3. **Remover `<link rel="canonical">` do index.html** (conflita com Helmet)
4. **Adicionar/verificar sitemap.xml** em `public/sitemap.xml`
5. **Adicionar llms.txt** na raiz para AI crawlers (feature do Lovable)

### Rotas a serem otimizadas

| Rota | Título sugerido | Tipo de conteúdo |
|------|-----------------|------------------|
| / | Lesco · Revestimentos Premium para Arquitetura | Homepage |
| /quem-somos | Quem Somos — Lesco | Institucional |
| /madeira-ecologica-lesco | Madeira Ecológica Lesco — AltWood | Produto/Hub |
| /brise-madeira-ecologica | Brise de Madeira Ecológica — AltWood | Produto |
| /madeira-ecologica-para-fachada | Shield para Fachada — AltWood | Produto |
| /madeira-ecologica-para-deck | Deck de Madeira Ecológica — AltWood | Produto |
| /forro-wpc | Forro WPC — AltWood Line | Produto |
| /placa-wpc-interior | Placa WPC Interior — AltWood Panel | Produto |
| /portfolio | Portfólio de Projetos — Lesco | Portfólio |
| /projetos/:slug | [Nome do Projeto] — Portfólio Lesco | Projeto |
| /blog | Blog — Lesco | Blog |
| /blog/:slug | [Título do Artigo] — Blog Lesco | Artigo |
| /catalogo-lesco | Catálogo — Lesco | Catálogo |
| /orcamento | Solicitar Orçamento — Lesco | Conversão |
| /biblioteca | Biblioteca — Lesco | Recursos |
| /linhas | Nossas Linhas — Lesco | Produtos |
| /zhu, /echo, /geo | [Nome da Linha] — Em Breve | Teaser |

### Como Verificar que Funciona

1. Publicar as mudanças
2. Acessar **Services → SEO & AI search** no Lovable e rodar um scan
3. Verificar no Google Search Console (quando conectado) se as páginas estão sendo indexadas
4. Nota: **não é possível verificar via curl ou simuladores de terceiros** — a pré-renderização só é servida para bots verificados via IP

### Resultado Esperado

- Cada página terá meta tags únicos e otimizados
- Google e outros motores de busca receberão HTML pré-renderizado com conteúdo completo
- Melhor indexação e ranking nos resultados de busca
- Social previews personalizadas por página no LinkedIn, X, WhatsApp, etc.
