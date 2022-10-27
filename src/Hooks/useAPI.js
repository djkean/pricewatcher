import { useState, useEffect } from "react";
import {
  catalogueAPI,
  itemPriceAPI,
} from "../shared/components/ItemList/ItemList";

export const useFetchApi = () => {
  const [api, setApi] = useState([]);
  const checkForLocalApi2 = async (localCatalogue) => {
    if (localCatalogue) {
      return localCatalogue;
    } else {
      const itemDetailResponse = await fetch(catalogueAPI);
      const itemDetailJSON = await itemDetailResponse.json();
      localStorage.setItem("localCatalogue", JSON.stringify(itemDetailJSON));
      return JSON.parse(localStorage.getItem("localCatalogue"));
    }
  };

  const fetchCatalogue2 = async () => {
    let localCatalogue;
    localCatalogue = await checkForLocalApi2(localCatalogue);
    const itemPriceResponse = await fetch(itemPriceAPI);
    const itemPriceJSON = await itemPriceResponse.json();
    const itemArray = Object.keys(itemPriceJSON.data).map((key) => [
      Number(key),
      itemPriceJSON.data[key],
    ]);
    localCatalogue.map((item) => {
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
    fetchCatalogue2();
  }, []);

  return api;
};
