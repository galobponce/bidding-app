import { FC } from 'react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton } from '@chakra-ui/react';


import { Item } from '../../../common/types';
import { open, setSelectedItem } from '../../../store/itemDetail';
import { useGlobalDispatch, useGlobalSelector } from '../../../hooks';


export const ItemDetailButton: FC<{ item: Item }> = ({ item }) => {

  const dispatch = useGlobalDispatch();
  const { isAdmin } = useGlobalSelector(state => state.auth);

  const text = isAdmin ? 'Edit Item' : 'View Item';

  const handleOpen = () => {
    dispatch(setSelectedItem(item));
    dispatch(open());
  };

  return (
    <Tooltip label={text} aria-label={text + ' tooltip'}>
      <IconButton
        size='sm'
        colorScheme='blue'
        variant='ghost'
        aria-label={text}
        icon={isAdmin ? <EditIcon /> : <ViewIcon />}
        onClick={handleOpen}
      />
    </Tooltip>
  );
};