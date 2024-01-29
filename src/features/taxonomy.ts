import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  category: [],
  subCategory: [],
  SubSubCategory: [],
};

export const taxonomySlice = createSlice({
  name: "taxonomy",
  initialState,
  reducers: {
    LoadCategory: (state, action) => {
      return {
        ...state,
        category: action.payload.category,
      };
    },
    LoadSubCategory: (state, action) => {
      return {
        ...state,
        subCategory: action.payload.subCategory,
      };
    },
    LoadSubSubCategory: (state, action) => {
      return {
        ...state,
        SubSubCategory: action.payload.SubSubCategory,
      };
    },
  },
});

export const { LoadCategory, LoadSubCategory, LoadSubSubCategory } =
  taxonomySlice.actions;
export const selectCount = (state: RootState) => state.taxonomy;

export default taxonomySlice.reducer;
