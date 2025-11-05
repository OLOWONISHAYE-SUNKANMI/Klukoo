import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  TrendingUp,
  Shield,
  Pill,
  Target,
  Brain,
  X,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import { toast } from 'sonner';
import PredictiveCard from './PredictiveCard';
import { getPredictiveAlert, getAISummary } from '@/utils/AISummarize'; // ✅ Integrated AI utilities

interface PredictiveAlertsProps {
  onTabChange?: (tab: string) => void;
  className?: string;
  glucoseValue: string;
}

const PredictiveAlerts: React.FC<PredictiveAlertsProps> = ({
  className = '',
  glucoseValue,
  onTabChange,
}) => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeStore();

  const [alerts, setAlerts] = useState<any[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const urgentRef = useRef(0);
  const prevGlucose = useRef<string | null>(null);
  const [predictiveVisible, setPredictiveVisible] = useState<boolean>(true);

  // ===================== AI INTEGRATION =====================
  useEffect(() => {
    async function fetchAIInsights() {
      try {
        setLoading(true);

        const glucoseValueNum = parseFloat(glucoseValue);
        if (isNaN(glucoseValueNum)) return;

        // 🔹 Fetch predictive alert from backend AI
        const aiResponse = await getPredictiveAlert(
          [glucoseValueNum], // glucose history
          'fast-acting', // insulinType
          0, // insulinUnits
          0, // calories
          'none' // activity
        );

        // 🔹 Format AI alert response
        const formattedAlerts = (aiResponse.alerts || []).map((alert: any) => ({
          id: alert.id || Math.random().toString(36).substring(2, 9),
          type: alert.risk,
          message: alert.message || aiResponse.main_alert?.message || 'No message',
          severity:
            alert.risk === 'Hypo risk'
              ? 'critical'
              : alert.risk === 'Hyper risk'
              ? 'high'
              : 'medium',
          time: alert.time,
        }));

        setAlerts(formattedAlerts);

        // 🔹 Fetch AI-generated summary
        const summaryText = await getAISummary({
          glucoseValue: glucoseValueNum,
          insulinType: 'fast-acting',
          insulinUnits: 0,
          calories: 0,
          activity: 'none',
        });
        setSummary(summaryText);
      } catch (error) {
        console.error('Error fetching AI data:', error);
        toast.error('Failed to fetch AI predictions.');
      } finally {
        setLoading(false);
      }
    }

    fetchAIInsights();
  }, [glucoseValue]);
  // ==========================================================

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return isDarkMode
          ? 'bg-danger text-white'
          : 'bg-danger-light text-white';
      case 'high':
        return isDarkMode
          ? 'bg-warning text-white'
          : 'bg-warning-light text-white';
      case 'medium':
        return isDarkMode
          ? 'bg-accent text-accent-foreground'
          : 'bg-yellow-400 text-black';
      case 'low':
        return isDarkMode ? 'bg-info text-white' : 'bg-info-light text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Hypo risk':
        return <TrendingDown className="w-5 h-5" />;
      case 'Hyper risk':
        return <TrendingUp className="w-5 h-5" />;
      case 'trend_warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medication_reminder':
        return <Pill className="w-5 h-5" />;
      case 'pattern_anomaly':
        return <Target className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleDismissAll = () => {
    setAlerts([]);
  };

  const getGlucoseStatus = (value: number) => {
    if (value < 70)
      return {
        status: 'low',
        message: t('getGlucoseStatus.status_low', 'Low blood sugar detected!'),
      };
    if (value <= 180)
      return {
        status: 'normal',
        message: t('getGlucoseStatus.status_normal', 'Blood sugar normal.'),
      };
    return {
      status: 'high',
      message: t('getGlucoseStatus.status_high', 'High blood sugar detected!'),
    };
  };

  useEffect(() => {
    const value = parseFloat(glucoseValue);
    if (!isNaN(value) && glucoseValue !== prevGlucose.current) {
      const status = getGlucoseStatus(value);
      if (status.status === 'low') {
        urgentRef.current += 1;
        toast.error(status.message + ` (Urgent count: ${urgentRef.current})`, {
          description: t(
            'predictiveAlerts.lowGlucoseToast',
            'If thresholds exceeded → Predictive Alert triggered'
          ),
        });
      } else if (status.status === 'high') {
        urgentRef.current += 1;
        toast.error(status.message + ` (Urgent count: ${urgentRef.current})`, {
          description: t(
            'predictiveAlerts.highGlucoseToast',
            'If thresholds exceeded → Predictive Alert triggered'
          ),
        });
      } else if (status.status === 'normal') {
        urgentRef.current = 0;
        toast.success(
          status.message + ` (Urgent count: ${urgentRef.current})`,
          {
            description: t(
              'predictiveAlerts.normalGlucoseToast',
              'If thresholds exceeded → Predictive Alert triggered'
            ),
          }
        );
      }
      prevGlucose.current = glucoseValue;
    }
  }, [glucoseValue, t]);

  // Cleanup toasts on component unmount (logout)
  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  // --- Glucose statistics logic ---
  const [glucoseStats, setGlucoseStats] = useState({
    total: 0,
    urgent: 0,
    monitor: 0,
  });

  const lastStatsValue = useRef<string | null>(null);
  useEffect(() => {
    const value = parseFloat(glucoseValue);
    if (!isNaN(value) && glucoseValue !== lastStatsValue.current) {
      setGlucoseStats(prev => {
        const newStats = { ...prev };
        newStats.total += 1;
        if (value > 180) newStats.urgent += 1;
        else if (value < 70) newStats.monitor += 1;
        return newStats;
      });
      lastStatsValue.current = glucoseValue;
    }
  }, [glucoseValue]);
  // --- End stats ---

  const handleViewMore = () => {
    onTabChange?.('predictive');
  };

  // --- UI ---
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <Card className={`bg-card text-foreground ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6" />
              <span className="font-semibold">{t('Alerts.title')}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-extrabold">
                {glucoseStats.total}
              </div>
              <div className="text-sm opacity-90">{t('Alerts.total')}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-danger">
                {glucoseStats.urgent}
              </div>
              <div className="text-sm opacity-90">{t('Alerts.urgent')}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-warning">
                {glucoseStats.monitor}
              </div>
              <div className="text-sm opacity-90">{t('Alerts.monitor')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Card */}
      <PredictiveCard
        cancelable={true}
        values={glucoseValue}
        visible={predictiveVisible}
        setVisible={setPredictiveVisible}
        onTabChange={onTabChange}
      />

      {/* AI Alerts */}
      {loading ? (
        <p className="text-center text-muted">Analyzing with AI...</p>
      ) : alerts.length > 0 ? (
        alerts.map(alert => (
          <Alert
            key={alert.id}
            className={`${getSeverityColor(
              alert.severity
            )} flex items-center justify-between`}
          >
            <div className="flex items-center space-x-2">
              {getAlertIcon(alert.type)}
              <AlertDescription>{alert.message}</AlertDescription>
            </div>
            <Button
              onClick={() => handleMarkAsRead(alert.id)}
              size="sm"
              variant="ghost"
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </Alert>
        ))
      ) : (
        <p className="text-center text-muted">No AI alerts detected.</p>
      )}

      {/* AI Summary Section */}
      <Card className="bg-[#dffffb] text-foreground">
        <CardContent className="p-4 flex justify-between items-center ">
          <div className="flex flex-col md:flex-row sm:items-center justify-between gap-3 sm:gap-6 w-full ">
            <div className="flex items-start sm:items-center space-x-3">
              <Brain className="w-6 h-6 text-accent-foreground flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground">
                  {t('analyze.title')}
                </h4>
                <p className="text-sm text-foreground/80">
                  {summary ||
                    t(
                      'analyze.message',
                      'AI summary not available yet. Please wait...'
                    )}
                </p>
              </div>
            </div>

            <Button
              onClick={handleViewMore}
              variant="default"
              className="bg-[#ff7223] hover:bg-[#c74700] w-full sm:w-auto"
            >
              {t('analyze.buttons.enter')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAlerts;
