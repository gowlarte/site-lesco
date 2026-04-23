

## Remover cores de fundo das seções "Pioneiros" e "Madeira Ecológica"

Ajustar as seções para usar o fundo geral do site (#DBDBDB) em vez de cores de fundo específicas.

### Alterações

**Arquivo: `src/pages/Index.tsx`**
- Remover `bg-light` da seção "Manifesto" (linha 231)
- A seção passa a usar o fundo geral do body

**Arquivo: `src/components/madeira-ecologica/MadeiraEcologicaSection.tsx`**
- Remover `bg-[#DBDBDB]` do layout mobile (linha 164)
- Remover `bg-[#DBDBDB]` do layout desktop (linha 198)
- Ambos passam a usar o fundo geral do body

### Resultado visual
Ambas as seções ficam com o mesmo fundo cinza claro (#DBDBDB) do site, sem blocos de cor separados, criando um fluxo visual mais contínuo.

