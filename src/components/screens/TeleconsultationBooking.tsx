import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  Clock,
  Video,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface Professional {
  id: string;
  first_name: string;
  last_name: string;
  professional_type: string;
  specialty: string;
  city: string;
  institution: string;
  rate: number;
  rating: number;
  consultations_count: number;
  next_available: string | null;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const TeleconsultationBooking = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [filters, setFilters] = useState({
    specialty: '',
    city: '',
    search: '',
  });
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      const { data: applicationsData } = await supabase
        .from('professional_applications')
        .select(
          `
          id,
          first_name,
          last_name,
          professional_type,
          city,
          institution,
          status
        `
        )
        .eq('status', 'approved');

      const { data: ratesData } = await supabase
        .from('professional_rates')
        .select('*');

      if (applicationsData && ratesData) {
        const professionalsWithRates = applicationsData.map(prof => {
          const rate = ratesData.find(
            r => r.specialty === prof.professional_type
          );
          return {
            ...prof,
            specialty: prof.professional_type,
            rate: rate?.rate_per_consultation || 500,
            rating: 4.5 + Math.random() * 0.5, // Mock rating
            consultations_count: Math.floor(Math.random() * 100) + 10, // Mock count
            next_available: new Date(
              Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          };
        });
        setProfessionals(professionalsWithRates);
      }
    } catch (error) {
      console.error('Error loading professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = (date: string, professionalId: string) => {
    // Génération mock des créneaux disponibles
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        slots.push({
          time,
          available: Math.random() > 0.3, // 70% de disponibilité
        });
      }
    }

    setTimeSlots(slots);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (selectedProfessional) {
      generateTimeSlots(date, selectedProfessional.id);
    }
  };

  const handleBookConsultation = async () => {
    if (!selectedProfessional || !selectedDate || !selectedTime || !user) {
      toast({
        title: t('teleconsultationBooking.toast.missing_info.title'),
        description: t(
          'teleconsultationBooking.toast.missing_info.description'
        ),
        variant: 'destructive',
      });
      return;
    }

    setBookingLoading(true);
    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}:00`);

      const { error } = await supabase.from('teleconsultations').insert({
        professional_id: selectedProfessional.id,
        patient_id: user.id,
        scheduled_at: scheduledAt.toISOString(),
        status: 'scheduled',
        amount_charged: selectedProfessional.rate,
      });

      if (error) throw error;

      toast({
        title: t('teleconsultationBooking.toast.consultation_booked.title'),
        description: t(
          'teleconsultationBooking.toast.consultation_booked.description',
          {
            firstName: selectedProfessional.first_name,
            lastName: selectedProfessional.last_name,
            date: new Date(scheduledAt).toLocaleDateString('fr-FR'),
            time: selectedTime,
          }
        ),
      });

      // Reset form
      setSelectedProfessional(null);
      setSelectedDate('');
      setSelectedTime('');
      setTimeSlots([]);
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast({
        title: t('teleconsultationBooking.toast.booking_error.title'),
        description: t(
          'teleconsultationBooking.toast.booking_error.description'
        ),
        variant: 'destructive',
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(prof => {
    return (
      (!filters.specialty ||
        filters.specialty === 'all' ||
        prof.specialty === filters.specialty) &&
      (!filters.city ||
        prof.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.search ||
        `${prof.first_name} ${prof.last_name}`
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        prof.institution?.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const getSpecialtyIcon = (specialty: string) => {
    const icons: Record<string, string> = {
      endocrinologist: '🩺',
      psychologist: '🧠',
      nutritionist: '🥗',
      nurse: '👩‍⚕️',
      diabetologist: '💉',
      general_practitioner: '👨‍⚕️',
    };
    return icons[specialty] || '👨‍⚕️';
  };

  const getSpecialtyName = (specialty: string) => {
    const names: Record<string, string> = {
      endocrinologist: t('teleconsultationBooking.professions.endocrinologist'),
      psychologist: t('teleconsultationBooking.professions.psychologist'),
      nutritionist: t('teleconsultationBooking.professions.nutritionist'),
      nurse: t('teleconsultationBooking.professions.nurse'),
      diabetologist: t('teleconsultationBooking.professions.diabetologist'),
      general_practitioner: t(
        'teleconsultationBooking.professions.general_practitioner'
      ),
    };
    return names[specialty] || specialty;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('teleconsultationBooking.teleconsultation_title')}
        </h1>
        <p className="text-muted-foreground">
          {t('teleconsultationBooking.teleconsultation_description')}
        </p>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t('teleconsultationBooking.search_filters')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">
                {t('teleconsultationBooking.search_label')}
              </Label>

              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nom, institution..."
                  value={filters.search}
                  onChange={e =>
                    setFilters(prev => ({ ...prev, search: e.target.value }))
                  }
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialty">
                {t('teleconsultationBooking.specialty_label')}
              </Label>

              <Select
                value={filters.specialty}
                onValueChange={value =>
                  setFilters(prev => ({ ...prev, specialty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t('teleconsultationBooking.all_specialties')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('teleconsultationBooking.all_specialties')}
                  </SelectItem>
                  <SelectItem value="endocrinologist">
                    {t('teleconsultationBooking.professions.endocrinologist')}
                  </SelectItem>
                  <SelectItem value="endocrinologist">
                    {t('teleconsultationBooking.endocrinologist')}
                  </SelectItem>
                  <SelectItem value="diabetologist">
                    {t('teleconsultationBooking.diabetologist')}
                  </SelectItem>
                  <SelectItem value="nutritionist">
                    {t('teleconsultationBooking.nutritionist')}
                  </SelectItem>
                  <SelectItem value="psychologist">
                    {t('teleconsultationBooking.psychologist')}
                  </SelectItem>
                  <SelectItem value="nurse">
                    {t('teleconsultationBooking.nurse')}
                  </SelectItem>
                  <SelectItem value="general_practitioner">
                    {t('teleconsultationBooking.general_practitioner')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city">
                {t('teleconsultationBooking.city_label')}
              </Label>
              <Input
                id="city"
                placeholder={t('teleconsultationBooking.city_placeholder')}
                value={filters.city}
                onChange={e =>
                  setFilters(prev => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des professionnels */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t('teleconsultationBooking.available_professionals')} (
              {filteredProfessionals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {filteredProfessionals.map(professional => (
              <div
                key={professional.id}
                onClick={() => setSelectedProfessional(professional)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedProfessional?.id === professional.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {getSpecialtyIcon(professional.specialty)}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Dr. {professional.first_name} {professional.last_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getSpecialtyName(professional.specialty)}
                      </p>
                      {professional.institution && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {professional.institution}, {professional.city}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">
                            {professional.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {professional.consultations_count} consultations
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {professional.rate} F CFA
                    </Badge>
                    {professional.next_available && (
                      <p className="text-xs text-muted-foreground">
                        {t('teleconsultationBooking.next_slot')}
                        <br />
                        {new Date(
                          professional.next_available
                        ).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Réservation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {t('teleconsultationBooking.book_consultation')}
            </CardTitle>
            {selectedProfessional && (
              <CardDescription>
                Dr. {selectedProfessional.first_name}{' '}
                {selectedProfessional.last_name} -{' '}
                {getSpecialtyName(selectedProfessional.specialty)}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedProfessional ? (
              <div className="text-center py-8">
                <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t('teleconsultationBooking.select_professional')}
                </p>
              </div>
            ) : (
              <>
                <div>
                  <Label htmlFor="date">
                    {t('teleconsultationBooking.consultation_date_label')}
                  </Label>

                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={e => handleDateChange(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {selectedDate && timeSlots.length > 0 && (
                  <div>
                    <Label>
                      {t('teleconsultationBooking.available_time_slots')}
                    </Label>

                    <div className="grid grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto">
                      {timeSlots.map(slot => (
                        <Button
                          key={slot.time}
                          variant={
                            selectedTime === slot.time ? 'default' : 'outline'
                          }
                          size="sm"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="text-xs"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {t('teleconsultationBooking.summary')}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>
                          {t('teleconsultationBooking.professional_label')}:
                        </strong>{' '}
                        Dr. {selectedProfessional.first_name}{' '}
                        {selectedProfessional.last_name}
                      </p>
                      <p>
                        <strong>
                          {t('teleconsultationBooking.date_label')}:
                        </strong>{' '}
                        {new Date(selectedDate).toLocaleDateString('fr-FR')}
                      </p>
                      <p>
                        <strong>
                          {t('teleconsultationBooking.time_label')}:
                        </strong>{' '}
                        {selectedTime}
                      </p>
                      <p>
                        <strong>
                          {t('teleconsultationBooking.rate_label')}:
                        </strong>{' '}
                        {selectedProfessional.rate} F CFA
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBookConsultation}
                  disabled={!selectedDate || !selectedTime || bookingLoading}
                  className="w-full"
                >
                  {bookingLoading ? (
                    t('teleconsultationBooking.booking_loading')
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      {t('teleconsultationBooking.book_and_pay')} -{' '}
                      {selectedProfessional.rate} F CFA
                    </>
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeleconsultationBooking;
