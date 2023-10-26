import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import BlogDetail from "../pages/BlogDetail";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import DetailProductPage from "../pages/DetailProductPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFoundPage";
import { URL_CONSTANTS } from "../constants/url.constants";
import { useSelector } from "react-redux";

const privateRoutes = [
  { path: "/profile", component: ProfilePage },
  { path: "/cart", component: CartPage },
  { path: "/checkout", component: CheckoutPage },
];
const AppRouter = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Routes>
      {auth &&
        privateRoutes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={
              auth.isAuthenticated || auth.accessToken ? (
                <route.component />
              ) : (
                <Navigate to={URL_CONSTANTS.LOGIN} replace />
              )
            }
          />
        ))}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;
