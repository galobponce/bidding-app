import { FC, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useGlobalSelector } from '../../hooks';


export const Toast: FC = () => {


  const chakraToast = useToast();


  const { toast } = useGlobalSelector((state) => state.toast);


  // Checks for changes in toast state
  useEffect(() => {

    // If there is a toast, renders it
    if (!toast) return;    

    chakraToast({
      ...toast,
      isClosable: true,
      position: 'top-right'
    });

  }, [toast]);

  
  return (<></>);
};
