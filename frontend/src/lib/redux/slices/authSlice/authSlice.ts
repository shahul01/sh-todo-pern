import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthSliceState = {
  isAuth: false,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    toggleIsAuth: (state) => {
      state.isAuth = !state.isAuth;
    },

  }
});

export interface AuthSliceState {
  isAuth: boolean;
};
