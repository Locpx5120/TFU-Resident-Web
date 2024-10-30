import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, TablePagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const HouseHold = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm chủ căn hộ',
  });
  const [selectedHouseHold, setSelectedHouseHold] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch("https://localhost:7082/api/ceo/getOwnerShips", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: searchCriteria,
            pageSize: rowsPerPage,
            pageNumber: page + 1,
          })
        });
        const data = await response.json();
        setBuildings(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBuildings();
  }, [page, rowsPerPage, searchCriteria, reload]);

  const handleRowClick = (record) => {
    setSelectedHouseHold(record);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchCriteria(value);
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

  const handleCreateHouseHold = () => {
    setModalMode({
      mode: 'add',
      title: 'Thêm chủ căn hộ'
    });
    setSelectedHouseHold(null);
    setModalOpen(true);
  };
  
  const handleEditHouseHold = () => {
    setModalMode({
      mode: 'edit',
      title: 'Cập nhật chủ căn hộ'
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveHouseHold = async (houseHoldData) => {
    if (modalMode.mode === 'add') {
      try {
        const response = await fetch("https://localhost:7082/api/ceo/addOwnerShip", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify(houseHoldData)
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        console.error('Error fetching projects:', error);
      }
    } else {
      try {
        const response = await fetch("https://localhost:7082/api/ceo/UpdateOwnerShip", {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            ...houseHoldData,
            id: selectedHouseHold.id  
          })
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Thành công', 'Đã cập nhật thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
        console.error('Error updating household:', error);
      }
    }

    setReload(!reload);
  };

  const modalFields = [
    <TextField
      fullWidth
      label="Số Phòng"
      name="roomNumber"
      type="string"
      required
      defaultValue={selectedHouseHold?.roomNumber || ''} // Điền dữ liệu vào
    />,
    <TextField
      fullWidth
      label="Số tầng"
      name="floorNumber"
      type="number"
      required
      defaultValue={selectedHouseHold?.floorNumber || ''}
    />,
    <TextField
      fullWidth
      label="Email"
      name="email"
      required
      defaultValue={selectedHouseHold?.email || ''}
    />,
  ];

  const columnData = [
    { name: "Tên chủ hộ", align: "left", esName: "fullName" },
    { name: "Số tầng", align: "left", esName: "floorNumber" },
    { name: "Số Phòng", align: "left", esName: "roomNumber" },
    { name: "Điện thoại", align: "left", esName: "phoneNumber" },
    { name: "Email", align: "left", esName: "email" },
    {
      name: "Tùy chọn",
      align: "left",
      esName: "action",
    },
  ];
  const rows = buildings.map((building) => ({
    ...building,
    action: (
      <>
          <Button onClick={() => handleEditHouseHold(building)}>
            <EditIcon />
          </Button>
          <Button onClick={() => navigate('/cu-dan/' + building.id)}>
            Chi tiết
          </Button>
      </>
    ),
  }));

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
          label="Tên chủ hộ"
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
          color="success"
          onClick={handleCreateHouseHold}
          sx={{ height: "40px" }}
        >
          Thêm chủ căn hộ
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom
          columns={columnData}
          rows={rows}
          onRowClick={handleRowClick}
        />
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        data={selectedHouseHold}
        handleSave={handleSaveHouseHold}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
    </section>
  );
};

export default HouseHold;
