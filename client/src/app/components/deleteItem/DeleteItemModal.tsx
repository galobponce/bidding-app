import { FC } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { close } from '../../../store/itemDetail';
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

    dispatch(close());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx='1rem'>

        <Alert
          status='warning'
          bg='white'
          _dark={{ bg: 'gray.800' }}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon color='gray.800' _dark={{ color: 'white' }} boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Are you sure?
          </AlertTitle>
        </Alert>

        <ModalFooter justifyContent='center' gap='3' bg='white' _dark={{ bg: 'gray.800' }}>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' _dark={{ bg: 'red.400', color: 'white' }} onClick={handleDelete}>
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