import { FC } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';


import { open } from '../../../store/itemDetail';
import { useGlobalDispatch, useGlobalSelector } from '../../../hooks';


export const NewItemButton: FC = () => {

  const dispatch = useGlobalDispatch();
  const { isAdmin } = useGlobalSelector(state => state.auth);

  if (!isAdmin) return null;

  return (
    <Tooltip label="Add New Item" aria-label='new item tooltip'>
      <IconButton
        fontSize='md'
        aria-label='New Item'
        variant='ghost'
        onClick={() => dispatch(open())}
        icon={<AddIcon />}
      />
    </Tooltip>
  );
};