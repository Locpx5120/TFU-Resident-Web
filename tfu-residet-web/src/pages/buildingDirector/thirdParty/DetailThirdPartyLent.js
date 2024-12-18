import React, { useEffect, useMemo, useState } from 'react';
import TableCustom from '../../../components/Table';
import { Button, Card, Box, TextField, MenuItem } from '@mui/material';
import CustomModal from '../../../common/CustomModal';
import { addContractHire, addContractThird, getContractDetail } from '../../../services/thirdpartyService';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getBuildingNew } from '../../../services/apartmentService';

const DetailThirdPartyLent = () => {
    const { id } = useParams();
    const [reload, setReload] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [buildings, setBuildings] = useState([]);
    const [data, setData] = useState([]);
    const [selectedThirdParty, setSelectedThirdParty] = useState({});
    const [modalMode, setModalMode] = useState({ mode: 'add', title: 'Thêm hợp đồng' });

    const columnData = [
        { esName: 'companyName', name: 'Tên công ty', width: 200 },
        { esName: 'nameService', name: 'Tên dịch vụ', width: 200 },
        // { esName: 'floor', name: 'Tầng', width: 100 },
        // { esName: 'room', name: 'Phòng', width: 100 },
        // { esName: 'area', name: 'Diện tích mặt bằng (m2)', width: 200 },
        { esName: 'startDate', name: 'Ngày thuê', width: 150 },
        { esName: 'endDate', name: 'Ngày hết hạn', width: 150 },
        { esName: 'servicePrice', name: 'Giá dịch vụ', width: 150 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await getContractDetail(id);
            const building = await getBuildingNew();
            setData(res?.data || []);
            setBuildings(building?.data || []);
        }
        fetchData();
    }, [reload]);

    const rows = useMemo(() => {
        return data.map(item => ({
            ...item,
            startDate: item.startDate ? item.startDate : 'Không có',
            endDate: item.endDate ? item.endDate : 'Không có',
        }))
    }, [data]);

    const formatNumberWithCommas = (value) => {
        if (!value) return '';
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleFieldChange = (fieldName, value) => {
        if (fieldName === 'price') {
            const numericValue = value.replace(/[^\d]/g, '');
            const formattedValue = formatNumberWithCommas(numericValue);
            setSelectedThirdParty((prev) => ({
                ...prev,
                [fieldName]: formattedValue,
            }));
        } else {
            setSelectedThirdParty((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        }
    };

    const modalFields = [
        <TextField
            fullWidth
            select
            label="Tòa nhà"
            name="BuildId"
            value={selectedThirdParty.building || ''}
            onChange={(e) => handleFieldChange('building', e.target.value)}
        >
            {buildings.map((building) => (
                <MenuItem key={building.id} value={building.id}>
                    {building.buildingName}
                </MenuItem>
            ))}
        </TextField>,
        <TextField
            fullWidth
            label="Tên dịch vụ"
            name="nameService"
            type="text"
            value={selectedThirdParty.nameService || ''}
            onChange={(e) => handleFieldChange('nameService', e.target.value)}
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
            name="price"
            type="text"
            value={formatNumberWithCommas(selectedThirdParty.price)}
            onChange={(e) => handleFieldChange('price', e.target.value)}
        />,
    ];

    const handleOpenModal = (mode, title) => {
        setModalMode({ mode, title });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveThirdParty = async (data) => {
        try {
            const res = await addContractHire({
                ...data,
                price: Number(data?.price || 0),
                thirdPartyId: id
            });
            if (res?.success) {
                setReload(!reload);
                handleCloseModal();
                Swal.fire('Thành công', res.message, 'success');
            } else {
                Swal.fire('Thất bại', res?.message, 'error');
            }
        } catch (err) {
            Swal.fire('Thất bại', 'Không thành công', 'error');
        }
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
                    onClick={() => handleOpenModal('add', 'Thêm hợp đồng thuê dịch vụ')}
                    sx={{ height: '40px' }}
                >
                    Thêm hợp đồng thuê dịch vụ
                </Button>
            </Box>
            <Card sx={{ maxHeight: '700px' }}>
                <TableCustom
                    columns={columnData}
                    rows={rows}
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

export default DetailThirdPartyLent;
