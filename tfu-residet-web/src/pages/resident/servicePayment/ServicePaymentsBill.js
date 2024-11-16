import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import QRCodeModal from '../../../common/ModalQRCode';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getDetailServiceUnpaids } from '../../../services/apartmentService';

const ServicePaymentsBill = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [payments, setPayments] = useState([]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const buildingID = Cookies.get("buildingID");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getDetailServiceUnpaids({
                    ServiceType: '',                   
                    });
                    setPayments(response);
            } catch (error) {
                Swal.fire('Thất bại', 'Lấy dữ liệu thất bại!', 'error');
            }
        }
        fetchRooms();
    }, [buildingID]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const transferData = {
        data: payments,
        bankAccountName: "Nguyễn Văn A",
        bankAccountNumber: "14124565754534",
        bankName: "TP Bank",
        amount: payments?.totalAmount || 0,
        transactionContent: "Thanh toán dịch vụ"
    };

    return (
        <Box className="content">
            <QRCodeModal isOpen={modalIsOpen} onRequestClose={closeModal} transferData={transferData} />
            <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
            {(Array.isArray(payments?.services) ? payments?.services : []).map((room, index) => (
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
                                        {payments?.totalAmount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            ))}
            <TablePagination
                component="div"
                count={Array.isArray(payments?.services) ? payments?.services.length : 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
            <Button variant="primary" onClick={openModal}>Thanh toán QR code</Button>
        </Box>
    );
};

export default ServicePaymentsBill;
