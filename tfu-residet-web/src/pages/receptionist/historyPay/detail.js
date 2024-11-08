import { Box, Button, Card, TablePagination } from "@mui/material"
import TableCustom from "../../../components/Table"
import { useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Detail = ({ handleCloseModal }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columnData = [
        { name: "Tên dịch vụ", align: "left", esName: "tendv" },
        { name: "Mô tả", align: "left", esName: "detail" },
        { name: "Số lượng/m2", align: "left", esName: "count" },
        { name: "Giá tiền", align: "left", esName: "money" },
        { name: "Tổng tiền", align: "left", esName: "totalMoney" },
    ];

    const rows = {
        tendv: (
            <Box>button</Box>
        ),
        detail: (
            <Box>button</Box>
        ),
        count: (
            <Box>button</Box>
        ),
        money: (
            <Box>button</Box>
        ),

        money: (
            <Box>button</Box>
        ),
        totalMoney: (
            <Box>button</Box>
        ),
    }

    return (
        <section>
            <Box>
                <Button variant="contained"><ChevronLeftIcon /></Button>
                Back
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
        </section>
    )
}

export default Detail