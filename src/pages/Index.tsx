import { SEO } from "@/components/SEO";
import { HeroSolucoes } from "@/components/home/HeroSolucoes";
import { SecoesDaHome } from "@/components/home/SecoesDaHome";

// Só para o og:image do compartilhamento — o hero agora vive em HeroSolucoes.
import ogHome from "@/assets/projetos/casa-mansa-4.webp";

import { slideAbertura } from "@/data/hero-solucoes";
import { SIZES_TELA_CHEIA } from "@/lib/imagem";
import { t } from "@/i18n/t";

/**
 * A home que está no ar.
 *
 * Só o hero mora aqui; da segunda seção em diante é SecoesDaHome, dividido com
 * a prova da marca 2.0 em src/pages/LescoNew.tsx. As duas homes são a mesma
 * página abaixo do hero, e essa igualdade é o ponto da prova — mantê-la por
 * cópia significaria perdê-la na primeira correção feita em uma só delas.
 */
const Index = () => {
  return (
    <main className="flex flex-col gap-[10px]">
      <SEO
        title={t("Revestimentos em Madeira Ecológica | Lesco")}
        description={t("Transforme cada ambiente em uma expressão de elegância natural com nossos revestimentos em madeira ecológica. Acabamentos únicos e personalizados.")}
        path="/"
        image={ogHome}
        preloadImage={slideAbertura.imagem}
        preloadSizes={SIZES_TELA_CHEIA}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Lesco",
          url: "https://lesco.com.br",
        }}
      />
      {/* ========== HERO DE SOLUÇÕES — 9 telas ancoradas, sem autoplay ========== */}
      <HeroSolucoes />

      <SecoesDaHome />
    </main>
  );
};

export default Index;
