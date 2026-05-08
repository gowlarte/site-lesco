## Objetivo

Padronizar as páginas de produto AltWood (Brise, Deck, Line, Panel) seguindo o mesmo padrão visual já aplicado na Shield, mantendo todas as informações, especificações, modelos, paletas e galerias específicas de cada produto.

## Mudanças por página

Aplicar exatamente os mesmos quatro ajustes em `MantoBrise.tsx`, `MantoDeck.tsx`, `MantoLine.tsx` e `MantoPanel.tsx`:

1. **Título do hero (`headline`)** — trocar pelo padrão `LESCO {PRODUTO}` em maiúsculas:
   - Brise → `LESCO BRISE`
   - Deck → `LESCO DECK`
   - Line → `LESCO LINE`
   - Panel → `LESCO PANEL`

2. **Subtítulo do hero (`subtitulo`)** — esvaziar (`subtitulo=""`), removendo a frase descritiva curta abaixo do título grande, igual à Shield.

3. **Wrapper da introdução** — trocar `max-w-[760px] mx-auto px-6 py-20 text-center` por `px-6 md:px-12 lg:px-20 py-20 text-center`, alinhando a largura do bloco introdutório com as demais seções da página (modelos, galeria, etc).

4. **Título da galeria de projetos** (`<h2>Realizações com ...</h2>`) — trocar `text-white` por `text-gray-950`, mantendo a frase original com o nome do produto correspondente (ex.: "Realizações com LESCO BRISE", "Realizações com LESCO DECK", etc).

## O que NÃO muda

- Imagens, paletas de cores, modelos, especificações técnicas, garantias, breadcrumbs e seções de navegação cruzada permanecem como estão em cada página.
- O componente `CardModelo` (fundo branco, padding, gap, radius) já foi atualizado e é compartilhado, portanto o novo visual dos cards de produto será automaticamente refletido em todas as páginas.
- Componentes globais (`HeroSection`, `SecaoOrcamento`, `SwatchCor`, `CardProjeto`) não serão alterados.

## Detalhes técnicos

Cada página recebe quatro `search-and-replace` pontuais:
- 1 edição na prop `headline` do `<HeroSection />`.
- 1 edição na prop `subtitulo` do `<HeroSection />`.
- 1 edição no `className` do `<div>` da introdução.
- 1 edição no `className` do `<h2>` da seção "Realizações com ..." + atualização do texto para usar `LESCO {PRODUTO}`.

Sem mudanças em rotas, dados ou outros componentes.
