import React from "react";
import { convertTime } from "./convertTime";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";

export function VolumeGraph(props) {
  const { volumeGraphData } = props;
  volumeGraphData?.forEach((changeTime) => {
    changeTime.date = convertTime(changeTime?.timestamp);
  });
  console.log(volumeGraphData?.length);
  return (
    <>
      <div className="volumegraph--title"> Volume History</div>
      <div className="graph--data">
        <BarChart width={900} height={450} data={volumeGraphData}>
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
          <Legend />
          <Bar
            type="monotone"
            dataKey="lowPriceVolume"
            stroke="#CC8E31"
            fillOpacity={1}
            fill="#CC8E31"
          />
          <Bar
            type="monotone"
            dataKey="highPriceVolume"
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
