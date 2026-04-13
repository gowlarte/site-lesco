

## Fix: Flash branco antes do splash screen

### Problema
Antes do React montar, o `<body>` e `<div id="root">` têm fundo branco por padrão. Há um breve frame onde o fundo branco é visível antes do SplashScreen renderizar com `#141414`.

### Solução

1. **`index.html`**: Adicionar `style="background-color: #141414"` no `<body>` para que o fundo escuro esteja presente desde o primeiro frame, antes do JavaScript carregar.

2. **`src/App.tsx`**: Alterar a div que envolve o conteúdo para usar `visibility: hidden` em vez de `opacity: 0` enquanto o splash está ativo. Isso evita que elementos do site sejam brevemente renderizados (mesmo que transparentes) e causem layout shifts. Quando `splashDone` for true, muda para `visibility: visible` com a transição de opacidade.

### Mudanças

- **`index.html`** - `<body style="background-color: #141414">`
- **`src/App.tsx`** - Trocar `opacity: 0` por `visibility: hidden` + `opacity: 0` enquanto splash roda, e adicionar transição suave quando revelar

