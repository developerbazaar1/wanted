import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  subcategory: [],
};

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    setsubcategory: (state, action) => {
      state.subcategory = action.payload.subcategory;
    },
  },
});

export const { setsubcategory } = subcategorySlice.actions;

export default subcategorySlice.reducer;
