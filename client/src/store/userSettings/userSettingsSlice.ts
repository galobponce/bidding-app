import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Item, UserSettings } from '../../common/types';


interface UserSettingsState extends UserSettings {
  isLoading: boolean;
  itemsBidHistorically: Item[];
}


const initialState: UserSettingsState = {
  id: null,
  auto_bid_alert: 0,
  auto_bid_max_amount: 0,
  isLoading: false,
  email: '',
  itemsBidHistorically: []
};


export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setSettings: (state, action: PayloadAction<UserSettings>) => {
      state.id = action.payload.id;
      state.auto_bid_alert = action.payload.auto_bid_alert;
      state.auto_bid_max_amount = action.payload.auto_bid_max_amount;
      state.email = action.payload.email || '';
    },

    setItemsBidHistorically: (state, action: PayloadAction<Item[]>) => {
      state.itemsBidHistorically = action.payload;
    }
  }
})

export const { setLoading, setSettings, setItemsBidHistorically } = userSettingsSlice.actions;