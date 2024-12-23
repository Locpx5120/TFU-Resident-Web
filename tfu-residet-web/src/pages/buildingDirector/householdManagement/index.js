import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, TextField, TablePagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {addOwner, listOwner, updateOwner} from "../../../services/ceoService";
import { addResident } from "../../../services/residentService";

const HouseHold = () => {
  const { id } = useParams();
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
  const [totalRecord, setTotalRecord] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await listOwner({
            name: searchCriteria,
            pageSize: rowsPerPage,
            pageNumber: page + 1,
            buildingId: id
          });
        setBuildings(data.data);
        setTotalRecord(data.totalRecords)
      } catch (error) {
        console.log(error);
      }
    }
    fetchBuildings();
  }, [page, rowsPerPage, searchCriteria, reload, id]);

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
  
  const handleEditHouseHold = (building) => {
    setModalMode({
      mode: 'edit',
      title: 'Cập nhật chủ căn hộ'
    });
    setSelectedHouseHold(building);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveHouseHold = async (houseHoldData) => {
    if (modalMode.mode === 'add') {
      try {
        const data = await addOwner(houseHoldData);
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
        const data = await updateOwner({
          floorNumber: houseHoldData.floorNumber,
          id: houseHoldData.id,
          email: houseHoldData.email,
          roomNumber: houseHoldData.roomNumber,
          // buildingId: houseHoldData.id,
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

  const handleAddResident = async (building) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Thêm cư dân',
        html:
          '<input id="swal-input2" class="swal2-input" placeholder="Email">',
        focusConfirm: false,
        preConfirm: () => {
          return {
            email: document.getElementById('swal-input2').value,
            id: building.id,
          }
        }
      });

      if (formValues) {
        const data = await updateOwner(formValues);
        if (data.success) {
          Swal.fire('Thành công', 'Đã thêm cư dân thành công!', 'success');
          setReload(!reload);
        } else {
          Swal.fire('Thất bại', 'Thêm cư dân thất bại!', 'error');
        }
      }
    } catch (error) {
      console.error('Error adding resident:', error);
      Swal.fire('Thất bại', 'Đã xảy ra lỗi khi thêm cư dân!', 'error');
    }
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
  const rows = useMemo(() => buildings.map((building) => ({
    ...building,
    action: (
      <>
        <Button onClick={() => handleEditHouseHold(building)}>
          <EditIcon />
        </Button>
        <Button onClick={() => navigate('/chi-tiet-thanh-vien/' + building.apartmentId + `&roomNumber=${building.roomNumber}`)}>
          Chi tiết
        </Button>
        {!building.fullName && (
          <Button onClick={() => handleAddResident(building)} color="primary">
            <PersonAddIcon />
          </Button>
        )}
      </>
    ),
  })), [buildings, navigate]);

  return (
    <section className="content">
      <h1><span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate(-1)}>Trở về</span> Tổng số chủ hộ hiện tại: {totalRecord}</h1>
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
          count={totalRecord}
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
