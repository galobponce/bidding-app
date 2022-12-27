import { FC } from 'react';
import { Modal, Text, Flex, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

import { Item } from '../../../common/types/Item';


export const ItemBill: FC<{ item: Item, isOpen: boolean, onClose: () => void }> = ({
  item, isOpen, onClose
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Item Bill</ModalHeader>
        <ModalCloseButton />

        <ModalBody display='flex' flexDir='column' gap='2'>

          <Text><b>Title:</b> {item?.title}</Text>

          <Text><b>User:</b> {item?.last_bid_username}</Text>

          <Text><b>Price:</b> {item?.last_bid_price}</Text>

          <Text><b>Description:</b> {item?.description}</Text>

        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}