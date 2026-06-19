## Plano

1. **Corrigir a causa provável**
   - Trocar os imports de `.asset.json` usados nas páginas GEO para URLs absolutas derivadas do domínio atual (`window.location.origin + /__l5e/...`).
   - Isso evita que as imagens apontem para caminho relativo em contextos onde o preview/produção não resolve corretamente os assets externos.

2. **Ajustar páginas afetadas**
   - Atualizar `src/pages/Geo.tsx` para o slideshow do hero e a imagem da pedra.
   - Atualizar `src/pages/ObrigadoCatalogoGeo.tsx` para o slideshow da página de obrigado.

3. **Manter fallback seguro para SSG**
   - Criar uma pequena função utilitária local ou compartilhada que retorne a URL original durante prerender/server-side e a URL absoluta no navegador.
   - Sem mexer nas imagens antigas que já funcionam.

4. **Validar**
   - Abrir a página `/geo` no preview e conferir via navegador se as imagens renderizam com `naturalWidth > 0`.
   - Verificar também `/obrigado-catalogo-geo` para confirmar o slideshow da página de obrigado.