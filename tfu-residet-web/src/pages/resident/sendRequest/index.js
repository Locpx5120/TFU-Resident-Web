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
    const [serviceType, setServiceType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [packageType, setPackageType] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý gửi đơn ở đây
        console.log({
            serviceType,
            quantity,
            packageType,
            reason,
        });
        // Reset form
        setServiceType('');
        setQuantity('');
        setPackageType('');
        setReason('');
    };

    return (
        <Box sx={{ padding: '20px' }} className="content">
            <Typography variant="h5" gutterBottom>
                Gửi đơn cho phòng hành chính
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="service-type-label">Tên dịch vụ</InputLabel>
                    <Select
                        labelId="service-type-label"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        required
                    >
                        <MenuItem value="gửi xe ô tô">Gửi xe ô tô</MenuItem>
                        <MenuItem value="gửi xe máy">Gửi xe máy</MenuItem>
                        <MenuItem value="gửi xe đạp">Gửi xe đạp</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField
                    fullWidth
                    margin="normal"
                    label="Số lượng"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="package-type-label">Gói</InputLabel>
                    <Select
                        labelId="package-type-label"
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                        required
                    >
                        <MenuItem value="1 tháng">1 tháng</MenuItem>
                        <MenuItem value="6 tháng">6 tháng</MenuItem>
                        <MenuItem value="12 tháng">12 tháng</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Lý do"
                    multiline
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                />

                <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Gửi đơn
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default SendRequest;
