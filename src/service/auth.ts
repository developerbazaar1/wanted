// import { useSelector } from "react-redux";
import { useAppSelector } from "../app/hooks";

export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};
