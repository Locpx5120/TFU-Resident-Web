import React, { useEffect, useMemo, useState, useRef } from "react";
import TableCustom from "../../../components/Table";
import { Button, Card, Box, TextField, MenuItem } from "@mui/material";
import CustomModal from "../../../common/CustomModal";
import { FileUpload } from "primereact/fileupload";
import {
  addContractHire,
  addContractThird,
  getContractDetail,
} from "../../../services/thirdpartyService";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getBuildingNew } from "../../../services/apartmentService";
import { fileCreate, getDetailFile } from "../../../services/FileService";

const DetailThirdPartyLent = () => {
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

  const fileUploadRef = useRef(null);
  const openPdfRef = useRef(null); // Sử dụng useRef thay vì useState
  const fileId = useRef(null); // Sử dụng useRef thay vì useState

  const columnData = [
    { esName: "companyName", name: "Tên công ty", width: 200 },
    { esName: "nameService", name: "Tên dịch vụ", width: 200 },
    // { esName: 'floor', name: 'Tầng', width: 100 },
    // { esName: 'room', name: 'Phòng', width: 100 },
    // { esName: 'area', name: 'Diện tích mặt bằng (m2)', width: 200 },
    { esName: "startDate", name: "Ngày thuê", width: 150 },
    { esName: "endDate", name: "Ngày hết hạn", width: 150 },
    { esName: "servicePrice", name: "Giá dịch vụ", width: 150 },
    { esName: "fileId", name: "Hợp đồng", width: 150 },
  ];

  const imageUploadConfig = {
    empty: <p className="m-0">Kéo thả hợp đồng tại đây .</p>,
    size: 10000000,
  };

  const handleFileRemove = async (event) => {
    openPdfRef.current = null;
    fileId.current = null;
  };

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    try {
      const file = event.files ? event.files[0] : event;
      const reader = new FileReader();
      let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        openPdfRef.current = base64data;
      };

      const formData = new FormData();
      formData.append("file", file);

      const res = await fileCreate(formData);
      if (res && res.success === true) {
        fileId.current = res.data.id;
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      startDate: item.startDate ? item.startDate : "Không có",
      endDate: item.endDate ? item.endDate : "Không có",
      fileId: (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openHopDong(item)}
          >
            Xem File HĐ
          </Button>
        </div>
      ),
    }));
  }, [data]);

  const openHopDong = async (item) => {
    const res = await getDetailFile(item.fileId);
    console.log("res", res);
    if (res == undefined || res.success == false) {
      return;
    }
    openPdfRef.current =
      "data:" + res.data.contentType + ";base64," + res.data.base64;
    openBase64Pdf();
    openPdfRef.current = null;
  };

  const openBase64Pdf = () => {
    console.log("openPdfRef.current", openPdfRef.current);
    if (openPdfRef.current == null) {
      return "";
    }
    // Tạo Blob từ base64
    const byteCharacters = atob(openPdfRef.current.split(",")[1]);
    const byteNumbers = Array.from(byteCharacters).map((char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Tạo URL từ Blob
    const blobUrl = URL.createObjectURL(blob);

    // Mở URL trong tab mới
    window.open(blobUrl, "_blank");

    // Giải phóng URL Blob sau khi sử dụng (tùy chọn)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  };

  const formatNumberWithCommas = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "price") {
      const numericValue = value.replace(/[^\d]/g, "");
      const formattedValue = formatNumberWithCommas(numericValue);
      setSelectedThirdParty((prev) => ({
        ...prev,
        [fieldName]: formattedValue,
      }));
    } else {
      setSelectedThirdParty((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const modalFields = [
    <TextField
      fullWidth
      select
      label="Tòa nhà"
      name="BuildId"
      value={selectedThirdParty.building || ""}
      onChange={(e) => handleFieldChange("building", e.target.value)}
    >
      {buildings.map((building) => (
        <MenuItem key={building.id} value={building.id}>
          {building.buildingName}
        </MenuItem>
      ))}
    </TextField>,
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
      name="price"
      type="text"
      value={formatNumberWithCommas(selectedThirdParty.price)}
      onChange={(e) => handleFieldChange("price", e.target.value)}
    />,
    <FileUpload
      ref={fileUploadRef}
      name="demo[]"
      accept=".pdf"
      onSelect={customBase64Uploader}
      onRemove={handleFileRemove} // Gắn sự kiện khi xóa file
      mode="advanced"
      auto
      maxFileSize={imageUploadConfig.size}
      emptyTemplate={imageUploadConfig.empty}
    />,
    // Thêm nút mở file PDF nếu file đã được upload
    // (selectedThirdParty && selectedThirdParty.fileId) ? (
    openPdfRef ? (
      <Button
        key="view-contract"
        variant="contained"
        color="primary"
        onClick={openBase64Pdf}
      >
        Xem hợp đồng
      </Button>
    ) : null, // Trả về null nếu openPdf không tồn tại
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
      if (fileId.current == null) {
        Swal.fire("Thong bao", "File Hợp Đồng Không được để trống", "info");
        return;
      }

      const res = await addContractHire({
        ...data,
        price: Number(data?.price || 0),
        thirdPartyId: id,
        fileId: fileId.current,
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
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenModal("add", "Thêm hợp đồng thuê dịch vụ")}
          sx={{ height: "40px" }}
        >
          Thêm hợp đồng thuê dịch vụ
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom columns={columnData} rows={rows} />
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

export default DetailThirdPartyLent;
