import type { Dispatch } from '@reduxjs/toolkit';

import { generateToast } from '../toast';
import { getItems, modifyItem } from '../../api';
import { Filters, Item } from '../../common/types';
import { setItems, setLoading } from './itemSlice';


/**
 * Saves in store the items given a page and filters
 * @param page desired page because it is easier than using next and previous URL's given by django
 * @param filters object of filters
 */
export const startLoadingItems = (page: number, filters: Filters) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    // Calculates offset based on asked page
    const offset = Number(`${page - 1}0`);

    const res = await getItems(offset, filters);

    if (!res.ok) {
      dispatch(generateToast({
        title: `There was an error fetching the items`,
        status: 'error' 
      }));
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
        title: `There was an saving the item`,
        status: 'error' 
      }));
      return;
    }

    dispatch(generateToast({
      title: `Successfully modified`,
      status: 'success' 
    }));

    dispatch(setLoading(false));
  }
}