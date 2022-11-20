import { Center, Select } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import { setOrderingFilter } from '../../../store/item';
import { useForm, useGlobalDispatch } from '../../../hooks';


export const OrderingSelector: FC = () => {


  const dispatch = useGlobalDispatch();


  const { values, onInputChange } = useForm({
    ordering: '',
  });
  const { ordering } = values;


  // https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
  useEffect(() => {
    dispatch(setOrderingFilter({ ordering }));
  }, [ordering])


  return (
    <Center gap='3' w='15rem'>
      <Select placeholder='Sort By' name='ordering' value={ordering} onChange={onInputChange}>
        <option value='closes_at'>Earlier Close Date</option>
        <option value='-closes_at'>Older Close Date</option>
        <option value='last_bid_price'>Lower Price</option>
        <option value='-last_bid_price'>Higher Price</option>
      </Select>
    </Center>
  );
}