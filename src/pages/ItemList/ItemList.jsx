import React from "react";
import { Items } from "../../shared/components/ItemList/ItemList";

export const ItemListPage = () => {
  return (
    <div className="page">
      <div className="table--page">
        <h2 className="items--title">Item List</h2>
        <Items />
      </div>
    </div>
  );
};
