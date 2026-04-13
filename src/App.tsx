import { useState, useCallback, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { usePageAssets } from "@/hooks/usePageAssets";
import Index from "./pages/Index";
import About from "./pages/About";
import AltWood from "./pages/AltWood";
import AltWoodBrise from "./pages/AltWoodBrise";
import AltWoodShield from "./pages/AltWoodShield";
import AltWoodDeck from "./pages/AltWoodDeck";
import AltWoodLine from "./pages/AltWoodLine";
import AltWoodPanel from "./pages/AltWoodPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePageAssets(contentRef);

  return (
    <>
      <PageTransitionLoader isLoading={isLoading} />
      <ScrollToTop />
      <Header />
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 300ms ease" }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/altwood" element={<AltWood />} />
          <Route path="/altwood-brise" element={<AltWoodBrise />} />
          <Route path="/altwood-shield" element={<AltWoodShield />} />
          <Route path="/altwood-deck" element={<AltWoodDeck />} />
          <Route path="/altwood-line" element={<AltWoodLine />} />
          <Route path="/altwood-panel" element={<AltWoodPanel />} />
          <Route path="/sobre" element={<About />} />
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
