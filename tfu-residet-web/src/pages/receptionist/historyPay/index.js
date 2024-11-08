import { Box, Button, ButtonBase, Card, fabClasses, FormControl, InputLabel, MenuItem, Select, TablePagination, TextField, Typography } from "@mui/material"
import { useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TableCustom from "../../../components/Table";
import Detail from "./detail";

const HistoryPay = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(true);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columnData = [
        { name: "Tên chủ căn hộ", align: "left", esName: "nameBoss" },
        { name: "Tòa nhà", align: "left", esName: "floor" },
        { name: "Căn hộ", align: "left", esName: "apartment" },
        { name: "Tiền thanh toán(VNĐ)", align: "left", esName: "money" },
        {
            name: "Chi tiết",
            align: "left",
            esName: "detail",
        },
        { name: "Trạng thái thanh toán", align: "left", esName: "status" },
        { name: "Thời gian", align: "left", esName: "time" },
    ];

    const rows = {
        nameBoss: (
            <Box>button</Box>
        ),
        floor: (
            <Box>button</Box>
        ),
        apartment: (
            <Box>button</Box>
        ),
        money: (
            <Box>button</Box>
        ),

        detail: (
            <Button onClick={() => setModalOpen(true)} ><RemoveRedEyeIcon /></Button>
        ),
        status: (
            <Typography>Hoàn thành</Typography>
        ),
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <section className="content">

            {modalOpen ? (<Detail handleCloseModal={handleCloseModal} />) : (<Box>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <span style={{ color: 'blue', cursor: 'pointer', margin: '10px 0' }} >Lịch sử thanh toán</span>
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
                            label="Tên cư dân"
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
                    <Box sx={{ display: 'flex', gap: 2 }} >
                        <FormControl fullWidth sx={{ width: '100px', height: "40px", padding: '1px' }} >
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
                        <FormControl fullWidth sx={{ width: '170px', height: "40px", padding: '1px' }} >
                            <InputLabel id="demo-simple-select-label">Chưa thanh toán</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                            >
                                <MenuItem value={10}>Đã thanh toán</MenuItem>
                                <MenuItem value={20}>Đang thanh toán</MenuItem>
                                <MenuItem value={30}>Chưa thanh toán</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ width: '230px', height: "40px", padding: '1px' }} >
                            <InputLabel id="demo-simple-select-label">Chọn theo (tháng/năm)</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                            >
                                <MenuItem value={10}>Đã thanh toán</MenuItem>
                                <MenuItem value={20}>Đang thanh toán</MenuItem>
                                <MenuItem value={30}>Chưa thanh toán</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
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
            </Box>)}

        </section>
    )
}
export default HistoryPay