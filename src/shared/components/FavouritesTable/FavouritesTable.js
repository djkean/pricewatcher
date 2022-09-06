import React from "react";
import { Link } from "react-router-dom";
import { itemImage } from "../ItemList/ItemList";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { unfavIcon } from "../images/removeFavourite";
import { Break } from "../Break";

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
      <div className="table--page">
        <h2 className="favourites--title">Your Favourites</h2>
        <section className="itemlist--count">
          You have {localValues.length} favourites!
        </section>
        <table className="itemlist--table">
          <thead>
            <tr>
              <th className="table--image">Image</th>
              <th className="table--name">Item Name</th>
              <th>High Price</th>
              <th>Low Price</th>
              <th className="table--image"></th>
            </tr>
          </thead>
          <tbody>
            {localValues.length > 0 ? (
              localValues.map((item) => (
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
                  <Link className="no--favourites--link" to="/ItemList">
                    Items
                  </Link>{" "}
                  page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Break />
    </>
  );
}
