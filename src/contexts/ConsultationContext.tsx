'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

// Base type from Supabase
type ConsultationRequestBase =
  Database['public']['Tables']['consultation_requests']['Row'];

// Extended type that includes nested professional data
export type ConsultationRequestWithProfessional = {
  id: string;
  consultation_reason: string;
  consultation_fee: number;
  requested_at: string;
  status: string;
  professional_response: string | null;
  professional: {
    id: string;
    first_name: string;
    last_name: string;
    professional_type: string;
  } | null;
};

export interface Professional {
  id: string;
  first_name: string;
  last_name: string;
  professional_type: string;
  professional_code: string;
  status: string;
  specialty?: string;
}

interface ConsultationContextType {
  professionals: Professional[];
  myRequests: ConsultationRequestWithProfessional[];
  professionalRequests: ConsultationRequestWithProfessional[];
  loading: boolean;
  loadProfessionals: () => Promise<void>;
  loadMyRequests: () => Promise<void>;
  loadProfessionalRequests: (professionalCode: string) => Promise<void>;
  submitRequest: (
    professionalId: string,
    reason: string,
    message?: string
  ) => Promise<void>;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(
  undefined
);

export const ConsultationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [myRequests, setMyRequests] = useState<
    ConsultationRequestWithProfessional[]
  >([]);
  const [professionalRequests, setProfessionalRequests] = useState<
    ConsultationRequestWithProfessional[]
  >([]);
  const [loading, setLoading] = useState(false);

  const professionalRates = {
    endocrinologist: { rate: 630, percentage: 35 },
    general_practitioner: { rate: 520, percentage: 29 },
    psychologist: { rate: 430, percentage: 24 },
    nurse: { rate: 120, percentage: 7 },
    nutritionist: { rate: 100, percentage: 5 },
  };

  const loadProfessionals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('professional_applications')
        .select('*')
        .eq('status', 'approved');
      if (error) throw error;
      setProfessionals(data || []);
    } catch (err) {
      console.error('Error loading professionals:', err);
      toast({
        title: 'Failed to load professionals',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMyRequests = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .select(
          `
        id,
        consultation_reason,
        consultation_fee,
        requested_at,
        status,
        professional_response,
        professional:professional_applications(
          id,
          first_name,
          last_name,
          professional_type
        )
      `
        )
        .eq('patient_id', user.id)
        .order('requested_at', { ascending: false });

      // console.log('🔍 Supabase raw response:');
      // console.log('data:', data);
      // console.log('error:', error);

      if (error) throw error;

      // Map raw data to ConsultationRequestWithProfessional
      const mappedRequests: ConsultationRequestWithProfessional[] = (
        data || []
      ).map((req: any) => ({
        id: req.id,
        consultation_reason: req.consultation_reason,
        consultation_fee: req.consultation_fee,
        requested_at: req.requested_at,
        status: req.status,
        professional_response: req.professional_response,
        professional: req.professional || null,
      }));

      setMyRequests(mappedRequests);
    } catch (err: any) {
      console.error('Error loading requests:', err);
      toast({
        title: 'Failed to load your requests',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProfessionalRequests = async (professionalCode: string) => {
    setLoading(true);
    try {
      // First get consultation requests
      const { data: requests, error: requestError } = await supabase
        .from('consultation_requests')
        .select(
          'id, consultation_reason, consultation_fee, requested_at, status, professional_response, patient_id'
        )
        .eq('professional_code', professionalCode)
        .order('requested_at', { ascending: false });

      // console.log(requests);

      if (requestError) throw requestError;

      // Get unique patient IDs
      const patientIds = [...new Set(requests?.map(r => r.patient_id) || [])];

      // Then get patient profiles separately
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', patientIds);

      if (profileError) throw profileError;

      // Combine the data
      const mappedRequests: ConsultationRequestWithProfessional[] = (
        requests || []
      ).map((req: any) => {
        const patient = profiles?.find(p => p.id === req.patient_id);
        return {
          id: req.id,
          consultation_reason: req.consultation_reason,
          consultation_fee: req.consultation_fee,
          requested_at: req.requested_at,
          status: req.status,
          professional_response: req.professional_response,
          professional: null,
          patient: patient || null,
        };
      });

      // console.log(mappedRequests);

      setProfessionalRequests(mappedRequests);
    } catch (err: any) {
      console.error('Error loading professional requests:', err);
      toast({
        title: 'Failed to load requests',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const submitRequest = async (
    professionalId: string,
    reason: string,
    message?: string
  ) => {
    if (!user) return;

    setLoading(true);
    try {
      const professional = professionals.find(p => p.id === professionalId);
      if (!professional) throw new Error('Professional not found');

      // Calculate consultation fee based on professional type
      const specialtyKey =
        professional.professional_type as keyof typeof professionalRates;
      const rateInfo = professionalRates[specialtyKey];
      const consultationFee = rateInfo ? rateInfo.rate : 500;

      // Insert request safely (RLS will allow this only for this patient)
      const { data, error } = await supabase
        .from('consultation_requests')
        .insert({
          patient_id: user.id,
          professional_id: professionalId,
          professional_code: professional.professional_code,
          consultation_reason: reason,
          patient_message: message || '',
          consultation_fee: consultationFee,
          status: 'pending',
        }).select(`
        id,
        consultation_reason,
        consultation_fee,
        requested_at,
        status,
        professional_response,
        professional:professional_applications(
          id,
          first_name,
          last_name,
          professional_type
        )
      `);

      if (error) throw error;

      // Map the inserted row to our type
      if (data && data.length > 0) {
        const newRequest: ConsultationRequestWithProfessional = {
          id: data[0].id,
          consultation_reason: data[0].consultation_reason,
          consultation_fee: data[0].consultation_fee,
          requested_at: data[0].requested_at,
          status: data[0].status,
          professional_response: data[0].professional_response,
          professional: data[0].professional || null,
        };

        setMyRequests(prev => [newRequest, ...prev]);
      }

      toast({
        title: 'Request sent!',
        description: 'Your consultation request has been submitted.',
      });
    } catch (err: any) {
      console.error('Error submitting request:', err);
      toast({
        title: 'Failed to send request',
        description: err.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfessionals();
    if (user) {
      loadMyRequests();
    }
  }, [user]);

  return (
    <ConsultationContext.Provider
      value={{
        professionals,
        myRequests,
        professionalRequests,
        loading,
        loadProfessionals,
        loadMyRequests,
        loadProfessionalRequests,
        submitRequest,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context)
    throw new Error('useConsultation must be used within ConsultationProvider');
  return context;
};
