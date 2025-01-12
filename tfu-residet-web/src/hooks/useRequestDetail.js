import { useState } from "react";
import {
  getKyThuat,
  getServiceRepair,
  memeberServiceDetail,
  updateServiceRepair,
  updateVehicle,
  vehicleServiceDetail,
} from "../services/vehicleService";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export const useRequestDetail = (Purpose, paramSplit, navigate) => {
  const [requestInfo, setRequestInfo] = useState({
    buildingName: "",
    apartmentNumber: "",
    serviceName: "",
    memberName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    note: "",
    package: "",
    licensePlate: "",
    startDate: "",
    startTime: "",
    endDate: "",
    noteDetail: "",
    vehicleType: "",
    status: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    technicianName: "",
    technicianPhone: "",
    noteFeedbackCuDan: "",
    noteFeedbackHanhChinh: "",
    noteKyThuat: "",
    cost: "",
    servicePrice: "",
    staffId: "",
    staffName: "",
  });

  const [notes, setNotes] = useState("");
  const [kyThuats, setKyThuats] = useState([]);

  const handleChange = (field, value) => {
    setRequestInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (statusCode) => {
    const id = paramSplit[0]?.split("/")[2];
    const body = {
      serviceContractId: id,
      status: statusCode,
      note: notes,
    };

    if (Purpose === "Dịch vụ sửa điện nước" || Purpose === "Sửa vấn đề khác") {
      body.noteFeedbackCuDan = requestInfo.noteFeedbackCuDan;
      body.noteFeedbackHanhChinh = requestInfo.noteFeedbackHanhChinh;
      body.noteKyThuat = requestInfo.noteKyThuat;
      body.staffId = requestInfo.staffId;
      body.servicePrice = requestInfo.servicePrice;
      body.startDate = dayjs(requestInfo.startDate, 'YYYY/MM/DD').add(7, 'hour');
      body.noteDetail = requestInfo.noteDetail;
    }

    callUpdate(body);
  };

  const fetchRequest = async () => {
    try {
      const dataKyThuat = await getKyThuat();
      setKyThuats(dataKyThuat?.data || []);

      let response = null;
      const id = paramSplit[0]?.split("/")[2];

      if (Purpose === "Add member") {
        response = await memeberServiceDetail(id);
      } else if (Purpose === "Dịch vụ sửa điện nước" || Purpose === "Sửa vấn đề khác") {
        response = await getServiceRepair(id);
      } else {
        response = await vehicleServiceDetail(id);
      }

      setRequestInfo(response.data);
      setNotes(response.data?.note || "");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "",
        text: "Có lỗi xảy ra hoặc không tìm thấy đơn",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/xem-don");
        }
      });
    }
  };

  const callUpdate = async (body) => {
    try {
      let res = null;
      
      if (Purpose !== "Dịch vụ sửa điện nước" && Purpose !== "Sửa vấn đề khác") {
        res = await updateVehicle(body);
      } else {
        res = await updateServiceRepair(body);
      }

      if (res.success) {
        Swal.fire("Thành công!", res.message, "success");
        fetchRequest();
        navigate('/xem-don')
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "",
        text: "Có lỗi xảy ra",
      });
    }
  };

  return {
    requestInfo,
    notes,
    kyThuats,
    handleChange,
    setNotes,
    handleSubmit,
    fetchRequest,
  };
};