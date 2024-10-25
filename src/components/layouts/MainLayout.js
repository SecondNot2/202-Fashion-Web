import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import LiveChat from "../atoms/LiveChat";
import ScrollToTop from "../atoms/ScrollToTop";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header isTransparent={isHomePage} />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
      <ScrollToTop />
      <LiveChat />
    </div>
  );
};

export default MainLayout;
