import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { URL_CONSTANTS } from "../constants/url.constants";
import ProfilePage from "../pages/ProfilePage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import DetailProductPage from "../pages/DetailProductPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={URL_CONSTANTS.HOME} element={<HomePage />} />
      <Route path={URL_CONSTANTS.PROFILE} element={<ProfilePage />} />
      <Route path={URL_CONSTANTS.CART} element={<CartPage />} />
      <Route path={URL_CONSTANTS.CHECKOUT} element={<CheckoutPage />} />
      <Route path={URL_CONSTANTS.DETAIL} element={<DetailProductPage />} />
    </Routes>
  );
}
