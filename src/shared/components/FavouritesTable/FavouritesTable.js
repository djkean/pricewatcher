import React, { useState } from "react";
import { Link } from "react-router-dom";
import { itemImage } from "../../../API/API";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { unfavIcon } from "../images/removeFavourite";

export const removeFavourite = (id) => {
  const favList = JSON.parse(
    localStorage.getItem("osrs-pricewatcher-favourites-01")
  );
  if (favList === null) return;
  const updatedFavourites = favList.filter((checkID) => checkID.id !== id);
  return updatedFavourites;
};

export function FavouritesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [localValues, setLocalValues] = useLocalStorage(
    "osrs-pricewatcher-favourites-01",
    localStorage.getItem("osrs-pricewatcher-favourites-01")
  );

  const previousPage = currentPage - 1;
  const progressPage = currentPage + 1;
  const itemsPerPage = 50;
  const totalPages = localValues?.length
    ? Math.ceil(localValues?.length / itemsPerPage)
    : 1;
  console.log(localValues);
  const itemsOnCurrentPage =
    Object.keys(localValues)
      ?.sort((a, b) => localValues[a].name.localeCompare(localValues[b].name))
      ?.filter(
        (_, index) =>
          index < currentPage * itemsPerPage &&
          index >= (currentPage - 1) * itemsPerPage
      ) ?? 0;
  console.log(localValues);

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
              <th className="table--high--price">High Price</th>
              <th className="table--low--price">Low Price</th>
            </tr>
          </thead>
          <tbody>
            {itemsOnCurrentPage.length > 0 ? (
              itemsOnCurrentPage.map((item) => (
                <tr key={localValues[item].id}>
                  <td className="table--image">
                    <img
                      src={itemImage(localValues[item].icon.replace(/ /g, "_"))}
                      alt=" "
                    />
                  </td>
                  <td>
                    <div className="table--name--div">
                      <Link
                        key={localValues[item].id}
                        to={"/Item/" + localValues[item].id}
                        state={{ data: localValues[item] }}
                      >
                        {localValues[item].name}
                      </Link>
                      <button
                        className="favourites--button"
                        onClick={() =>
                          setLocalValues(removeFavourite(localValues[item].id))
                        }
                      >
                        {unfavIcon}
                      </button>
                    </div>
                  </td>
                  <td className="table--high--number">
                    {localValues[item][1].high.toLocaleString()}
                  </td>
                  <td className="table--low--number">
                    {localValues[item][1].low.toLocaleString()}
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
