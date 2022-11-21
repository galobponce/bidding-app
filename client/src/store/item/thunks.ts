import type { Dispatch } from '@reduxjs/toolkit';

import { generateToast } from '../toast';
import { Filters, Item } from '../../common/types';
import { setItems, setItemsLoading, setLoading } from './itemSlice';
import { createItem, deleteItem, getItems, modifyItem, bidItem } from '../../api';


/**
 * Saves in store the items given a page and filters
 * @param page desired page because it is easier than using next and previous URL's given by django
 * @param filters object of filters
 */
export const startLoadingItems = (page: number, filters: Filters) => {
  return async (dispatch: Dispatch) => {
    dispatch(setItemsLoading(true));

    // Calculates offset based on asked page
    const offset = Number(`${page - 1}0`);

    const res = await getItems(offset, filters);

    if (!res.ok) {
      dispatch(generateToast({
        title: `There was an error fetching the items`,
        status: 'error' 
      }));
      dispatch(setItemsLoading(false));
      return;
    }

    const { count, results } = res;

    // Calculates the number of pages
    const pages = Math.ceil(count / 10);

    dispatch(setItems({ page, pages, items: results }));
  }
}


/**
 * Modifies an item
 * @param item desired item to modify
 */
 export const startModifyingItem = (item: Item) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await modifyItem(item);

    if (!res.ok) {
      dispatch(generateToast({
        title: `There was an error saving the item`,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(generateToast({
      title: `Successfully modified`,
      status: 'success' 
    }));

    dispatch(setLoading(false));
  }
}


/**
 * Creates an item
 * @param item desired item to create
 */
 export const startCreatingItem = (item: Item) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await createItem(item);

    if (!res.ok) {
      dispatch(generateToast({
        title: `There was an error saving the item`,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(generateToast({
      title: `Successfully created`,
      status: 'success' 
    }));

    dispatch(setLoading(false));
  }
}


/**
 * Deletes an item
 * @param itemId id desired item to delete
 */
 export const startDeletingItem = (itemId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await deleteItem(itemId);

    if (!res.ok) {
      dispatch(generateToast({
        title: `There was an error deleting the item`,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(generateToast({
      title: `Successfully deleted`,
      status: 'success' 
    }));

    dispatch(setLoading(false));
  }
}



/**
 * Bid an items
 * @param itemId id desired item to bid
 * @param userId current user id
 * @param price bid price
 */
 export const startBidItem = (itemId: number, userId: number, price: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await bidItem(itemId, userId, price);

    if (!res.ok) {
      dispatch(generateToast({
        title: res.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return false;
    }

    dispatch(generateToast({
      title: `Successfully bidded`,
      status: 'success' 
    }));

    dispatch(setLoading(false));
    return true;
  }
}