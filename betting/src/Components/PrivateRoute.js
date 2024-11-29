import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { getToken } from "../Helper/Storage";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = getToken();

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
      />
    );
  }

  return children;
};

export default PrivateRoute;
