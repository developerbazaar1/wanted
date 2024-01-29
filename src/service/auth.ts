// import { useSelector } from "react-redux";
import { useAppSelector } from "../app/hooks";

export const useAuth = (): any => {
  return useAppSelector((state) => state.auth);
};

export const useToken = () => {
  const token = localStorage.getItem("userwantedToken");
  return token;
};

export const useServices = () => {
  return useAppSelector((state) => state.taxonomy);
};
export const useWishList = () => {
  return useAppSelector((state) => state.wishList.wishList);
};
