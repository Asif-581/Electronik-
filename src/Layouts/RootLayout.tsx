import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
