import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Item } from '../../common/types';


interface ItemState {
  page: number;
  pages: number;
  isLoading: boolean;
  items: Item[];
  selectedItem: Item;
};


interface SetItemsPayload {
  page: number;
  pages: number;
  items: Item[];
}


interface SelectItemPayload {
  item: Item;
}


const initialState: ItemState = {
  page: 1,
  pages: null,
  isLoading: true,
  items: [],
  selectedItem: null
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
    }
  }
});

export const { setLoading, setItems, setSelectedItem } = itemSlice.actions;