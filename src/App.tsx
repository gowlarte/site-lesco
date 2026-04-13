import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import AltWood from "./pages/AltWood";
import AltWoodBrise from "./pages/AltWoodBrise";
import AltWoodShield from "./pages/AltWoodShield";
import AltWoodDeck from "./pages/AltWoodDeck";
import AltWoodLine from "./pages/AltWoodLine";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/altwood" element={<AltWood />} />
          <Route path="/altwood-brise" element={<AltWoodBrise />} />
          <Route path="/altwood-shield" element={<AltWoodShield />} />
          <Route path="/altwood-deck" element={<AltWoodDeck />} />
          <Route path="/altwood-line" element={<AltWoodLine />} />
          <Route path="/sobre" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
