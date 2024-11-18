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
import { DatePicker } from 'antd';
import moment from 'moment/moment';
import {getBuilding} from "../../../services/residentService";
import {addMember, getServiceName} from "../../../services/apartmentService";
import {listAllPackage} from "../../../services/PackageService";
import { addVehicle, listCategory} from "../../../services/vehicleService";
import { useLocation } from 'react-router-dom';
import {themThanhVien, vehicleCode, vehicleService} from '../../../constants';

const SendRequest = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const agentType = queryParams.get("agentType");
    const [serviceTypes, setServiceTypes] = useState(agentType ? agentType : '');
    const initalRequet = serviceTypes === themThanhVien ? {
        serviceId: '',
        note: '',
        name: '',
        phone: '',
        email: '',
        birthday: '',
    } : {
        serviceId: '',
        vehicleType: '',
        licensePlate: '',
        packageServiceId: '',
        note: '',
        apartmentId: '',
        startDate: ''
    };
    const [requests, setRequests] = useState([initalRequet]);
    const [serviceTypesArr, setServiceTypesArr] = useState([]);
    const [packageArr, setPackagesArr] = useState([]);
    const [serviceNameArr, setServiceNameArr] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [apartment, setApartment] = useState('');
    const residentId = Cookies.get("residentId");

    const handleChangeApartment = (event) => {
        setApartment(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBuilding(residentId);
                setBuildings(data.data);
                const packages = await listAllPackage();
                setPackagesArr(packages.data)
                const resServiceTypes = await listCategory();
                setServiceTypesArr(resServiceTypes.data);
                if (!serviceTypes) return;
                const resServiceName = await getServiceName(serviceTypes);
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
    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
        if (!serviceTypes) {
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Vui lòng chọn loại dịch vụ',
            });
            return;
        }
        try {

            if (serviceTypes === themThanhVien) {
                const services = {
                    apartmentId: apartment,
                    serviceId: serviceTypes,
                    members: requests.map((request) => ({
                        name: request.name,
                        email: request.email,
                        birthday: request.birthday,
                        phone: request.phone,
                        note: request.note
                    }))
                }
                if (services.members) {
                    for (let mem of services.members) {
                        if (!validateEmail(mem.email)) {
                            Swal.fire('Thất bại', 'Vui lòng kiểm tra lại email ', 'error');
                            return;
                        }
                    }
                }
                const data = await addMember(services);
                if (data.code !== 200) {
                    Swal.fire('Thất bại', 'Gửi đơn thất bại!', 'error');
                } else {
                    Swal.fire('Thành công', 'Đã gửi đơn thành công!', 'success');
                    setRequests([{
                        serviceId: '',
                        note: '',
                        name: '',
                        phone: '',
                        email: '',
                        birthday: '',
                    }]);
                }
            } else {
                const services = requests.map((request) => ({
                    residentId: residentId,
                    ...request, serviceId: serviceTypes
                }))
                const data = await addVehicle({services});
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
            {serviceTypes === themThanhVien &&
                (<>
                    <FormControl fullWidth margin="normal" sx={{ marginRight: '10px', width: '250px' }}>
                        <InputLabel id={`apartment-label`}>Căn hộ cần gửi đơn</InputLabel>
                        <Select
                            labelId={`apartment-label`}
                            value={apartment}
                            onChange={(e) => handleChangeApartment(e)}
                            required
                        >
                            {optionBuildings?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>)}
            <form onSubmit={handleSubmit}>
                {requests.map((request, index) => (
                    <Box key={index} sx={{ marginBottom: '20px' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
                            {serviceTypes === themThanhVien &&
                                (<>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Tên thành viên"
                                        type="text"
                                        value={request.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        required
                                        sx={{ marginRight: '10px', flex: '1 1 0' }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Số điện thoại"
                                        type="text"
                                        value={request.phone}
                                        onChange={(e) => handleChange(index, 'phone', e.target.value)}
                                        required
                                        sx={{ marginRight: '10px', flex: '1 1 0' }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="email"
                                        type="text"
                                        value={request.email}
                                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                                        required
                                        sx={{ marginRight: '10px', flex: '1 1 0' }}
                                    />
                                    <DatePicker
                                        fullWidth
                                        placeholder="Ngày sinh"
                                        value={request.birthday ? moment(request.birthday) : null}
                                        onChange={(date, dateString) => handleChange(index, 'birthday', dateString)}
                                        required
                                        style={{ width: '100%', marginRight: '10px', flex: '1 1 0' }}
                                    />
                                </>)
                            }

                            {serviceTypes !== themThanhVien && (<><FormControl fullWidth margin="normal" sx={{ marginRight: '10px', flex: '1 1 0' }}>
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
                                {serviceTypes === vehicleCode && <DatePicker
                                    fullWidth
                                    placeholder="Ngày gửi xe"
                                    value={request.startDate ? moment(request.startDate) : null}
                                    onChange={(date, dateString) => handleChange(index, 'startDate', dateString)}
                                    required
                                    style={{width: '100%', marginRight: '10px', flex: '1 1 0'}}
                                />}


                            </>)}

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
                            label="Ghi chú"
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

