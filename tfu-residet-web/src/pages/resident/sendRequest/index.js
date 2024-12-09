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
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { DatePicker } from "antd";
import moment from "moment/moment";
import {
  addMember,
  getServiceName,
} from "../../../services/apartmentService";
import { listAllPackage } from "../../../services/PackageService";
import { addRepairReport, addVehicle, listCategory } from "../../../services/vehicleService";
import { useLocation } from "react-router-dom";
import { baoCaoSuaChua, themThanhVien, vehicleCode } from "../../../constants";
import {
  getApartmentByBuilding,
  GetBuildingsByUser,
} from "../../../services/buildingService";
import { omit } from "lodash";

const SendRequest = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const agentType = queryParams.get("agentType");
  const [serviceNames, setServiceName] = useState(agentType ? agentType : "");
  const [serviceTypes, setServiceTypes] = useState("");
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
      : serviceTypes === baoCaoSuaChua ? 
      {
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        technicianName: '',
        technicianPhone: '',
        startDate: null,
        cost: '',
        note: '',
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
  const [serviceTypesArr, setServiceTypesArr] = useState([]);
  const [packageArr, setPackagesArr] = useState([]);
  const [serviceNameArr, setServiceNameArr] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState("");
  const [building, setBuilding] = useState("");
  const residentId = Cookies.get("residentId");

  const handleReset = (index) => {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];
      updatedRequests[index] = {
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        technicianName: '',
        technicianPhone: '',
        startDate: null,
        cost: '',
        note: '',
      };
      return updatedRequests;
    });
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetBuildingsByUser();
        setBuildings(data.data);
        const packages = await listAllPackage();
        setPackagesArr(packages.data);
        const resServiceTypes = await listCategory();
        setServiceTypesArr(resServiceTypes.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!serviceTypes) return;
    const fetchData = async () => {
      const resServiceName = await getServiceName(serviceTypes);
      setServiceNameArr(resServiceName?.data || []);
    };
    fetchData();
  }, [serviceTypes]);

  useEffect(() => {
    if (!building) return;
    const fetchData = async () => {
      const res = await getApartmentByBuilding(building);
      setApartments(res?.data || []);
    };
    fetchData();
  }, [building]);

  const optionServiceTypes = serviceTypesArr?.map((serviceType) => ({
    label: serviceType.name,
    value: serviceType.id,
  }));

  const optionServiceName = (
    serviceNameArr.length > 0 ? serviceNameArr : []
  )?.map((serviceName) => ({
    label: serviceName.serviceName,
    value: serviceName.id,
  }));
  
  const optionAparments = (apartments.length > 0 ? apartments : [])?.map(
    (apartment) => ({
      label: apartment.roomNumber,
      value: apartment.id,
    })
  );

  const optionPackageName = packageArr?.map((serviceName) => ({
    label: serviceName.name,
    value: serviceName.id,
  }));

  const optionBuildings = buildings?.map((serviceName) => ({
    label: serviceName.buildingName,
    value: serviceName.id,
  }));

  const handleChange = (index, field, value) => {
    const newRequests = [...requests];
    newRequests[index][field] = value;
    setRequests(newRequests);
  };

  const handleChangeServiceName = (index, field, value) => {
    const newRequests = [...requests];
    newRequests[index][field] = value;
    setRequests(newRequests);
    setServiceName(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddRequest = () => {
    setRequests([
      ...requests,
      serviceTypes === themThanhVien
        ? {
            serviceId: "",
            note: "",
            name: "",
            phone: "",
            email: "",
            birthday: "",
          }
        : {
            serviceId: "",
            vehicleType: "",
            licensePlate: "",
            packageServiceId: "",
            note: "",
          },
    ]);
  };
  const handleRemoveRequest = (index) => {
    const newRequests = requests.filter((_, i) => i !== index);
    setRequests(newRequests);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      handleRequest();
      if (serviceTypes === themThanhVien) {
        const services = {
          apartmentId: apartment,
          serviceId: serviceNames,
          members: requests.map((request) => ({
            name: request.name,
            email: request.email,
            birthday: new Date(request.birthday),
            phone: request.phone,
            note: request.note,
          })),
        };
        if (services.members) {
          for (let mem of services.members) {
            if (!validateEmail(mem.email)) {
              Swal.fire("Thất bại", "Vui lòng kiểm tra lại email ", "error");
              return;
            }
          }
        }
        const data = await addMember(services);
        if (data.code !== 200) {
          Swal.fire("Thất bại", "Gửi đơn thất bại!", "error");
        } else {
          Swal.fire("Thành công", "Đã gửi đơn thành công!", "success");
          setRequests([
            {
              serviceId: "",
              note: "",
              name: "",
              phone: "",
              email: "",
              birthday: "",
            },
          ]);
        }
      } else if (serviceTypes === baoCaoSuaChua) {
        const services = requests.map(item => ({
          ...item,
          apartmentId: apartment,
          serviceId: serviceNames,
          residentId
        }))
        const data = await addRepairReport({ services });
        if (!data.data[0].success) {
          Swal.fire("Thất bại", data.data[0].message, "error");
          return;
        }
        if (data.code !== 200) {
          Swal.fire("Thất bại", "Gửi đơn thất bại!", "error");
        } else {
          Swal.fire("Thành công", "Đã gửi đơn thành công!", "success");
          setRequests([]);
        }
      } else {
        const services = requests.map((request) => ({
          residentId: residentId,
          ...request,
          serviceId: serviceNames,
          apartmentId: apartment,
        }));
        const data = await addVehicle({ services });
        if (!data.data[0].success) {
          Swal.fire("Thất bại", data.data[0].message, "error");
          return;
        }
        if (data.code !== 200) {
          Swal.fire("Thất bại", "Gửi đơn thất bại!", "error");
        } else {
          Swal.fire("Thành công", "Đã gửi đơn thành công!", "success");
          setRequests([
            {
              serviceId: "",
              vehicleType: "",
              licensePlate: "",
              packageServiceId: "",
              note: "",
            },
          ]);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Gửi đơn thất bại",
      });
    }
  };
  const handleRequest = () => {
    const requestSubmit = {
      buildingId: building,
      apartmentId: apartment,
      requestList: requests,
    };
  };
  const addMemberTemplate = (request, index) => {
    return (
      <>
        <TextField
          fullWidth
          margin="normal"
          label="Tên thành viên"
          type="text"
          value={request.name}
          onChange={(e) => handleChange(index, "name", e.target.value)}
          required
          sx={{ width: "45%" }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Số điện thoại"
          type="text"
          value={request.phone}
          onChange={(e) => handleChange(index, "phone", e.target.value)}
          required
          sx={{ marginRight: "10px", width: "50%" }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="email"
          type="text"
          value={request.email}
          onChange={(e) => handleChange(index, "email", e.target.value)}
          required
          sx={{ marginRight: "10px", width: "45%" }}
        />
        <DatePicker
          fullWidth
          placeholder="Ngày sinh"
          value={request.birthday ? moment(request.birthday) : null}
          onChange={(date, dateString) =>
            handleChange(index, "birthday", dateString)
          }
          required
          style={{ width: "90%", marginRight: "10px" }}
        />
      </>
    );
  };
  const addVehicleTemplate = (request, index) => {
    return (
      <>
        <TextField
          fullWidth
          margin="normal"
          label="Loại xe"
          type="text"
          value={request.vehicleType}
          onChange={(e) => handleChange(index, "vehicleType", e.target.value)}
          required
          sx={{ marginRight: "10px", width: "45%" }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Biển số xe"
          type="text"
          value={request.licensePlate}
          onChange={(e) => handleChange(index, "licensePlate", e.target.value)}
          required
          sx={{ marginRight: "10px", width: "50%" }}
        />

        <FormControl
          fullWidth
          margin="normal"
          sx={{ marginRight: "10px", width: "45%" }}
        >
          <InputLabel id={`package-duration-label-${index}`}>Gói</InputLabel>
          <Select
            labelId={`package-duration-label-${index}`}
            value={request.packageServiceId}
            onChange={(e) =>
              handleChange(index, "packageServiceId", e.target.value)
            }
            required
          >
            {optionPackageName?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          fullWidth
          placeholder="Ngày gửi xe"
          value={request.startDate ? moment(request.startDate) : null}
          onChange={(date, dateString) =>
            handleChange(index, "startDate", dateString)
          }
          required
          style={{ marginRight: "10px", width: "90%" }}
        />
      </>
    );
  };

  const addReportFixTemplate = (request, index) => {
    return (
        <>
        </>
    )
}

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
  formControl: {
    margin: "12px 0",
  },
  selectField: {
    width: "48%",
    marginRight: "2%",
  },
  textField: {
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
    alignSelf: "flex-end",
  },
};

return (
  <Box className="content" sx={formStyles.container}>
    {/* Thông tin căn hộ */}
    <Box sx={formStyles.section}>
      <Typography variant="h6" gutterBottom>
        Thông tin căn hộ
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 2 }}>
        <FormControl sx={formStyles.selectField}>
          <InputLabel>Toà nhà</InputLabel>
          <Select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            required
          >
            {optionBuildings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
            {optionAparments.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>

    {/* Form đơn */}
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
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* Loại dịch vụ */}
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
                  {optionServiceTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Tên dịch vụ */}
              {request.serviceId && (
                <FormControl sx={formStyles.selectField}>
                  <InputLabel>Tên dịch vụ</InputLabel>
                  <Select
                    value={request.serviceName}
                    onChange={(e) => handleChangeServiceName(index, "serviceName", e.target.value)}
                    required
                    disabled={!serviceTypes}
                  >
                    {optionServiceName.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Nút thêm/xóa */}
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

            {/* Template theo loại dịch vụ */}
            <Box sx={{ marginTop: 2 }}>
              {request.serviceId === themThanhVien && addMemberTemplate(request, index)}
              {request.serviceId === baoCaoSuaChua && addReportFixTemplate(request, index)}
              {request.serviceId === vehicleCode && addVehicleTemplate(request, index)}
            </Box>

            {/* Ghi chú */}
            <TextField
              label="Ghi chú"
              multiline
              rows={2}
              value={request.note}
              onChange={(e) => handleChange(index, "note", e.target.value)}
              required
              sx={formStyles.fullWidthField}
            />
          </Box>
        ))}

        {/* Nút gửi đơn */}
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
