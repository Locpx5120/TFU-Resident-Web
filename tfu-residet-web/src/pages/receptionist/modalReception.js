import { Box, Button, Modal, Typography } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const ModalReception = ({ open, handleClose, title, }) => {
    return (
        <Modal open={open} >
            <Box sx={style}>
                <Typography variant="h6" component="h2" mb={2}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
                    <Typography>Tòa nhà:</Typography>
                    <Typography>Số căn hộ:</Typography>
                    <Typography>Tên dịch vụ:</Typography>
                    <Typography>Tên thành viên:</Typography>
                    <Typography>Email:</Typography>
                    <Typography>Chú thích:</Typography>
                    <Typography>Ngày sinh:</Typography>
                    <Typography>Số điện thoại:</Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleClose} sx={{ mr: 1 }} variant="contained" >Ok</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalReception