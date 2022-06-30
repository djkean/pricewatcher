import React from "react";
import placeholderGraph from "./images/pGraph.png";

export function PriceGraph() {
  return (
    <>
      <div className="pricegraph--title">"insert item name" Price</div>
      <img src={placeholderGraph} className="pricegraph--graph" alt="hello" />
    </>
  );
}
