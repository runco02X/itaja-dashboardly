
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "./context/LanguageContext";
import { ProjectDataProvider } from "./context/ProjectDataContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/layout/dashboard-layout";
import Projects from "./pages/Projects";
import ProjectDashboard from "./pages/ProjectDashboard";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import PaymentLogs from "./pages/PaymentLogs";
import ApiWebhooks from "./pages/ApiWebhooks";
import ProjectClients from "./pages/ProjectClients";
import ProjectSubscriptions from "./pages/ProjectSubscriptions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
// ServerError page is commented out as it's referenced but doesn't exist yet

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="itaja-ui-theme">
      <LanguageProvider>
        <AuthProvider>
          <ProjectDataProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  </ProtectedRoute>
                }>
                  <Route index element={<Projects />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:projectId" element={<ProjectDashboard />} />
                  <Route path="projects/:projectId/clients" element={<ProjectClients />} />
                  <Route path="projects/:projectId/subscriptions" element={<ProjectSubscriptions />} />
                  <Route path="payment-logs" element={<PaymentLogs />} />
                  <Route path="api-webhooks" element={<ApiWebhooks />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>

                <Route path="/404" element={<NotFound />} />
                {/* Temporary using NotFound for 500 errors since ServerError isn't implemented */}
                <Route path="/500" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </ProjectDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
