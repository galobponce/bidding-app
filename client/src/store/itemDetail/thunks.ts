import { Dispatch } from '@reduxjs/toolkit';

import { generateToast } from '../toast';
import { BidHistory, Item } from '../../common/types';
import { setLoading } from '../item/itemSlice';
import { getUserFromUid } from '../../auth/utils';
import { setSelectedItem } from './itemDetailSlice';
import { createAutoBid, deleteAutoBid, getAutoBid, getItemBidHistory } from '../../api';


/**
 * Selects an item to see details of it
 * @param item desired to Select
 */
 export const startSelectItem = (item: Item) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    let last_bid_username = '';

    // Loads last bid username
    if (item.last_bid_user) {
      last_bid_username = (await getUserFromUid(item.last_bid_user)).username;
    }

    // Loads if user is using auto bid feature on the item
    // Gets current user id from localStorage
    const res = await getAutoBid(item.id, JSON.parse(localStorage.getItem('user')).uid);

    if (!res.ok) {
      dispatch(generateToast({
        title: res.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    const { using_auto_bid } = res;


    let { bid_history } = await getItemBidHistory(item?.id);

    // Appends username to each bid history 
    bid_history = await Promise.all(bid_history.map(async (history): Promise<BidHistory> => {
      return { ...history, username: (await getUserFromUid(history.user)).username };
    }));
    

    dispatch(setSelectedItem({ ...item, last_bid_username, using_auto_bid, bid_history }));

    dispatch(setLoading(false));
  }
}



export const startCreateAutoBid = (item: Item, uid: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await createAutoBid(item.id, uid);

    if (!res.ok) {
      dispatch(generateToast({
        title: res.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setSelectedItem({ ...item, using_auto_bid: true }));

    dispatch(setLoading(false));
  }
}


export const startDeleteAutoBid = (item: Item, uid: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    // Gets the auto bid
    const resGet = await getAutoBid(item.id, uid);

    if (!resGet.ok) {
      dispatch(generateToast({
        title: resGet.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }
    

    const { auto_bid } = resGet;


    // Deletes the auto bid
    const resDelete = await deleteAutoBid(auto_bid?.id);

    if (!resDelete.ok) {
      dispatch(generateToast({
        title: resDelete.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setSelectedItem({ ...item, using_auto_bid: false }));

    dispatch(setLoading(false));
  }
}