import React, { useState, useEffect, useMemo } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    TablePagination,
    TextField,
    Typography,
} from "@mui/material";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import TableCustom from '../../../components/Table';
import { useNavigate } from 'react-router-dom';

const ServiceManage = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const [buildings, setBuildings] = useState([
        {
            STT: "1",
            soPhong: 204,
            tongDichVu: "04",
            chiTiet: <Button variant="contained" onClick={() => navigate('/quan-ly-dich-vu/204')}>Chi tiết</Button>
        },
        {
            STT: "2",
            soPhong: 304,
            tongDichVu: "02",
            chiTiet: <Button variant="contained" onClick={() => navigate('/quan-ly-dich-vu/304')}>Chi tiết</Button>
        },
        {
            STT: "3",
            soPhong: 404,
            tongDichVu: "01",
            chiTiet: <Button variant="contained" onClick={() => navigate('/quan-ly-dich-vu/404')}>Chi tiết</Button>
        },
    ]);
    const [isOpenCreate, setIsOpenCreate] = useState(false);


    const headerPOST = {
        method: 'POST',
        headers: {
            method: 'POST',
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: "services",
        })
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:7082/api/apartment-service/", headerPOST);
                const data = await response.json();
                setServices(data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchServices();
    }, []);

    const sortedRows = useMemo(() => {
        if (!sortColumn) return buildings;

        return [...buildings].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn])
                return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn])
                return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [services, sortColumn, sortDirection]);

    const paginatedRows = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return sortedRows.slice(startIndex, startIndex + rowsPerPage);
    }, [sortedRows, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === "asc";
        setSortDirection(isAsc ? "desc" : "asc");
        setSortColumn(column);
    };

    return (
        <section className="content service">
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
                margin: '10px 0',
                fontSize: '22px',
            }}>
                Dịch vụ căn hộ <Avatar variant="square" sx={{ background: '#2ca8a2', borderRadius: 1 }}>0</Avatar>
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label=""
                        color="success"
                        placeholder="Tên"
                        sx={{
                            "#outlined-multiline-flexible": {
                                padding: "7px !important",
                            },
                        }}
                    />
                    <Button variant="outlined" color="success">
                        Tìm kiếm
                    </Button>
                </Box>
                <Button onClick={() => setIsOpenCreate(true)} variant="contained" sx={{ background: "#2ca8a2" }}>
                    Thêm mới
                </Button>
            </Box>
            <Card sx={{ maxHeight: "800px", marginTop: "30px" }}>
                <TableCustom
                    columns={columnData}
                    rows={paginatedRows}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                />
                <TablePagination
                    component="div"
                    count={buildings.length}
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
    { name: "STT", align: "left", esName: "STT", sortable: true },
    { name: "Số phòng", align: "left", esName: "soPhong", sortable: true },
    { name: "Tổng dịch vụ", align: "left", esName: "tongDichVu" },
    { name: "Chi tiết", align: "left", esName: "chiTiet" },
  ];

export default ServiceManage;