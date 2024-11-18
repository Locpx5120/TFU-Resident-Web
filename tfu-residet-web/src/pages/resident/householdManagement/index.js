import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, TablePagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {getBuilding, saveBuilding, updateOwnerShip} from "../../../services/residentService";
const HouseHoldResident = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm căn hộ',
  });
  const [selectedHouseHold, setSelectedHouseHold] = useState(null);
  const navigate = useNavigate();
  const residentId = Cookies.get("residentId");
  const buildingID = Cookies.get("buildingID");
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuilding(residentId , buildingID);
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
  const handleSearch = async () => {
    const data = await getBuilding(residentId , buildingID, searchCriteria);
    setBuildings(data.data);
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
      title: 'Thêm căn hộ'
    });
    setSelectedHouseHold(null);
    setModalOpen(true);
  };
  
  const handleEditHouseHold = () => {
    setModalMode({
      mode: 'edit',
      title: 'Cập nhật căn hộ'
    });
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleSaveHouseHold = async (houseHoldData) => {
    if (modalMode.mode === 'add') {
      try {
        const data = await saveBuilding({...houseHoldData, apartmentId: '1f981774-e0c3-4f2f-9c75-fe7a11b70ae2'}, residentId);
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
        const data = await updateOwnerShip({
            ...houseHoldData,
            id: selectedHouseHold.id
          });
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
    { name: "STT", align: "left", esName: "stt" },
    { name: "Chủ căn hộ", align: "left", esName: "ownerName" },
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
          {/* <Button onClick={() => handleEditHouseHold(building)}>
            <EditIcon />
          </Button> */}
          <Button onClick={() => navigate('/cu-dan/' + building.apartmentId+`?roomNumber=${selectedHouseHold?.roomNumber}`)}>
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
          label="Chủ căn hộ"
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
        {/* <Button
          variant="contained"
          color="success"
          onClick={handleCreateHouseHold}
          sx={{ height: "40px" }}
        >
          Thêm căn hộ
        </Button> */}
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
export default HouseHoldResident;
