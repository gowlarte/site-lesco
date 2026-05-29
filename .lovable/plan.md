## Objetivo

Transformar a página `/catalogo-lesco` (`src/pages/Catalogo.tsx`) numa landing page atrativa, no mesmo estilo da página de orçamento, mantendo **exatamente o mesmo formulário** que já existe nesta página (form do catálogo `lr26Z8p5zKyXXMvt1CKn`, `[01] [FORM] [DOWNLOAD CATALOGO]`). O conteúdo segue a imagem de referência (ignorando o popup).

## Estrutura proposta

### 1. Hero + Formulário
Card flutuante com imagem de fundo (reuso de `hero-home-altwood.webp`) e overlay escuro, em 2 colunas (empilha no mobile):
- **Esquerda (texto):** badge "Catálogo Lesco" + headline "Conheça o novo e explore todos os benefícios que a madeira ecológica pode oferecer" + parágrafo "Acesse nosso catálogo exclusivo e explore uma seleção diversificada de revestimentos ecológicos, criados com o compromisso de oferecer soluções estéticas e ambientalmente responsáveis."
- **Direita (espaço em branco da referência):** o **mesmo iframe** já presente na página (mantido idêntico: `src`, `id`, `data-*`, altura), dentro de um card branco. O `useEffect` que injeta `form_embed.js` é mantido.

### 2. Diferenciais (Benefícios)
Seção "Principais diferenciais da madeira ecológica WPC" com grid de 9 itens (3 colunas), conforme a imagem:
- Vida útil de até 20 anos
- Garantia de 10 anos
- Produzido com material reciclado
- Proteção UV para toda a linha WPC Lesco
- Tamanhos e texturas personalizáveis
- Material com isolamento acústico
- Instalação rápida, limpa e fácil
- Resistência a insetos e fungos
- Material com isolamento térmico

Reaproveitando os ícones SVG existentes em `src/assets/madeira-ecologica/` (garantia, reciclado, hidrofóbico, anti-mofo, resistente-pragas) distribuídos entre os itens.

### 3. CTA final
Seção de fechamento no mesmo estilo da página de orçamento (gradiente + botões existentes, ex.: WhatsApp / falar com equipe). Sem criar formulário novo.

## Detalhes técnicos

- Arquivo único alterado: `src/pages/Catalogo.tsx` (reescrito).
- Iframe do catálogo mantido **idêntico** ao atual — nenhum formulário novo é criado.
- Uso dos tokens do design system (PP Neue Machina / DM Sans / JetBrains Mono), margens/raios de 10px, padding-top de 100px para o header fixo.
- Componentes reutilizados: `SEO`, `ScrollReveal` (e `AnimatedCounter` se for útil para números) — todos já existentes.
- SEO atual mantido. Nenhuma imagem nova gerada — apenas assets já no site.
- Responsividade: 2 colunas no desktop, empilhado no mobile, sem cortes laterais/inferiores.
