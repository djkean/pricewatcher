import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { itemPriceAPI } from "./ProductList";
import { RenderChart, PriceGraph } from "./PriceGraph";
import { VolumeGraph } from "./VolumeGraph";

const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

export function Product() {
  const routeParams = useParams();
  const productID = routeParams.id;
  const itemData = useLocation();
  const [price, setPrice] = useState([]);

  const fetchItemPrice = () => {
    try {
      fetch(itemPriceAPI + "?id=" + itemData.state?.data.id)
        .then((response) => response.json())
        .then((price) => setPrice(price?.data[itemData?.state?.data?.id]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemPrice();
  }, []);

  console.log(itemData);
  console.log(price);
  console.log(itemImage(itemData.state.data.icon.replace(/ /g, "_")));
  return (
    <article className="product">
      <section className="product--details">
        <div className="product--head">
          <img
            src={itemImage(itemData.state.data.icon.replace(/ /g, "_"))}
            className="product--image"
            alt="something from oldschool runescape"
          />
          <h2 className="product--name">{itemData.state?.data.name}</h2>
          <span className="product--id"> - {productID}</span>
        </div>
        <span className="product--buylimit">
          Buy Limit: {itemData.state?.data.limit}
        </span>
        <span className="product--examine">
          Examine Text:
          <p className="product--examine--text">
            {itemData.state?.data.examine}
          </p>
        </span>
      </section>
      <section className="product--stats">
        <span className="product--stats">High Price: {price?.high}</span>
        <span className="product--stats">Low Price: {price?.low}</span>
        <RenderChart />
        <PriceGraph />
        <VolumeGraph />
      </section>
    </article>
  );
}
