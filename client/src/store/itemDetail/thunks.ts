import { Dispatch } from '@reduxjs/toolkit';

import { Item } from '../../common/types';
import { setLoading } from '../item/itemSlice';
import { getUserFromUid } from '../../auth/utils';
import { setSelectedItem } from './itemDetailSlice';

/**
 * Selects an item to see details of it
 * @param item desired to Select
 */
 export const startSelectItem = (item: Item) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    let username = '';

    // Loads last bid username
    if (item.last_bid_user) {
      username = (await getUserFromUid(item.last_bid_user)).username;
    }

    dispatch(setSelectedItem({ ...item, last_bid_username: username }));

    dispatch(setLoading(false));
  }
}