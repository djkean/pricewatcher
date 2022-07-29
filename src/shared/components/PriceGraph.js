import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const data = [
  { name: "01:00", low: 800, high: 1400, amt: 2400 },
  { name: "02:00", low: 1770, high: 2400, amt: 2400 },
  { name: "03:00", low: 1900, high: 3100, amt: 2400 },
  { name: "04:00", low: 2050, high: 3800, amt: 2400 },
  { name: "05:00", low: 2100, high: 3950, amt: 2400 },
  { name: "06:00", low: 2050, high: 3900, amt: 2400 },
  { name: "07:00", low: 2000, high: 3800, amt: 2400 },
  { name: "08:00", low: 1980, high: 3700, amt: 2400 },
  { name: "09:00", low: 1960, high: 3500, amt: 2400 },
  { name: "10:00", low: 1670, high: 3450, amt: 2400 },
  { name: "11:00", low: 1660, high: 3300, amt: 2400 },
  { name: "12:00", low: 1500, high: 3000, amt: 2400 },
];

export function PriceGraph() {
  return (
    <>
      <div className="pricegraph--title">"insert item name" Price</div>
      <div className="graph--data">
        <AreaChart width={800} height={400} data={data}>
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#CC8E31" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#CC8E31" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#43A836" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#43A836" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0 0" stroke="#ffebcd" />
          <XAxis
            axisLine={{ stroke: "#ffebcd" }}
            dataKey="name"
            tick={<CustomizedAxisTick offset={16} />}
          />
          <YAxis
            axisLine={{ stroke: "#ffebcd" }}
            tick={<CustomizedAxisTick offset={2} />}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#271b0a",
              borderRadius: "0.6em",
              border: "solid black 0.1em",
            }}
          />
          <Area
            type="monotone"
            dataKey="low"
            stroke="#CC8E31"
            fillOpacity={1}
            fill="url(#color1)"
          />
          <Area
            type="monotone"
            dataKey="high"
            stroke="#43A836"
            fillOpacity={1}
            fill="url(#color2)"
          />
        </AreaChart>
      </div>
    </>
  );
}

const CustomizedAxisTick = (props) => {
  const { x, y, payload, offset } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={offset} textAnchor="end" fill="#ffebcd">
        {payload.value}
      </text>
    </g>
  );
};
