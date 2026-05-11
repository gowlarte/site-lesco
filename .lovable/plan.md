## Animações do Hero Slideshow (slides Geo / Zhú / Echo)

Aplicar fielmente o PRD nos slides 1+ do hero em `src/pages/Index.tsx`. Slide 0 ("Madeira Ecológica") permanece intocado.

### 1. Substituir SVGs dos logos

Os arquivos enviados (`ECHO-3.svg`, `GEO-3.svg`, `ZHU-3.svg`) contêm logo + círculo + slogan baked como paths. Vamos **extrair apenas o wordmark** (logo da linha) de cada SVG, descartando o círculo e o slogan — eles serão renderizados como HTML separado conforme o PRD.

Substituir conteúdo de:

- `src/assets/linha-echotex-2.svg` → wordmark "echo"
- `src/assets/linha-italflex-2.svg` → wordmark "geo"
- `src/assets/linha-zhuzen-2.svg` → wordmark "zhú"

Manter `fill="currentColor"` para herdar a cor branca atual.

### 2. Adicionar slogans (do PRD) ao array `linhas`

Em `src/pages/Index.tsx`:

- Zhú → "Arquitetura em Bambu"
- Echo → "Acústica Sensorial"
- Geo → "Revestimento de Pedra Flexível"

### 3. Reestruturar o bloco central dos slides "em breve"

```
┌─────────────────────────────────────┐
│      [LOGO]  •  Slogan da linha     |                                                                          NOVA LINHA EM BREVE                   │  ← anima na entrada do slide
│                                     │
│                                     │  ← animados em sequência
└─────────────────────────────────────┘
```

[LOGO]   •   Slogan da linha  ← Anima no início do slide  
NOVA LINHA EM BREVE  ← Animado em sequência

&nbsp;

Layout: flex horizontal (logo à esquerda, círculo `<span>` no meio, slogan à direita), centralizado. "NOVA LINHA EM BREVE" abaixo.

### 4. Animações por slide (PRD)

Adicionar keyframes em `src/index.css`:

```css
@keyframes heroFadeSlideUp {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroPopIn {
  from { opacity: 0; transform: scale(0); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes heroBgFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

Classes utilitárias aplicadas só no slide ativo:

- `.hero-bg-in` → `heroBgFadeIn 800ms ease-in both`
- `.hero-logo-in` → `heroFadeSlideUp 600ms ease-out 400ms both`
- `.hero-circle-in` → `heroPopIn 500ms cubic-bezier(0.34,1.56,0.64,1) 550ms both`
- `.hero-slogan-in` → `heroFadeSlideUp 600ms ease-out 700ms both`

Usar `key={`${linha.nome}-${currentSlide}`}` para reiniciar animações a cada troca.

### 5. Fade-to-black de saída (overlay único)

Substituir o crossfade atual por overlay preto sincronizado:

```ts
const [fading, setFading] = useState(false);
useEffect(() => {
  if (isPaused) return;
  const t = setInterval(() => {
    setFading(true);
    setTimeout(() => {
      setCurrentSlide((s) => {
        const next = s + 1;
        return next >= linhas.length ? 1 : next; // loop sem voltar ao slide 0
      });
      setFading(false);
    }, 700);
  }, SLIDE_INTERVAL);
  return () => clearInterval(t);
}, [isPaused]);
```

Overlay: `<div className={`absolute inset-0 bg-black z-30 pointer-events-none transition-opacity duration-[700ms] ease-in ${fading ? 'opacity-100' : 'opacity-0'}`} />` acima dos slides, abaixo de bullets/header.

### 6. Loop sem slide 0

Auto-avanço pula o slide 0 após o último (volta ao slide 1 — Zhú). Bullets e drag continuam navegando livremente.

### 7. Slide 0 intocado

A branch `active.nome === "Madeira Ecológica"` mantém estrutura, conteúdo e transição atuais.

---

### Arquivos alterados

- `src/pages/Index.tsx` — slogans, bloco central, fade-to-black, loop
- `src/index.css` — keyframes + classes
- `src/assets/linha-echotex-2.svg` — wordmark "echo"
- `src/assets/linha-italflex-2.svg` — wordmark "geo"
- `src/assets/linha-zhuzen-2.svg` — wordmark "zhú"

### Critérios de aceite (PRD)

- Slide 0 inalterado
- Fundo: `opacity 0→1` 800ms ease-in
- Logo: fadeSlideUp 600ms ease-out, delay 400ms
- Círculo (HTML `<span>`): popIn 500ms com overshoot, delay 550ms
- Slogan: fadeSlideUp 600ms ease-out, delay 700ms
- "NOVA LINHA EM BREVE" anima com fade in
- Saída: overlay preto único 700ms ease-in
- Loop volta ao slide 1, não ao 0