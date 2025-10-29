import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useGlucose } from '@/contexts/GlucoseContext';
import { useTranslation } from 'react-i18next';
import { useMeals } from '@/contexts/MealContext';
import { useMedications } from '@/contexts/MedicationContext';
import { useActivities } from '@/contexts/ActivityContext';
import { useThemeStore } from '@/store/useThemeStore';
import ActivityModal from '../modals/ActivityModal';
import MedicationModal from '../modals/MedicationModal';
import MealModal from '../modals/ScanMealModal';
import AddGlucoseModal from '../modals/AddGlucoseModal';
import BarcodeScanModal from '../modals/BarcodeScanModal';
import PhotoUploadModal from '../modals/PhotoUploadModal';
import PhotoAnalysisModal from '../modals/PhotoAnalysisModal';
import {
  BookOpen,
  MessageCircle,
  Stethoscope,
  Users,
  Lock,
} from 'lucide-react';
import DynamicAlert from './DynamicAlert';

interface ActionsRapidesProps {
  onTabChange?: (tab: string) => void;
  onGlucoseSubmit: (value: string) => void;
  onGlycemieClick: () => void;
  onMedicamentClick: () => void;
  onMealClick: () => void;
  onActivityClick: () => void;
  isReadOnly?: boolean;
}

const ActionsRapides: React.FC<ActionsRapidesProps> = ({
  onTabChange,
  onGlucoseSubmit,
  isReadOnly = false,
}) => {
  const { addReading } = useGlucose();
  const { t } = useTranslation();
  const { addMeal } = useMeals();
  const { addMedication } = useMedications();
  const { addActivity } = useActivities();
  const { darkMode } = useThemeStore();
  const { toast } = useToast();

  // States
  const [isGlucoseModalOpen, setIsGlucoseModalOpen] = useState(false);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    variant: 'info' as 'info' | 'success' | 'warning' | 'error',
  });

  const [glucoseValue, setGlucoseValue] = useState('');
  const [glucoseNotes, setGlucoseNotes] = useState('');
  const [glucoseLoading, setGlucoseLoading] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [carbs, setCarbs] = useState('');

  // Handler to show read-only message
  const handleReadOnlyClick = () => {
    toast({
      title: '🔒 Read-Only Access',
      description: 'You can view but not add or edit data',
      variant: 'default',
    });
  };

  // Handlers
  const showAlert = (
    title: string,
    message: string,
    variant: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    setAlertConfig({ title, message, variant });
    setAlertVisible(true);
  };

  const handleGlucoseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!glucoseValue) return;

    setGlucoseLoading(true);
    addReading({
      value: parseFloat(glucoseValue),
      notes: glucoseNotes,
      createdAt: new Date(),
    });
    onGlucoseSubmit?.(glucoseValue);
    showAlert(
      t('Actions.actionsPopover.saved'),
      `${glucoseValue} mg/dL`,
      'success'
    );
    toast({
      title: t('Actions.glucoseSaved'),
      description: 'glucose added sucessfully ',
      variant: 'success',
    });

    setGlucoseValue('');
    setGlucoseNotes('');
    setGlucoseLoading(false);
    setIsGlucoseModalOpen(false);
  };

  const handleMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!foodName || !carbs) return;

    try {
      await addMeal({
        meal_name: foodName,
        total_carbs: parseFloat(carbs),
        meal_time: new Date(),
      });

      toast({ title: t('Actions.mealSaved') });

      setFoodName('');
      setCarbs('');
      setIsMealModalOpen(false);
    } catch (err) {
      console.error('Error saving meal:', err);
      toast({
        title: 'Error',
        description: 'Failed to save meal.',
        variant: 'destructive',
      });
    }
  };

  const handleRappelsClick = () => {
    onTabChange?.('reminders');
  };
  const handleInsulinClick = () => {
    onTabChange?.('insulin');
  };
  const handleBiomarkerClick = () => {
    onTabChange?.('biomarker');
  };
  const handleTelehealth = () => {
    onTabChange?.('consultation-request');
  };
  const handleFamily = () => {
    onTabChange?.('family');
  };
  const handleChat = () => {
    onTabChange?.('chat');
  };
  const handleBlog = () => {
    onTabChange?.('blog');
  };

  const bgCard = 'bg-card';
  const textCard = 'text-card-foreground';
  const bgButtonLight = 'bg-accent/20 hover:bg-accent/30';
  const bgButtonDark = 'bg-primary/20 hover:bg-primary/30';
  const textButton = 'text-foreground';

  return (
    <div className="px-3 sm:px-4">
      <div
        className={`rounded-xl p-4 sm:p-6 shadow-md transition-colors ${bgCard} ${textCard}`}
      >
        <h3 className={`font-semibold mb-3 sm:mb-4 ${textCard}`}>
          {t('Actions.actions')}
        </h3>

        {/* Read-Only Warning Banner */}
        {isReadOnly && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-2">
            <Lock className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700 dark:text-yellow-300">
              👁️ View-only mode - You can see but not add or edit data
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Glycémie */}
          <button
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={
              isReadOnly
                ? handleReadOnlyClick
                : () => setIsGlucoseModalOpen(true)
            }
            disabled={isReadOnly}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-2">
              <span className="text-lg sm:text-xl">🩸</span>
            </div>
            <span
              className={`text-xs sm:text-sm font-medium text-center ${textButton}`}
            >
              {t('Actions.actionsPopover.bloodSugar.increment')}
            </span>
            {isReadOnly && (
              <Lock className="w-3 h-3 mt-1 text-muted-foreground" />
            )}
          </button>

          <Modal
            isOpen={isGlucoseModalOpen}
            onClose={() => setIsGlucoseModalOpen(false)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent py={3} className={`${bgCard} ${textCard}`}>
              <ModalHeader>📊 {t('Actions.actionsPopover.title')}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleGlucoseSubmit} className="space-y-4 py-6">
                  <div>
                    <Label htmlFor="glucose">
                      {t('Actions.actionsPopover.input1')} (mg/dL)
                    </Label>
                    <Input
                      id="glucose"
                      type="number"
                      placeholder="Ex: 120"
                      value={glucoseValue}
                      onChange={e => setGlucoseValue(e.target.value)}
                      className="mt-1"
                      autoFocus
                    />
                  </div>
                  <div>
                    <Label htmlFor="glucoseNotes">
                      Notes ({t('Actions.actionsPopover.notes')})
                    </Label>
                    <Input
                      id="glucoseNotes"
                      placeholder={t('Actions.actionsPopover.comments')}
                      value={glucoseNotes}
                      onChange={e => setGlucoseNotes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={glucoseLoading}
                  >
                    {glucoseLoading
                      ? t('actionsRapides.loadingSave')
                      : t('Actions.button')}
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Meals */}
          <button
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={
              isReadOnly ? handleReadOnlyClick : () => setIsMealModalOpen(true)
            }
            disabled={isReadOnly}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-800 rounded-full flex items-center justify-center mb-2">
              🍽️
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('Actions.addMeal')}
            </span>
            {isReadOnly && (
              <Lock className="w-3 h-3 mt-1 text-muted-foreground" />
            )}
          </button>

          {/* Medication */}
          <button
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={
              isReadOnly
                ? handleReadOnlyClick
                : () => setIsMedicationModalOpen(true)
            }
            disabled={isReadOnly}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
              💊
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('Actions.addMedication')}
            </span>
            {isReadOnly && (
              <Lock className="w-3 h-3 mt-1 text-muted-foreground" />
            )}
          </button>

          {/* Activities */}
          <button
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={
              isReadOnly
                ? handleReadOnlyClick
                : () => setIsActivityModalOpen(true)
            }
            disabled={isReadOnly}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-2">
              🏃
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('Actions.addActivity')}
            </span>
            {isReadOnly && (
              <Lock className="w-3 h-3 mt-1 text-muted-foreground" />
            )}
          </button>

          {/* Navigation buttons (always enabled) */}
          <button
            onClick={handleRappelsClick}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-medical-teal rounded-full flex items-center justify-center mb-2">
              ⏰
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('Actions.reminders')}
            </span>
          </button>

          <button
            onClick={handleTelehealth}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
              🏥
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('nav.teleconsultation')}
            </span>
          </button>

          <button
            onClick={handleFamily}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-medical-green-light rounded-full flex items-center justify-center mb-2">
              👨‍👩‍👧‍👦
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('nav.family')}
            </span>
          </button>

          <button
            onClick={handleChat}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#008000] rounded-full flex items-center justify-center mb-2">
              📩
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('nav.chat')}
            </span>
          </button>

          <button
            onClick={handleBlog}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
              📖
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              {t('nav.blog')}
            </span>
          </button>

          <button
            onClick={handleInsulinClick}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
              💉
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              Insulin Dosage
            </span>
          </button>

          <button
            onClick={handleBiomarkerClick}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors active:scale-95 ${
              darkMode ? bgButtonDark : bgButtonLight
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center mb-2">
              🩺
            </div>
            <span className={`text-xs sm:text-sm font-medium ${textButton}`}>
              Biomarker Tracker
            </span>
          </button>
        </div>

        {/* Modals - only open if not read-only */}
        {!isReadOnly && (
          <>
            <Modal
              isOpen={isMealModalOpen}
              onClose={() => setIsMealModalOpen(false)}
              isCentered
            >
              {/* ...existing meal modal content... */}
            </Modal>

            <MedicationModal
              isOpen={isMedicationModalOpen}
              onClose={() => setIsMedicationModalOpen(false)}
            />

            <ActivityModal
              isOpen={isActivityModalOpen}
              onClose={() => setIsActivityModalOpen(false)}
            />

            <BarcodeScanModal
              isOpen={isBarcodeModalOpen}
              onClose={setIsBarcodeModalOpen}
            />

            <PhotoAnalysisModal
              isOpen={isPhotoModalOpen}
              onClose={setIsPhotoModalOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ActionsRapides;
