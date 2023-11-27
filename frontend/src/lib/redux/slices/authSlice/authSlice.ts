import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthSliceState = {
  isAuth: false,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    }

  }
});

export interface AuthSliceState {
  isAuth: boolean;
};
