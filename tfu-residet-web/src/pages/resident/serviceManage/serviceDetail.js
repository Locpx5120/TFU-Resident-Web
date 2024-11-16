import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Card,
    TablePagination,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import { useParams } from 'react-router-dom';
import TableCustom from '../../../components/Table';
import { detailApartment, getServices } from "../../../services/apartmentService";

const ServiceDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedService, setSelectedService] = useState({
        id: 0,
        name: 'initial',
    });
    const [typeData, setTypeData] = useState([]);
    const [roomsData, setRoomsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomDetails = await detailApartment({
                    apartmentId: id,
                    serviceType: selectedService.name === 'initial' ? "" : selectedService.name,
                });
                const serviceTypes = await getServices();

                setRoomsData(roomDetails?.data || []);
                setTypeData(serviceTypes?.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id, selectedService]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    const paginatedRows = useMemo(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return roomsData.data.slice(startIndex, endIndex);
    }, [page, rowsPerPage, roomsData]);

    return (
        <section className="content service">
            <Box>
                <Typography variant="h6">Chi tiết thanh toán dịch vụ phòng</Typography>
                <Select
                    value={selectedService.name}
                    onChange={handleServiceChange}
                    displayEmpty
                    sx={{ margin: "20px 0" }}
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
            </Box>
            <Card sx={{ maxHeight: "800px", marginTop: "30px" }}>
                <TableCustom
                    columns={columnData}
                    rows={paginatedRows}
                    onRowClick={() => {}}
                />
                <TablePagination
                    component="div"
                    count={roomsData?.data?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </section>
    );
}

const columnData = [
    { name: "Tên dịch vụ", align: "left", esName: "serviceName" },
    { name: "Ngày bắt đầu", align: "left", esName: "startDate" },
    { name: "Ngày kết thúc", align: "left", esName: "endDate" },
    { name: "Số lượng/m2", align: "left", esName: "quantityOrArea" },
    { name: "Mô tả", align: "left", esName: "description" },
    { name: "Giá tiền", align: "left", esName: "unitPrice" },
    { name: "Tổng tiền", align: "left", esName: "totalPrice" },
];

export default ServiceDetail;
