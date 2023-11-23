import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  subscriptions: [],
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      return {
        subscriptions: action.payload.subscriptions,
      };
    },
  },
});

export const { setSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
