

# Lesco · Novo Site Institucional — Plano de Implementação

## Visão Geral
Site institucional premium para a Lesco, marca brasileira de revestimentos arquitetônicos. Design editorial, cinematográfico, com tipografia dominante e espaço negativo generoso. Inspiração: kozowood.com, glyphic.bio, oharchitecture.com.au.

---

## Fase 1 — Design System, Componentes Base e Home

### 1.1 Design System Setup
- Paleta completa em CSS variables (base, Altwood, Bambu, Pedra, Echotex, UI)
- Tipografia: Host Grotesk (display), DM Sans (body/UI), JetBrains Mono (técnico) via Google Fonts
- Escala tipográfica responsiva (Display XL 96–120px → Body 16–18px)
- Espaçamento generoso (mínimo 120px entre seções)
- Animações base: fade+translateY scroll-triggered com IntersectionObserver, hover scales, stagger effects

### 1.2 Componentes Globais
- **Header**: Logo à esquerda, nav centralizada, CTA direita. Transparente → blur escuro no scroll. Mobile: hamburger fullscreen com tipografia grande
- **Footer**: 4 colunas (Logo+tagline / Linhas / Institucional / Contato), fundo preto, texto bone, linha accent no topo
- **ProductCard**: Imagem 4:3 com hover zoom, label uppercase, nome display, dimensões, color swatches, CTA
- **ColorSwatch**: Círculo 40px, tooltip no hover, anel accent quando selecionado
- **TechnicalBadge**: Ícone + texto em pill (Hidrofóbico, Anti-mofo, 10 anos garantia)
- **NotifySection**: Banner "em breve" com campo email + botão "Avise-me"

### 1.3 Home (`/`)
- **Hero fullscreen**: Imagem placeholder de fachada WPC, gradiente bottom, label mono no canto, título display "Superfícies que definem legados.", seta scroll animada
- **As Linhas**: Grid 2×2 com cards grandes. Hover: zoom 1.04, nome sobe, CTA aparece. Altwood (warm), Bambu (verde), Pedra (cinza), Echotex (azul). Linhas futuras com badge "Em breve"
- **Manifesto**: Fundo bone, texto Host Grotesk Light 48px, linha accent vertical à esquerda
- **Case Destaque**: Fullwidth — imagem 60% esquerda, texto 40% direita (Arena do Futuro · Rio 2016)
- **Números**: Fundo preto, 3 métricas com counter animado (15+ Anos, 100% Reciclados, 1000+ Cases)
- **CTA Final**: "Pronto para começar um projeto?" com botões Falar com especialista + Baixar catálogo

### 1.4 Sobre (`/sobre`)
- Manifesto completo em tipografia editorial grande (texto do documento de rebrand)
- Seção identidade (o que a Lesco é / não é)
- Números reutilizados
- Certificações: ISO 9001, ISO 14001, LEED, ESG, GBC com visual clean

---

## Fase 2 — Linha Altwood e Catálogo

### 2.1 Hub de Linhas (`/linhas`)
- Scroll vertical, cada linha ocupa ~100vh, alternância imagem esquerda/direita
- Componente por linha: imagem 60%, conteúdo 40% (tag, nome, descrição, badges aplicações, CTA)

### 2.2 Altwood (`/altwood`)
- Hero fullscreen com label "ALTWOOD · MADEIRA ECOLÓGICA"
- Navegação horizontal por subcategorias (5 tabs com ícones)
- **Subpáginas** (`/altwood/panels`, `/altwood/brises`, `/altwood/line`, `/altwood/decks`, `/altwood/muxarabi`): grid de perfis com dimensões do catálogo, swatches de cores (Black, Lily White, Ipê, Teak, Oak, Walnut, Red Cedar, Weatherwood), tabela técnica colapsável, CTAs (Solicitar amostra, Baixar ficha técnica)
- Seção certificações e composição WPC (55% Pó de Madeira + 35% HDPE + 10% Aditivos)

### 2.3 Catálogo (`/catalogo`)
- Imagem de capa do catálogo, título, botão download em destaque
- PDF do catálogo como asset estático (do arquivo fornecido)

---

## Fase 3 — Linhas em Breve e Projetos

### 3.1 Bambu (`/bambu`), Pedra Flexível (`/pedra`), Echotex (`/echotex`)
- Hero fullscreen com cromia própria de cada linha
- Descrição curta + badges de aplicações previstas
- Formulário "Avise-me" (campo email + botão)

### 3.2 Projetos (`/projetos`)
- Masonry grid de cases com hover overlay (cor da linha + link)
- Página individual de case: imagem hero, texto, galeria, linha utilizada
- Case inicial: Arena do Futuro · Rio 2016

---

## Fase 4 — Contato, Polish e Finalização

### 4.1 Contato (`/contato`)
- 2 colunas: formulário (Nome, Empresa, Perfil select, Interesse por linha, Mensagem) + informações
- Mapa dark/monocromático embedado

### 4.2 Animações e Motion Polish
- Scroll-triggered: fade + translateY com cubic-bezier, duration 0.7s
- Hero: título word-by-word stagger 0.1s
- Counter animado nos números
- Cards com stagger diagonal
- Parallax sutil em imagens de produto
- Transições entre páginas (fade)

### 4.3 SEO, Performance e Analytics
- Meta tags e OG tags por página
- Lazy loading de imagens com placeholder blur
- Font preloading
- Google Analytics 4 com eventos (CTA clicks, download catálogo, form submit, avise-me)

---

## Notas Técnicas
- Todas as imagens inicialmente com placeholders do Unsplash (wood facade, deck pool, bamboo interior, acoustic studio)
- Ícones via Lucide (já disponível no projeto)
- Responsividade: mobile-first com breakpoints 768px, 1024px, 1440px
- Logo novo extraído do PDF de rebrand como SVG/imagem

