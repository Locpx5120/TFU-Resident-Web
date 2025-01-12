import React, { useEffect, useState } from 'react';
import TableCustom from '../../../components/Table';
import { Button, Card, Box, TextField, MenuItem } from '@mui/material';
import CustomModal from '../../../common/CustomModal';
import { addHireThirdParty, getThirdList } from '../../../services/thirdpartyService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import { getBuildingNew } from '../../../services/apartmentService';

const ThirdPartyLent = () => {
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
            const res = await getThirdList(keyword, status, false);
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
        navigate('/ben-thu-ba/thue-dich-vu/'+ item.thirdPartyId);
    };

    const handleDeleteContract = (item) => {
        alert('Chưa có api');
    }

    const rows = data.map((item) => ({
        ...item,
        startDate: item.startDate ? item.startDate : 'Chưa có chi tiết HĐ',
        endDate: item.endDate ? item.endDate : 'Chưa có chi tiết HĐ',
        action: (
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewContract(item)}
                >
                    Xem chi tiết HĐ
                </Button>
                <DeleteOutline  onClick={() => handleDeleteContract(item)} />
            </div>
        ),
    }));

    const modalFields = [
        <TextField
            fullWidth
            label="Tên công ty"
            name="NameCompany"
            value={selectedThirdParty.NameCompany || ''}
            onChange={(e) => handleFieldChange('NameCompany', e.target.value)}
        />,
        <TextField
            fullWidth
            label="Thông tin liên hệ (Email)"
            name="contactInfo"
            type="email"
            value={selectedThirdParty.contactInfo || ''}
            onChange={(e) => handleFieldChange('contactInfo', e.target.value)}
        />,
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
            const res = await addHireThirdParty(data);
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
                    <MenuItem value="Trong thời hạn">Trong thời hạn</MenuItem>
                    <MenuItem value="Chuẩn bị hết hạn">Chuẩn bị hết hạn</MenuItem>
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
                    Đặt lại
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenModal('add', 'Thêm dịch bên thuê dịch vụ')}
                    sx={{ height: '40px' }}
                >
                    Thêm dịch vụ bên thuê dịch vụ
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

export default ThirdPartyLent;
