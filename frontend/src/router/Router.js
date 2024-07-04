import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ScrollToTop from "../utils/scrollToTop";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Router;
