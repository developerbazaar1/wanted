import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  category: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setcategory: (state, action) => {
      state.category = action.payload.category;
    },
  },
});

export const { setcategory } = categorySlice.actions;

export default categorySlice.reducer;
