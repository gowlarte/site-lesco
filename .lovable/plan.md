# Landing page de Orçamento

Transformar a página `/orcamento` (`src/pages/Orcamento.tsx`) numa landing page completa, inspirada no print anexo, reaproveitando o iframe do formulário GHL já existente e apenas imagens/projetos que já estão no site. Nenhuma imagem nova será gerada e nenhum formulário novo será criado.

## Estrutura da página (de cima para baixo)

```text
┌───────────────────────────────────────────────┐
│ HERO (imagem de fundo existente + overlay)      │
│  ┌─────────────────────┐   ┌─────────────────┐  │
│  │ Título + subtítulo   │   │  FORMULÁRIO      │  │
│  │ "Crie um ambiente    │   │  (iframe atual)  │  │
│  │  exclusivo..."       │   │  card branco     │  │
│  └─────────────────────┘   └─────────────────┘  │
├───────────────────────────────────────────────┤
│ BENEFÍCIOS — grid de ícones (reuso FeatureIcon) │
├───────────────────────────────────────────────┤
│ PROJETOS — "Conheça alguns dos nossos projetos" │
├───────────────────────────────────────────────┤
│ NÚMEROS — +10 anos / 100% reciclado / 3 cert.   │
├───────────────────────────────────────────────┤
│ CTA final                                        │
└───────────────────────────────────────────────┘
```

## Detalhes por seção

**Hero com formulário embutido**
- Fundo: imagem já existente (`@/assets/hero-home-altwood.webp`) com overlay escuro, no padrão de cards flutuantes (`rounded-[10px]`, margens de 10px) usado no resto do site.
- Coluna esquerda: headline "Crie um ambiente exclusivo com elegância e autenticidade" + subtítulo curto.
- Coluna direita: card branco contendo **o mesmo iframe atual** (form `GTcMRzSzlRyI4MLLuFYJ`, "[02] [FORM] [ORCAMENTO]") — movido do corpo da página para o hero. Mantém o `useEffect` que injeta o script `form_embed.js`.
- Layout responsivo: 2 colunas no desktop, empilhado no mobile (form acima/abaixo conforme melhor leitura).

**Benefícios**
- Grid de ícones reaproveitando os SVGs e textos de `src/components/madeira-ecologica` (anti-mofo, hidrofóbico, resistente a pragas, 10 anos de garantia, 100% reciclado). Renderização simples em grid (sem a animação 3D), apenas ícone + label + descrição curta.

**Projetos**
- Reaproveita `projetos` de `src/data/projetos.ts` (ex.: Casa Mansa, Casa Areia, Vaz Batel — mesmos destaques da home), em grid de cards com imagem + nome, linkando para `/projetos/{slug}`.

**Números**
- Bloco com os mesmos indicadores do site: +10 anos de inovação, 100% produtos reciclados, garantia/ certificações.

**CTA final**
- Faixa com chamada para ação reaproveitando o estilo de CTA existente (botão para catálogo / WhatsApp), sem novo formulário.

## Considerações técnicas

- Arquivo alterado: `src/pages/Orcamento.tsx` (reescrita do JSX da página). Possível extração de pequenos componentes locais se necessário.
- O iframe é mantido **idêntico** (mesma `src`, `id`, atributos `data-*`, altura `1141px`) — apenas reposicionado dentro do card do hero.
- Usar tokens semânticos de cor do design system; manter sistema de 10px de margem/raio e tipografia (PP Neue Machina / DM Sans / JetBrains Mono).
- SEO mantido via componente `SEO` já presente.
- Nenhuma imagem gerada; somente assets já importáveis de `@/assets`.

## Validação
- Conferir no preview desktop (form visível no hero, sem corte) e mobile (empilhado, iframe sem scrollbar interna).
