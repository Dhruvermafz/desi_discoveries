// src/routes/Router.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ScrollToTop from "../utils/scrollToTop";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import ThankYou from "../pages/ThankYou";
import Tours from "../pages/Tours";
import Login from "../pages/Login";
import FAQ from "../components/FAQ";
import Gallery from "../pages/Gallery";
import SearchResultList from "../pages/SearchResultList";
import TourDetails from "../pages/TourDetails";
import BlogDetails from "../pages/BlogDetails";
import Blogs from "../pages/Blogs";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AdminRoutes from "./adminRouter";
import AdminWrapper from "../components/admin/AdminWrapper";
import TourList from "../components/admin/Tours/TourList";
import TourCreate from "../components/admin/Tours/TourCreate";
import Profile from "../components/Profile/ProfilePage";
import RatingsReviews from "../components/admin/Reviews/Reviews";
import AddTourPackage from "../components/admin/Tours/AddTourPackage";
import UpdateTour from "../components/admin/Tours/UpdateTour";
import UserProfile from "../components/Profile/UserProfile";
import Queries from "../pages/Queries";
import BlogPage from "../components/admin/Blogs/BlogPage";
import BlogCreate from "../components/admin/Blogs/BlogCreate";
const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin/tours" element={<TourList />} />
        <Route path="/admin" element={<AdminWrapper />} />
        <Route path="/admin/tours/create" element={<AddTourPackage />} />
        <Route path="/admin/tours/update" element={<UpdateTour />} />
        <Route path="/admin/queries" element={<Queries />} />
        <Route path="/admin/blogs" element={<BlogPage />} />
        <Route path="/admin/blog/create" element={<BlogCreate />} />
        <Route path="/admin/reviews" element={<RatingsReviews />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/edit" element={<Profile />} />
        <Route path="/settings" element={<UserProfile />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/search" element={<SearchResultList />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
};

export default Router;
