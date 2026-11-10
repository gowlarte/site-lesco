import { SEO } from "@/components/SEO";
import { SecoesDaHome } from "@/components/home/SecoesDaHome";
import { HeroNovo } from "@/components/hero-novo/HeroNovo";
import { LoaderMarca } from "@/components/hero-novo/LoaderMarca";
import { useFotosProntas } from "@/components/hero-novo/useFotosProntas";
import { TODAS_AS_FOTOS, telaCapa } from "@/data/hero-novo";
import { SIZES_TELA_CHEIA } from "@/lib/imagem";

/**
 * /lesco-new — a home da marca 2.0, fora do ar público.
 *
 * NÃO está validada e não deve ser divulgada. O que a mantém fora do Google:
 * `noindex` aqui e a marca `semIndice` em ssg-routes.json, que tira a rota do
 * sitemap. Ela continua sendo PRÉ-RENDERIZADA de propósito — sem um arquivo
 * estático, abrir o endereço direto na barra do navegador dependeria do
 * catch-all da Vercel, que neste projeto já falhou em /projetos/:slug.
 *
 * É a home inteira, e não só o hero: o que muda em relação à de produção é a
 * primeira seção (HeroNovo no lugar de HeroSolucoes) e o logotipo do
 * cabeçalho, que nesta rota é o 2.0 — ver src/lib/marca.ts. Da segunda seção
 * em diante as duas páginas são literalmente o mesmo componente, então a
 * comparação é honesta: o que diferir ali é o hero, não uma cópia que ficou
 * para trás.
 *
 * O loader cobre tudo até as dez fotos do hero estarem na memória — ver
 * ../components/hero-novo/useFotosProntas.ts, inclusive o teto de paciência.
 * As seções de baixo não entram nessa conta: elas carregam rolando, como na
 * home de produção. Como o loader também está no HTML pré-renderizado, esta
 * rota exige JavaScript: sem ele o símbolo fica parado para sempre. É
 * aceitável numa prova interna, e deixa de ser no dia em que isto virar a
 * home.
 */
const LescoNew = () => {
  const pronto = useFotosProntas(TODAS_AS_FOTOS, SIZES_TELA_CHEIA);

  return (
    <main className="flex flex-col gap-[10px]">
      <SEO
        title="Home 2.0 — prova interna | Lesco"
        description="Versão de prova da home com a marca Lesco 2.0. Não divulgar."
        path="/lesco-new"
        noindex
        preloadImage={telaCapa.imagem}
        preloadSizes={SIZES_TELA_CHEIA}
      />
      <LoaderMarca pronto={pronto} />

      {/* ========== HERO 2.0 — 10 telas, capa mais uma por produto ========== */}
      <HeroNovo />

      <SecoesDaHome />
    </main>
  );
};

export default LescoNew;
