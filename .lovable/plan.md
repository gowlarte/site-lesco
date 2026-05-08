## Substituição dos logos Lesco

Trocar todos os logos da Lesco (light e dark) pelas novas versões anexadas, com os degradês atualizados. A troca abrange tanto os arquivos SVG estáticos quanto os SVGs inline usados em animações.

### Arquivos SVG a substituir (sobrescrita direta)

Copiar os uploads sobre os assets existentes — todos os imports em Header e Footer continuarão funcionando sem mudança de código:

- `src/assets/logo-lesco-dark.svg` ← `Lesco-logo-Dark.svg`
- `src/assets/logo-lesco-dark-2.svg` ← `Lesco-logo-Dark.svg`
- `src/assets/logo-lesco-light.svg` ← `Lesco-logo-Light.svg`
- `src/assets/lesco-swoosh-cor.svg` ← extrair apenas o swoosh do novo Dark (manter o uso atual desse asset)

### SVGs inline a atualizar

Reescrever os paths e os stops do gradiente para refletir o novo logo:

1. **`src/components/SplashScreen.tsx`**
   - Atualizar `viewBox` para `0 0 618.91 195.11`
   - Substituir os 4 paths das letras "LESC" e os 2 paths do "O" (swoosh light + swoosh colorido) pelos paths do novo SVG Dark
   - Atualizar `<linearGradient id="splash-grad">`:
     - coordenadas: `x1="671.05" y1="-3.62" x2="376.39" y2="185.71"`
     - stops: `#728ea0` (.25) → `#c0c9bf` (.56) → `#d6aa98` (.74) → `#efdcc5` (.9)
   - Atualizar o `<rect>` do `clipPath` para `width="618.91" height="195.11"`

2. **`src/components/PageTransitionLoader.tsx`**
   - Mesma atualização de stops e (se houver paths inline) substituir paths/viewBox pela nova versão

3. **`src/components/Header.tsx` (linha 143 — CTA do menu mobile)**
   - Substituir o `linear-gradient` antigo pelos novos stops da versão Dark:
     `linear-gradient(135deg, #728ea0 25%, #c0c9bf 56%, #d6aa98 74%, #efdcc5 90%)`
   - (O CTA desktop já é cinza neutro; permanece como está.)

### Observações técnicas

- Aspect ratio do novo logo (~3.17) é praticamente idêntico ao atual (~3.18), então as classes `w-[93px] h-[29px]` no Header e `h-8` no Footer não precisam ser ajustadas.
- A cor base sólida nos novos arquivos é `#1f1f1f` (Dark) e `#fffbf3` (Light) — preservada por vir direto dos arquivos.
- Nenhuma mudança de rotas, nomenclatura ou layout — apenas troca de assets visuais.