import React, { useState, useMemo } from 'react';
import {
    Box,
    Card,
    TablePagination,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import TableCustom from '../../../components/Table';
import { useParams } from 'react-router-dom';

const ServicePaymentsDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedService, setSelectedService] = useState('initial');

    const buildings = [
        { tenDichVu: "Gửi xe ô tô", moTa: "Bắt động gửi xe ô tô", soLuong: "x2", giaTien: "1.500.000 VNĐ", tongTien: "3.000.000 VNĐ" },
        { tenDichVu: "Gửi xe máy", moTa: "Bắt động gửi xe máy", soLuong: "x3", giaTien: "500.000 VNĐ", tongTien: "1.500.000 VNĐ" },
    ];

    const serviceAData = [
        { tenDichVu: "Gửi xe ô tô", moTa: "Bắt động gửi xe ô tô", soLuong: "x2", giaTien: "1.500.000 VNĐ", tongTien: "3.000.000 VNĐ" },
    ];

    const serviceBData = [
        { tenDichVu: "Dịch vụ B", moTa: "Mô tả dịch vụ B", soLuong: "x1", giaTien: "2.000.000 VNĐ", tongTien: "2.000.000 VNĐ" },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
        setPage(0);
    };

    const paginatedRows = useMemo(() => {
        const startIndex = page * rowsPerPage;
        let dataToDisplay;

        if (selectedService === 'initial') {
            dataToDisplay = buildings;
        } else if (selectedService === 'A') {
            dataToDisplay = serviceAData;
        } else if (selectedService === 'B') {
            dataToDisplay = serviceBData;
        }

        return dataToDisplay.slice(startIndex, startIndex + rowsPerPage);
    }, [page, rowsPerPage, selectedService, buildings, serviceAData, serviceBData]);

    return (
        <section className="content service">
            <Box>
                <Typography variant="h6">Chi tiết thanh toán dịch vụ phòng {id}</Typography>
                <Select
                    value={selectedService}
                    onChange={handleServiceChange}
                    displayEmpty
                    sx={{ margin: "20px 0" }}
                >
                    <MenuItem value="initial">Bảng dịch vụ</MenuItem>
                    <MenuItem value="A">Gửi xe A</MenuItem>
                    <MenuItem value="B">Dịch vụ B</MenuItem>
                </Select>
            </Box>
            <Card sx={{ maxHeight: "800px", marginTop: "30px" }}>
                <TableCustom
                    columns={columnData}
                    rows={paginatedRows}
                />
                <TablePagination
                    component="div"
                    count={selectedService === 'initial' ? buildings.length : selectedService === 'A' ? serviceAData.length : serviceBData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </section>
    );
};

const columnData = [
    { name: "Tên dịch vụ", align: "left", esName: "tenDichVu" },
    { name: "Mô tả", align: "left", esName: "moTa" },
    { name: "Số lượng/m2", align: "left", esName: "soLuong" },
    { name: "Giá tiền", align: "left", esName: "giaTien" },
    { name: "Tổng tiền", align: "left", esName: "tongTien" },
];

export default ServicePaymentsDetail;
