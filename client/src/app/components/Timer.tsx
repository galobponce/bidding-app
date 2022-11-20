import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';


export const Timer: FC<{ deadline: string }> = ({ deadline }) => {
  
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [closed, setClosed] = useState(false);


  const getTime = () => {
    const deadlineTime = new Date(Date.parse(deadline)).getTime();
    const now = new Date().getTime();

    const difference = deadlineTime - now;

    if (difference <= 0) {
      setClosed(true);
      clearInterval(intervalId);
      return;
    }

    setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
  };


  useEffect(() => {
    setIntervalId(setInterval(() => getTime(), 1000));
    return () => clearInterval(intervalId);
  }, []);
  
  
  if (closed) {
    return (
    <Text mt='2' textAlign='center'>Closed</Text>
    );
  }

  return (
    <Text mt='2' textAlign='center'>Closes in {days ? days + ' days' : null} {hours}hs {minutes}m {seconds}s</Text>
  );
};