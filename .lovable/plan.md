

## Plano: Hero como banner tradicional com slideshow + menu integrado

### Visão geral
Substituir o seletor de linhas atual da home por um banner full-bleed em slideshow (4 slides — AltWood, Zhúzen, Echotex, Italflex), com o Header sobreposto dentro do mesmo wrapper. Margem de 10px em todos os lados. Overlay #141414 a 50% sobre cada imagem. Bullets de navegação centralizados abaixo do banner. Hover atual (efeito de cursor seguindo, blur, line decorativa) é removido — fica apenas um leve zoom contínuo na imagem de fundo.

### Referência de imagens
1. AltWood → `user-uploads://GK_20240326_STEMMER-RODRIGUES_CASA-AREIA_DJI_0016-EE-EE_copiar.webp`
2. Zhúzen → `user-uploads://Exterior-bamboo-cladding-panels-scaled.webp`
3. Echotex → `user-uploads://1623208171.jpg`
4. Italflex → `user-uploads://otzObXqJ6tqyoW7m.webp`

Copiadas para `src/assets/hero-home-altwood.webp`, `hero-home-zhuzen.webp`, `hero-home-echotex.jpg`, `hero-home-italflex.webp`.

### Estrutura nova do banner (Index.tsx)

```text
<section className="m-[10px] relative h-[calc(100vh-20px)] rounded-[10px] overflow-hidden">
   ├─ <slides> imagens absolute inset-0, fade entre elas, leve zoom contínuo (scale 1 → 1.06 em ~8s)
   ├─ <overlay #141414 / 50%>
   ├─ <Header variant="overlay">  ← logo light, links brancos, sem fundo próprio
   ├─ <conteúdo bottom-left>
   │     ├─ Logo SVG da linha ativa (versão light, ex: linha-altwood-2.svg ou variante light)
   │     └─ Descrição em branco
   ├─ <CTA bottom-right> "Ver linha completa" (link para a /linha ativa)
   └─ <bullets bottom-center> 4 dots, ativo destacado
```

### Mudanças de arquivos

**1. `src/components/Header.tsx`** — adicionar prop `variant?: "default" | "overlay"`.
- `overlay`: sem `position:fixed`, sem fundo próprio, sem borda; logo sempre `logoLight`; cor dos links/CTA brancos. Usado quando renderizado dentro do banner.
- `default` (atual): mantém comportamento fixo para todas as outras páginas.

**2. `src/App.tsx`** — não renderiza mais o `<Header />` global na home. Em vez disso:
- Adicionar lógica: na rota `/`, o Header é renderizado pelo próprio `Index` (dentro do banner).
- Nas demais rotas, mantém `<Header />` fixo como hoje.
- Implementação: mover `<Header />` para dentro de cada layout, OU usar `useLocation` no AppContent para condicional. Optaremos por condicional: `{location.pathname !== '/' && <Header />}`.
- Ajustar padding-top do `Index` para `0` (atualmente `pt-[100px]`), já que o Header passa a fazer parte do banner.

**3. `src/pages/Index.tsx`** — refatorar a primeira `<section>`:
- Remover toda a lógica de `mousePos`, `imageFrame`, `cursor-none`, line decorativa, blur, mouse-follow image, `corHover` por item.
- Adicionar `currentSlide` state + `useEffect` com `setInterval` de 6s para auto-avançar.
- Renderizar 4 slides absolutos com `transition-opacity` 1s e `transform: scale()` animado em CSS (keyframe `slow-zoom`).
- Renderizar `<Header variant="overlay" />` no topo do banner.
- Conteúdo inferior: logo da linha (light), descrição (#FFFFFF), CTA "Ver linha completa" no canto inferior direito (estilo do print: pílula clara).
- Bullets: 4 botões circulares clicáveis, ativo `bg-white`, demais `bg-white/40`. Centralizados, abaixo da seção mas dentro do banner (ou logo abaixo conforme print — no print estão fora do retângulo arredondado; vamos posicioná-los logo abaixo do banner, ainda dentro do wrapper de 10px).
- Manter o restante da página (Manifesto, Galeria, CTA Final) sem mudanças.

**4. Logos light das linhas** — verificar se existem versões light. Já existem `linha-altwood.svg`, `linha-zhuzen.svg`, etc. Como os SVGs são carregados via `?raw` e usam `currentColor`, basta forçar `color: #FFFFFF` no container (regra existente no projeto — ver `mem://technical/svg-handling`). Não é preciso novo asset.

**5. CSS — animação slow-zoom**
- Adicionar em `src/index.css`:
```css
@keyframes hero-slow-zoom {
  from { transform: scale(1); }
  to   { transform: scale(1.06); }
}
.hero-slide-img { animation: hero-slow-zoom 8s ease-out forwards; }
```

### Detalhes técnicos

- **Margem 10px**: section recebe `m-[10px]` e altura `h-[calc(100vh-20px)]` para respeitar topo+base.
- **Overlay**: `<div className="absolute inset-0 bg-[#141414]/50" />` posicionado entre as imagens e o conteúdo.
- **Slide ativo**: dirige logo da linha, descrição e link do CTA. `linhas[currentSlide]`.
- **Bullets**: posicionados `absolute bottom-6 left-1/2 -translate-x-1/2` dentro do banner (conforme print mostra dentro do retângulo, parte inferior central).
- **Header overlay**: respeitar layout do print — logo Lesco à esquerda (light), nav central/direita branca, botão "Orçamento" com gradiente atual (mantém destaque).
- **Hover**: removido. Apenas `transform: scale` automático na imagem de fundo do slide ativo.
- **Acessibilidade**: bullets com `aria-label="Ir para slide N"`; `aria-current` no ativo. Auto-play pausa em hover do banner (boa prática, opcional — incluir).
- **Limpeza**: remover imports não usados em Index após refatoração (`useRef` para sectionRef, `imageFrame`, etc.).

### Fora de escopo
- Memórias: após implementar, atualizar `mem://features/hero-selector` para refletir o novo padrão (banner + slideshow + bullets) e descartar o seletor antigo.

