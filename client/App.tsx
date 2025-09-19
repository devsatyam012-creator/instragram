import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "@/components/instagram/Header";
import BottomNav from "@/components/instagram/BottomNav";
import PlaceholderPage from "@/components/instagram/PlaceholderPage";
import Create from "./pages/Create";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<PlaceholderPage title="Explore" />} />
            <Route path="/reels" element={<PlaceholderPage title="Reels" />} />
            <Route path="/messages" element={<PlaceholderPage title="Messages" />} />
            <Route path="/activity" element={<PlaceholderPage title="Activity" />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
