import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { set } from 'lodash';

const SendRequest = () => {
    const [requests, setRequests] = useState([{
        serviceId: '',
        vehicleType: '',
        licensePlate: '',
        packageServiceId: '',
        note: '',
        apartmentId: '',
    }]);
    const [serviceTypes, setServiceTypes] = useState('');
    const [serviceTypesArr, setServiceTypesArr] = useState([]);
    const [packageArr, setPackagesArr] = useState([]);
    const [serviceNameArr, setServiceNameArr] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const residentId = Cookies.get("residentId");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7082/api/apartment/resident/${residentId}`, {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${Cookies.get("accessToken")}`,
                      'content-type': 'application/json',
                      'buildingPermalink':  Cookies.get("buildingID"),
                    },
                  });
                  const data = await response.json();
                  setBuildings(data.data);
                const packageNameRes = await fetch('https://localhost:7082/api/package/get-all', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        'content-type': 'application/json',
                        'buildingPermalink':  Cookies.get("buildingID"),
                    },
                });
                const packages = await packageNameRes.json();
                setPackagesArr(packages.data);

                const serviceTypesRes = await fetch('https://localhost:7082/api/servicecategory/GetAll', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        'content-type': 'application/json',
                        'buildingPermalink':  Cookies.get("buildingID"),
                    },
                });
                const resServiceTypes = await serviceTypesRes.json();
                setServiceTypesArr(resServiceTypes.data);
                
                if (!serviceTypes) return;
                
                const serviceNames = await fetch(`https://localhost:7082/api/apartment-services/GetByCategory/${serviceTypes}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        'content-type': 'application/json',
                        'buildingPermalink':  Cookies.get("buildingID"),
                    },
                });

                const resServiceName = await serviceNames.json();
                setServiceNameArr(resServiceName.data);
            } catch (error) {
                
            }
        }

        fetchData();
    }, [serviceTypes]);

    const optionServiceTypes = serviceTypesArr?.map((serviceType) => (
        {
            label: serviceType.name,
            value: serviceType.id
        }
    ));

    const optionServiceName = serviceNameArr?.map((serviceName) => (
        {
            label: serviceName.serviceName,
            value: serviceName.id
        }
    ));

    const optionPackageName = packageArr?.map((serviceName) => (
        {
            label: serviceName.name,
            value: serviceName.id
        }
    ));

    const optionBuildings = buildings?.map((serviceName) => (
        {
            label: serviceName.roomNumber,
            value: serviceName.apartmentId
        }
    ));

    const handleChange = (index, field, value) => {
        const newRequests = [...requests];
        newRequests[index][field] = value;
        setRequests(newRequests);
    };

    const handleAddRequest = () => {
        setRequests([...requests, {
            serviceId: '',
            vehicleType: '',
            licensePlate: '',
            packageServiceId: '',
            note: ''
        }]);
    };

    const handleRemoveRequest = (index) => {
        const newRequests = requests.filter((_, i) => i !== index);
        setRequests(newRequests);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!serviceTypes) {
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Vui lý chọn loại dịch vụ',
            });
            return;
        }
        try {
            const services = requests.map((request) => ({
                residentId: residentId,
                ...request,
            }))
            const response = await fetch("https://localhost:7082/api/service-contract/add-vehicle-service", {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                  'content-type': 'application/json',
                },
                body: JSON.stringify({services}),
              });
              const data = await response.json();
              if (data.code !== 200) {
                Swal.fire('Thất bại', 'Gửi đơn thất bại!', 'error');
              } else {
                Swal.fire('Thành công', 'Đã gửi đơn thành công!', 'success');
                setRequests([{
                    serviceId: '',
                    vehicleType: '',
                    licensePlate: '',
                    packageServiceId: '',
                    note: ''
                }]);
              }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Gửi đơn thất bại',
            });
        }
    };

    return (
        <Box sx={{ padding: '20px' }} className="content">
            <Typography variant="h5" gutterBottom>
                Gửi đơn cho phòng hành chính
            </Typography>
            <FormControl fullWidth margin="normal" sx={{ marginRight: '10px', width: '250px' }}>
                <InputLabel id="service-type-label">Loại dịch vụ</InputLabel>
                <Select
                    labelId="service-type-label"
                    value={serviceTypes}
                    onChange={(e) => setServiceTypes(e.target.value)}
                    required
                >
                    {optionServiceTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <form onSubmit={handleSubmit}>
                {requests.map((request, index) => (
                    <Box key={index} sx={{ marginBottom: '20px' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
                            <FormControl fullWidth margin="normal" sx={{ marginRight: '10px', flex: '1 1 0' }}>
                                <InputLabel id={`service-name-label-${index}`}>Tên dịch vụ</InputLabel>
                                <Select
                                    labelId={`service-name-label-${index}`}
                                    value={request.serviceId}
                                    onChange={(e) => handleChange(index, 'serviceId', e.target.value)}
                                    required
                                >
                                    <MenuItem value="">Chọn dịch vụ</MenuItem>
                                    {optionServiceName?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal" sx={{ marginRight: '10px', flex: '1 1 0' }}>
                                <InputLabel id={`apartment-label-${index}`}>Căn hộ cần gửi đơn</InputLabel>
                                <Select
                                    labelId={`apartment-label-${index}`}
                                    value={request.apartmentId}
                                    onChange={(e) => handleChange(index, 'apartmentId', e.target.value)}
                                    required
                                >
                                    {optionBuildings?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Loại xe"
                                type="text"
                                value={request.vehicleType}
                                onChange={(e) => handleChange(index, 'vehicleType', e.target.value)}
                                required
                                sx={{ marginRight: '10px', flex: '1 1 0' }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Biển số xe"
                                type="text"
                                value={request.licensePlate}
                                onChange={(e) => handleChange(index, 'licensePlate', e.target.value)}
                                required
                                sx={{ marginRight: '10px', flex: '1 1 0' }}
                            />

                            <FormControl fullWidth margin="normal" sx={{ marginRight: '10px', flex: '1 1 0' }}>
                                <InputLabel id={`package-duration-label-${index}`}>Gói</InputLabel>
                                <Select
                                    labelId={`package-duration-label-${index}`}
                                    value={request.packageServiceId}
                                    onChange={(e) => handleChange(index, 'packageServiceId', e.target.value)}
                                    required
                                >
                                    {optionPackageName?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {index === 0 && <Button
                                variant="outlined"
                                color="success"
                                onClick={handleAddRequest}
                                sx={{ alignSelf: 'center' }}
                            >
                                +
                            </Button>}
                            {index > 0 && <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveRequest(index)}
                                sx={{ alignSelf: 'center' }}
                            >
                                -
                            </Button>}
                        </Box>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Lý do"
                            multiline
                            rows={1}
                            value={request.note}
                            onChange={(e) => handleChange(index, 'note', e.target.value)}
                            required
                        />
                    </Box>
                ))}

                <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: '10px' }}>
                        Gửi đơn
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default SendRequest;

