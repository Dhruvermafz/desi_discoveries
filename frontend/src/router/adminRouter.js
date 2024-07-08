import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminWrapper from "../components/admin/AdminWrapper";
import TourList from "../components/admin/Tours/TourList";
const AdminRoutes = () => {
  return (
    <AdminWrapper>
      <Routes>
        <Route path="/" element={<AdminWrapper />} />
        <Route path="/tours" element={<TourList />} />
        <Route path="/users" />
        {/* Add other admin routes here */}
      </Routes>
    </AdminWrapper>
  );
};

export default AdminRoutes;
