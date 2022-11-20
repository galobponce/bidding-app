import { FC } from 'react';
import { Center } from '@chakra-ui/react';

import { AppLayout } from '../layout';
import { Filters } from '../components/filters';
import { useGlobalSelector } from '../../hooks';
import { ItemList, Paginator } from '../components';


export const Home: FC = () => {

  const { isAdmin } = useGlobalSelector(state => state.auth)

  return (
    <AppLayout>

      {/* If the user is admin, sees the filters and 'new item' button */}
      <Center flexDir='column' gap='5'>

        { isAdmin ? <Filters /> : null }
        
        <ItemList />

        <Paginator />
        
      </Center>

    </AppLayout>
  );
};
