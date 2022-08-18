import React from "react";
import { Products } from "../../shared/components/ProductList/ProductList";

export const ProductListPage = () => {
  return (
    <div className="page">
      <div className="table--page">
        <h2 className="products--title">Product List</h2>
        <Products />
      </div>
    </div>
  );
};