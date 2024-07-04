import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ScrollToTop from "../utils/scrollToTop";
const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default Router;
