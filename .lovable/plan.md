## Objetivo
Substituir a página 404 genérica por uma versão elegante, alinhada à identidade Lesco, com links para as principais seções e tracking duplo (Lovable Cloud + dataLayer/GTM).

## 1. Ativar Lovable Cloud
Necessário para registrar os acessos ao 404 no banco. Cria a tabela:

```text
not_found_hits
  id          uuid (pk)
  path        text         -- rota tentada
  referrer    text         -- de onde veio
  user_agent  text
  created_at  timestamptz default now()
```

- RLS habilitada. Política de INSERT pública (anon + authenticated) para permitir o registro a partir de qualquer visitante. Sem SELECT público (dados de diagnóstico só via backend/admin).
- GRANT de INSERT para `anon` e `authenticated`; `ALL` para `service_role`.

## 2. Tracking utilitário
Criar `src/lib/track404.ts` com uma função que, ao montar a 404:
- Faz `INSERT` em `not_found_hits` via client Supabase (path, referrer, user_agent), com try/catch silencioso.
- Dispara `window.dataLayer.push({ event: "page_not_found", page_path, referrer })` (inicializando `window.dataLayer` se não existir) — pronto para GTM/GA4.

## 3. Redesenhar `src/pages/NotFound.tsx`
Manter a estrutura editorial Lesco (cards flutuantes, raio 10px, tipografia PP Neue Machina / DM Sans, paleta semântica):
- Header já é exibido automaticamente em rotas não-home (App.tsx); a página terá o padding-top de 100px de offset.
- Bloco central: "404" em destaque, título "Página não encontrada" e texto curto orientando o visitante.
- Grade de links para as principais seções: Madeira Ecológica (`/madeira-ecologica-lesco`), Portfólio (`/portfolio`), Catálogo (`/catalogo-lesco`), Biblioteca (`/biblioteca`), Quem Somos (`/quem-somos`), Orçamento (`/orcamento`). CTA principal "Voltar ao início".
- Usar `<Link>` do react-router para navegação SPA.
- Manter `<meta robots noindex>` (via SEO/Helmet) e `<title>` adequado.
- Chamar o tracking no `useEffect` (mantendo também o `console.error` atual para debug).

## Detalhes técnicos
- Tracking roda só no cliente (dentro de `useEffect`), sem afetar SSG/hydration.
- Falhas de rede no INSERT não quebram a página (catch silencioso).
- Sem novas dependências; reaproveita o client Supabase gerado pela ativação do Cloud e os tokens de design existentes.
