import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Copy,
  User,
  Calendar,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const PaymentSuccess: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [patientCode, setPatientCode] = useState<string>('');
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const items = [
    t('paymentSuccess.benefits.list.fullAccess'),
    t('paymentSuccess.benefits.list.consultations'),
    t('paymentSuccess.benefits.list.chatNews'),
    t('paymentSuccess.benefits.list.alerts'),
  ];

  useEffect(() => {
    // Check if coming from successful Flutterwave payment
    const flutterwaveSuccess = searchParams.get('flw_success') || localStorage.getItem('flw_payment_success');
    const sessionId = searchParams.get('session_id');
    const testMode = searchParams.get('test_mode');

    if (flutterwaveSuccess === 'true' || sessionId || testMode === 'true') {
      // Generate patient code and simulate successful subscription
      const generatedCode = `KLU${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setPatientCode(generatedCode);
      setSubscriptionDetails({
        current_period_end: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
      setLoading(false);

      // Clear the success flag
      localStorage.removeItem('flw_payment_success');

      toast({
        title: t('paymentSuccess.toast.paymentConfirmed.title'),
        description: t('paymentSuccess.toast.paymentConfirmed.description'),
      });
    } else {
      setError(t('paymentSuccess.errors.missingSessionId'));
      setLoading(false);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    // console.log(sessionId);
    try {
      const { data, error } = await supabase.functions.invoke(
        'verify-payment',
        {
          body: { sessionId },
        }
      );

      // console.log(`data: ${data}`, `error: ${error}`);

      if (error) throw error;

      if (data.success) {
        setPatientCode(data.patientCode);
        setSubscriptionDetails(data.subscription);

        toast({
          title: t('paymentSuccess.payment.successTitle'),
          description: t('paymentSuccess.payment.successDescription'),
        });
      } else {
        throw new Error(t('paymentSuccess.payment.verifyError'));
      }
    } catch (err: any) {
      setError(err.message || t('payment.verifyError'));
      // console.log('Payment verification error:', err);

      toast({
        title: t('common.error'), // if you already have a "Erreur / Error" key in common.json
        description: t('payment.verifyErrorToast'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPatientCode = () => {
    navigator.clipboard.writeText(patientCode);
    toast({
      title: t('paymentSuccess.toast.copyCode.title'),
      description: t('paymentSuccess.toast.copyCode.description', {
        code: patientCode,
      }),
    });
  };

  const goToProfile = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>{t('paymentSuccess.payment.verifying')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/10 to-muted/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-xl font-semibold text-destructive">
              {t('paymentSuccess.payment.errorTitle')}
            </h3>
            <p className="text-muted-foreground">
              {t('paymentSuccess.payment.errorMessage', { error })}
            </p>
            <Button onClick={() => navigate('/auth')} variant="outline">
              {t('paymentSuccess.payment.backToAuth')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <CardTitle className="text-2xl text-success">
            {t('paymentSuccess.payment.successTitle')}
          </CardTitle>
          <p className="text-muted-foreground">
            {t('paymentSuccess.payment.successMessage')}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Code Patient */}
          <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('paymentSuccess.patient.codeTitle')}
            </h3>
            <div className="bg-background rounded-lg p-4 mb-4">
              <div className="text-3xl font-bold text-primary tracking-wider">
                {patientCode}
              </div>
            </div>
            <Button
              onClick={copyPatientCode}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              Copier le code
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {t('paymentSuccess.patient.codeUsage')}
            </p>
          </div>

          {/* Détails de l'abonnement */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">
                {t('paymentSuccess.subscription.status')}
              </span>
              <Badge className="bg-success/10 text-success border-success/20">
                {t('paymentSuccess.subscription.active')}
              </Badge>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">
                {t('paymentSuccess.account.email')}
              </span>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>

            {subscriptionDetails?.current_period_end && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">
                  {t('paymentSuccess.billing.next')}
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(
                      subscriptionDetails.current_period_end
                    ).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Avantages */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">
              {t('paymentSuccess.benefits.title')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Email de confirmation */}
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  {t('paymentSuccess.confirmationEmail.title')}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {t('paymentSuccess.confirmationEmail.message', {
                    email: user?.email,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={goToProfile} className="flex-1 gap-2">
              <User className="w-4 h-4" />
              {t('paymentSuccess.buttons.completeProfile')}
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1 gap-2"
            >
              {t('paymentSuccess.buttons.accessApp')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
