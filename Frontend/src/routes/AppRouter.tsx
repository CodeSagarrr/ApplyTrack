import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ProfileCreatePage } from "../features/profile/pages/ProfileCreatePage";

const LandingPage = lazy(() => import("../features/landing/pages/LandingPage"));
const DashboardPage = lazy(() => import("../features/dashboard/pages/DashboardPage"));;
const ApplicationsPage = lazy(() => import("../features/applications/pages/ApplicationsPage"));
const ApplicationDetailPage = lazy(() => import("../features/applications/pages/ApplicationDetailPage"));
const ApplicationFormPage = lazy(() => import("../features/applications/pages/ApplicationFormPage"));
const ApplicationEditPage = lazy(() => import("../features/applications/pages/ApplicationEditPage"));
const ApplicationAtsServicePage = lazy(() => import("../features/applications/pages/ApplicationAtsServicePage"));
const MatchToolPage = lazy(() => import("../features/match/pages/MatchToolPage"));
const ResumeListPage = lazy(() => import("../features/resume/pages/ResumeListPage"));
const ResumeEditPage = lazy(() => import("../features/resume/pages/ResumeEditPage"));
const ResumeDetailPage = lazy(() => import("../features/resume/pages/ResumeDetailPage"));
const PlaceholderPage = lazy(() => import("../features/misc/pages/PlaceholderPage"));

function LandingFallback() {
  return (
    <main className="grid min-h-svh place-items-center bg-applytrack-surface" aria-label="Loading ApplyTrack">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-applytrack-primary" />
    </main>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LandingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/new" element={<ApplicationFormPage />} />
            <Route path="/applications/:id" element={<ApplicationDetailPage />} />
            <Route path="/applications/:id/edit" element={<ApplicationEditPage />} />
            <Route path="/applications/:id/ats-service" element={<ApplicationAtsServicePage />} />
            <Route path="/resumes" element={<ResumeListPage />} />
            <Route path="/resumes/:id/edit" element={<ResumeEditPage />} />
            <Route path="/resumes/:id" element={<ResumeDetailPage />} />
            <Route path="/resume" element={<Navigate to="/resumes" replace />} />
            <Route path="/match-tool" element={<MatchToolPage />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/profile/create" element={<ProfileCreatePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
