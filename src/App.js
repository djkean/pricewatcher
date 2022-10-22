import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./shared/components/Navbar/Navbar";
import { Footer } from "./shared/components/Footer/Footer";
import { ItemListPage } from "./pages/ItemList";
import { HomePage } from "./pages/Home";
import { ItemDetails } from "./shared/components/ItemDetails/ItemDetails";
import { FavouritesTable } from "./shared/components/FavouritesTable/FavouritesTable";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/pricewatcher" element={<HomePage />} />
        <Route path="/ItemList" element={<ItemListPage />} />
        <Route path="/Item/:id" element={<ItemDetails />} />
        <Route path="/Favourites" element={<FavouritesTable />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
