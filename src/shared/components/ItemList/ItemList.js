import React from "react";
import { Loader } from "../Loader";
import { ItemsTable } from "../ItemsTable/ItemsTable";
import { useFetchItemStats } from "../../../Hooks/useAPI";

export const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
export const itemPriceAPI = "https://prices.runescape.wiki/api/v1/osrs/latest";
export const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

export function Items() {
  const api = useFetchItemStats();

  return <>{api.length === 0 ? <Loader /> : <ItemsTable apiResults={api} />}</>;
}
