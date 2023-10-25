import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthRoute from "./AuthRoute";
import { useLocation, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  // const { accessToken } = useSelector((state) => state.auth);
  const currentUrl = useLocation().pathname;
  const accessToken = "123";
  useEffect(() => {
    if (accessToken && currentUrl.startsWith("/auth")) {
      navigate("/");
    }
  }, [accessToken, currentUrl, navigate]);

  return accessToken && currentUrl.startsWith("/auth") ? null : (
    // Cho phép truy cập các trang không yêu cầu AccessToken
    <React.Fragment>{children}</React.Fragment>
  );
};
