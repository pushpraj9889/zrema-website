import Home from "./pages/home";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import React from "react";
import HeaderSection from "./components/header";
import CheckoutPage from "./pages/checkoutPage";
import Viewcart from "./pages/ViewcartPage";
import ProductPage from "./pages/singleProductPage";
import Order from "./pages/order/Order";
import QazmiFooter from "./components/footerSection";
import PrivacyPolicy from "./pages/privacyPolicy";
import RefundPolicy from "./pages/refundPolicy";
import ShippingPolicy from "./pages/shippingPolicy";
import TermsOfService from "./pages/terms&Conditions";
import Contact from "./pages/contact";
import AboutUs from "./pages/AboutUs";

export default function App() {
  const location = useLocation();
  const noHeaderRoutes = [
    "/CheckoutPage",
    // "/ProductPage",
    "/QazmiCartPage",
    "/Order",
  ];
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowHeader && <HeaderSection />}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/QazmiCartPage" element={<Viewcart />}></Route>
        <Route path="/CheckoutPage" element={<CheckoutPage />}></Route>
        <Route path="/ProductPage/:id" element={<ProductPage />}></Route>
        <Route path="/Order" element={<Order />}></Route>
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/RefundPolicy" element={<RefundPolicy />}></Route>
        <Route path="/ShippingPolicy" element={<ShippingPolicy />}></Route>
        <Route path="/TermsOfService" element={<TermsOfService />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
      </Routes>
      <QazmiFooter />
    </>
  );
}
