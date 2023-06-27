import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardChart({ data, plotConfig, maxY }) {

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', offset: -5 }}/>
        <YAxis  domain={[0, maxY]} label={{ value: 'Sales (IDR)', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        {plotConfig.map((data, index) => (
          <Area
            key={`area-${index}`}
            type="monotone"
            dataKey={data.key}
            stroke={data.color}
            fill={data.color}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default DashboardChart;
