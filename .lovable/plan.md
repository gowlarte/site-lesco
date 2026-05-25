## Ajustes no Header para igualar ao print

Alterações em `src/components/Header.tsx`:

1. **Adicionar traço separador** entre o nav e o bloco de Lançamentos
   - Inserir um elemento `<span>` vertical (linha `|` ou `<div>` com `w-px h-4`) entre `</nav>` e o bloco `Lançamentos pill`.
   - Cor: usar `dimColor` para ficar sutil como no print.

2. **Reduzir o tamanho dos logos de lançamentos** (Echo, Geo, Zhú)
   - Atualmente: Echo `h-[23px]`, Geo `h-[22px]`, Zhú `h-6` (~24px).
   - Reduzir para algo em torno de `h-[18px]` (Echo/Zhú) e `h-[17px]` (Geo), mantendo proporções relativas, para equilibrar com o texto 12px do restante.

3. **Cor do texto "Lançamentos"**
   - Atualmente usa `dimColor` (mais apagado).
   - Trocar para `baseColor` (mesma cor dos demais links do nav).

Nenhuma outra mudança no layout, espaçamentos ou comportamento.
