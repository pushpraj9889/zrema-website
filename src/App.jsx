import Home from "./pages/home";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import React from "react";
import HeaderSection from "./components/header";
import CheckoutPage from "./pages/checkoutPage";
import Viewcart from "./pages/ViewcartPage";
import ProductPage from "./pages/singleProductPage";

export default function App() {
  const location = useLocation();
  const noHeaderRoutes = ["/CheckoutPage", "/ProductPage", "/QazmiCartPage"];
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowHeader && <HeaderSection />}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/QazmiCartPage" element={<Viewcart />}></Route>
        <Route path="/CheckoutPage" element={<CheckoutPage />}></Route>
        <Route path="/ProductPage" element={<ProductPage />}></Route>
      </Routes>
    </>
  );
}
