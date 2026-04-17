

## Seção "Conheça Nossa Madeira Ecológica" — Plano final

Decisões confirmadas: **GIF + gifuct-js**, asset enviado é o final, fundo `#DBDBDB`, posicionado **após a Galeria de Projetos** na Home.

### Arquivos a criar

```text
src/assets/madeira-ecologica/
├── produto.gif                      Esquema-produtos-camadas.gif
├── icon-anti-mofo.svg               Ativo_1.svg
├── icon-hidrofobico.svg             Ativo_2.svg
├── icon-resistente-pragas.svg       Ativo_3.svg
├── icon-garantia.svg                Ativo_4.svg
└── icon-reciclado.svg               Ativo_5.svg

src/components/madeira-ecologica/
├── MadeiraEcologicaSection.tsx      container 300vh + sticky stage + orquestração
├── ProdutoCanvas.tsx                canvas + parse do GIF + scrub por scroll
├── IconesOverlay.tsx                posicionamento dos 5 ícones (desktop)
├── FeatureIcon.tsx                  ícone clicável + descrição expansível
└── CalloutLines.tsx                 SVG com linhas animadas (stroke-dashoffset)
```

### Arquivos a editar

- `src/pages/Index.tsx` — importar `<MadeiraEcologicaSection />` logo após a seção da Galeria de Projetos.
- `package.json` — adicionar `gifuct-js`.

### Comportamento técnico

- **Container**: `h-[300vh]` envelope + filho `sticky top-0 h-screen` para o palco visual.
- **Parse do GIF**: no mount, `fetch(produtoGif) → arrayBuffer → parseGIF → decompressFrames`. Cada frame vira `ImageData` cacheado em `useRef`.
- **Scroll → frame**: `IntersectionObserver` ativa o listener; `progress = clamp((scrollY - sectionTop) / (sectionHeight - vh), 0, 1)`; `frame = floor(progress * (totalFrames - 1))`; redraw via `requestAnimationFrame` apenas quando `frame !== lastFrame`. Sem React state.
- **Estado "completo"** (progress ≥ 0.95): dispara fade-in dos ícones com stagger 150ms; linhas SVG desenhadas via `stroke-dashoffset` animado (~600ms); labels surgem por último.
- **Clique no ícone**: toggle de descrição abaixo (slide-down + fade); abrir um fecha o anterior. Estado em `useState<string | null>`.
- **Mobile (<768px)**: sem sticky, sem scrub. Mostra **frame final estático** (último frame desenhado uma vez no canvas) + grid 2×3 de ícones com accordion. Sem linhas SVG.

### Layout (desktop)

```text
┌──────────────────────────────────────────────┐
│   Conheça nossa madeira ecológica            │  título centralizado
│                                              │
│  [Anti-mofo]──────╮         ╭──[Garantia]    │
│                    ╲       ╱                 │
│                  ┌──────────┐                │
│                  │  CANVAS  │                │  GIF scrub
│                  │ produto  │                │
│                  └──────────┘                │
│                    ╱       ╲                 │
│  [Hidrofóbico]──╯           ╰──[Reciclado]   │
│              [Resist. pragas]                │
└──────────────────────────────────────────────┘
```

### Aderência ao design system

- Fundo `#DBDBDB`, card com radius 10px e margens 10px laterais.
- Título em PP Neue Machina, alinhado ao tamanho dos H2 do projeto (`text-3xl md:text-4xl lg:text-[52px]`).
- Ícones e linhas em `#141414`; estado ativo do ícone em `#C8956C` (tom AltWood) com círculo de borda.
- Descrições em DM Sans light, mesmo tom dos parágrafos do site.
- SVGs dos ícones carregados como `?raw` para herdar `currentColor`.

### Critérios de aceite (do PRD)

Todos contemplados: scrub bidirecional, congela no último frame, ícones com stagger, linhas animadas, accordion de descrição, responsivo, ≥60fps via rAF + frames cacheados, IntersectionObserver para evitar trabalho fora da viewport.

### Observação

`gifuct-js` parseia o GIF inteiro no client (~uma vez no mount). Se o GIF final for grande (>2MB) ou tiver muitos frames, pode haver um pequeno delay inicial — nesse caso, mostro frame 0 estático até o parse terminar (sem bloquear a UI).

