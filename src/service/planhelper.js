import { useSelector } from "react-redux";

export const useSubscription = () => {
  return useSelector((state) => state.subscription);
};
