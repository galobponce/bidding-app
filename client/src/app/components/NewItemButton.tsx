import { FC } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import { ItemModal } from '.';
import { useGlobalSelector } from '../../hooks';


export const NewItemButton: FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAdmin } = useGlobalSelector(state => state.auth);

  return (
    <>
      <ItemModal item={null} isOpen={isOpen} onClose={onClose} />
      <Tooltip label="Add New Item"  aria-label='new item tooltip'>
        <IconButton
          display={isAdmin ? 'inline-block' : 'none'}
          fontSize='md'
          aria-label='New Item'
          variant='ghost'
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </Tooltip>
    </>
  );
};