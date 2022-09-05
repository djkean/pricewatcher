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
  const dupeCheck = tempStorage.filter(
    (favItem) => favItem.id === item.id
  ).length;
  if (dupeCheck === 0) {
    tempStorage.push(item);
  }
  return tempStorage;
};

export function ProductsTable({ apiResults }) {
  const [localValues, setLocalValues] = useLocalStorage(
    "favourites",
    localStorage.getItem("favourites")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogueItems, setCatalogueItems] = useState([]);
  const [searchItems, setSearchItems] = useState("");
  useEffect(() => {
    setCatalogueItems(apiResults);
  }, [apiResults]);

  const previousPage = currentPage - 1;
  const progressPage = currentPage + 1;
  const itemsPerPage = 50;
  const totalPages = Math.round(
    catalogueItems.filter(
      (searchResults) => searchResults.name.indexOf(searchItems) > -1
    ).length / itemsPerPage
  );
  const itemPage = catalogueItems
    .filter((searchResults) => searchResults.name.indexOf(searchItems) > -1)
    .filter(
      (_, index) =>
        index < currentPage * itemsPerPage &&
        index > (currentPage - 1) * itemsPerPage
    );

  const handleSearch = (searchValue) => {
    return setSearchItems(searchValue);
  };
  if (catalogueItems?.length === 0) return <Loader />;

  if (
    catalogueItems.filter((searchResults) =>
      searchResults.name.includes(searchItems)
    ).length === 0
  ) {
    return (
      <div>
        <section className="itemlist--search">
          Search:
          <input
            className="itemlist--search--field"
            placeholder="Item Name"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
        </section>
        <section className="product--list--count">
          No items matched your search
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="itemlist--search">
        Search:
        <input
          className="itemlist--search--field"
          placeholder="Item Name"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
      </section>
      <section className="product--list--count">
        There are{" "}
        {
          catalogueItems.filter(
            (searchResults) => searchResults.name.indexOf(searchItems) > -1
          ).length
        }{" "}
        items!
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
      <table className="product--list--table">
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
          {catalogueItems.filter(
            (searchResults) => searchResults.name.indexOf(searchItems) > -1
          ) &&
            itemPage.map((item) => (
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
