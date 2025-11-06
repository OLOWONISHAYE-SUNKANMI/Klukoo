import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;

  // Core user info
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;

  // Professional info
  professional_license: string | null;
  specialty: string | null;

  // Extended info
  profile_photo_url: string | null;
  weight?: number;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  city?: string | null;
  date_of_birth?: string | null;

  // Settings
  notifications?: boolean;
  data_sharing?: boolean;

  // Status
  verified: boolean;
}

interface AuthContextType {
  uid: any;
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  professionalCode: string | null;

  signUp: (
    email: string,
    password: string,
    metadata?: any
  ) => Promise<{ error: any; needsSubscription?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithProfessionalCode: (code: string) => Promise<{
    success: boolean;
    error?: string;
    user?: any;
  }>;
  signOut: () => Promise<{ error: any }>;
  isProfessional: boolean;
  professionalData: any;
  isTestMode: boolean;
  toggleTestMode: () => void;
  hasSubscription: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfessional, setIsProfessional] = useState(false);
  const [professionalCode, setProfessionalCode] = useState<string | null>(
    () => {
      return localStorage.getItem('professionalCode');
    }
  );
  const [professionalData, setProfessionalData] = useState<any>(null);

  const [isTestMode, setIsTestMode] = useState(() => {
    return localStorage.getItem('dare-test-mode') === 'true';
  });
  const [isFamilyMode, setIsFamilyMode] = useState(() => {
    return localStorage.getItem('family_auth_mode') === 'true';
  });
  const [profile, setProfile] = useState<Profile | null>(null);

  const [hasSubscription, setHasSubscription] = useState(false);

  // Fetch profile from Supabase - injected by LazyCode
  const getProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return null;
    }

    // Already matches Profile interface, including new fields
    //@ts-ignore
    return data as Profile;
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };

    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile?.id);

    if (error) {
      console.error('Error updating profile:', error);
      return { error };
    }

    // Refresh local profile state
    const refreshed = await getProfile(user.id);
    setProfile(refreshed);

    return { error: null };
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(async () => {
          await checkProfessionalStatus(session.user.id);
          const fetchedProfile = await getProfile(session.user.id);
          setProfile(fetchedProfile);
        }, 0);
      } else {
        setIsProfessional(false);
        setProfessionalData(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle test mode authentication
  useEffect(() => {
    if (isTestMode && !user) {
      // Create a test user object
      const testUser = {
        id: 'test-user-id',
        email: 'test@dare.com',
        user_metadata: {
          first_name: 'Test',
          last_name: 'User',
        },
      } as any;

      setUser(testUser);
      setHasSubscription(true);
    }
  }, [isTestMode, user]);

  // Handle family mode authentication
  useEffect(() => {
    if (isFamilyMode && !user) {
      const familyUserData = localStorage.getItem('family_user_data');
      const familySession = localStorage.getItem('family_session');
      if (familyUserData && familySession) {
        const familyUser = JSON.parse(familyUserData);
        const session = JSON.parse(familySession);
        setUser(familyUser as any);
        setHasSubscription(true);
        
        // Load actual patient's profile for family member
        getProfile(session.patient_user_id).then(patientProfile => {
          if (patientProfile) {
            setProfile(patientProfile);
          }
        });
      }
    }
  }, [isFamilyMode, user]);

  const checkProfessionalStatus = async (userId: string) => {
    try {
      // Check if user has professional profile
      const { data: professionalApp, error } = await supabase
        .from('professional_applications')
        .select('*')
        .eq('reviewed_by', userId)
        .eq('status', 'approved')
        .maybeSingle();
      if (!error && professionalApp) {
        setIsProfessional(true);
        setProfessionalData(professionalApp);
      } else {
        setIsProfessional(false);
        setProfessionalData(null);
      }
    } catch (error) {
      console.error('Error checking professional status:', error);
      setIsProfessional(false);
      setProfessionalData(null);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    // Check if profile already exists with this email
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    // console.log('Existing profile check:', existingProfile);

    if (existingProfile) {
      return {
        error: { message: 'User already registered' },
        needsSubscription: false,
      };
    }

    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata,
      },
    });

    console.log('SignUp Result:', data, error);

    // For patient signups, indicate that subscription selection is needed
    const needsSubscription = metadata?.user_type === 'patient';

    return { error, needsSubscription };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signInWithProfessionalCode = async (code: string) => {
    try {
      // 1. First verify the professional code
      const { data: professional, error: lookupError } = await supabase
        .from('professional_applications')
        .select('*')
        .eq('professional_code', code)
        .single();

      console.log('🔍 Professional lookup result:', professional);

      if (lookupError || !professional) {
        return { success: false, error: 'Invalid professional code' };
      }

      // 2. Check if code is expired
      if (new Date(professional.code_expires_at) < new Date()) {
        return { success: false, error: 'Professional code has expired' };
      }

      // 3. Check if professional is verified
      if (professional.status !== 'approved') {
        return { success: false, error: 'Professional account not approved' };
      }

      // 4. Try to sign in with existing credentials or create account
      let authResult;

      if (professional.user_id) {
        // Try to sign in with existing user
        authResult = await supabase.auth.signInWithPassword({
          email: professional.email,
          password: code,
        });
      } else {
        // Create new user account
        authResult = await supabase.auth.signUp({
          email: professional.email,
          password: code,
          options: {
            emailRedirectTo: `${window.location.origin}/professional-dashboard`,
            data: {
              first_name: professional.first_name,
              last_name: professional.last_name,
              professional_type: professional.professional_type,
            },
          },
        });

        // Update professional record with new user_id
        if (authResult.data.user) {
          await supabase
            .from('professional_applications')
            .update({ user_id: authResult.data.user.id })
            .eq('id', professional.id);
        }
      }

      console.log('🔍 Professional auth result:', authResult);

      if (authResult.error) {
        return { success: false, error: authResult.error.message };
      }

      // Set professional state
      setProfessionalCode(code);
      setIsProfessional(true);
      setProfessionalData(professional);

      return { success: true, user: authResult.data.user };
    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsProfessional(false);
      setProfessionalData(null);
      // Clear family mode
      localStorage.removeItem('family_auth_mode');
      localStorage.removeItem('family_user_data');
      localStorage.removeItem('family_session');
      setIsFamilyMode(false);
    }
    return { error };
  };

  const toggleTestMode = () => {
    const newTestMode = !isTestMode;
    setIsTestMode(newTestMode);
    localStorage.setItem('dare-test-mode', newTestMode.toString());

    if (newTestMode) {
      setHasSubscription(true);
      // Create test user if not already authenticated
      if (!user) {
        const testUser = {
          id: 'test-user-id',
          email: 'test@dare.com',
          user_metadata: {
            first_name: 'Test',
            last_name: 'User',
          },
        } as any;
        setUser(testUser);
      }
    } else {
      // If disabling test mode and user is test user, sign out
      if (user?.id === 'test-user-id') {
        setUser(null);
        setSession(null);
        setHasSubscription(false);
      }
    }
  };

  // In test mode or if user has actual subscription
  const effectiveSubscription = isTestMode || hasSubscription;

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signInWithProfessionalCode,
    signOut,
    isProfessional,
    professionalData,
    isTestMode,
    toggleTestMode,
    hasSubscription: effectiveSubscription,
    updateProfile,
    professionalCode,
    setProfessionalCode,
    uid: user?.id || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
