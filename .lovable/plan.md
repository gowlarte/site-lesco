

## Ajustes na seção "Madeira Ecológica"

Três mudanças no `MadeiraEcologicaSection.tsx`:

### 1. Novo layout desktop: GIF à esquerda, ícones empilhados à direita

Substituir o posicionamento absoluto atual (5 ícones espalhados em volta do canvas) por um layout flex de 2 colunas centralizado:

```text
┌─────────────────────────────────────────────┐
│   Conheça nossa madeira ecológica           │
│                                             │
│   ┌──────────┐      • Anti-mofo             │
│   │          │      • Hidrofóbico           │
│   │  CANVAS  │      • Resistente a pragas   │
│   │          │      • 10 anos de garantia   │
│   └──────────┘      • 100% reciclado        │
└─────────────────────────────────────────────┘
```

- Wrapper interno `flex items-center justify-center gap-12 lg:gap-20 max-w-[1200px] mx-auto`.
- Coluna esquerda: canvas com `w-[45%] max-w-[520px] aspect-square`.
- Coluna direita: `flex flex-col gap-6` com os 5 `FeatureIcon` em sequência, `align="left"`.
- Stagger de fade-in mantido (delays 0/150/300/450/600ms na ordem vertical).
- Conjunto inteiro centralizado vertical e horizontalmente dentro do sticky.

### 2. Mobile: já está empilhado, apenas confirmar

O layout mobile atual já tem GIF em cima + grid 2 colunas de ícones embaixo. Vou trocar para **lista vertical** (1 coluna) para ficar consistente com o desktop e dar mais respiro:
- `flex flex-col gap-6` em vez de `grid grid-cols-2`.
- `align="left"` em cada `FeatureIcon`.

### 3. Tolerância de scroll após ícones aparecerem

Atualmente o sticky termina exatamente quando `progress = 1`. Vou aumentar o container para `h-[450vh]` e ajustar o cálculo de frame para que:
- **0% – 60% do scroll** → anima o GIF (frame 0 → último frame).
- **60% – 100% do scroll** → GIF congelado no último frame, ícones visíveis, tela permanece "presa" no sticky por mais ~150vh de rolagem.

Implementação no `compute()`:
```ts
const animationProgress = Math.min(1, progress / 0.6);
const frame = Math.floor(animationProgress * (total - 1));
const complete = animationProgress >= 1; // ícones aparecem aos 60%
```

Isso dá ao usuário ~1.5 viewport inteira de scroll "calmo" para ler/clicar nos ícones antes de a seção liberar o scroll.

### Arquivos a editar

- `src/components/madeira-ecologica/MadeiraEcologicaSection.tsx` — único arquivo. Reescreve o JSX desktop (remove posicionamento absoluto, usa flex 2 colunas), ajusta mobile para lista vertical, e altera a lógica de `compute()` + altura do container.

Nenhuma mudança em `ProdutoCanvas.tsx` ou `FeatureIcon.tsx`.

