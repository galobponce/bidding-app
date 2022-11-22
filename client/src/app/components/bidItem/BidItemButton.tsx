import { FC } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import { BidItemModal } from '.';


export const BidItemButton: FC<{ itemId: number, disabled?: boolean }> = ({ itemId, disabled = false }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <BidItemModal itemId={itemId} isOpen={isOpen} onClose={onClose} />
      <Button colorScheme='teal' disabled={disabled} onClick={onOpen}>Bid Now</Button>
    </>
  );
};