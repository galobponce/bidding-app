import { FC } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import { DeleteItemModal } from '.';
import { useGlobalSelector } from '../../../hooks';


/**
 * Takes its variant as argument, it could be displayed as icon or as a normal button with text
 */
export const DeleteItemButton: FC<{ itemId: number, variant?: 'text' | 'icon' }> = ({ itemId, variant = 'icon' }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAdmin } = useGlobalSelector(state => state.auth);

  if (!isAdmin) return null;

  return (
    <>
      <DeleteItemModal itemId={itemId} isOpen={isOpen} onClose={onClose} />

      {variant === 'icon' &&
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
      }

      {variant === 'text' &&
        <Button colorScheme='red' onClick={onOpen} _dark={{ bg: 'red.400', color: 'white' }}>
          Delete
        </Button>
      }

    </>
  );
};