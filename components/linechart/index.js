"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getMaxValue = (array) => {
  return Math.max(
    ...array.map((error) => {
      return error.count;
    })
  );
};

function LineChartComponent({ dataList = [{}] }) {
  const [maxValue, setMaxValue] = React.useState(0);
  React.useEffect(() => {
    if (dataList[0]) {
      setMaxValue(getMaxValue(dataList));
    }
  }, [dataList]);

  return (
    <div className="w-full h-[60vw] flex justify-center items-center md:max-h-[60vh]">
      <ResponsiveContainer width="95%" height="90%">
        <LineChart
          data={dataList}
          margin={{
            top: 5,
            right: 30,
            left: -30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            type="number"
            domain={[0, Math.round(maxValue + maxValue / 2)]}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
