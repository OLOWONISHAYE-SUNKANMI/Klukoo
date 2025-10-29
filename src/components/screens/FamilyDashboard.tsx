import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Import only the profile screen
// import FamilyProfieScreen from '@/components/screens/';

interface FamilySession {
  family_member_id: string;
  family_member_name: string;
  family_member_phone: string;
  patient_user_id: string;
  patient_name: string;
  access_code: string;
  permission_level: 'view' | 'full_access';
  login_time: string;
}

const FamilyDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  console.log('navigated to /family-dashboard');

  // Family session data
  interface PatientProfile {
    user_id: string;
    full_name?: string;
    email?: string;
    phone?: string;
    avatar_url?: string;
    [key: string]: unknown;
  }
  const [familySession, setFamilySession] = useState<FamilySession | null>(
    null
  );
  const [patientData, setPatientData] = useState<PatientProfile | null>(null);

  useEffect(() => {
    checkFamilyAccess();
  }, []);

  const checkFamilyAccess = async () => {
    setLoading(true);

    try {
      // Get family session from localStorage
      const storedSession = localStorage.getItem('family_session');

      if (!storedSession) {
        toast({
          title: 'Access Required',
          description: 'Please sign in as a family member first.',
          variant: 'destructive',
        });
        navigate('/auth');
        return;
      }

      const session: FamilySession = JSON.parse(storedSession);
      setFamilySession(session);

      // Verify the family member still exists and is active
      const { data: familyMember, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('id', session.family_member_id)
        .eq('is_active', true)
        .single();

      if (error || !familyMember) {
        toast({
          title: 'Access Revoked',
          description: 'Your family access has been removed by the patient.',
          variant: 'destructive',
        });
        localStorage.removeItem('family_session');
        navigate('/auth');
        return;
      }

      // Get latest patient data
      const { data: patient } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.patient_user_id)
        .single();

      setPatientData(patient);

      toast({
        title: 'Welcome!',
        description: `You can now view ${session.patient_name}'s health profile`,
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error('Error checking access:', error);
      toast({
        title: 'Error',
        description: `Failed to verify access permissions${
          errMsg ? `: ${errMsg}` : ''
        }`,
        variant: 'destructive',
      });
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('family_session');
    toast({
      title: 'Signed Out',
      description: 'You have been signed out from family access.',
    });
    navigate('/auth');
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Verifying access..." />;
  }

  if (!familySession || !patientData) {
    return <LoadingSpinner fullScreen text="Loading patient data..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {familySession.patient_name}'s Health Profile
                </h1>
                <p className="text-gray-600 text-sm">
                  Viewing as {familySession.family_member_name}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <span>🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Read-Only Notice */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2 text-yellow-800">
            <span className="text-lg">👁️</span>
            <span className="text-sm font-medium">
              Read-Only Access - You can view but not edit any information
            </span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto py-6 px-4">
        <FamilyProfileScreen
          patientUserId={familySession.patient_user_id}
          isReadOnly={true}
        />
      </div>

      {/* Footer Note */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
          <p className="text-gray-500 text-sm">
            Family Access • View Only • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;
