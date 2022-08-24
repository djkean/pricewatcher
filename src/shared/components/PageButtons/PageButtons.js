import React from "react";

export function PageButtons({ totalItems, currentPage, itemsPerPage }) {
  let buttonCount = Math.round(totalItems / itemsPerPage);
  if (buttonCount > 5) {
    buttonCount = 5;
  }
  return (
    <>
      {[...Array(buttonCount)].map((_) => (
        <button className="page--button"></button>
      ))}
      <input className="page--search">page #</input>
    </>
  );
}
