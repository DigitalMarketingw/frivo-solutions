
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";

// Service Pages
import StrategyConsulting from "./pages/services/StrategyConsulting";
import BusinessTransformation from "./pages/services/BusinessTransformation";
import FinanceTransformation from "./pages/services/FinanceTransformation";
import BusinessProcessManagement from "./pages/services/BusinessProcessManagement";
import DigitalAutomation from "./pages/services/DigitalAutomation";

// Know Us Pages
import OurPurpose from "./pages/know-us/OurPurpose";
import QualitySecurityTrust from "./pages/know-us/QualitySecurityTrust";
import WorkplaceThatInspires from "./pages/know-us/WorkplaceThatInspires";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/jobs" element={<Jobs />} />
            
            {/* Service Pages */}
            <Route path="/services/strategy-consulting" element={<StrategyConsulting />} />
            <Route path="/services/business-transformation" element={<BusinessTransformation />} />
            <Route path="/services/finance-transformation" element={<FinanceTransformation />} />
            <Route path="/services/business-process-management" element={<BusinessProcessManagement />} />
            <Route path="/services/digital-automation" element={<DigitalAutomation />} />
            
            {/* Know Us Pages */}
            <Route path="/know-us/our-purpose" element={<OurPurpose />} />
            <Route path="/know-us/quality-security-trust" element={<QualitySecurityTrust />} />
            <Route path="/know-us/workplace-that-inspires" element={<WorkplaceThatInspires />} />
            
            <Route path="/pricing" element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
