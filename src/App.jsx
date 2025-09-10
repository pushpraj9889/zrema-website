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
import Collections from "./pages/collections";
import ReturnPolicy from "./pages/returnPolicy";
import OrderHistroy from "./pages/orderHistory";
import OrderStatus from "./pages/orderStatus";
import { Toaster } from "react-hot-toast";

export default function App() {
  const location = useLocation();
  const noHeaderRoutes = [
    "/CheckoutPage",
    // "/ProductPage",
    // "/QazmiCartPage",
    "/Order",
  ];
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowHeader && <HeaderSection />}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ZremaCartPage" element={<Viewcart />}></Route>
        <Route path="/CheckoutPage" element={<CheckoutPage />}></Route>
        <Route path="/ProductPage/:id" element={<ProductPage />}></Route>
        <Route path="/Order" element={<Order />}></Route>
        <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
        <Route path="/refund_policy" element={<RefundPolicy />}></Route>
        <Route path="/shipping_policy" element={<ShippingPolicy />}></Route>
        <Route path="/T&C" element={<TermsOfService />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route
          path="/Collections/:subcategory"
          element={<Collections />}
        ></Route>
        <Route path="/Collections/:category" element={<Collections />}></Route>

        <Route path="/Collections" element={<Collections />} />

        <Route path="/return_policy" element={<ReturnPolicy />}></Route>
        <Route path="/OrderHistroy" element={<OrderHistroy />}></Route>
        <Route path="/order-status" element={<OrderStatus />}></Route>
      </Routes>
      <QazmiFooter />
        <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
