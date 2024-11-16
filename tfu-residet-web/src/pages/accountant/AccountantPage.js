import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import {listApartment} from "../../services/apartmentService";

const AccountantPage = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [reload, setReload] = useState(false);
    const [roomsData, setRoomsData] = useState([])

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const buildingID = Cookies.get("buildingID");

    useEffect(() => {
        const fetchRooms = async () => {
            const res = await listApartment(buildingID);
        }
        fetchRooms();
    }, [])

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await listApartment(buildingID);
                setPayments(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchPayments();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box className="content">
            <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
            {roomsData.map((room, index) => (
                <Card key={index} sx={{ margin: '20px 0', padding: '20px' }}>
                    <Typography variant="h6">Phòng: {room.roomNumber}</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên dịch vụ</TableCell>
                                    <TableCell>Tổng tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {room.services.map((service, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{service.tenDichVu}</TableCell>
                                        <TableCell>{service.tongTien}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell><strong>Tổng cộng:</strong></TableCell>
                                    <TableCell>
                                        {room.services.reduce((total, service) => {
                                            return total + parseInt(service.tongTien.replace(/\D/g, ''));
                                        }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            ))}
            <TablePagination
                component="div"
                count={roomsData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Box>
    );
};

export default AccountantPage