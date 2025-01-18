import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const ContractExtensionForm = ({ data, Purpose }) => {
  if (Purpose !== "Gia hạn hợp đồng") {
    return null;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Thông tin hợp đồng gia hạn
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography fontWeight="bold">Tên công ty</Typography>
          <Typography>{data.companyName ?? "Chưa có tên công ty"}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Tên dịch vụ</Typography>
          <Typography>{data.nameService ?? "Chưa có tên dịch vụ"}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Tên tòa nhà</Typography>
          <Typography>{data.buildingName ?? "Chưa có tên tòa nhà"}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Số tầng</Typography>
          <Typography>{data.floor ?? "Chưa có số tầng"}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Phòng</Typography>
          <Typography>{data.room ?? "Chưa có số phòng"}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Diện tích</Typography>
          <Typography>{data.area ? `${data.area} m²` : "Chưa có diện tích"}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Ngày bắt đầu</Typography>
          <Typography>{dayjs(data.startDate).format("DD/MM/YYYY")}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Ngày kết thúc</Typography>
          <Typography>{dayjs(data.endDate).format("DD/MM/YYYY")}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">Giá dịch vụ</Typography>
          <Typography>{data.servicePrice ? `${data.servicePrice.toLocaleString()} VND` : "Chưa có giá dịch vụ"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContractExtensionForm;