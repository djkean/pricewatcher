import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { addFavourite, removeFavourite } from "../functions/favourites";

export const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
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
        <>
          <section className="product--list--count">
            There are {catalogue.length} items!
          </section>
          <table className="product--list--table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>High Price</th>
                <th>Low Price</th>
              </tr>
            </thead>
            <tbody>
              {catalogue.length > 0 &&
                catalogue.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={itemImage(item.icon.replace(/ /g, "_"))}
                        alt=" "
                      />
                    </td>
                    <td>
                      <Link
                        key={item.id}
                        to={"/Product/" + item.id}
                        state={{ data: item }}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <button
                        className="favourites--button"
                        onClick={() => addFavourite(item)}
                      >
                        !!!
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
