import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  status: 'checking' | 'logged' | 'not-logged';
  uid: string;
  username: string;
  isAdmin: boolean;
};

interface LoginPayload {
  uid: string;
  username: string;
  isAdmin: boolean;
};

const initialState: AuthState = {
  status: 'not-logged',
  uid: null,
  username: null,
  isAdmin: null
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.status = 'logged';
      state.uid = action.payload.uid;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.status = 'not-logged',
      state.uid = null,
      state.username = null,
      state.isAdmin = null
    },
    setStatusChecking: (state) => {
      state.status = 'checking';
    }
  }
});

export const { login, logout, setStatusChecking } = authSlice.actions;