import { FC } from 'react';
import { Center, Flex } from '@chakra-ui/react';

import { RepositoryLink, Navbar } from '../components';


export const AppLayout: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <Flex flexDirection='column'>
      <RepositoryLink />
      <Navbar />
      <Center mt='5'>
        {children}
      </Center>
    </Flex>
  );
};