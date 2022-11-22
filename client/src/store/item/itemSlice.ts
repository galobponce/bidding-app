import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Filters, Item } from '../../common/types';


interface ItemState {
  page: number;
  pages: number;
  itemsLoading: boolean;
  isLoading: boolean;
  items: Item[];
  selectedItem: Item;
  filters: Filters;
};


interface SetItemsPayload {
  page: number;
  pages: number;
  items: Item[];
}


interface SetSearchFilterPayload {
  search: string;
}

interface SetOrderingFilterPayload {
  ordering: string;
}


const initialState: ItemState = {
  page: 1,
  pages: null,
  itemsLoading: true,
  isLoading: false,
  items: [],
  selectedItem: null,
  filters: null
};


export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {

    setItemsLoading: (state, action: PayloadAction<boolean>) => {
      state.itemsLoading = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Called on each paginate
    setItems: (state, action: PayloadAction<SetItemsPayload>) => {
      state.itemsLoading = false;
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },

    updateItem: (state, action: PayloadAction<{ item: Item }>) => {

      let idx = -1;

      // Gets the item index
      if (idx === -1) {
        state.items.map((itemPage, index) => {
          if (itemPage.id == action.payload.item.id) idx = index;
        });
      }      

      state.items[idx] = action.payload.item;
    },

    setSearchFilter: (state, action: PayloadAction<SetSearchFilterPayload>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setOrderingFilter: (state, action: PayloadAction<SetOrderingFilterPayload>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  }
});

export const { setItemsLoading, setLoading, setItems, updateItem, setSearchFilter, setOrderingFilter } = itemSlice.actions;