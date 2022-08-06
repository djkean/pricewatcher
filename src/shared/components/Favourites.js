import React from "react";
import { Table } from "./Table";
import { Link } from "react-router-dom";
import {
  addFavourite,
  removeFavourite,
  loadFavourites,
} from "../functions/favourites";

export function Favourites() {
  const getFavourites = loadFavourites();
  return (
    <>
      {getFavourites?.length === 0 ? (
        <div className="no--favourites">
          You haven't set any favourites. You can do so on our{" "}
          <Link className="no--favourites--link" to="/ProductList">
            Products
          </Link>{" "}
          page.
        </div>
      ) : (
        <>
          <h2 className="favourites--title">Your Favourites</h2>
          <Table favourites={getFavourites} />
        </>
      )}
    </>
  );
}
