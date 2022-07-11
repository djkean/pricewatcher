import React from "react";
import { useParams } from "react-router-dom";
import { catalogueAPI, itemPriceAPI } from "./ProductList";
import { PriceGraph } from "./PriceGraph";
import { VolumeGraph } from "./VolumeGraph";

export function Product() {
  const routeParams = useParams();
  const productID = routeParams.id;
  return (
    <article className="product">
      <section className="product--details">
        <div className="product--head">
          <img src className="product--image" />
          <h2 className="product--name">Product Name</h2>
          <span className="product--id"> - {productID}</span>
        </div>
        <span className="product--buylimit">Buy Limit:</span>
        <span className="product--examine">Examine Text:</span>
      </section>
      <section className="product--stats">
        <div id="high--stats">
          <span className="product--stats" id="p--price--high">
            High Price:
          </span>
          <span className="product--stats" id="p--volume--high">
            High Volume:
          </span>
        </div>
        <div id="low--stats">
          <span className="product--stats" id="p--price--low">
            Low Price:
          </span>
          <span className="product--stats" id="p--volume--low">
            Low Volume:
          </span>
        </div>
        <PriceGraph />
        <VolumeGraph />
      </section>
    </article>
  );
}
