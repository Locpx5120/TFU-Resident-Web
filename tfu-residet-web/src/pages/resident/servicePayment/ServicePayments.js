import React, { useState } from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Button } from 'react-bootstrap';
import QRCodeModal from '../../../common/ModalQRCode';

const ServicePaymentsBill = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const roomsData = [
        {
            roomNumber: '101',
            services: [
                { tenDichVu: "Gửi xe ô tô", tongTien: "3.000.000 VNĐ" },
                { tenDichVu: "Gửi xe máy", tongTien: "1.500.000 VNĐ" },
            ],
        },
        {
            roomNumber: '102',
            services: [
                { tenDichVu: "Dịch vụ B", tongTien: "2.000.000 VNĐ" },
                { tenDichVu: "Dịch vụ A", tongTien: "1.000.000 VNĐ" },
            ],
        },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box className="content">
            <QRCodeModal isOpen={modalIsOpen} onRequestClose={closeModal} />
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
            <Button variant="primary" onClick={openModal}>Thanh toán QR code</Button>
        </Box>
    );
};

export default ServicePaymentsBill;
