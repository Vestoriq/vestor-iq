
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import TradingBots from "./pages/Forklifts";
import ReportsPage from "./pages/Reports";
import TradersPage from "./pages/Operators";
import PositionsPage from "./pages/Operations";
import MaintenancePage from "./pages/Maintenance";
import MarketDataPage from "./pages/GasSupply";
import MainLayout from "./components/layout/MainLayout";
import Settings from "./pages/Configuracao";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Loading component optimized
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-600 dark:text-slate-400">Loading Hedron AI...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="trading-bots" element={<TradingBots />} />
              <Route path="traders" element={<TradersPage />} />
              <Route path="positions" element={<PositionsPage />} />
              <Route path="system-health" element={<MaintenancePage />} />
              <Route path="market-data" element={<MarketDataPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
