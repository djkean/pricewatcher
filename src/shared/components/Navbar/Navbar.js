import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link className="nav--title" to="/">
        OSRS PriceWatcher
      </Link>
      <span className="nav--search">
        Search:
        <input className="nav--search-field" placeholder="Item Name"></input>
        <Link className="nav--link" to="/">
          Home
        </Link>
        <Link className="nav--link" to="/ProductList">
          Items
        </Link>
        <Link className="nav--link" to="/Favourites">
          Favourites
        </Link>
      </span>
    </nav>
  );
}

// <span className="nav--link">Random Page</span>
