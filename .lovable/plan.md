# Substituir logos das linhas

Substituir o conteúdo dos 4 arquivos SVG de logo, mantendo os mesmos caminhos para não quebrar imports em `Linhas.tsx` e `Index.tsx`.

## Mapeamento

| Arquivo (mantém o nome) | Novo conteúdo | Linha |
|---|---|---|
| `src/assets/linha-altwood-2.svg` | logo Manto | madeira ecológica |
| `src/assets/linha-zhuzen-2.svg` | logo Zhú | bambus |
| `src/assets/linha-echotex-2.svg` | logo Echo | tecido acústico |
| `src/assets/linha-italflex-2.svg` | logo Geo | pedra flexível |

## Ajuste de cor

Os SVGs enviados têm `fill: #303030` fixo via classe `.cls-1`. Em `Linhas.tsx` os logos são injetados via `dangerouslySetInnerHTML` e a cor é controlada por `style={{ color: ... }}` (cor da linha no hover, `#141414` em estado padrão). Para isso funcionar, cada novo SVG terá:

- bloco `<defs><style>.cls-1{fill:#303030}</style></defs>` removido
- `class="cls-1"` substituída por `fill="currentColor"` em cada `<path>`/`<polygon>`

## Escopo

Apenas troca dos 4 arquivos SVG. Nomes textuais ("AltWood", "Zhúzen", "Echotex", "Italflex"), rotas (`/altwood`, `/zhuzen`, ...) e páginas internas permanecem inalterados — se quiser renomear tudo para Manto/Zhú/Echo/Geo, peça num próximo passo.
