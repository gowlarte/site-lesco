import { useState, useCallback, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
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
import LinhaEmBreve from "./pages/LinhaEmBreve";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePageAssets(contentRef);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <PageTransitionLoader isLoading={isLoading} />
      <ScrollToTop />
      {!isHome && <Header />}
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 300ms ease" }}>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Sobre */}
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/madeira-wpc" element={<MadeiraWPC />} />
          <Route path="/revestimento-sustentavel" element={<Sustentabilidade />} />

          {/* Madeira Ecológica — hub e produtos (na raiz) */}
          <Route path="/madeira-ecologica-lesco" element={<Manto />} />
          <Route path="/brise-madeira-ecologica" element={<MantoBrise />} />
          <Route path="/madeira-ecologica-para-fachada" element={<MantoShield />} />
          <Route path="/madeira-ecologica-para-deck" element={<MantoDeck />} />
          <Route path="/forro-wpc" element={<MantoLine />} />
          <Route path="/placa-wpc-interior" element={<MantoPanel />} />

          {/* Outros */}
          <Route path="/catalogo-lesco" element={<Catalogo />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/projetos/:slug" element={<PortfolioProjeto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArtigo />} />
          <Route path="/linhas" element={<Linhas />} />

          {/* Linhas em breve */}
          <Route path="/zhu" element={<LinhaEmBreve />} />
          <Route path="/echo" element={<LinhaEmBreve />} />
          <Route path="/geo" element={<LinhaEmBreve />} />
          <Route path="/em-breve/:linha" element={<LinhaEmBreve />} />

          {/* Redirects (SPA equivalente de 301) — slugs antigos */}
          <Route path="/manto" element={<Navigate to="/madeira-ecologica-lesco" replace />} />
          <Route path="/manto-brise" element={<Navigate to="/brise-madeira-ecologica" replace />} />
          <Route path="/manto-shield" element={<Navigate to="/madeira-ecologica-para-fachada" replace />} />
          <Route path="/manto-deck" element={<Navigate to="/madeira-ecologica-para-deck" replace />} />
          <Route path="/manto-line" element={<Navigate to="/forro-wpc" replace />} />
          <Route path="/manto-panel" element={<Navigate to="/placa-wpc-interior" replace />} />
          <Route path="/sobre" element={<Navigate to="/quem-somos" replace />} />
          <Route path="/catalogo" element={<Navigate to="/catalogo-lesco" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const handleFadeStart = useCallback(() => {
    document.body.style.backgroundColor = '';
    setContentVisible(true);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!splashDone && <SplashScreen onFadeStart={handleFadeStart} onComplete={handleSplashComplete} />}
        <BrowserRouter>
          <div
            className="transition-opacity duration-500"
            style={{
              opacity: contentVisible ? 1 : 0,
              visibility: contentVisible ? 'visible' : 'hidden',
            }}
          >
            <AppContent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
