import { Text } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { Item } from '../../common/types';
import { updateItem } from '../../store/item';
import { useGlobalDispatch, useGlobalSelector } from '../../hooks';
import { setSelectedItem } from '../../store/itemDetail';


export const Countdown: FC<{ item: Item }> = ({ item }) => {

  const dispatch = useGlobalDispatch();
  const { selectedItem } = useGlobalSelector(state => state.itemDetail);

  const intervalRef = useRef(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  // When unmounts, clears interval
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [])

  useEffect(() => {

    // If there is an update of the item from another user, clears the interval and make a new one
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    if (!item) return;
    
    if (item.closed) return;

    intervalRef.current = setInterval(() => {      
      refreshCountdown();
    }, 1000);
    
  }, [item])


  const refreshCountdown = () => {    

    const deadlineTime = new Date(Date.parse(item.closes_at)).getTime();    

    const now = new Date().getTime();

    const difference = deadlineTime - now;
    
    if (difference <= 0) {
      dispatch(updateItem({ item: { ...item, closed: true } }));

      // Calls setSelectedItem with item closed so item detail modal re-renders
      if (selectedItem) dispatch(setSelectedItem({...selectedItem, closed: true}));

      return;
    }

    setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
  };
  
  
  if (item && item.closed) {
    return (
    <Text mt='2' textAlign='center' color='red'>Closed</Text>
    );
  }

  return (
    <Text mt='2' textAlign='center'>Closes in {days ? days + ' days' : null} {hours}hs {minutes}m {seconds}s</Text>
  );
};