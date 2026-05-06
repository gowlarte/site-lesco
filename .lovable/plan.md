# Ajuste do layout dos modelos AltWood

Refatorar o componente `CardModelo` e os dados das páginas AltWood para seguir o padrão editorial do catálogo enviado.

## Mudanças no `src/components/altwood/CardModelo.tsx`

Remover a "caixa" que envolve o produto. Novo layout vertical, sem fundo, sem bordas:

```
25x25 mm                    0,43 kg/m²
─────────────────────────────────────
                                       
         [imagem do produto              
          sem recorte, fundo              
          transparente / herda            
          o fundo da página]              
                                       
Solicitar orçamento
─────────
```

Estrutura:
- Topo: linha com **medida** (esquerda, peso da fonte semibold) e **peso** (direita, cinza claro)
- Régua horizontal fina logo abaixo
- Imagem do produto em `object-contain` (não `object-cover`), sem caixa de fundo, com bastante respiro vertical
- Link "Solicitar orçamento" no fim, em texto pequeno com `underline underline-offset-4`, cor sutil — sem botão, sem fundo

## Mudanças nos dados (`src/pages/AltWoodBrise.tsx`, e demais páginas AltWood que usam `CardModelo`)

- Remover prefixo `AltWood-Brise-…-Origens/Classic` da prop `nome`. A medida passa a ser o título principal exibido no card (já vem em `medida`), então o `nome` deixa de ser renderizado visualmente — manter apenas como `alt` da imagem para acessibilidade.
- Aplicar a mesma simplificação em: `AltWoodShield.tsx`, `AltWoodDeck.tsx`, `AltWoodLine.tsx`, `AltWoodPanel.tsx` (ajustar onde houver nomenclatura "AltWood-…").

## Detalhes técnicos

- `CardModelo`: remover `bg-[#141414]`, `rounded`, `border`, `aspect-video`, e o `<div>` interno `bg-[#c9c9c9]`. Imagem em container com altura fixa (ex.: `h-48 md:h-56`) e `object-contain`.
- Substituir `BotaoCTA primary` por um `<button>` / `<a>` com classes: `text-xs text-[#525252] hover:text-primary underline underline-offset-4 decoration-[#9E9890]`.
- Manter a prop `nome` na interface (usada como `alt`); deixar de exibir no JSX.
- Não alterar lógica de seleção de swatch, abas ou orçamento.

## Verificação

Após editar, conferir visualmente a página `/altwood-brise` (abas Origens e Classic) e ao menos uma das outras páginas AltWood para garantir que o grid continua responsivo e que nenhuma página depende do `nome` exibido.
