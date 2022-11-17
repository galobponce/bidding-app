import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface IToast {
  title: string;
  description?: string;
  duration?: number;
  status: 'info' | 'warning' | 'success' | 'error' | 'loading';
};

interface ToastState {
  toast: IToast | null;
};

const initialState: ToastState = {
  toast: null
};


export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    generateToast(state, action: PayloadAction<IToast>) {
      state.toast = { ...action.payload };
    }
  }
});

export const { generateToast } = toastSlice.actions;