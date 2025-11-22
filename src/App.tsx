import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Onboarding from "./components/Onboarding";
import Layout from "./components/Layout";
import Monitoring from "./pages/DashboardGestor/Monitoring";
import AnalyticsGestor from "./pages/DashboardGestor/Analytics";
import AnomaliesGestor from "./pages/DashboardGestor/Anomalies";
import VaqueiroGestor from "./pages/DashboardGestor/Vaqueiro";
import SettingsGestor from "./pages/DashboardGestor/Settings";
import GestorLayout from "@/components/dashboard/layouts/GestorLayout";
import ProdutorLayout from "@/components/dashboard/layouts/ProdutorLayout";
import FiscalLayout from "@/components/dashboard/layouts/FiscalLayout";
import { SettingsProdutor, GtasProdutor, RebanhoProdutor, CertificadosProdutor } from "@/pages/DashboardProdutor";
import VaqueiroFiscal from "./pages/DashboardFiscal/Vaqueiro";
import MonitoringFiscal from "./pages/DashboardFiscal/Monitoring";
import SettingsFiscal from "./pages/DashboardFiscal/Settings";
import Fiscalizacoes from "./pages/DashboardFiscal/Fiscalizacoes";
import FiscalizacaoDetalhes from "./pages/DashboardFiscal/FiscalizacaoDetalhes";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="sigama-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Onboarding />
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/landing" replace />} />
              {/* Landing page */}
              <Route path="/landing" element={<Index />} />
              <Route path="/monitoring" element={<Navigate to="/gestor/monitoring" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/form" element={<Register />} />

              {/* Namespaced dashboards */}
              <Route path="/gestor" element={<GestorLayout />}>
                <Route path="monitoring" element={<Monitoring />} />
                <Route index element={<Navigate to="analytics" replace />} />
                <Route path="analytics" element={<AnalyticsGestor />} />
                <Route path="anomalies" element={<AnomaliesGestor />} />
                <Route path="vaqueiro" element={<VaqueiroGestor />} />
                <Route path="settings" element={<SettingsGestor />} />
              </Route>

              <Route path="/produtor" element={<ProdutorLayout />}>
                <Route index element={<Navigate to="rebanho" replace />} />
                <Route path="rebanho" element={<RebanhoProdutor />} />
                <Route path="gtas" element={<GtasProdutor />} />
                <Route path="certificados" element={<CertificadosProdutor />} />
                <Route path="settings" element={<SettingsProdutor />} />
              </Route>

              <Route path="/fiscal" element={<FiscalLayout />}>
                <Route index element={<Navigate to="monitoring" replace />} />
                <Route path="monitoring" element={<MonitoringFiscal />} />
                <Route path="vaqueiro" element={<VaqueiroFiscal />} />
                <Route path="fiscalizacoes" element={<Fiscalizacoes />} />
                <Route path="fiscalizacoes/:id" element={<FiscalizacaoDetalhes />} />
                <Route path="settings" element={<SettingsFiscal />} />
              </Route>

              {/* Backwards-compatible redirects from old flat routes to gestor namespace */}
              <Route path="/analytics" element={<Navigate to="/gestor/analytics" replace />} />
              <Route path="/anomalies" element={<Navigate to="/gestor/anomalies" replace />} />
              <Route path="/vaqueiro" element={<Navigate to="/gestor/vaqueiro" replace />} />
              <Route path="/settings" element={<Navigate to="/gestor/settings" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
