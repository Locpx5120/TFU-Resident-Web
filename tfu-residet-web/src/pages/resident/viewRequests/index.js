import React, {useEffect, useState} from 'react';
import {Card, TablePagination, Typography, Button, MenuItem, Box, Select} from '@mui/material';
import TableCustom from '../../../components/Table';
import {useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import {getDetailVehicle} from "../../../services/vehicleService";
import {getBuilding} from '../../../services/residentService';
import dayjs from "dayjs";
import {Calendar} from "primereact/calendar";
import {getServices} from "../../../services/apartmentService";

const ViewRequests = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [requests, setRequests] = useState([]);
    const residentId = Cookies.get("residentId");
    const buildingID = Cookies.get("buildingID");
    const [selectedService, setSelectedService] = useState({
        id: 0,
        name: 'initial'
    });
    const [dates, setDates] = useState([]);
    const [typeData, setTypeData] = useState([]);

    const handleDateChange = (e) => {
        console.log(e)
        setSelectedService((prev) => ({
            ...prev,
            startDateFrom: e[0],
            startDateTo: e[1] || e[0]
        }));
    }
    const handleServiceChange = (event) => {
        setSelectedService((prev) => ({
            ...prev,
            name: event.target.value,
        }));
        setPage(0);
    };
    const handleServiceSelect = (service) => {
        setSelectedService((prev) => ({
            ...prev,
            id: service.id,
        }));
    };
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getBuilding(residentId, buildingID);
                const apartmentIds = data?.data || [];

                const responses = await Promise.all(
                    apartmentIds.map(item => getDetailVehicle(item.apartmentId))
                );
                const allItems = responses
                    .flatMap(response => response?.data || []).map((items) => {
                        return items = {
                            ...items,
                            createdDate: dayjs(items.createdDate).format('DD/MM/YYYY'),
                            processedDate: items.processedDate ? dayjs(items.processedDate).format('DD/MM/YYYY') : items.processedDate
                        }
                    });
                const serviceTypes = await getServices();
                setTypeData(serviceTypes?.data || []);

                setRequests(allItems);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();
    }, [residentId, buildingID]);
    const resetForm = () => {
        setDates([]);
        setSelectedService({
            id: 0,
            name: 'initial'
        })
    }
    const columns = [
        // { esName: 'apartment', name: 'Tên căn hộ' },
        {esName: 'building', name: 'Tòa nhà'},
        {esName: 'serviceName', name: 'Tên dịch vụ'},
        {esName: 'createdDate', name: 'Ngày tạo'},
        {esName: 'processedDate', name: 'Ngày xử lý'},
        // { esName: 'note', name: 'Ghi chú' },
        // { esName: 'purpose', name: 'Mục đích' },
        // { esName: 'quantityOrArea', name: 'Số lượng/Diện tích' },
        {esName: 'status', name: 'Trạng thái'},
        // { esName: 'unitPrice', name: 'Đơn giá' },
        {esName: 'details', name: 'Chi tiết'},
    ];

    const paginatedRows = requests && requests.length > 0 ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => ({
        ...request,
        details: (
            <Button variant="outlined"
                    onClick={() => navigate(`/xem-chi-tiet-don/${request.serviceContractId}&purpose=${request.purpose}`, {state: {request}})}>
                Xem
            </Button>
        ),
    })) : [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card className='content' sx={{maxHeight: "800px", marginTop: "30px"}}>
            <Box>
                <Typography variant="h6">Danh sách yêu cầu</Typography>
                <Select
                    value={selectedService.name}
                    onChange={handleServiceChange}
                    displayEmpty
                    name="id"
                    sx={{margin: "20px 10px 10px"}}
                >
                    <MenuItem value="initial">Tất cả dịch vụ</MenuItem>
                    {typeData.map((service) => (
                        <MenuItem
                            key={service.id}
                            value={service.serviceName}
                            onClick={() => handleServiceSelect(service)}
                        >
                            {service.serviceName}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={selectedService.name}
                    onChange={handleServiceChange}
                    displayEmpty
                    name="id"
                    sx={{margin: "20px 10px 10px"}}
                >
                    <MenuItem value="initial">Tất cả toà nhà</MenuItem>
                    {typeData.map((service) => (
                        <MenuItem
                            key={service.id}
                            value={service.serviceName}
                            onClick={() => handleServiceSelect(service)}
                        >
                            {service.serviceName}
                        </MenuItem>
                    ))}
                </Select>
                <Calendar value={dates} onChange={(e) => {
                    setDates(e.value);
                    handleDateChange(e.value)
                }} selectionMode="range" readOnlyInput
                          hideOnRangeSelection placeholder="Chọn khoảng thời gian" dateFormat="dd/mm/yy"
                />
                <Select
                    value={selectedService.name}
                    onChange={handleServiceChange}
                    displayEmpty
                    name="id"
                    sx={{margin: "20px 10px 10px"}}
                >
                    <MenuItem value="initial">Tất cả trạng thái</MenuItem>
                    {typeData.map((service) => (
                        <MenuItem
                            key={service.id}
                            value={service.serviceName}
                            onClick={() => handleServiceSelect(service)}
                        >
                            {service.serviceName}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="outlined" className="ml-2"
                        color="primary" size="large" onClick={resetForm}>Reset</Button>
            </Box>

            <Typography variant="h5" sx={{padding: '16px'}}>
                Xem Đơn
            </Typography>
            <TableCustom
                columns={columns}
                rows={paginatedRows}
            />
            <TablePagination
                component="div"
                count={requests.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default ViewRequests;
