import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
const itemPriceAPI = "https://prices.runescape.wiki/api/v1/osrs/latest";
const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

export function Products() {
  /* set state to empty array, then populated it with fetched data from API
  used promises to return data in json then stored result in catalogue*/
  const [catalogue, setCatalogue] = useState([]);

  const fetchCatalogue = async () => {
    return await fetch(catalogueAPI)
      .then((response) => response.json())
      .then((items) => setCatalogue(items));
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  /* for the length of the catalogue array, i loop through each entry
   and append a row to the table  */
  return (
    <>
      <section className="product--list--count">
        There are {catalogue.length} items!
      </section>
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
                <td>
                  <Link key={item.id} to={"/Product/" + item.id}>
                    {item.name}
                  </Link>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
