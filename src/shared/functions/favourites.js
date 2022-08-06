import React from "react";
import { Link } from "react-router-dom";
import { Favourites } from "../components/Favourites";

export const addFavourite = (item) => {
  if (localStorage.getItem("favourites") === null) {
    localStorage.setItem("favourites", JSON.stringify([item]));
  } else {
    const favouriteItems = localStorage.getItem("favourites");
    favouriteItems.push(item);
    localStorage.setItem("favourites", JSON.stringify(favouriteItems));
    console.log("favourites", localStorage.getItem("favourites"));
  }
};

export const removeFavourite = () => {
  localStorage.removeItem("favourites", JSON.stringify("favourites"));
};
export const loadFavourites = () => {
  const getFavourites = JSON.parse(localStorage.getItem("favourites"));
  if (localStorage.getItem("favourites") === null) {
    return (
      <div className="no--favourites">
        You haven't set any favourites. You do so on our{" "}
        <Link className="no--favourites--link" to="/ProductList">
          Products
        </Link>{" "}
        page.
      </div>
    );
  } else {
    return <Favourites content={getFavourites} />;
  }
};
