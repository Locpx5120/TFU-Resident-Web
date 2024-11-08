import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import QRCodeModal from '../../../common/ModalQRCode';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ServicePaymentsBill = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [reload, setReload] = useState(false);
    const [roomsData, setRoomsData] = useState([])

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const buildingID = Cookies.get("buildingID");
    const { id } = useParams();

    // useEffect(() => {
    //     const fetchRooms = async () => {
    //         try {
    //             const response = await fetch("https://localhost:7082/api/apartment-services/unpaid-details", {
    //                 method: 'POST',
    //                 headers: {
    //                     Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //                     'content-type': 'application/json',
    //                     'buildingPermalink': Cookies.get('buildingID'),
    //                 },
    //                 body: JSON.stringify({
    //                     apartmentId: id,
    //                     serviceType: "",                    
    //                 })
    //             });
    //             const data = await response.json();
    //             setRoomsData(data);
    //         } catch (error) {
    //             Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
    //         }
    //     }
    //     fetchRooms();
    // }, [])

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://localhost:7082/api/apartment-services/unpaid-details/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        'content-type': 'application/json',
                        'buildingPermalink': buildingID,
                    },
                    body: JSON.stringify({
                        serviceContractId: id,
                    })
                });
                const data = await response.json();
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
            <QRCodeModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
            {(Array.isArray(roomsData) ? roomsData : []).map((room, index) => (
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
                count={Array.isArray(roomsData) ? roomsData.length : 0}
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
