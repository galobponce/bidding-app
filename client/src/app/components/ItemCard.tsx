import { FC } from 'react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { Timer } from '.';
import { cutString } from '../utils';
import { Item } from '../../common/types';
import { useGlobalSelector } from '../../hooks';


// Cards displayed in Gallery
export const ItemCard: FC<{ item: Item }> = ({ item }) => {


  const { isAdmin } = useGlobalSelector(state => state.auth);

  
  return (
    <Flex minW='14rem' flexDir='column' justifyContent='space-between' p='5' borderRadius='lg' _dark={{ boxShadow: 'dark-lg' }} boxShadow='2xl'>
      <Box>
        <Text mt='2' fontSize='xl' fontWeight='bold' lineHeight='short'>
          {cutString(item.title, 30)}
        </Text>
        <Text mt='2'>{cutString(item.description, 100)}</Text>
      </Box>
      <Box>
        <Text fontWeight='semibold' mt='2'>{item.last_bid_price ? `$${item.last_bid_price}` : 'No bids yet'}</Text>
        <Button variant='outline' size='sm' mt='5' colorScheme='teal' width='full'>
          {isAdmin ? <EditIcon mr='2' /> : <ViewIcon mr='2' />}
          {isAdmin ? 'Edit' : 'See More'}
        </Button>
        <Timer deadline={item.closes_at} />
      </Box>
    </Flex>
  );
};