## Plano — Ajustes do Site Lesco (PRD v1.0)

### 1. Renomear linha "Madeira Ecológica" → "Madeira Ecológica Lesco"

Substituir o nome em todos os pontos visíveis (Linhas, Manto hub, sub-páginas Brise/Shield/Deck/Line/Panel, Footer, breadcrumbs, hero subtítulos, meta tags). O identificador interno e os logos permanecem; somente o texto exibido muda.

### 2. Novos slugs (rotas) — produtos na raiz


| Página                | Slug atual      | Novo slug                         |
| --------------------- | --------------- | --------------------------------- |
| Hub Madeira Ecológica | `/manto`        | `/madeira-ecologica-lesco`        |
| Shield                | `/manto-shield` | `/madeira-ecologica-para-fachada` |
| Panel                 | `/manto-panel`  | `/placa-wpc-interior`             |
| Brise                 | `/manto-brise`  | `/brise-madeira-ecologica`        |
| Line                  | `/manto-line`   | `/forro-wpc`                      |
| Deck                  | `/manto-deck`   | `/madeira-ecologica-para-deck`    |
| Sobre/Quem somos      | `/sobre`        | `/quem-somos`                     |
| Sustentabilidade      | (n/a)           | `/revestimento-sustentavel`       |
| Madeira WPC           | (n/a)           | `/madeira-wpc`                    |
| Catálogo              | `/catalogo`     | `/catalogo-lesco`                 |
| Biblioteca            | (n/a)           | `/biblioteca`                     |
| Portfólio             | (n/a)           | `/portfolio`                      |
| Orçamento             | `/orcamento`    | mantém                            |
| Blog                  | `/blog`         | mantém                            |


Em `src/App.tsx`: registrar novas rotas e adicionar **redirects internos** (`<Navigate replace>`) das antigas para as novas — equivalente SPA do 301. Atualizar todos os `<Link to="...">` correspondentes (Linhas, Footer, Manto hub, sub-páginas, breadcrumbs, navegação cruzada).

### 3. Header — novo menu com dropdowns

Reescrever `src/components/Header.tsx` para suportar itens com submenu (hover/click). Hierarquia:

- Home → `/`
- Sobre ▾ → Quem somos `/quem-somos`, Madeira WPC `/madeira-wpc`, Sustentabilidade `/revestimento-sustentavel`
- Produtos ▾ → Lesco Shield, Lesco Panel, Lesco Brise, Lesco Line, Lesco Deck (slugs novos)
- Catálogo → `/catalogo-lesco`
- Biblioteca → `/biblioteca`
- Orçamento → `/orcamento` (continua também como CTA à direita)
- Material ▾ → Blog `/blog`, Portfólio `/portfolio`

Mobile: menu fullscreen com seções expandíveis.

### 4. Páginas novas (placeholder)

Criar com estrutura mínima (H1, parágrafo, CTA Orçamento, meta tags via `<title>`/`<meta>` no `<head>` usando React 19 metadata):

- `src/pages/QuemSomos.tsx` — reaproveitar conteúdo atual de `About.tsx` (renomear arquivo) e atualizar rota.
- `src/pages/MadeiraWPC.tsx`
- `src/pages/Sustentabilidade.tsx`
- `src/pages/Biblioteca.tsx`
- `src/pages/Portfolio.tsx`

Visual: seguir tokens existentes (bg `#DBDBDB`, cards flutuantes 10px, header offset 100px, tipografia PP Neue Machina/DM Sans).

### 5. Ocultar logo da linha Manto

Em `src/pages/Linhas.tsx` (e em qualquer outro local que renderize o logo Manto via `linha-altwood-2.svg`), envolver a renderização com `{false && ...}` ou `className="hidden"` mantendo import e arquivo. Comentário explicativo: "Logo oculto temporariamente — reativar quando linha for relançada".

### 6. Linhas Geo / Zhú / Echo

Permanecem como estão (`/geo`, `/zhu`, `/echo` → `EmBreve`). Apenas remover a rota duplicada `/geo` em `App.tsx`.

### 7. Footer

Atualizar links da seção "Linhas" e "Institucional" para os novos slugs. Ajustar label "Madeira Ecológica" → "Madeira Ecológica Lesco". Trocar `/projetos` por `/portfolio`.

### 8. SEO

Cada página nova/ajustada recebe `<title>` e `<meta name="description">` específicos via tags React inline no topo do componente. Single H1 por página, alt text em imagens. Slugs PT-BR mantidos exatamente como no PRD.

### Fora de escopo (PRD §09)

Sem redesign visual, sem conteúdo definitivo, sem lançamento de Geo/Zhú/Echo, sem integrações novas.

### Detalhes técnicos

- Redirects: `<Route path="/manto" element={<Navigate to="/madeira-ecologica" replace />} />` (e equivalentes para todos os slugs antigos).
- Dropdowns no Header: estado local `openDropdown`, fechamento on `mouseleave` desktop, accordion no mobile.
- Renomear arquivos de páginas via rename (manter histórico): `About.tsx` → `QuemSomos.tsx`; manter componentes `Manto*.tsx` (não renomear arquivos para evitar churn) e apenas trocar texto/rotas.