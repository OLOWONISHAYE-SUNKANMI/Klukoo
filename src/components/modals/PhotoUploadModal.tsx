import { useRef } from 'react';
import { Upload } from 'lucide-react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

interface PhotoUploadModalProps {
  children: React.ReactNode;
  currentPhoto: string | null;
  onPhotoChange: (file: File) => void;
}

export default function PhotoUploadModal({
  children,
  currentPhoto,
  onPhotoChange,
}: PhotoUploadModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoChange(file);
      onClose();
    }
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              width="100%"
              variant="outline"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Photo
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}