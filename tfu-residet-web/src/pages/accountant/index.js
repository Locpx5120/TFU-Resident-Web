import React, { useState, useMemo, useEffect } from 'react';
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
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const paymentManage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [services, setServices] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            const res = await fetch(`https://localhost:7082/api/apartment-services/unpaid-summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    'content-type': 'application/json',
                    'buildingPermalink':  Cookies.get("buildingID"),
                },
            });
            const data = await res.json();
            setServices(data);
        }
        fetchRooms();
    }, [page, rowsPerPage, reload]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = services?.data.map((n) => n.apartmentId);
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
        if(!services?.data) return [];
        return services.data;
    }, [page, rowsPerPage, services]);

    const handleDetailClick = (id) => {
        navigate(`/xem-dich-vu/${id}`);
    };

    const handlePaymenNow = (id) => {
        navigate(`/xem-dich-vu-hoa-don/${id}`);
    }
    return (
        <Box className="content">
            <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                            <TableCell>STT</TableCell>
                        <TableCell align='left'>
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < services?.data?.length}
                                checked={services?.data?.length > 0 && selected.length === services?.data?.length}
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
                        <TableRow key={service.apartmentId}>
                            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={selected.indexOf(service.apartmentId) !== -1}
                                    onChange={() => handleSelect(service.apartmentId)}
                                />
                            </TableCell>
                            <TableCell>{service.roomNumber}</TableCell>
                            <TableCell>{service.totalServices}</TableCell>
                            <TableCell>{service.month}</TableCell>
                            <TableCell>{service.paymentStatus}</TableCell>
                            <TableCell>
                                <Button style={{fontSize: 12, textTransform: 'lowercase'}} variant="contained" color="primary" onClick={() => handleDetailClick(service.apartmentId)}>Xem chi tiết</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={services.totalRecords}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Box>
    );
};

export default paymentManage;
