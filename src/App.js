import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./shared/components/Navbar";
import { Footer } from "./shared/components/Footer";
import { ProductListPage } from "./pages/ProductList";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { Product } from "./shared/components/Product";
import { Favourites } from "./shared/components/Favourites";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductList" element={<ProductListPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Favourites" element={<Favourites />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
