import { useState, useCallback, useRef, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { localizePath, ROUTE_KEYS } from "@/i18n/routes";
import { isEN } from "@/i18n/locale";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { deveMostrarSplash, marcarSplashVisto } from "@/lib/splash";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { usePageAssets } from "@/hooks/usePageAssets";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useUtmForwarder } from "@/hooks/useUtmForwarder";
import { iniciarScrollSuave } from "@/lib/scroll-suave";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import Sustentabilidade from "./pages/Sustentabilidade";
import Biblioteca from "./pages/Biblioteca";
import Portfolio from "./pages/Portfolio";
import PortfolioProjeto from "./pages/PortfolioProjeto";
import Manto from "./pages/Manto";
import MantoBrise from "./pages/MantoBrise";
import MantoShield from "./pages/MantoShield";
import MantoDeck from "./pages/MantoDeck";
import MantoLine from "./pages/MantoLine";
import MantoPanel from "./pages/MantoPanel";
import Muxarabi from "./pages/Muxarabi";
import Zhu from "./pages/Zhu";
import ZhuPaineis from "./pages/ZhuPaineis";
import ZhuAcusticos from "./pages/ZhuAcusticos";
import ZhuBrises from "./pages/ZhuBrises";
import ZhuDecks from "./pages/ZhuDecks";
import Linhas from "./pages/Linhas";
import Blog from "./pages/Blog";
import BlogArtigo from "./pages/BlogArtigo";
import Orcamento from "./pages/Orcamento";
import Catalogo from "./pages/Catalogo";
import ObrigadoOrcamento from "./pages/ObrigadoOrcamento";
import LinhaEmBreve from "./pages/LinhaEmBreve";
import Geo from "./pages/Geo";
import LiveLesco from "./pages/LiveLesco";
import LiveLescoAmostra from "./pages/LiveLescoAmostra";
import NotFound from "./pages/NotFound";
import ObrigadoCatalogo from "./pages/ObrigadoCatalogo";
import ObrigadoWhats from "./pages/ObrigadoWhats";
import Obrigado from "./pages/Obrigado";
import ObrigadoCatalogoGeo from "./pages/ObrigadoCatalogoGeo";
import ObrigadoCatalogoZhu from "./pages/ObrigadoCatalogoZhu";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosServico from "./pages/TermosServico";
import FormularioTeste from "./pages/FormularioTeste";
import LescoNew from "./pages/LescoNew";
import { PREFIXO_PROVA } from "@/lib/marca";

const queryClient = new QueryClient();

