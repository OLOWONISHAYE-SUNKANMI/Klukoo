import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useOfflineDetection } from '@/hooks/useOfflineDetection';
import Index from './pages/Index';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import PaymentSuccess from './components/screens/PaymentSuccess';
import PaymentScreen from './components/screens/PaymentScreen';
import { ProfessionalDashboard } from './components/screens/ProfessionalDashboard';
import FamilyDashboard from './components/screens/FamilyDashboard';
import { ProfessionalRegistrationScreen } from './components/screens/ProfessionalRegistrationScreen';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'sonner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import { getChakraTheme } from './lib/theme';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import ToastQueueIndicator from '@/components/ui/ToastQueueIndicator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000,
    },
  },
});

const AppContent = () => {
  const { t } = useTranslation();
  const { isOnline } = useOfflineDetection();

  return (
    <>
      {!isOnline && (
        <div className="offline-indicator show">{t('app.status.offline')}</div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <PaymentScreen
                onBack={() => window.history.back()}
                onPaymentSuccess={() =>
                  (window.location.href = '/payment-success')
                }
              />
            }
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/professional-registration"
            element={
              <ProtectedRoute>
                <ProfessionalRegistrationScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professional-dashboard"
            element={<ProfessionalDashboard />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/family-dashboard"
            element={
              <ProtectedRoute>
                <FamilyDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/professional" element={<ProfessionalDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const chakraTheme = getChakraTheme({ darkMode: isDark });

  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <AuthProvider>
            <TooltipProvider>
              <Toaster richColors position="top-right" />
              <ToastContainer />
              <ToastQueueIndicator />
              <AppContent />
            </TooltipProvider>
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
