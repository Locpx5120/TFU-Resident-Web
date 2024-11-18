import React, {useState, useEffect, useMemo} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    TablePagination,
    TextField,
    Typography,
} from "@mui/material";
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import TableCustom from '../Table';
import AddBuilding from './AddBuilding';
import {
    apiUpdateBuildings,
    CreateBuildings,
    DeleteBuildings,
    GetBuildings,
    viewManager
} from "../../services/buildingService";
import EditBuilding from "./EditBuilding";
import {result} from "lodash/object";

const Building = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [projects, setProjects] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [selected, setSelected] = useState({})
    // const header = {
    //   headers: {
    //     method: 'GET',
    //     Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //     'content-type': 'application/json',
    //   }
    // };s
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let data = await viewManager("project");
                setProjects(data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const data = await GetBuildings();
                data.data = data.data.map((item) => (
                    {
                        ...item,
                        action: (
                            <Box>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => updateBuilding(item)}
                                    sx={{mr: 1}}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteBuilding(item.id)}
                                >
                                    Xóa
                                </Button>
                            </Box>
                        )
                    }
                ));
                console.log(data.data)
                setBuildings(data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchBuildings();
    }, []);
    const updateBuilding = (buildings) => {
        setIsOpenUpdate(true);
        setSelected(buildings)
    }
    const sortedRows = useMemo(() => {
        if (!sortColumn) return buildings;

        return [...buildings].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn])
                return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn])
                return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [buildings, sortColumn, sortDirection]);

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

    const handleCreateBuilding = async (newBuilding) => {
        try {
            const result = await CreateBuildings(newBuilding);
            if (result?.code === 200) {
                setIsOpenCreate(false);
                Swal.fire('Thành công', 'Đã thêm tòa nhà mới', 'success');
                // Refresh building list here
            } else {
                Swal.fire('Lỗi', result?.message || 'Không thể tạo tòa nhà', 'error');
            }
        } catch (error) {
            console.error('Error creating building:', error);
            Swal.fire('Lỗi', 'Không thể kết nối đến server', 'error');
        }
    };
    const handleUpdateBuilding = async (newBuilding) => {
        try {
            const result = await apiUpdateBuildings(newBuilding);
            if (result?.code === 200) {
                setIsOpenCreate(false);
                Swal.fire('Thành công', 'Cập nhật toà nhà thành công', 'success');
                // Refresh building list here
            } else {
                Swal.fire('Lỗi', result?.message || 'Không thể cập nhật tòa nhà', 'error');
            }
        } catch (error) {
            console.error('Error creating building:', error);
            Swal.fire('Lỗi', 'Không thể kết nối đến server', 'error');
        }
    };
    const handleDeleteBuilding = async (id) => {
        try {
            const result = await DeleteBuildings(id);
            if (result?.code === 200) {
                setIsOpenCreate(false);
                Swal.fire('Thành công', 'Xoá toà nhà thành công', 'success');
                // Refresh building list here
            } else {
                Swal.fire('Lỗi', result?.message || 'Không thể xoá tòa nhà', 'error');
            }
        } catch (error) {
            console.error('Error creating building:', error);
            Swal.fire('Lỗi', 'Không thể kết nối đến server', 'error');
        }
    };
    return (
        <section className="content building">
            <AddBuilding
                open={isOpenCreate}
                onClose={() => setIsOpenCreate(false)}
                onSubmit={handleCreateBuilding}
                projects={projects}
            />
            <EditBuilding
                open={isOpenUpdate}
                onClose={() => setIsOpenUpdate(false)}
                onSubmit={handleUpdateBuilding}
                projects={projects}
                selectedBuilding={selected}
            />
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
                margin: '10px 0',
                fontSize: '22px',
            }}>
                Danh sách toà nhà <Avatar variant="square" sx={{background: '#2ca8a2', borderRadius: 1}}>0</Avatar>
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
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
                <Button onClick={() => setIsOpenCreate(true)} variant="contained" sx={{background: "#2ca8a2"}}>
                    Thêm mới
                </Button>
            </Box>
            <Card sx={{maxHeight: "800px", marginTop: "30px"}}>
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
};

const columnData = [
    {name: "Mã tòa nhà", align: "left", esName: "id", sortable: true},
    {name: "Tên tòa nhà", align: "left", esName: "name", sortable: true},
    // { name: "Căn hộ", align: "left", esName: "maxNumberApartments" },
    // { name: "Cư dân", align: "left", esName: "maxNumberResidents" },
    {name: "Thao tác", align: "left", esName: "action"},
];

export default Building;
