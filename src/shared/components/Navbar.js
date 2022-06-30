import React from "react";

export function Navbar() {
  return (
    <nav>
      <h1 className="title">OSRS PriceWatcher</h1>
      <span className="nav--search">
        Search
        <input className="nav--search-field" placeholder="Item Name"></input>
        <span className="nav--about">About</span>
        <span className="nav--random">Random Page</span>
      </span>
    </nav>
  );
}
