import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Select,
  useDisclosure,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

type EditProfileModalProps = {
  form: any;
  loading?: boolean;
  handleChange: (field: string, value: string) => void;
  handleUpdateProfile: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<boolean>;
  trigger?: React.ReactNode;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  form,
  loading = false,
  handleChange,
  handleUpdateProfile,
  trigger,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const success = await handleUpdateProfile(e);
    if (success) {
      onClose();
    }
  };

  const { t } = useTranslation();

  return (
    <>
      {/* Trigger button or element */}
      {trigger ? (
        <span onClick={onOpen}>{trigger}</span>
      ) : (
        <Button onClick={onOpen}>Edit Profile</Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent p={4}>
          {' '}
          <ModalHeader fontSize="lg" p={2}>
            {t('profileScreenFixes.action_editProfile')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={2}>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  {t('profileScreenFixes.label_firstName')}
                </label>
                <Input
                  size="sm"
                  value={form.first_name || ''}
                  onChange={e => handleChange('first_name', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  {t('profileScreenFixes.label_lastName')}
                </label>
                <Input
                  size="sm"
                  value={form.last_name || ''}
                  onChange={e => handleChange('last_name', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  {t('profileScreenFixes.label_phone')}
                </label>
                <Input
                  size="sm"
                  value={form.phone || ''}
                  onChange={e => handleChange('phone', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  Date of birth
                </label>
                <Input
                  size="sm"
                  type="date"
                  value={form.date_of_birth || ''}
                  onChange={e => handleChange('date_of_birth', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                />
              </div>

              {/* Profession */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  Profession
                </label>
                <Input
                  size="sm"
                  value={form.specialty || ''}
                  onChange={e => handleChange('specialty', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                />
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  City
                </label>
                <Input
                  size="sm"
                  value={form.city || ''}
                  onChange={e => handleChange('city', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                />
              </div>

              {/* Diabetes Type */}
              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  Diabetes Type
                </label>
                <Select
                  size="sm"
                  value={form.diabetes_type || ''}
                  onChange={e => handleChange('diabetes_type', e.target.value)}
                  _focus={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                  _focusVisible={{
                    borderColor: '#32948f',
                    boxShadow: '0 0 0 1px #32948f',
                  }}
                >
                  <option value="">Select diabetes type</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Gestational">Gestational</option>
                  <option value="MODY">MODY</option>
                  <option value="Other">Other</option>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isDisabled={loading}
                mt={2}
                w="full"
                size="sm"
                bg="#3aa6a1"
                _hover={{ bg: '#32948f' }}
                color="#fff"
              >
                {loading
                  ? t('editProfileModalChanges.common.saving')
                  : t('editProfileModalChanges.common.saveChanges')}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
