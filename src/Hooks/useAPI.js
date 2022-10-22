import { useState, useEffect } from "react";
import {
  catalogueAPI,
  itemPriceAPI,
} from "../shared/components/ItemList/ItemList";

export const useFetchApi = () => {
  const [api, setApi] = useState([]);
  const [localApi, setLocalApi] = useState([]);
  const localCatalogue = JSON.parse(localStorage.getItem("localCatalogue"));

  const checkForLocalApi = () => {
    if (!localCatalogue) {
      fetch(catalogueAPI).then((response) =>
        response.json().then((data) => {
          localStorage.setItem("localCatalogue", JSON.stringify(data));
          setLocalApi(data);
          console.log(data);
          console.log(JSON.parse(localStorage.getItem("localCatalogue")));
        })
      );
    } else {
      return localCatalogue;
    }
  };

  const fetchCatalogue = () => {
    fetch(catalogueAPI)
      .then((response) => response.json())
      .then((items) => {
        fetch(itemPriceAPI)
          .then((priceJSON) => priceJSON.json())
          .then((priceResponse) => {
            const itemArray = Object.keys(priceResponse.data).map((key) => [
              Number(key),
              priceResponse.data[key],
            ]);
            items.map((item) => {
              const latestPriceData = itemArray.filter(
                (itemPairs) => itemPairs[0] === item.id
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
          });
      });
    console.log(localCatalogue);
    console.log(localApi);
  };

  useEffect(() => {
    checkForLocalApi();
    fetchCatalogue();
  }, []);

  return api;
};
