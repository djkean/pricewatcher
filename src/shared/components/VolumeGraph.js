import React from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";

const data = [
  { name: "01:00", low: 3, high: 8, amt: 2400 },
  { name: "02:00", low: 4, high: 11, amt: 2400 },
  { name: "03:00", low: 6, high: 12, amt: 2400 },
  { name: "04:00", low: 7, high: 12, amt: 2400 },
  { name: "05:00", low: 6, high: 14, amt: 2400 },
  { name: "06:00", low: 9, high: 12, amt: 2400 },
  { name: "07:00", low: 10, high: 10, amt: 2400 },
  { name: "08:00", low: 12, high: 8, amt: 2400 },
  { name: "09:00", low: 10, high: 7, amt: 2400 },
  { name: "10:00", low: 9, high: 6, amt: 2400 },
  { name: "11:00", low: 5, high: 3, amt: 2400 },
  { name: "12:00", low: 3, high: 5, amt: 2400 },
];

export function VolumeGraph() {
  return (
    <>
      <div className="volumegraph--title">"insert item name" Price</div>
      <div className="graph--data">
        <BarChart width={800} height={400} data={data}>
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
          <Legend />
          <Bar
            type="monotone"
            dataKey="low"
            stroke="#CC8E31"
            fillOpacity={1}
            fill="#CC8E31"
          />
          <Bar
            type="monotone"
            dataKey="high"
            stroke="#43A836"
            fillOpacity={1}
            fill="#43A836"
          />
        </BarChart>
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
