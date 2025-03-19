
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import DashboardLayout from "@/components/layout/dashboard-layout";
import Projects from "@/pages/Projects";
import ProjectDashboard from "@/pages/ProjectDashboard";
import ProjectSubscriptions from "@/pages/ProjectSubscriptions";
import ProjectClients from "@/pages/ProjectClients";
import PaymentLogs from "@/pages/PaymentLogs";
import ApiWebhooks from "@/pages/ApiWebhooks";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard Routes - Protected */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Projects />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects/:projectId" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProjectDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects/:projectId/subscriptions" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProjectSubscriptions />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects/:projectId/clients" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProjectClients />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment-logs" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PaymentLogs />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/api-webhooks" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ApiWebhooks />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
