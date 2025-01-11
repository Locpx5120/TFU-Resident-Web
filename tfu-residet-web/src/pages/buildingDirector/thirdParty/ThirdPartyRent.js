import React, { useEffect, useState } from 'react';
import TableCustom from '../../../components/Table';
import { Button, Card, Box, TextField, MenuItem } from '@mui/material';
import CustomModal from '../../../common/CustomModal';
import { createThirdParty, getThirdList } from '../../../services/thirdpartyService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getBuildingNew } from '../../../services/apartmentService';

const ThirdPartyRent = () => {
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [selectedThirdParty, setSelectedThirdParty] = useState({});
    const [modalMode, setModalMode] = useState({ mode: 'add', title: 'Thêm hợp đồng' });
    
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const columnData = [
        // { esName: 'buildingName', name: 'Tòa nhà', width: 150 },
        { esName: 'companyName', name: 'Tên công ty', width: 200 },
        { esName: 'contactInfo', name: 'Thông tin liên hệ', width: 200 },
        { esName: 'storeType', name: 'Loại cửa hàng', width: 200 },
        // { esName: 'startDate', name: 'Ngày thuê', width: 150 },
        // { esName: 'endDate', name: 'Ngày hết hạn', width: 150 },
        { esName: 'status', name: 'Trạng thái', width: 150 },
        { esName: 'action', name: 'Tùy chọn', width: 150 },
    ];

    const fetchData = async (keyword = '', status = '') => {
        try {
            const res = await getThirdList(keyword, status);
            const building = await getBuildingNew();
            setData(res.data);
            setBuildings(building.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reload]);

    const handleViewContract = (item) => {
        navigate('/ben-thu-ba/cho-thue/'+ item.thirdPartyId);
    };

    const rows = data.map((item) => ({
        ...item,
        action: (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewContract(item)}
            >
                Xem chi tiết HĐ
            </Button>
        ),
    }));

    const modalFields = [
        // <TextField
        //     fullWidth
        //     select
        //     label="Tòa nhà"
        //     name="building"
        //     value={selectedThirdParty.building || ''}
        //     onChange={(e) => handleFieldChange('building', e.target.value)}
        // >
        //     {buildings.map((building) => (
        //         <MenuItem key={building.id} value={building.id}>
        //             {building.buildingName}
        //         </MenuItem>
        //     ))}
        // </TextField>,
        <TextField
            fullWidth
            label="Tên công ty"
            name="companyName"
            value={selectedThirdParty.companyName || ''}
            onChange={(e) => handleFieldChange('companyName', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Thông tin liên hệ (Email)"
            name="contactInfo"
            type="email"
            value={selectedThirdParty.contactInfo || ''}
            onChange={(e) => handleFieldChange('contactInfo', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Loại cửa hàng"
            name="storeType"
            value={selectedThirdParty.storeType || ''}
            onChange={(e) => handleFieldChange('storeType', e.target.value)}
        />
    ];    

    const handleFieldChange = (fieldName, value) => {
        setSelectedThirdParty((prev) => {
            const newState = { ...prev, [fieldName]: value };
            console.log("Updated State:", newState);
            return newState;
        });
    };

    const handleOpenModal = (mode, title, thirdParty = {}) => {
        setModalMode({ mode, title });
        setSelectedThirdParty(thirdParty);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveThirdParty = async (data) => {
        try {
            const res = await createThirdParty(data);
            if (res?.success) {
                setReload(!reload);
                handleCloseModal();
                Swal.fire('Thành công', res.message, 'success');
            } else {
                Swal.fire('Thất bại', res?.message, 'error');
            }
        } catch (err) {
            Swal.fire('Thất bại', 'Email đã tồn tại', 'error');
        }
    };

    return (
        <section>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <TextField
                    label="Tìm kiếm tên công ty"
                    variant="outlined"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                
                <TextField
                    select
                    label="Trạng thái"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="true">Đang hoạt động</MenuItem>
                    <MenuItem value="false">Không hoạt động</MenuItem>
                </TextField>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchData(searchKeyword, selectedStatus)}
                >
                    Tìm kiếm
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setSearchKeyword('');
                        setSelectedStatus('');
                        fetchData();
                    }}
                >
                    Reset
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenModal('add', 'Thêm bên thuê mặt bằng')}
                    sx={{ height: '40px' }}
                >
                    Thêm bên thuê mặt bằng
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

export default ThirdPartyRent;
