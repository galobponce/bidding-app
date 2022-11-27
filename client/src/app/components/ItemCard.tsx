import { FC, useEffect, useState } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

import { cutString } from '../utils';
import { Item } from '../../common/types';
import { Countdown, ItemStatus } from '.';
import { ItemDetailButton } from './itemDetail';
import { DeleteItemButton } from './deleteItem';
import { useGlobalSelector } from '../../hooks';


// Cards displayed in Gallery
export const ItemCard: FC<{ item: Item }> = ({ item }) => {


  const { isAdmin } = useGlobalSelector(state => state.auth);


  return (
    <Flex
      minW='18rem'
      maxW='20rem'
      flexDir='column'
      justifyContent='space-between'
      p='5'
      borderRadius='lg'
      _dark={{ boxShadow: 'dark-lg' }}
      boxShadow='2xl'
    >

      <Box>

        {!isAdmin &&
          (
            <Center>
              <ItemStatus item={item} />
            </Center>
          )
        }

        <Text fontSize='xl' fontWeight='bold' lineHeight='short'>
          {item.title}
        </Text>
        <Text>{cutString(item.description, 100)}</Text>
      </Box>

      <Box>

        {/* Price and Buttons */}
        <Flex w='full' justifyContent='space-between'>

          <Text fontWeight='semibold' mt='2'>{item.last_bid_price ? `$${item.last_bid_price}` : 'No bids yet'}</Text>

          <Box>
            <ItemDetailButton item={item} />
            <DeleteItemButton itemId={item && item.id} />
          </Box>

        </Flex>

        <Countdown item={item} />

      </Box>
    </Flex>
  );
};