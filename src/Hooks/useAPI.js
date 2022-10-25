import { useState, useEffect } from "react";
import {
  catalogueAPI,
  itemPriceAPI,
} from "../shared/components/ItemList/ItemList";

export const useFetchApi = () => {
  const [api, setApi] = useState([]);
  let localCatalogue = JSON.parse(localStorage.getItem("localCatalogue"));

  // console.log(localCatalogue);
  const checkForLocalApi2 = async () => {
    if (!localCatalogue) {
      const itemDetailResponse = await fetch(catalogueAPI);
      const itemDetailJSON = await itemDetailResponse.json();
      localStorage.setItem("localCatalogue", JSON.stringify(itemDetailJSON));
      localCatalogue = JSON.parse(localStorage.getItem("localCatalogue"));
      // console.log(itemDetailJSON);
      // console.log(JSON.parse(localStorage.getItem("localCatalogue")));
      // console.log(localCatalogue);
      return;
    }
  };

  const fetchCatalogue2 = async () => {
    await checkForLocalApi2();
    const itemPriceResponse = await fetch(itemPriceAPI);
    const itemPriceJSON = await itemPriceResponse.json();
    const itemArray = Object.keys(itemPriceJSON.data).map((key) => [
      Number(key),
      itemPriceJSON.data[key],
    ]);
    // console.log(localCatalogue, "hi");
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
      return api;
    });
    //console.log(localCatalogue);
  };

  useEffect(() => {
    //checkForLocalApi2();
    fetchCatalogue2();
  }, []);

  return api;
};
