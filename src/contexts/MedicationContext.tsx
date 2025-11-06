import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// ---------------------
// Types
// ---------------------
export interface MedicationEntry {
  id: string;
  user_id: string;
  medication_name: string;
  dose: number;
  dose_unit: string;
  medication_time: string;
  injection_site?: string | null;
  injection_done: boolean;
  created_at: string;
  updated_at: string;
}

interface MedicationContextType {
  medications: MedicationEntry[];
  addMedication: (med: {
    medication_name: string;
    dose: number;
    dose_unit: string;
    medication_time: string; // ISO string
    injection_site?: string;
    injection_done?: boolean;
  }) => Promise<void>;
  loading: boolean;
}

// ---------------------
// Context
// ---------------------
const MedicationContext = createContext<MedicationContextType | undefined>(
  undefined
);

export const MedicationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch meds on mount
  useEffect(() => {
    const fetchMedications = async () => {
      if (!user) return;
      setLoading(true);

      // Check if in family mode to use patient's user_id
      const familySession = JSON.parse(localStorage.getItem('family_session') || '{}');
      const targetUserId = familySession.patient_user_id || user.id;

      const { data, error } = await supabase
        .from('medication_entries')
        .select('*')
        .eq('user_id', targetUserId)
        .order('medication_time', { ascending: false });

      if (error) {
        console.error('Error fetching medications:', error);
      } else if (data) {
        setMedications(data as MedicationEntry[]);
      }

      setLoading(false);
    };

    fetchMedications();
  }, [user]);

  // Add new medication
  const addMedication = useCallback(
    async ({
      medication_name,
      dose,
      dose_unit,
      medication_time,
      injection_site,
      injection_done = false,
    }: {
      medication_name: string;
      dose: number;
      dose_unit: string;
      medication_time: string;
      injection_site?: string;
      injection_done?: boolean;
    }) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('medication_entries')
        .insert({
          user_id: user.id,
          medication_name,
          dose,
          dose_unit,
          medication_time,
          injection_site: injection_site ?? null,
          injection_done,
        })
        .select()
        .single();

      if (error) throw error;

      setMedications(prev => [data as MedicationEntry, ...prev]);
    },
    [user]
  );

  return (
    <MedicationContext.Provider value={{ medications, addMedication, loading }}>
      {children}
    </MedicationContext.Provider>
  );
};

// Hook
export const useMedications = () => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedications must be used within a MedicationProvider');
  }
  return context;
};
