import React, { useEffect, useMemo, useState } from 'react';
import TableCustom from '../../../components/Table';
import { Button, Card, Box, TextField, MenuItem } from '@mui/material';
import CustomModal from '../../../common/CustomModal';
import { extendContract, getContracts } from '../../../services/thirdpartyService';
import { listAllPackage } from '../../../services/PackageService';
import { getServices } from '../../../services/apartmentService';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import moment from 'moment';
import { formatCurrency } from '../../../utils/calculatePrice';

const ThirdParty = () => {
    const thirdPartyId = Cookies.get('residentId')
    const [modalOpen, setModalOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [data, setData] = useState([]);
    const [packageArr, setPackagesArr] = useState([]);
    const [serviceNameArr, setServiceNameArr] = useState([]);
    const [selectedThirdParty, setSelectedThirdParty] = useState({});
    const [modalMode, setModalMode] = useState({ mode: 'add', title: 'Thêm hợp đồng' });

    const columnData = [
        { esName: 'buildingName', name: 'Tòa nhà', width: 150 },
        { esName: 'floorNumber', name: 'Tầng', width: 100 },
        { esName: 'roomNumber', name: 'Phòng', width: 100 },
        { esName: 'area', name: 'Diện tích mặt bằng (m2)', width: 200 },
        { esName: 'startDate', name: 'Ngày thuê', width: 150 },
        { esName: 'endDate', name: 'Ngày hết hạn', width: 150 },
        { esName: 'status', name: 'Trạng thái', width: 150 },
        { esName: 'price', name: 'Giá dịch vụ', width: 150 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await getContracts();
            const packages = await listAllPackage();
            const resServiceName = await getServices();
            setServiceNameArr(resServiceName.data);
            setPackagesArr(packages.data);
            setData(res?.data || []);
        };
        fetchData();
    }, [reload]);

    const rows = useMemo(() => {
        return data.map(item => ({
            ...item,
            startDate: moment(item.startDate).isValid() ? moment(item.startDate).format('YYYY-MM-DD') : null,
            endDate: moment(item.endDate).isValid() ? moment(item.endDate).format('YYYY-MM-DD') : null,
            price: formatCurrency(item.price),
        }));
    }, [data]);

    const optionServiceName = serviceNameArr?.filter(item => item.serviceName === 'Gia hạn hợp đồng').map((serviceName) => (
        {
            label: serviceName.serviceName,
            value: serviceName.id
        }
    ));

    const optionPackageName = packageArr?.map((pkg) => (
        {
            label: pkg.name,
            value: pkg.id
        }
    ));

    const modalFields = [
        <TextField
            fullWidth
            label="Tên dịch vụ"
            name="serviceId"
            value={selectedThirdParty.serviceId}
            onChange={(e) => handleFieldChange('serviceId', e.target.value)}
            select
        >
            {optionServiceName.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </TextField>,
        <TextField
            fullWidth
            select
            label="Gói"
            name="packageServiceId"
            value={selectedThirdParty.packageServiceId || ''}
            onChange={(e) => handleFieldChange('packageServiceId', e.target.value)}
        >
            {optionPackageName.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </TextField>,
        <TextField
            fullWidth
            label="Mục đích"
            name="purpose"
            multiline
            rows={4}
            value={selectedThirdParty.purpose || ''}
            onChange={(e) => handleFieldChange('purpose', e.target.value)}
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
        setSelectedThirdParty(prev => ({
            ...prev,
            nameService: 'Gia hạn hợp đồng'
        }));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveThirdParty = async (data) => {
        try {
            const res = await extendContract({
                ...data,
                apartmentId: data[0]?.apartmentId,
            });
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
        <section className="content">
            <Card sx={{ maxHeight: '700px' }}>
                <TableCustom
                    columns={columnData}
                    rows={rows}
                    onRowClick={(row) => {
                        setSelectedThirdParty(row);
                        handleOpenModal('update', 'Cập nhật hợp đồng bên thuê mặt bằng');
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        my: 4,
                        mx: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenModal('add', 'Gửi đơn cho phòng hành chính')}
                        sx={{ height: '40px' }}
                    >
                        Gia hạn hợp đồng
                    </Button>
                </Box>
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
