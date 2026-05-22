# Ajustar tamanho e espaçamento da pílula "Lançamentos"

Os logos atualmente usam altura uniforme `h-4` (16px) e `gap-3` (12px). Os viewBoxes têm proporções bem diferentes (echo 3.43:1, geo 3.48:1, zhú 2.33:1), o que faz com que, na mesma altura, as larguras fiquem desbalanceadas e os logos pareçam pequenos demais comparados ao print.

## Mudanças em `src/components/Header.tsx` (pílula desktop, lg)

1. **Pílula**: aumentar respiro — `px-5 py-2.5` no lugar de `px-3 py-1.5`. Manter `rounded-full`.
2. **Gap entre logos**: trocar `gap-3` por `gap-8` (32px) para reproduzir o espaçamento generoso do print.
3. **Alturas por logo (ajuste óptico)** — em vez de aplicar `h-4` a todos, definir altura por item para igualar o tamanho óptico do wordmark:
   - Echo: `h-5` (20px)
   - Geo: `h-[18px]`
   - Zhú: `h-6` (24px, compensa o acento que ocupa parte do viewBox)
   Implementado passando uma classe específica por item no array `lancamentos` (`svgClass`) e aplicando via seletor `[&_svg]:` no `<Link>`.
4. **Divisor**: aumentar para `h-4` e `ml-2` para combinar com a nova altura.
5. **Label "Lançamentos"**: subir para `text-[12px]` com `ml-1`, mantendo família/tracking atuais.

A versão mobile (fora da pílula) permanece como está, pois já usa tamanhos próprios.

## Arquivo afetado

- `src/components/Header.tsx` — único arquivo editado.
