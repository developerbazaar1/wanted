import { Navigate } from "react-router-dom";
import { useAuth } from "../../service/auth";
import React, { ReactElement } from "react";
interface ProctedRouteTypes {
  components: ReactElement;
}

const ProctedRoute: React.FC<ProctedRouteTypes> = ({ components }) => {
  const { token, isLoggedIn } = useAuth();
  //   console.log(token, isLoggedIn);

  if (token && isLoggedIn) {
    return components;
  }
  return <Navigate to="/" />;
};

export default ProctedRoute;
