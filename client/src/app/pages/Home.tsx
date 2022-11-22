import { Center } from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';

import { AppLayout } from '../layout';
import { API_URL } from '../../api/config';
import { updateItem } from '../../store/item';
import { Filters } from '../components/filters';
import { ItemList, Paginator } from '../components';
import { getUserFromUid } from '../../auth/utils';
import { setSelectedItem } from '../../store/itemDetail';
import { useGlobalDispatch, useGlobalSelector } from '../../hooks';


export const Home: FC = () => {

  const dispatch = useGlobalDispatch();
  const sse = useRef<EventSource>(null);
  const { items } = useGlobalSelector(state => state.item);
  const { isAdmin } = useGlobalSelector(state => state.auth);
  const { selectedItem } = useGlobalSelector(state => state.itemDetail);


  // Server Side Events
  useEffect(() => {
    sse.current = new EventSource(`${API_URL}events/`);

    // Unsubscribe from event source when unmounting
    return () => sse.current.close();
  }, []);

  useEffect(() => {
    sse.current.onmessage = async (ev) => {

      const { data } = ev;
      const { updated_item } = JSON.parse(data);
      
      if (!updated_item) return;    
      
      
      // If the item is in the current page
      const found = !!items.find(item => item.id == updated_item.id);

      if (!found) return;

      // If there is a user, updates the virtual property username
      if (updated_item.last_bid_user) {
        updated_item['last_bid_username'] = (await getUserFromUid(updated_item.last_bid_user)).username;
      }

      // Updates the array of items
      dispatch(updateItem({ item: updated_item }));

      // Updates the selected item if its the same
      // But, does not update when user is admin because he could be making changes
      if (!isAdmin && selectedItem && selectedItem.id == updated_item.id) dispatch(setSelectedItem(updated_item));

    }
  }, [items, selectedItem]);


  return (
    <AppLayout>

      {/* If the user is admin, sees the filters button */}
      <Center flexDir='column' gap='5'>

        { isAdmin && <Filters /> }
        
        <ItemList />

        <Paginator />
        
      </Center>

    </AppLayout>
  );
};
