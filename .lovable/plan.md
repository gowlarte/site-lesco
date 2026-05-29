## Objetivo

O projeto já tem um `public/sitemap.xml`, mas com o domínio errado (`eco-essence-project.lovable.app`) e faltando rotas. Vou atualizá-lo para o domínio oficial **`https://lesco.com.br`**, incluir todas as páginas públicas indexáveis e corrigir o `robots.txt`.

## O que será feito

### 1. `public/sitemap.xml` (atualizar)
Reescrever com `loc` apontando para `https://lesco.com.br` e cobrir todas as rotas públicas:

- `/` (home)
- `/quem-somos`, `/madeira-wpc`, `/revestimento-sustentavel`
- `/linhas`
- `/madeira-ecologica-lesco` (hub), `/brise-madeira-ecologica`, `/madeira-ecologica-para-fachada`, `/madeira-ecologica-para-deck`, `/forro-wpc`, `/placa-wpc-interior`
- `/portfolio` + páginas de projeto: `/projetos/casa-mansa`, `/projetos/residencial-urbano`, `/projetos/casa-areia`, `/projetos/vaz-batel`, `/projetos/jha-corporate-boutique`, `/projetos/casa-una`
- `/catalogo-lesco`, `/biblioteca`, `/orcamento`
- `/zhu`, `/echo`, `/geo`

**Excluídos** (intencional):
- `/blog` e `/blog/:slug` — o blog agora vive em `blog.lesco.com.br` (já redirecionado com 301), então não entra no sitemap do domínio principal.
- Rotas de redirect/legado (`/manto`, `/sobre`, `/catalogo`…), páginas de "obrigado" e o catch-all `*`.

### 2. `public/robots.txt` (atualizar)
Corrigir a linha `Sitemap:` para `https://lesco.com.br/sitemap.xml`, mantendo `User-agent: *` / `Allow: /`.

## Detalhes técnicos

- Mantém-se o mecanismo atual de **arquivo estático** (`public/sitemap.xml`), adequado aqui porque todo o conteúdo (projetos, linhas) é estático/hardcoded — sem migração para script gerador.
- O Vite copia `public/` para `dist/` no build, então o sitemap fica disponível em `/sitemap.xml` tanto no preview quanto em produção.
- URLs sem barra final, coerentes com `cleanUrls`/`trailingSlash:false` do `vercel.json`.

## Validação

Após o deploy, conferir `https://lesco.com.br/sitemap.xml` listando as URLs corretas e `https://lesco.com.br/robots.txt` apontando para o sitemap.
