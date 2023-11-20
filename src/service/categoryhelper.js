import { useSelector } from "react-redux";

export const useCategory = () => {
  return useSelector((state) => state.category);
};
export const useSubCategory = () => {
  return useSelector((state) => state.subcategory);
};
