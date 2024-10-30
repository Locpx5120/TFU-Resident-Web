import React, { useState } from "react";
import { Box, Button, Card, TextField, TablePagination, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import TableCustom from "../../../components/Table";

const PaymentHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchCriteria, setSearchCriteria] = useState({
    tenThanhToan: "",
    tinhTrang: "all"
  });

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log("Searching for:", searchCriteria);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className="content">
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: 'flex-end',
          mb: 2
        }}
      >
        <TextField
          size="small"
          label="Tên thanh toán"
          name="tenThanhToan"
          variant="outlined"
          value={searchCriteria.tenThanhToan}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        />
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="tinh-trang-label">Tình trạng</InputLabel>
          <Select
            labelId="tinh-trang-label"
            id="tinh-trang-select"
            value={searchCriteria.tinhTrang}
            label="Tình trạng"
            name="tinhTrang"
            onChange={handleSearchChange}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="chuaThanhToan">Chưa thanh toán</MenuItem>
            <MenuItem value="daThanhToan">Đã thanh toán</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "40px" }}
        >
          Tìm kiếm
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom 
          columns={columnData} 
          rows={fakeRows} 
        />
        <TablePagination
          component="div"
          count={fakeRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </section>
  );
};

const columnData = [
  { name: "Tên", align: "left", esName: "ten" },
  { name: "Ngày", align: "left", esName: "ngay" },
  { name: "Mô tả", align: "left", esName: "moTa" },
  { name: "Người nhận", align: "left", esName: "nguoiNhan" },
  { name: "Người gửi", align: "left", esName: "nguoiGui" },
  { name: "Tình trạng", align: "left", esName: "tinhTrang" },
];

const fakeRows = [
  { id: 1, ten: "Thanh toán tiền điện", ngay: "2023-05-01", moTa: "Tiền điện tháng 5", nguoiNhan: "Công ty Điện lực", nguoiGui: "Nguyễn Văn A", tinhTrang: "Đã thanh toán" },
  { id: 2, ten: "Thanh toán tiền nước", ngay: "2023-05-02", moTa: "Tiền nước tháng 5", nguoiNhan: "Công ty Cấp nước", nguoiGui: "Trần Thị B", tinhTrang: "Chưa thanh toán" },
  { id: 3, ten: "Thanh toán phí quản lý", ngay: "2023-05-03", moTa: "Phí quản lý tháng 5", nguoiNhan: "Ban quản lý", nguoiGui: "Lê Văn C", tinhTrang: "Đã thanh toán" },
];

export default PaymentHistory;