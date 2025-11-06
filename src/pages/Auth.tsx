import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import PlanSelection from '@/components/PlanSelection';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { LegalModal } from '@/components/modals/LegalModal';
import { ProfessionalAccessModal } from '@/components/modals/ProfessionalAccessModal';
// import { FamilyMemberSignupFlow } from '@/components/FamilyMemberSignupFlow';
import { supabase } from '@/integrations/supabase/client';
import {
  Mail,
  Lock,
  User,
  Stethoscope,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle,
  Users,
  Heart,
  Loader,
} from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { Sun, Moon } from 'lucide-react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CurrencyConverter } from '@/utils/CurrencyConverter';
import { CountryProvider, useCountry } from '@/contexts/CountryContext';
import { Badge } from '@/components/ui/badge';

const AuthPage = () => {
  const {
    user,
    signIn,
    signOut,
    signUp,
    signInWithProfessionalCode,
    loading,
    isTestMode,
  } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // États pour les formulaires - MOVED TO TOP
  const [activeTab, setActiveTab] = useState('patient');
  const [patientMode, setPatientMode] = useState<'signin' | 'signup'>('signin');
  const [professionalAccessModalOpen, setProfessionalAccessModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(
    null
  );
  const [jobModal, setJobModal] = useState(false);
  const [role, setRole] = useState('');

  // Données des formulaires pour patient
  const [patientSignInData, setPatientSignInData] = useState({
    email: '',
    password: '',
  });
  const [patientSignUpData, setPatientSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  // Données pour professionnel
  const [professionalCode, setProfessionalCode] = useState('');
  const [patientCode, setpatientCode] = useState('');

  // Données pour famille
  const [familyData, setFamilyData] = useState({
    patientCode: '1234',
  });

  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  // Show loading first
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-blue-light via-background to-medical-green-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary">
          {' '}
          <Loader />
        </div>
      </div>
    );
  }

  // Redirect if already authenticated (unless force parameter is used)
  const forceAuth = searchParams.get('force') === 'true';
  if (user && !forceAuth) {
    return <Navigate to="/" replace />;
  }

  const handlePatientSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // const result = await signInWithProfessionalCode(code);
      const { error } = await signIn(
        patientSignInData.email,
        patientSignInData.password
      );

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError(t('auth.invalidCredentials'));
        } else if (error.message.includes('Email not confirmed')) {
          setError(t('auth.emailNotConfirmed'));
        } else {
          setError(error.message);
        }
        return;
      }

      toast({
        title: t('auth.loginSuccess'),
        description: t('auth.welcomePatient'),
      });

      navigate('/');
    } catch (err: any) {
      setError(t('auth.connectionError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (patientSignUpData.password !== patientSignUpData.confirmPassword) {
      setError(t('auth.passwordMismatch'));
      setIsLoading(false);
      return;
    }

    if (patientSignUpData.password.length < 6) {
      setError(t('auth.passwordTooShort'));
      setIsLoading(false);
      return;
    }

    try {
      const { error, needsSubscription } = await signUp(
        patientSignUpData.email,
        patientSignUpData.password,
        {
          first_name: patientSignUpData.firstName,
          last_name: patientSignUpData.lastName,
          user_type: 'patient',
        }
      );

      if (error) {
        if (error.message.includes('User already registered')) {
          setError(t('auth.userAlreadyExists'));
        } else {
          setError(error.message);
        }
        return;
      }

      if (needsSubscription) {
        // Show plan selection after successful signup
        setShowPlanSelection(true);
        setSuccess(t('auth.registrationSuccess') + ' ' + t('auth.choosePlan'));
      } else {
        setSuccess(
          t('auth.registrationSuccess') + ' ' + t('auth.confirmEmail')
        );
      }

      setPatientSignUpData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
      });

      toast({
        title: t('auth.registrationSuccess'),
        description: needsSubscription
          ? t('auth.choosePlan')
          : t('auth.confirmEmail'),
      });
    } catch (err: unknown) {
      console.error('Signup error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('auth.registrationError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelected = async (planId: string) => {
    try {
      setIsLoading(true);

      // Get plan details first
      const { data: planData, error: planError } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (planError || !planData) {
        throw new Error('Plan not confirmed');
      }

      // Close plan selection and redirect to payment with Flutterwave
      setShowPlanSelection(false);

      // Store selected plan in localStorage for PaymentScreen
      localStorage.setItem('selectedPlan', JSON.stringify(planData));

      // Navigate to payment page
      navigate('/payment');
    } catch (err: any) {
      setError(err.message || 'Error selecting plan');
      toast({
        title: t('authFixes.error'),
        description: err.message || t('authFixes.plan_selection.failed'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFamilyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const accessCode = familyData.patientCode?.trim().toUpperCase();
    const phoneNumber = familyData.phone?.trim();

    if (!accessCode || accessCode.length !== 8) {
      setError('Please enter a valid 8-character access code');
      setIsLoading(false);
      return;
    }

    if (!phoneNumber) {
      setError('Please enter your phone number');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Find patient by access code
      const { data: profile, error: profileError } = await supabase
        .from<{
          user_id: string;
          first_name: string;
          last_name: string;
          access_code: string;
        }>('profiles')
        .select('user_id, first_name, last_name, access_code')
        .eq('access_code', accessCode)
        .single();

      // console.log('profile', profile);
      if (profileError || !profile) {
        setError('Invalid access code');
        setIsLoading(false);
        return;
      }

      // 2. Find family member by phone number for this patient
      const { data: familyMember, error: familyError } = await supabase
        .from<{
          id: string;
          full_name: string;
          phone: string;
          permission_level: string;
        }>('family_members')
        .select('id, full_name, phone, permission_level')
        .eq('patient_user_id', profile.user_id)
        .eq('phone', phoneNumber)
        .single();

      // console.log('familyMember', familyMember);

      if (familyError || !familyMember) {
        setError(
          'No family access found for this phone number. Please check your number or ask the patient to add you.'
        );
        setIsLoading(false);
        return;
      }

      // 3. Store session and create mock auth (like patient signin)
      const familySession = {
        family_member_id: familyMember.id,
        family_member_name: familyMember.full_name,
        family_member_phone: familyMember.phone,
        patient_user_id: profile.user_id,
        patient_name: `${profile.first_name} ${profile.last_name}`,
        access_code: accessCode,
        permission_level: familyMember.permission_level,
        login_time: new Date().toISOString(),
      };

      localStorage.setItem('family_session', JSON.stringify(familySession));
      
      // Create mock session like test mode to trigger auth state
      localStorage.setItem('family_auth_mode', 'true');
      localStorage.setItem('family_user_data', JSON.stringify({
        id: profile.user_id, // Use patient's user_id instead of family prefix
        email: familyMember.phone,
        user_metadata: {
          first_name: familyMember.full_name.split(' ')[0],
          last_name: familyMember.full_name.split(' ').slice(1).join(' '),
          family_member: true,
        },
      }));

      toast({
        title: 'Family Access Granted!',
        description: `Welcome ${familyMember.full_name}! Accessing ${profile.first_name}'s dashboard.`,
      });

      // Force reload to trigger auth context update
      window.location.href = '/';
    } catch (err: any) {
      console.error('Family login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfessionalCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signInWithProfessionalCode(professionalCode);

      if (error) {
        setError(error.message);
        return;
      }

      toast({
        title: t('auth.professionalLoginSuccess'),
        description: t('auth.welcomeProfessional'),
      });

      navigate('/');
    } catch (err: unknown) {
      console.error('Professional login error:', err);
      setError(t('auth.connectionError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestProfessionalAccess = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Bypass direct vers l'interface professionnelle
      toast({
        title: t('authFixes.demo_mode.enabled_title'),
        description: t('authFixes.demo_mode.enabled_description'),
      });

      // Simuler un utilisateur professionnel connecté
      localStorage.setItem('demo_professional_mode', 'true');
      localStorage.setItem(
        'demo_user_data',
        JSON.stringify({
          id: 'demo-prof-001',
          email: 'demo@professional.com',
          user_metadata: {
            first_name: 'Dr Demo',
            last_name: 'Professional',
            specialty: 'Endocrinologist',
          },
        })
      );

      // Rediriger vers le tableau de bord professionnel
      navigate('/professional-dashboard');
    } catch (err: any) {
      setError('Error mode test: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show plan selection modal if needed
  if (showPlanSelection) {
    return (
      <PlanSelection
        onPlanSelected={handlePlanSelected}
        onClose={() => setShowPlanSelection(false)}
      />
    );
  }

  // Country selector component for signup
  const CountrySelector = () => {
    const supportedCountries = CurrencyConverter.getSupportedCountries();
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleCountryChange = (countryCode: string) => {
      setSelectedCountry(countryCode);
      // Store in localStorage for PlanSelection to use
      localStorage.setItem('selectedCountry', countryCode);
    };

    return (
      <Select value={selectedCountry} onValueChange={handleCountryChange}>
        <SelectTrigger>
          <SelectValue
            placeholder={t(
              'countrySelector.Settings.countryCurrency.selectPlaceholder'
            )}
          />
        </SelectTrigger>
        <SelectContent>
          {supportedCountries.map(({ code, info }) => (
            <SelectItem key={code} value={code}>
              <div className="flex items-center justify-between w-full">
                <span>{info.country}</span>
                <Badge variant="secondary" className="ml-2">
                  {info.symbol}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: t('authFixes.logout.error.title'),
          description: t('authFixes.logout.error.description'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('authFixes.logout.success.title'),
          description: t('authFixes.logout.success.description'),
        });
        navigate('/auth', { replace: true });
      }
    } catch (err) {
      toast({
        title: t('authFixes.logout.error.title'),
        description: t('authFixes.logout.error.catch_description'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientAccess = () => {
    setJobModal(true);
  };

  // Professsioanl access code
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Store the code before signing in
      localStorage.setItem('professionalCode', professionalCode);
      const result = await signInWithProfessionalCode(professionalCode);
      if (result.success) {
        toast({
          title: t('auth.professionalLoginSuccess'),
          description: t('auth.welcomeProfessional'),
        });
        navigate('/professional-dashboard');
      } else {
        setError(result.error || 'Failed to sign in');
        localStorage.removeItem('professionalCode');
      }
    } catch (err: any) {
      console.log('Professional error:', err);
      setError(t('auth.connectionError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Language Selector - Top Right */}

      {/* Sign Out Button - Top Left (if user is connected and force mode) */}
      {user && forceAuth && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            {isLoading
              ? t('authFixes.logout.loading')
              : t('authFixes.logout.button')}
          </Button>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/depeqzb6z/image/upload/v1760470801/New_Klukoo_Logo_vgkxe7.png"
              className="w-20 h-20 text-primary-foreground"
              alt="logo"
            />
          </div>
          {/* <h1 className="text-3xl font-bold text-[#4B2E2B] mb-4">
            {t('appName')}
          </h1> */}
          <p className="text-lg font-medium text-muted-foreground mb-2">
            {t('appSlogan')}
          </p>
        </div>
        <div className=" flex items-center justify-center gap-3 max-w-md mb-4">
          {/* Control Wrapper */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl  bg-card">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors border border-border
        ${
          isDark
            ? 'bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--muted-foreground))]/20'
            : 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]/80'
        }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-4">
            {/* <CardTitle className="text-xl">{t('auth.signInTitle')}</CardTitle> */}
            <CardDescription className="font-bold text-md text-[#00000]">
              {t('auth.description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient" className="text-xs">
                  {t('auth.patient')}
                </TabsTrigger>
                <TabsTrigger value="professional" className="text-xs">
                  <Stethoscope className="w-4 h-4 mr-1" />
                  {t('auth.professional')}
                </TabsTrigger>
                <TabsTrigger value="family" className="text-xs">
                  <Users className="w-4 h-4 mr-1" />
                  {t('auth.family')}
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mt-4 border-success bg-success/10 text-success-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="patient" className="mt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={patientMode === 'signin' ? 'default' : 'outline'}
                      onClick={() => setPatientMode('signin')}
                      className="text-xs"
                    >
                      <LogIn className="w-4 h-4 mr-1" />
                      {t('auth.signInButton')}
                    </Button>
                    <Button
                      variant={patientMode === 'signup' ? 'default' : 'outline'}
                      onClick={() => setPatientMode('signup')}
                      className="text-xs"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      {t('auth.signUpButton')}
                    </Button>
                  </div>

                  {patientMode === 'signin' && (
                    <form onSubmit={handlePatientSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-signin-email">
                          Email or Phone number
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-signin-email"
                            type="text"
                            placeholder="Enter your email or phone number"
                            value={patientSignInData.email}
                            onChange={e =>
                              setPatientSignInData(prev => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-signin-password">
                          {t('auth.password')}
                        </Label>

                        <div className="w-full rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <div className="relative flex items-center w-full bg-background">
                            {/* Left lock icon */}
                            <Lock className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />

                            {/* Input field */}
                            <Input
                              id="patient-signin-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder={t('auth.password')}
                              value={patientSignInData.password}
                              onChange={e =>
                                setPatientSignInData(prev => ({
                                  ...prev,
                                  password: e.target.value,
                                }))
                              }
                              className="w-full pl-10 pr-10 border-0 focus:ring-0 focus-visible:ring-0"
                              required
                            />

                            {/* Right eye icon */}
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 text-muted-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-center text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        Forgot Password?{' '}
                        <Link
                          className={`ml-1 cursor-pointer transition-colors duration-200 ${
                            theme === 'dark'
                              ? 'text-[#F7845D] hover:text-[#FA6657]'
                              : 'text-[#137657] hover:text-[#248378]'
                          }`}
                          to="/forgot-password"
                        >
                          Request reset link
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? t('auth.connecting') : t('auth.signIn')}
                      </Button>
                    </form>
                  )}

                  {patientMode === 'signup' && (
                    <form onSubmit={handlePatientSignUp} className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="patient-firstName">
                            {t('auth.firstName')}
                          </Label>
                          <Input
                            id="patient-firstName"
                            placeholder={t('auth.firstName')}
                            value={patientSignUpData.firstName}
                            onChange={e =>
                              setPatientSignUpData(prev => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patient-lastName">
                            {t('auth.lastName')}
                          </Label>
                          <Input
                            id="patient-lastName"
                            placeholder={t('auth.lastName')}
                            value={patientSignUpData.lastName}
                            onChange={e =>
                              setPatientSignUpData(prev => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-signup-email">
                          {t('auth.email')}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-signup-email"
                            type="email"
                            placeholder={t('auth.emailPlaceholder')}
                            value={patientSignUpData.email}
                            onChange={e =>
                              setPatientSignUpData(prev => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-signup-email">
                          phone number
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-signup-email"
                            type="number"
                            placeholder="enter your phone number"
                            value={patientSignUpData.phoneNumber}
                            onChange={e =>
                              setPatientSignUpData(prev => ({
                                ...prev,
                                phoneNumber: e.target.value,
                              }))
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-signup-password">
                          {t('auth.password')}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('auth.passwordMinLength')}
                            value={patientSignUpData.password}
                            onChange={e =>
                              setPatientSignUpData(prev => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-confirm-password">
                          {t('auth.confirmPassword')}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('auth.confirmPasswordPlaceholder')}
                            value={patientSignUpData.confirmPassword}
                            onChange={e =>
                              setPatientSignUpData(prev => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {/* Country Selector */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {t(
                            'countrySelector.Settings.countryCurrency.selectCountry'
                          )}
                        </label>
                        <CountrySelector />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? t('auth.registering') : t('auth.signUp')}
                      </Button>
                    </form>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="professional" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="professional-code">
                      {t('auth.professionalCode')}
                    </Label>
                    <Input
                      id="professional-code"
                      type="text"
                      placeholder={t('auth.professionalCodePlaceholder')}
                      value={professionalCode}
                      onChange={e => setProfessionalCode(e.target.value)}
                      className="text-center font-mono text-lg"
                      maxLength={15}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      Format: TYPE-PAYS-XXXX
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading
                      ? t('auth.connecting')
                      : t('professionalLoginCard.loginButton')}
                  </Button>

                  {/* <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Patient Access
                      </span>
                    </div>
                  </div> */}

                  <div className="space-y-2">
                    {/* <Label htmlFor="professional-code">patient code</Label>
                    <Input
                      id="professional-code"
                      type="text"
                      placeholder="patient access code "
                      value={patientCode}
                      onChange={e =>
                        setpatientCode(e.target.value.toUpperCase())
                      }
                      className="text-center font-mono text-lg"
                      maxLength={15}
                      required
                    /> */}
                    {/* <p className="text-xs text-muted-foreground text-center">
                      Format: TYPE-PAYS-XXXX
                    </p> */}
                  </div>

                  {/* <Button
                    onClick={handlePatientAccess}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? t('auth.connecting') : 'Login as patient'}
                  </Button> */}
                </form>

                <Modal
                  isOpen={jobModal}
                  onClose={() => {
                    setJobModal(false);
                    setRole('');
                  }}
                  isCentered
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Login as </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      {/* Roles */}
                      <FormControl>
                        <FormLabel>Select Your Role</FormLabel>
                        <RadioGroup onChange={setRole} value={role}>
                          <Stack direction="column" spacing={2}>
                            <Radio value="Endocrinologist">
                              Endocrinologist
                            </Radio>
                            <Radio value="Diabetologist">Diabetologist</Radio>
                            <Radio value="General Practitioner">
                              General Practitioner
                            </Radio>
                            <Radio value="Diabetes Nurse">Diabetes Nurse</Radio>
                            <Radio value="Psychologist">Psychologist</Radio>
                            <Radio value="Nutritionist">Nutritionist</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        variant="ghost"
                        mr={3}
                        onClick={() => setJobModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        // colorScheme="teal"
                        // onClick={handleLogin}
                        isDisabled={!role}
                      >
                        Login
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Separator className="my-4" />

                <div className="text-center text-sm text-muted-foreground">
                  {t('auth.professionalNotRegistered')}
                  <Button
                    variant="link"
                    className="p-0 ml-1 text-medical-green"
                    onClick={() => setProfessionalAccessModalOpen(true)}
                  >
                    {t('auth.requestProfessionalAccess')}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="family" className="mt-6">
                <form onSubmit={handleFamilyAccess} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-code">Patient Access Code</Label>
                    <Input
                      id="patient-code"
                      type="text"
                      placeholder="Enter the 8-character code"
                      value={familyData.patientCode}
                      onChange={e =>
                        setFamilyData(prev => ({
                          ...prev,
                          patientCode: e.target.value.toUpperCase(),
                        }))
                      }
                      className="text-center font-mono text-lg"
                      maxLength={8}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="family-phone">Your Phone Number</Label>
                    <Input
                      id="family-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={familyData.phone}
                      onChange={e =>
                        setFamilyData(prev => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the phone number the patient used when adding you
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isLoading || !familyData.patientCode || !familyData.phone
                    }
                  >
                    {isLoading ? 'Logging in...' : 'Login as Family Member'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-3">
          <div className="text-sm text-muted-foreground">
            {t('auth.termsAcceptance')}{' '}
            <Button
              variant="link"
              className="p-0 text-sm underline text-primary"
              onClick={() => setLegalModal('terms')}
            >
              {t('auth.termsOfUse')}
            </Button>{' '}
            {t('auth.and')}{' '}
            <Button
              variant="link"
              className="p-0 text-sm underline text-primary"
              onClick={() => setLegalModal('privacy')}
            >
              {t('auth.privacyPolicy')}
            </Button>
          </div>

          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <Button
              variant="link"
              className="p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setLegalModal('privacy')}
            >
              {t('auth.privacyPolicy')}
            </Button>
            <span>•</span>
            <Button
              variant="link"
              className="p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setLegalModal('terms')}
            >
              {t('auth.termsOfUse')}
            </Button>
            <span>•</span>
            <Button
              variant="link"
              className="p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              {t('auth.support')}
            </Button>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      <LegalModal
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
        type={legalModal || 'terms'}
      />

      <ProfessionalAccessModal
        isOpen={professionalAccessModalOpen}
        onClose={() => setProfessionalAccessModalOpen(false)}
      />
    </div>
  );
};

const AuthPageWithProvider = () => {
  return (
    <CountryProvider>
      <AuthPage />
    </CountryProvider>
  );
};

export default AuthPageWithProvider;
