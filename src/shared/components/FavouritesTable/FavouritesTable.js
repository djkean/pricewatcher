import React, { useState } from "react";
import { Link } from "react-router-dom";
import { itemImage } from "../ItemList/ItemList";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { unfavIcon } from "../images/removeFavourite";

const removeFavourite = (id) => {
  const favList = JSON.parse(localStorage.getItem("favourites"));
  if (favList === null) return;
  const updatedFavourites = favList.filter((checkID) => checkID.id !== id);
  return updatedFavourites;
};

export function FavouritesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [localValues, setLocalValues] = useLocalStorage(
    "favourites",
    localStorage.getItem("favourites")
  );

  const previousPage = currentPage - 1;
  const progressPage = currentPage + 1;
  const itemsPerPage = 50;
  const totalPages = Math.ceil(localValues.length / itemsPerPage);
  const itemsOnCurrentPage = localValues.filter(
    (_, index) =>
      index <= currentPage * itemsPerPage &&
      index >= (currentPage - 1) * itemsPerPage
  );

  return (
    <div className="page">
      <div className="table--page">
        <h2 className="favourites--title">Your Favourites</h2>
        <section className="itemlist--count">
          You have {localValues.length} favourites!
        </section>
        <button
          className="button--page"
          onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          disabled={currentPage - 1 < 1 ? true : false}
        >
          {previousPage}
        </button>
        <span className="page--current--top">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="button--page"
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
          disabled={currentPage >= totalPages ? true : false}
        >
          {progressPage}
        </button>
        <table className="itemlist--table">
          <thead>
            <tr>
              <th className="table--image"></th>
              <th className="table--name">Item Name</th>
              <th>High Price</th>
              <th>Low Price</th>
            </tr>
          </thead>
          <tbody>
            {itemsOnCurrentPage.length > 0 ? (
              itemsOnCurrentPage.map((item) => (
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
                    <button
                      className="favourites--button"
                      onClick={() => setLocalValues(removeFavourite(item.id))}
                    >
                      {unfavIcon}
                    </button>
                  </td>
                  <td></td>
                  <td></td>
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
        <div className="page--buttons">
          <button
            className="button--page"
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
            disabled={currentPage - 1 < 1 ? true : false}
          >
            {previousPage}
          </button>
          <span className="page--current--bottom">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="button--page"
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            disabled={currentPage >= totalPages ? true : false}
          >
            {progressPage}
          </button>
        </div>
      </div>
    </div>
  );
}
