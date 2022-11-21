import { FC } from 'react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton, useDisclosure } from '@chakra-ui/react';

import { ItemDetailModal } from '.';
import { Item } from '../../../common/types';
import { useGlobalSelector } from '../../../hooks';


export const ItemDetailButton: FC<{ item: Item }> = ({ item }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAdmin } = useGlobalSelector(state => state.auth);

  const text = isAdmin ? 'Edit Item' : 'View Item';

  return (
    <>
      <ItemDetailModal item={item} isOpen={isOpen} onClose={onClose} />
      <Tooltip label={text} aria-label={text + ' tooltip'}>
        <IconButton
          size='sm'
          colorScheme='blue'
          variant='ghost'
          aria-label={text}
          icon={isAdmin ? <EditIcon /> : <ViewIcon />}
          onClick={onOpen}
        />
      </Tooltip>
    </>
  );
};