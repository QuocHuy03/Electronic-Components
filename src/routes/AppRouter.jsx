import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { URL_CONSTANTS } from "../constants/url.constants";
import ProfilePage from "../pages/ProfilePage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import BlogDetail from "../pages/BlogDetail";
import ProductDetailsPage from "../pages/ProductDetailsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={URL_CONSTANTS.HOME} element={<HomePage />} />
      <Route path={URL_CONSTANTS.PROFILE} element={<ProfilePage />} />
      <Route path={URL_CONSTANTS.BLOG} element={<BlogPage />} />
      <Route path={URL_CONSTANTS.CONTACT} element={<ContactPage />} />
      <Route path={URL_CONSTANTS.BLOG_DETAIL} element={<BlogDetail />} />
      <Route path={URL_CONSTANTS.DETAIL} element={<ProductDetailsPage />} />
      
      
    </Routes>
  );
}
