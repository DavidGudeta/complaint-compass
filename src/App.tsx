import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import StaffLogin from "./pages/StaffLogin";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ComplaintsList from "./pages/dashboard/ComplaintsList";
import AssessmentsList from "./pages/dashboard/AssessmentsList";
import ResponsesList from "./pages/dashboard/ResponsesList";
import ReportsPage from "./pages/dashboard/ReportsPage";
import PlaceholderPage from "./pages/dashboard/PlaceholderPage";
import NotFound from "./pages/NotFound";

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
            <Route path="/login" element={<StaffLogin />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="complaints" element={<ComplaintsList />} />
              <Route path="assessments" element={<AssessmentsList />} />
              <Route path="responses" element={<ResponsesList />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="reports/:type" element={<PlaceholderPage />} />
              <Route path="users" element={<PlaceholderPage />} />
              <Route path="roles" element={<PlaceholderPage />} />
              <Route path="user-status" element={<PlaceholderPage />} />
              <Route path="categories" element={<PlaceholderPage />} />
              <Route path="statuses" element={<PlaceholderPage />} />
              <Route path="assign" element={<PlaceholderPage />} />
              <Route path="unassigned" element={<PlaceholderPage />} />
              <Route path="closed" element={<PlaceholderPage />} />
              <Route path="reopened" element={<PlaceholderPage />} />
              <Route path="approvals" element={<PlaceholderPage />} />
              <Route path="approved" element={<PlaceholderPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
