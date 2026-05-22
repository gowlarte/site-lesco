# Grupo "Lançamentos" no menu do topo

## Objetivo

No `Header` (usado em todas as páginas, incluindo overlay na home), adicionar um agrupamento visual à direita do menu com as 3 linhas em pré-lançamento — Echo, Geo e Zhú — representadas pelos seus próprios logos SVG, seguidas de um rótulo "Lançamentos", tudo dentro de uma pílula única, como no print.

## Onde entra no header

A pílula fica entre a navegação principal e o botão "Orçamento":

```
[LESCO]   HOME · SOBRE · PRODUTOS · CATÁLOGO · BIBLIOTECA · BLOG · PORTFÓLIO   [ ((echo)) geo zhú | Lançamentos ]   [ ORÇAMENTO ]
```

Em telas menores que `lg` a pílula é ocultada (`hidden lg:flex`) para não competir com o menu; no menu mobile fullscreen é exibida como uma seção "Lançamentos" listando os 3 itens.

## Estrutura da pílula (desktop)

- Container `rounded-full` com fundo translúcido que se adapta às 3 variações já existentes do header:
  - overlay transparente (home, topo): `bg-white/10 border border-white/20`
  - claro (rolado fora do overlay): `bg-black/[0.06] border border-black/10`
  - escuro (rolado em páginas internas): `bg-white/[0.06] border border-white/10`
- Três `<Link>` (um por linha) com o logo SVG da linha renderizado via `dangerouslySetInnerHTML` (padrão já usado no projeto via `?raw`) com `currentColor` herdando a cor do texto atual do header (mesma lógica de `baseColor`/`activeColor`).
- Divisor vertical sutil (`w-px h-3 bg-current/30`) entre os logos e o rótulo.
- Rótulo "Lançamentos" em `font-display font-light text-[11px] uppercase tracking-[0.08em]` com cor dim (`dimColor`).
- Hover em cada logo: cor passa a `activeColor` e leve `scale-105`. Mantém a mesma lógica de blur/dim dos outros itens (`hoveredNav`).

Reaproveitar `linhaZhuzen2Raw`, `linhaEchotex2Raw`, `linhaItalflex2Raw` (já importados em outros lugares do projeto) — importar como `?raw` no Header.

Rotas: `/echo`, `/geo`, `/zhu` (já existentes em `App.tsx`).

## Mobile fullscreen

Logo abaixo dos demais itens e antes do botão Orçamento, adicionar:

- Pequeno rótulo "Lançamentos" em pp neue machina, cor dim.
- Linha horizontal com os 3 logos renderizados maiores (altura ~28px), espaçados, cada um linkando para a respectiva rota. Mesmo padrão de renderização SVG raw com `currentColor`.

## Arquivos afetados

- `src/components/Header.tsx` — adiciona o novo grupo "Lançamentos" no desktop (entre nav e CTA) e no mobile (após os links principais). Importa os 3 SVGs `?raw`.

Sem mudanças em rotas, dados ou outros componentes.