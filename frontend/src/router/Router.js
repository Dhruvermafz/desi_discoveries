import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ScrollToTop from "../utils/scrollToTop";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import ThankYou from "../pages/ThankYou";
const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/search" element={<SearchResultList />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
};

export default Router;
