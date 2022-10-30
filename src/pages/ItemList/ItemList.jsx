import React from "react";
import { ItemsTable } from "../../shared/components/ItemsTable/ItemsTable";

export const ItemListPage = () => {
  return (
    <div className="page">
      <div className="table--page">
        <h2 className="items--title">Item List</h2>
        <ItemsTable />
      </div>
    </div>
  );
};
