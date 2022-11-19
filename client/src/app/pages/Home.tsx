import { FC } from 'react';

import { AppLayout } from '../layout';
import { useGlobalSelector } from '../../hooks';
import { AdminView } from '../components/AdminView';


export const Home: FC = () => {

  const { isAdmin } = useGlobalSelector(state => state.auth)

  return (
    <AppLayout>

      {
        // If user is admin, sees the items table with CRUD and search bar
        // If not, sees the gallery view to bid for items
        isAdmin
          ?
          <AdminView />
          :
          <h1>Items Gallery</h1>
      }

    </AppLayout>
  );
};
