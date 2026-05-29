## Problema
O formulário de catálogo (`/catalogo-lesco`) aparenta ter muito espaço vazio em volta do conteúdo, diferente do formulário de orçamento que está no tamanho certo.

## Causa
Em `src/pages/Catalogo.tsx`, o iframe está com altura fixa de `946px` (`height: "946px"` e `data-height="946"`). Como o formulário de catálogo tem menos campos que o de orçamento, o conteúdo real é bem mais curto que 946px — isso gera o grande vão branco vertical visível na imagem.

Observação: as margens laterais internas (esquerda/direita) do formulário vêm das configurações da própria ferramenta LeadConnector dentro do iframe de terceiros e não são ajustáveis pelo nosso código.

## Solução
Ajustar a altura do iframe do catálogo em `src/pages/Catalogo.tsx` para um valor próximo da altura real do conteúdo do formulário, eliminando o espaço branco em excesso.

- Reduzir `height` de `946px` para aproximadamente `720px` (e atualizar `data-height` correspondente).
- Validar visualmente no preview e ajustar fino o valor caso ainda sobre ou falte espaço.

## Detalhes técnicos
Arquivo: `src/pages/Catalogo.tsx`, bloco do iframe (linhas ~73-89).
- `style={{ ..., height: "720px", ... }}`
- `data-height="720"`

Se após o teste o conteúdo ainda ficar cortado ou sobrar espaço, ajustar o número até casar com a altura real do formulário renderizado.