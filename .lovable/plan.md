## Objetivo
Reescrever `src/pages/BlogArtigo.tsx` para reproduzir fielmente o PDF de referência: artigo estreito centralizado, hierarquia tipográfica compacta, alinhamento à esquerda (sem texto centralizado), contraste de leitura corrigido e composição de imagens idêntica ao PDF.

## Diagnóstico dos problemas atuais
1. Wrapper ocupa quase 100% da largura — no PDF o artigo é uma coluna estreita.
2. Texto corrido aparece centralizado (`text-center`) — no PDF é todo alinhado à esquerda.
3. Títulos (H2) muito grandes — no PDF são discretos (~16px).
4. Cores de texto com baixo contraste (`text-dark/85`, `text-dark/70`, `text-dark/60`) sobre fundo `bg-light` quase do mesmo tom — partes ilegíveis. Usar `text-dark` cheio para corpo.
5. Cards de atributos com títulos grandes — no PDF são ítens compactos em 5 colunas finas.
6. CTA tem fundo quase invisível — no PDF tem caixa cinza-claro com borda sutil e botão verde menor.
7. Imagem do produto WPC fica enorme — no PDF é um thumb pequeno ao lado do título da seção.

## Mudanças no `src/pages/BlogArtigo.tsx`
- **Wrapper**: `max-w-[920px] mx-auto`, padding lateral menor (`px-6 sm:px-10 md:px-14`).
- **Tipografia** (componentes atoms reutilizáveis):
  - `H1`: 26–32px, bold, com regra horizontal curta abaixo.
  - `H2`: 15–16px bold, sem regra.
  - `H3`: 14–15px bold.
  - `Body`: 12.5–13px, `leading-[1.6]`, `text-dark` (sem opacidade), alinhado à esquerda.
- **Hero**: aspect-ratio `16/8`, legenda em itálico centralizada logo abaixo.
- **Seção 1 — De Belém para o mundo**: parágrafo + grid 12 colunas (5/7) com imagem pequena + pull-quote à esquerda e imagem vertical 4/5 à direita.
- **Seção 2 — Material de assinatura**: linha com thumb quadrado pequeno (col 3) + título e parágrafo (col 9). Abaixo, imagem full-width 16/9 da fachada e grid de 5 atributos compactos (título inline + descrição curta).
- **Seção 3 — Engenharia**: título + parágrafo + grid de 5 cards compactos + parágrafo de fechamento.
- **Seção 4 — Tabela comparativa**: tabela minimal sem fundo zebra, apenas `border-b` cinza claro, header com regras superior/inferior.
- **Seção 5 — Branding urbano**: linha de texto + H3 "Depois do evento, o legado" + parágrafo.
- **Seção 6 — CTA**: caixa `bg-bone` com `border border-dark/10`, padding interno menor, botão verde `#2D5016` compacto.
- **Seção 7 — Veja também**: H2 + grid 2 colunas com imagens 16/10, gradiente preto na base e título sobreposto.
- **PullQuote**: aspas grandes posicionadas absolutas, texto em itálico PP Neue Machina light 18–20px.

## Componentes internos (atoms)
- `H1`, `H2`, `H3`, `Body` — padronizam tamanho/cor.
- `Attribute({title, description})` — item de grid com título inline bold + descrição.
- `PullQuote` — citação destacada.
- `ComparisonTable` — tabela estilizada.
- `CTABlock` — caixa de chamada.
- `RelatedArticles` — grid final.

## Cores e contraste
- Corpo de texto: `text-dark` (sem `/opacity`).
- Apenas legendas/auxiliares secundárias: `text-dark/80` mínimo.
- Caixa CTA: `bg-bone` (token existente `#e5e1dc` ligeiramente mais escuro que `bg-light`) com `border-dark/10` para destacar do fundo do artigo.

## Sem mudanças
- Rota (`/blog/:slug`), assets já copiados em `src/assets/cop30/*`, design tokens globais e Header/Footer.