/** `/quem-somos` -> `quem-somos`, já no slug do locale ativo. */
const rel = (pt: string) => localizePath(pt).replace(/^\//, "");

/**
 * As páginas do site, com caminho RELATIVO.
 *
 * Existem duas árvores que as servem: a da raiz, que é o site no ar, e a de
 * /lesco-new, que é o MESMO site com a marca 2.0 no cabeçalho. Por isso os
 * caminhos não começam com barra — assim o mesmo <Route> casa em
 * `/quem-somos` e em `/lesco-new/quem-somos`, sem uma segunda lista para
 * manter em dia.
 *
 * Ficam de fora os redirecionamentos de slug antigo e os de locale: aqueles
 * são rede de proteção para links que existem no mundo, e link do mundo não
 * aponta para dentro de uma prova.
 */
function paginasDoSite() {
  return (
    <>
      {/* Sobre */}
      <Route path={rel("/quem-somos")} element={<QuemSomos />} />
      <Route path={rel("/revestimento-sustentavel")} element={<Sustentabilidade />} />

      {/* Madeira Ecológica — hub e produtos (na raiz) */}
      <Route path={rel("/madeira-ecologica-lesco")} element={<Manto />} />
      <Route path={rel("/brise-madeira-ecologica")} element={<MantoBrise />} />
      <Route path={rel("/madeira-ecologica-para-fachada")} element={<MantoShield />} />
      <Route path={rel("/madeira-ecologica-para-deck")} element={<MantoDeck />} />
      <Route path={rel("/forro-line")} element={<MantoLine />} />
      <Route path={rel("/lesco-panel")} element={<MantoPanel />} />
      <Route path={rel("/muxarabi-madeira-ecologica")} element={<Muxarabi />} />

      {/* Zhú (bambu) — hub e produtos por família */}
      <Route path={rel("/painel-bambu")} element={<ZhuPaineis />} />
      <Route path={rel("/painel-acustico-bambu")} element={<ZhuAcusticos />} />
      <Route path={rel("/brise-bambu")} element={<ZhuBrises />} />
      <Route path={rel("/deck-bambu")} element={<ZhuDecks />} />

      {/* Outros */}
      <Route path={rel("/catalogo-lesco")} element={<Catalogo />} />
      <Route path={rel("/biblioteca")} element={<Biblioteca />} />
      <Route path={rel("/orcamento")} element={<Orcamento />} />
      <Route path={rel("/obrigado")} element={<Obrigado />} />
      <Route path={rel("/obrigado-orcamento")} element={<ObrigadoOrcamento />} />
      <Route path={rel("/obrigado-catalogo")} element={<ObrigadoCatalogo />} />
      <Route path={rel("/obrigado-whats")} element={<ObrigadoWhats />} />
      <Route path={rel("/obrigado-catalogo-geo")} element={<ObrigadoCatalogoGeo />} />
      <Route path={rel("/obrigado-catalogo-zhu")} element={<ObrigadoCatalogoZhu />} />
      <Route path={rel("/portfolio")} element={<Portfolio />} />
      <Route path={rel("/projetos/:slug")} element={<PortfolioProjeto />} />
      <Route path={rel("/blog")} element={<Blog />} />
      <Route path={rel("/blog/:slug")} element={<BlogArtigo />} />
      <Route path={rel("/linhas")} element={<Linhas />} />

      {/* Linhas */}
      <Route path={rel("/zhu")} element={<Zhu />} />
      <Route path={rel("/echo")} element={<LinhaEmBreve />} />
      <Route path={rel("/geo")} element={<Geo />} />
      <Route path={rel("/live-lesco")} element={<LiveLesco />} />
      <Route path={rel("/live-lesco-amostra")} element={<LiveLescoAmostra />} />
      <Route path={rel("/em-breve/:linha")} element={<LinhaEmBreve />} />
      <Route path={rel("/politica-de-privacidade")} element={<PoliticaPrivacidade />} />
      <Route path={rel("/termos-de-servico")} element={<TermosServico />} />
      <Route path="formulario-teste" element={<FormularioTeste />} />
    </>
  );
}

/**
 * O site de prova: as mesmas páginas, servidas sob /lesco-new.
 *
 * O <Routes> aninhado casa contra o que sobra do caminho depois do prefixo,
 * e é só isso que faz a prova existir — nenhuma página foi copiada. Quem
 * troca o logotipo é o cabeçalho, que pergunta pelo caminho (ver
 * src/lib/marca.ts); quem mantém a navegação dentro da prova é o
 * <Link> do site (ver src/components/AppLink.tsx).
 *
 * O `noindex` vale para a subárvore inteira: as páginas de dentro não são
 * pré-renderizadas e não emitem robots próprio, então sem isto elas sairiam
 * com a mesma dica do index.html.
 */
function SiteDeProva() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Routes>
        <Route index element={<LescoNew />} />
        {paginasDoSite()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const AppContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePageAssets(contentRef);
  const location = useLocation();
  /* Páginas cujo hero ocupa a tela inteira e pede cabeçalho transparente
     por cima. /lesco-new é a prova da marca 2.0 — ver src/pages/LescoNew. */
  /* Cabeçalho transparente sobre o hero: nas DUAS homes, a de produção e a
     da prova. Dentro da prova, as outras páginas se comportam como as de
     produção — o que muda ali é só o logotipo. */
  const isHome = location.pathname === "/" || location.pathname === PREFIXO_PROVA;

  usePageTracking();
  useUtmForwarder();

  // Scroll interpolado do site inteiro — ver src/lib/scroll-suave.ts.
  useEffect(() => iniciarScrollSuave(), []);


  return (
    <>
      <PageTransitionLoader isLoading={isLoading} />
      <ScrollToTop />
      {/* Um cabeçalho só, sempre na raiz da árvore. Na home ele é transparente
          sobre a foto do hero, mas NÃO mora dentro dele: o palco do hero é
          `sticky`, e `sticky` abre um contexto de empilhamento — lá dentro o
          z-50 do menu só valeria contra os irmãos do palco, e cada seção
          posicionada seguinte (projetos, showroom) passaria por cima dele. */}
      <Header variant={isHome ? "overlay" : "default"} />
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 300ms ease" }}>
        <Routes>
          {/* Os paths são escritos em PT; localizePath() devolve o slug do
              locale ativo (no build EN vira o slug em inglês). */}
          <Route path={localizePath("/")} element={<Index />} />

          {paginasDoSite()}

          {/* O site de prova da marca 2.0: as MESMAS páginas sob /lesco-new,
              com o logotipo novo. Fora do menu, fora do sitemap e com noindex
              — ver src/pages/LescoNew.tsx e src/lib/marca.ts. */}
          <Route path={PREFIXO_PROVA + "/*"} element={<SiteDeProva />} />

          {/* No build EN, os slugs PT redirecionam para o slug EN canônico
              (rede de proteção para links/URLs antigos com slug em português). */}
          {isEN &&
            ROUTE_KEYS.filter((pt) => localizePath(pt) !== pt).map((pt) => (
              <Route key={`en-redir-${pt}`} path={pt} element={<Navigate to={localizePath(pt)} replace />} />
            ))}

          {/* Redirects (SPA equivalente de 301) — slugs antigos */}
          <Route path="/manto" element={<Navigate to={localizePath("/madeira-ecologica-lesco")} replace />} />
          <Route path="/manto-brise" element={<Navigate to={localizePath("/brise-madeira-ecologica")} replace />} />
          <Route path="/manto-shield" element={<Navigate to={localizePath("/madeira-ecologica-para-fachada")} replace />} />
          <Route path="/manto-deck" element={<Navigate to={localizePath("/madeira-ecologica-para-deck")} replace />} />
          <Route path="/manto-line" element={<Navigate to={localizePath("/forro-line")} replace />} />
          <Route path="/manto-panel" element={<Navigate to={localizePath("/lesco-panel")} replace />} />
          <Route path="/sobre" element={<Navigate to={localizePath("/quem-somos")} replace />} />
          <Route path="/catalogo" element={<Navigate to={localizePath("/catalogo-lesco")} replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </>

  );
};

const App = () => {
  // The splash is a client-only overlay. On the server (SSG) and during the
  // first hydration render `mostrarSplash` is false, so the server HTML ===
  // the first client render (real content, no splash) — no hydration mismatch
  // and the static content is visible immediately, even before/without JS.
  //
  // Quem decide se ela aparece é `deveMostrarSplash()`: uma vez por sessão de
  // navegação, e nunca para quem pediu menos movimento. Ver o comentário na
  // fonte dela.
  const [mostrarSplash, setMostrarSplash] = useState(false);

  useEffect(() => {
    if (!deveMostrarSplash()) return;
    marcarSplashVisto();
    setMostrarSplash(true);
  }, []);

  const handleFadeStart = useCallback(() => {
    document.body.style.backgroundColor = '';
  }, []);

  const handleSplashComplete = useCallback(() => {
    setMostrarSplash(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Content always renders (visible without JS) */}
        <AppContent />
        {/* Splash sits on top as a pure overlay, only after client mount */}
        {mostrarSplash && (
          <SplashScreen onFadeStart={handleFadeStart} onComplete={handleSplashComplete} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
