import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "@/contexts/ProductContext";
import Index from "./pages/Index";
import ProductWorkspace from "./pages/ProductWorkspace";
import Overview from "./pages/Overview";
import DevPlan from "./pages/DevPlan";
import FinalPitch from "./pages/FinalPitch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/workspace" element={<ProductWorkspace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/dev-plan" element={<DevPlan />} />
            <Route path="/final-pitch" element={<FinalPitch />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProductProvider>
  </QueryClientProvider>
);

export default App;
