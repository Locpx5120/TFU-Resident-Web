import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Tháng 10", income: 200, expense: 180 },
  { name: "Tháng 11", income: 150, expense: 185 },
  { name: "Tháng 12", income: 205, expense: 300 },
];

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
        {payload.value}
      </text>
    </g>
  );
};

const IncomeReport = () => {
  return (
    <Box>
      <Box>
        <Box sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 0",
        }}>
          <Typography variant="h6">Tổng số tiền thu: 190.000.000 VNĐ</Typography>
        </Box>
        <Box sx={{ width: "80%", height: "350px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={40}
              barGap={0}
              barCategoryGap={30}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis ticks={[50, 100, 150, 200, 250, 300]} tick={<CustomYAxisTick />} />
              <Tooltip />
              <Legend layout="vertical" verticalAlign="top" align="right" />
              <Bar dataKey="income" name="Thu nhập" fill="#808080bf" />
              <Bar dataKey="expense" name="Chi tiêu" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default IncomeReport;