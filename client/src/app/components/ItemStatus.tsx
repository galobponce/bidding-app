import { FC, useEffect, useState } from 'react';
import { Badge, Center, Text } from '@chakra-ui/react';

import { Item } from '../../common/types';
import { useGlobalSelector } from '../../hooks';


export const ItemStatus: FC<{ item: Item, variant?: 'card' | 'modal-header' }> = ({ item, variant = 'card' }) => {


  const [closed, setClosed] = useState(false);
  const [winning, setWinning] = useState(false);
  const { uid } = useGlobalSelector(state => state.auth);


  useEffect(() => {
    if (!item) return;

    setClosed(item.closed);
    setWinning(Number(uid) === item.last_bid_user);
  }, [item]);


  const getText = () => {
    if (closed) {
      return winning ? 'Won' : 'Lost';
    } else {
      return winning ? 'Winning' : 'Losing';
    }
  }

  return (
    <Badge variant='solid' colorScheme={winning ? 'green' : 'red'}>{getText()}</Badge>
  );
};