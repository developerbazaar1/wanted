import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  portfolio_id: null,
  portfolio: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSignup: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.portfolio_id = action.payload.portfolio_id;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.portfolio_id = null;
    },
    update: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
      };
    },
    updateProtfolio: (state, action) => {
      return {
        ...state,
        portfolio: action.payload.portfolioProfile,
      };
    },
  },
});

export const { loginSignup, logout, update, updateProtfolio } =
  authSlice.actions;

export default authSlice.reducer;
