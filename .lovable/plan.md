A página `/geo` usa um formulário com `formHeight: 675` em `src/data/linhas-em-breve.ts`, enquanto Zhú e Echo já estão padronizados em `470`.

Ajuste:
1. Em `src/data/linhas-em-breve.ts`, alterar `formHeight` da entrada `geo` de `675` para `470`, igualando às demais linhas de lançamento.
2. Validar visualmente em `/geo` para confirmar que não sobra espaço nem aparece barra de rolagem no iframe.

Observação: o `formId`/`formName` da Geo permanecem como estão (formulário próprio "[05] [FORM] [GEO]"); apenas a altura é padronizada.