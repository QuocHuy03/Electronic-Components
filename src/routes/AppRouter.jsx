import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { URL_CONSTANTS } from "../constants/url.constants";
import ProfilePage from "../pages/ProfilePage";
import Filter from "../pages/FilterPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={URL_CONSTANTS.HOME} element={<HomePage />} />
      <Route path={URL_CONSTANTS.PROFILE} element={<ProfilePage />} />
      <Route path={URL_CONSTANTS.FILTER} element={<Filter />} />
    </Routes>
  );
}
