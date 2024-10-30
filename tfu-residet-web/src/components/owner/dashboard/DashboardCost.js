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
import PersonIcon from "@mui/icons-material/Person";
import DownloadMenu from "../../../common/DownloadMenu";

const data = [
  { name: "Tháng 10", income: 15, expense: 10 },
  { name: "Tháng 11", income: 25, expense: 18 },
  { name: "Tháng 12", income: 35, expense: 30 },
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

const DashboardCost = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <Typography variant="h6">
          Tổng số tiền thu:{" "}
          <span>
            100.000.000 VNĐ
          </span>
        </Typography>
        <Typography variant="h6">
        Tổng số tiền chi:{" "}
          <span>
          50.000.000 VNĐ
          </span>
        </Typography>
        <Typography variant="h6">
        Lợi nhuận:{" "}
          <span>
          40.000.000 VNĐ
          </span>
        </Typography>
      </Box>
      <Box>
        <Box sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 0",
        }}>
          <Typography variant="h6">Tổng số tiền: 190.000.000 VNĐ</Typography>
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
              <YAxis ticks={[0, 5, 10, 20, 35, 40]} tick={<CustomYAxisTick />} />
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

export default DashboardCost;