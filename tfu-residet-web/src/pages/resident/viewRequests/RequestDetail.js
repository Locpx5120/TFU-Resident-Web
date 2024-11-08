import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const RequestDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { request } = location.state || {};

    const [serviceName, setServiceName] = useState(request?.serviceName || '');
    const [quantity, setQuantity] = useState('1');
    const [room] = useState(request?.room || '');
    const [status, setStatus] = useState(request?.status || '');
    const [purpose, setPurpose] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            serviceName,
            quantity,
            room,
            status,
            purpose,
            notes,
        });
        navigate('/xem-don');
    };

    return (
        <Box className="content" sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Chi tiết Đơn
            </Typography>
            <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: '1 1 50%', padding: '10px' }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên dịch vụ"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Số lượng"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phòng"
                        value={room}
                        disabled
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Trạng thái</InputLabel>
                        <Select
                            labelId="status-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                            <MenuItem value="Chấp nhận">Chấp nhận</MenuItem>
                            <MenuItem value="Từ chối">Từ chối</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ flex: '1 1 50%', padding: '10px' }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mục đích"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Chú thích"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </Box>
                </Box>

                <Box sx={{ textAlign: 'right', marginTop: '20px', width: '100%' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Lưu
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/xem-don')} sx={{ marginLeft: '10px' }}>
                        Đóng
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default RequestDetail;
