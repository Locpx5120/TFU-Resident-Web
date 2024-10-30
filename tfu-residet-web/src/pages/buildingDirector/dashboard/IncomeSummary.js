import {
  Box,
    Card,
    TablePagination,
    Typography,
  } from "@mui/material";
  import React, { useMemo, useState } from "react";
import TableCustom from "../../../components/Table";
import SelectSummary from "../../../common/SelectSummary";
  
  const IncomeSummary = () => {
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
      <section className="report">
        <Box sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 5,
                  margin: '10px 0',
          }}>
          <Typography sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500,
                  fontSize: '20px',
          }}>
            Tổng kết tiền tháng: 100.000.000 VNĐ
          </Typography>
          <SelectSummary />
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
      { name: "Tên tòa nhà", align: "left", esName: "tenToaNha" },
      { name: "Tổng tiền thu", align: "left", esName: "tongTienThu" },
      { name: "Tổng tiền chi", align: "left", esName: "tongTienChi" },
      { name: "Tiền lợi nhuận (VND)", align: "left", esName: "tienLoiNhuan" },
    ];
    
    const fakeRows = [];
  
  export default IncomeSummary;
  