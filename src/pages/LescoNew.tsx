import { SEO } from "@/components/SEO";
import { HeroNovo } from "@/components/hero-novo/HeroNovo";
import { LoaderMarca } from "@/components/hero-novo/LoaderMarca";
import { useFotosProntas } from "@/components/hero-novo/useFotosProntas";
import { TODAS_AS_FOTOS, telaCapa } from "@/data/hero-novo";
import { SIZES_TELA_CHEIA } from "@/lib/imagem";

/**
 * /lesco-new — a prova da marca 2.0, fora do ar público.
 *
 * NÃO está validada e não deve ser divulgada. O que a mantém fora do Google:
 * `noindex` aqui e a marca `semIndice` em ssg-routes.json, que tira a rota do
 * sitemap. Ela continua sendo PRÉ-RENDERIZADA de propósito — sem um arquivo
 * estático, abrir o endereço direto na barra do navegador dependeria do
 * catch-all da Vercel, que neste projeto já falhou em /projetos/:slug.
 *
 * A página é só o hero. Nada de seções abaixo: o que está em prova é a
 * sequência de telas, e qualquer coisa embaixo mudaria o que se vê ao chegar
 * no fim dela.
 *
 * O loader cobre tudo até as dez fotos estarem na memória — ver
 * ../components/hero-novo/useFotosProntas.ts, inclusive o teto de paciência.
 * Como ele também está no HTML pré-renderizado, esta rota exige JavaScript:
 * sem ele o símbolo fica parado para sempre. É aceitável numa prova interna,
 * e deixa de ser no dia em que isto virar a home.
 */
const LescoNew = () => {
  const pronto = useFotosProntas(TODAS_AS_FOTOS, SIZES_TELA_CHEIA);

  return (
    <main>
      <SEO
        title="Hero 2.0 — prova interna | Lesco"
        description="Versão de prova do hero com a marca Lesco 2.0. Não divulgar."
        path="/lesco-new"
        noindex
        preloadImage={telaCapa.imagem}
        preloadSizes={SIZES_TELA_CHEIA}
      />
      <LoaderMarca pronto={pronto} />
      <HeroNovo />
    </main>
  );
};

export default LescoNew;
