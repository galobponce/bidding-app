import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { toastSlice } from './toast';


export const globalStore = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    auth: authSlice.reducer
  }
});

// https://react-redux.js.org/using-react-redux/usage-with-typescript
export type GlobalDispatch = typeof globalStore.dispatch;
export type GlobalState = ReturnType<typeof globalStore.getState>;