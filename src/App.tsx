import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ReelPlayerPage from "@/pages/ReelPlayerPage";
import SearchPage from "@/pages/SearchPage";
import CourseBuilderPage from "@/pages/CourseBuilderPage";
import QuizPage from "@/pages/QuizPage";
import CertificatesPage from "@/pages/CertificatesPage";
import UploadPage from "@/pages/UploadPage";
import ManageContentPage from "@/pages/ManageContentPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import HelpPage from "@/pages/HelpPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderHistoryPage from "@/pages/OrderHistoryPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ServerErrorPage from "@/pages/ServerErrorPage";

// React Query client with optimal defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="winbro-theme">
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reel/:id" element={<ReelPlayerPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/course-builder" element={<CourseBuilderPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/manage-content" element={<ManageContentPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              
              {/* Error pages */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/500" element={<ServerErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
