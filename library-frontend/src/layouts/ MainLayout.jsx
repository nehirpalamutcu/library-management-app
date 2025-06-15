// src/layouts/MainLayout.jsx
import React from "react";
import AppNavbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
