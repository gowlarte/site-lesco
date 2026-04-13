import { useState, useCallback, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SplashScreen } from "@/components/SplashScreen";
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

/**
 * Wait for all fonts and visible images to finish loading.
 * Returns a promise that resolves when ready.
 */
const waitForAssets = (): Promise<void> => {
  return new Promise((resolve) => {
    const checkImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      const pending = images.filter((img) => !img.complete && img.src);
      if (pending.length === 0) {
        resolve();
        return;
      }
      let remaining = pending.length;
      const onDone = () => {
        remaining--;
        if (remaining <= 0) resolve();
      };
      pending.forEach((img) => {
        img.addEventListener("load", onDone, { once: true });
        img.addEventListener("error", onDone, { once: true });
      });
    };

    // Wait for fonts first, then check images
    document.fonts.ready.then(() => {
      // Give React a frame to render images into the DOM
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          checkImages();
        });
      });
    });
  });
};

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Render content immediately (hidden) and wait for assets
  useEffect(() => {
    waitForAssets().then(() => {
      setAssetsReady(true);
    });
  }, []);

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
        {!splashDone && (
          <SplashScreen
            assetsReady={assetsReady}
            onFadeStart={handleFadeStart}
            onComplete={handleSplashComplete}
          />
        )}
        <BrowserRouter>
          <div
            ref={contentRef}
            className="transition-opacity duration-500"
            style={{
              opacity: contentVisible ? 1 : 0,
              visibility: contentVisible ? 'visible' : 'hidden',
            }}
          >
            <ScrollToTop />
            <Header />
            <PageTransition>
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
            </PageTransition>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
