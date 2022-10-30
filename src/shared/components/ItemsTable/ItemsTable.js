import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";
import { itemImage } from "../../../API/API";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { favIcon } from "../images/addFavourite";
import { alreadyFavIcon } from "../images/alreadyFavourite";
import { removeFavourite } from "../FavouritesTable/FavouritesTable";
import { useFetchItemStats } from "../../../Hooks/useAPI";

const addFavourite = (itemData) => {
  let tempStorage = [];
  if (localStorage.getItem("favourites") === null) {
    tempStorage.push(itemData);
    return tempStorage;
  }
  tempStorage = JSON.parse(localStorage.getItem("favourites"));
  const checkForDuplicates = Object.values(tempStorage).filter(
    (favItem) => favItem.id === itemData.id
  ).length;
  if (checkForDuplicates === 0) {
    tempStorage.push(itemData);
  }
  return tempStorage;
};

export const checkIfFavourite = (id) => {
  const favList = JSON.parse(localStorage.getItem("favourites"));
  if (favList === null) return false;
  return Object.values(favList).filter((checkID) => checkID.id === id).length;
};

export function ItemsTable() {
  const itemStatsResults = useFetchItemStats();
  const [localValues, setLocalValues] = useLocalStorage(
    "favourites",
    localStorage.getItem("favourites")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogueItems, setCatalogueItems] = useState([]);
  const [matchingItems, setMatchingItems] = useState([]);
  useEffect(() => {
    setCatalogueItems(itemStatsResults);
    setMatchingItems(itemStatsResults);
  }, [itemStatsResults]);

  const getMatchingItems = (searchValue) => {
    const filteredItems = Object.values(catalogueItems).filter(
      (key) => key.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
    setMatchingItems(filteredItems);
  };

  const handleChange = (searchValue) => {
    setCurrentPage(1);
    return getMatchingItems(searchValue);
  };
  const previousPage = currentPage - 1;
  const progressPage = currentPage + 1;
  const itemsPerPage = 50;
  const totalPages = Math.ceil(
    Object.keys(matchingItems).length / itemsPerPage
  );
  const itemsOnCurrentPage = useMemo(() => {
    const itemsOnPageMemo = Object.keys(matchingItems)
      ?.sort((a, b) =>
        matchingItems[a].name.localeCompare(matchingItems[b].name)
      )
      ?.filter(
        (_, index) =>
          index < currentPage * itemsPerPage &&
          index >= (currentPage - 1) * itemsPerPage
      );
    return itemsOnPageMemo;
  }, [currentPage, matchingItems]);

  if (catalogueItems?.length === 0) return <Loader />;

  if (matchingItems.length === 0) {
    return (
      <div>
        <section className="itemlist--search">
          <input
            className="itemlist--search--field"
            placeholder="Search by item name"
            type="text"
            onChange={(e) => handleChange(e.target.value)}
          ></input>
        </section>
        <section className="itemlist--no--matches">
          <span className="itemlist--number">0 </span> items matched your
          search.
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="itemlist--search">
        <input
          className="itemlist--search--field"
          placeholder="Search by item name"
          type="text"
          onChange={(e) => handleChange(e.target.value)}
        ></input>
      </section>
      <section className="itemlist--count">
        <span className="itemlist--number">
          {Object.keys(matchingItems).length.toLocaleString()}
        </span>{" "}
        items matched your search.
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
          {itemsOnCurrentPage.map((item) => {
            const favButton = checkIfFavourite(matchingItems[item].id) ? (
              <button
                className="favourites--button favourites--button--remove"
                onClick={() =>
                  setLocalValues(removeFavourite(matchingItems[item].id))
                }
              >
                {alreadyFavIcon}
              </button>
            ) : (
              <button
                className="favourites--button favourites--button--add"
                onClick={() =>
                  setLocalValues(addFavourite(matchingItems[item]))
                }
              >
                {favIcon}
              </button>
            );
            return (
              <tr key={item}>
                <td className="table--image">
                  <img
                    src={itemImage(matchingItems[item].icon.replace(/ /g, "_"))}
                    alt=" "
                  />
                </td>
                <td>
                  <div className="table--name--div">
                    <Link
                      key={item}
                      to={"/Item/" + matchingItems[item].id}
                      state={{ data: matchingItems[item] }}
                    >
                      {matchingItems[item].name}
                    </Link>
                    {favButton}
                  </div>
                </td>
                <td className="table--high--number">
                  {matchingItems[item][1].high.toLocaleString()}
                </td>
                <td className="table--low--number">
                  {matchingItems[item][1].low.toLocaleString()}
                </td>
              </tr>
            );
          })}
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
  );
}
