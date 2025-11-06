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

export interface ActivityEntry {
  id: string;
  user_id: string;
  activity_name: string;
  activity_type: string;
  duration_minutes: number;
  intensity: 'low' | 'moderate' | 'high';
  calories_per_minute?: number;
  total_calories_burned?: number; // generated column
  distance_km?: number;
  steps_count?: number;
  heart_rate_avg?: number;
  activity_time: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface ActivityContextType {
  activities: ActivityEntry[];
  addActivity: (activity: {
    activity_name: string;
    activity_type: string;
    duration_minutes: number;
    intensity: 'low' | 'moderate' | 'high';
    calories_per_minute?: number;
    distance_km?: number;
    steps_count?: number;
    heart_rate_avg?: number;
    activity_time?: string;
    notes?: string;
  }) => Promise<void>;
  loading: boolean;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;
      setLoading(true);

      // Check if in family mode to use patient's user_id
      const familySession = JSON.parse(localStorage.getItem('family_session') || '{}');
      const targetUserId = familySession.patient_user_id || user.id;

      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', targetUserId)
        .order('activity_time', { ascending: false });

      if (error) {
        console.error('Error fetching activities:', error);
      } else if (data) {
        setActivities(data as ActivityEntry[]);
      }

      setLoading(false);
    };

    fetchActivities();
  }, [user]);

  // Add new activity
  const addActivity = useCallback(
    async ({
      activity_name,
      activity_type,
      duration_minutes,
      intensity,
      calories_per_minute,
      distance_km,
      steps_count,
      heart_rate_avg,
      activity_time,
      notes,
    }: {
      activity_name: string;
      activity_type: string;
      duration_minutes: number;
      intensity: 'low' | 'moderate' | 'high';
      calories_per_minute?: number;
      distance_km?: number;
      steps_count?: number;
      heart_rate_avg?: number;
      activity_time?: string;
      notes?: string;
    }) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('user_activities') // ✅ new table
        .insert({
          user_id: user.id,
          activity_name,
          activity_type,
          duration_minutes,
          intensity,
          calories_per_minute: calories_per_minute ?? undefined,
          distance_km: distance_km ?? undefined,
          steps_count: steps_count ?? undefined,
          heart_rate_avg: heart_rate_avg ?? undefined,
          activity_time: activity_time ?? new Date().toISOString(),
          notes: notes ?? null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting activity:', error);
        throw error;
      }

      if (data) {
        setActivities(prev => [data as ActivityEntry, ...prev]);
      }
    },
    [user]
  );

  return (
    <ActivityContext.Provider value={{ activities, addActivity, loading }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};
