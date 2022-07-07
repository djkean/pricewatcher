import React, { useEffect, useState } from "react";

const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
const itemPriceAPI = "https://prices.runescape.wiki/api/v1/osrs/latest";
const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

export function Products() {
  const [catalogue, setCatalogue] = useState([]);
  const fetchCatalogue = async () => {
    return await fetch(catalogueAPI)
      .then((response) => response.json())
      .then((items) => setCatalogue(items));
  };
  useEffect(() => {
    fetchCatalogue();
  }, []);
  return (
    <table className="product--list--table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Item Name</th>
          <th>Price High</th>
          <th>Price Low</th>
          <th>Volume High</th>
          <th>Volume Low</th>
        </tr>
      </thead>
      <tbody>
        {catalogue.length > 0 &&
          catalogue.map((item) => (
            <tr>
              <td>
                <img src={itemImage(item.icon.replace(/ /g, "_"))} />
              </td>
              <td>{item.name}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
