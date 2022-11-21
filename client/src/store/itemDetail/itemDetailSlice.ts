import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Item } from '../../common/types';


interface ItemDetailState {
  selectedItem: Item;
  isLoading: boolean;
  isOpen: boolean;
};


const initialState: ItemDetailState = {
  selectedItem: null,
  isLoading: false,
  isOpen: false
};


export const itemDetailSlice = createSlice({
  name: 'itemDetail',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },

    open: (state) => {
      state.isOpen = true
    },

    close: (state) => {
      state.selectedItem = null;
      state.isOpen = false
    }
  }
});

export const { setSelectedItem, open, close } = itemDetailSlice.actions;