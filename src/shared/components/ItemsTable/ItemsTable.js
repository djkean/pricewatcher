import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";
import { itemImage } from "../../../API/API";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { favIcon } from "../images/addFavourite";
import { alreadyFavIcon } from "../images/alreadyFavourite";
import { removeFavourite } from "../FavouritesTable/FavouritesTable";

const addFavourite = (item) => {
  let tempStorage = [];
  if (localStorage.getItem("favourites") === null) {
    tempStorage.push(item);
    return tempStorage;
  }
  tempStorage = JSON.parse(localStorage.getItem("favourites"));
  const checkForDuplicates = tempStorage.filter(
    (favItem) => favItem[0] === item[0]
  ).length;
  if (checkForDuplicates === 0) {
    tempStorage.push(item);
  }
  return tempStorage;
};

export const checkIfFavourite = (id) => {
  const favList = JSON.parse(localStorage.getItem("favourites"));
  if (favList === null) return false;
  return favList.filter((checkID) => checkID[0] === id).length;
};

export function ItemsTable({ apiResults }) {
  const [localValues, setLocalValues] = useLocalStorage(
    "favourites",
    localStorage.getItem("favourites")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogueItems, setCatalogueItems] = useState([]);
  const [matchingItems, setMatchingItems] = useState([]);
  useEffect(() => {
    const itemArray = Object.keys(apiResults).map((key) => [
      Number(key),
      apiResults[key],
    ]);
    setCatalogueItems(itemArray);
    setMatchingItems(itemArray);
  }, [apiResults]);

  const getMatchingItems = (searchValue) => {
    const filteredItems = catalogueItems.filter(
      (catalogueItem) =>
        catalogueItem[1].name.toLowerCase().indexOf(searchValue.toLowerCase()) >
        -1
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
  const totalPages = Math.ceil(matchingItems.length / itemsPerPage);
  const itemsOnCurrentPage = useMemo(() => {
    const itemsOnPageMemo = matchingItems
      ?.sort((a, b) => a[1].name.localeCompare(b[1].name))
      ?.filter(
        (_, index) =>
          index <= currentPage * itemsPerPage &&
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
          {matchingItems.length.toLocaleString()}
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
            <th>High Price</th>
            <th>Low Price</th>
          </tr>
        </thead>
        <tbody>
          {itemsOnCurrentPage.map((item) => {
            const favButton = checkIfFavourite(item[0]) ? (
              <button
                className="favourites--button favourites--button--remove"
                onClick={() => setLocalValues(removeFavourite(item[0]))}
              >
                {alreadyFavIcon}
              </button>
            ) : (
              <button
                className="favourites--button favourites--button--add"
                onClick={() => setLocalValues(addFavourite(item))}
              >
                {favIcon}
              </button>
            );
            return (
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
                  {favButton}
                </td>
                <td>{item[1][1].high.toLocaleString()}</td>
                <td>{item[1][1].low.toLocaleString()}</td>
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
