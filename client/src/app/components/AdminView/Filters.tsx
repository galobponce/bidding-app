import { FC } from 'react';
import { Center } from '@chakra-ui/react';

import { OrderingSelector, SearchBar } from '.';
import { startLoadingItems } from '../../../store/item';
import { useForm, useGlobalDispatch } from '../../../hooks';


export const Filters: FC = () => {


  const dispatch = useGlobalDispatch();


  const { values, onInputChange } = useForm({
    search: '',
    ordering: ''
  });
  const { search, ordering } = values;


  const handleFiltering = () => {    
    dispatch(startLoadingItems(1, { search, ordering }));
  };


  return (
    <Center flexDir='column' gap='3'>
      <SearchBar value={search} handleFiltering={handleFiltering} onInputChange={onInputChange} />
      <OrderingSelector value={ordering} handleFiltering={handleFiltering} onInputChange={onInputChange} />
    </Center>
  );
}