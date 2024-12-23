import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addBuilding, getBuildingNew, updateBuilding } from "../../../services/apartmentService";

const BuildingManage = () => {
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm tòa nhà',
  });
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuildingNew({
          name: searchCriteria,
        });
        setBuildings(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBuildings();
  }, [searchCriteria, reload]);

  const handleRowClick = (record) => {
    setSelectedBuilding(record);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchCriteria(value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchCriteria);
  };

  const handleCreateBuilding = () => {
    setModalMode({
      mode: 'add',
      title: 'Thêm tòa nhà'
    });
    setSelectedBuilding(null);
    setModalOpen(true);
  };
  
  const handleEditBuilding = (building) => {
    setModalMode({
      mode: 'edit',
      title: 'Cập nhật tòa nhà'
    });
    setSelectedBuilding(building);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveBuilding = async (buildingData) => {
    if (modalMode.mode === 'add') {
      try {
        const data = await addBuilding(buildingData);
        if (data.success) {
          Swal.fire('Thành công', 'Đã thêm tòa nhà thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Thêm tòa nhà thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Thêm tòa nhà thất bại!', 'error');
        console.error('Error adding building:', error);
      }
    } else {
      try {
        const data = await updateBuilding({
          id: buildingData.id,
          buildingName: buildingData.buildingName,
          numberFloor: buildingData.numberFloor,
          numberApartment: buildingData.numberApartment,
          address: buildingData.address,
        });
        if (data.success) {
          Swal.fire('Thành công', 'Đã cập nhật tòa nhà thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Cập nhật tòa nhà thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Cập nhật tòa nhà thất bại!', 'error');
        console.error('Error updating building:', error);
      }
    }
    setReload(!reload);
  };

  const handleDeleteBuilding = async (building) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: "Bạn sẽ không thể hoàn tác hành động này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, xóa nó!',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        const now = new Date();
        const isoString = now.toISOString();
        const data = await updateBuilding({
          id: building.id,
          buildingName: building.buildingName,
          numberFloor: building.numberFloor,
          numberApartment: building.numberApartment,
          address: building.address,
          isActive: false,
          createAt: isoString
        });

        if (data.success) {
          Swal.fire('Đã xóa!', 'Tòa nhà đã được xóa.', 'success');
          setReload(!reload);
        } else {
          Swal.fire('Lỗi!', 'Không thể xóa tòa nhà.', 'error');
        }
      }
    } catch (error) {
      console.error('Error deleting building:', error);
      Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xóa tòa nhà.', 'error');
    }
  };

  const modalFields = [
    <TextField
      fullWidth
      label="Tên tòa nhà"
      name="buildingName"
      required
      defaultValue={selectedBuilding?.buildingName || ''}
    />,
    <TextField
      fullWidth
      label="Số tầng"
      name="numberFloor"
      type="number"
      required
      defaultValue={selectedBuilding?.numberFloor || ''}
    />,
    <TextField
      fullWidth
      label="Số căn hộ"
      name="numberApartment"
      type="number"
      required
      defaultValue={selectedBuilding?.numberApartment || ''}
    />,
    <TextField
      fullWidth
      label="Địa chỉ"
      name="address"
      required
      defaultValue={selectedBuilding?.address || ''}
    />,
  ];

  const columnData = [
    { name: "Tên tòa nhà", align: "left", esName: "buildingName" },
    { name: "Số tầng", align: "left", esName: "numberFloor" },
    { name: "Số căn hộ", align: "left", esName: "numberApartment" },
    { name: "Địa chỉ", align: "left", esName: "address" },
    { name: "Ngày tạo", align: "left", esName: "createAt" },
    {
      name: "Tùy chọn",
      align: "left",
      esName: "action",
    },
  ];

  const rows = useMemo(() => buildings.map((building) => ({
    ...building,
    createAt: building.createAt ? new Date(building.createAt).toLocaleDateString() : 'N/A',
    action: (
      <>
        <Button onClick={() => handleEditBuilding(building)}>
          <EditIcon />
        </Button>
        <Button onClick={() => navigate('/cu-dan/' + building.id)}>
          Chi tiết
        </Button>
        <Button onClick={() => handleDeleteBuilding(building)} color="error">
          <DeleteIcon />
        </Button>
      </>
    ),
  })), [buildings, navigate]);

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
          label="Tên tòa nhà"
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
          onClick={handleCreateBuilding}
          sx={{ height: "40px" }}
        >
          Thêm tòa nhà
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom
          columns={columnData}
          rows={rows}
          onRowClick={handleRowClick}
        />
      </Card>
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        data={selectedBuilding}
        handleSave={handleSaveBuilding}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
    </section>
  );
};

export default BuildingManage;
