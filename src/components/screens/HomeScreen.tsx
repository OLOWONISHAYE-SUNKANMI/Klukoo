import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NativeHeader from '@/components/ui/NativeHeader';
import GlucoseWidget from '@/components/ui/GlucoseWidget';
import ActionsRapides from '@/components/ui/ActionsRapides';
import PredictiveAlerts from '@/components/ui/PredictiveAlerts';
import { useGlucose } from '@/contexts/GlucoseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeStore } from '@/store/useThemeStore'; // ✅ Zustand theme store
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface HomeScreenProps {
  onTabChange?: (tab: string) => void;
  isReadOnly?: boolean;
  familyMemberId?: string;
  patientUserId?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onTabChange,
  isReadOnly = false,
  familyMemberId,
  patientUserId,
}) => {
  const { t } = useTranslation();
  const [glucoseValue, setGlucoseValue] = useState<string>('');
  const [showAddMeasure, setShowAddMeasure] = useState(false);
  const [showAddDose, setShowAddDose] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const { getLatestReading, getTrend } = useGlucose();
  const { user, profile } = useAuth();
  const [predictiveVisible, setPredictiveVisible] = useState<boolean>(true);

  const { theme } = useThemeStore(); // ✅ zustand theme
  const isDark = theme === 'dark';

  // console.log('HomeScreen Rendered', familyMemberId, patientUserId);
  // Get display name for family members or regular users
  const familySession = JSON.parse(localStorage.getItem('family_session') || '{}');
  const isFamilyMode = !!familySession.family_member_id;
  
  const userName = isFamilyMode 
    ? familySession.patient_name || 'Patient'
    : profile?.first_name ||
      user?.user_metadata?.first_name ||
      user?.email ||
      'Invité';

  const handleAddMeasure = () => {
    if (isReadOnly) {
      toast.error('You can only view data in read-only mode');
      return;
    }
    setShowAddMeasure(true);
  };

  const latestReading = getLatestReading();
  const currentGlucose = latestReading?.value || 126;

  useEffect(() => {
    // Sync <html> class with Zustand theme
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div
      className={`flex-1 min-h-screen pb-20 sm:pb-24 overflow-x-hidden transition-colors
      bg-muted text-foreground`}
    >
      {/* Native Header */}
      <NativeHeader
        userName={userName}
        glucoseValue={glucoseValue}
        visible={predictiveVisible}
        setVisible={setPredictiveVisible}
      />

      {/* Main Content */}
      <div className="space-y-4 sm:space-y-6 pb-5">
        {/* Glucose Widget */}
        <GlucoseWidget
          currentGlucose={currentGlucose}
          lastReading={
            latestReading
              ? new Date(latestReading.timestamp).toLocaleString('fr-FR')
              : t('homeScreen.lastReading')
          }
          trend={getTrend()}
        />

        {/* Actions Rapides */}
        <ActionsRapides
          onTabChange={onTabChange}
          onGlucoseSubmit={
            isReadOnly ? () => {} : value => setGlucoseValue(value)
          }
          onGlycemieClick={
            isReadOnly
              ? () => toast.error('Read-only access')
              : () => setShowAddMeasure(true)
          }
          onMedicamentClick={
            isReadOnly
              ? () => toast.error('Read-only access')
              : () => setShowAddDose(true)
          }
          onMealClick={
            isReadOnly
              ? () => toast.error('Read-only access')
              : () => setShowAddMeal(true)
          }
          onActivityClick={
            isReadOnly
              ? () => toast.error('Read-only access')
              : () => setShowAddActivity(true)
          }
          isReadOnly={isReadOnly}
        />

        {/* Predictive Alerts */}
        <div className="px-3 sm:px-4">
          <PredictiveAlerts
            glucoseValue={currentGlucose.toString()}
            onTabChange={onTabChange}
          />
        </div>

        {/* Mission DiabCare */}
        <div className="px-3 sm:px-4">
          <Card className="shadow-lg border rounded-xl sm:rounded-2xl overflow-hidden transition-colors bg-card text-card-foreground border-border">
            <CardHeader className="p-4 sm:p-6 bg-primary text-primary-foreground">
              <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                </div>
                <span className="leading-tight">{t('mission.title')}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-6">
              <p className="text-sm sm:text-base leading-relaxed text-foreground">
                {t('mission.message')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
