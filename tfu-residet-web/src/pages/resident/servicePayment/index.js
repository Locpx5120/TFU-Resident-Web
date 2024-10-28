import React, { useState, useMemo } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Checkbox,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServicePayments = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [services, setServices] = useState([
        { id: 1, roomNumber: '101', totalService: '1.500.000 VNĐ', month: '06/2024', status: 'Đã thanh toán' },
        { id: 2, roomNumber: '102', totalService: '2.000.000 VNĐ', month: '06/2024', status: 'Chưa thanh toán' },
        { id: 3, roomNumber: '103', totalService: '1.800.000 VNĐ', month: '06/2024', status: 'Đã thanh toán' },
        { id: 4, roomNumber: '104', totalService: '1.200.000 VNĐ', month: '06/2024', status: 'Chưa thanh toán' },
        { id: 5, roomNumber: '105', totalService: '2.500.000 VNĐ', month: '06/2024', status: 'Đã thanh toán' },
    ]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = services.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelect = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const paginatedRows = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return services.slice(startIndex, startIndex + rowsPerPage);
    }, [page, rowsPerPage, services]);

    const handleDetailClick = (id) => {
        navigate(`/thanh-toan-dich-vu/${id}`);
    };
    return (
        <Box className="content">
            <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                            <TableCell>STT</TableCell>
                        <TableCell align='left'>
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < services.length}
                                checked={services.length > 0 && selected.length === services.length}
                                onChange={handleSelectAll}
                            /> Tất cả
                        </TableCell>
                        <TableCell>Số phòng</TableCell>
                        <TableCell>Tổng dịch vụ</TableCell>
                        <TableCell>Tháng</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Xem chi tiết</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((service, index) => (
                        <TableRow key={service.id}>
                            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={selected.indexOf(service.id) !== -1}
                                    onChange={() => handleSelect(service.id)}
                                />
                            </TableCell>
                            <TableCell>{service.roomNumber}</TableCell>
                            <TableCell>{service.totalService}</TableCell>
                            <TableCell>{service.month}</TableCell>
                            <TableCell>{service.status}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleDetailClick(service.id)}>Xem chi tiết</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={services.length}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
            <Button variant="contained" color="primary" onClick={() => navigate('/thanh-toan-dich-vu-hoa-don')}>Thanh toán</Button>
        </Box>
    );
};

export default ServicePayments;
