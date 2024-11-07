import { Box, Button, Card, fabClasses, FormControl, InputLabel, MenuItem, Select, TablePagination, TextField, Typography } from "@mui/material"
import TableCustom from "../../components/Table"
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModalReception from "./modalReception";
import Cookies from "js-cookie";

const Receptionist = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
    // const apartmentId = Cookies.get("residentId");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columnData = [
        { name: "Loại dịch vụ", align: "left", esName: "dichvu" },
        { name: "Tên dịch vụ", align: "left", esName: "tendv" },
        { name: "Tòa nhà", align: "left", esName: "floor" },
        { name: "Ngày tạo", align: "left", esName: "created" },
        { name: "Trạng thái", align: "left", esName: "status" },
        { name: "Ngày xử lý", align: "left", esName: "dateDone" },
        {
            name: "Chi tiết",
            align: "left",
            esName: "detail",
        },
    ];

    const rows = {
        dichvu: (
            <Box>button</Box>
        ),
        tendv: (
            <Box>button</Box>
        ),
        floor: (
            <Box>button</Box>
        ),
        created: (
            <Box>button</Box>
        ),
        status: (
            <Box>button</Box>
        ),
        dateDone: (
            <Box>button</Box>
        ),
        detail: (
            <Box><RemoveRedEyeIcon /></Box>
        )
    }


    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="content">
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <span style={{ color: 'blue', cursor: 'pointer', margin: '10px 0' }} >Thông tin xử lý đơn thêm dịch vụ</span>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxHeight: '200px', marginBottom: '40px' }} >
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        // flexWrap: "wrap",
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextField
                        size="small"
                        label="Tên dịch vụ"
                        name="name"
                        variant="outlined"
                        sx={{ flexGrow: 1, maxWidth: "200px" }}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ height: "40px" }}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
                <FormControl fullWidth sx={{ marginRight: '10px', width: '250px', height: "40px", padding: '1px' }} >
                    <InputLabel id="demo-simple-select-label">Tòa nhà</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                    >
                        <MenuItem value={10}>S1</MenuItem>
                        <MenuItem value={20}>S2</MenuItem>
                        <MenuItem value={30}>S3</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginRight: '10px', width: '250px', height: "40px", padding: '1px' }} >
                    <InputLabel id="demo-simple-select-label">Loại dịch vụ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    // sx={{
                    //     padding: '4px', // Adjust padding here for the Select element
                    //     minHeight: '30px', // Optional: adjust the height if needed
                    // }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Card sx={{ maxHeight: "700px" }}>
                <TableCustom
                    columns={columnData}
                    rows={rows}
                />
                <TablePagination
                    component="div"
                    count={rows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
            <ModalReception
                open={modalOpen}
                handleClose={handleCloseModal}
                title='Thông tin chi tiết đơn dịch vụ'
            // fields={modalFields}
            />
        </section>
    )
}

export default Receptionist