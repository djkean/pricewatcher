import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <h1 className="title">OSRS PriceWatcher</h1>
      <span className="nav--search">
        Search
        <input className="nav--search-field" placeholder="Item Name"></input>
        <Link className="nav--link" to="/">
          Home
        </Link>
        <Link className="nav--link" to="/ProductList">
          Products
        </Link>
        <Link className="nav--link" to="/About">
          About
        </Link>
        <span className="nav--link">Random Page</span>
      </span>
    </nav>
  );
}
