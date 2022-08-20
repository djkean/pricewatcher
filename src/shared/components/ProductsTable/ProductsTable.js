import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";
import { itemImage } from "../../../API/API";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { favIcon } from "../images/addFavourite";

const addFavourite = (item) => {
  let tempStorage = [];
  if (localStorage.getItem("favourites") === null) {
    tempStorage.push(item);
    return tempStorage;
  }
  tempStorage = JSON.parse(localStorage.getItem("favourites"));
  const dupeCheck = tempStorage.filter(
    (favItem) => favItem.id === item.id
  ).length;
  if (dupeCheck === 0) {
    tempStorage.push(item);
  }
  return tempStorage;
};

export function ProductsTable({ apiResults }) {
  const [localValues, setLocalValues] = useLocalStorage(
    "favourites",
    localStorage.getItem("favourites")
  );
  const [catalogueItems, setCatalogueItems] = useState([]);
  useEffect(() => {
    setCatalogueItems(apiResults);
  }, [apiResults]);

  return (
    <div>
      {catalogueItems?.length === 0 ? (
        <Loader />
      ) : (
        <>
          <section className="product--list--count">
            There are {catalogueItems.length} items!
          </section>
          <table className="product--list--table">
            <thead>
              <tr>
                <th className="table--image"></th>
                <th className="table--name">Item Name</th>
                <th>High Price</th>
                <th>Low Price</th>
                <th className="table--image"></th>
              </tr>
            </thead>
            <tbody>
              {catalogueItems.length > 0 &&
                catalogueItems.map((item) => (
                  <tr key={item.id}>
                    <td className="table--image">
                      <img
                        src={itemImage(item.icon.replace(/ /g, "_"))}
                        alt=" "
                      />
                    </td>
                    <td>
                      <Link
                        key={item.id}
                        to={"/Item/" + item.id}
                        state={{ data: item }}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td></td>
                    <td></td>
                    <td className="table--image">
                      <button
                        className="favourites--button"
                        onClick={() => setLocalValues(addFavourite(item))}
                      >
                        {favIcon}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
