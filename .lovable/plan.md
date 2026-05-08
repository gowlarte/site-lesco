## Reestruturar seção "Nossos pilares" com selos integrados

### Problemas atuais
- Selos isolados em coluna lateral, descolados visualmente dos pilares.
- Cards brancos (`bg-white/60`) quebram o tom editorial da página.
- Em telas largas, sobra espaço entre os blocos.

### Nova estrutura

**1. Pilares em linha cheia (4 colunas no desktop)**
- Trocar grid 2x2 por `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` ocupando toda a largura da seção.
- Mantém títulos e textos atuais.

**2. Bloco de certificações integrado abaixo dos pilares**
- Divisória sutil (linha `border-t border-dark/10`) separando pilares e certificações dentro da mesma card.
- Label "Certificações reconhecidas" alinhada à esquerda (mesmo estilo do eyebrow "Sustentabilidade").
- Selos em linha única no desktop (5 colunas), responsiva: `grid-cols-3 sm:grid-cols-5`.
- **Sem fundo branco**: selos diretamente sobre o `bg-light`, com `mix-blend-multiply` para integrar tons claros ao fundo cinza.
- Tamanho contido (~80–100px), `object-contain`, espaçamento generoso.
- Tooltip/legenda discreta abaixo opcional (ex.: "ISO 9001 · ISO 14001 · LEED · GBC · ESG") em mono pequeno.

**3. CTA "Falar com um especialista"**
- Mantém posição, com mais respiro acima.

### Layout final (desktop)
```text
┌──────────────────────────────────────────────┐
│ Nossos pilares                               │
│                                              │
│ [Pilar 1]  [Pilar 2]  [Pilar 3]  [Pilar 4]   │
│                                              │
│ ──────────────────────────────────────────   │
│ Certificações reconhecidas                   │
│ [ESG] [GBC] [LEED] [ISO 9001] [ISO 14001]    │
│                                              │
│ [ Falar com um especialista ]                │
└──────────────────────────────────────────────┘
```

### Responsivo
- Mobile: pilares empilhados, selos em 3 colunas (2ª linha com 2).
- Tablet: pilares 2x2, selos em 5 colunas compactas.
- Desktop: pilares 4 col, selos 5 col em linha única.

### Arquivos
- `src/pages/Sustentabilidade.tsx` (única alteração)
