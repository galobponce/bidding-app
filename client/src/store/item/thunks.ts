import type { Dispatch } from '@reduxjs/toolkit';

import { getItems } from '../../api';
import { generateToast } from '../toast';
import { setItems, setLoading } from './itemSlice';


/**
 * @param page desired page because it is easier than using next and previous URL's given by django
 */
export const startLoadingItems = (page: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading());

    // Calculates offset based on asked page
    const offset = Number(`${page - 1}0`);

    const res = await getItems(offset);

    if (!res.ok) {
      dispatch(generateToast({
        title: `There was an fetching the items`,
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