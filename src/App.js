import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./shared/components/Navbar/Navbar";
import { Footer } from "./shared/components/Footer/Footer";
import { ProductListPage } from "./pages/ProductList";
import { HomePage } from "./pages/Home";
import { Product } from "./shared/components/Product/Product";
import { FavouritesTable } from "./shared/components/FavouritesTable/FavouritesTable";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ItemList" element={<ProductListPage />} />
        <Route path="/Item/:id" element={<Product />} />
        <Route path="/Favourites" element={<FavouritesTable />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
