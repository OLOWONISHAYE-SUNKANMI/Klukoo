import React, { Suspense, useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PerformanceOptimizer } from '@/utils/PerformanceOptimizer';
import { BundlePreloader } from '@/utils/BundleOptimizer';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/layouts/Layout';
import { useTranslation } from 'react-i18next';

// Import critical screens
import HomeScreen from '@/components/screens/HomeScreen';
import DosesScreen from '@/components/screens/DosesScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import { RemindersScreen } from '@/components/screens/RemindersScreen';
import PaymentScreen from '@/components/screens/PaymentScreen';
import { ProfessionalDashboard } from '@/components/screens/ProfessionalDashboard';
import DoctorDashboard from '@/components/screens/DoctorDashboard';
import TeleconsultationBooking from '@/components/screens/TeleconsultationBooking';
import HealthProfessionalScreen from '@/components/screens/HealthProfessionalScreen';
import AdminDashboard from '@/components/screens/AdminDashboard';
import { AdminApplicationReview } from '@/components/screens/AdminApplicationReview';
import PatientAccessScreen from '@/components/screens/PatientAccessScreen';
import ProfessionalRequestDashboard from '@/components/screens/ProfessionalRequestDashboard';
import PatientAccessInterface from '@/components/ui/PatientAccessInterface';
import CalendarScheduler from '@/components/ui/CalendarScheduler';
import ProfessionalDashboardNew from '@/components/ui/ProfessionalDashboardNew';
import DiabetesMonitoringApp from '@/components/screens/DiabetesMonitoringApp';
import Biomarkers from '@/components/screens/Biomarkers ';
import PredictiveAlertScreen from '@/components/screens/PredictiveAlertScreen';

// Lazy load non-critical
const ChartsScreen = React.lazy(
  () => import('@/components/screens/ChartsScreen')
);
const BlogScreen = React.lazy(() => import('@/components/screens/BlogScreen'));
const JournalScreen = React.lazy(
  () => import('@/components/screens/JournalScreen')
);
const FamilyScreen = React.lazy(
  () => import('@/components/screens/FamilyScreen')
);
const ChatScreen = React.lazy(() => import('@/components/screens/ChatScreen'));
const ConsultationRequest = React.lazy(
  () => import('@/components/screens/ConsultationRequest')
);
const PredictiveAlertsScreen = React.lazy(
  () => import('@/components/screens/PredictiveAlertsScreen')
);

const Index = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [glucoseValue, setGlucoseValue] = useState(126);
  const [carbValue, setCarbValue] = useState(45);
  const [showAlert, setShowAlert] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [performanceOptimizer] = useState(() =>
    PerformanceOptimizer.getInstance()
  );
  const { user, professionalData } = useAuth();

  useEffect(() => {
    if (user?.user_metadata) {
      const userRole = user.user_metadata.role || 'patient';
      BundlePreloader.preloadByUserRole(userRole);
    }

    const networkCondition =
      performanceOptimizer.getPerformanceMetrics().networkCondition;
    BundlePreloader.preloadByNetworkCondition(networkCondition.effectiveType);

    const cleanupInterval = setInterval(() => {
      performanceOptimizer.clearExpiredCache();
    }, 5 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, [user, performanceOptimizer]);

  const handlePaymentSuccess = () => {
    setIsSubscribed(true);
    setActiveTab('home');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': {
        const familySession = JSON.parse(
          localStorage.getItem('family_session') || '{}'
        );
        console.log(familySession);
        const isFamilyMode = !!familySession.family_member_id;
        return (
          <HomeScreen
            onTabChange={setActiveTab}
            isReadOnly={isFamilyMode}
            familyMemberId={familySession.family_member_id}
            patientUserId={familySession.patient_user_id}
          />
        );
      }
      case 'doses':
        return (
          <DosesScreen
            glucoseValue={glucoseValue}
            setGlucoseValue={setGlucoseValue}
            carbValue={carbValue}
            setCarbValue={setCarbValue}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        );
      case 'profile':
        return <ProfileScreen />;
      case 'reminders':
        return <RemindersScreen />;
      case 'insulin':
        return <DiabetesMonitoringApp />;
      case 'biomarker':
        return <Biomarkers />;
      case 'predictive':
        return <PredictiveAlertScreen values={glucoseValue} />;
      case 'health-pro':
        return <HealthProfessionalScreen />;
      case 'admin':
        return <AdminDashboard />;
      case 'admin-review':
        return <AdminApplicationReview />;
      case 'teleconsultation':
        return <TeleconsultationBooking />;
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'professional-dashboard':
        return <ProfessionalDashboard />;
      case 'professional-dashboard-new':
        return <ProfessionalDashboardNew />;
      case 'professional-requests':
        return (
          <ProfessionalRequestDashboard professionalId={professionalData?.id} />
        );
      case 'patient-access':
        return <PatientAccessScreen />;
      case 'patient-access-interface':
        return <PatientAccessInterface />;
      case 'calendar':
        return <CalendarScheduler professionalId={professionalData?.id} />;
      case 'patient-calendar':
        return <CalendarScheduler patientView={true} />;
      case 'payment':
        return (
          <PaymentScreen
            onBack={() => setActiveTab('home')}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );

      // Lazy screens
      case 'charts': {
        const familySession = JSON.parse(
          localStorage.getItem('family_session') || '{}'
        );
        const isFamilyMode = !!familySession.family_member_id;
        
        return (
          <Suspense
            fallback={
              <LoadingSpinner fullScreen text={t('index.loading.charts')} />
            }
          >
            <ChartsScreen isReadOnly={isFamilyMode} />
          </Suspense>
        );
      }
      case 'blog':
        return (
          <Suspense
            fallback={
              <LoadingSpinner fullScreen text={t('index.loading.blog')} />
            }
          >
            <BlogScreen />
          </Suspense>
        );
      case 'journal':
        return (
          <Suspense
            fallback={
              <LoadingSpinner fullScreen text={t('index.loading.journal')} />
            }
          >
            <JournalScreen showAlert={showAlert} setShowAlert={setShowAlert} />
          </Suspense>
        );
      case 'family':
        return (
          <Suspense
            fallback={
              <LoadingSpinner fullScreen text={t('index.loading.family')} />
            }
          >
            <FamilyScreen />
          </Suspense>
        );
      case 'chat': {
        const familySession = JSON.parse(
          localStorage.getItem('family_session') || '{}'
        );
        const isFamilyMode = !!familySession.family_member_id;
        
        if (isFamilyMode) {
          return (
            <div className="flex-1 p-4 text-center">
              <h2 className="text-xl font-semibold mb-4">Access Restricted</h2>
              <p className="text-muted-foreground">Chat is not available in family access mode.</p>
            </div>
          );
        }
        
        return (
          <Suspense
            fallback={
              <LoadingSpinner fullScreen text={t('index.loading.chat')} />
            }
          >
            <ChatScreen />
          </Suspense>
        );
      }
      case 'consultation-request':
        return (
          <Suspense
            fallback={
              <LoadingSpinner
                fullScreen
                text={t('index.loading.consultation')}
              />
            }
          >
            <ConsultationRequest />
          </Suspense>
        );
      case 'predictions':
        return (
          <Suspense
            fallback={
              <LoadingSpinner fullScreen text={t('index.loading.alerts')} />
            }
          >
            <PredictiveAlertsScreen />
          </Suspense>
        );
      default:
        return <HomeScreen onTabChange={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderScreen()}
    </Layout>
  );
};

export default Index;
