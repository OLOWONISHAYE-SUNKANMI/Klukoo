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

export interface MealEntry {
  id: string;
  user_id: string;
  meal_name: string;
  total_carbs: number;
  meal_time: string;
  created_at: string;
  updated_at: string;
}

interface MealContextType {
  meals: MealEntry[];
  addMeal: (meal: {
    meal_name: string;
    total_carbs: number;
    meal_time?: Date;
  }) => Promise<void>;
  loading: boolean;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch meals on mount
  useEffect(() => {
    const fetchMeals = async () => {
      if (!user) return;
      setLoading(true);

      // Check if in family mode to use patient's user_id
      const familySession = JSON.parse(localStorage.getItem('family_session') || '{}');
      const targetUserId = familySession.patient_user_id || user.id;

      const { data, error } = await supabase
        .from('meal_entries')
        .select('*')
        .eq('user_id', targetUserId)
        .order('meal_time', { ascending: false });

      if (error) {
        console.error('Error fetching meals:', error);
      } else if (data) {
        setMeals(data as MealEntry[]);
      }

      setLoading(false);
    };

    fetchMeals();
  }, [user]);

  // Add new meal
  const addMeal = useCallback(
    async ({
      meal_name,
      total_carbs,
      meal_time,
    }: {
      meal_name: string;
      total_carbs: number;
      meal_time?: Date;
    }) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('meal_entries')
        .insert({
          user_id: user.id,
          meal_name,
          total_carbs,
          meal_time: meal_time
            ? meal_time.toISOString()
            : new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setMeals(prev => [data as MealEntry, ...prev]);
    },
    [user]
  );

  return (
    <MealContext.Provider value={{ meals, addMeal, loading }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
};
