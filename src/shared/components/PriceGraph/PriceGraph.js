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
  const { priceGraphData, priceRange } = props;
  priceGraphData?.forEach((changeTime) => {
    changeTime.date = convertTime(changeTime?.timestamp);
  });

  const numDigitsLow = Math.floor(
    Math.log(priceRange?.lowestLowPrice?.avgLowPrice) * Math.LOG10E + 1
  );

  const numDigitsHigh = Math.ceil(
    Math.log(priceRange?.highestHighPrice?.avgHighPrice) * Math.LOG10E + 1
  );

  const range =
    priceRange?.highestHighPrice?.avgHighPrice -
    priceRange?.lowestLowPrice?.avgLowPrice;

  const rangeMargin = Math.round(
    Math.log10(Math.round(priceRange?.highPrice?.avgHighPrice / range)) + 1
  );

  const lowRange = priceRange?.lowestLowPrice?.avgLowPrice - range / 2;

  const highRange = priceRange?.highestHighPrice?.avgHighPrice + range / 2;

  /*const highPriceLimit =
    Math.ceil(
      (priceRange?.highPrice?.avgHighPrice * 1.1) /
        Math.pow(10, numDigitsHigh - rangeMargin)
    ) * Math.pow(10, numDigitsHigh - rangeMargin);
*/
  /* const highRange = highPriceLimit >= 2147483647 ? 2147483647 : highPriceLimit;
  console.log(
    rangeMargin,
    priceRange?.highPrice?.avgHighPrice,
    priceRange?.lowPrice?.avgLowPrice,
    lowRange,
    highRange
  ); */

  /* const lowRange =
    priceRange?.lowPrice?.avgLowPrice <= 10
      ? Math.max(priceRange?.lowPrice.avgLowPrice - 1, 0)
      : Math.round(
          (priceRange?.lowPrice?.avgLowPrice * 0.9) /
            Math.pow(10, numDigitsLow - rangeMargin)
        ) * Math.pow(10, numDigitsLow - rangeMargin);
*/

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
              domain={[Math.round(lowRange), Math.round(highRange)]}
              axisLine={{ stroke: "#ffebcd" }}
              tick={<CustomizedAxisTick offset={2} />}
              width={105}
              tickCount={7}
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
