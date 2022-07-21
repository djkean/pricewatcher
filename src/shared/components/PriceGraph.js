import React from "react";
import placeholderGraph from "./images/pGraph.png";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Page A", low: 400, high: 1400, amt: 2400 },
  { name: "Page B", low: 770, high: 2400, amt: 2400 },
  { name: "Page C", low: 900, high: 3100, amt: 2400 },
];

export function RenderChart() {
  return (
    <div className="graph--data">
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="low" stroke="#8884d8" />
        <Line type="monotone" dataKey="high" stroke="#FFCC00" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export function PriceGraph() {
  return (
    <>
      <div className="pricegraph--title">"insert item name" Price</div>
      <img src={placeholderGraph} className="pricegraph--graph" alt="hello" />
    </>
  );
}
