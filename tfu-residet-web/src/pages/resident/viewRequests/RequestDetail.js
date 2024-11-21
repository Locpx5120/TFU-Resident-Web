import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  memeberServiceDetail,
  updateVehicle,
  vehicleServiceDetail,
} from "../../../services/vehicleService";

const RequestDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const paramSplit = location.pathname?.split("&");
  const Purpose = decodeURIComponent(paramSplit[1]?.slice(8));

  const { request } = location.state || {};

  // States for all fields
  const [memberName, setMemberName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceName, setServiceName] = useState(request?.serviceName || "");
  const [quantity, setQuantity] = useState("1");
  const [room, setRoom] = useState(request?.room || "");
  const [status, setStatus] = useState(request?.status || "");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [packageType, setPackageType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      serviceName,
      quantity,
      room,
      status,
      purpose,
      notes,
      apartmentNumber,
      buildingName,
      licensePlate,
      packageType,
      vehicleType,
      startDate,
      endDate,
    });
    const body = {
      serviceContractId: params.id,
      status,
      notes,
    };
    callUpdate(body);
    // navigate('/xem-don');
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        let response = null;
        const id = paramSplit[0]?.split("/")[2];
        if (Purpose === "Add member") {
          response = await memeberServiceDetail(id);
        } else {
          response = await vehicleServiceDetail(id);
        }
        const data = response.data;

        setServiceName(data?.serviceName || "");
        setRoom(data?.room || "");
        setQuantity(data?.quantity || "1");
        setStatus(data?.status || "");
        setPurpose(data?.purpose || "");
        setNotes(data?.note || "");
        setApartmentNumber(data?.apartmentNumber || "");
        setBuildingName(data?.buildingName || "");
        setLicensePlate(data?.licensePlate || "");
        setPackageType(data?.package || "");
        setVehicleType(data?.vehicleType || "");
        setStartDate(data?.startDate || "");
        setEndDate(data?.endDate || "");
        setMemberName(data?.memberName || "");
        setDateOfBirth(data?.dateOfBirth || "");
        setEmail(data?.email || "");
        setPhoneNumber(data?.phoneNumber || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequest();
  }, [params.id]);

  const callUpdate = async (body) => {
    try {
      const res = await updateVehicle(body);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className="content" sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Chi tiết Đơn
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ flex: "1 1 50%", padding: "10px" }}>
          {purpose && (
            <TextField
              fullWidth
              margin="normal"
              label="Mục đích"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          )}
          {licensePlate && (
            <TextField
              fullWidth
              margin="normal"
              label="Biển số xe"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          )}
          {packageType && (
            <TextField
              fullWidth
              margin="normal"
              label="Gói dịch vụ"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
            />
          )}
          {vehicleType && (
            <TextField
              fullWidth
              margin="normal"
              label="Loại xe"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            />
          )}
          {startDate && (
            <TextField
              fullWidth
              margin="normal"
              label="Ngày bắt đầu"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          )}
          {endDate && (
            <TextField
              fullWidth
              margin="normal"
              label="Ngày kết thúc"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          )}
          {memberName && (
            <TextField
              fullWidth
              margin="normal"
              label="Tên thành viên"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          )}
          {dateOfBirth && (
            <TextField
              fullWidth
              margin="normal"
              label="Ngày sinh"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          {email && (
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {phoneNumber && (
            <TextField
              fullWidth
              margin="normal"
              label="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}
          {notes && (
            <TextField
              fullWidth
              margin="normal"
              label="Chú thích"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          )}
        </Box>
        <Box sx={{ textAlign: "right", marginTop: "20px", width: "100%" }}>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/xem-don")}
            sx={{ marginLeft: "10px" }}
          >
            Đóng
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RequestDetail;
