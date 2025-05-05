
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/Dashboard";
import StudentAppointments from "./pages/student/Appointments";
import NewAppointment from "./pages/student/NewAppointment";
import ResourcesPage from "./pages/student/Resources";
import ChatPage from "./pages/student/Chat";
import CounselorDashboard from "./pages/counselor/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simple auth guard component
const ProtectedRoute = ({ children, role = "student" }: { children: React.ReactNode, role?: string }) => {
  // In a real app, this would check your auth context
  const userData = localStorage.getItem("thriveUser");
  const isAuthenticated = !!userData;
  
  // Check if user has the required role
  let hasRole = true;
  if (userData && role) {
    const user = JSON.parse(userData);
    hasRole = user.role === role || role === "any";
  }
  
  if (!isAuthenticated || !hasRole) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<ResourcesPage />} />
          
          {/* Student Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<StudentDashboard />} />
          </Route>
          
          <Route path="/appointments" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<StudentAppointments />} />
            <Route path="new" element={<NewAppointment />} />
          </Route>
          
          <Route path="/chat" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ChatPage />} />
          </Route>
          
          <Route path="/progress" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<div>Progress Tracking (Coming Soon)</div>} />
          </Route>
          
          {/* Counselor Protected Routes */}
          <Route path="/counselor" element={
            <ProtectedRoute role="counselor">
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<CounselorDashboard />} />
            <Route path="appointments" element={<div>Counselor Appointments (Coming Soon)</div>} />
            <Route path="students" element={<div>Student Management (Coming Soon)</div>} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="resources" element={<div>Resource Management (Coming Soon)</div>} />
          </Route>
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<div>User Management (Coming Soon)</div>} />
            <Route path="analytics" element={<div>Analytics Dashboard (Coming Soon)</div>} />
            <Route path="resources" element={<div>Resource Management (Coming Soon)</div>} />
          </Route>
          
          {/* Settings Route (available to all authenticated users) */}
          <Route path="/settings" element={
            <ProtectedRoute role="any">
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<div>User Settings (Coming Soon)</div>} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
