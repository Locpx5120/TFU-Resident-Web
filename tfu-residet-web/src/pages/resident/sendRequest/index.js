import React, { useState } from 'react';
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

const SendRequest = () => {
    const [requests, setRequests] = useState([{
        serviceType: '',
        vehicleType: '',
        plateNumber: '',
        packageDuration: '',
        reason: ''
    }]);

    const [serviceTypes, setServiceTypes] = useState('');

    const handleChange = (index, field, value) => {
        const newRequests = [...requests];
        newRequests[index][field] = value;
        setRequests(newRequests);
    };

    const handleAddRequest = () => {
        setRequests([...requests, {
            serviceType: '',
            vehicleType: '',
            plateNumber: '',
            packageDuration: '',
            reason: ''
        }]);
    };

    const handleRemoveRequest = (index) => {
        const newRequests = requests.filter((_, i) => i !== index);
        setRequests(newRequests);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(requests);
        setRequests([{
            serviceType: '',
            vehicleType: '',
            plateNumber: '',
            packageDuration: '',
            reason: ''
        }]);
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
                    <MenuItem value="">Dịch vụ gửi xe</MenuItem>
                    <MenuItem value="add agent">Thêm thành viên căn hộ</MenuItem>
                    <MenuItem value="report fixed">Báo cáo sửa chữa</MenuItem>
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
                                    value={request.serviceType}
                                    onChange={(e) => handleChange(index, 'serviceType', e.target.value)}
                                    required
                                >
                                    <MenuItem value="">Chọn dịch vụ</MenuItem>
                                    <MenuItem value="gửi xe ô tô">Gửi xe ô tô</MenuItem>
                                    <MenuItem value="gửi xe máy">Gửi xe máy</MenuItem>
                                    <MenuItem value="gửi xe đạp">Gửi xe đạp</MenuItem>
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
                                value={request.plateNumber}
                                onChange={(e) => handleChange(index, 'plateNumber', e.target.value)}
                                required
                                sx={{ marginRight: '10px', flex: '1 1 0' }}
                            />

                            <FormControl fullWidth margin="normal" sx={{ marginRight: '10px', flex: '1 1 0' }}>
                                <InputLabel id={`package-duration-label-${index}`}>Gói</InputLabel>
                                <Select
                                    labelId={`package-duration-label-${index}`}
                                    value={request.packageDuration}
                                    onChange={(e) => handleChange(index, 'packageDuration', e.target.value)}
                                    required
                                >
                                    <MenuItem value="1 tháng">1 tháng</MenuItem>
                                    <MenuItem value="6 tháng">6 tháng</MenuItem>
                                    <MenuItem value="12 tháng">12 tháng</MenuItem>
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
                            value={request.reason}
                            onChange={(e) => handleChange(index, 'reason', e.target.value)}
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

