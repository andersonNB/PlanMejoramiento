import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'LOGIN',
  initialState: {
    logged: false,
    correct: false,
    resetPassword: null,
    forgetPasswordResponse: null,
    infoUserLogged: {},
  },
  reducers: {
    isLogin: (state, action) => {
      state.logged = action.payload.isLogged;
      state.infoUserLogged = action.payload.data;
    },
    setChangePassword: (state, action) => {
      state.correct = action.correct;
      state.resetPassword = action.payload;
    },
    forgetPassword: (state, { payload }) => {
      state.forgetPasswordResponse = payload;
    },
  },
});

export const { isLogin, setChangePassword, forgetPassword } = loginSlice.actions;
