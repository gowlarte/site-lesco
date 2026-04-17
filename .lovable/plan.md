## Ajustes no hover da página /linhas

Dois problemas a resolver:

### 1. Delay na aparição da imagem flutuante

**Causa**: Hoje a `<img>` é renderizada apenas quando `activeIndex !== null` e o `src` muda dinamicamente para a imagem da linha ativa. Isso força o navegador a buscar/decodificar a imagem no momento do hover (mesmo que esteja em cache, há um pequeno delay de decode + fade-in da `transition-opacity`).

**Solução**:

- **Pré-carregar** todas as imagens via `useEffect` com `new Image()` na montagem (mesmo padrão já usado no Hero da Home).
- **Renderizar todas as 4 imagens permanentemente** dentro do container flutuante, controlando visibilidade com `opacity: 0/1` por imagem. Assim o navegador já tem tudo decodificado e o switch é instantâneo.
- **Remover a `transition-opacity**` do container flutuante (mantém só nas imagens internas, com 200ms para um crossfade sutil) e exibir o container o tempo todo, controlando só a opacidade conforme `activeIndex`.

### 2. Cor do hover do logo = cor da linha

Hoje todos os logos viram `#C8956C` (laranja AltWood) no hover. Cada linha precisa da sua própria cor de marca. Adicionar campo `cor` em cada item de `linhas`:


| Linha    | Cor sugerida                       |
| -------- | ---------------------------------- |
| AltWood  | `#F7C39B`(laranja madeira — atual) |
| Zhúzen   | `#A3DBA0`(verde bambu)             |
| Echotex  | `#C6E1D7`(marrom tecido)           |
| Italflex | `#F57D69`(bege pedra)              |


Aplicar via `style={{ color: activeIndex === i ? linha.cor : "#141414" }}`.

> Posso ajustar essas cores se você tiver paletas oficiais para Zhúzen, Echotex e Italflex — me avise antes ou depois da implementação.

### Arquivos a editar

- `src/pages/Linhas.tsx` — adicionar pré-carregamento, renderizar imagens permanentes com opacidade controlada, adicionar campo `cor` por linha.

### Resumo do comportamento final

- Cursor sobre uma linha → imagem correspondente aparece **instantaneamente** seguindo o cursor (com crossfade de 200ms entre imagens ao trocar de linha).
- Logo da linha em hover assume **a cor da própria marca**, não mais o laranja genérico.
- Demais linhas continuam com fade para `opacity: 0.25`.