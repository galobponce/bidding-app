import { Center, Select } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect } from 'react';

import { FilterComponentIterface } from './FilterComponentInterface';


export const OrderingSelector: FC<FilterComponentIterface> = ({ value, handleFiltering, onInputChange }) => {


  // Filters when value changes because setState of onInputChange is async
  useEffect(() => {
    handleFiltering();
  }, [value])


  const handleOnChange = (e: ChangeEvent<any>) => {
    onInputChange(e);
  };


  return (
    <Center gap='3' w='15rem'>
      <Select placeholder='Sort By' name='ordering' value={value} onChange={handleOnChange}>
        <option value='closes_at'>Earlier Close Date</option>
        <option value='-closes_at'>Older Close Date</option>
        <option value='last_bid_price'>Lower Price</option>
        <option value='-last_bid_price'>Higher Price</option>
      </Select>
    </Center>
  );
}