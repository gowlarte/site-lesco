# CTA "Saiba mais" e landing pages das linhas em breve

## Objetivo

Nos slides do hero da home das linhas Zhú, Echo e Geo (rotuladas como "Nova linha em breve"), adicionar um botão "Saiba mais" centralizado abaixo dessa frase. O botão leva à página da própria linha, que deixa de ser apenas um formulário genérico e passa a ser uma landing page completa — hero com formulário de cadastro de newsletter no topo, seguido por seções explicativas (conteúdo placeholder que o usuário editará depois).

## Mudanças

### 1. Home — hero slides (`src/pages/Index.tsx`)
- Abaixo do label "Nova linha em breve", adicionar um CTA centralizado com o texto "Saiba mais".
- O CTA usa o mesmo estilo do botão "Ver linha completa" (pill branco, font-display, uppercase) para coerência visual.
- O `href` aponta para `active.href` (já configurado: `/zhu`, `/echo`, `/geo`).

### 2. Substituir `EmBreve.tsx` por uma landing page padrão por linha

Hoje as três rotas (`/zhu`, `/echo`, `/geo`) renderizam o mesmo componente genérico `EmBreve.tsx` (apenas formulário centralizado). Substituir por uma landing page única e parametrizada, mantendo as rotas atuais.

Estrutura da landing page (mesma para todas, conteúdo varia por linha):

1. **Hero com formulário** (lado a lado em desktop, empilhado em mobile)
   - Esquerda: nome da linha (logo SVG), tagline curta, parágrafo de introdução.
   - Direita: card com título "Seja avisado no lançamento", campo de email + botão "Notifique-me" (lógica RD Station já existente em `EmBreve.tsx` é reaproveitada).
   - Imagem de fundo da linha (já existe: `heroZhuzen`, `heroEcho`, `heroGeo`).

2. **Seção "Sobre a linha"** — bloco editorial com texto placeholder explicando o conceito da linha.

3. **Seção "Aplicações"** — grid de 3 cards genéricos (ícone/imagem + título + descrição curta) com usos típicos.

4. **Seção "Materiais e diferenciais"** — lista de 3 a 4 bullets de características (placeholder).

5. **CTA final** — repete o formulário ou link âncora de volta ao formulário do topo.

6. **Footer** — já vem do layout global.

Todo o conteúdo textual é placeholder genérico marcado de forma fácil de identificar para o usuário substituir depois.

### 3. Dados das linhas

Centralizar os dados das três linhas em um arquivo `src/data/linhas-em-breve.ts` com: `slug`, `nome`, `logo` (SVG raw), `imagem` hero, `tagline`, `intro`, `sobre`, `aplicacoes[]`, `diferenciais[]`. A landing page lê pelo slug da rota.

### 4. Roteamento

Manter as rotas atuais `/zhu`, `/echo`, `/geo` apontando para o novo componente (ex.: `LinhaEmBreve.tsx`). Manter também `/em-breve/:linha` como fallback.

## Detalhes técnicos

- Reaproveitar a lógica de submit RD Station de `EmBreve.tsx` em um componente compartilhado `NewsletterLancamentoForm` para não duplicar código.
- Manter a estética editorial do projeto: cards flutuantes com `rounded-[10px]`, margens de 10px, tipografia PP Neue Machina + DM Sans, paleta clara padrão (`bg-light`).
- O hero da landing usa imagem de fundo com overlay escuro suave (semelhante a `HeroSection` do AltWood) para garantir legibilidade do conteúdo sobreposto.
- Sem dependências novas.

## Arquivos afetados

- `src/pages/Index.tsx` — adicionar CTA "Saiba mais" no slide.
- `src/pages/EmBreve.tsx` — substituído pelo novo `LinhaEmBreve.tsx` (ou refatorado no mesmo arquivo).
- `src/components/NewsletterLancamentoForm.tsx` — novo, extraído da lógica atual.
- `src/data/linhas-em-breve.ts` — novo, conteúdo placeholder por linha.
- `src/App.tsx` — apontar `/zhu`, `/echo`, `/geo` (e `/em-breve/:linha`) para o novo componente.
