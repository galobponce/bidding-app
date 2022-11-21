import { Center } from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';

import { AppLayout } from '../layout';
import { API_URL } from '../../api/config';
import { updateItem } from '../../store/item';
import { Filters } from '../components/filters';
import { ItemList, Paginator } from '../components';
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
    sse.current.onmessage = (ev) => {

      const { data } = ev;
      const { updated_item } = JSON.parse(data);
      
      if (!updated_item) return;    
      
      // If the item updated is in current page
      let idx = -1;

      const found = !!items.find((item, index) => {
        if (item.id == updated_item.id) {
          idx = index;
          return item;
        }
      });

      if (!found) return;

      // Updates the array of items
      dispatch(updateItem({ item: updated_item, idx }));

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
