import { getAISummary } from '@/utils/AISummarize';
import { AlertTriangle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type PredictiveCardProps = {
  cancelable?: boolean;
  visible: boolean;
  values?: string | number;
  setVisible: (v: boolean) => void;
  onTabChange?: (tab: string) => void;
};

const PredictiveCard: React.FC<PredictiveCardProps> = ({
  cancelable,
  visible,
  setVisible,
  values,
  onTabChange,
}) => {
  const [summary, setSummary] = useState('');
  const [value, setValue] = useState<string | number>('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (values !== undefined) {
      setValue(values);
    }
    console.log('PredictiveCard values changed: ', values);
  }, [values]);

  useEffect(() => {
    if (visible && values) {
      setSummary('');
      setLoading(true);
      getAISummary(values)
        .then(result => {
          console.log('AI Summary Result:', result);
          setSummary(result);
        })
        .catch(error => {
          setSummary(t('predictiveCard.aiSummary.error'));
          console.error('predictiveCard.aiSummary.error', error);
        })
        .finally(() => setLoading(false));
    }
  }, [visible, values]);

  if (!visible || !value) return null;

  return (
    <div className="relative">
      <div className="rounded-xl p-4 bg-destructive text-destructive-foreground space-y-2">
        {/* Header */}
        <div className="flex items-center gap-2 font-bold text-lg w-full justify-between">
          <div className="flex gap-2 items-center">
            <AlertTriangle className="w-5 h-5" />
            <span>{t('predictiveCard.predictiveAlert.title')}</span>
          </div>

          {cancelable && (
            <button
              onClick={() => setVisible(false)}
              className="p-1 rounded hover:bg-destructive-foreground/10 active:bg-destructive-foreground/20 transition-colors"
              aria-label={t('predictiveCard.predictiveAlert.dismissAria')}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        {loading && (
          <p className="text-sm">
            {t('predictiveCard.predictiveAlert.loading')}
          </p>
        )}
        {summary && <p className="text-sm">{summary}</p>}

        {/* Footer buttons (optional) */}
        {cancelable && (
          <div className="flex gap-3 justify-center pt-2">
            {/* Dismiss button */}
            <button
              onClick={() => setVisible(false)}
              className="px-9 py-2 rounded-lg bg-red-50 text-red-600 font-medium 
                         hover:bg-red-100 active:bg-red-200 
                         transition-colors shadow-sm"
              aria-label={t('predictiveCard.predictiveAlert.dismissAria')}
            >
              {t('predictiveCard.predictiveAlert.dismissAria')}
            </button>

            {/* More Info button */}
            <button
              onClick={() => onTabChange?.('predictive')}
              className="px-9 py-2 rounded-lg bg-[#289496]
                         text-[#fff] font-medium 
                         hover:bg-white active:bg-gray-200 hover:text-[#289496]
                         transition-colors shadow-sm"
              aria-label={t('predictiveCard.predictiveAlert.moreInfoAria')}
            >
              {t('predictiveCard.predictiveAlert.moreInfo')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictiveCard;
