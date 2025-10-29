'use client';

import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface InvitePartnerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function InvitePartnerModal({
  open,
  onClose,
}: InvitePartnerModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [relation, setRelation] = useState('');
  const [access, setAccess] = useState('read_only');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { t } = useTranslation();
  const { profile } = useAuth();

  const handleSend = async () => {
    if (!profile?.access_code) {
      toast({
        title: 'Error',
        description: 'Patient access code not found',
        variant: 'destructive',
      });
      return;
    }

    if (!name || !phone || !relation) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Create family member directly
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .insert({
          patient_user_id: profile.user_id,
          patient_code: profile.access_code,
          full_name: name,
          phone: phone,
          relation: relation,
          permission_level: access, // 'read_only' or 'full_access'
          profession: profession || null,
          city: city || null,
          country: country || null,
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // 2. Prepare SMS message (no need for access_requests table)
      const smsMessage = `Hi ${name}! You've been added as ${relation} for ${profile.first_name}'s diabetes care. Use access code: ${profile.access_code} to login at klukoo.com/auth`;

      // TODO: Send actual SMS via your SMS service
      console.log('SMS to send:', {
        to: phone,
        message: smsMessage,
      });

      toast({
        title: 'Success!',
        description: `${name} has been added and will receive an SMS with the access code.`,
      });

      // Reset form
      setName('');
      setPhone('');
      setProfession('');
      setCity('');
      setCountry('');
      setRelation('');
      setAccess('view');

      onClose();
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add family member',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>Add Family Member</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter full name"
                disabled={loading}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+234..."
                disabled={loading}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Relationship to Patient</FormLabel>
              <Input
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder="e.g., Son, Daughter, Spouse, Friend"
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Profession (Optional)</FormLabel>
              <Input
                value={profession}
                onChange={e => setProfession(e.target.value)}
                placeholder="Your profession"
                disabled={loading}
              />
            </FormControl>

            <div className="grid grid-cols-2 gap-3">
              <FormControl>
                <FormLabel>City (Optional)</FormLabel>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="City"
                  disabled={loading}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Country (Optional)</FormLabel>
                <Input
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="Country"
                  disabled={loading}
                />
              </FormControl>
            </div>

            <FormControl>
              <FormLabel>Access Level</FormLabel>
              <RadioGroup value={access} onChange={setAccess}>
                <Stack direction="column" spacing={2}>
                  <Radio value="read_only" isDisabled={loading}>
                    Read-Only Access (View dashboard, data, journal)
                  </Radio>
                  <Radio value="full_access" isDisabled={loading}>
                    Full Access (Can edit and manage data)
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
              <p className="text-blue-700 dark:text-blue-300">
                📱 {name || 'Family member'} will receive an SMS with your
                access code: <strong>{profile?.access_code}</strong>
              </p>
            </div>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSend} className="ml-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Family Member'
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
