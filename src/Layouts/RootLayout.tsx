import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Footer from "../components/Footer";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
