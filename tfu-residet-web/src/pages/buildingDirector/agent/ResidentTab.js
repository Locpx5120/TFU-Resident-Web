import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Card, TextField, TablePagination, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CustomModal from "../../../common/CustomModal";
import TableCustom from "../../../components/Table";
import { getResident, addNewResident } from "../../../services/residentService";

const ResidentTab = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm cư dân',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

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
  }, [page, rowsPerPage, reload]);

  useEffect(() => {
    const filtered = residents.filter(resident =>
      resident.name.toLowerCase().includes(searchCriteria.toLowerCase())
    );
    setFilteredResidents(filtered);
    setTotalCount(filtered.length);
  }, [residents, searchCriteria]);

  const handleSearchChange = (event) => {
    setSearchCriteria(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = async () => {
    setSearchCriteria("");
    setReload(!reload);
  };

  const handleAddResident = () => {
    setModalMode({
      mode: 'add',
      title: 'Thêm cư dân'
    });
    setSelectedResident(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveResident = async (residentData) => {
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(residentData.email)) {
      return Swal.fire('Thất bại', 'Email không hợp lệ', 'error');
    }

    if (nameRegex.test(residentData.name) && residentData.name.trim() !== "") {
      console.log("Tên hợp lệ");
    } else {
      console.error("Tên không hợp lệ");
    }

    if (!phoneRegex.test(residentData.phone)) {
      console.error("Số điện thoại không hợp lệ");
      // Xử lý lỗi hoặc logic khác
    } else {
      console.log("Số điện thoại hợp lệ");
    }

    try {
      const data = await addNewResident(residentData);
      if (data.success) {
        Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
        setReload(!reload);
      } else {
        Swal.fire('Thất bại', data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
    }
  };

  const modalFields = [
    <TextField fullWidth label="Tên thành viên" name="name" required />,
    <TextField fullWidth label="Email" name="email" required />,
    <TextField fullWidth label="Điện thoại" name="phone" required />,
    <TextField fullWidth label="Ngày sinh" name="birthday" type="date" InputLabelProps={{ shrink: true }} />,
  ];

  const paginatedResidents = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredResidents.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredResidents, page, rowsPerPage]);

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
        <TextField
          size="small"
          label="Tên thành viên"
          name="name"
          variant="outlined"
          value={searchCriteria}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        />
        <Button
          variant="contained"
          color="warning"
          onClick={handleRefresh}
          sx={{ height: "40px" }}
        >
          Làm mới
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddResident}
          sx={{ height: "40px" }}
        >
          Thêm cư dân
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px", marginTop: "30px" }}>
        <TableCustom
          columns={columnData}
          rows={paginatedResidents}
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
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        employee={selectedResident}
        handleSave={handleSaveResident}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
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
