## Igualar o link "Orçamento" aos demais links do nav

Atualmente, em `src/components/Header.tsx`, o "Orçamento" dentro do `<nav>` é renderizado como um botão com fundo `bg-[#DBDBDB]`, padding maior e cantos arredondados, destoando dos outros links (que usam apenas tipografia uppercase 12px com estado de hover/dim).

### Mudança em `src/components/Header.tsx`

1. Trocar a classe do CTA dentro do nav para usar o mesmo `sharedClass` dos demais links:
   - `font-display font-light text-[12px] uppercase tracking-[0.08em] transition-all duration-[350ms] flex items-center gap-1`
   - Cor seguindo o mesmo esquema dinâmico (`baseColor`/`activeColor`/`dimColor`) com estado de hover usando `hoveredNav === "Orçamento"`.
2. Remover `bg-[#DBDBDB]`, `rounded`, `px-4 py-1.5`, `hover:bg-[#cfcfcf]` e `ml-2`. O espaçamento passa a ser o mesmo `gap-8 lg:gap-10` do `<nav>`.
3. Manter o comportamento de "Lançamento em breve" nas rotas `/zhu`, `/echo`, `/geo` (continua como `<span>` não clicável, apenas com o estilo de link).
4. Manter visibilidade desktop (`hidden md:flex` herdada do nav).

A pílula "Lançamentos" e o restante do header permanecem inalterados.
