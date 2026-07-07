# Página /live-lesco

Nova landing page usando o mesmo design do site (base: `/orcamento`), com o formulário GHL específico do Live Lesco e conteúdo complementar extraído do HTML enviado. A página **não** aparece no menu (Header/Footer não serão alterados) e fica fora do sitemap principal.

## Estrutura da página (`src/pages/LiveLesco.tsx`)

1. **Hero + Formulário** (igual layout do /orcamento)
   - Texto à esquerda: título "Madeira Plástica Ecológica de Alto Padrão para Projetos Exclusivos" + subtítulo sobre WPC Premium unindo sofisticação, tecnologia e sustentabilidade, com chamada para preencher o formulário.
   - Formulário à direita usando o componente `GhlForm` existente (mantém UTMs e padrão visual):
     - `formId="UdrSMJdSvZWUJZVI46aE"`, `formName`/`title="[09] [FORM] [LEADS LIVE LESCO]"`, `height={1034}`.
   - Imagem de fundo: hero existente do banco de assets (ex.: `hero-home-altwood.webp`) com overlay escuro.

2. **WPC vs Madeira comum** — seção em grid com os 4 diferenciais do HTML de referência: Água e Resistência, Durabilidade e Resistência, Resistência a Fungos e Pragas, Estabilidade e Manutenção. Reaproveita os ícones SVG já usados no /orcamento.

3. **Projetos inspiradores** — grid de projetos em destaque vindos de `src/data/projetos.ts` (mesmo componente do /orcamento), apontando para o portfólio interno.

4. **Certificações** — bloco com GBC, LEED e ESG (textos do HTML de referência).

5. **CTA final** — mesmo bloco gradiente do /orcamento (WhatsApp + catálogo), ou um CTA único "Solicitar orçamento" rolando ao formulário.

## Roteamento
- Adicionar `import LiveLesco from "./pages/LiveLesco"` e `<Route path="/live-lesco" element={<LiveLesco />} />` em `src/App.tsx`, acima do catch-all.
- **Não** adicionar ao menu (Header/Footer ficam intactos).

## SEO
- Usar `<SEO>` com title "Live Lesco — Madeira Plástica Ecológica de Alto Padrão", description baseada no HTML, `path="/live-lesco"`.
- Não adicionar ao `ssg-routes.json` nem ao `sitemap.xml` para manter a página fora da indexação principal (campanha). *(Confirme se prefere que ela seja pré-renderizada/indexada.)*

## Observações técnicas
- O iframe não é alterado — uso do `GhlForm` que já injeta o script `form_embed.js` e os UTMs.
- Imagens vêm dos assets/portfólio já existentes; nenhuma imagem nova é gerada.