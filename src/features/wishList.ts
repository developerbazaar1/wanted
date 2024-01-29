import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  wishList: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    wishList: (state, action) => {
      return {
        ...state,
        wishList: action.payload.wishList,
      };
    },
  },
});

export const { wishList } = wishListSlice.actions;
export const selectCount = (state: RootState) => state.wishList;

export default wishListSlice.reducer;
