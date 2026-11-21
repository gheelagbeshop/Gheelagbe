import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import ScrollToTop from "./ScrollTop";

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
