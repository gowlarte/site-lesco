# Ajuste das páginas Política de Privacidade e Termos de Serviço

## Problema raiz (legibilidade)
As páginas usam `bg-light` e `text-dark`, classes **inexistentes** no `tailwind.config.ts`. Resultado: card sem fundo real (herda o fundo escuro global) e texto herdando cor clara → texto ilegível em PT **e** EN. Corrigir os tokens resolve a ilegibilidade dos dois idiomas de uma vez.

## 1. Correção de cores (tokens reais)
Substituir em ambas as páginas:
- `bg-light` → `bg-lesco-white` (card off-white `#F0EDE8`)
- `text-dark` / `text-dark/70` / `text-dark/50` → `text-lesco-black` e opacidades (`text-lesco-black/70`, `/50`)

Isso garante contraste correto (texto escuro sobre card claro), respeitando a linguagem visual (cards flutuantes, raio 10px, margem 10px).

## 2. Imagem no topo (hero)
Adicionar um bloco hero no topo de cada página, dentro da moldura de 10px:
- Imagem full-width com `rounded-[10px]`, altura ~40vh, overlay escuro sutil.
- Título sobreposto (`Política de Privacidade` / `Termos de Serviço`) + data de atualização em mono.
- Gerar 1 imagem editorial coerente com o nicho (revestimentos arquitetônicos sustentáveis, brises/AltWood, luz natural, tom linho/madeira). Uma imagem serve para as duas páginas ou uma para cada — usarei uma imagem arquitetônica sóbria.

## 3. Conteúdo — pesquisa profunda e LGPD (não genérico)
Reescrever todo o conteúdo com base na **Lei 13.709/2018 (LGPD)** e nas boas práticas recomendadas, adaptado ao nicho da Lesco (revestimentos/brises/decks WPC, arquitetura sustentável, atendimento B2B e a arquitetos/construtoras, catálogos e amostras).

**Política de Privacidade** passará a incluir seções alinhadas à LGPD:
1. Controlador dos dados e contato do encarregado (DPO)
2. Dados pessoais coletados (fornecidos, de navegação/cookies, de terceiros)
3. Finalidades específicas + **bases legais** da LGPD (consentimento, execução de contrato, legítimo interesse, obrigação legal)
4. Compartilhamento e operadores (ferramentas de analytics, e-mail, CRM, hospedagem)
5. Transferência internacional de dados (se aplicável a ferramentas fora do Brasil)
6. Cookies e tecnologias de rastreamento (categorias e gestão)
7. Retenção e descarte
8. Segurança da informação
9. **Direitos do titular (art. 18 LGPD)**: confirmação, acesso, correção, anonimização, portabilidade, eliminação, revogação de consentimento, revisão de decisões automatizadas
10. Como exercer os direitos / prazo de resposta
11. Menores de idade
12. Alterações desta política
13. Encarregado (DPO) e canal de contato / ANPD

**Termos de Serviço** revisados para o contexto: objeto, cadastro/orçamentos/amostras, obrigações do usuário, propriedade intelectual, ausência de venda direta on-line vs. atendimento comercial, isenção de garantias sobre especificações técnicas, limitação de responsabilidade, links de terceiros, lei aplicável (Brasil) e foro, alterações.

Todo o texto novo entra via `t("...")` (fonte PT). A versão EN é gerada adicionando as entradas correspondentes no dicionário `src/i18n/dictionaries/en.ts` — assim os dois idiomas ficam legíveis e traduzidos.

Observação de conformidade: manterei o texto como base editável da Lesco, sem inventar certificações. Onde faltarem dados específicos (nome jurídico completo, CNPJ, e-mail do DPO), usarei o contato existente `contato@lesco.com.br` e deixarei rótulos claros para você preencher.

## 4. Modernização do design
- Tipografia com melhor hierarquia: números de seção em mono/accent, títulos `font-display`, corpo `font-body` com `leading-relaxed` e largura de leitura confortável (`max-w-3xl`).
- Índice/sumário navegável (âncoras) no topo do conteúdo em telas grandes.
- Divisórias sutis entre seções, respiro vertical maior.
- Blocos de destaque (ex.: direitos do titular) em card `bg-lesco-bone` com raio 10px.
- Rodapé da página com card de contato do DPO.
- Coerência total com o sistema: margem 10px, raio 10px, transições suaves.

## Arquivos afetados
- `src/pages/PoliticaPrivacidade.tsx` — reescrita completa (tokens, hero, conteúdo LGPD, design)
- `src/pages/TermosServico.tsx` — reescrita completa (tokens, hero, conteúdo, design)
- `src/i18n/dictionaries/en.ts` — novas entradas de tradução EN
- `src/assets/` — nova(s) imagem(ns) de hero geradas

## Verificação
- Build passa
- Screenshot via Playwright das duas páginas em PT e EN confirmando contraste/legibilidade e hero
