import React, { useEffect, useMemo, useState } from 'react';
import TableCustom from '../../../components/Table';
import { Button, Card, Box, TextField, MenuItem } from '@mui/material';
import CustomModal from '../../../common/CustomModal';
import { getThirdList } from '../../../services/thirdpartyService';

const ThirdParty = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [selectedThirdParty, setSelectedThirdParty] = useState({});
    const [modalMode, setModalMode] = useState({ mode: 'add', title: 'Thêm hợp đồng' });

    const columnData = [
        { esName: 'buildingName', name: 'Tòa nhà', width: 150 },
        { esName: 'companyName', name: 'Tên công ty', width: 200 },
        { esName: 'floor', name: 'Tầng', width: 100 },
        { esName: 'room', name: 'Phòng', width: 100 },
        { esName: 'area', name: 'Diện tích mặt bằng (m2)', width: 200 },
        { esName: 'startDate', name: 'Ngày thuê', width: 150 },
        { esName: 'endDate', name: 'Ngày hết hạn', width: 150 },
        { esName: 'servicePrice', name: 'Giá dịch vụ', width: 150 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await getThirdList();
            setData(res.data);
        }
        fetchData();
    }, []);

    const rows = useMemo(() => data, [data]);

    const modalFields = [
        <TextField
            fullWidth
            select
            label="Tòa nhà"
            name="building"
            value={selectedThirdParty.building || ''}
            onChange={(e) => handleFieldChange('building', e.target.value)}
        >
            {['Tòa A', 'Tòa B', 'Tòa C'].map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>,
        <TextField
            fullWidth
            label="Diện tích (m2)"
            name="area"
            type="number"
            value={selectedThirdParty.area || ''}
            onChange={(e) => handleFieldChange('area', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Số tầng"
            name="floor"
            type="number"
            value={selectedThirdParty.floor || ''}
            onChange={(e) => handleFieldChange('floor', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Số phòng"
            name="room"
            type="number"
            value={selectedThirdParty.room || ''}
            onChange={(e) => handleFieldChange('room', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Ngày bắt đầu thuê"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedThirdParty.startDate || ''}
            onChange={(e) => handleFieldChange('startDate', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Ngày hết hạn thuê"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedThirdParty.endDate || ''}
            onChange={(e) => handleFieldChange('endDate', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Số tiền"
            name="servicePrice"
            type="number"
            value={selectedThirdParty.servicePrice || ''}
            onChange={(e) => handleFieldChange('servicePrice', e.target.value)}
        />,
    ];

    const handleFieldChange = (fieldName, value) => {
        setSelectedThirdParty((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleOpenModal = (mode, title) => {
        setModalMode({ mode, title });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedThirdParty({});
    };

    const handleSaveThirdParty = () => {
        handleCloseModal();
    };

    return (
        <section className="content">
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    mb: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenModal('add', 'Thêm hợp đồng bên thuê mặt bằng')}
                    sx={{ height: '40px' }}
                >
                    Thêm hợp đồng bên thuê mặt bằng
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenModal('update', 'Cập nhật hợp đồng bên thuê mặt bằng')}
                    sx={{ height: '40px' }}
                >
                    Cập nhật hợp đồng bên thuê mặt bằng
                </Button>
            </Box>
            <Card sx={{ maxHeight: '700px' }}>
                <TableCustom
                    columns={columnData}
                    rows={rows}
                    onRowClick={(row) => {
                        setSelectedThirdParty(row);
                        handleOpenModal('update', 'Cập nhật hợp đồng bên thuê mặt bằng');
                    }}
                />
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

export default ThirdParty;
