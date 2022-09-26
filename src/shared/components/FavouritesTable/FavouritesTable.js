import React, { useState } from "react";
import { Link } from "react-router-dom";
import { itemImage } from "../ItemList/ItemList";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { unfavIcon } from "../images/removeFavourite";

export const removeFavourite = (id) => {
  const favList = JSON.parse(localStorage.getItem("favourites"));
  if (favList === null) return;
  const updatedFavourites = favList.filter((checkID) => checkID[0] !== id);
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
  const totalPages = localValues?.length
    ? Math.ceil(localValues?.length / itemsPerPage)
    : 1;
  const itemsOnCurrentPage =
    localValues
      ?.sort((a, b) => a[1].name.localeCompare(b[1].name))
      ?.filter(
        (_, index) =>
          index <= currentPage * itemsPerPage &&
          index >= (currentPage - 1) * itemsPerPage
      ) ?? 0;

  return (
    <div className="page">
      <div className="table--page">
        <h2 className="favourites--title">Your Favourites</h2>
        <section className="itemlist--count">
          You have {localValues?.length ?? 0} favourites!
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
                <tr key={item[0]}>
                  <td className="table--image">
                    <img
                      src={itemImage(item[1].icon.replace(/ /g, "_"))}
                      alt=" "
                    />
                  </td>
                  <td>
                    <Link
                      key={item[0]}
                      to={"/Item/" + item[0]}
                      state={{ data: item[1] }}
                    >
                      {item[1].name}
                    </Link>
                    <button
                      className="favourites--button"
                      onClick={() => setLocalValues(removeFavourite(item[0]))}
                    >
                      {unfavIcon}
                    </button>
                  </td>
                  <td className="table--high--number">
                    {item[1][1].high.toLocaleString()}
                  </td>
                  <td className="table--low--number">
                    {item[1][1].low.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no--favourites--text" colSpan={4}>
                  {" "}
                  You haven't set any favourites. You can do so on our
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
