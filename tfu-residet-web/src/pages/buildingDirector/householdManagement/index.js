import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, TextField, TablePagination, Autocomplete, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addOwner, listOwner, updateOwner } from "../../../services/ceoService";
import { CreateTypeApartment, getTypeApartment } from "../../../services/apartmentService";
import { getResident } from "../../../services/residentService";

const HouseHold = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResidentOpen, setModalResidentOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm căn hộ',
  });
  const [modalResidentMode, setModalResidentMode] = useState({
    mode: 'add',
    title: 'Thêm chủ căn hộ',
  });
  const [selectedHouseHold, setSelectedHouseHold] = useState(null);
  const [selectedResident, setSelectedResident] = useState(null);
  const [totalRecord, setTotalRecord] = useState(0);
  const [dataApart, setDataApart] = useState([]);
  const [residents, setResidents] = useState([]);
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

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const dataTypeApartment = await getTypeApartment();
        setDataApart(dataTypeApartment.data)

      } catch (error) {
        console.log(error);
      }
    }
    fetchBuildings();
  }, []);

  const TypeOptionApartment = dataApart.map(item => ({
    label: item.name,
    value: item.id
  }))

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const dataResident = await getResident();
        setResidents(dataResident.data)

      } catch (error) {
        console.log(error);
      }
    }
    fetchResidents();
  }, []);

  const TypeOptionResident = residents.map(item => ({
    label: item.email,
    value: item.email,
    id: item.id
  }))

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
      title: 'Thêm căn hộ'
    });
    setSelectedHouseHold(null);
    setModalOpen(true);
  };

  const handleEditHouseHold = (building) => {
    setModalMode({
      mode: 'edit',
      title: 'Cập nhật căn hộ'
    });
    setSelectedHouseHold(building);
    setModalOpen(true);
  };

  const handleCreateResident = () => {
    setModalResidentMode({
      mode: 'add',
      title: 'Thêm chủ căn hộ'
    });
    setSelectedResident(null);
    setModalResidentOpen(true);
  };

  const handleEditResident = (building) => {
    setModalResidentMode({
      mode: 'edit',
      title: 'Cập nhật chủ căn hộ'
    });
    setSelectedResident(building);
    setModalResidentOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalResidentOpen(false);
  };

  const handleSaveResident = async (apartmentData) => {
    if (modalMode.mode === 'add') {
      try {
        const data = await addOwner(apartmentData);
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
          id: apartmentData.id,
          email: apartmentData.email,
          buildingId: apartmentData.buildingId
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

  const handleSaveHouseHold = async (houseHoldData) => {
    console.log(houseHoldData);
    const payload = {
      ...houseHoldData,
      buildingId: id,
    }
    const data = await CreateTypeApartment(payload);
    if (data.success) {
      Swal.fire('Thành công', 'Đã thêm căn hộ thành công!', 'success');
      setReload(!reload);
    } else {
      Swal.fire('Thất bại', 'Thêm căn hộ thất bại!', 'error');
    }
    // if (modalMode.mode === 'add') {
    //   try {
    //     const data = await addOwner(houseHoldData);
    //     if (data.success) {
    //       Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
    //     } else {
    //       Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
    //     }
    //   } catch (error) {
    //     Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
    //     console.error('Error fetching projects:', error);
    //   }
    // } else {
    //   try {
    //     const data = await updateOwner({
    //       floorNumber: houseHoldData.floorNumber,
    //       id: houseHoldData.id,
    //       email: houseHoldData.email,
    //       roomNumber: houseHoldData.roomNumber,
    //       // buildingId: houseHoldData.id,
    //     });
    //     if (data.success) {
    //       Swal.fire('Thành công', 'Đã cập nhật thành công!', 'success');
    //     } else {
    //       Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
    //     }
    //   } catch (error) {
    //     Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
    //     console.error('Error updating household:', error);
    //   }
    // }
    setReload(!reload);
  };

  const handleAddResident = async (building) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Thêm chủ căn hộ',
        html: `
          <select id="swal-input-email" class="swal2-input">
            ${TypeOptionResident.map(
          (resident) => `<option value="${resident.value}">${resident.label}</option>`
        ).join('')}
          </select>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const email = document.getElementById('swal-input-email').value;

          if (!email) {
            Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin');
            return null;
          }

          return {
            email,
            id: building.buildingId,
          };
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

  // const handleAddApartment = async (building) => {
  //   try {
  //     const { value: formValues } = await Swal.fire({
  //       title: 'Thêm căn hộ',
  //       html: `
  //         '<input id="swal-input2" class="swal2-input" placeholder="Số phòng">',
  //         '<input id="swal-input3" class="swal2-input" placeholder="Số tầng">',
  //         `,
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         return {
  //           roomNumber: document.getElementById('swal-input2').value,
  //           floorNumber: document.getElementById('swal-input3').value,
  //           id: building.id,
  //         }
  //       }
  //     });

  //     if (formValues) {
  //       const data = await updateOwner(formValues);
  //       if (data.success) {
  //         Swal.fire('Thành công', 'Đã thêm cư dân thành công!', 'success');
  //         setReload(!reload);
  //       } else {
  //         Swal.fire('Thất bại', 'Thêm cư dân thất bại!', 'error');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error adding resident:', error);
  //     Swal.fire('Thất bại', 'Đã xảy ra lỗi khi thêm căn hộ!', 'error');
  //   }
  // };

  const modalFields = [
    <TextField
      fullWidth
      label="Số Phòng"
      name="roomNumber"
      type="string"
      required
      defaultValue={selectedResident?.roomNumber || ''} // Điền dữ liệu vào
    />,
    <TextField
      fullWidth
      label="Số tầng"
      name="floorNumber"
      type="number"
      required
      defaultValue={selectedResident?.floorNumber || ''}
    />,
    <TextField select label="Loại căn hộ" name="apartmentTypeId"
      value={selectedResident?.apartmentTypeId || ''}
    >
      {TypeOptionApartment.map((apartment) => (
        <MenuItem key={apartment.value} value={apartment.value}>
          {apartment.label}
        </MenuItem>
      ))}
    </TextField>
  ];

  const modalResidentFields = [
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
    <TextField select label="Email" name="email"
      value={residents?.email || ''}
    >
      {TypeOptionResident.map((resident) => (
        <MenuItem key={resident.value} value={resident.value}>
          {resident.label}
        </MenuItem>
      ))}
    </TextField>,
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
      <h1><span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate(-1)}>Trở về</span> Tổng số chủ hộ hiện tại: {totalRecord}</h1>
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
          Thêm căn hộ
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateResident}
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
        // handleAdd={handleAddApartment}
        handleSave={handleSaveHouseHold}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
      <CustomModal
        open={modalResidentOpen}
        handleClose={handleCloseModal}
        data={selectedResident}
        handleAdd={handleAddResident}
        handleSave={handleSaveResident}
        mode={modalResidentMode.mode}
        title={modalResidentMode.title}
        fields={modalResidentFields}
      />
    </section>
  );
};

export default HouseHold;
