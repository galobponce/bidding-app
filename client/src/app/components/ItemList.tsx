import { FC } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { ItemCard } from '.';
import { useGlobalSelector } from '../../hooks';


// Gallery List
export const ItemList: FC = () => {

  const { items } = useGlobalSelector(state => state.item)


  return (
    <SimpleGrid
      m='5'
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      columnGap='5'
      rowGap='5'
    >
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </SimpleGrid>
  );
};
