import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  Calendar as CalendarIcon,
  FileText,
  MessageSquare,
  Clock,
  MoreVertical,
  Eye,
  Phone,
  Edit,
  UserPlus,
  Video,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Text,
  Box,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Patient {
  id: string;
  name: string;
  lastConsultation: string;
  nextAppointment?: string;
  notes: string;
  status: string;
  diabetesType: string;
  lastGlucose: string;
}

interface Consultation {
  id: string;
  patient: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: string;
}

export const PatientManagement = () => {
  const { t } = useTranslation();
  const { professionalCode } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isPatientCodeModalOpen, setIsPatientCodeModalOpen] = useState(false);
  const [patientCode, setPatientCode] = useState('');
  const [selectedAction, setSelectedAction] = useState<{
    type: 'view' | 'message' | 'teleconsultation' | 'call' | 'edit';
    patientId: string;
    patientName: string;
  } | null>(null);

  // Modal states
  const [isPatientFileOpen, setIsPatientFileOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isTeleconsultationOpen, setIsTeleconsultationOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [patientsCurrentPage, setPatientsCurrentPage] = useState(1);
  const [consultationsCurrentPage, setConsultationsCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePatientAction = (
    action: 'view' | 'message' | 'teleconsultation' | 'call' | 'edit',
    patientId: string,
    patientName: string
  ) => {
    setSelectedAction({ type: action, patientId, patientName });
    setIsPatientCodeModalOpen(true);
  };

  const handlePatientCodeSubmit = () => {
    if (!patientCode.trim() || !selectedAction) {
      return;
    }

    const patient = patients.find(p => p.id === selectedAction.patientId);
    if (!patient) return;

    setActivePatient(patient);

    // Ouvrir le modal approprié selon le type d'action
    switch (selectedAction.type) {
      case 'view':
        setIsPatientFileOpen(true);
        break;
      case 'message':
        setIsMessageModalOpen(true);
        break;
      case 'teleconsultation':
        setIsTeleconsultationOpen(true);
        break;
      case 'call':
        setIsCallModalOpen(true);
        break;
      case 'edit':
        setIsEditModalOpen(true);
        break;
    }

    // Fermer le modal de code patient
    setIsPatientCodeModalOpen(false);
    setPatientCode('');
    setSelectedAction(null);
  };

  // Pagination logic
  const patientsStartIndex = (patientsCurrentPage - 1) * itemsPerPage;
  const patientsEndIndex = patientsStartIndex + itemsPerPage;
  const consultationsStartIndex = (consultationsCurrentPage - 1) * itemsPerPage;
  const consultationsEndIndex = consultationsStartIndex + itemsPerPage;

  const fetchPatients = async () => {
    if (!professionalCode) return;
    
    setLoading(true);
    try {
      const { data: requests, error } = await supabase
        .from('consultation_requests')
        .select('patient_id, requested_at')
        .eq('professional_code', professionalCode);

      if (error) throw error;

      const patientIds = [...new Set(requests?.map(r => r.patient_id) || [])];
      
      if (patientIds.length === 0) {
        setPatients([]);
        return;
      }

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name, phone')
        .in('user_id', patientIds);

      if (profileError) throw profileError;

      const activePatients = profiles?.map(patient => {
        const latestRequest = requests
          ?.filter(req => req.patient_id === patient.user_id)
          .sort((a, b) => new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime())[0];
        
        return {
          id: patient.user_id,
          name: `${patient.first_name} ${patient.last_name}`,
          lastConsultation: latestRequest?.requested_at || new Date().toISOString(),
          notes: 'Patient suivi via consultation',
          status: 'Stable',
          diabetesType: 'Type 2',
          lastGlucose: '7.2 mmol/L',
        };
      }) || [];

      setPatients(activePatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [professionalCode]);

  const paginatedPatients = patients.slice(
    patientsStartIndex,
    patientsEndIndex
  );
  const totalPatientsPages = Math.ceil(patients.length / itemsPerPage);

  const consultations: Consultation[] = [
    {
      id: '1',
      patient: 'Marie Dubois',
      date: '2024-01-22',
      time: '09:00',
      type: t('professionalDashboard.patients.planning.type.followUp'),
      status: 'scheduled',
      duration: '30min',
    },
    {
      id: '2',
      patient: 'Sophie Laurent',
      date: '2024-01-19',
      time: '14:30',
      type: t('professionalDashboard.patients.planning.type.urgent'),
      status: 'scheduled',
      duration: '45min',
    },
    {
      id: '3',
      patient: 'Pierre Martin',
      date: '2024-01-18',
      time: '11:00',
      type: t('professionalDashboard.patients.planning.type.teleconsultation'),
      status: 'completed',
      duration: '25min',
    },
    {
      id: '4',
      patient: 'Jean Bernard',
      date: '2024-01-17',
      time: '16:00',
      type: t('professionalDashboard.patients.planning.type.first'),
      status: 'completed',
      duration: '60min',
    },
  ];

  const paginatedConsultations = consultations.slice(
    consultationsStartIndex,
    consultationsEndIndex
  );
  const totalConsultationsPages = Math.ceil(
    consultations.length / itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case t('professionalDashboard.patients.lastBloodGlucose.first'):
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {t('professionalDashboard.patients.lastBloodGlucose.first')}
          </Badge>
        );
      case t('professionalDashboard.patients.lastBloodGlucose.third'):
        return (
          <Badge variant="destructive">
            {t('professionalDashboard.patients.lastBloodGlucose.third')}
          </Badge>
        );
      case t('professionalDashboard.patients.lastBloodGlucose.second'):
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {t('professionalDashboard.patients.lastBloodGlucose.second')}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getConsultationStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {t('professionalDashboard.patients.planning.status.scheduled')}
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {t('professionalDashboard.patients.planning.status.completed')}
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            {t('professionalDashboard.patients.planning.status.cancelled')}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="calendar">
            {t('professionalDashboard.patients.calendar')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {t('professionalDashboard.patients.title')} ({patients.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead>Patient</TableHead> */}
                    <TableHead>
                      {t('professionalDashboard.patients.tableHeading.first')}
                    </TableHead>
                    <TableHead>
                      {t('professionalDashboard.patients.tableHeading.second')}
                    </TableHead>
                    <TableHead>
                      {t('professionalDashboard.patients.tableHeading.third')}
                    </TableHead>
                    <TableHead>
                      {t('professionalDashboard.patients.tableHeading.fourth')}
                    </TableHead>
                    <TableHead>
                      {t('professionalDashboard.patients.tableHeading.fifth')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Chargement des patients...
                      </TableCell>
                    </TableRow>
                  ) : paginatedPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Aucun patient trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedPatients.map(patient => (
                      <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {patient.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {patient.nextAppointment &&
                                `Prochain RDV: ${new Date(
                                  patient.nextAppointment
                                ).toLocaleDateString('fr-FR')}`}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.diabetesType}</TableCell>
                      <TableCell>
                        {new Date(patient.lastConsultation).toLocaleDateString(
                          'fr-FR'
                        )}
                      </TableCell>
                      <TableCell>{patient.lastGlucose}</TableCell>
                      <TableCell>{getStatusBadge(patient.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 hover:bg-accent"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="z-[100] min-w-48 bg-background border border-border shadow-md rounded-md p-1"
                            side="bottom"
                            sideOffset={4}
                          >
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5 text-sm"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlePatientAction(
                                  'view',
                                  patient.id,
                                  patient.name
                                );
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {t(
                                'professionalDashboard.patients.dropdownOptions.first'
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5 text-sm"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlePatientAction(
                                  'message',
                                  patient.id,
                                  patient.name
                                );
                              }}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              {t(
                                'professionalDashboard.patients.dropdownOptions.second'
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5 text-sm"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlePatientAction(
                                  'edit',
                                  patient.id,
                                  patient.name
                                );
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              {t(
                                'professionalDashboard.patients.dropdownOptions.fifth'
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Patients Pagination */}
              <div className="flex items-center justify-between px-2 py-4">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground">
                    Showing {patientsStartIndex + 1} to{' '}
                    {Math.min(patientsEndIndex, patients.length)} of{' '}
                    {patients.length} patients
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">Rows per page:</span>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={itemsPerPage}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 5;
                        setItemsPerPage(value);
                        setPatientsCurrentPage(1);
                      }}
                      className="w-16 h-8 text-center"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPatientsCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={patientsCurrentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm">
                    Page {patientsCurrentPage} of {totalPatientsPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPatientsCurrentPage(prev =>
                        Math.min(prev + 1, totalPatientsPages)
                      )
                    }
                    disabled={patientsCurrentPage === totalPatientsPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {t('professionalDashboard.patients.planning.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      {t(
                        'professionalDashboard.patients.planning.tableHeading.time'
                      )}
                    </TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      {t(
                        'professionalDashboard.patients.planning.tableHeading.duration'
                      )}
                    </TableHead>
                    <TableHead>
                      {t(
                        'professionalDashboard.patients.planning.tableHeading.status'
                      )}
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedConsultations.map(consultation => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">
                        {new Date(consultation.date).toLocaleDateString(
                          'fr-FR'
                        )}
                      </TableCell>
                      <TableCell>{consultation.time}</TableCell>
                      <TableCell>{consultation.patient}</TableCell>
                      <TableCell>{consultation.type}</TableCell>
                      <TableCell>{consultation.duration}</TableCell>
                      <TableCell>
                        {getConsultationStatusBadge(consultation.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="z-50 bg-background border shadow-lg"
                          >
                            {consultation.status === 'scheduled' && (
                              <DropdownMenuItem className="cursor-pointer">
                                <Video className="mr-2 h-4 w-4" />
                                {t(
                                  'professionalDashboard.patients.planning.actions.start'
                                )}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              {t(
                                'professionalDashboard.patients.planning.actions.view'
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              {t(
                                'professionalDashboard.patients.planning.actions.edit'
                              )}
                            </DropdownMenuItem>
                            {consultation.status === 'scheduled' && (
                              <DropdownMenuItem className="cursor-pointer text-red-600">
                                <Clock className="mr-2 h-4 w-4" />
                                {t(
                                  'professionalDashboard.patients.planning.actions.cancel'
                                )}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Consultations Pagination */}
              <div className="flex items-center justify-between px-2 py-4">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground">
                    Showing {consultationsStartIndex + 1} to{' '}
                    {Math.min(consultationsEndIndex, consultations.length)} of{' '}
                    {consultations.length} consultations
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">Rows per page:</span>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={itemsPerPage}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 5;
                        setItemsPerPage(value);
                        setConsultationsCurrentPage(1);
                      }}
                      className="w-16 h-8 text-center"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setConsultationsCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={consultationsCurrentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm">
                    Page {consultationsCurrentPage} of {totalConsultationsPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setConsultationsCurrentPage(prev =>
                        Math.min(prev + 1, totalConsultationsPages)
                      )
                    }
                    disabled={
                      consultationsCurrentPage === totalConsultationsPages
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {t('professionalDashboard.patients.calendarScreen.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {t(
                    'professionalDashboard.patients.calendarScreen.consulationOf'
                  )}{' '}
                  {selectedDate?.toLocaleDateString('fr-FR')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultations
                    .filter(
                      c =>
                        new Date(c.date).toDateString() ===
                        selectedDate?.toDateString()
                    )
                    .map(consultation => (
                      <div
                        key={consultation.id}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {consultation.time} - {consultation.patient}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {consultation.type}
                            </p>
                          </div>
                          {getConsultationStatusBadge(consultation.status)}
                        </div>
                      </div>
                    ))}
                  {consultations.filter(
                    c =>
                      new Date(c.date).toDateString() ===
                      selectedDate?.toDateString()
                  ).length === 0 && (
                    <p className="text-muted-foreground">
                      {t(
                        'professionalDashboard.patients.calendarScreen.scheduled'
                      )}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal pour saisir le code patient */}
      <Modal
        isOpen={isPatientCodeModalOpen}
        onClose={() => {
          setIsPatientCodeModalOpen(false);
          setPatientCode('');
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="sm" borderRadius="lg" p={2}>
          <ModalHeader>
            {t('patientManagement.patientCodeModal.title')}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={4}>
            <Text fontSize="sm" color="gray.600" mb={4}>
              {t('patientManagement.patientCodeModal.description')}
            </Text>

            <FormControl mb={4}>
              <FormLabel fontSize="sm" fontWeight="medium">
                {t('patientManagement.patientCodeModal.enterCodeFor', {
                  patientName: selectedAction?.patientName,
                })}
              </FormLabel>
              <Input
                type="text"
                placeholder={t(
                  'patientManagement.patientCodeModal.placeholder'
                )}
                value={patientCode}
                onChange={e => setPatientCode(e.target.value.toUpperCase())}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handlePatientCodeSubmit();
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="flex-end" gap={3}>
            <Button
              variant="outline"
              onClick={() => {
                setIsPatientCodeModalOpen(false);
                setPatientCode('');
              }}
            >
              {t('patientManagement.patientCodeModal.cancel')}
            </Button>

            <Button
              colorScheme="blue"
              onClick={handlePatientCodeSubmit}
              isDisabled={!patientCode.trim()}
            >
              {t('patientManagement.patientCodeModal.access')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Dossier Patient */}
      <Modal
        isOpen={isPatientFileOpen}
        onClose={() => setIsPatientFileOpen(false)}
        size="4xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxH="80vh" borderRadius="lg">
          <ModalHeader>
            {t('patientManagement.patientFile.title', {
              patientName: activePatient?.name,
            })}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text fontSize="sm" color="gray.600" mb={4}>
              {t('patientManagement.patientFile.description')}
            </Text>

            {activePatient && (
              <>
                <SimpleGrid columns={[1, 2]} spacing={4} mb={6}>
                  <Box>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      {t('patientManagement.patientFile.name')}
                    </FormLabel>
                    <Text fontSize="lg" fontWeight="semibold">
                      {activePatient.name}
                    </Text>
                  </Box>

                  <Box>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      {t('patientManagement.patientFile.diabetesType')}
                    </FormLabel>
                    <Text>{activePatient.diabetesType}</Text>
                  </Box>

                  <Box>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      {t('patientManagement.patientFile.lastGlucose')}
                    </FormLabel>
                    <Text>{activePatient.lastGlucose}</Text>
                  </Box>

                  <Box>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      {t('patientManagement.patientFile.status')}
                    </FormLabel>
                    <Box>{getStatusBadge(activePatient.status)}</Box>
                  </Box>
                </SimpleGrid>

                <Box mb={6}>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    {t('patientManagement.patientFile.medicalNotes')}
                  </FormLabel>
                  <Box bg="gray.50" p={3} borderRadius="md">
                    <Text>{activePatient.notes}</Text>
                  </Box>
                </Box>

                <Box>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    {t('patientManagement.patientFile.lastConsultation')}
                  </FormLabel>
                  <Text>
                    {new Date(
                      activePatient.lastConsultation
                    ).toLocaleDateString('fr-FR')}
                  </Text>

                  {activePatient.nextAppointment && (
                    <>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="medium"
                        mt={3}
                        display="block"
                      >
                        {t('patientManagement.patientFile.nextAppointment')}
                      </FormLabel>
                      <Text>
                        {new Date(
                          activePatient.nextAppointment
                        ).toLocaleDateString('fr-FR')}
                      </Text>
                    </>
                  )}
                </Box>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => setIsPatientFileOpen(false)}
            >
              {t('patientManagement.patientFile.close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 💬 Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader>
            {t('patientManagement.messageModal.title', {
              patientName: activePatient?.name,
            })}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text fontSize="sm" color="gray.600" mb={4}>
              {t('patientManagement.messageModal.description')}
            </Text>

            <FormControl mb={4}>
              <FormLabel>
                {t('patientManagement.messageModal.subject')}
              </FormLabel>
              <Input
                placeholder={t(
                  'patientManagement.messageModal.subjectPlaceholder'
                )}
              />
            </FormControl>

            <FormControl>
              <FormLabel>
                {t('patientManagement.messageModal.content')}
              </FormLabel>
              <Textarea
                placeholder={t(
                  'patientManagement.messageModal.contentPlaceholder'
                )}
                minH="8rem"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="flex-end" gap={3}>
            <Button
              variant="outline"
              onClick={() => setIsMessageModalOpen(false)}
            >
              {t('patientManagement.messageModal.cancel')}
            </Button>
            <Button colorScheme="blue">
              <Send className="mr-2 h-4 w-4" />
              {t('patientManagement.messageModal.send')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Téléconsultation */}
      <Dialog
        open={isTeleconsultationOpen}
        onOpenChange={setIsTeleconsultationOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {t('patientManagement.teleconsultation.title', {
                patientName: activePatient?.name,
              })}
            </DialogTitle>
            <DialogDescription>
              {t('patientManagement.teleconsultation.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">
                  {t('patientManagement.teleconsultation.interfaceTitle')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('patientManagement.teleconsultation.interfaceSubtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">
                  {t('patientManagement.teleconsultation.patientLabel')}
                </Label>
                <p>{activePatient?.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  {t('patientManagement.teleconsultation.durationLabel')}
                </Label>
                <p>
                  {t('patientManagement.teleconsultation.durationValue', {
                    minutes: 30,
                  })}
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="consultation-notes">
                {t('patientManagement.teleconsultation.notesLabel')}
              </Label>
              <Textarea
                id="consultation-notes"
                placeholder={t(
                  'patientManagement.teleconsultation.notesPlaceholder'
                )}
                className="min-h-24"
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsTeleconsultationOpen(false)}
              >
                {t('patientManagement.teleconsultation.close')}
              </Button>

              <div className="space-x-2">
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('patientManagement.teleconsultation.audioOnly')}
                </Button>
                <Button>
                  <Video className="mr-2 h-4 w-4" />
                  {t('patientManagement.teleconsultation.startVideo')}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Appel */}
      <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t('patientManagement.call.title', {
                patientName: activePatient?.name,
              })}
            </DialogTitle>
            <DialogDescription>
              {t('patientManagement.call.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-center">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="h-8 w-8 text-primary" />
            </div>

            <div>
              <p className="font-medium text-lg">{activePatient?.name}</p>
              <p className="text-muted-foreground">
                {t('patientManagement.call.ready')}
              </p>
            </div>

            <div>
              <Label htmlFor="phone-notes">
                {t('patientManagement.call.notesLabel')}
              </Label>
              <Textarea
                id="phone-notes"
                placeholder={t('patientManagement.call.notesPlaceholder')}
                className="min-h-20"
              />
            </div>

            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCallModalOpen(false)}
              >
                {t('patientManagement.call.cancel')}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-4 w-4" />
                {t('patientManagement.call.dial')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Édition du profil */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl" p={4}>
          <ModalHeader>
            {t('patientManagement.editProfile.title', {
              patientName: activePatient?.name,
            })}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-gray-500 mb-4">
              {t('patientManagement.editProfile.description')}
            </p>

            {activePatient && (
              <div className="space-y-4">
                {/* Name and Diabetes Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormControl>
                    <FormLabel htmlFor="edit-name">
                      {t('patientManagement.editProfile.name')}
                    </FormLabel>
                    <Input
                      id="edit-name"
                      defaultValue={activePatient.name}
                      focusBorderColor="blue.500"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="edit-diabetes-type">
                      {t('patientManagement.editProfile.diabetesType')}
                    </FormLabel>
                    <Input
                      id="edit-diabetes-type"
                      defaultValue={activePatient.diabetesType}
                      focusBorderColor="blue.500"
                    />
                  </FormControl>
                </div>

                {/* Status */}
                <FormControl>
                  <FormLabel htmlFor="edit-status">
                    {t('patientManagement.editProfile.status')}
                  </FormLabel>
                  <Select
                    id="edit-status"
                    defaultValue={activePatient.status}
                    focusBorderColor="blue.500"
                  >
                    <option value="stable">
                      {t('patientManagement.editProfile.statusOptions.stable')}
                    </option>
                    <option value="attention">
                      {t(
                        'patientManagement.editProfile.statusOptions.attention'
                      )}
                    </option>
                    <option value="amélioration">
                      {t(
                        'patientManagement.editProfile.statusOptions.improving'
                      )}
                    </option>
                  </Select>
                </FormControl>

                {/* Glucose */}
                <FormControl>
                  <FormLabel htmlFor="edit-glucose">
                    {t('patientManagement.editProfile.lastGlucose')}
                  </FormLabel>
                  <Input
                    id="edit-glucose"
                    defaultValue={activePatient.lastGlucose}
                    focusBorderColor="blue.500"
                  />
                </FormControl>

                {/* Notes */}
                <FormControl>
                  <FormLabel htmlFor="edit-notes">
                    {t('patientManagement.editProfile.notes')}
                  </FormLabel>
                  <Textarea
                    id="edit-notes"
                    defaultValue={activePatient.notes}
                    minH="120px"
                    focusBorderColor="blue.500"
                  />
                </FormControl>

                {/* Next Appointment */}
                <FormControl>
                  <FormLabel htmlFor="edit-next-appointment">
                    {t('patientManagement.editProfile.nextAppointment')}
                  </FormLabel>
                  <Input
                    id="edit-next-appointment"
                    type="date"
                    defaultValue={activePatient.nextAppointment}
                    focusBorderColor="blue.500"
                  />
                </FormControl>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => setIsEditModalOpen(false)}
            >
              {t('patientManagement.editProfile.cancel')}
            </Button>
            <Button colorScheme="blue">
              {t('patientManagement.editProfile.save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
