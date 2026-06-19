## Objetivo
Reordenar o slideshow do hero da home page para que o primeiro slide seja da linha **Geo** e ajustar o texto de destaque para "Novo lançamento", mantendo o link para a landing page `/geo` (que já contém o formulário do catálogo).

## Alterações em `src/pages/Index.tsx`

1. **Reordenar o array `linhas`**: Mover o objeto da Geo (atualmente índice 3) para o primeiro lugar (índice 0). Os demais slides (Altwood, Zhú, Echo) descem uma posição cada.

2. **Ajustar lógica de autoplay**: O timer atual pula o slide 0 ao dar a volta (`return next >= linhas.length ? 1 : next`). Como o slide 0 agora é Geo (e deve ser exibido normalmente no loop), remover essa lógica de skip para que o autoplay percorra todos os slides em ordem: `return next >= linhas.length ? 0 : next`.

3. **Alterar label do slide Geo**: No bloco condicional que renderiza o conteúdo dos slides "em breve" (Echo / Geo / Zhú), trocar o texto estático:
   - De: `Nova linha em breve`
   - Para: `Novo lançamento`

4. **Manter CTA**: O botão "Saiba mais" do slide Geo já aponta para `/geo`, que é a landing page com o formulário de catálogo — nenhuma mudança necessária no link.

## Resultado esperado
- O carrossel da home inicia no slide Geo.
- O label abaixo do logo exibe "Novo lançamento".
- O autoplay percorre todos os slides em sequência contínua.
- O CTA leva o usuário para `/geo` (formulário do catálogo).