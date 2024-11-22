import {useEffect, useMemo, useState} from "react";
import {Avatar, Box, Button, Card, TablePagination, TextField, Typography} from "@mui/material";
import TableCustom from "../../components/Table";
import FormAdministrator from './FormAdmintrator';
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";

const Administrator = () => {
    const [sortColumn, setSortColumn] = useState(0);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [column, setColumn] = useState(0);
    const [adminList, setAdminList] = useState([])
    const [chooseItem, setChooseItem] = useState()
    const handleDeleteClick = (item) => {
    };
    const handleEditClick = (item) => {
        setIsOpen(true);
        setIsUpdate(true)
        setChooseItem(item)
    };
    useEffect(() => {
        const fetchAdmin = () => {
            const listAdmin = [
                 {
                    name: 'a',
                    building: 'a',
                    project: 'a',
                    phone: 'a',
                    email: 'a',
                }
            ]

            setAdminList(listAdmin.map((items) =>( {...items, action: (
            <Box sx={{display: "flex", justifyContent: "center", gap: 1}}>
                <AutoFixHighIcon
                    onClick={() => handleEditClick(items)}
                    style={{cursor: "pointer"}}
                />
                <DeleteIcon
                    onClick={() => handleDeleteClick(items)}
                    style={{cursor: "pointer", color: "red"}}
                />
            </Box>
        )})))
        }
        fetchAdmin()
    }, [isOpen]);

    const sortedRows = useMemo(() => {
        if (!sortColumn) return adminList;

        return [...adminList].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn])
                return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn])
                return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [adminList, sortColumn, sortDirection]);

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
        <section className="content">
            administrator
            <FormAdministrator
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isUpdate={isUpdate}
                item={chooseItem}
            />
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
                margin: '10px 0',
                fontSize: '22px',
            }}>
                Danh sách quản trị viên <Avatar variant="square"
                                                sx={{background: '#2ca8a2', borderRadius: 1}}>0</Avatar>
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
                <Button onClick={() => {
                    setIsOpen(true);
                    setIsUpdate(false);
                }}>
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
                    count={adminList.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </section>
    )
}
const columnData = [
    {name: "Tên thành viên", align: "left", esName: "name", sortable: true},
    {name: "Tên tòa nhà", align: "left", esName: "building", sortable: true},
    {name: "Dự án", align: "left", esName: "project"},
    {name: "Điện thoại", align: "left", esName: "phone"},
    {name: "Email", align: "left", esName: "email"},
    {name: "Thao tác", align: "left", esName: "action"},
];
export default Administrator;