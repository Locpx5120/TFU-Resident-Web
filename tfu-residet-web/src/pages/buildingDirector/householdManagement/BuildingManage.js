import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Button, Card, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addBuilding, getBuildingNew, updateBuilding } from "../../../services/apartmentService";
import { debounce as _debounce } from "lodash";
import dayjs from "dayjs";
import * as yup from 'yup';

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
    fetchBuildings(searchCriteria);
  }, [reload]);

  const fetchBuildings = async (filters) => {
    try {
      const data = await getBuildingNew(filters);
      setBuildings(data.data.map((b) => ({
        ...b,
        numberOfCitizen: b.numberOfCitizen || 0
      })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = useCallback(
    _debounce((updatedCriteria) => {
      fetchBuildings(updatedCriteria);
    }, 1000),
    []
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchCriteria(value);
    handleInput(value); // Trigger debounced search
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
    setSelectedBuilding({
      ...building,
      createAt: building.createAt ? dayjs(building.createAt).format("YYYY-MM-DD") : null
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const schema = yup.object({
    buildingName: yup.string().trim().required('Tên tòa nhà không được để trống'),
    numberFloor: yup.number().typeError("Vui lòng nhập số").integer("Chỉ được nhập số nguyên").required('Số tầng không được để trống').positive('Số tầng phải lớn hơn 0'),
    numberApartment: yup.number().typeError("Vui lòng nhập số").integer("Chỉ được nhập số nguyên").required('Số căn hộ không được để trống').positive('Số căn hộ phải lớn hơn 0'),
    address: yup.string().trim().required('Địa chỉ không được để trống'),
    createAt: yup.date().required('Ngày xây dựng không được để trống'),
  })

  const handleSaveBuilding = async (buildingData) => {
    const updatedBuildingData = {
      ...buildingData,
      isActive: true,
    };

    if (modalMode.mode === 'add') {
      try {
        const data = await addBuilding(updatedBuildingData);
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
          id: selectedBuilding.id,
          ...updatedBuildingData,
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

  const handleDeleteBuilding = async (buildingData) => {
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
        const data = await updateBuilding({
          ...buildingData,
          isActive: false,
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
    <TextField
      fullWidth
      label="Ngày xây dựng"
      name="createAt"
      type="date"
      required
      InputLabelProps={{ shrink: true }}
      disabled={modalMode.mode === 'edit'}
    />,
  ];

  const columnData = [
    { name: "Tên tòa nhà", align: "left", esName: "buildingName" },
    { name: "Số tầng", align: "left", esName: "numberFloor" },
    { name: "Số căn hộ", align: "left", esName: "numberApartment" },
    { name: "Số cư dân", align: "left", esName: "numberOfCitizen" },
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
    createAt: building.createAt ? dayjs(building.createAt).format("DD/MM/YYYY") : 'N/A',
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
      <h4 class="text-left">Tổng số tòa nhà: {rows.length}</h4>
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
        />
      </Card>
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        employee={selectedBuilding}
        handleSave={handleSaveBuilding}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
        validateSchema={schema}
      />
    </section>
  );
};

export default BuildingManage;