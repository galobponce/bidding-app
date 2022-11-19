import { FC } from 'react';
import { useGlobalSelector } from '../../hooks';
import { AppLayout } from '../layout';


export const Home: FC = () => {

  const { isAdmin } = useGlobalSelector(state => state.auth)

  return (
    <AppLayout>

      {
        // If user is admin, sees the items table with CRUD
        // If not, sees the gallery view to bid for items
        isAdmin
          ?
          <h1>Items table</h1>
          :
          <h1>Items Gallery</h1>
      }

    </AppLayout>
  );
};
