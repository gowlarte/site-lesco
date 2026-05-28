## Atualizar Títulos e Descrições SEO de 6 páginas

Substituir as props `title` e `description` do componente `<SEO>` em cada página listada, mantendo `path` e demais propriedades inalteradas.

### Alterações

| Página / Arquivo | Novo Título | Nova Descrição |
|---|---|---|
| `src/pages/Index.tsx` (/) | Revestimentos em Madeira Ecológica \| Lesco | Transforme cada ambiente em uma expressão de elegância natural com nossos revestimentos em madeira ecológica. Acabamentos únicos e personalizados. |
| `src/pages/MantoShield.tsx` (/madeira-ecologica-para-fachada) | Madeira Ecológica para Fachada \| Lesco Shield | Nossa madeira ecológica para fachadas e painéis verticais combina tecnologia e durabilidade do plástico com a beleza estética da madeira, criando um material de alta resistência e longa durabilidade. |
| `src/pages/MantoPanel.tsx` (/placa-wpc-interior) | Placa WPC Interior \| Lesco Panel | Placas WPC para interiores fabricadas a partir da combinação de fibras de madeira reciclada e resinas plásticas, oferecendo resistência, estética sofisticada e sustentabilidade. |
| `src/pages/MantoBrise.tsx` (/brise-madeira-ecologica) | Brise Madeira Ecológica \| Lesco Brise | Nossa madeira ecológica para brises e fachadas oferece uma solução sustentável que combina a durabilidade do plástico com a estética natural da madeira. |
| `src/pages/MantoLine.tsx` (/forro-wpc) | Forro WPC \| Lesco Line | Forros WPC retardantes ao fogo, resistentes à água e com baixo custo de manutenção. Uma solução sustentável que combina beleza natural e desempenho tecnológico. |
| `src/pages/MantoDeck.tsx` (/madeira-ecologica-para-deck) | Madeira Ecológica para Deck \| Lesco Deck | Madeira ecológica para decks, piscinas e áreas externas. Solução ideal para projetos residenciais, comerciais e públicos que buscam criar ambientes externos sofisticados e duráveis. |

### Observações

- Apenas `title` e `description` mudam — `path`, JSON-LD e Open Graph continuam herdando os mesmos valores via componente `<SEO>`.
- Após publicar, sugiro rodar um novo scan na aba SEO & AI search para validar as correções.
