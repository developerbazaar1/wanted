import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../service/auth";

interface AuthCheckedProps {
  components: ReactElement;
}

const AuthChecked: React.FC<AuthCheckedProps> = ({ components }) => {
  const { isLoggedIn } = useAuth();
  //   console.log(token, isLoggedIn);
  const token = localStorage.getItem("userwantedToken");

  if (token && isLoggedIn) {
    return <Navigate to="/" />;
  }
  return components;
};

export default AuthChecked;
