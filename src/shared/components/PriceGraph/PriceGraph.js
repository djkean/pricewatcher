import React from "react";
import { convertTime } from "../../functions/convertTime";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

export function PriceGraph(props) {
  const { priceGraphData } = props;
  priceGraphData?.forEach((changeTime) => {
    changeTime.date = convertTime(changeTime?.timestamp);
  });
  return (
    <>
      <div className="pricegraph--card">
        <div className="graph--title"> Price History</div>
        <div className="graph--data">
          <AreaChart width={800} height={400} data={priceGraphData}>
            <defs>
              <linearGradient id="color1" x1="0" y1="0" x2="1" y2="2">
                <stop offset="5%" stopColor="#CC8E31" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#CC8E31" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="color2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#43A836" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#43A836" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0 0" stroke="#ffebcd" />
            <XAxis
              axisLine={{ stroke: "#ffebcd" }}
              dataKey="date"
              tick={<CustomizedAxisTick offset={16} />}
            />
            <YAxis
              axisLine={{ stroke: "#ffebcd" }}
              tick={<CustomizedAxisTick offset={2} />}
              width={105}
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
              dataKey="avgLowPrice"
              stroke="#CC8E31"
              fillOpacity={1}
              fill="url(#color1)"
            />
            <Area
              type="monotone"
              dataKey="avgHighPrice"
              stroke="#43A836"
              fillOpacity={1}
              fill="url(#color2)"
            />
          </AreaChart>
        </div>
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
