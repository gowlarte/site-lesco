
Sim, é possível corrigir. O piscar não parece ser limitação do SVG; ele vem do sincronismo atual entre `SplashScreen` e `App`.

Diagnóstico
- Em `src/components/SplashScreen.tsx`, o effect `if (assetsReady && phase === "swoosh") setPhase("reveal")` antecipa o reveal assim que `document.fonts.ready` resolve. Como a tagline foi removida, esse gate de fontes não é mais necessário para o splash e pode fazer o logo “aparecer” antes do lwoosh terminar.
- O handoff ainda é sequencial, não em crossfade: o `onComplete()` só roda no fim do `fadeout`, e em `src/App.tsx` esse mesmo callback desmonta o splash e só então libera a página. Resultado: o logo some e a página entra depois, o que é percebido como blink.
- O reset de `document.body.style.backgroundColor = ''` acontece no mesmo momento da troca, o que pode acentuar o frame de transição.
- O timeout de segurança de 5s ainda concorre com a timeline principal e deve ficar isolado para não cortar a animação normal.

Plano de correção
1. Refatorar a timeline do splash para um fluxo explícito: `swoosh` completo → `reveal` → `fadeout` → desmontagem.
2. Remover do splash o reveal imediato baseado em `document.fonts.ready` (ou deixar isso apenas como fallback), já que o splash agora exibe só SVG.
3. Separar em `src/App.tsx` dois estados diferentes:
   - um para começar a mostrar a aplicação por baixo do splash
   - outro para remover o splash do DOM  
   Isso permite crossfade real, em vez de “some tudo / aparece depois”.
4. Sincronizar a troca do fundo:
   - manter o fundo escuro enquanto o splash cobre a tela
   - trocar para o fundo da página junto com o início do fade-in do conteúdo, sem expor frame vazio
5. Ajustar o timeout de segurança para não competir com os timers normais e garantir callback único.

Arquivos envolvidos
- `src/components/SplashScreen.tsx`
- `src/App.tsx`

Detalhe técnico
- A correção principal não é trocar o SVG, e sim corrigir a orquestração dos estados.
- O ponto mais importante é que hoje `onComplete` está fazendo duas coisas ao mesmo tempo: finalizar a animação e desmontar o splash. Isso precisa ser dividido.
- Se, depois disso, ainda existir micro-piscar no logo do header, aí sim vale um ajuste complementar no `Header` (preload ou SVG inline), mas isso não parece ser a causa principal agora.

Resultado esperado
- o lwoosh termina sem disparar reveal antes da hora
- o logo não some entre splash e página
- a página entra em crossfade suave
- o blink deixa de acontecer de forma consistente
