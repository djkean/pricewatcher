import React from "react";
import { Table } from "./Table";
import { Loader } from "./Loader";
import {
  addFavourite,
  removeFavourite,
  loadFavourites,
} from "../functions/favourites";

export function Favourites(props) {
  const { content } = props;
  console.log(content);
  return (
    <>
      {content?.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h2 className="favourites--title">Your Favourites</h2>
          <Table />
        </>
      )}
    </>
  );
}
