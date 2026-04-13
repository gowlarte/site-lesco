## Splash Screen / Loader com Lwoosh Animado

### Objetivo

Criar uma tela de carregamento premium que:

1. Exibe o swoosh (lwoosh) vazio no centro, que gradualmente se preenche com o degradê de cores da marca
2. Aguarda fontes e imagens críticas carregarem antes de revelar o site
3. Ao completar, revela o lettering "LESCO" formando o logo completo + tagline "ARQUITETURA FEITA PARA O AMANHÃ"
4. Faz uma transição suave para o conteúdo do site

### Arquivos

**1. Salvar os SVGs do swoosh**

- `src/assets/lesco-swoosh-light.svg` (versão vazia/contorno)
- `src/assets/lesco-swoosh-cor.svg` (versão com degradê)

**2. Criar `src/components/SplashScreen.tsx**`

- Fundo `#141414` cobrindo toda a viewport (`fixed inset-0 z-50`)
- Swoosh centralizado: o SVG vazio é exibido inicialmente, com o SVG colorido sobreposto usando `clip-path` ou `opacity` animado que revela progressivamente o degradê (animação de ~2s)
- Ao detectar que fontes e imagens carregaram (`document.fonts.ready` + listener de imagens), dispara a fase de revelação:
  - O lettering "LESCO" aparece ao lado do swoosh com fade-in suave (formando o logo completo)
  - A tagline "ARQUITETURA FEITA PARA O AMANHÃ" aparece abaixo em PP Neue Machina com fade-in sequencial
- Após ~1s da revelação completa, o splash inteiro faz fade-out e é removido do DOM
- Timeout de segurança de ~5s para não bloquear o usuário indefinidamente

**3. Editar `src/App.tsx**`

- Importar e renderizar `<SplashScreen />` no topo do componente
- Usar estado `isLoading` para controlar a visibilidade
- Enquanto o splash estiver ativo, o conteúdo principal fica com `opacity: 0` para evitar flash

**4. Editar `src/index.css**`

- Adicionar keyframes para as animações do splash (fill do swoosh, fade-in do lettering, fade-out do overlay)

### Detalhes da Animação

```text
Timeline:
0s ─── Swoosh vazio aparece (fade-in rápido)
0.3s ── Degradê começa a preencher o swoosh (sweep da esquerda para direita)
2s ─── Swoosh totalmente preenchido + fontes/imagens prontas
2.2s ── Lettering "LESCO" aparece (fade-in + leve slide up)
2.5s ── Tagline aparece (fade-in)
3.5s ── Splash inteiro faz fade-out
4s ─── Splash removido, site visível
```

### Considerações Técnicas

- O lettering do logo será reconstruído com o SVG do logo light (sem o swoosh) ou posicionando texto estilizado
- A fonte PP Neue Machina será usada para a tagline com letter-spacing expandido como no print de referência
- O conteúdo do site só se torna visível após o splash completar, garantindo que fontes e imagens não "pisquem"  
  
Utilizar o logo em svg versão light já existente no repositório, não tentar replicar o logo através de fontes do sistema.