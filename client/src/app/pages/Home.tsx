import { FC } from 'react';
import { Center } from '@chakra-ui/react';

import { AppLayout } from '../layout';
import { ItemList } from '../components';
import { Filters } from '../components/filters';
import { useGlobalSelector } from '../../hooks';


export const Home: FC = () => {

  const { isAdmin } = useGlobalSelector(state => state.auth)

  return (
    <AppLayout>

      {/* If the user is admin, sees the filters and 'new item' button */}
      <Center flexDir='column' gap='5'>

        { isAdmin ? <Filters /> : null }
        
        <ItemList />
        
      </Center>

    </AppLayout>
  );
};
