import {
    Avatar,
    Box,
    Button,
    Card,
    TablePagination,
    IconButton,
} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import TableCustom from "../../Table";
import SearchAgent from "./SearchAgent";
import AgentModal from "./AgentModal";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteData, postData, putData} from "../../../services/api";

const Agent = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [reload, setReload] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await postData('/user/viewManager', {
                    name: "",
                    roleId: ""
                })
                const result = await res.json();
                if (result.code === 200) {
                    setData(result.data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reload]);

    const handleCreate = async (payload) => {
        const res = await postData('/user/create', payload)
        const result = await res.json();
        if (result.code === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Tạo thành viên thành công!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                timer: 1500
            });
            setReload(!reload);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Tạo thành viên thất bại!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                timer: 1500
            });
        }
    };

    const handleUpdate = async (payload) => {
        const res = await putData('/user/update', payload)
        const result = await res.json();
        if (result.code === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành viên thành công!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                timer: 1500
            });
            setReload(!reload);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thành viên thất bại!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                timer: 1500
            });
        }
    };

    const sortedRows = useMemo(() => {
        if (!sortColumn) return data;

        return [...data].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn])
                return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn])
                return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortDirection]);

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

    const handleOpenModal = (member = null) => {
        setSelectedMember(member);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSaveMember = (memberData) => {
        if (selectedMember) {
            handleUpdate(memberData);
        } else {
            handleCreate(memberData);
        }
        handleCloseModal();
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('accessToken');
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa?',
            text: "Bạn không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteData('/user/delete', {id})
                    const result = await res.json();
                    if (result.code === 200) {
                        Swal.fire(
                            'Đã xóa!',
                            'Thành viên đã được xóa.',
                            'success'
                        );
                        setReload(!reload);
                    } else {
                        Swal.fire(
                            'Lỗi!',
                            'Không thể xóa thành viên.',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error deleting member:', error);
                    Swal.fire(
                        'Lỗi!',
                        'Đã xảy ra lỗi khi xóa thành viên.',
                        'error'
                    );
                }
            }
        });
    };

    const columnData = [
        {name: "Mã thành viên", align: "left", esName: "id", sortable: true},
        {name: "Họ tên", align: "left", esName: "fullName", sortable: true},
        {name: "Chức vụ", align: "left", esName: "role"},
        {name: "Số điện thoại", align: "left", esName: "phone"},
        {name: "Email", align: "left", esName: "email"},
        {
            name: "Thao tác",
            align: "left",
            esName: "actions",
            render: (row) => (
                <Box>
                    <IconButton onClick={() => handleOpenModal(row)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            )
        },
    ];

    return (
        <section className="content project">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <SearchAgent/>
                <Button
                    variant="contained"
                    sx={{background: "#2ca8a2"}}
                    onClick={() => handleOpenModal()}
                >
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
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
            <AgentModal
                open={openModal}
                handleClose={handleCloseModal}
                member={selectedMember}
                handleSave={handleSaveMember}
            />
        </section>
    );
};

export default Agent;
