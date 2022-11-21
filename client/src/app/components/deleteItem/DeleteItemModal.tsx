import { FC } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { useGlobalDispatch, useGlobalSelector } from '../../../hooks';
import { startDeletingItem, startLoadingItems } from '../../../store/item';


// Used to delete an item with confirmation
export const DeleteItemModal: FC<DeleteModalInterface> = ({ itemId, isOpen, onClose }) => {


  const dispatch = useGlobalDispatch();
  const { page, filters } = useGlobalSelector(state => state.item);

  const handleDelete = async () => {

    // In case there is no item id
    if (!itemId) { onClose(); return; }

    await dispatch(startDeletingItem(itemId));

    dispatch(startLoadingItems(page, filters));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx='1rem'>

        <Alert
          status='warning'
          variant='solid'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Are you sure?
          </AlertTitle>
        </Alert>

        <ModalFooter justifyContent='center' bg='orange.500' _dark={{ bg: 'orange.200' }}>
          <Button mr={3} onClick={onClose} colorScheme='whiteAlpha'>
            Cancel
          </Button>
          <Button colorScheme='red' _dark={{ bg: 'red.400', color: 'white' }} mr={3} onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


interface DeleteModalInterface {
  itemId: number;
  isOpen: boolean;
  onClose: () => void;
};