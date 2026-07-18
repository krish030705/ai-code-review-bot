import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./context/Pages/Login";
import Register from "./context/Pages/Register";
import Dashboard from "./context/Pages/Dashboard";
import Projects from "./context/Pages/Projects";
import ReviewPage from "./context/Pages/Reviewpage";
import History from "./context/Pages/History";
import Settings from "./context/Pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes — no login required */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes — ProtectedRoute checks auth first,
              then MainLayout wraps them all with the shared navbar */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId/review" element={<ReviewPage />} />
              <Route path="/projects/:projectId/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Catch-all: any unmatched URL redirects to /dashboard
              (which itself redirects to /login if not authenticated) */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}