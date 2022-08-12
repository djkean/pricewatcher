import React from "react";
import { Products } from "../../shared/components/ProductList/ProductList";

export const ProductListPage = () => {
  return (
    <div className="page">
      <h2>Product List</h2>
      <Products />
    </div>
  );
};