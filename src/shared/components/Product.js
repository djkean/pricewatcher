import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { itemPriceAPI } from "./ProductList";
import { PriceGraph } from "./PriceGraph";
import { VolumeGraph } from "./VolumeGraph";

export function Product() {
  const routeParams = useParams();
  const productID = routeParams.id;
  const itemData = useLocation();
  const [price, setPrice] = useState([]);
  const fetchItemPrice = async () => {
    try {
      return await fetch(itemPriceAPI + "?id=" + itemData.state?.data.id)
        .then((response) => response.json())
        .then((price) => setPrice(price?.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemPrice();
  }, []);
  console.log(itemData);
  console.log(price);

  return (
    <article className="product">
      <section className="product--details">
        <div className="product--head">
          <img src className="product--image" />
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
        <div id="high--stats">
          <span className="product--stats">High Price: {price?.high}</span>
          <span className="product--stats">High Volume:</span>
        </div>
        <div id="low--stats">
          <span className="product--stats">Low Price: {price?.low}</span>
          <span className="product--stats">Low Volume:</span>
        </div>
        <PriceGraph />
        <VolumeGraph />
      </section>
    </article>
  );
}
