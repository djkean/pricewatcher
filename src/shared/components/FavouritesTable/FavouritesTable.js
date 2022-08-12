import React from "react";
import { Link } from "react-router-dom";
import { itemImage } from "../ProductList/ProductList";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { unfavIcon } from "../images/removeFavourite";

const removeFavourite = (id) => {
  const favList = JSON.parse(localStorage.getItem("favourites"));
  if (favList === null) return;
  const updatedFavourites = favList.filter((checkID) => checkID.id !== id);
  return updatedFavourites;
};

export function FavouritesTable() {
  const [localValues, setLocalValues] = useLocalStorage(
    "favourites",
    localStorage.getItem("favourites")
  );

  return (
    <>
      <h2 className="favourites--title">Your Favourites</h2>
      <section className="product--list--count">
        There are {localValues.length} items!
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
          {localValues.length > 0 ? (
            localValues.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={itemImage(item.icon.replace(/ /g, "_"))} alt=" " />
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
                    onClick={() => setLocalValues(removeFavourite(item.id))}
                  >
                    {unfavIcon}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                {" "}
                You haven't set any favourites. You can do so on our{" "}
                <Link className="no--favourites--link" to="/ProductList">
                  Products
                </Link>{" "}
                page.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
