## Objetivo

Redirecionar com **301 (permanente)** todas as URLs de post do blog que hoje vivem em `https://lesco.com.br/...` para o novo subdomínio `https://blog.lesco.com.br/...`, preservando o slug e a barra final.

Exemplo:
```text
Origem:  https://lesco.com.br/evitar-retrabalhos-materiais/
Destino: https://blog.lesco.com.br/evitar-retrabalhos-materiais/
```

## Escopo

Somente as **165 URLs** listadas no `post-sitemap.xml`. Nenhuma rota do app React (`/quem-somos`, `/portfolio`, `/orcamento`, produtos, etc.) será tocada — apenas os slugs exatos do blog. Os caminhos de imagem (`/wp-content/...`) são ignorados.

Observação importante: o sitemap inclui `/blog/`. Como o blog passa a viver no subdomínio, esse caminho também será redirecionado para `https://blog.lesco.com.br/` (a página React `/blog` deixa de ser acessível pelo domínio principal — coerente com a mudança já feita no menu).

## O que será feito

Editar **`vercel.json`** adicionando um array `redirects` com uma entrada para cada slug do sitemap. Como o projeto usa `cleanUrls: true` / `trailingSlash: false`, cada `source` será definido sem barra final (o Vercel casa as duas formas) e o `destination` apontará para a URL completa do subdomínio **com** barra final, igual ao exemplo.

Estrutura de cada entrada:
```json
{ "source": "/evitar-retrabalhos-materiais", "destination": "https://blog.lesco.com.br/evitar-retrabalhos-materiais/", "permanent": true }
```

`permanent: true` gera o status **301**.

Os `redirects` são avaliados pelo Vercel **antes** dos `rewrites`, então o fallback SPA atual (`/index.html`) não interfere nas rotas redirecionadas, e as páginas estáticas pré-renderizadas continuam funcionando normalmente.

## Lista de slugs a redirecionar (165)

Todos os `<loc>` do `post-sitemap.xml`, incluindo entre outros:
`/blog`, `/fornecedores-para-a-construtora`, `/obra-ecologica`, `/evitar-retrabalhos-materiais`, `/madeira-plastica`, `/deck-de-madeira-plastica`, `/neuroarquitetura`, `/retrofit`, `/acabamento`, `/wpc-vs-madeira-natural` … (a lista completa extraída do sitemap será inserida no `vercel.json`).

## Detalhes técnicos

- Arquivo alterado: `vercel.json` (apenas adicionar o bloco `redirects`; `buildCommand`, `outputDirectory`, `cleanUrls`, `trailingSlash` e `rewrites` permanecem como estão).
- Redirect server-side via Vercel (não SPA/JS), garantindo 301 real visível em `curl -I`.
- Após o deploy, validar com:
  ```text
  curl -I https://lesco.com.br/evitar-retrabalhos-materiais
  → HTTP/1.1 301  Location: https://blog.lesco.com.br/evitar-retrabalhos-materiais/
  ```

## Validação

Conferir alguns slugs representativos (`/evitar-retrabalhos-materiais`, `/obra-ecologica`, `/blog`) retornando 301 com o `Location` correto, e confirmar que rotas do app principal seguem 200.
