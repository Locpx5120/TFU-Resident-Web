import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Card, TextField, TablePagination, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TableCustom from "../../../components/Table";
import { getResident } from "../../../services/residentService";

const ResidentTab = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [residents, setResidents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("");

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await getResident();
        setResidents(response.data || []);
        setTotalCount(response.totalCount || 0);
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };
    fetchResidents();
  }, [page, rowsPerPage]);

  const handleSearchChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleSearch = async () => {
    const data = await getResident();
    setResidents(data.data);
    setTotalCount(data.totalCount);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = async () => {
    const data = await getResident();
    setResidents(data.data);
    setTotalCount(data.totalCount);
  };

  return (
    <section>
      <Box sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "flex-end",
        mb: 2,
      }}
      >
        <TextField size="small"
          label="Tên thành viên"
          name="name"
          variant="outlined"
          value={searchCriteria}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "40px" }}
        >
          Tìm kiếm
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleRefresh}
          sx={{ height: "40px" }}
        >
          Làm mới
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px", marginTop: "30px" }}>
        <TableCustom
          columns={columnData}
          rows={residents}
          onRowClick={() => { }} />
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2, py: 1,
        }} >
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
        </Box>
      </Card>
    </section>
  );
};

const columnData = [
  { name: "Tên cư dân", align: "left", esName: "name" },
  { name: "Email", align: "left", esName: "email" },
  { name: "Ngày sinh", align: "left", esName: "birthday" },
  { name: "Điện thoại", align: "left", esName: "phone" },
];

export default ResidentTab;