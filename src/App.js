import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./shared/components/Navbar";
//import { PriceGraph } from "./shared/components/PriceGraph";
//import { VolumeGraph } from "./shared/components/VolumeGraph";
import { Footer } from "./shared/components/Footer";
import { ProductListPage } from "./pages/ProductList";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { Product } from "./shared/components/Product";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductList" element={<ProductListPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
