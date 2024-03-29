import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link className="nav--title" to="/pricewatcher">
        OSRS PriceWatcher
      </Link>
      <span className="nav--links">
        <Link className="nav--link" to="/pricewatcher">
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
