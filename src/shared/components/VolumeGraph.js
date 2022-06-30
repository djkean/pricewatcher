import React from "react";
import placeholderGraph from "./images/pGraph.png";

export function VolumeGraph() {
  return (
    <>
      <div className="volumegraph--title">"insert item name" Volume</div>
      <img src={placeholderGraph} className="volumegraph--graph" alt="hello" />
    </>
  );
}
