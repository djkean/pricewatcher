import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { ItemsTable } from "../ItemsTable/ItemsTable";

export const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
export const itemPriceAPI = "https://prices.runescape.wiki/api/v1/osrs/latest";
export const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

export function Items() {
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
        <ItemsTable apiResults={catalogue} />
      )}
    </>
  );
}
