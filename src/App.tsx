
import { ThemeProvider } from '@/context/ThemeContext';
import { AdminProvider } from '@/context/AdminContext';
import { CartProvider } from '@/context/CartContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from '@/components/layout/MainLayout';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Services Pages
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetailPage from "./pages/services/ServiceDetailPage";

// About Pages
import AboutPage from "./pages/about/AboutPage";
import TeamPage from "./pages/about/TeamPage";
import HistoryPage from "./pages/about/HistoryPage";

// Blog Pages
import BlogPage from "./pages/blog/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";

// Contact Pages
import ContactPage from "./pages/contact/ContactPage";

// Work Pages
import WorkPage from "./pages/work/WorkPage";

// Careers Pages
import CareersPage from "./pages/careers/CareersPage";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import BlogAdmin from "./pages/admin/BlogAdmin";
import WorkAdmin from "./pages/admin/WorkAdmin";
import CareersAdmin from "./pages/admin/CareersAdmin";

// Policy Pages
import PrivacyPolicyPage from "./pages/policies/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/policies/TermsOfServicePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AdminProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                
                {/* Services Routes */}
                <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
                <Route path="/services/:serviceId" element={<MainLayout><ServiceDetailPage /></MainLayout>} />
                
                {/* About Routes */}
                <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
                <Route path="/about/team" element={<MainLayout><TeamPage /></MainLayout>} />
                <Route path="/about/history" element={<MainLayout><HistoryPage /></MainLayout>} />
                
                {/* Blog Routes */}
                <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
                <Route path="/blog/:postId" element={<MainLayout><BlogPostPage /></MainLayout>} />
                
                {/* Work Routes */}
                <Route path="/work" element={<MainLayout><WorkPage /></MainLayout>} />
                
                {/* Career Routes */}
                <Route path="/careers" element={<MainLayout><CareersPage /></MainLayout>} />
                
                {/* Contact Routes */}
                <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
                
                {/* Terms & Privacy */}
                <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
                <Route path="/terms-of-service" element={<MainLayout><TermsOfServicePage /></MainLayout>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/work" element={<WorkAdmin />} />
                <Route path="/admin/careers" element={<CareersAdmin />} />
                
                {/* Catch-all Route - 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AdminProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
