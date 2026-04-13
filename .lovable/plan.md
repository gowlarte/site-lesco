

## Problema

Em telas acima de ~2500px, o hero com os logos das linhas e descrições fica "perdido" — os elementos têm tamanhos fixos (logos 320px, texto 48px, padding 10px) que não escalam, deixando muito espaço vazio.

## Solução

Adicionar um breakpoint `3xl` (min-width: 2500px) no Tailwind e escalar os elementos do hero proporcionalmente nessa faixa.

### Mudanças

**1. `tailwind.config.ts`** — Adicionar breakpoint customizado:
```js
screens: {
  "3xl": "2500px",
}
```

**2. `src/pages/Index.tsx`** — Escalar elementos no hero para `3xl`:

- **Container wrapper** (linha 108): aumentar padding lateral
  - De `pl-[10px] pr-[10px]` → adicionar `3xl:pl-[80px] 3xl:pr-[80px]`

- **Cada row do grid** (linha 117): aumentar padding vertical
  - Adicionar `3xl:py-20`

- **Logo container** (linha 141): aumentar dimensões
  - De `lg:h-[52px] lg:w-[320px]` → adicionar `3xl:h-[72px] 3xl:w-[440px]`

- **Decorative line** (linha 132): linha mais longa no hover
  - Aumentar width de `40px` para `60px` via lógica condicional em 3xl (ou manter estático, já que é inline style)

- **Descrição** (linha 151): aumentar fonte e max-width
  - De `lg:text-[48px] max-w-[520px]` → adicionar `3xl:text-[64px] 3xl:max-w-[720px]`

- **Mouse-following image** (linha 165): aumentar o card flutuante
  - Adicionar `3xl:w-[400px] 3xl:h-[500px]`

Estas mudanças são isoladas ao breakpoint `3xl`, sem impacto em resoluções menores.

