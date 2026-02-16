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
import UsersPage from "./pages/dashboard/UsersPage";
import RolesPage from "./pages/dashboard/RolesPage";
import UserStatusPage from "./pages/dashboard/UserStatusPage";
import CategoriesPage from "./pages/dashboard/CategoriesPage";
import StatusesPage from "./pages/dashboard/StatusesPage";
import AssignComplaintsPage from "./pages/dashboard/AssignComplaintsPage";
import UnassignedComplaintsPage from "./pages/dashboard/UnassignedComplaintsPage";
import ClosedComplaintsPage from "./pages/dashboard/ClosedComplaintsPage";
import ReopenedComplaintsPage from "./pages/dashboard/ReopenedComplaintsPage";
import ApprovalsPage from "./pages/dashboard/ApprovalsPage";
import ApprovedResponsesPage from "./pages/dashboard/ApprovedResponsesPage";
import ComplaintsReportPage from "./pages/dashboard/reports/ComplaintsReportPage";
import AssessmentReportPage from "./pages/dashboard/reports/AssessmentReportPage";
import ResponseReportPage from "./pages/dashboard/reports/ResponseReportPage";
import FeedbackReportPage from "./pages/dashboard/reports/FeedbackReportPage";
import PerformanceReportPage from "./pages/dashboard/reports/PerformanceReportPage";
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
              <Route path="reports/complaints" element={<ComplaintsReportPage />} />
              <Route path="reports/assessments" element={<AssessmentReportPage />} />
              <Route path="reports/responses" element={<ResponseReportPage />} />
              <Route path="reports/feedback" element={<FeedbackReportPage />} />
              <Route path="reports/performance" element={<PerformanceReportPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="user-status" element={<UserStatusPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="statuses" element={<StatusesPage />} />
              <Route path="assign" element={<AssignComplaintsPage />} />
              <Route path="unassigned" element={<UnassignedComplaintsPage />} />
              <Route path="closed" element={<ClosedComplaintsPage />} />
              <Route path="reopened" element={<ReopenedComplaintsPage />} />
              <Route path="approvals" element={<ApprovalsPage />} />
              <Route path="approved" element={<ApprovedResponsesPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
