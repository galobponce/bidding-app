import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Filters, Item } from '../../common/types';


interface ItemState {
  page: number;
  pages: number;
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


interface SelectItemPayload {
  item: Item;
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
  isLoading: true,
  items: [],
  selectedItem: null,
  filters: null
};


export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    
    // Called on each paginate
    setItems: (state, action: PayloadAction<SetItemsPayload>) => {
      state.isLoading = false;
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },


    setSelectedItem: (state, action: PayloadAction<SelectItemPayload>) => {
      state.selectedItem = action.payload.item;
    },

    setSearchFilter: (state, action: PayloadAction<SetSearchFilterPayload>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setOrderingFilter: (state, action: PayloadAction<SetOrderingFilterPayload>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  }
});

export const { setLoading, setItems, setSelectedItem, setSearchFilter, setOrderingFilter } = itemSlice.actions;