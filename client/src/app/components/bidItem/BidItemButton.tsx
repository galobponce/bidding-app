import { FC } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import { BidItemModal } from '.';
import { Item } from '../../../common/types';


export const BidItemButton: FC<{ item: Item, disabled?: boolean }> = ({ item, disabled = false }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <BidItemModal item={item} isOpen={isOpen} onClose={onClose} />
      <Button colorScheme='teal' disabled={disabled} onClick={onOpen}>Bid Now</Button>
    </>
  );
};