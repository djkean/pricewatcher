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
  const checkForDuplicates = tempStorage.filter(
    (favItem) => favItem.id === item.id
  ).length;
  if (checkForDuplicates === 0) {
    tempStorage.push(item);
  }
  return tempStorage;
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
    setCatalogueItems(apiResults);
    setMatchingItems(apiResults);
  }, [apiResults]);

  const getMatchingItems = (searchValue) => {
    const filteredItems = catalogueItems.filter(
      (catalogueItem) =>
        catalogueItem.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
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
  const itemsOnCurrentPage = matchingItems.filter(
    (_, index) =>
      index <= currentPage * itemsPerPage &&
      index >= (currentPage - 1) * itemsPerPage
  );

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
            <th className="table--image"></th>
          </tr>
        </thead>
        <tbody>
          {itemsOnCurrentPage.map((item) => (
            <tr key={item.id}>
              <td className="table--image">
                <img src={itemImage(item.icon.replace(/ /g, "_"))} alt=" " />
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
