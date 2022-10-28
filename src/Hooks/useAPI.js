import { useState, useEffect } from "react";
import {
  catalogueAPI,
  itemPriceAPI,
} from "../shared/components/ItemList/ItemList";

export const useFetchItemStats = () => {
  const [api, setApi] = useState([]);

  const checkLocalStorageForAPI = async () => {
    const localItemInfo = localStorage.getItem("localItemInfo");
    if (localItemInfo != null) {
      return JSON.parse(localItemInfo);
    } else {
      const ItemInfoResponse = await fetch(catalogueAPI);
      const ItemInfoJSON = await ItemInfoResponse.json();
      localStorage.setItem("localItemInfo", JSON.stringify(ItemInfoJSON));
      return JSON.parse(localStorage.getItem("localItemInfo"));
    }
  };

  const mergePriceData = async () => {
    const localItemInfo = await checkLocalStorageForAPI();
    const ItemPriceResponse = await fetch(itemPriceAPI);
    const itemPriceJSON = await ItemPriceResponse.json();
    const itemArray = Object.keys(itemPriceJSON.data).map((key) => [
      Number(key),
      itemPriceJSON.data[key],
    ]);
    localItemInfo.map((item) => {
      const latestPriceData = itemArray.filter(
        (matchingID) => matchingID[0] === item.id
      )[0];
      if (latestPriceData?.length > 0) {
        setApi((api) => ({
          ...api,
          [item.id]: {
            ...item,
            ...latestPriceData,
          },
        }));
      }
    });
    return console.log("test");
  };

  useEffect(() => {
    mergePriceData();
  }, []);

  return api;
};
