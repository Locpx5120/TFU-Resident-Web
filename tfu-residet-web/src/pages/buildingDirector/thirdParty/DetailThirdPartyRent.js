import React, { useEffect, useMemo, useState } from "react";
import TableCustom from "../../../components/Table";
import { Button, Card, Box, TextField, MenuItem } from "@mui/material";
import CustomModal from "../../../common/CustomModal";
import {
  addContractThird,
  getContractDetail,
} from "../../../services/thirdpartyService";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getBuildingNew } from "../../../services/apartmentService";
import moment from "moment";

const DetailThirdPartyRent = () => {
  const { id } = useParams();
  const [reload, setReload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [data, setData] = useState([]);
  const [selectedThirdParty, setSelectedThirdParty] = useState({});
  const [modalMode, setModalMode] = useState({
    mode: "add",
    title: "Thêm hợp đồng",
  });

  const columnData = [
    { esName: "buildingName", name: 'Tòa nhà', width: 150 },
    { esName: "companyName", name: "Tên công ty", width: 200 },
    { esName: "nameService", name: 'Tên dịch vụ', width: 150 },
    { esName: "floor", name: "Tầng", width: 100 },
    { esName: "room", name: "Phòng", width: 100 },
    { esName: "area", name: "Diện tích mặt bằng (m2)", width: 200 },
    { esName: "startDateFormat", name: "Ngày thuê", width: 150 },
    { esName: "endDateFormat", name: "Ngày hết hạn", width: 150 },
    { esName: "servicePrice", name: "Giá dịch vụ", width: 150 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getContractDetail(id);
      const building = await getBuildingNew();
      setData(res?.data || []);
      setBuildings(building?.data || []);
    };
    fetchData();
  }, [reload]);

  const rows = useMemo(() => {
    return data.map((item) => ({
      ...item,
      startDateFormat: moment(item.startDate).format("DD-MM-YYYY"),
      endDateFormat: moment(item.endDate).format("DD-MM-YYYY"),
    }));
  }, [data]);

  const handleFieldChange = (fieldName, value) => {
    setSelectedThirdParty((prev) => {
      const newState = { ...prev, [fieldName]: value };
      console.log("Updated State:", newState);
      return newState;
    });
  };

  const modalFields = [
    <TextField
      fullWidth
      select
      label="Tòa nhà"
      name="building"
      value={selectedThirdParty.building || ''}
      onChange={(e) => handleFieldChange('building', e.target.value)}
    >
      {buildings.map((building) => (
        <MenuItem key={building.id} value={building.id}>
          {building.buildingName}
        </MenuItem>
      ))}
    </TextField>,
    <TextField
      fullWidth
      label="Tên công ty"
      name="companyName"
      type="text"
      value={selectedThirdParty.companyName || ""}
      onChange={(e) => handleFieldChange("companyName", e.target.value)}
    />,
    <TextField
      fullWidth
      label="Tên dịch vụ"
      name="nameService"
      type="text"
      value={selectedThirdParty.nameService || ""}
      onChange={(e) => handleFieldChange("nameService", e.target.value)}
    />,
    <TextField
      fullWidth
      label="Số tầng"
      name="floor"
      type="number"
      value={selectedThirdParty.floor || ""}
      onChange={(e) => handleFieldChange("floor", e.target.value)}
    />,
    <TextField
      fullWidth
      label="Số phòng"
      name="room"
      type="number"
      value={selectedThirdParty.room || ""}
      onChange={(e) => handleFieldChange("room", e.target.value)}
    />,
    <TextField
      fullWidth
      label="Ngày bắt đầu thuê"
      name="startDate"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={selectedThirdParty.startDate || ""}
      onChange={(e) => handleFieldChange("startDate", e.target.value)}
    />,
    <TextField
      fullWidth
      label="Ngày hết hạn thuê"
      name="endDate"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={selectedThirdParty.endDate || ""}
      onChange={(e) => handleFieldChange("endDate", e.target.value)}
    />,
    <TextField
      fullWidth
      label="Số tiền"
      name="servicePrice"
      type="text"
      value={selectedThirdParty.servicePrice}
      onChange={(e) => handleFieldChange("servicePrice", e.target.value)}
    />,
  ];

  const handleOpenModal = (mode, title) => {
    setModalMode({ mode, title });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveThirdParty = async (data) => {
    try {
      const res = await addContractThird({
        ...data,
        price: Number(data?.price || 0),
        floorNumber: Number(data?.floorNumber || 0),
        roomNumber: Number(data?.roomNumber || 0),
        thirdPartyId: id,
      });
      if (res?.success) {
        setReload(!reload);
        handleCloseModal();
        Swal.fire("Thành công", res.message, "success");
      } else {
        Swal.fire("Thất bại", res?.message, "error");
      }
    } catch (err) {
      Swal.fire("Thất bại", "Không thành công", "error");
    }
  };

  return (
    <section className="content">
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "flex-end",
          mb: 2,
        }}
      >
        {data.length < 1 && (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handleOpenModal("add", "Thêm hợp đồng bên thuê mặt bằng")
            }
            sx={{ height: "40px" }}
          >
            Thêm hợp đồng bên thuê mặt bằng
          </Button>
        )}
        {data.length >= 1 && (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handleOpenModal("update", "Cập nhật hợp đồng bên thuê mặt bằng")
            }
            sx={{ height: "40px" }}
          >
            Cập nhật hợp đồng bên thuê mặt bằng
          </Button>
        )}
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom
          columns={columnData}
          rows={rows}
          onRowClick={(row) => {
            setSelectedThirdParty(row);
            handleOpenModal("update", "Cập nhật hợp đồng bên thuê mặt bằng");
          }}
        />
      </Card>
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        data={selectedThirdParty}
        handleSave={handleSaveThirdParty}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
    </section>
  );
};

export default DetailThirdPartyRent;
