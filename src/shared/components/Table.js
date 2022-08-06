import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { itemImage } from "./ProductList";
import { addFavourite, removeFavourite } from "../functions/favourites";

export function Table({ apiResults, favourites }) {
  let catalogue;
  if (apiResults) {
    catalogue = apiResults;
  } else if (favourites) {
    catalogue = favourites;
  } else {
    return <h2>RUH ROH RAGGY</h2>;
  }
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
                  <tr>
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
                        onClick={() => addFavourite()}
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
