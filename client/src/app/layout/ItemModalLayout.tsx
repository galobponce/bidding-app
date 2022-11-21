import { FC } from 'react';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { close } from '../../store/itemDetail';
import { BidItemButton } from '../components/bidItem';
import { DeleteItemButton } from '../components/deleteItem';
import { useGlobalDispatch, useGlobalSelector } from '../../hooks';


/**
 * The modal layout for item modal component
 */
export const ItemModalLayout: FC<ItemModalLayoutInterface> = ({
  children, isNewItem, canSave, onSave
}) => {

  const dispatch = useGlobalDispatch();
  const { isAdmin } = useGlobalSelector(state => state.auth);
  const { isLoading } = useGlobalSelector(state => state.item);
  const { isOpen, selectedItem } = useGlobalSelector(state => state.itemDetail);


  return (
    <Modal onClose={() => dispatch(close())} size='2xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent mx='1rem'>
        <ModalHeader borderRadius='xl' zIndex='sticky' position='sticky' top='0'>
          {isAdmin ? (isNewItem ? 'New' : 'Edit') : 'View'} Item
          <ModalCloseButton tabIndex={-1} mt='1.5' />
        </ModalHeader>
        <ModalBody maxH='xl' overflowY='auto' boxShadow='inner'>

          {children}

        </ModalBody>
        <ModalFooter justifyContent={isAdmin ? (isNewItem ? 'end' : 'space-between') : 'end'}>

          {/* Can delete only if user is admin and there is an item */}
          {isAdmin && selectedItem && <DeleteItemButton itemId={selectedItem.id} variant='text' />}

          <Box>
            <Button mr={3} onClick={() => dispatch(close())}>
              Close
            </Button>

            {/* Can save only if user is admin */}
            {isAdmin && <Button colorScheme='blue' disabled={!canSave} onClick={onSave} isLoading={isLoading}>Save</Button>}
          </Box>

          {/* Can bid only if user is not admin and there is an item */}
          {!isAdmin && selectedItem && <BidItemButton itemId={selectedItem.id} />}

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};



interface ItemModalLayoutInterface {
  children: JSX.Element | JSX.Element[];
  isNewItem: boolean;
  canSave: boolean;
  onSave: () => void;
};