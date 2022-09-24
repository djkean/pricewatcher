import { useState, useEffect } from "react";
import { catalogueAPI } from "../shared/components/ItemList/ItemList";

export const useFetchApi = () => {
  const [api, setApi] = useState([]);

  const fetchCatalogue = async () => {
    return await fetch(catalogueAPI)
      .then((response) => response.json())
      .then((items) => setApi(items));
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  return api;
};
