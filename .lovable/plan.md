## Reordenar elementos do header desktop

No print, a ordem da esquerda para a direita é:

```
[Logo]   [HOME SOBRE PRODUTOS CATÁLOGO BIBLIOTECA BLOG PORTFÓLIO  ORÇAMENTO]   [echo geo zhú  Lançamentos]
```

Hoje o código em `src/components/Header.tsx` renderiza:

```
[Logo]   [Nav links]   [Pílula Lançamentos]   [CTA Orçamento]
```

Ou seja, o CTA "Orçamento" precisa ser movido para dentro/junto do grupo de navegação (ficando logo após "Portfólio"), e a pílula "Lançamentos" passa a ser o último elemento à direita.

### Mudança em `src/components/Header.tsx`

1. Mover o bloco do CTA "Orçamento" (atualmente após a pílula Lançamentos) para **dentro do `<nav>` desktop**, como último item depois de "Portfólio". Mantém todo o comportamento atual (estado "Lançamento em breve" nas rotas `/zhu`, `/echo`, `/geo`, mesma classe visual `bg-[#DBDBDB]`).
2. Manter a pílula "Lançamentos" como o elemento final à direita (sem alterar seu conteúdo, gaps ou estilo já definidos).
3. Ajustar o container principal:
  - O `<nav>` ganha um espaçamento próprio entre os links e o CTA (ex.: `ml-2`/`gap` no CTA) para reproduzir o respiro visto no print entre "Portfólio" e o botão.
  - Continua usando `justify-between` no wrapper para que Logo fique à esquerda, Nav+CTA no centro/agrupado e Lançamentos à direita.
4. Mobile permanece inalterado (CTA continua dentro do menu fullscreen como hoje).

Nenhum outro arquivo é tocado. Sem mudança de cores, fontes ou tokens — apenas reordenação de elementos para bater com o print.  
  
5. O conjunto deve ser: [Logo]----------[HOME SOBRE PRODUTOS CATÁLOGO BIBLIOTECA BLOG PORTFÓLIO  ORÇAMENTO] [echo geo zhú  Lançamentos]   
e não  
[Logo]-----------------[HOME SOBRE PRODUTOS CATÁLOGO BIBLIOTECA BLOG PORTFÓLIO  ORÇAMENTO]-----------------[echo geo zhú  Lançamentos]