

## Criar Página de Orçamento com Formulário RD Station

Criar a página `/orcamento` que já está linkada no Header mas não existe, integrando o formulário RD Station via embed script.

### Alterações

**Novo arquivo: `src/pages/Orcamento.tsx`**
- Página com layout consistente com o site (100px top padding para o header fixo)
- Seção hero compacta com título "Solicite seu Orçamento" e subtítulo descritivo
- Container centralizado (`max-w-[800px]`) com o formulário RD Station
- O formulário será carregado via `useEffect` que injeta os scripts do RD Station no DOM:
  1. Cria a `div` com `id="solicite-orcamento-site-e1ebbbdda007b9fa6071"` e `role="main"`
  2. Carrega o script `rdstation-forms.min.js` dinamicamente
  3. Após o carregamento, executa `new RDStationForms('solicite-orcamento-site-e1ebbbdda007b9fa6071', 'UA-191702288-1').createForm()`
  4. Cleanup no unmount para remover scripts
- Estilização CSS para os campos do formulário RD Station via classes globais no `index.css`, adequando ao design system (cores, tipografia, border-radius)
- Fundo dark (#0D0D0D) ou light (#DBDBDB) — seguindo o padrão geral do site

**Arquivo: `src/App.tsx`**
- Importar `Orcamento` e adicionar `<Route path="/orcamento" element={<Orcamento />} />`

**Arquivo: `src/index.css`**
- Adicionar estilos globais para customizar os inputs gerados pelo RD Station Forms (que são injetados via JS e não controlados pelo React), como cores, fontes, padding e border-radius consistentes com o design system

### Detalhes técnicos
- O RD Station Forms injeta HTML próprio no DOM — não é um componente React. A integração será feita via `useEffect` + `useRef` para controlar o container
- Declaração de tipo para `RDStationForms` no `window` global para evitar erros TypeScript

