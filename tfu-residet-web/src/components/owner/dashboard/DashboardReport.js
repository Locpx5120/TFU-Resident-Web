import {
    Box,
    Button,
    Card,
    TablePagination,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useMemo, useState } from "react";
import TableCustom from "../../Table";
  
  const DashboardReport = () => {
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
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
                margin: '10px 0',
                fontSize: '22px',
        }}>
          Báo cáo
        </Typography>
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
      { name: "Ngày", align: "left", esName: "ngay", sortable: true },
      { name: "Nội dung báo cáo", align: "left", esName: "noiDungBaoCao", sortable: true },
      { name: "Hành động", align: "left", esName: "hanhDong" },
    ];
    
    const fakeRows = [];
  
  export default DashboardReport;
  