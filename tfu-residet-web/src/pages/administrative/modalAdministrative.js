import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ModalAdministrative = ({ open, handleClose, title, }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [reload, setReload] = useState(false);
    const [roomsData, setRoomsData] = useState([])

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const buildingID = Cookies.get("buildingID");
    const { id } = useParams();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("https://localhost:7082/api/service-contract/update-service", {
                    method: 'PUT',
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
                Swal.fire('Thất bại', 'error');
            }
        }
        fetchRooms();
    }, [])

    return (
        <Modal open={open} sx={{ width: '700px', margin: '0 auto' }} >
            <Box sx={style}  >
                <Typography variant="h6" component="h2" mb={2}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography>Tòa nhà:</Typography>
                        <Typography>Số căn hộ:</Typography>
                        <Typography>Tên dịch vụ:</Typography>
                        <Typography>Loại xe:</Typography>
                        <Typography>Biển số:</Typography>
                        <Typography>Trạng thái:</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography>Mục đích:</Typography>
                        <Typography>Gói:</Typography>
                        <Typography>Ngày bắt đầu:</Typography>
                        <Typography>Ngày kết thức:</Typography>
                        <Typography>Chú thích: <TextField id="outlined-basic" variant="outlined" /> </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleClose} sx={{ mr: 1 }} variant="contained" >Ok</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalAdministrative