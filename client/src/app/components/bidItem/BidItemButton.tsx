import { FC } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import { BidItemModal } from '.';


export const BidItemButton: FC<{ itemId: number }> = ({ itemId }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <BidItemModal itemId={itemId} isOpen={isOpen} onClose={onClose} />
      <Button colorScheme='teal' onClick={onOpen}>Bid Now</Button>
    </>
  );
};