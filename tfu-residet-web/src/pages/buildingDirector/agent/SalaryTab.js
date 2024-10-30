import React, { useState } from "react";
import { Box, Button, Card, TextField, TablePagination, Typography } from "@mui/material";
import TableCustom from "../../../components/Table";
import SelectSummary from "../../../common/SelectSummary";

const SalaryTab = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employeeName, setEmployeeName] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", employeeName);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: 'flex-end'
        }}
      >
        <TextField
          size="small"
          label="Tên nhân viên"
          variant="outlined"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "40px" }}
        >
          Tìm kiếm
        </Button>
        <SelectSummary />
      </Box>
      <Card sx={{ maxHeight: "700px", marginTop: "30px" }}>
        <TableCustom columns={columnData} rows={fakeRows} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
          <TablePagination
            component="div"
            count={fakeRows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Tổng tiền đã thu: 0 VND
          </Typography>
        </Box>
      </Card>
    </section>
  );
};

const columnData = [
  { name: "Tên nhân viên", align: "left", esName: "temThanhVien" },
  { name: "Bộ phận", align: "left", esName: "boPhan" },
  { name: "Lương (VND)", align: "left", esName: "luong" },
  {
    name: "Trạng thái thanh toán",
    align: "left",
    esName: "trangThaiThanhToan",
  },
];

const fakeRows = [];

export default SalaryTab;