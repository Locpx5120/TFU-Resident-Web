import {
    Box,
    Button,
    Card,
    TablePagination,
    TextField,
  } from "@mui/material";
  import React, { useMemo, useState } from "react";
import TableCustom from "../../Table";
  
const HistoryOnwer = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const sortedRows = useMemo(() => {
      if (!sortColumn) return fakeRows;
  
      return [...fakeRows].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }, [fakeRows, sortColumn, sortDirection]);
  
    const paginatedRows = useMemo(() => {
      const startIndex = page * rowsPerPage;
      return sortedRows.slice(startIndex, startIndex + rowsPerPage);
    }, [sortedRows, page, rowsPerPage]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleSort = (column) => {
      const isAsc = sortColumn === column && sortDirection === "asc";
      setSortDirection(isAsc ? "desc" : "asc");
      setSortColumn(column);
    };
    return (
      <section className="content project">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label=""
              color="success"
              placeholder="Tên"
              sx={{
                "#outlined-multiline-flexible": {
                  padding: "7px !important",
                },
              }}
            />
            <Button variant="outlined" color="success">
              Tìm kiếm
            </Button>
          </Box>
        </Box>
        <Card sx={{ maxHeight: "800px", marginTop: "30px" }}>
          <TableCustom
            columns={columnData}
            rows={paginatedRows}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
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
    { name: "Ten khach hang", align: "left", esName: "tenKH", sortable: true },
    { name: "Email", align: "left", esName: "email", sortable: true },
    { name: "So dien thoai", align: "left", esName: "soDienThoai" },
    { name: "Ngay dang ki du an", align: "left", esName: "ngayDKDA" },
    { name: "Trang thai", align: "left", esName: "trangThai", sortable: true },
  ];
  
  const fakeRows = [];
  
export default HistoryOnwer;
  