import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    Card,
    TablePagination,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import Cookies from 'js-cookie';
import TableCustom from '../../../components/Table';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ServiceDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedService, setSelectedService] = useState('initial');
    const [payments, setPayments] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const buildingID = Cookies.get("buildingID");

    const serviceAData = [
        { tenDichVu: "Gửi xe ô tô", moTa: "Bắt động gửi xe ô tô", soLuong: "x2", giaTien: "1.500.000 VNĐ", tongTien: "3.000.000 VNĐ" },
    ];

    const serviceBData = [
        { tenDichVu: "Dịch vụ B", moTa: "Mô tả dịch vụ B", soLuong: "x1", giaTien: "2.000.000 VNĐ", tongTien: "2.000.000 VNĐ" },
    ];

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("https://localhost:7082/api/apartment-services/details", {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    'content-type': 'application/json',
                    'buildingPermalink': Cookies.get('buildingID'),
                  },
                  body: JSON.stringify({
                    apartmentId: id,
                    serviceType: "",
                  })
                });
                const data = await response.json();
                setRoomsData(data);
              } catch (error) {
                Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
              }
        }
        fetchRooms();
    }, [])

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
        let dataToDisplay;

        if (selectedService === 'initial') {
            dataToDisplay = roomsData.data;
        } else if (selectedService === 'A') {
            dataToDisplay = serviceAData;
        } else if (selectedService === 'B') {
            dataToDisplay = serviceBData;
        }

        return dataToDisplay;
    }, [page, rowsPerPage, selectedService, roomsData, serviceAData, serviceBData]);

    return (
        <section className="content service">
            <Box>
                <Typography variant="h6">Chi tiết thanh toán dịch vụ phòng</Typography>
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
                    onRowClick={() => {}}
                />
                <TablePagination
                    component="div"
                    count={paginatedRows?.length}
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
