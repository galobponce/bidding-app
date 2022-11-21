import { FC } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import { DeleteItemModal } from '.';
import { useGlobalSelector } from '../../../hooks';


export const DeleteItemButton: FC<{ itemId: number }> = ({ itemId }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAdmin } = useGlobalSelector(state => state.auth);

  if (!isAdmin) return null;

  return (
    <>
      <DeleteItemModal itemId={itemId} isOpen={isOpen} onClose={onClose} />
      <Tooltip label="Delete Item" aria-label='delete item tooltip'>
        <IconButton
          size='sm'
          colorScheme='red'
          _dark={{ color: 'red.500' }}
          variant='ghost'
          aria-label='Delete Item'
          icon={<DeleteIcon />}
          onClick={onOpen}
        />
      </Tooltip>
    </>
  );
};