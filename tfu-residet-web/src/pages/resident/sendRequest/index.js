import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { DatePicker } from "antd";
import moment from "moment/moment";
import { addMember, getServiceName } from "../../../services/apartmentService";
import { listAllPackage } from "../../../services/PackageService";
import {
  addRepairReport,
  addVehicle,
  listCategory,
} from "../../../services/vehicleService";
import { useLocation } from "react-router-dom";
import { baoCaoSuaChua, themThanhVien, vehicleCode } from "../../../constants";
import {
  getApartmentByBuilding,
  GetBuildingsByUser,
} from "../../../services/buildingService";

const SendRequest = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const agentType = queryParams.get("agentType");
  const residentId = Cookies.get("residentId");

  const [serviceNames, setServiceName] = useState(agentType || "");
  const [serviceTypes, setServiceTypes] = useState("");

  const [serviceTypesArr, setServiceTypesArr] = useState([]);
  const [packageArr, setPackagesArr] = useState([]);
  const [serviceNameArr, setServiceNameArr] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState("");
  const initalRequet =
    serviceTypes === themThanhVien
      ? {
          serviceId: "",
          note: "",
          name: "",
          phone: "",
          email: "",
          birthday: "",
        }
      : serviceTypes === baoCaoSuaChua
      ? {
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          technicianName: "",
          technicianPhone: "",
          startDate: null,
          cost: "",
          note: "",
        }
      : {
          serviceId: "",
          vehicleType: "",
          licensePlate: "",
          packageServiceId: "",
          note: "",
          apartmentId: "",
          startDate: "",
        };
  const [requests, setRequests] = useState([initalRequet]);
  const [building, setBuilding] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [buildingsData, packagesData, serviceTypesData] =
          await Promise.all([
            GetBuildingsByUser(),
            listAllPackage(),
            listCategory(),
          ]);
        setBuildings(buildingsData.data);
        setPackagesArr(packagesData.data);
        setServiceTypesArr(serviceTypesData.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);
  console.log(serviceNameArr);

  useEffect(() => {
    if (serviceTypes) {
      getServiceName(serviceTypes).then((res) =>
        setServiceNameArr(res?.data || [])
      );
    }
  }, [serviceTypes]);

  useEffect(() => {
    if (building) {
      getApartmentByBuilding(building).then((res) =>
        setApartments(res?.data || [])
      );
    }
  }, [building]);

  const handleChange = (index, field, value) => {
    setRequests((prev) =>
      prev.map((req, i) => (i === index ? { ...req, [field]: value } : req))
    );
  };

  const handleChangeServiceName = (index, field, value) => {
    handleChange(index, field, value);
    setServiceName(value);
  };

  const handleAddRequest = () => {
    setRequests((prev) => [...prev, getInitialRequest(serviceTypes)]);
  };

  const handleRemoveRequest = (index) => {
    setRequests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (serviceTypes === themThanhVien) {
        data = await submitMemberRequest();
      } else if (serviceTypes === baoCaoSuaChua) {
        data = await submitRepairRequest();
      } else {
        data = await submitVehicleRequest();
      }

      if (data.code === 200) {
        Swal.fire("Thành công", "Đã gửi đơn thành công!", "success");
        resetForm();
      } else {
        Swal.fire(
          "Thất bại",
          data.data[0]?.message || "Gửi đơn thất bại!",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Lỗi", "Gửi đơn thất bại", "error");
    }
  };

  const resetForm = () => {
    setRequests([getInitialRequest(serviceTypes)]);
  };

  const getInitialRequest = (type) => {
    switch (type) {
      case themThanhVien:
        return {
          serviceId: "",
          note: "",
          name: "",
          phone: "",
          email: "",
          birthday: "",
        };
      case baoCaoSuaChua:
        return {
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          technicianName: "",
          technicianPhone: "",
          startDate: null,
          cost: "",
          note: "",
        };
      default:
        return {
          serviceId: "",
          vehicleType: "",
          licensePlate: "",
          packageServiceId: "",
          note: "",
          apartmentId: "",
          startDate: "",
          unit: "",
          unitPrice: 0,
        };
    }
  };

  const submitMemberRequest = async () => {
    const services = {
      apartmentId: apartment,
      serviceId: serviceNames,
      members: requests.map(({ name, email, birthday, phone, note }) => ({
        name,
        email,
        birthday: new Date(birthday),
        phone,
        note,
      })),
    };
    if (services.members.some((mem) => !validateEmail(mem.email))) {
      throw new Error("Invalid email");
    }
    return await addMember(services);
  };

  const submitRepairRequest = async () => {
    const services = requests.map((item) => ({
      ...item,
      apartmentId: apartment,
      serviceId: serviceNames,
      residentId,
    }));
    return await addRepairReport({ services });
  };

  const submitVehicleRequest = async () => {
    const services = requests.map((request) => ({
      residentId,
      ...request,
      serviceId: serviceNames,
      apartmentId: apartment,
    }));
    return await addVehicle({ services });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const renderMemberFields = (request, index) => (
    <>
      <TextField
        label="Tên thành viên"
        value={request.name}
        onChange={(e) => handleChange(index, "name", e.target.value)}
        required
        sx={formStyles.textField}
      />
      <TextField
        label="Số điện thoại"
        value={request.phone}
        onChange={(e) => handleChange(index, "phone", e.target.value)}
        required
        sx={formStyles.textField}
      />
      <TextField
        label="Email"
        type="email"
        value={request.email}
        onChange={(e) => handleChange(index, "email", e.target.value)}
        required
        sx={formStyles.textField}
      />
      <DatePicker
        placeholder="Ngày sinh"
        value={request.birthday ? moment(request.birthday) : null}
        onChange={(date, dateString) =>
          handleChange(index, "birthday", dateString)
        }
        style={formStyles.datePicker}
      />
    </>
  );

  const renderVehicleFields = (request, index) => (
    <>
      <TextField
        label="Loại xe"
        value={request.vehicleType}
        onChange={(e) => handleChange(index, "vehicleType", e.target.value)}
        required
        sx={formStyles.textField}
      />
      <TextField
        label="Biển số xe"
        value={request.licensePlate}
        onChange={(e) => handleChange(index, "licensePlate", e.target.value)}
        required
        sx={formStyles.textField}
      />
      <FormControl sx={formStyles.selectField}>
        <InputLabel>Gói</InputLabel>
        <Select
          value={request.packageServiceId}
          onChange={(e) =>
            handleChange(index, "packageServiceId", e.target.value)
          }
          required
        >
          {packageArr.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DatePicker
        placeholder="Ngày gửi xe"
        value={request.startDate ? moment(request.startDate) : null}
        onChange={(date, dateString) =>
          handleChange(index, "startDate", dateString)
        }
        style={formStyles.datePicker}
      />
      <TextField
        label="Đơn vị"
        value={request.unit}
        onChange={(e) => handleChange(index, "unit", e.target.value)}
        required
        sx={formStyles.textField}
      />
    </>
  );

  const renderRepairFields = (request, index) => <></>;

  const formStyles = {
    container: {
      padding: "24px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    section: {
      marginBottom: "32px",
    },
    selectField: {
      width: "48%",
      marginRight: "2%",
      marginBottom: "16px",
    },
    textField: {
      width: "48%",
      marginRight: "2%",
      marginBottom: "16px",
    },
    datePicker: {
      width: "48%",
      marginRight: "2%",
      marginBottom: "16px",
    },
    fullWidthField: {
      width: "98%",
      marginBottom: "16px",
    },
    actionButton: {
      minWidth: "40px",
      height: "40px",
      padding: "0",
      marginLeft: "8px",
    },
  };
 const unitPriceFind = serviceNameArr.find(item => item.id === serviceNames);
 
  return (
    <Box className="content" sx={formStyles.container}>
      <Box sx={formStyles.section}>
        <Typography variant="h6" gutterBottom>
          Thông tin căn hộ
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <FormControl sx={formStyles.selectField}>
            <InputLabel>Toà nhà</InputLabel>
            <Select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              required
            >
              {buildings.map((building) => (
                <MenuItem key={building.id} value={building.id}>
                  {building.buildingName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={formStyles.selectField}>
            <InputLabel>Căn hộ</InputLabel>
            <Select
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              required
              disabled={apartments.length < 1}
            >
              {apartments.map((apt) => (
                <MenuItem key={apt.id} value={apt.id}>
                  {apt.roomNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={formStyles.section}>
        <Typography variant="h6" gutterBottom>
          Thông tin đơn
        </Typography>
        <form onSubmit={handleSubmit}>
          {requests.map((request, index) => (
            <Box
              key={index}
              sx={{
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                <FormControl sx={formStyles.selectField}>
                  <InputLabel>Loại dịch vụ</InputLabel>
                  <Select
                    value={request.serviceId}
                    onChange={(e) => {
                      setServiceTypes(e.target.value);
                      handleChange(index, "serviceId", e.target.value);
                    }}
                    required
                  >
                    {serviceTypesArr.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {request.serviceId && (
                  <FormControl sx={formStyles.selectField}>
                    <InputLabel>Tên dịch vụ</InputLabel>
                    <Select
                      value={request.serviceName}
                      onChange={(e) =>
                        handleChangeServiceName(
                          index,
                          "serviceName",
                          e.target.value
                        )
                      }
                      required
                      disabled={!serviceTypes}
                    >
                      {serviceNameArr.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.serviceName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                { themThanhVien !== serviceTypes && <TextField
                  // label="Giá"
                  variant="outlined"
                  type="text"
                  disabled
                  value={unitPriceFind?.unitPrice}
                  sx={formStyles.textField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VNĐ/ngày</InputAdornment>
                    ),
                  }}
                /> }
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {index === 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddRequest}
                      sx={formStyles.actionButton}
                    >
                      +
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveRequest(index)}
                      sx={formStyles.actionButton}
                    >
                      -
                    </Button>
                  )}
                </Box>
              </Box>

              <Box sx={{ marginTop: 2 }}>
                {request.serviceId === themThanhVien &&
                  renderMemberFields(request, index)}
                {request.serviceId === baoCaoSuaChua &&
                  renderRepairFields(request, index)}
                {request.serviceId === vehicleCode &&
                  renderVehicleFields(request, index)}
              </Box>

              <TextField
                label="Ghi chú"
                multiline
                rows={2}
                value={request.note}
                onChange={(e) => handleChange(index, "note", e.target.value)}
                sx={formStyles.fullWidthField}
              />
            </Box>
          ))}

          <Box sx={{ textAlign: "right", marginTop: "24px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Gửi đơn
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SendRequest;
