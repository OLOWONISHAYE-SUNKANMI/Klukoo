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

export interface GlucoseReading {
  id: string;
  value: number;
  timestamp: string;
  context: string;
  notes?: string;
}

interface GlucoseContextType {
  readings: GlucoseReading[];
  addReading: (reading: Omit<GlucoseReading, 'id'>) => Promise<void>;
  getLatestReading: () => GlucoseReading | null;
  getTrend: () => 'up' | 'down' | 'stable';
  loading: boolean;
}

const GlucoseContext = createContext<GlucoseContextType | undefined>(undefined);

export const GlucoseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch readings from Supabase on mount
  useEffect(() => {
    const fetchReadings = async () => {
      if (!user) return;
      setLoading(true);

      // Check if in family mode to use patient's user_id
      const familySession = JSON.parse(localStorage.getItem('family_session') || '{}');
      const targetUserId = familySession.patient_user_id || user.id;

      const { data, error } = await supabase
        .from('glucose_readings')
        .select('*')
        .eq('user_id', targetUserId)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching glucose readings:', error);
      } else if (data) {
        setReadings(data);
      }

      setLoading(false);
    };

    fetchReadings();
  }, [user]);

  // add new reading (Supabase + local state)
  const addReading = useCallback(
    async (reading: Omit<GlucoseReading, 'id'>) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('glucose_readings')
        .insert({
          user_id: user.id,
          value: reading.value,
          timestamp: reading.timestamp,
          context: reading.context,
          notes: reading.notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state immediately
      setReadings(prev => [data as GlucoseReading, ...prev]);
    },
    [user]
  );

  // set latest reading
  const getLatestReading = useCallback(() => {
    return readings[0] || null;
  }, [readings]);

  // calculate trend
  const getTrend = useCallback(() => {
    if (readings.length < 2) return 'stable';

    const latest = readings[0].value;
    const previous = readings[1].value;

    if (latest > previous + 10) return 'up';
    if (latest < previous - 10) return 'down';
    return 'stable';
  }, [readings]);

  return (
    <GlucoseContext.Provider
      value={{
        readings,
        addReading,
        getLatestReading,
        getTrend,
        loading,
      }}
    >
      {children}
    </GlucoseContext.Provider>
  );
};

export const useGlucose = () => {
  const context = useContext(GlucoseContext);
  if (context === undefined) {
    throw new Error('useGlucose must be used within a GlucoseProvider');
  }
  return context;
};
