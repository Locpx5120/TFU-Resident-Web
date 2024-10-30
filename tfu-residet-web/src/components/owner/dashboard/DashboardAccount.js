import React from "react";
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
} from "recharts";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DownloadMenu from "../../../common/DownloadMenu";

const data = [
  { name: "Tháng 1", Month: 12 },
  { name: "Tháng 2", Month: 19 },
  { name: "Tháng 3", Month: 3 },
  { name: "Tháng 4", Month: 5 },
  { name: "Tháng 5", Month: 2 },
  { name: "Tháng 6", Month: 30 },
  { name: "Tháng 7", Month: 22 },
  { name: "Tháng 8", Month: 28 },
  { name: "Tháng 9", Month: 15 },
  { name: "Tháng 10", Month: 8 },
  { name: "Tháng 11", Month: 17 },
  { name: "Tháng 12", Month: 25 },
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
const DashboardAccount = () => {
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
          Tổng số tài khoản:{" "}
          <span>
            100 <PersonIcon />
          </span>
        </Typography>
        <Typography variant="h6">
          Số tài khoản trong tháng:{" "}
          <span>
            10 <PersonIcon />
          </span>
        </Typography>
      </Box>
      <Box>
              <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "30px 0",
              }}>
                  <Typography variant="h6">Tài khoản trong từng tháng</Typography>
                  <DownloadMenu />
        </Box>
        <Box sx={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis ticks={[0, 8, 16, 24, 32]} tick={<CustomYAxisTick />} />
              <Tooltip />
              <Bar
                dataKey="Month"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAccount;
