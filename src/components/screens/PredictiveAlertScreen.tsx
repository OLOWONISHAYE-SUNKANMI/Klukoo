import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';
import {
  AlertTriangle,
  Activity,
  Droplets,
  Utensils,
  Syringe,
  Settings,
  Database,
  Brain,
  Bell,
  FileText,
  Share2,
  CheckCircle,
  X,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PredictiveCard from '../ui/PredictiveCard';
import { useTranslation } from 'react-i18next';
import NativeHeader from '../ui/NativeHeader';
import GlucoseWidget from '../ui/GlucoseWidget';
import { useGlucose } from '@/contexts/GlucoseContext';
import { useMeals } from '@/contexts/MealContext';
import { useMedications } from '@/contexts/MedicationContext';
import { useActivities } from '@/contexts/ActivityContext';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

type Alert = {
  type: 'hypo' | 'hyper' | 'stable';
  message: string;
  time: string;
};

const alerts: Alert[] = [
  { type: 'hypo', message: 'Hypo risk in 15 min', time: '15 min' },
  { type: 'hyper', message: 'Hyper risk in 30 min', time: '30 min' },
  { type: 'hyper', message: 'Hyper risk in 45 min', time: '45 min' },
  { type: 'stable', message: 'Stable', time: '60 min' },
];

const getStyles = (type: Alert['type']) => {
  switch (type) {
    case 'hypo':
      return 'bg-red-100 text-red-800';
    case 'hyper':
      return 'bg-yellow-100 text-yellow-800';
    case 'stable':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PredictiveAlertScreen({ values }: any) {
  const { t } = useTranslation();
  const { getLatestReading, getTrend } = useGlucose();
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);
  const { meals } = useMeals();
  const { medications } = useMedications();
  const { activities } = useActivities();
  const disabled = false;
  const [alertSettings, setAlertSettings] = useState({
    lowThreshold: 70,
    highThreshold: 180,
  });
  const { readings: glucose } = useGlucose();
  // const { getLatestReading } = useGlucose();

  const [alerts, setAlerts] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState({
    generalNotes: '',
    observations: '',
    recommendations: '',
    specialInstructions: '',
    followUpDate: '',
    emergencyContact: '',
  });

  // Calculate values from contexts
  const duration_minutes =
    activities.length > 0 ? activities[0].duration_minutes : null;
  const dose_unit = medications.length > 0 ? medications[0].dose_unit : null;

  const totalCarbs = meals.reduce((sum, meal) => sum + meal.total_carbs, 0);
  const latestReading = getLatestReading();
  const [currentGlucose, setCurrentGlucose] = useState(
    latestReading?.value || 126
  );

  // State for manual inputs with context fallbacks
  const [insulin, setInsulin] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [activity, setActivity] = useState(0);

  // Update state when context values change
  useEffect(() => {
    if (dose_unit && insulin === 0) setInsulin(Number(dose_unit));
  }, [dose_unit]);

  useEffect(() => {
    if (totalCarbs && carbs === 0) setCarbs(totalCarbs);
  }, [totalCarbs]);

  useEffect(() => {
    if (duration_minutes && activity === 0) setActivity(duration_minutes);
  }, [duration_minutes]);

  // Add new glucose reading
  const addGlucoseReading = () => {
    const currentTime = new Date();
    const timeStr = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const predictedValue = generatePrediction(
      currentGlucose,
      insulin,
      carbs,
      activity
    );

    // console.log('Predicted Glucose Value:', predictedValue);

    setPrediction(predictedValue);
    checkAlerts(predictedValue);

    const newReading = {
      time: timeStr,
      glucose: currentGlucose,
      predicted: false,
    };

    const predictionReading = {
      time: new Date(currentTime.getTime() + 30 * 60000).toLocaleTimeString(
        'en-US',
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      ),
      glucose: predictedValue,
      predicted: true,
    };

    // Reset inputs
    setInsulin(0);
    setCarbs(0);
    setActivity(0);
  };
  const latestCarb = meals?.[0]?.total_carbs || 0;

  const checkAlerts = predictedValue => {
    const newAlerts = [];

    if (predictedValue < alertSettings.lowThreshold) {
      newAlerts.push({
        id: Date.now(),
        type: 'hypo',
        message: `Hypoglycemia predicted! Expected glucose: ${predictedValue} mg/dL`,
        severity: 'high',
      });
    } else if (predictedValue > alertSettings.highThreshold) {
      newAlerts.push({
        id: Date.now() + 1,
        type: 'hyper',
        message: `Hyperglycemia predicted! Expected glucose: ${predictedValue} mg/dL`,
        severity: 'medium',
      });
    }

    setAlerts(prev => [...newAlerts, ...prev.slice(0, 4)]);
  };
  // Simulate AI prediction engine
  const generatePrediction = (glucose, insulin, carbs, activity) => {
    let predictedGlucose = glucose;

    // Simple prediction logic (in reality, this would be a complex ML model)
    if (carbs > 30) predictedGlucose += carbs * 1.5;
    if (insulin > 0) predictedGlucose -= insulin * 8;
    if (activity > 0) predictedGlucose -= activity * 2;

    // Add some realistic variation
    predictedGlucose += (Math.random() - 0.5) * 20;

    return Math.max(50, Math.min(300, Math.round(predictedGlucose)));
  };

  // Show dynamic alert function - only for this screen
  function showDynamicAlert(alert: Alert) {
    const toastId = toast.custom(t => <PredictiveAlerts toastId={t} />, {
      duration: Infinity, // keep open until explicitly dismissed
    });
    return toastId;
  }

  useEffect(() => {
    fetchForecast();
  }, []);

  useEffect(() => {
    const toastId = showDynamicAlert({
      type: 'stable',
      time: '5m',
      message: 'Your session will expire soon!',
    });

    // Cleanup: dismiss toast when component unmounts
    return () => {
      toast.dismiss(toastId);
    };
  }, []);

  // console.log(forecast);

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://klukoo-ai.onrender.com/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentGlucose: currentGlucose,
        }),
      });

      const data = await res.json();
      // console.log(data);
      setForecast(data.forecast);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Glucose data sorted by timestamp and limited to latest 15 readings
  const glucoseData = [...glucose]
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .slice(-15)
    .map(r => ({
      ...r,
      time: new Date(r.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }), // format for X-axis
    }));

  const glucoseValues = glucose.map(d => d.value);
  const avgGlucose =
    glucoseValues.reduce((a, b) => a + b, 0) / (glucoseValues.length || 1);
  const maxGlucose = Math.max(...glucoseValues, 0);
  const latestGlucose = glucoseData.length
    ? glucoseData[glucoseData.length - 1].value
    : 0;

  return (
    <div className="min-h-screen bg-muted text-foreground p-4 space-y-4">
      {/* Header */}
      <h1 className="text-lg font-semibold text-center">
        {' '}
        {t('predictiveAlertHeader.title')}
      </h1>

      {/* Predictive Alert Card */}
      <PredictiveCard
        values={values}
        cancelable={false}
        visible={true}
        setVisible={null}
      />

      {/* <PredictiveAlerts /> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Manual Input */}
          <div className="bg-background rounded-xl shadow-lg p-6">
            <div className="flex  items-center mb-4">
              <Droplets className="text-blue-500 mr-2" size={24} />
              <h2 className="text-xl text-foreground font-semibold">
                {t('insulinDosage.patient.manualInput')}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t('insulinDosage.patient.currentGlucose')}
                </label>
                <input
                  type="number"
                  value={currentGlucose}
                  onChange={e => setCurrentGlucose(Number(e.target.value))}
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <Syringe className="inline mr-1" size={16} />
                  Medication
                </label>
                <input
                  type="text"
                  value={medications?.[0]?.medication_name || ''}
                  readOnly
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Last Dosage Taken
                </label>
                <input
                  type="text"
                  value={
                    medications?.[0]?.dose
                      ? `${medications[0].dose} ${medications[0].dose_unit}`
                      : ''
                  }
                  readOnly
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <Utensils className="inline mr-1" size={16} />
                  {t('insulinDosage.patient.carbsGrams')}
                </label>
                <input
                  type="number"
                  value={latestCarb || totalCarbs || 0}
                  onChange={e => setCarbs(Number(e.target.value))}
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <Activity className="inline mr-1" size={16} />
                  {t('insulinDosage.patient.activityMinutes')}
                </label>
                <input
                  type="number"
                  value={activity || duration_minutes || 0}
                  onChange={e => setActivity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <button
                onClick={addGlucoseReading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {t('insulinDosage.patient.addReadingGeneratePrediction')}
              </button>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-background rounded-xl shadow-lg p-6">
            <div className="flex text-foreground items-center mb-4">
              <Settings className="text-orange-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold">
                {t('insulinDosage.alerts.title')}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t('insulinDosage.alerts.lowThreshold')}
                </label>
                <input
                  disabled={disabled}
                  type="number"
                  value={alertSettings.lowThreshold}
                  onChange={e =>
                    setAlertSettings(prev => ({
                      ...prev,
                      lowThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t('insulinDosage.alerts.highThreshold')}
                </label>
                <input
                  disabled={disabled}
                  type="number"
                  value={alertSettings.highThreshold}
                  onChange={e =>
                    setAlertSettings(prev => ({
                      ...prev,
                      highThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 text-foreground bg-background border border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* AI Prediction */}
          <div className="bg-background rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="text-purple-500 mr-2" size={24} />
              <h2 className="text-xl text-foreground font-semibold">
                {t('insulinDosage.aiPrediction.title')}
              </h2>
            </div>

            {prediction && (
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">
                  {t('insulinDosage.aiPrediction.nextPrediction')}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {prediction} mg/dL
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('insulinDosage.aiPrediction.basedOn')}
                </p>
              </div>
            )}
          </div>

          {/* Doctor's Recommendations Display */}
          {(doctorNotes.recommendations || doctorNotes.specialInstructions) && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <FileText className="text-blue-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">
                  Doctor's Recommendations
                </h2>
              </div>

              <div className="space-y-4">
                {doctorNotes.recommendations && (
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-medium text-blue-800 mb-2">
                      {t('insulinDosage.doctorNotes.recommendations')}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {doctorNotes.recommendations}
                    </p>
                  </div>
                )}

                {doctorNotes.specialInstructions && (
                  <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                    <h3 className="font-medium text-amber-800 mb-2">
                      {t('insulinDosage.doctorNotes.specialInstructions')}
                    </h3>
                    <p className="text-sm text-amber-700">
                      {doctorNotes.specialInstructions}
                    </p>
                  </div>
                )}

                {doctorNotes.followUpDate && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-800">
                      <span className="font-medium text-sm">
                        {t('insulinDosage.doctorNotes.nextAppointment')}
                      </span>
                      <span className="ml-2 text-sm">
                        {new Date(doctorNotes.followUpDate).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-Time Graph */}
          <Card>
            <CardHeader>
              <CardTitle>{t('charts.glucose')}</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={glucoseData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="time"
                    type="category"
                    interval="preserveStartEnd"
                    label={{
                      position: 'insideBottom',
                      offset: -5,
                    }}
                  />

                  <YAxis
                    label={{
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />

                  <Tooltip
                    formatter={(value: any) => [
                      `${value} mg/dL`,
                      'Blood Glucose',
                    ]}
                    labelFormatter={(label, payload) => {
                      const item = payload?.[0]?.payload;
                      const date = new Date(item?.timestamp);
                      return date.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                    }}
                  />

                  <Legend verticalAlign="top" height={36} />

                  <ReferenceArea
                    y1={80}
                    y2={180}
                    fill="green"
                    fillOpacity={0.1}
                  />
                  <ReferenceLine y={70} stroke="blue" strokeDasharray="5 5" />
                  <ReferenceLine y={250} stroke="red" strokeDasharray="5 5" />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0d9488"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Blood Glucose"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alerts System */}
          <div className="bg-background rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Bell className="text-red-500 mr-2" size={24} />
              <h2 className="text-xl text-foreground font-semibold">
                {t('insulinDosage.alertsSystem.title')}
              </h2>
            </div>

            {alerts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                {t('insulinDosage.alertsSystem.noActiveAlerts')}
              </p>
            ) : (
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'hypo'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-orange-50 border-orange-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertTriangle
                        className={
                          alert.type === 'hypo'
                            ? 'text-red-500'
                            : 'text-orange-500'
                        }
                        size={20}
                      />
                      <span className="ml-2 font-medium text-gray-800">
                        {alert.type === 'hypo'
                          ? 'Hypoglycemia Alert'
                          : 'Hyperglycemia Alert'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Database Status */}
          <div className="bg-background rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Database className="text-gray-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold text-foreground">
                {t('insulinDosage.historicalDatabase.title')}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-foreground">
                  {t('insulinDosage.historicalDatabase.totalReadings')}
                </p>
                <p className="text-xl font-bold text-muted-foreground">
                  {glucoseData.length}
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-foreground">
                  {t('insulinDosage.historicalDatabase.dataPointsToday')}
                </p>
                <p className="text-xl font-bold text-muted-foreground">
                  {
                    glucoseData.filter(d => !('predicted' in d) || !d.predicted)
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PredictiveAlerts: React.FC<{ toastId: string | number }> = ({
  toastId,
}) => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleAlertDismiss = () => {
    if (currentAlertIndex < alerts.length - 1) {
      setCurrentAlertIndex(prev => prev + 1);
    } else {
      setVisible(false);
      toast.dismiss(toastId); // dismiss the toast only here
    }
  };

  if (!visible || alerts.length === 0) return null;

  const currentAlert = alerts[currentAlertIndex];

  return (
    <div className="w-96">
      <DynamicAlert
        alert={currentAlert}
        onExpire={handleAlertDismiss}
        onDismiss={handleAlertDismiss}
      />
    </div>
  );
};

const DynamicAlert: React.FC<{
  alert: Alert;
  onExpire?: () => void;
  onDismiss?: () => void;
}> = ({ alert, onExpire, onDismiss }) => {
  const totalSeconds = parseTotalMinutes(alert.time) * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  // reset timer when alert.time changes
  useEffect(() => {
    setRemainingSeconds(totalSeconds);
  }, [alert.time, totalSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // fire expire callback once
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, onExpire]);

  const elapsedSeconds = totalSeconds - remainingSeconds;
  const progress = (elapsedSeconds / Math.max(totalSeconds, 1)) * 100; // 0..100

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const fillColor = getStyles(alert.type);

  return (
    <div className="flex justify-between items-center rounded-lg overflow-hidden shadow-lg bg-muted relative animate-in slide-in-from-right-full duration-300">
      {/* Inline CSS block for the stripe animation */}
      <style>{`
        @keyframes stripe-move {
          to { background-position: 40px 0; }
        }
        .stripe-overlay {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.12) 0 10px,
            transparent 10px 20px
          );
          background-size: 40px 40px;
          animation: stripe-move 1.2s linear infinite;
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* Left area (progress fill) */}
      <div className="flex-1 relative overflow-hidden">
        {/* Colored filling bar. We set it absolutely to fill parent's height */}
        <div
          className={`absolute top-0 left-0 bottom-0 transition-all duration-1000 ease-linear ${getStyles(
            alert.type
          )}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress}%`,
            transition: 'width 1s linear, background-color 1s linear',
            background: fillColor,
            zIndex: 0,
          }}
        />

        {/* Stripe overlay (animated) inside the filling area */}
        <div
          aria-hidden
          className="stripe-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress}%`,
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        />

        {/* Foreground content (text + icon) */}
        <div className="flex items-center gap-2 px-4 py-3 font-medium relative z-10 bg-transparent">
          {/* You can replace these with your icons */}
          {alert.type === 'stable' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span className="text-sm">{alert.message}</span>
        </div>
      </div>

      {/* Right box with countdown and dismiss button */}
      <div className="bg-white px-2 py-4 text-black font-semibold text-sm w-24 text-center z-10 flex flex-col items-center gap-1">
        <div>
          {minutes}:{String(seconds).padStart(2, '0')}
        </div>
        <button
          onClick={onDismiss}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Parse time from string format
function parseTotalMinutes(time: string): number {
  return Math.max(1, parseInt(time.split(' ')[0], 10) || 1);
}
