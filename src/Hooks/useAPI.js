import { useState, useEffect } from "react";
import {
  catalogueAPI,
  itemPriceAPI,
} from "../shared/components/ItemList/ItemList";

export const useFetchApi = () => {
  const [api, setApi] = useState([]);

  const fetchCatalogue = async () => {
    return await fetch(catalogueAPI)
      .then((response) => response.json())
      .then(async (items) => {
        await fetch(itemPriceAPI)
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
            });
          });
      });
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  return api;
};
