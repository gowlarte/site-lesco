# Otimização da Landing Page Live Lesco

Refinar a página `/live-lesco` (`src/pages/LiveLesco.tsx`) em três frentes: legibilidade, conteúdo do hero e a seção de diferenciais do material — tudo dentro da linguagem visual atual (cards flutuantes, margens/radius de 10px, tipografia PP Neue Machina / DM Sans / JetBrains Mono).

## 1. Corrigir legibilidade da seção "Para quem é / Para quem não é"

No print, o card "Para quem não é" está quase ilegível (texto cinza claro sobre fundo translúcido).

- Trocar o fundo `bg-white/30` do card por um tom sólido legível (ex.: `bg-white/70`).
- Aumentar o contraste dos textos: `text-dark/70` → `text-dark`, e os rótulos/ícones esmaecidos (`text-dark/60`, `text-dark/50`, `bg-dark/10`) para tons sólidos escuros.
- Manter a distinção visual entre os dois cards por borda/ícone (verde para "é", neutro para "não é"), não por opacidade do texto.

## 2. Enriquecer a parte inicial (Hero)

Complementar o conteúdo do hero **sem incluir datas**, mantendo o layout de 2 colunas (texto à esquerda, formulário GHL à direita).

- Manter H1 e parágrafo atuais.
- Adicionar abaixo do parágrafo uma faixa de **provas/credibilidade** coerente com o tom executivo, reaproveitando dados já existentes na página:
  - Avaliação Google (4,7 · 29 avaliações).
  - Bullets curtos de reforço (ex.: "Especificado por arquitetos e construtoras", "Materiais premium e sustentáveis", "Amostras enviadas para o seu projeto").
- Estilo em pílulas/linha discreta sobre o hero escuro, sem poluir o formulário.

## 3. Seção "Por que Madeira Ecológica" (remover WPC) + animações

Atualmente a seção usa "WPC Premium x Madeira comum". Nesta página **nunca** usar o termo "WPC".

- Substituir todos os textos que mencionam "WPC" por "Madeira Ecológica" (título, kicker, descrições dos 5 diferenciais e a menção no bloco "Sobre a Lesco" e nos Projetos/Portfólio).
- Reescrever as descrições dos diferenciais comparando "Madeira Ecológica" vs "madeira comum", mantendo o sentido técnico.
- Adicionar **animações mais avançadas** nesta seção:
  - Cards de diferenciais entram com stagger (revelação sequencial em cascata) ao entrar na viewport.
  - Faixa/linha de containers que rolam horizontalmente (marquee) com os atributos-chave (Anti-mofo, Hidrofóbico, Resistente a pragas, Sustentável, Baixa manutenção) — reutilizando o componente `ScrollMarqueeGallery` existente ou uma marquee CSS simples com os ícones SVG.
  - Hover elevado nos cards (leve scale/translate) coerente com as transições do projeto (`cubic-bezier(0.25,0.46,0.45,0.94)`).

## Detalhes técnicos

- Arquivo único afetado: `src/pages/LiveLesco.tsx`.
- Reaproveitar `ScrollReveal` e, se possível, `ScrollMarqueeGallery` para a faixa animada; caso não encaixe, usar keyframe marquee via classe utilitária.
- Stagger via `transition-delay` incremental dentro do map dos diferenciais (ou variantes do `ScrollReveal`).
- Sem alterar cores hardcoded — usar tokens semânticos (`text-dark`, `bg-light`, `text-primary-foreground`, `accent`).
- Ajustar também o `<SEO>` e demais copies da página para remover "WPC" e usar "Madeira Ecológica".
- Verificação: `tsgo` (typecheck) e conferência visual no preview após o build.

## Fora de escopo

- Sem mudanças de backend, formulário GHL ou rotas.
- Sem novas imagens geradas, salvo se necessário substituir alguma que não exista (usa-se o acervo atual).
