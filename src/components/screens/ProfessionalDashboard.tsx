import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Stethoscope,
  Clock,
  TrendingUp,
  Sun,
  Moon,
  Menu,
  BarChart3,
  DollarSign,
} from 'lucide-react';
import { EarningsTable } from '@/components/ui/EarningsTable';
import { PatientManagement } from '@/components/ui/PatientManagement';
import { QuickActions } from '@/components/ui/QuickActions';
import { toast } from 'sonner';
import { useThemeStore } from '@/store/useThemeStore';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { supabase } from '@/integrations/supabase/client';
import { supabaseService } from '@/lib/supabase-service';
import { useAuth } from '@/contexts/AuthContext';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useIsMobile } from '@/hooks/use-mobile';

export const ProfessionalDashboard = () => {
  const [activePatients, setActivePatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllPatients, setShowAllPatients] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { user, professionalCode, professionalData } = useAuth();
  const { professionalRequests, loadProfessionalRequests } = useConsultation();

  const isDark = theme === 'dark';
  const { t } = useTranslation();

  const handleLogout = () => {
    toast.success('Logged out successfully', {
      description: 'You have been logged out of the dashboard.',
      duration: 4000,
    });
    navigate('/auth');
  };

  useEffect(() => {
    const storedCode = localStorage.getItem('professionalCode');
    if (!storedCode) {
      console.error('No professional code found, redirecting to login');
      navigate('/auth');
      return;
    }

    // Wait for user to be available (either real or mock)
    if (professionalCode || storedCode) {
      loadData();
    }
  }, [user, navigate]);

  const loadData = async () => {
    await getProfessionalInfo();
    await getUpcomingAppointments();
    await getCompletedReports();
  };

  // Load active patients after appointments are loaded
  useEffect(() => {
    if (appointments.length > 0) {
      getActivePatients();
    }
  }, [appointments]);
  // Get professional info
  // Trying to use the professional code to get the excat info for the excat professional in the dashboard.
  const getProfessionalInfo = async () => {
    try {
      const storedCode = localStorage.getItem('professionalCode');
      console.log(storedCode);
      if (!storedCode) {
        console.error('No professional code found');
        return;
      }
      // console.log('Stored Professional Code:', storedCode);

      const { data, error } = await supabase
        .from('professional_applications')
        .select('first_name, last_name, professional_type')
        .eq('professional_code', storedCode);

      // console.log(data);
      if (error) throw error;
      setProfessionalInfo(data[0]);
    } catch (error) {
      console.error('Error fetching professional info:', error);
    }
  };

  // Fetch patients who created consultation requests for this professional
  const getActivePatients = async () => {
    try {
      // Get unique patient IDs from appointments
      const patientIds = [...new Set(appointments.map(apt => apt.patient_id))];

      if (patientIds.length === 0) {
        setActivePatients([]);
        return;
      }
      console.log('pateintIds', patientIds);

      // Fetch patient profiles using user_id instead of id
      const { data: patients, error } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name, phone')
        .in('user_id', patientIds);

      if (error) throw error;
      console.log('patients:', patients);

      // Combine patient data with their latest consultation info and notes
      const activePatients = await Promise.all(
        patients.map(async patient => {
          const latestRequest = appointments
            .filter(apt => apt.patient_id === patient.user_id)
            .sort(
              (a, b) => new Date(b.requested_at) - new Date(a.requested_at)
            )[0];

          // Fetch recent consultation notes for this patient
          const { data: notes } = await supabase
            .from('consultation_notes')
            .select('notes')
            .eq('patient_id', patient.user_id)
            .eq('professional_id', user?.id)
            .order('created_at', { ascending: false })
            .limit(10);

          return {
            id: patient.user_id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            phone: patient.phone || '',
            last_visit: latestRequest?.requested_at,
            status: latestRequest?.status || 'unknown',
            notes: notes?.[0]?.notes || 'No consultation notes available',
          };
        })
      );

      console.log('Active Patients:', activePatients);
      setActivePatients(activePatients);
    } catch (error) {
      console.error('Error fetching active patients:', error);
    }
  };

  // Fetch upcoming consultations (appointments)
  const getUpcomingAppointments = async () => {
    try {
      const storedCode = localStorage.getItem('professionalCode');
      if (!storedCode) {
        console.error('No professional code found');
        return;
      }

      // Use professional_code for filtering since that's how requests are stored
      const { data, error } = await supabase
        .from('consultation_requests')
        .select(
          'id, consultation_reason, status, requested_at, consultation_fee, patient_id'
        )
        .eq('professional_code', storedCode)
        .in('status', ['pending', 'scheduled'])
        .order('requested_at', { ascending: true });

      if (error) throw error;

      console.log('Upcoming Appointments:', data);
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching upcoming appointments:', error);
    }
  };

  const getCompletedReports = async () => {
    try {
      const storedCode = localStorage.getItem('professionalCode');
      if (!storedCode) {
        console.error('No professional code found');
        return;
      }

      // For now, just set empty reports since we don't have proper RLS setup
      // TODO: Set up proper RLS policies for consultation_summaries
      console.log('Skipping reports due to RLS restrictions');
      setReports([]);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Update stats with real data
  const stats = [
    {
      title: t('professionalDashboard.stats.title1'),
      value: activePatients.length.toString(),
      icon: Users,
      trend: '+0%',
    },
    {
      title: t('professionalDashboard.stats.title2'),
      value: appointments.length.toString(),
      icon: Calendar,
      trend: '+0%',
    },
    {
      title: t('professionalDashboard.stats.title3'),
      value: reports.length.toString(),
      icon: FileText,
      trend: '+0%',
    },
    {
      title: t('professionalDashboard.stats.title4'),
      value: '0min',
      icon: Clock,
      trend: '0%',
    },
  ];

  // Map active patients to recent patients format
  const recentPatients = activePatients.map(patient => ({
    name: `${patient.first_name} ${patient.last_name}`,
    lastVisit: new Date(patient.last_visit || '').toLocaleDateString(),
    glucose: patient.last_glucose_reading || 'N/A',
    status: patient.status || 'stable',
  }));
  const isMobile = useIsMobile();
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      lastConsultation: '2024-01-15',
      nextAppointment: '2024-01-22',
      notes: t('professionalDashboard.patients.recentNotes.people.first'),
      status: t('professionalDashboard.patients.lastBloodGlucose.first'),
      diabetesType: 'Type 2',
      lastGlucose: '7.2 mmol/L',
    },
    {
      id: '2',
      name: 'Pierre Martin',
      lastConsultation: '2024-01-14',
      notes: t('professionalDashboard.patients.recentNotes.people.second'),
      status: t('professionalDashboard.patients.lastBloodGlucose.second'),
      diabetesType: 'Type 1',
      lastGlucose: '6.8 mmol/L',
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      lastConsultation: '2024-01-12',
      nextAppointment: '2024-01-19',
      notes: t('professionalDashboard.patients.recentNotes.people.third'),
      status: t('professionalDashboard.patients.lastBloodGlucose.third'),
      diabetesType: 'Type 2',
      lastGlucose: '8.1 mmol/L',
    },
    {
      id: '4',
      name: 'Jean Bernard',
      lastConsultation: '2024-01-10',
      notes: t('professionalDashboard.patients.recentNotes.people.fourth'),
      status: t('professionalDashboard.patients.lastBloodGlucose.fourth'),
      diabetesType: 'Type 2',
      lastGlucose: '7.5 mmol/L',
    },
  ];
  const darkMode = theme === 'dark';
  const [status, setStatus] = useState('');
  const [notification, setNotification] = useState('');
  const [fee, setFee] = useState('');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    setStatus('');
    setNotification('');
    setFee('');
  };

  return (
    <div
      className={`h-screen flex flex-col transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#137657] via-[#248378] to-gray-950 text-gray-100'
          : 'bg-gradient-to-br from-background to-muted/50 text-foreground'
      }`}
    >
      {/* Header */}
      <div
        className={`flex-shrink-0 border-b backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-white/10'
            : 'bg-card/50 border-border'
        }`}
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* User info */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    professionalInfo?.avatar_url || '/placeholder-doctor.jpg'
                  }
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {professionalInfo?.first_name}
                  {professionalInfo?.last_name}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:bg-accent/20"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-800" />
                )}
              </Button>
              <LanguageToggle
                className={`${isDark ? 'text-white' : 'text-black'}`}
              />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body: Sidebar + Main */}
      <div className="flex  overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="h-screen ">
          <div
            className={`hidden lg:flex  flex-col h-full ${
              sidebarOpen ? 'w-120' : 'w-16'
            } transition-all duration-300 flex-shrink-0 border-r ${
              theme === 'dark'
                ? 'bg-gray-800/80 border-white/10'
                : 'bg-card/50 border-border'
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                {sidebarOpen && <h3 className="font-semibold">Navigation</h3>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
              <nav className="space-y-2">
                {[
                  {
                    id: 'overview',
                    icon: BarChart3,
                    label: t('healthProfessionalScreen.tabs.overview'),
                  },
                  {
                    id: 'patients',
                    icon: Users,
                    label: t('healthProfessionalScreen.tabs.patients'),
                  },
                  // {
                  //   id: 'consultations',
                  //   icon: Calendar,
                  //   label: t('healthProfessionalScreen.tabs.consultations'),
                  // },
                  {
                    id: 'earnings',
                    icon: DollarSign,
                    label: t('healthProfessionalScreen.tabs.earnings'),
                  },
                  {
                    id: 'settings',
                    icon: Settings,
                    label: t('healthProfessionalScreen.tabs.settings'),
                  },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : theme === 'dark'
                        ? 'hover:bg-gray-700/50 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          isOpen={sidebarOpen && isMobile}
          placement="left"
          onClose={() => setSidebarOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent
            className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          >
            <DrawerCloseButton />
            <DrawerHeader className="font-bold">Navigation</DrawerHeader>
            <DrawerBody className="p-0">
              <nav className="p-4">
                {[
                  {
                    id: 'overview',
                    icon: BarChart3,
                    label: t('healthProfessionalScreen.tabs.overview'),
                  },
                  {
                    id: 'patients',
                    icon: Users,
                    label: t('healthProfessionalScreen.tabs.patients'),
                  },
                  {
                    id: 'consultations',
                    icon: Calendar,
                    label: t('healthProfessionalScreen.tabs.consultations'),
                  },
                  {
                    id: 'earnings',
                    icon: DollarSign,
                    label: t('healthProfessionalScreen.tabs.earnings'),
                  },
                  {
                    id: 'settings',
                    icon: Settings,
                    label: t('healthProfessionalScreen.tabs.settings'),
                  },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors mb-2 ${
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : theme === 'dark'
                        ? 'hover:bg-gray-700/50 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className="text-base font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold">
                  Dr. {professionalInfo?.first_name}{' '}
                  {professionalInfo?.last_name}
                </h1>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                  }`}
                >
                  {professionalInfo?.professional_type ||
                    'Medical Professional'}
                </p>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`transition-shadow duration-300 hover:shadow-lg ${
                      theme === 'dark' ? 'bg-gray-800/80 border-white/10' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              theme === 'dark'
                                ? 'text-gray-400'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-500">
                          {stat.trend}
                        </span>
                        <span
                          className={`text-sm ml-1 ${
                            theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {t('professionalDashboard.stats.compared')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Overview Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patients */}
                <Card
                  className={
                    theme === 'dark'
                      ? 'bg-gray-800/80 border-white/10 h-fit'
                      : 'h-fit'
                  }
                >
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      {t('professionalDashboard.overview.recentPatients.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(showAllPatients
                        ? recentPatients
                        : recentPatients.slice(0, 5)
                      ).map((patient, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-900/60 border-white/5'
                              : 'border-border'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p
                              className={`text-sm ${
                                theme === 'dark'
                                  ? 'text-gray-400'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              Last visit: {patient.lastVisit}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {patient.glucose}
                            </p>
                            <Badge
                              variant={
                                patient.status === 'attention'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {patient.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    {recentPatients.length > 5 && (
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setShowAllPatients(!showAllPatients)}
                      >
                        {showAllPatients
                          ? 'Show Less'
                          : `View All Patients (${recentPatients.length})`}
                      </Button>
                    )}
                  </CardContent>
                </Card>
                <div className="flex flex-col gap-6">
                  {/* Quick Actions */}
                  {/* <Card
                    className={
                      theme === 'dark'
                        ? 'bg-gray-800/80 border-white/10 h-fit'
                        : 'h-fit'
                    }
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Stethoscope className="h-5 w-5 mr-2" />
                        {t('professionalDashboard.overview.quickActions.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <QuickActions />
                    </CardContent>
                  </Card> */}
                  {/* Notes des patients */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        {t('professionalDashboard.patients.recentNotes.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activePatients
                          .filter(p => p.notes)
                          .map(patient => (
                            <div
                              key={patient.id}
                              className="p-4 border rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{`${patient.first_name} ${patient.last_name}`}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(
                                    patient.last_visit
                                  ).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {patient.notes}
                              </p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && <PatientManagement />}

          {activeTab === 'consultations' && (
            <Card
              className={
                theme === 'dark' ? 'bg-gray-800/80 border-white/10' : ''
              }
            >
              <CardContent className="p-6">
                <p>Consultation dashboard coming soon...</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <EarningsTable />
              <Card
                className={
                  theme === 'dark' ? 'bg-gray-800/80 border-white/10' : ''
                }
              >
                <CardHeader>
                  <CardTitle>Consultation Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`${
                      theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    View your total consultation earnings and performance
                    summary.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <Card
              className={`max-w-lg mx-auto ${
                darkMode
                  ? 'bg-gray-800/80 border-white/10 text-gray-100'
                  : 'bg-white border-gray-200 text-gray-800'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Account Settings
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Manage your account preferences and dashboard appearance.
                </p>

                {/* === Form === */}
                <form className="space-y-5">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                        darkMode
                          ? 'bg-[#137657] text-[#E2E8F0]'
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  {/* Notifications */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Notifications
                    </label>
                    <select
                      className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                        darkMode
                          ? 'bg-[#137657] text-[#E2E8F0]'
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                      value={notification}
                      onChange={e => setNotification(e.target.value)}
                    >
                      <option value="">Select notification preference</option>
                      <option value="all">All</option>
                      <option value="important">Important only</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  {/* Consultation Fee */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Consultation Fee (XOF)
                    </label>
                    <input
                      type="number"
                      placeholder="5000"
                      className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none ${
                        darkMode
                          ? 'bg-[#137657] text-[#E2E8F0]'
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                      value={fee}
                      onChange={e => setFee(e.target.value)}
                    />
                  </div>
                </form>
              </CardContent>

              {/* Footer Buttons */}
              <CardFooter className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className={`text-sm ${
                    darkMode
                      ? 'border-[#AEE6DA] text-[#AEE6DA] hover:bg-[#155E47]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className={`text-sm text-white ${
                    darkMode
                      ? 'bg-[#FA6657] hover:bg-[#F7845D]'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};
