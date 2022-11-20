import { FC } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { useGlobalSelector } from '../../hooks';


/**
 * The modal layout for item modal component
 */
export const ItemModalLayout: FC<ItemModalLayoutInterface> = ({ 
  children, newItem, isAdmin, isOpen, canSave, onClose, onSave
}) => {


  const { isLoading } = useGlobalSelector(state => state.item);


  return (
    <Modal onClose={onClose} size='2xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent mx='1rem'>
        <ModalHeader borderRadius='xl' zIndex='sticky' position='sticky' top='0'>
          {isAdmin ? (newItem ? 'New' : 'Edit') : 'View'} Item
          <ModalCloseButton tabIndex={-1} mt='1.5' />
        </ModalHeader>
        <ModalBody maxH='xl' overflowY='auto' boxShadow='inner'>

          {children}

        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>

          {/* Can save only if user is admin */}
          {isAdmin ? <Button colorScheme='blue' disabled={!canSave} onClick={onSave} isLoading={isLoading}>Save</Button> : null}

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};



interface ItemModalLayoutInterface {
  children: JSX.Element | JSX.Element[];
  newItem: boolean;
  isAdmin: boolean;
  isOpen: boolean;
  canSave: boolean;
  onClose: () => void;
  onSave: () => void;
};