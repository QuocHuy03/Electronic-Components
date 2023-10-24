import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { URL_CONSTANTS } from "../constants/url.constants";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={URL_CONSTANTS.HOME} element={<HomePage />} />
    </Routes>
  );
}
