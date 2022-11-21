import { FC, useEffect } from 'react';
import { Center, SimpleGrid } from '@chakra-ui/react';

import { ItemCard } from '.';
import { ItemDetailModal } from './itemDetail';
import { startLoadingItems } from '../../store/item';
import { CircleLoader } from '../../common/components';
import { useGlobalDispatch, useGlobalSelector } from '../../hooks';


// Gallery List
export const ItemList: FC = () => {


  const dispatch = useGlobalDispatch();
  const { items, filters, itemsLoading } = useGlobalSelector(state => state.item)


  // When filters change, load items again
  useEffect(() => {
    dispatch(startLoadingItems(1, filters));    
  }, [filters])


  // Shows loader when loading items
  if (itemsLoading) {
    return (
      <Center m='5'>
        <CircleLoader />
      </Center>
    );
  }


  return (
    <>
      <ItemDetailModal />
      <SimpleGrid
        m='5'
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        columnGap='10'
        rowGap='10'
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </>
  );
};
