import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link className="nav--title" to="/">
        OSRS PriceWatcher
      </Link>
      <span className="nav--search">
        <Link className="nav--link--home" to="/">
          Home
        </Link>
        <Link className="nav--link" to="/ItemList">
          Items
        </Link>
        <Link className="nav--link" to="/Favourites">
          Favourites
        </Link>
      </span>
    </nav>
  );
}
