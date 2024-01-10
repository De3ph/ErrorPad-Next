"use client";
import Loading from "@/app/adminDashboard/loading";
import * as React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getMaxValue = (array) => {
  return Math.max(...array.map((error) => error.count));
};

export default function BarChartComponent({ dataList = [{}] }) {
  const [maxValue, setMaxValue] = React.useState(0);
  React.useEffect(() => {
    if (dataList[0]) {
      setMaxValue(getMaxValue(dataList))
    }
  }, []);
  return (
    <div className="w-full h-[60vw] flex justify-center items-center md:max-h-[60vh]">
      <ResponsiveContainer width="95%" height="90%">
        <BarChart
          data={dataList}
          margin={{
            top: 5,
            right: 30,
            left: -30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="errorName" />
          <YAxis
            type="number"
            domain={[0, Math.round(maxValue + maxValue / 2)]}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            label={{ position: "top" }}
          >
            {dataList.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
