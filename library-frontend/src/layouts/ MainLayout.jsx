// src/layouts/MainLayout.jsx
import React from "react";
import AppNavbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
