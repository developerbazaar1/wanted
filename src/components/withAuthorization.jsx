import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoutes({ isLoggedIn, component }) {
  const token = localStorage.getItem("wantedPtoken");
  if (!isLoggedIn || !token) {
    return <Navigate to="/signup" />;
  }

  return component;
}

ProtectedRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.any,
};
