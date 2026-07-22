import { useState, useCallback, useRef, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { localizePath, ROUTE_KEYS } from "@/i18n/routes";
import { isEN } from "@/i18n/locale";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { usePageAssets } from "@/hooks/usePageAssets";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useUtmForwarder } from "@/hooks/useUtmForwarder";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import MadeiraWPC from "./pages/MadeiraWPC";
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
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosServico from "./pages/TermosServico";
import FormularioTeste from "./pages/FormularioTeste";

const queryClient = new QueryClient();

const AppContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePageAssets(contentRef);
  const location = useLocation();
  const isHome = location.pathname === "/";

  usePageTracking();
  useUtmForwarder();


  return (
    <>
      <PageTransitionLoader isLoading={isLoading} />
      <ScrollToTop />
      {!isHome && <Header />}
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 300ms ease" }}>
        <Routes>
          {/* Os paths são escritos em PT; localizePath() devolve o slug do
              locale ativo (no build EN vira o slug em inglês). */}
          <Route path={localizePath("/")} element={<Index />} />

          {/* Sobre */}
          <Route path={localizePath("/quem-somos")} element={<QuemSomos />} />
          <Route path={localizePath("/madeira-wpc")} element={<MadeiraWPC />} />
          <Route path={localizePath("/revestimento-sustentavel")} element={<Sustentabilidade />} />

          {/* Madeira Ecológica — hub e produtos (na raiz) */}
          <Route path={localizePath("/madeira-ecologica-lesco")} element={<Manto />} />
          <Route path={localizePath("/brise-madeira-ecologica")} element={<MantoBrise />} />
          <Route path={localizePath("/madeira-ecologica-para-fachada")} element={<MantoShield />} />
          <Route path={localizePath("/madeira-ecologica-para-deck")} element={<MantoDeck />} />
          <Route path={localizePath("/forro-wpc")} element={<MantoLine />} />
          <Route path={localizePath("/placa-wpc-interior")} element={<MantoPanel />} />

          {/* Outros */}
          <Route path={localizePath("/catalogo-lesco")} element={<Catalogo />} />
          <Route path={localizePath("/biblioteca")} element={<Biblioteca />} />
          <Route path={localizePath("/orcamento")} element={<Orcamento />} />
          <Route path={localizePath("/obrigado")} element={<Obrigado />} />
          <Route path={localizePath("/obrigado-orcamento")} element={<ObrigadoOrcamento />} />
          <Route path={localizePath("/obrigado-catalogo")} element={<ObrigadoCatalogo />} />
          <Route path={localizePath("/obrigado-whats")} element={<ObrigadoWhats />} />
          <Route path={localizePath("/obrigado-catalogo-geo")} element={<ObrigadoCatalogoGeo />} />
          <Route path={localizePath("/portfolio")} element={<Portfolio />} />
          <Route path={localizePath("/projetos/:slug")} element={<PortfolioProjeto />} />
          <Route path={localizePath("/blog")} element={<Blog />} />
          <Route path={localizePath("/blog/:slug")} element={<BlogArtigo />} />
          <Route path={localizePath("/linhas")} element={<Linhas />} />

          {/* Linhas em breve */}
          <Route path={localizePath("/zhu")} element={<LinhaEmBreve />} />
          <Route path={localizePath("/echo")} element={<LinhaEmBreve />} />
          <Route path={localizePath("/geo")} element={<Geo />} />
          <Route path={localizePath("/live-lesco")} element={<LiveLesco />} />
          <Route path={localizePath("/live-lesco-amostra")} element={<LiveLescoAmostra />} />
          <Route path={localizePath("/em-breve/:linha")} element={<LinhaEmBreve />} />
          <Route path={localizePath("/politica-de-privacidade")} element={<PoliticaPrivacidade />} />
          <Route path={localizePath("/termos-de-servico")} element={<TermosServico />} />
          <Route path="/formulario-teste" element={<FormularioTeste />} />

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
          <Route path="/manto-line" element={<Navigate to={localizePath("/forro-wpc")} replace />} />
          <Route path="/manto-panel" element={<Navigate to={localizePath("/placa-wpc-interior")} replace />} />
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
  // first hydration render `mounted` is false, so the server HTML === the
  // first client render (real content, no splash) — no hydration mismatch and
  // the static content is visible immediately, even before/without JS.
  const [mounted, setMounted] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFadeStart = useCallback(() => {
    document.body.style.backgroundColor = '';
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Content always renders (visible without JS) */}
        <AppContent />
        {/* Splash sits on top as a pure overlay, only after client mount */}
        {mounted && !splashDone && (
          <SplashScreen onFadeStart={handleFadeStart} onComplete={handleSplashComplete} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
