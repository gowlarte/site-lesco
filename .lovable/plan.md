

## Seção interativa de galeria marquee (scroll-reactive)

Nova seção entre "Madeira Ecológica" e o CTA final, com duas fileiras de imagens movendo-se em sentidos opostos, reativas ao scroll.

### Comportamento

- **Duas fileiras horizontais** de imagens, cada uma se movendo em direção oposta (row 1: direita-para-esquerda, row 2: esquerda-para-direita).
- **Velocidade proporcional ao scroll**: quanto mais rápido o scroll, mais rápido as imagens se movem. Scroll parado = imagens paradas. Scroll para cima inverte a direção.
- **Imagens em grayscale + opacidade reduzida** por padrão. Ao hover, a imagem individual fica colorida (filter none) e opacidade 100%.
- **Sem links** — puramente estético.
- **Loop infinito**: imagens duplicadas no DOM para criar efeito seamless (2x do array original).
- **10 imagens** do usuário distribuídas nas 2 fileiras (5 + 5), copiadas para `src/assets/gallery/`.

### Implementação técnica

1. **Copiar as 10 imagens** do usuário para `src/assets/gallery/` com nomes curtos.

2. **Criar componente `src/components/ScrollMarqueeGallery.tsx`**:
   - `useRef` para capturar o offset acumulado de cada fileira.
   - `useEffect` com listener de `scroll` no `window` que calcula `deltaY` entre frames e aplica `translateX` via CSS transform diretamente no DOM (sem re-render React).
   - Row 1: `translateX` diminui com scroll down (move para esquerda).
   - Row 2: `translateX` aumenta com scroll down (move para direita).
   - Cada imagem: `grayscale(100%) opacity-50` por padrão, `grayscale(0) opacity-100` no hover, com `transition duration-500`.
   - Imagens com `rounded-[10px]`, gap de 10px, altura fixa (~220px desktop, ~140px mobile).
   - O array de imagens é duplicado (`[...images, ...images]`) para seamless looping; quando offset ultrapassa metade da largura total, reseta silenciosamente.

3. **Editar `src/pages/Index.tsx`**:
   - Importar e renderizar `<ScrollMarqueeGallery />` entre `<MadeiraEcologicaSection />` e a seção CTA final.
   - Seção com `overflow-hidden`, sem padding lateral (imagens sangram até a borda), `py-8` vertical.

### Responsividade

- Desktop: imagens com `h-[220px]` e aspect-ratio natural (width auto).
- Tablet: `h-[180px]`.
- Mobile: `h-[140px]`.
- Gap entre imagens: `gap-[10px]` (consistente com o sistema de layout).

### Arquivos

| Acao | Arquivo |
|------|---------|
| Criar | `src/components/ScrollMarqueeGallery.tsx` |
| Copiar | 10 imagens do usuário para `src/assets/gallery/` |
| Editar | `src/pages/Index.tsx` (importar + renderizar o componente) |

