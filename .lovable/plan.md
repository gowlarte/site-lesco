# Remover todo o RD Station (forms já migrados para GHL)

As páginas reais **Catálogo** e **Orçamento** já usam os iframes do GHL (IDs idênticos aos que você enviou). Os componentes React que falavam com o RD são código morto, exceto a newsletter de lançamento. Vou remover 100% do RD.

## Diagnóstico
- `src/pages/Catalogo.tsx` e `src/pages/Orcamento.tsx` → já embedam GHL. **Sem mudança.**
- `src/components/catalogo/CatalogoForm.tsx` → POST ao RD, **não importado em lugar nenhum** (morto).
- `src/components/orcamento/*` (MultiStepForm, RDStationBridge, Step1/2/3, CitySearch, NavButtons, ProgressBar, SuccessScreen, types) → fluxo RD, **nenhum import externo** (morto).
- `src/components/NewsletterLancamentoForm.tsx` → POST ao RD, **ainda usado** em `LinhaEmBreve.tsx`.
- `src/index.css` → bloco `.rd-station-form-container` (estilos de form RD) **não usado**.

## Ações

### 1. Apagar código morto do RD
- Excluir `src/components/catalogo/CatalogoForm.tsx` (e a pasta `catalogo/` se ficar vazia).
- Excluir a pasta inteira `src/components/orcamento/` (MultiStepForm, RDStationBridge e todos os steps/auxiliares).

### 2. Newsletter de lançamento (sem GHL ainda)
O form GHL de newsletter ainda não existe. Para não enviar nada ao RD:
- Remover do `NewsletterLancamentoForm.tsx` as constantes `TOKEN_RDSTATION`/`CONVERSION_URL` e o `fetch` para o RD.
- Manter a UI (input de email, validação, tela de sucesso) funcionando.
- O envio passa a só disparar um evento `dataLayer` (`newsletter_signup`) para o GTM, sem backend.
- **Importante:** os e-mails da newsletter deixam de ser capturados em qualquer lugar até você me enviar o form GHL de newsletter. Quando tiver, troco por um iframe igual aos outros.

### 3. Limpeza de CSS
- Remover o bloco `.rd-station-form-container ...` de `src/index.css`.

## Verificação
- Build sem referências a `rdstation`/`CONVERSION_URL`.
- `rg -i rdstation src` deve retornar vazio.
- Páginas Catálogo e Orçamento continuam exibindo os iframes GHL normalmente.
- Páginas "em breve" (`LinhaEmBreve`) continuam exibindo o campo de newsletter sem erro.

## Pendência para você
- Enviar o embed do form GHL de **newsletter de lançamento** quando existir, para eu plugar no lugar do atual.
