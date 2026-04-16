

## Plan: Atualizar cor de fundo e ajustar contraste de textos

### Resumo
Trocar o fundo global de `#DBDBDB` para `#e5e1dc` em todos os locais onde aparece, e ajustar a variável `--secondary` (usada como `bg-secondary`) para harmonizar. A cor `#e5e1dc` é um tom quente claro — os textos escuros (`--primary: #111110`) já têm bom contraste, mas o `--foreground` atual (`#F0EDE8`) é claro demais para fundos claros, então onde usado sobre fundo claro precisará atenção.

### Alterações

**1. `src/index.css`**
- Linha 151: `background-color: #DBDBDB` → `background-color: #e5e1dc`
- Linha 50: `--background-bone` ajustar de `33 14% 88%` para `30 12% 87%` (mais próximo de `#e5e1dc`)
- Linha 62: `--secondary` ajustar de `33 14% 88%` para `30 12% 87%` para manter coerência com o novo fundo

**2. `src/components/Header.tsx`**
- Linha 40: `bg-[#DBDBDB]` → `bg-[#e5e1dc]`

**3. `src/pages/Index.tsx`**
- Linha 108: `bg-[#dbdbdb]` → `bg-[#e5e1dc]`

**4. Contraste de textos**
Os textos sobre fundo claro já usam `text-primary` (#111110) ou `card-foreground` (#111110), que têm excelente contraste com `#e5e1dc`. Nenhuma alteração de cor de fonte é necessária para esses casos. O `--muted-foreground` (#6B6560) também mantém contraste suficiente (ratio ~4.5:1).

### Detalhes técnicos
- `#e5e1dc` em HSL ≈ `30 12% 87%`
- Contraste com `#111110`: ~12:1 (excelente)
- Contraste com `#6B6560`: ~4.5:1 (adequado para texto secundário)

