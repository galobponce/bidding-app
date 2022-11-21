import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { Timer } from '.';
import { cutString } from '../utils';
import { Item } from '../../common/types';
import { ItemDetailButton } from './itemDetail';
import { DeleteItemButton } from './deleteItem';


// Cards displayed in Gallery
export const ItemCard: FC<{ item: Item }> = ({ item }) => {

  return (
    <Flex w='20rem' flexDir='column' justifyContent='space-between' p='5' borderRadius='lg' _dark={{ boxShadow: 'dark-lg' }} boxShadow='2xl'>

      <Box>
        <Text mt='2' fontSize='xl' fontWeight='bold' lineHeight='short'>
          {item.title}
        </Text>
        <Text mt='2'>{cutString(item.description, 100)}</Text>
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

        <Timer deadline={item.closes_at} />

      </Box>
    </Flex>
  );
};