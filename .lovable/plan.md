## Objetivo
Adicionar um botão flutuante de WhatsApp fixo no canto inferior direito, visível em todas as páginas, que abre o formulário da LeadConnector em um popup — somente ao clicar no botão.

## Abordagem
Em vez de depender do `data-trigger-type="alwaysShow"` (que abriria sozinho), vamos controlar a abertura manualmente com nosso próprio modal, carregando o formulário pela mesma URL do iframe.

## Passos

1. **Criar `src/components/WhatsAppButton.tsx`**
   - Botão flutuante `fixed bottom-[20px] right-[20px] z-50`, circular, com ícone do WhatsApp (lucide `MessageCircle` ou SVG), respeitando os tokens do design system (radius/cores) e o estilo editorial do site.
   - Estado `open` controlando um modal/overlay responsivo.
   - Ao clicar, abre overlay centralizado contendo o `<iframe>` apontando para `https://api.leadconnectorhq.com/widget/form/NCyQbX00m3csRV6jg6RB` (visível, não `display:none`), com `width:100%`, altura responsiva (ex.: `height: min(950px, 90vh)`), `border-radius:3px`.
   - Botão de fechar (X) e clique no fundo para fechar.
   - Carregar o script `https://link.msgsndr.com/js/form_embed.js` uma única vez (quando o modal abre) para o comportamento/responsividade do formulário.

2. **Montar globalmente em `src/App.tsx`**
   - Renderizar `<WhatsAppButton />` dentro de `AppContent` (junto ao `Footer`), garantindo presença em todas as rotas.

## Detalhes técnicos
- Modal responsivo: largura `max-w-[480px]` em desktop, `90vw` no mobile; altura limitada por `90vh` com `overflow` controlado pelo próprio iframe.
- O script `form_embed.js` será injetado dinamicamente só na primeira abertura para não impactar o carregamento inicial nem os loaders/splash existentes.
- Z-index acima do conteúdo, mas o overlay do modal fica acima do botão.
- Sem alterações de backend; apenas frontend/apresentação.
