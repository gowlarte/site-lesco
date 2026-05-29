A sobra não parece vir do card externo do hero, e sim da altura fixa aplicada ao iframe do formulário (`formHeight: 540`) em `src/data/linhas-em-breve.ts` + `height/data-height` em `NewsletterLancamentoForm`. Como o conteúdo real do formulário carregado pelo LeadConnector está menor que 540px, o iframe mantém uma área vazia no final.

Plano de ajuste:
1. Reduzir a altura do formulário de Zhú/Echo para ficar rente ao conteúdo visível, sem reintroduzir barra de rolagem.
2. Ajustar o componente `NewsletterLancamentoForm` para também aplicar `scrolling="no"` e `overflow: hidden` no iframe, reforçando que não apareça rolagem interna.
3. Manter o slug e o restante da estrutura da página intactos.
4. Validar visualmente na rota `/zhu` se a faixa inferior desapareceu e se o botão continua totalmente visível.