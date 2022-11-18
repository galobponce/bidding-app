import { FC } from 'react';
import { CircularProgress } from '@chakra-ui/react';


export const CircleLoader: FC = () => {
  return (
    <CircularProgress isIndeterminate color='red.500' />
  );
};
