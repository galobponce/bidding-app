import { Text } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { Item } from '../../common/types';
import { updateItem } from '../../store/item';
import { useGlobalDispatch, useGlobalSelector } from '../../hooks';
import { setSelectedItem } from '../../store/itemDetail';
import { sendItemWonEmail } from '../../api/sendItemWonEmail';


export const Countdown: FC<{ item: Item }> = ({ item }) => {

  const dispatch = useGlobalDispatch();
  const { selectedItem } = useGlobalSelector(state => state.itemDetail);
  const { uid } = useGlobalSelector(state => state.auth);

  const intervalRef = useRef(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialDifference, setInitialDifference] = useState(-1);


  // When unmounts, clears interval
  useEffect(() => {
    setInitialDifference(getDifference());
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


  const getDifference = () => {
    const deadlineTime = new Date(Date.parse(item?.closes_at)).getTime();    

    const now = new Date().getTime();

    return deadlineTime - now;
  }


  const refreshCountdown = () => {

    const difference = getDifference();


    // Sends item won email only when the initial difference was greater than 0
    if (difference <= 0 && initialDifference > 0 && Number(uid) === item?.last_bid_user) {
      sendItemWonEmail(item?.id);
    }
    
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
    <Text mt='2' textAlign='center' color='red' _dark={{ color: 'red.500' }}>Closed</Text>
    );
  }

  return (
    <Text mt='2' textAlign='center'>Closes in {days ? days + ' days' : null} {hours}hs {minutes}m {seconds}s</Text>
  );
};