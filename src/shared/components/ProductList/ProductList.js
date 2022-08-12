import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { ProductsTable } from "../ProductsTable/ProductsTable";

const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
export const itemPriceAPI = "https://prices.runescape.wiki/api/v1/osrs/latest";
export const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

export function Products() {
  const [catalogue, setCatalogue] = useState([]);

  const fetchCatalogue = async () => {
    return await fetch(catalogueAPI)
      .then((response) => response.json())
      .then((items) => setCatalogue(items));
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  return (
    <>
      {catalogue.length === 0 ? (
        <Loader />
      ) : (
        <ProductsTable apiResults={catalogue} />
      )}
    </>
  );
}
