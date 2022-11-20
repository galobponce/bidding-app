import { FC } from 'react';
import { Center } from '@chakra-ui/react';

import { OrderingSelector, SearchBar } from '.';


export const Filters: FC = () => {

  return (
    <Center flexDir='column' gap='3'>
      <SearchBar />
      <OrderingSelector />
    </Center>
  );
}