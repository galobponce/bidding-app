import { FC, useEffect, useState } from 'react';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { ItemStatus } from '../components';
import { ItemBill } from '../components/itemDetail';
import { BidItemButton } from '../components/bidItem';
import { DeleteItemButton } from '../components/deleteItem';
import { useGlobalDispatch, useGlobalSelector } from '../../hooks';
import { close, startCreateAutoBid, startDeleteAutoBid } from '../../store/itemDetail';


/**
 * The modal layout for item modal component
 */
export const ItemModalLayout: FC<ItemModalLayoutInterface> = ({
  children, isNewItem, canSave, onSave
}) => {

  const dispatch = useGlobalDispatch();
  const [canBid, setCanBid] = useState(false);
  const { uid, isAdmin } = useGlobalSelector(state => state.auth);
  const { isLoading } = useGlobalSelector(state => state.item);
  const { isOpen, selectedItem } = useGlobalSelector(state => state.itemDetail);
  const { isOpen: isBillOpen, onOpen: onBillOpen, onClose: onBillClose } = useDisclosure();


  useEffect(() => {
    if (!selectedItem) return;

    // Only can bid if item is not closed and user is not winning
    if (!selectedItem.closed && selectedItem.last_bid_user != Number(uid)) setCanBid(true);

  }, [selectedItem]);



  const handleAutoBidClick = () => {
    if (selectedItem?.using_auto_bid) {
      dispatch(startDeleteAutoBid(selectedItem, Number(uid)));
    } else {
      dispatch(startCreateAutoBid(selectedItem, Number(uid)));
    }
  }


  return (
    <>
      <ItemBill item={selectedItem} isOpen={isBillOpen} onClose={onBillClose} />
      <Modal onClose={() => dispatch(close())} size={{ base: 'full', md: '2xl', lg: '4xl' }} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderRadius='xl' zIndex='sticky' position='sticky' top='0' bg='white' _dark={{ bg: 'gray.700' }}>
            {isAdmin ? (isNewItem ? 'New' : 'Edit') : 'View'} Item

            {!isAdmin &&
              (
                <Box as='span' ml='3'>
                  <ItemStatus item={selectedItem} />
                </Box>
              )
            }

            <ModalCloseButton tabIndex={-1} mt='1.5' />

          </ModalHeader>
          <ModalBody mt='5' maxH='xl' overflowY='auto' boxShadow='inner'>

            {children}

          </ModalBody>
          <ModalFooter justifyContent={isAdmin && isNewItem && 'end' || 'space-between'}>

            {/* Can delete only if user is admin and there is an item */}
            {
              !isAdmin && selectedItem && !selectedItem.closed &&
              <Button colorScheme='yellow' onClick={handleAutoBidClick} isLoading={isLoading}>
                {selectedItem.using_auto_bid ? 'Stop Auto Bid' : 'Start Auto Bid'}
              </Button>
            }

            {/* Can delete only if user is admin and there is an item */}
            {
              isAdmin && selectedItem &&
              <DeleteItemButton itemId={selectedItem.id} variant='text' />
            }

            {/* See bill only if item is won */}
            {
              !isAdmin && selectedItem?.last_bid_user == Number(uid) && selectedItem?.closed &&
              <Button colorScheme='green' onClick={onBillOpen}>See Bill</Button>
            }

            <Box>
              <Button mr={3} onClick={() => dispatch(close())}>
                Close
              </Button>

              {/* Can save only if user is admin and item is not closed */}
              {
                isAdmin && canSave && !selectedItem?.closed &&
                <Button colorScheme='blue' onClick={onSave} isLoading={isLoading}>Save</Button>
              }

              {/* Can bid only if user is not admin and there is an item */}
              {
                !isAdmin && canBid && selectedItem &&
                <BidItemButton item={selectedItem} disabled={!canBid} />
              }

            </Box>


          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};



interface ItemModalLayoutInterface {
  children: JSX.Element | JSX.Element[];
  isNewItem: boolean;
  canSave: boolean;
  onSave: () => void;
};