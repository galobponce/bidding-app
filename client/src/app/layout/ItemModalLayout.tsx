import { FC } from 'react';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { useGlobalSelector } from '../../hooks';
import { BidItemButton } from '../components/bidItem';
import { DeleteItemButton } from '../components/deleteItem';


/**
 * The modal layout for item modal component
 */
export const ItemModalLayout: FC<ItemModalLayoutInterface> = ({
  children, itemId, isNew, isAdmin, isOpen, canSave, onClose, onSave
}) => {


  const { isLoading } = useGlobalSelector(state => state.item);


  return (
    <Modal onClose={onClose} size='2xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent mx='1rem'>
        <ModalHeader borderRadius='xl' zIndex='sticky' position='sticky' top='0'>
          {isAdmin ? (isNew ? 'New' : 'Edit') : 'View'} Item
          <ModalCloseButton tabIndex={-1} mt='1.5' />
        </ModalHeader>
        <ModalBody maxH='xl' overflowY='auto' boxShadow='inner'>

          {children}

        </ModalBody>
        <ModalFooter justifyContent={isAdmin ? 'space-between' : 'end'}>

          {/* Can delete only if user is admin and there is an item */}
          {isAdmin && itemId && <DeleteItemButton itemId={itemId} variant='text' />}

          <Box>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>

            {/* Can save only if user is admin */}
            {isAdmin && <Button colorScheme='blue' disabled={!canSave} onClick={onSave} isLoading={isLoading}>Save</Button>}
          </Box>

          {/* Can bid only if user is not admin and there is an item */}
          {!isAdmin && itemId && <BidItemButton itemId={itemId} />}

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};



interface ItemModalLayoutInterface {
  children: JSX.Element | JSX.Element[];
  itemId: number;
  isNew: boolean;
  isAdmin: boolean;
  isOpen: boolean;
  canSave: boolean;
  onClose: () => void;
  onSave: () => void;
};