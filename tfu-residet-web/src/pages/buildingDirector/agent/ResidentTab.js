import React, { useState, useEffect } from "react";
import { Box, Button, Card, TextField, TablePagination, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TableCustom from "../../../components/Table";
// import { getMemberInApartment } from "../../../services/residentService";
// import SelectSummary from "../../../common/SelectSummary";

const ResidentTab = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employeeName, setEmployeeName] = useState("");
  const [agents, setAgents] = useState({ data: [], totalCount: 0 });
  const [reload, setReload] = useState(false);

  // const { id } = useParams();
  // const roomNumber = id.split("&")[1].slice(-3);
  // const apartmentId = id.split("&")[0];

  // useEffect(() => {
  //   const fetchAgents = async () => {
  //     try {
  //       const data = await getMemberInApartment(apartmentId);
  //       setAgents(data);
  //     } catch (error) {
  //       console.error("Error fetching agents:", error);
  //     }
  //   }
  //   fetchAgents();
  // }, [apartmentId, reload]);

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
        </Box>
      </Card>
    </section>
  );
};

const columnData = [
  { name: "Tên cư dân", align: "left", esName: "memberName" },
  { name: "Điện thoại", align: "left", esName: "phoneNumber" },
  { name: "Email", align: "left", esName: "email" },
];

const fakeRows = [];

export default ResidentTab;