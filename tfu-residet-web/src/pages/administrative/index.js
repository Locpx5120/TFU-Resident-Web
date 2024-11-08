import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TablePagination, TextField, Typography } from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TableCustom from "../../components/Table";
import { useEffect, useState } from "react";
import ModalAdministrative from "./modalAdministrative";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const Adminitrative = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(true);
    const [roomsData, setRoomsData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("https://localhost:7082/api/apartment-services/unpaid-details", {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        'content-type': 'application/json',
                        'buildingPermalink': Cookies.get('buildingID'),
                    },
                    body: JSON.stringify({
                        apartmentId: id,
                        serviceType: "",                    
                    })
                });
                const data = await response.json();
                setRoomsData(data);
            } catch (error) {
                Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
            }
        }
        fetchRooms();
    }, [])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columnData = [
        { name: "Loại dich vụ", align: "left", esName: "loaidv" },
        { name: "Ngày", align: "left", esName: "date" },
        { name: "Tòa nhà", align: "left", esName: "floor" },
        { name: "Tòa nhà", align: "left", esName: "house" },
        { name: "Trạng thái", align: "left", esName: "status" },
        {
            name: "Chi tiết",
            align: "left",
            esName: "detail",
        },
    ];

    const rows = {

        loaidv: (
            <Typography>Hoàn thành</Typography>
        ),
        date: (
            <Typography>Hoàn thành</Typography>
        ),
        floor: (
            <Typography>Hoàn thành</Typography>
        ),
        house: (
            <Typography>Hoàn thành</Typography>
        ),
        status: (
            <Typography>Hoàn thành</Typography>
        ),
        detail: (
            <Button onClick={() => setModalOpen(true)} ><RemoveRedEyeIcon /></Button>
        ),

    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <section className="content">

                <Box>
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
                            <FormControl fullWidth
                                sx={{
                                    width: '100px', height: "40px", minHeight: '40px',
                                    maxHeight: '40px',
                                }} >
                                < InputLabel id="demo-simple-select-label" sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '10%',         // Căn giữa theo chiều dọc
                                    transform: 'translateY(-50%)', // Giữ nhãn ở giữa khi chưa thu nhỏ
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrink': {
                                        top: '0',                      // Di chuyển lên trên khi thu nhỏ
                                        left: '15px',
                                        transform: 'translate(10, -6px) scale(0.75)', // Thu nhỏ và điều chỉnh vị trí
                                        fontSize: '12px',
                                    },
                                }}>Tòa nhà</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        minHeight: '40px',
                                        height: '100%',
                                    }}
                                >
                                    <MenuItem value={10}>S1</MenuItem>
                                    <MenuItem value={20}>S2</MenuItem>
                                    <MenuItem value={30}>S3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{
                                width: '150px', height: "40px", minHeight: '40px',
                                maxHeight: '40px',
                            }} >
                                <InputLabel id="demo-simple-select-label" sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '10%',         // Căn giữa theo chiều dọc
                                    transform: 'translateY(-50%)', // Giữ nhãn ở giữa khi chưa thu nhỏ
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrink': {
                                        top: '0',                      // Di chuyển lên trên khi thu nhỏ
                                        left: '15px',
                                        transform: 'translate(10, -6px) scale(0.75)', // Thu nhỏ và điều chỉnh vị trí
                                        fontSize: '12px',
                                    },
                                }}>Trạng thái</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        minHeight: '40px',
                                        height: '100%',
                                    }}
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
                </Box>

            </section>
            <ModalAdministrative
                open={modalOpen}
                handleClose={handleCloseModal}
                title='Thông tin chi tiết đơn dịch vụ'
            />
        </ >
    )
}

export default Adminitrative