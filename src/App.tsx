
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "@/components/layout/dashboard-layout";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import Subscriptions from "@/pages/Subscriptions";
import Clients from "@/pages/Clients";
import PaymentLogs from "@/pages/PaymentLogs";
import ApiWebhooks from "@/pages/ApiWebhooks";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <DashboardLayout>
                <Projects />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/subscriptions" 
            element={
              <DashboardLayout>
                <Subscriptions />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/clients" 
            element={
              <DashboardLayout>
                <Clients />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/payment-logs" 
            element={
              <DashboardLayout>
                <PaymentLogs />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/api-webhooks" 
            element={
              <DashboardLayout>
                <ApiWebhooks />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
