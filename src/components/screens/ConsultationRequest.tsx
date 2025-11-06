'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, User, DollarSign, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { useConsultation } from '@/contexts/ConsultationContext';

const ConsultationRequest = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { professionals, myRequests, loading, submitRequest } =
    useConsultation();

  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [consultationReason, setConsultationReason] = useState('');
  const [patientMessage, setPatientMessage] = useState('');

  const consultationReasons = [
    {
      value: 'routine_checkup',
      label: t('consultation.request.input2.writeup.options.one'),
    },
    {
      value: 'urgent_consultation',
      label: t('consultation.request.input2.writeup.options.two'),
    },
    {
      value: 'glucose_management',
      label: t('consultation.request.input2.writeup.options.three'),
    },
    {
      value: 'medication_adjustment',
      label: t('consultation.request.input2.writeup.options.four'),
    },
    {
      value: 'diet_counseling',
      label: t('consultation.request.input2.writeup.options.five'),
    },
    {
      value: 'psychological_support',
      label: t('consultation.request.input2.writeup.options.six'),
    },
    {
      value: 'complications',
      label: t('consultation.request.input2.writeup.options.seven'),
    },
    {
      value: 'follow_up',
      label: t('consultation.request.input2.writeup.options.eight'),
    },
  ];

  const professionalRates = {
    endocrinologist: { rate: 630, percentage: 35 },
    general_practitioner: { rate: 520, percentage: 29 },
    psychologist: { rate: 430, percentage: 24 },
    nurse: { rate: 120, percentage: 7 },
    nutritionist: { rate: 100, percentage: 5 },
  };

  const handleSubmitRequest = async () => {
    if (!selectedProfessional || !consultationReason) {
      toast({
        title: t('consultationRequestFixes.fieldsRequiredTitle'),
        description: t('consultationRequestFixes.fieldsRequiredDescription'),
        variant: 'destructive',
      });
      return;
    }

    // Check if professional is available
    const prof = professionals.find(p => p.id === selectedProfessional);

    if (!prof?.available) {
      toast({
        title: 'Professional Unavailable',
        description:
          'This professional is currently not available for consultations.',
        variant: 'destructive',
      });
      return;
    }

    await submitRequest(
      selectedProfessional,
      consultationReason,
      patientMessage
    );

    // Reset form
    setSelectedProfessional('');
    setConsultationReason('');
    setPatientMessage('');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: t('consultationRequestFixes.status.pending'),
        variant: 'outline' as const,
        color: 'text-orange-600',
      },
      accepted: {
        label: t('consultationRequestFixes.status.accepted'),
        variant: 'default' as const,
        color: 'text-green-600',
      },
      rejected: {
        label: t('consultationRequestFixes.status.rejected'),
        variant: 'destructive' as const,
        color: 'text-red-600',
      },
      completed: {
        label: t('consultationRequestFixes.status.completed'),
        variant: 'secondary' as const,
        color: 'text-blue-600',
      },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  const getProfessionalDisplayName = (type: string) => {
    const names = {
      endocrinologist: t(
        'consultationRequestFixes.professionals.endocrinologist'
      ),
      general_practitioner: t(
        'consultationRequestFixes.professionals.general_practitioner'
      ),
      psychologist: t('consultationRequestFixes.professionals.psychologist'),
      nurse: t('consultationRequestFixes.professionals.nurse'),
      nutritionist: t('consultationRequestFixes.professionals.nutritionist'),
    };
    return names[type as keyof typeof names] || type;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          💊 {t('consultation.title')}
        </h1>
        <p className="text-muted-foreground">{t('consultation.subtitle')}</p>
      </div>

      {/* New Consultation Request */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            {t('consultation.request.title')}
          </CardTitle>
          <CardDescription>
            {t('consultation.request.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select Professional */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('consultation.request.input1.title')}
            </label>
            <Select
              value={selectedProfessional}
              onValueChange={setSelectedProfessional}
            >
              <SelectTrigger className="bg-background">
                <SelectValue
                  placeholder={t('consultation.request.input1.writeup')}
                />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-md z-50">
                {professionals.map(prof => {
                  const rateInfo =
                    professionalRates[
                      prof.professional_type as keyof typeof professionalRates
                    ];
                  return (
                    <SelectItem key={prof.id} value={prof.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span className="font-medium">
                            Dr. {prof.first_name} {prof.last_name}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {getProfessionalDisplayName(prof.professional_type)}
                          </span>
                        </div>
                        <Badge
                          variant={prof.available ? 'default' : 'destructive'}
                          className="ml-2"
                        >
                          {prof.available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Consultation Reason */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('consultation.request.input2.title')}
            </label>
            <Select
              value={consultationReason}
              onValueChange={setConsultationReason}
            >
              <SelectTrigger className="bg-background">
                <SelectValue
                  placeholder={t('consultation.request.input2.writeup.title')}
                />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-md z-50">
                {consultationReasons.map(reason => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('consultation.request.input3.title')}
            </label>
            <Textarea
              value={patientMessage}
              onChange={e => setPatientMessage(e.target.value)}
              placeholder={t('consultation.request.input3.writeup')}
              rows={4}
            />
          </div>

          {/* Professional Availability */}
          {selectedProfessional && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-medical-green" />
                  <span className="font-medium">Professional Status</span>
                </div>
                <div className="text-right">
                  {(() => {
                    const prof = professionals.find(
                      p => p.id === selectedProfessional
                    );
                    return (
                      <Badge
                        variant={prof?.availability ? 'default' : 'destructive'}
                        className="text-sm"
                      >
                        {prof?.availability
                          ? 'Available Now'
                          : 'Currently Unavailable'}
                      </Badge>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmitRequest}
            disabled={loading || !selectedProfessional || !consultationReason}
            className="w-full"
            size="lg"
          >
            {loading ? (
              t('consultationRequestFixes.consultation.sending')
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t('consultationRequestFixes.consultation.button')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* My Consultation Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t('consultationRequestFixes.consultation.request.title')}
          </CardTitle>
          <CardDescription>
            {t('consultationRequestFixes.consultation.request.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {myRequests.length > 0 ? (
            <div className="space-y-4">
              {myRequests.map(request => {
                const status = getStatusBadge(request.status);
                const reason = consultationReasons.find(
                  r => r.value === request.consultation_reason
                );
                return (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            Dr. {(request as any).professional?.first_name}{' '}
                            {(request as any).professional?.last_name}
                          </span>
                          <Badge variant="outline">
                            {getProfessionalDisplayName(
                              (request as any).professional?.professional_type
                            )}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              'consultationRequestFixes.consultation.request.reason'
                            )}
                          </p>
                          <p className="font-medium">
                            {reason?.label || request.consultation_reason}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {t(
                              'consultationRequestFixes.consultation.request.requestedOn'
                            )}{' '}
                            {new Date(request.requested_at).toLocaleDateString(
                              'fr-FR'
                            )}
                          </span>
                        </div>
                        {request.professional_response && (
                          <div className="mt-3 p-3 bg-muted/30 rounded">
                            <p className="text-sm text-muted-foreground">
                              {t(
                                'consultationRequestFixes.consultation.request.professionalResponse'
                              )}
                            </p>
                            <p className="mt-1">
                              {request.professional_response}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={status.variant}
                          className={status.color}
                        >
                          {status.label}
                        </Badge>
                        {request.status === 'accepted' && (
                          <div className="mt-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {t(
                                'consultationRequestFixes.consultation.request.join'
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t('consultationRequest.request.noRequest')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('consultationRequest.request.procedure')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationRequest;
