import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from '@mui/material';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import QRCodeModal from '../../../common/ModalQRCode';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getDetailServiceUnpaids } from '../../../services/apartmentService';

const ServicePaymentsBill = () => {
    const { id } = useParams();
    const ids = id.split('&');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [payments, setPayments] = useState({
        services: [],
        totalAmount: 0,
    });

    const openModal = () => {
        if(payments?.services?.length < 1) {
            Swal.fire('Thông báo', 'Không có dịch vụ để thanh toán', 'info');
            return;
        }
        setModalIsOpen(true)
    };
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const responses = await Promise.all(
                    ids.map((id) =>
                        getDetailServiceUnpaids({
                            apartmentId: id,
                            ServiceType: '',
                        })
                    )
                );

                const combinedPayments = responses.reduce((acc, response) => {
                    if (response?.services) {
                        acc.push(...response.services);
                    }
                    return acc;
                }, []);

                const totalAmount = responses.reduce((sum, response) => {
                    return sum + (response?.totalAmount || 0);
                }, 0);

                setPayments({
                    services: combinedPayments,
                    totalAmount,
                });
            } catch (error) {
                Swal.fire('Thất bại', 'Lấy dữ liệu thất bại!', 'error');
            }
        };

        fetchRooms();
    }, [id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const transferData = {
        data: payments?.services,
        bankAccountName: "Nguyễn Văn A",
        bankAccountNumber: "14124565754534",
        bankName: "TP Bank",
        amount: payments?.totalAmount,
        transactionContent: "Thanh toán dịch vụ",
    };

    const paginatedServices = payments?.services.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box className="content">
            <QRCodeModal isOpen={modalIsOpen} onRequestClose={closeModal} transferData={transferData} />
            <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
            <Card sx={{ margin: '20px 0', padding: '20px' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Phòng</TableCell>
                                <TableCell>Tên dịch vụ</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Đơn giá</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedServices.map((service, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{service.roomNumber || 'Không xác định'}</TableCell>
                                    <TableCell>{service.serviceName}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>{service.quantityOrArea}</TableCell>
                                    <TableCell>
                                        {service.unitPrice?.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {service.totalPrice?.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <strong>Tổng cộng:</strong>
                                </TableCell>
                                <TableCell>
                                    {payments?.totalAmount?.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <TablePagination
                component="div"
                count={payments?.services.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
            <Button variant="primary" onClick={openModal}>
                Thanh toán QR code
            </Button>
        </Box>
    );
};

export default ServicePaymentsBill;
