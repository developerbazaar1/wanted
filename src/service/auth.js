import { useSelector } from "react-redux";

export const useAuth = () => {
  return useSelector((state) => state.auth);
};
