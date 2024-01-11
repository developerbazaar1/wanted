import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  subsubcategory: [],
};

export const subsubcategorySlice = createSlice({
  name: "subsubcategory",
  initialState,
  reducers: {
    setsubsubcategory: (state, action) => {
      state.subsubcategory = action.payload.subsubcategory;
    },
  },
});

export const { setsubsubcategory } = subsubcategorySlice.actions;

export default subsubcategorySlice.reducer;
