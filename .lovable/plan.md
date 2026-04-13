

## Problema

Em SPAs com React Router, ao navegar entre páginas via `<Link>`, o scroll do navegador não é resetado automaticamente. O usuário acaba vendo o meio ou o fim da nova página, dependendo de onde estava na página anterior.

## Solução

Criar um componente `ScrollToTop` que escuta mudanças de rota (via `useLocation`) e executa `window.scrollTo(0, 0)` a cada navegação.

## Mudanças

**1. Criar `src/components/ScrollToTop.tsx`**
- Hook `useEffect` que observa `location.pathname`
- Executa `window.scrollTo(0, 0)` em cada mudança de rota

**2. Editar `src/App.tsx`**
- Importar e inserir `<ScrollToTop />` logo após `<BrowserRouter>`, antes do `<Header />`

Impacto: todas as páginas passarão a abrir no topo automaticamente.

