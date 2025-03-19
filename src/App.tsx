import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./context/LanguageContext";
import { ProjectDataProvider } from "./context/ProjectDataContext";
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
import ServerError from "./pages/ServerError";

function App() {
  return (
    <LanguageProvider>
      <ProjectDataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/" element={<DashboardLayout />}>
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
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </ProjectDataProvider>
    </LanguageProvider>
  );
}

export default App;
