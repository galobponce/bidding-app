import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { itemSlice } from './item';
import { toastSlice } from './toast';
import { itemDetailSlice } from './itemDetail';


export const globalStore = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    auth: authSlice.reducer,
    item: itemSlice.reducer,
    itemDetail: itemDetailSlice.reducer
  }
});

// https://react-redux.js.org/using-react-redux/usage-with-typescript
export type GlobalDispatch = typeof globalStore.dispatch;
export type GlobalState = ReturnType<typeof globalStore.getState>;