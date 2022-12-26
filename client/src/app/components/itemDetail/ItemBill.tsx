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

          <Flex gap='1'>
            <Text fontWeight='bold'>Title: </Text>
            <Text>{item?.title}</Text>
          </Flex>

          <Flex gap='1'>
            <Text fontWeight='bold'>User: </Text>
            <Text>{item?.last_bid_username}</Text>
          </Flex>

          <Flex gap='1'>
            <Text fontWeight='bold'>Price: </Text>
            <Text>{item?.last_bid_price}</Text>
          </Flex>

          <Flex gap='1'>
            <Text fontWeight='bold'>Description: </Text>
            <Text>{item?.description}</Text>
          </Flex>


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